'use client'

import React, { useCallback, useState, useEffect } from 'react';
import {
    Eventcalendar,
    Select,
    Datepicker,
    MbscEventClickEvent,
    Toast,
    MbscEventcalendarView,
    MbscCalendarEvent,
} from '@mobiscroll/react';
import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import { templateCodes } from './reactTemplates';
import { hookCodes } from './reactHooks';

const componentMap: Record<string, React.ElementType> = {
    eventcalendar: Eventcalendar,
    select: Select,
    datepicker: Datepicker
};

import { MbscCalendarEventData, MbscResource } from '@mobiscroll/react';



export interface LivePreviewProps {
    componentName: string;
    mergedProps: Record<string, string | number | boolean | null | MbscEventcalendarView>;
    data?: {
        data?: Record<string, string>[];
        resources?: Record<string, string>[];
        invalid?: Record<string, string>[];
    };
    template?: Record<string, string>;
    hooks?: Record<string, string>;
    isScheduler: boolean;
}


export const LivePreview: React.FC<LivePreviewProps> = ({
    componentName,
    mergedProps,
    data = {},
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
    const [myData, setMyData] = useState<MbscCalendarEvent[]>([]);

    useEffect(() => {
        let ignore = false;

        if (eventData && typeof eventData === 'object' && 'url' in eventData) {
            fetch(`${eventData.url}`)
                .then(res => {
                    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
                    return res.json();
                })
                .then((events: MbscCalendarEvent[]) => {
                    if (!ignore) setMyData(events);
                })
                .catch(err => {
                    if (!ignore) setMyData([]);
                });
        } else {
            console.log('[LivePreview] Using direct eventData:', eventData);
            setMyData(Array.isArray(eventData) ? eventData : []);
        }

        return () => { ignore = true; };
    }, [eventData]);


    /* Adding New Event Function (Start)
 
     !!! IMPORTANT: Only follow these steps AFTER completing the steps in './reactHooks.ts'.
 
     Once you have created your new event function in './reactHooks.ts', continue here:
 
     * STEP 1: Write the handler function
         - Define your new handler function with the SAME name as in './reactHooks.ts'.
         - Write your new function ABOVE the comment: 'WRITE NEW FUNCTIONS ABOVE THIS'.
         - Follow the structure of existing functions (e.g., useCallback for React handlers if needed).
 
     * STEP 2: Register the handler in 'customHandlers'
         - Add your new function to the 'customHandlers' array.
         - Use this format: { key: yourEventName, fn: yourEventName }
         - Insert it ABOVE the comment: "INSERT NEW FUNCTION HERE".
         
         !!! IMPORTANT: The function name ('key') MUST MATCH exactly in both this file and './reactHooks.ts'.
 
     Example:
 
         // Step 1: Define handler above this line
         const myCustomHandler = useCallback((args) => {
             // your handler logic
         }, []);
 
         // 'WRITE NEW FUNCTIONS ABOVE THIS'
 
         // Step 2: Register handler here
         const customHandlers = [
             { key: 'myCustomHandler', fn: myCustomHandler },
             // "INSERT NEW FUNCTION HERE"
         ];
 
     * STEP 3: Finalize in ConfigurationsSelector.tsx
         - After registering your handler, open './ConfigurationsSelector.tsx'.
         - Follow the steps at the top of the file (look for the comment "Finalizing new event add").
 
     After completing these steps, your new event will be available throughout the app.
 */

    const handleEventClick = useCallback((args: MbscEventClickEvent) => {
        setToastText(args.event.title ?? '');
        setToastOpen(true);
    }, []);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const extendDefaultEvent = (args: any) => {
        return {
            color: args.resource === 'admin' ? 'green' : 'red',
            title: 'My event',
        };
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const defaultEventHandler = useCallback((args: any) => {
        setToastText((args?.type || '') + ' triggered');
        setToastOpen(true);
    }, []);

    // WRITE NEW FUNCTIONS ABOVE THIS


    const customHandlers: { key: string; fn: (...args: MbscEventClickEvent[]) => void }[] = [
        { key: 'handleEventClick', fn: handleEventClick },
        { key: 'extendDefaultEvent', fn: extendDefaultEvent },
        { key: 'defaultEventHandler', fn: defaultEventHandler }

        // INSERT NEW FUNCTION HERE

    ];


    type ResourceTemplateFn = (resource: MbscResource) => React.ReactNode;
    type EventTemplateFn = (event: MbscCalendarEventData) => React.ReactNode;
    type MobiscrollTemplateFn = ResourceTemplateFn | EventTemplateFn;


    const templateProps: Record<string, MobiscrollTemplateFn> = {};
    const hookProps: Record<string, () => void> = {};

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

    function stripOuterQuotes(val: any) {
        if (typeof val === 'string' && /^(['"])(.*)\1$/.test(val)) {
            return val.slice(1, -1);
        }
        return val;
    }
    const safeMergedProps = Object.fromEntries(
        Object.entries(mergedProps).map(([k, v]) => [k, stripOuterQuotes(v)])
    );

    return (
        <>
            {isScheduler ? (
                <div className="mockup-window border my-mockup  bg-white border-base-300 w-full rounded-mg">
                    <Component
                        themeVariant="light"
                        {...safeMergedProps}
                        data={myData}
                        resources={resources}
                        invalid={invalid}
                        {...templateProps}
                        {...hookProps}
                        className="min-h-[700px] max-h-[700px]"
                    />
                    <Toast
                        message={toastText}
                        isOpen={toastOpen}
                        onClose={() => setToastOpen(false)}
                    />
                </div>
            ) : (
                <div className="mockup-phone bg-gray-100">
                    <div className="mockup-phone-camera z-50" />
                    <div className="mockup-phone-display my-mockup">
                        <Component
                            themeVariant="light"
                            {...safeMergedProps}
                            data={myData}
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





