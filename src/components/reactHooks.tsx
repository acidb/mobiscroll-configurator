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
