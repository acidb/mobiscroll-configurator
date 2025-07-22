// In thise file is the function that generates the props to string
// Here needs to be added more functions for different frameworks 
import { capitalizeFirstLetter } from './capitalizeFirstLetter';
import type { MbscEventcalendarView } from '@mobiscroll/react';

export function genCodeWithTopVars(
    framework: string,
    componentName: string,
    props: Record<string, string | number | boolean | null | MbscEventcalendarView>,
    data?: Record<string, string>,
    extracted: string[] = ['data', 'view', 'resources', 'invalid', 'colors', 'templates', 'hooks']
) {
    const topVars: string[] = [];
    const templateInlineProps: string[] = [];
    const liveViewInlineProps = props;

    const extractedValues: Record<string, any> = {};
    const extractedInlineValues: Record<string, any> = {};


    const mergedProps = { ...props, ...data };

    console.log(JSON.stringify(mergedProps, null, 2));

    const hooksObj: Record<string, string> = {};


    const effectiveComponentName = (framework === 'js' || framework === 'jquery')
        ? componentName.toLowerCase()
        : componentName;

    Object.entries(mergedProps).forEach(([key, value]) => {

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
        } else if (typeof value !== 'undefined') {
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
