<wizard-report>
# PostHog post-wizard report

The wizard has completed a full integration of PostHog analytics into the ShowEvents Next.js App Router application. PostHog is initialized via `instrumentation-client.ts` (the recommended approach for Next.js 15.3+), with a reverse proxy configured in `next.config.ts` to improve reliability and reduce ad-blocker interference. Exception capture (error tracking) is enabled by default. Event tracking was added to the three key client-side interaction points in the app.

| Event Name | Description | File |
|---|---|---|
| `explore_events_clicked` | User clicks the "Explore Events" CTA button on the homepage | `app/components/ExploreBtn.tsx` |
| `event_card_clicked` | User clicks on an event card to view event details (with title, slug, location, and date properties) | `components/EventCard.tsx` |
| `navbar_link_clicked` | User clicks a navigation link in the top navbar (with label property) | `components/Navbar.tsx` |

## Files created/modified

- **`instrumentation-client.ts`** (new) — PostHog client-side initialization with reverse proxy, defaults, and exception capture
- **`next.config.ts`** (updated) — Added reverse proxy rewrites for `/ingest/*` and `skipTrailingSlashRedirect`
- **`.env.local`** (new) — `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` and `NEXT_PUBLIC_POSTHOG_HOST` environment variables

## Next steps

Once your app is running and users start interacting with it, you can explore the data in PostHog:

- **Trends**: Chart `explore_events_clicked`, `event_card_clicked`, and `navbar_link_clicked` over time to understand engagement
- **Funnel**: Track the conversion from `explore_events_clicked` → `event_card_clicked` to measure CTA effectiveness
- **Breakdown**: Use the `event_title` or `event_location` property on `event_card_clicked` to see which events attract the most interest
- **Session Replay**: Enabled automatically — watch real user sessions to understand navigation patterns

Visit your PostHog project at https://us.posthog.com/project/437003 to get started.

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
