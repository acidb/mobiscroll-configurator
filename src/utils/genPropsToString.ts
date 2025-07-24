// In thise file is the function that generates the props to string
// Here needs to be added more functions for different frameworks 
import { capitalizeFirstLetter } from './capitalizeFirstLetter';
import type { MbscEventcalendarView, MbscCalendarEvent } from '@mobiscroll/react';

export function genCodeWithTopVars(
    framework: string,
    componentName: string,
    props: Record<string, string | number | boolean | null | MbscEventcalendarView>,
    data?: Record<string, string>,
    templates?: Record<string, string>,
    hooks?: Record<string, string>,
    extracted: string[] = ['data', 'view', 'resources', 'invalid', 'colors', 'templates', 'hooks'],
) {
    const topVars: string[] = [];
    const templateInlineProps: string[] = [];
    const liveViewInlineProps = props;

    const extractedValues: Record<string, any> = {};
    const extractedInlineValues: Record<string, any> = {};


    const mergedProps = { ...props, ...data };


    const hooksObj: Record<string, string> = {};


    const effectiveComponentName = (framework === 'js' || framework === 'jquery')
        ? componentName.toLowerCase()
        : componentName;

    Object.entries(mergedProps).forEach(([key, value]) => {

        if (templates && templates[key]) return;
        if (hooks && hooks[key]) return;

        if (extracted.includes(key)) {
            extractedValues[key] = value;
            extractedInlineValues[key] = `my${capitalizeFirstLetter(key)}`;
            return;
        }

        let formatted = '';



        if (typeof value === 'string') {
            const escaped = value.replace(/'/g, "\\'");
            switch (framework) {
                case 'react':
                    formatted = `${key}="${value}"`;
                    break;
                case 'angular':
                    formatted = `[${key}]="${escaped}"`;
                    break;
                case 'vue':
                    formatted = `:${key}="'${escaped}'"`;
                    break;
                case 'jquery':
                    formatted = `${key}: '${escaped}'`;
                    break;
                default:
                    formatted = `${key}: "${value}"`;
            }
        } else if (typeof value === 'boolean' || typeof value === 'number') {
            switch (framework) {
                case 'react':
                    formatted = `${key}={${value}}`;
                    break;
                case 'angular':
                    formatted = `[${key}]="${value}"`;
                    break;
                case 'vue':
                    formatted = `:${key}="${value}"`;
                    break;
                case 'jquery':
                    formatted = `${key}: ${value}`;
                    break;
                default:
                    formatted = `${key}: ${value},`;
            }
        } else if (typeof value !== undefined) {
            switch (framework) {
                case 'react':
                    formatted = `${key}={${JSON.stringify(value)}}`;
                    break;
                case 'angular':
                    formatted = `[${key}]="${key}"`;
                    break;
                case 'vue':
                    formatted = `:${key}="${key}"`;
                    break;
                case 'jquery':
                    formatted = `${key}: ${JSON.stringify(value)}`;
                    break;
                default:
                    formatted = `${key}: ${JSON.stringify(value)}`;
            }
        }

        if (formatted) {
            templateInlineProps.push(formatted);
        }
    });

    if (Object.keys(hooksObj).length > 0) {
        extractedValues.hooks = hooksObj;
        extractedInlineValues.hooks = {};
        for (const key of Object.keys(hooksObj)) {
            extractedInlineValues.hooks[key] = `my${capitalizeFirstLetter(key)}`;
        }
    }



    return {
        topVars: topVars.join('\n\n'),
        templateInlineProps: templateInlineProps.join(
            framework === 'js' || framework === 'jquery' ? ',\n  ' : '\n  '
        ),
        liveViewInlineProps,
        extractedInlineValues,
        extractedValues,
        componentName: effectiveComponentName,
    };
}

export function filterInvalidProps(obj: any): any {
    if (Array.isArray(obj)) {
        return obj.map(filterInvalidProps);
    }
    if (obj !== null && typeof obj === 'object') {
        const result: Record<string, string> = {};
        for (const [key, value] of Object.entries(obj)) {
            if (typeof value === 'string' && value.trim().startsWith('/*')) continue;
            result[key] = filterInvalidProps(value);
        }
        return result;
    }
    return obj;
}

export function getSmartData(
    data: any,
    lang: string
): string {
    if (data && typeof data === 'object' && data.url) {
        switch (lang) {
            case 'JSX':
                return `
useEffect(() => {
  fetch('${data.url}')
    .then(res => {
      if (!res.ok) throw new Error('HTTP error!');
      return res.json();
    })
    .then(events => {
      setMyData(events);
    })
    .catch(() => {
      setMyData([]);
    });
}, []);
`.trim();

            case 'TSX':
                return `
useEffect(() => {
  fetch('${data.url}')
    .then(res => {
      if (!res.ok) throw new Error('HTTP error!');
      return res.json();
    })
    .then(events => {
      setMyData(events);
    })
    .catch(() => {
      setMyData([]);
    });
}, []);
`.trim();

            default:
                return `// No code template for this language.`;
        }
    }

    return `const myData = ${JSON.stringify(data, null, 2)};`;
}

export function getStateHooks(
    fields: Record<string, any>,
    lang: string
): string {
    let states: string[] = [];
    for (const [name, val] of Object.entries(fields)) {
        if (val && typeof val === 'object' && 'url' in val) {
            const setter = 'set' + name.charAt(0).toUpperCase() + name.slice(1);
            // Use proper generic type only for TS languages
            let stateString = '';
            if (
                lang === 'TSX' ||
                lang === 'SFC TS' ||
                lang === 'SFCTS'
            ) {
                stateString = `const [${name}, ${setter}] = useState<MbscCalendarEvent[]>([]);`;
            } else {
                stateString = `const [${name}, ${setter}] = useState([]);`;
            }
            states.push(stateString);
        }
    }
    return states.join('\n');
}
