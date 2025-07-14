'use client'

import React from 'react'
import Link from 'next/link'

const siteLinks = [
  { href: '/', label: 'Home', aria: 'Home' },
  { href: '/about', label: 'About', aria: 'About' },
  { href: '/contact', label: 'Contact', aria: 'Contact' },
]

const socialLinks = [
  { href: 'https://twitter.com', label: 'Twitter', aria: 'Follow on Twitter' },
  { href: 'https://github.com', label: 'GitHub', aria: 'Follow on GitHub' },
  { href: 'https://linkedin.com', label: 'LinkedIn', aria: 'Follow on LinkedIn' },
]

export default function Footer() {
  return (
    <footer className="w-full py-6 px-8 bg-gradient-to-r from-gray-50 to-gray-100 border-t border-gray-200 shadow-inner">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-sm text-gray-600">
        <div>
          <h3 className="text-base font-semibold text-gray-900 mb-2">Mobiscroll Configurator</h3>
          <p>Build and customize your components with ease.</p>
        </div>

        <div>
          <h3 className="text-base font-semibold text-gray-900 mb-2">Links</h3>
          <ul className="flex flex-wrap gap-4">
            {siteLinks.map(({ href, label, aria }) => (
              <li key={href}>
                <Link
                  href={href}
                  aria-label={aria}
                  className="hover:text-blue-600 transition-colors duration-200"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-base font-semibold text-gray-900 mb-2">Follow Us</h3>
          <div className="flex flex-wrap gap-4">
            {socialLinks.map(({ href, label, aria }) => (
              <Link
                key={href}
                href={href}
                aria-label={aria}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600 transition-colors duration-200"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Mobiscroll Configurator. All rights reserved.
      </div>
    </footer>
  )
}
