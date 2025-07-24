import { Eventcalendar, getJson } from '@mobiscroll/react';
import type {
    MbscResource,
    MbscEventClickEvent,
    MbscCalendarEvent,
} from '@mobiscroll/react';
import { FC, useCallback, useEffect, useState } from 'react';

const App: FC = () => {
    const [myData, setMyData] = useState<MbscCalendarEvent[]>([]);

    const myView = {
        timeline: {
            type: 'month',
        },
    };
    useEffect(() => {
        getJson(
            'https://trial.mobiscroll.com/timeline-events/',
            (events: MbscCalendarEvent[]) => {
                setMyData(events);
            },
            'jsonp'
        );
    }, []);
    const myResources = [
        {
            id: 1,
            name: 'Test 1',
        },
        {
            id: 2,
            name: 'Test 2',
        },
        {
            id: 3,
            name: 'Test 3',
        },
    ];

    const renderResource = useCallback(
        (resource: MbscResource) => (
            <div className="px-3 py-2 bg-blue-50 border-l-4 border-blue-600 rounded flex flex-col">
                <span className="font-semibold text-blue-800">{resource.name}</span>
                <span className="text-xs text-blue-400">Resource ID: {resource.id}</span>
                <span className="text-xs text-blue-400 italic mt-1">
                    This is a test template to check rendering.
                </span>
            </div>
        ),
        []
    );

    const myEventClick = useCallback((args: MbscEventClickEvent) => {
        // setToastText(args.event.title ?? '');
        // setToastOpen(true);
    }, []);

    return (
        <>
            <Eventcalendar
                data={myData}
                resources={myResources}
                renderResource={renderResource}
                clickToCreate={true}
                dragToMove={true}
                onEventClick={myEventClick}
            />
        </>
    );
};

export default App;
