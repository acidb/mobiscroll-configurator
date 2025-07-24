'use client'
import React from 'react'
import type { ViewDescriptionClientProps } from 'payload'

export default function SettingDescription(props: ViewDescriptionClientProps) {
    return <div style={{ maxWidth: '65rem', padding: '0.5rem' }}>
        <p style={{ marginBottom: '1.5rem' }}>
            The Settings collection stores configuration settings for specific components. Each entry defines a set of settings in JSON format that can be linked to one or more Mobiscroll components. These settings can later be used or referenced when creating actual configurations (e.g. via presets or direct configuration flows). This allows for reusable and organized configuration snippets.
        </p>
        <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.75rem' }}>What you can do with it:</h3>
        <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem' }}>
            <li style={{ marginBottom: '0.5rem' }}>Store reusable settings for one or more components</li>
            <li style={{ marginBottom: '0.5rem' }}>Define settings in structured JSON format</li>
            <li>Use stored settings in user configurations</li>
        </ul>
    </div>
}