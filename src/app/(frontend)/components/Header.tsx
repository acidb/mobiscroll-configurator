'use client'

import React from 'react'
import Link from 'next/link'
import MainNav from './MainNav'

export default function Header() {
  return (
    <header className="w-full py-4 px-8 bg-gradient-to-r from-gray-50 to-gray-100 shadow-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <h1 className="text-3xl font-bold font-lora text-gray-800 transition-colors duration-300 hover:text-gray-600">
          <Link href="/" aria-label="Mobiscroll Configurator Home">
            Mobiscroll Configurator
          </Link>
        </h1>

        <MainNav />
      </div>
    </header>
  )
}
