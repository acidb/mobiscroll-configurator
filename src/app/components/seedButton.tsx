'use client'
import React, { useState } from 'react'
import type { ComponentType } from 'react'

const SeedButton: ComponentType<Record<string, any>> = () => {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const serverURL = process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000'

  const handleSeed = async () => {
    setLoading(true)
    setMessage('')
    try {
      const response = await fetch(`${serverURL}/api/seed`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      })
      const result = await response.json()
      setMessage(result.message)
    } catch (error) {
      setMessage(`Error: ${(error as Error).message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="card" style={{ padding: '1rem', margin: '1rem 0' }}>
      <h2>Seed Database</h2>
      <p>Click the button below to seed the database with initial data.</p>
      <button
        onClick={handleSeed}
        disabled={loading}
        className="btn btn--style-primary"
        style={{ marginTop: '1rem' }}
      >
        {loading ? 'Seeding...' : 'Run Seed Script'}
      </button>
      {message && (
        <p style={{ marginTop: '1rem', color: message.includes('Error') ? 'red' : 'green' }}>
          {message}
        </p>
      )}
    </div>
  )
}

export default SeedButton
