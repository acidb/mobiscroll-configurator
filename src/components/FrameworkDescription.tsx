'use client'
import React from 'react'

export default function FrameworkDescription() {
    return <div style={{ maxWidth: '65rem', padding: '0.5rem'}}>
        <p style={{ marginBottom: '1.5rem' }}>
            The Frameworks collection defines the available frontend frameworks or languages supported, such as JavaScript, React, Angular, etc. Each framework entry includes a name, a unique slug, optional templates, and icons. The templates provide predefined code snippets or configurations that help users start quickly with a specific framework.
        </p>
        <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.75rem' }}>What you can do with it:</h3>
        <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem' }}>
            <li style={{ marginBottom: '0.5rem' }}>Manage the list of frameworks (e.g. JavaScript, React, Angular, Vue)</li>
            <li style={{ marginBottom: '0.5rem' }}>Store code templates for each framework to be used in presets</li>
            <li>Customize icons and sort order for visual presentation</li>
        </ul>
    </div>
}