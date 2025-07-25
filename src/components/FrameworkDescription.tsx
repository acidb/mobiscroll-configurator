'use client'
import React from 'react'

export default function FrameworkDescription() {
    return <div style={{ maxWidth: '67rem', padding: '0.5rem'}}>
        <p style={{ marginBottom: '1.5rem' }}>
            The Frameworks collection defines the available frontend frameworks or languages supported, such as JavaScript, React, Angular, etc. Each framework entry includes a name, a unique slug, optional templates, and icons. Templates contain ready-made code snippets that help users get started quickly with the selected framework. These snippets not only serve as examples but also provide the basis for automatically generating components. Based on the templates, the system can configure the necessary settings, data, layouts, and connections tailored to the chosen framework.
        </p>
        <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.75rem' }}>What you can do with it:</h3>
        <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem' }}>
            <li style={{ marginBottom: '0.5rem' }}>Manage the list of frameworks (e.g. JavaScript, React, Angular, Vue)</li>
            <li style={{ marginBottom: '0.5rem' }}>Store code templates for each framework to be used in presets</li>
            <li>Customize icons and sort order for visual presentation</li>
        </ul>
    </div>
}