'use client'

import React, { useEffect } from 'react';
import { Eventcalendar, Select, Datepicker } from "@mobiscroll/react";
import '@mobiscroll/react/dist/css/mobiscroll.min.css';

const componentMap: Record<string, React.ElementType> = {
    eventcalendar: Eventcalendar,
    select: Select,
    datepicker: Datepicker
};


export interface LivePreviewProps {
    componentName: string;
    mergedProps: Record<string, any>;
    data?: any;
}

export const LivePreview: React.FC<LivePreviewProps> = ({
    componentName,
    mergedProps,
    data = [],
}) => {
    const Component = componentMap[componentName];



    const {
        data: eventData = [],
        resources = [],
        invalid = []
    } = data || {};

    return (
        <>
            <div className="mockup-phone">
                <div className="mockup-phone-camera z-50" />
                <div className="mockup-phone-display">
                    <Component
                        {...mergedProps}
                        data={eventData}
                        resources={resources}
                        invalid={invalid}
                    />
                </div>
            </div>
        </>

    );
};





