// reactHooks.ts
export function toVueEventName(hookName: string): string {
    let name = hookName.startsWith('on') ? hookName.slice(2) : hookName;
    return name
        .replace(/([A-Z])/g, '-$1')
        .replace(/^-/, '')
        .toLowerCase();
}

export const hooks = {
    myEventClick: {
        fn: () => { },
        code: {
            tsx: `
 const myEventClick = useCallback((args: MbscEventClickEvent) => {
        setToastText(args.event.title ?? '');
        setToastOpen(true);
    }, []);
`.trim(),
            jsx: `
 const myEventClick = useCallback((args) => {
    setToastText(args.event.title);
    setToastOpen(true);
  }, []);

`.trim(),
            sfcjs: `
function myEventClick(args) {
  toastMessage.value = args.event.title
  isToastOpen.value = true
}
`.trim(),
            sfcts: `
function myEventClick(args: MbscEventClickEvent) {
  toastMessage.value = args.event.title || ''
  isToastOpen.value = true
}
`.trim()
        }
    },
    myEventCreated: {
        fn: () => { },
        code: {
            tsx: `
 const handleEventCreated = useCallback((args: MbscEventCreatedEvent) => {
        setToastText(args.event.title ?? '');
        setToastOpen(true);
    }, []);
`.trim(),
            jsx: `
 const handleEventCreated = useCallback((args) => {
    setToastText(args.event.title);
    setToastOpen(true);
  }, []);

`.trim(),
            sfcjs: `
function handleEventCreated(args) {
  toastMessage.value = args.event.title
  isToastOpen.value = true
}
`.trim(),
            sfcts: `
function handleEventCreated(args: MbscEventCreatedEvent) {
  toastMessage.value = args.event.title || ''
  isToastOpen.value = true
}
`.trim()
        }
    },
    myEventDeleted: {
        fn: () => { },
        code: {
            tsx: `
 const handleEventDeleted = useCallback((args: MbscEventDeletedEvent) => {
        setToastText(args.event.title ?? '');
        setToastOpen(true);
    }, []);
`.trim(),
            jsx: `
 const handleEventDeleted = useCallback((args) => {
    setToastText(args.event.title);
    setToastOpen(true);
  }, []);

`.trim(),
            sfcjs: `
function handleEventDeleted(args) {
  toastMessage.value = args.event.title
  isToastOpen.value = true
}
`.trim(),
            sfcts: `
function handleEventDeleted(args: MbscEventDeletedEvent) {
  toastMessage.value = args.event.title || ''
  isToastOpen.value = true
}
`.trim()
        }
    },
    myEventCreate: {
        fn: () => { },
        code: {
            tsx: `
 const handleEventCreate = useCallback((args: MbscEventCreateEvent) => {
        setToastText(args.event.title ?? '');
        setToastOpen(true);
    }, []);
`.trim(),
            jsx: `
 const handleEventCreate = useCallback((args) => {
    setToastText(args.event.title);
    setToastOpen(true);
  }, []);

`.trim(),
            sfcjs: `
function handleEventCreate(args) {
  toastMessage.value = args.event.title
  isToastOpen.value = true
}
`.trim(),
            sfcts: `
function handleEventCreate(args: MbscEventCreateEvent) {
  toastMessage.value = args.event.title || ''
  isToastOpen.value = true
}
`.trim()
        }
    }


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
