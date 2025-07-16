'use client'

import React, { useEffect, useCallback, useState } from 'react';
import {
    Eventcalendar,
    Select,
    getJson,
    Datepicker,
    MbscEventClickEvent,
} from '@mobiscroll/react';
import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import { templateCodes } from './reactTemplates';


const componentMap: Record<string, React.ElementType> = {
    eventcalendar: Eventcalendar,
    select: Select,
    datepicker: Datepicker
};


export interface LivePreviewProps {
    componentName: string;
    mergedProps: Record<string, any>;
    data?: any;
    template?: any;
}

export const LivePreview: React.FC<LivePreviewProps> = ({
    componentName,
    mergedProps,
    data = [],
    template,
}) => {
    const Component = componentMap[componentName];

    const {
        data: eventData = [],
        resources = [],
        invalid = []
    } = data || {};

    const templateProps: Record<string, any> = {};

    if (template && typeof template === 'object') {
        for (const [propName, templateKey] of Object.entries(template as Record<string, string>)) {
            if (typeof templateKey === 'string' && templateCodes[templateKey]) {
                templateProps[propName] = templateCodes[templateKey];
            }
        }
    }


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
                        {...templateProps}
                    />
                </div>
            </div>


        </>

    );
};





