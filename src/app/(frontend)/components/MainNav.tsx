'use client'

import React from 'react'
import Link from 'next/link'

const links = [
  { href: '/about', label: 'About', aria: 'About Mobiscroll Configurator' },
  { href: '/docs', label: 'Docs', aria: 'Documentation' },
  { href: '/contact', label: 'Contact', aria: 'Contact Us' },
]

export default function MainNav() {
  return (
    <nav className="flex space-x-6">
      {links.map(({ href, label, aria }) => (
        <Link
          key={href}
          href={href}
          aria-label={aria}
          className="text-foreground hover:text-primary transition-colors duration-200"
        >
          {label}
        </Link>
      ))}
    </nav>
  )
}
