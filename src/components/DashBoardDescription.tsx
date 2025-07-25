'use client'
import React from 'react'
import Image from 'next/image';

const DashboardDescription = () => {
    return (

        <div
            style={{
                padding: '3rem',
            }}
        >
            <h1 style={{ fontSize: '28px', marginBottom: '12px' }}>
                Welcome to the Admin Panel
            </h1>

            <p style={{ fontSize: '16px', lineHeight: '1.6', marginBottom: '16px' }}>
                This interface allows you to view, edit, and manage the core collections
                used in the Mobiscroll configuration system, including components, groups,
                frameworks, presets, settings, and configs.
            </p>

            <p style={{ fontSize: '16px', lineHeight: '1.6', marginBottom: '16px' }}>
                The following diagram helps you understand the relationships and dependencies
                between the collections. It provides a visual overview of how everything connects.
            </p>

            <div style={{ textAlign: 'center', marginTop: '32px' }}>
            </div>
            <Image
                src="/diagram.png"
                alt="Dependency Diagram"
                width={1000}
                height={500}
                style={{
                    maxWidth: '100%',
                    height: 'auto',

                }}
            />
        </div>

    )
}

export default DashboardDescription
