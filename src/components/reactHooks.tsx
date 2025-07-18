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
 const handleEventClick = useCallback((args: MbscEventClickEvent) => {
        setToastText(args.event.title ?? '');
        setToastOpen(true);
    }, []);
`.trim(),
            jsx: `
 const handleEventClick = useCallback((args) => {
    setToastText(args.event.title);
    setToastOpen(true);
  }, []);

`.trim(),
            sfcjs: `
function handleEventClick(args) {
  toastMessage.value = args.event.title
  isToastOpen.value = true
}
`.trim(),
            sfcts: `
function handleEventClick(args: MbscEventClickEvent) {
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
    },
    myEventCreateFailed: {
        fn: () => { },
        code: {
            tsx: `
 const handleEventCreateFailed = useCallback((args: MbscEventCreateFailedEvent) => {
        setToastText(args.event.title ?? '');
        setToastOpen(true);
    }, []);
`.trim(),
            jsx: `
 const handleEventCreateFailed = useCallback((args) => {
    setToastText(args.event.title);
    setToastOpen(true);
  }, []);

`.trim(),
            sfcjs: `
function handleEventCreateFailed(args) {
  toastMessage.value = args.event.title
  isToastOpen.value = true
}
`.trim(),
            sfcts: `
function handleEventCreateFailed(args: MbscEventCreateFailedEvent) {
  toastMessage.value = args.event.title || ''
  isToastOpen.value = true
}
`.trim()
        }
    },
    myEventDeleteFailed: {
        fn: () => { },
        code: {
            tsx: `
 const handleEventDeleteFailed = useCallback((args: MbscEventDeleteFailedEvent) => {
        setToastText(args.event.title ?? '');
        setToastOpen(true);
    }, []);
`.trim(),
            jsx: `
 const handleEventDeleteFailed = useCallback((args) => {
    setToastText(args.event.title);
    setToastOpen(true);
  }, []);

`.trim(),
            sfcjs: `
function handleEventDeleteFailed(args) {
  toastMessage.value = args.event.title
  isToastOpen.value = true
}
`.trim(),
            sfcts: `
function handleEventDeleteFailed(args: MbscEventDeleteFailedEvent) {
  toastMessage.value = args.event.title || ''
  isToastOpen.value = true
}
`.trim()
        }
    },
    myChange: {
        fn: () => { },
        code: {
            tsx: `
 const handleEventChange = useCallback((args: MbscSelectedEventsChangeEvent) => {
        setToastText(args.event.title ?? '');
        setToastOpen(true);
    }, []);
`.trim(),
            jsx: `
 const handleEventChange = useCallback((args) => {
    setToastText(args.event.title);
    setToastOpen(true);
  }, []);

`.trim(),
            sfcjs: `
function handleEventChange(args) {
  toastMessage.value = args.event.title
  isToastOpen.value = true
}
`.trim(),
            sfcts: `
function handleEventChange(args: MbscSelectedEventsChangeEvent) {
  toastMessage.value = args.event.title || ''
  isToastOpen.value = true
}
`.trim()
        }
    },
    myEventUpdate: {
        fn: () => { },
        code: {
            tsx: `
 const handleEventUpdate = useCallback((args: MbscEventUpdateEvent) => {
        setToastText(args.event.title ?? '');
        setToastOpen(true);
    }, []);
`.trim(),
            jsx: `
 const handleEventUpdate = useCallback((args) => {
    setToastText(args.event.title);
    setToastOpen(true);
  }, []);

`.trim(),
            sfcjs: `
function handleEventUpdate(args) {
  toastMessage.value = args.event.title
  isToastOpen.value = true
}
`.trim(),
            sfcts: `
function handleEventUpdate(args: MbscEventUpdateEvent) {
  toastMessage.value = args.event.title || ''
  isToastOpen.value = true
}
`.trim()
        }
    },
    myTaskCreate: {
        fn: () => { },
        code: {
            tsx: `
 const handleTaskCreate = useCallback((args: MbscTaskCreateEvent) => {
        setToastText(args.task.title ?? '');
        setToastOpen(true);
    }, []);
`.trim(),
            jsx: `
 const handleTaskCreate = useCallback((args) => {
    setToastText(args.task.title);
    setToastOpen(true);
  }, []);

`.trim(),
            sfcjs: `
function handleTaskCreate(args) {
  toastMessage.value = args.task.title
  isToastOpen.value = true
}
`.trim(),
            sfcts: `
function handleTaskCreate(args: MbscTaskCreateEvent) {
  toastMessage.value = args.task.title || ''
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
