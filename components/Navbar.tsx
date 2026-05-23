"use client";

import Image from 'next/image'
import Link from 'next/link'
import posthog from 'posthog-js'


const Navbar = () => {
  const captureNavClick = (label: string) => {
    posthog.capture("navbar_link_clicked", { label });
  };

  return (
    <header>
      <nav>
        <Link href="/" className="logo" onClick={() => captureNavClick("logo")}>
          <Image src="/icons/logo.png" alt="logo" width={24} height={24} />

          <p>ShowEvents</p>
        </Link>

        <ul>
          <Link href="/" onClick={() => captureNavClick("Home")}>Home</Link>
          <Link href="/" onClick={() => captureNavClick("Events")}>Events</Link>
          <Link href="/" onClick={() => captureNavClick("Create Event")}>Create Event</Link>
        </ul>
      </nav>
    </header>
  )
}

export default Navbar