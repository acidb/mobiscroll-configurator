import React from 'react'
import './styles.css'

export const metadata = {
  description: 'Mobiscroll Configurator',
  title: 'Mobiscroll Configurator',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 flex flex-col">
        <header className="w-full py-6 px-8 bg-white shadow">
          <h1 className="text-2xl font-bold text-gray-800">Mobiscroll Configurator</h1>
        </header>
        <main className="flex-1 ">
          {/* <div className="w-full h-full max-w-2xl p-8 bg-white rounded-lg shadow-md"> */}
          {children}
          {/* </div> */}
        </main>
        <footer className="w-full py-4 px-8 bg-gray-100 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Mobiscroll Configurator
        </footer>
      </body>
    </html>
  )
}
