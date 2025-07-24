'use client'
import React from 'react'
import type { ViewDescriptionClientProps } from 'payload'

export default function GroupDescription(props: ViewDescriptionClientProps) {
    return <div style={{ maxWidth: '65rem', padding: '0.5rem' }}>
        <p style={{ marginBottom: '1.5rem' }}>
            The Groups collection stores and organizes the various Mobiscroll component groups. These groups serve as logical categories that help structure and sort individual components, making it easier for users to navigate and manage large sets of UI elements. Each group has a name, a unique slug (used as an identifier), and an optional sortOrder field to control the display order in lists.
        </p>
        <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.75rem' }}>What you can do with it:</h3>
        <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem' }}>
            <li style={{ marginBottom: '0.5rem' }}>Define and manage Mobiscroll component categories (e.g. Event calendar & scheduling, Forms, Date & time selection)</li>
            <li style={{ marginBottom: '0.5rem' }}>Ensure consistent grouping and easier filtering of components</li>
            <li>Customize the display order of groups in the admin panel</li>
        </ul>
    </div>

}