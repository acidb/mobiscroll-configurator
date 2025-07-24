'use client'
import React from 'react'
import type { ViewDescriptionClientProps } from 'payload'

export default function PresetDescription(props: ViewDescriptionClientProps) {
    return <div style={{ maxWidth: '65rem', padding: '0.5rem' }}>
        <p style={{ marginBottom: '1.5rem' }}>
            The Presets collection defines reusable component–framework combinations that serve as templates for configuration. It specifies which components a preset is related to and which frameworks support it.
        </p>
        <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.75rem' }}>What you can do with it:</h3>
        <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem' }}>
            <li style={{ marginBottom: '0.5rem' }}>Define logical presets by linking components and frameworks</li>
            <li style={{ marginBottom: '0.5rem' }}>Serve as a base for actual configurations created in the Configs collection</li>
            <li style={{ marginBottom: '0.5rem' }}>Add descriptions, tags, and sort order for better organization</li>
            <li>Recommend specific presets to guide users</li>
        </ul>
    </div>
}