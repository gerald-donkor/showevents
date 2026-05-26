import mongoose from 'mongoose';
import { NextResponse } from 'next/server';

import Event from '@/database/event.model';
import connectDB from '@/lib/mongodb';

type EventRouteContext = {
  params: Promise<{
    slug?: string;
  }>;
};

type ErrorResponse = {
  message: string;
  error?: string;
};

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

// Validates and normalizes the dynamic slug parameter before querying MongoDB.
function validateSlug(rawSlug: unknown): { isValid: true; value: string } | { isValid: false; message: string } {
  if (typeof rawSlug !== 'string') {
    return { isValid: false, message: 'Missing slug parameter.' };
  }

  const normalizedSlug = rawSlug.trim().toLowerCase();

  if (!normalizedSlug) {
    return { isValid: false, message: 'Slug cannot be empty.' };
  }

  if (!SLUG_PATTERN.test(normalizedSlug)) {
    return {
      isValid: false,
      message: 'Invalid slug format. Use lowercase letters, numbers, and hyphens only.',
    };
  }

  return { isValid: true, value: normalizedSlug };
}

export async function GET(_request: Request, context: EventRouteContext) {
  try {
    const { slug } = await context.params;
    const validatedSlug = validateSlug(slug);

    if (!validatedSlug.isValid) {
      return NextResponse.json<ErrorResponse>({ message: validatedSlug.message }, { status: 400 });
    }

    await connectDB();

    const event = await Event.findOne({ slug: validatedSlug.value }).lean().exec();

    if (!event) {
      return NextResponse.json<ErrorResponse>({ message: 'Event not found.' }, { status: 404 });
    }

    return NextResponse.json(
      { message: 'Event fetched successfully.', event },
      { status: 200 },
    );
  } catch (error: unknown) {
    if (error instanceof mongoose.Error.ValidationError) {
      return NextResponse.json<ErrorResponse>(
        { message: 'Validation error while fetching event.', error: error.message },
        { status: 400 },
      );
    }

    return NextResponse.json<ErrorResponse>(
      {
        message: 'Unexpected server error while fetching event.',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    );
  }
}
