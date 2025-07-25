'use client'
import React from 'react'

export default function SettingDescription() {
    return <div className='p-5'>
        <p className='mb-4'>
            The Settings collection stores configuration settings for specific components. Each entry defines a set of settings in JSON format that can be linked to one or more Mobiscroll components. These settings can later be used or referenced when creating actual configurations (e.g. via presets or direct configuration flows).
        </p>
        <p className='mb-4'>
            These setting objects are auto generated from the spark repo with the <code>doc-generate-markdown</code> script. It will create a combined json grouped by  the options/event/renderers and that json can be used here.
            The json will be generated under the <code>dist/doc-configurator</code> folder.
        </p>
    </div>
}