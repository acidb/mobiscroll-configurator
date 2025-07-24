'use client'
import React from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { prism } from 'react-syntax-highlighter/dist/cjs/styles/prism'

export default function ConfigDescription() {
    return (
        <div className="config-description gutter gutter--left gutter--right collection-list__wrap">


            <div className="collapse collapse-arrow bg-base-100 border border-base-300 config-p">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title font-semibold">Configs Collection docs</div>
                <div className="collapse-content ">
                    <div className="config-p">
                        The <b>Configs</b> collection stores configuration objects for Mobiscroll components. Each config defines which component to render, its data, lifecycle events, templates, and options. These configs are used to generate live previews and code samples for React, Angular, Vue, JS, and jQuery.
                    </div>
                    <h3>Config JSON structure</h3>
                    <div className="config-p">
                        <ul>
                            <li><b>component</b>: Mobiscroll component name (e.g., <code>Eventcalendar</code>).</li>
                            <li>
                                <b>data</b>: Data sources for data-based components: <code>data</code>, <code>resources</code>, <code>invalid</code>, <code>colors</code>. Can be inline or an object with a <code>url</code> property to fetch data externally:
                                <div>
                                    <SyntaxHighlighter
                                        language="js"
                                        style={prism}
                                        wrapLines
                                        wrapLongLines
                                        customStyle={{
                                            background: 'var(--theme-elevation-50)',
                                            fontSize: '0.85rem',
                                            padding: '1rem',
                                            margin: 0,
                                            borderRadius: '0.5rem',
                                            boxShadow: 'none',
                                        }}
                                    >
                                        {`data: {
  url: 'https://trial.mobiscroll.com/timeline-events/',
  type: 'MbscCalendarEvent'
}`}
                                    </SyntaxHighlighter>
                                </div>
                            </li>
                            <li>
                                <b>hooks</b>: Lifecycle event handler mappings. Handler functions can be added in <code>src/components/reactHooks.tsx</code>.
                            </li>
                            <li><b>props</b>: General component options.</li>
                            <li><b>templates</b>: Template/render function mappings. Template functions can be added in <code>src/components/reactTemplates.tsx</code></li>
                            <li>
                                <b>types</b>: Mobiscroll TypeScript types used in code. .
                            </li>
                            <li>
                                <b>reactHooks</b>: React hooks used in code (for the import section of the code preview).
                            </li>
                        </ul>
                    </div>
                    <h3>Example config</h3>
                    <div className="config-p">
                        <SyntaxHighlighter
                            language="js"
                            style={prism}
                            wrapLines
                            wrapLongLines
                            customStyle={{
                                background: 'transparent',
                                fontSize: '0.85rem',
                                padding: 0,
                                margin: 0,
                                borderRadius: 0,
                                boxShadow: 'none',
                            }}
                        >
                            {`{
  "component": "Eventcalendar",
  "data": {
    "data": [
      {
        "id": "availability1",
        "start": "2025-07-14T10:00",
        "end": "2025-07-14T18:00",
        "resource": 2
      }
    ],
    "resources": { "url": "https://trial.mobiscroll.com/timeline-events/" },
    "invalid": [
      {
        "resource": [1,2],
        "start": "2025-07-14T00:00",
        "end": "2025-07-14T10:00",
        "recurring": { "repeat": "daily" }
      }
    ]
  },
  "hooks": {
    "onEventCreated": "myEventCreated",
    "onEventUpdated": "myEventUpdated"
  },
  "props": {
    "clickToCreate": true,
    "dragToCreate": true,
    "view": {
      "schedule": {
        "type": "week",
        "startDay": 1,
        "endDay": 5,
        "startTime": "08:00",
        "endTime": "18:00"
      }
    }
  },
  "templates": {
    "renderScheduleEventContent": "scheduleEventContentTemplate"
  },
  "types": ["MbscResource", "MbscEventClickEvent"],
  "reactHooks": ["FC", "useCallback"]
}`}
                        </SyntaxHighlighter>
                    </div>
                </div>
            </div>
        </div>
    )
}