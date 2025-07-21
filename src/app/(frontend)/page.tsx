import { headers as getHeaders } from 'next/headers'
import { getPayload } from 'payload'
import React from 'react'
import Link from 'next/link'
import config from '@/payload.config'
import './styles.css'

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })


  return (
    <div className="flex flex-col items-center justify-center bg-background min-h-[calc(100vh-136px)]">
      <div className="w-full max-w-xl bg-card rounded-xl shadow-lg p-8 flex flex-col items-center">
        <h1 className="text-2xl font-bold text-foreground mb-2">
          {!user ? 'Welcome to Mobiscroll Configurator.' : `Welcome back, ${user.email}`}
        </h1>
        <div className="flex flex-col gap-4 my-4 max-w-xs justify-center">
          <Link
            href="/configurator"
            className="px-4 py-2 rounded bg-gray-300 text-primary-foreground font-semibold hover:bg-gray-500/90 transition text-center"
          >
            Open Configurator
          </Link>

          <Link
            href="/admin"
            className="px-4 py-2 rounded bg-gray-300 text-primary-foreground font-semibold hover:bg-gray-500/90 transition text-center"
            rel="noopener noreferrer"
            target="_blank"
          >
            Admin page
          </Link>
        </div>
      </div>
    </div>
  )
}
