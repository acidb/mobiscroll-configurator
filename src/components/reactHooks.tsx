import { Eventcalendar, getJson, setOptions, Toast ,MbscEventClickEvent} from '@mobiscroll/react';


export function toVueEventName(hookName: string): string {
    let name = hookName.startsWith('on') ? hookName.slice(2) : hookName;
    return name
        .replace(/([A-Z])/g, '-$1')
        .replace(/^-/, '')
        .toLowerCase();
}



export const hooks = {
    myEventClick: {
        fn: (event: any) => {
            alert('Event clicked! ' + (event.title || ''));
        },
        code: {
            tsx: `
const myEventClick = useCallback((args: MbscEventClickEvent) => {
  alert('Event clicked! ' + (args?.event?.title || ''));
}, []);
`.trim(),
            jsx: `
const myEventClick = (args) => {
  alert('Event clicked! ' + (args?.event?.title || ''));
};
`.trim(),
            vue: `
const myEventClick = (args) => {
  alert('Event clicked! ' + (args?.event?.title || ''));
};
`.trim()
        }
    },
};


export const hookCodes = Object.fromEntries(
    Object.entries(hooks).map(([k, v]) => [k, v.fn])
);


type Lang = 'TSX' | 'JSX' | 'VUE' | 'SFCJS' | 'SFCTS' | 'SFC TS' | 'SFC JS';

export const hookStrs = (lang: Lang = 'TSX') =>
    Object.fromEntries(
        Object.entries(hooks).map(([k, v]) => {
            const key = lang.replace(/\s+/g, '').toLowerCase();
            return [k, v.code[key as keyof typeof v.code]];
        })
    );
