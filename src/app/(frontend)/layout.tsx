import React, { ReactNode } from 'react'
import './styles.css'
import { Geist } from 'next/font/google'

import Header from './components/Header'
import Footer from './components/Footer'

export const metadata = {
  description: 'Mobiscroll Configurator',
  title: 'Mobiscroll Configurator',
}

const geist = Geist({
  subsets: ['latin'],
})

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={geist.className}  data-theme="light">
      <body className="min-h-[100vh] flex flex-col bg-background text-foreground">
        <Header />

        <main className="flex-1 flex items-start">
          <div className="w-full p-6">{children}</div>
        </main>

        <Footer />
      </body>
    </html>
  )
}
