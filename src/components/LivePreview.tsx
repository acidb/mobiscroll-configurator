'use client'

import React, { useEffect, useCallback, useState } from 'react';
import {
    Eventcalendar,
    Select,
    getJson,
    Datepicker,
    MbscEventClickEvent,
    Toast
} from '@mobiscroll/react';
import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import { templateCodes } from './reactTemplates';
import { hookCodes } from './reactHooks';

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
    hooks?: any;
    isScheduler: boolean;
}

export const LivePreview: React.FC<LivePreviewProps> = ({
    componentName,
    mergedProps,
    data = [],
    template,
    hooks,
    isScheduler,
}) => {
    const Component = componentMap[componentName];
    const {
        data: eventData = [],
        resources = [],
        invalid = []
    } = data || {};

    const [toastOpen, setToastOpen] = useState(false);
    const [toastText, setToastText] = useState('');

    const handleEventClick = useCallback((args: MbscEventClickEvent) => {
        setToastText(args.event.title ?? '');
        setToastOpen(true);
    }, []);

    const customHandlers: { key: string; fn: (...args: any[]) => void }[] = [
        { key: 'myEventClick', fn: handleEventClick },
    ];

    const templateProps: Record<string, any> = {};
    const hookProps: Record<string, any> = {};

    if (template && typeof template === 'object') {
        for (const [propName, templateKey] of Object.entries(template as Record<string, string>)) {
            if (typeof templateKey === 'string' && templateCodes[templateKey]) {
                templateProps[propName] = templateCodes[templateKey];
            }
        }
    }

    if (hooks && typeof hooks === 'object') {
        for (const [propName, hookKey] of Object.entries(hooks as Record<string, string>)) {
            if (typeof hookKey === 'string' && hookCodes[hookKey]) {
                hookProps[propName] = hookCodes[hookKey];
            }
        }
    }
    if (hooks && typeof hooks === 'object') {
        for (const [propName, hookKey] of Object.entries(hooks as Record<string, string>)) {
            const handlerObj = customHandlers.find(h => h.key === hookKey);
            if (handlerObj) {
                hookProps[propName] = handlerObj.fn;
            } else if (typeof hookKey === 'string' && hookCodes[hookKey]) {
                hookProps[propName] = hookCodes[hookKey];
            }
        }
    }



    console.log(isScheduler);
    return (
        <>
            {isScheduler ? (
                <div className="mockup-window border border-base-300 w-full rounded-mg">
                    <Component
                        themeVariant="light"
                        {...mergedProps}
                        data={eventData}
                        resources={resources}
                        invalid={invalid}
                        {...templateProps}
                        {...hookProps}
                        className="min-h-[600px]"
                    />
                    <Toast
                        message={toastText}
                        isOpen={toastOpen}
                        onClose={() => setToastOpen(false)}
                    />
                </div>
            ) : (
                <div className="mockup-phone">
                    <div className="mockup-phone-camera z-50" />
                    <div className="mockup-phone-display">
                        <Component
                            themeVariant="light"
                            {...mergedProps}
                            data={eventData}
                            resources={resources}
                            invalid={invalid}
                            {...templateProps}
                            {...hookProps}
                        />
                        <Toast
                            message={toastText}
                            isOpen={toastOpen}
                            onClose={() => setToastOpen(false)}
                        />
                    </div>
                </div>
            )}
        </>
    );
};





