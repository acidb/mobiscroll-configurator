'use client'
import React from 'react'

export default function ComponentDescription() {
    return <div style={{ maxWidth: '65rem', padding: '0.5rem' }}>
        <p style={{ marginBottom: '1.5rem' }}>
            The Components collection stores individual Mobiscroll UI components, such as buttons, pickers, calendars, or form elements. Each component is assigned to a group (e.g., Date & Time, Form Controls) via a relationship, which helps with categorization and filtering. Components also include a unique label, a view identifier, and an optional sortOrder to control display order.
        </p>
        <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.75rem' }}>What you can do with it:</h3>
        <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem' }}>
            <li style={{ marginBottom: '0.5rem' }}>Define and manage all available Mobiscroll components</li>
            <li style={{ marginBottom: '0.5rem' }}>Link each component to a group for structured organization</li>
            <li>Use components in presets and settings for UI configuration</li>
        </ul>
    </div>

}