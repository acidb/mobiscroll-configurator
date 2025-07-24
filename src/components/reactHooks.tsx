// reactHooks.ts
// reactHooks.ts
/*
This file is for adding new Mobiscroll event handler functions ("hooks").
You can trigger events like 'onCellClick' or 'onEventClick' using these hooks.
See the full list of supported events in the docs: https://mobiscroll.com/docs/react/datepicker/api#events

If you want to add a new function for an event, follow these steps:

* STEP 1: Define the event handler here
  Below the 'export const hooks', add your event handler with this template:

    yourEventName: {
      fn: () => { },
      code: {
        tsx: `// TSX code that will show in the code preview`.trim(),
        jsx: `// JSX code, if applicable`.trim(),
        // You can add more keys for 'js', 'sfcjs', 'sfcts', 'template', 'html', etc.
      }
    }

  !!! IMPORTANT: The 'fn' function (for the live preview) **must always be:**  '() => { },'
  This function will be copied directly into 'LivePreview.tsx'.

  !!! IMPORTANT: The code you put under 'tsx', 'jsx', etc. **must be valid code** for that language.
  Supported languages: 'TSX', 'JSX', 'JS', 'SFCJS', 'SFCTS', 'SFC TS', 'SFC JS', 'TEMPLATE', 'HTML'.
  See all available language keys in './reactTemplates'.

* STEP 2: Register the handler in LivePreview.tsx
  After you add your function above, **open './LivePreview.tsx'**.
  Follow the instructions in the comment labeled 'Adding New Event Function'.

* STEP 3: Finalize it in ConfigurationsSelector.tsx
  Once you've wired up your event in 'LivePreview.tsx',
  go to './ConfigurationsSelector.tsx' and follow the instructions at the top of the file
  (look for the comment "Finalizing new event add").

*/



export function toVueEventName(hookName: string): string {
  const name = hookName.startsWith('on') ? hookName.slice(2) : hookName;
  return name
    .replace(/([A-Z])/g, '-$1')
    .replace(/^-/, '')
    .toLowerCase();
}

export const hooks = {
  extendDefaultEvent: {
    fn: () => { },
    code: {
      tsx: `
 const extendDefaultEvent = (args: any) => {
        return {  
            color: args.resource === 'admin' ? 'green' : 'red',
            title: 'My event',
        };
    }`.trim(),
      jsx: `
 const extendDefaultEvent = (args) => {
        return {
            color: args.resource === 'admin' ? 'green' : 'red',
            title: 'My event',
        };
    }`.trim(),
      sfcjs: `
function extendDefaultEvent(args) {
  return {
    color: args.resource === 'admin' ? 'green' : 'red',
    title: 'My event',
  };
  }`.trim(),

      sfcts: `
function extendDefaultEvent(args: any) {
  return {
    color: args.resource === 'admin' ? 'green' : 'red',
    title: 'My event',
  };
}`.trim()
    }
  },
  myEventClick: {
    fn: () => { },
    code: {
      tsx: `
 const myEventClick = useCallback((args: MbscEventClickEvent) => {
        // setToastText(args.event.title ?? '');
        // setToastOpen(true);
    }, []);
`.trim(),
      jsx: `
 const myEventClick = useCallback((args) => {
    // setToastText(args.event.title);
    // setToastOpen(true);
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
  },
  defaultEventHandler: {
    fn: () => { },
    code: {
      tsx: `
const defaultEventHandler = useCallback((args: any) => {
   setToastText((args?.type || '') + ' triggered');
        setToastOpen(true);
}, []);
`.trim(),
      jsx: `
const defaultEventHandler = useCallback((args) => {
  setToastText((args?.type || '') + ' triggered');
  setToastOpen(true);
}, []);
`.trim(),
      sfcjs: `
function defaultEventHandler(args) {
  setToastText((args?.type || '') + ' triggered');
        setToastOpen(true);
}
`.trim(),
      sfcts: `
function defaultEventHandler(args: any) {
  setToastText((args?.type || '') + ' triggered');
        setToastOpen(true);
}
`.trim(),
    }
  }
};

export const hookCodes = Object.fromEntries(
  Object.entries(hooks).map(([k, v]) => [k, v.fn])
);

import { Lang } from './reactTemplates'

export const hookStrs = (lang: Lang = 'TSX') =>
  Object.fromEntries(
    Object.entries(hooks).map(([k, v]) => {
      const key = lang.replace(/\s+/g, '').toLowerCase();
      return [k, v.code[key as keyof typeof v.code]];
    })
  );
