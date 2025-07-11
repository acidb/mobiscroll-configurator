import { headers as getHeaders } from 'next/headers.js'
import { getPayload } from 'payload'
import React from 'react'
import { fileURLToPath } from 'url'
import config from '@/payload.config'
import './styles.css'

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  const fileURL = `vscode://file/${fileURLToPath(import.meta.url)}`

  return (
    <div className="flex flex-col items-center justify-center bg-gray-50">
      <div className="w-full max-w-xl bg-white rounded-xl shadow-lg p-8 flex flex-col items-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          {!user ? 'Welcome to Mobiscroll Configurator.' : `Welcome back, ${user.email}`}
        </h1>
        <div className="flex flex-col sm:flex-row gap-4 my-4">
          {/* {user && ( */}
          <a
            className="px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
            href={payloadConfig.routes.admin}
            rel="noopener noreferrer"
            target="_blank"
          >
            Go to admin panel
          </a>
          {/* )} */}
        </div>
        <div className="mt-8 text-sm text-gray-500 text-center">
          <p>Update this page by editing</p>
          <a className="underline text-blue-600 hover:text-blue-800" href={fileURL}>
            <code>app/(frontend)/page.tsx</code>
          </a>
        </div>
      </div>
    </div>
  )
}
