'use client'

import React from 'react';
import { Eventcalendar, Select, Datepicker } from "@mobiscroll/react";
import '@mobiscroll/react/dist/css/mobiscroll.min.css';

const componentMap: Record<string, React.ElementType> = {
    eventcalendar: Eventcalendar,
    select: Select,
    datepicker: Datepicker
};


export interface LivePreviewProps {
    componentName: string;    // Name of the Mobiscroll Component;
    mergedProps: Record<string, any>;  // configuration props merged from the preset and configuratorSelector
    events?: any; // events that will be displayed one the component
}

export const LivePreview: React.FC<LivePreviewProps> = ({
    componentName,
    mergedProps,
    events = [],
}) => {
    const Component = componentMap[componentName];

    return (
        <div className="mockup-phone">
            <div className="mockup-phone-camera z-50" />
            <div className="mockup-phone-display">
                <Component
                    {...mergedProps}
                    {...(componentName === "Eventcalendar" ? { data: events } : {})}
                />

                {/* TODOO Something is wrong with the select component need to be fixed */}
            </div>
        </div>
    );
};





