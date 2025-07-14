/*
    This page is just an example of how the different components for the configurator can be used together.
    Here are some sample configurations and a live preview of the Event Calendar component.

    The final codes responsive design can be copied from this page.

*/

// app/test/page.tsx
'use client';

import React, { useState } from 'react';
import { LivePreview } from '@/components/LivePreview';
import { CodePreview } from '@/components/CodePreview';
import { ConfigurationsSelector } from '@/components/ConfigurationSelector';
import { sampleConfigurations } from '@/components/types';


export default function TestPage() {

    const [selectedConfig, setSelectedConfig] = useState({});

    const myEvents = [
        {
            start: '2025-07-11T09:00',
            end: '2025-07-11T10:00',
            title: 'Team meeting',
        },
    ];

    const myView = {
        calendar: { labels: true },
        agenda: { type: 'day' },
    };


    const mergedProps = {
        view: myView,
        ...selectedConfig,
    };


    const testCode = {
        tsx: `
import { /* Component */ } from '@mobiscroll/react';
import { useCallback, useEffect, useMemo, useState } from 'react';

function App() {


  return (
    <>
      </* Componet */ 
       /* Component options */
      </>
  );
}
  `.trim(),
    };


    return (
        <div >
            <div className="w-full xl:w-[80%] flex flex-col lg:flex-row gap-1 transition-all duration-500 ease-in-out">
                <div className="w-full lg:w-[30%] min-w-[250px] max-w-xs">
                    <ConfigurationsSelector
                        configurations={sampleConfigurations}
                        onChange={setSelectedConfig}
                        selected={selectedConfig}
                    />
                </div>
                <div className="w-full overflow-auto max-w-full transition-all duration-500 ease-in-out">
                    <CodePreview code={testCode} language={'tsx'} />
                </div>
                <div className="flex flex-col  justify-center items-center  max-w-[400px] w-full mx-auto lg:mx-0 min-h-[700px]  sm:scale-[0.6] md:scale-[0.7] lg:scale-[0.8]">
                    <div className="transform origin-top scale-100 md:scale-[1] lg:scale-[1] transition-transform duration-300">
                        <LivePreview
                            componentName="Eventcalendar"
                            mergedProps={mergedProps}
                            events={myEvents}

                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
