// In thise file is the function that generates the props to string
// Here needs to be added more functions for different frameworks 
import { capitalizeFirstLetter } from './capitalizeFirstLetter';

export function genCodeWithTopVars(
    framework: string,
    componentName: string,
    props: Record<string, any>,
    data?: Record<string, any>,
    hooks?: Record<string, any>,
    templates?: Record<string, any>,
    extracted: string[] = ['data', 'view', 'resources', 'invalid', 'colors', 'templates', 'hooks']
) {
    const topVars: string[] = [];
    const templateInlineProps: string[] = [];
    const liveViewInlineProps = props;

    const extractedValues: Record<string, any> = {};
    const extractedInlineValues: Record<string, any> = {};

    const mergedProps = { ...props, ...data, ...hooks, ...templates };

    const hooksObj: Record<string, any> = {};
    const templateObj: Record<string, any> = {};

    Object.entries(mergedProps).forEach(([key, value]) => {
        if (extracted.includes(key)) {
            extractedValues[key] = value;
            extractedInlineValues[key] = (`my${capitalizeFirstLetter(key)}`);
        }
        else if (hooks && typeof value === 'object') {
            hooksObj[key] = value;
        }
        else if (hooks && typeof value === 'object') {
            templateObj[key] = value;
        }
        else if (typeof value === 'string') {
            if (framework === 'react') {
                templateInlineProps.push(`${key}="${value}"`);
            } else if (framework === 'angular') {
                templateInlineProps.push(`[${key}]="'${value.replace(/'/g, "\\'")}'"`);
            } else if (framework === 'vue') {
                templateInlineProps.push(`:${key}="'${value.replace(/'/g, "\\'")}'"`);
            } else {
                templateInlineProps.push(`${key}: "${value}"`);
            }
        } else if (typeof value === 'boolean' || typeof value === 'number') {
            if (framework === 'react') {
                templateInlineProps.push(`${key}={${value}}`);
            } else if (framework === 'angular') {
                templateInlineProps.push(`[${key}]="${value}"`);
            } else if (framework === 'vue') {
                templateInlineProps.push(`:${key}="${value}"`);
            } else {
                templateInlineProps.push(`${key}: ${value}`);
            }
        } else if (typeof value !== 'undefined') {
            if (framework === 'react') {
                templateInlineProps.push(`${key}={${JSON.stringify(value)}}`);
            } else if (framework === 'angular') {
                templateInlineProps.push(`[${key}]="${key}"`);
            } else if (framework === 'vue') {
                templateInlineProps.push(`:${key}="${key}"`);
            } else {
                templateInlineProps.push(`${key}: ${JSON.stringify(value)}`);
            }
        }
    });

    if (Object.keys(hooksObj).length > 0) {
        extractedValues.hooks = hooksObj;
        extractedInlineValues.hooks = {};
        for (const key of Object.keys(hooksObj)) {
            extractedInlineValues.hooks[key] = `my${capitalizeFirstLetter(key)}`;
        }
    }
    if (Object.keys(templateObj).length > 0) {
        extractedValues.templates = templateObj;
        extractedInlineValues.templates = {};
        for (const key of Object.keys(templateObj)) {
            extractedInlineValues.templates[key] = `my${capitalizeFirstLetter(key)}`;
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
    };
}


export function filterInvalidProps(obj: any): any {
    if (Array.isArray(obj)) {
        return obj.map(filterInvalidProps);
    }
    if (obj !== null && typeof obj === 'object') {
        const result: Record<string, any> = {};
        for (const [key, value] of Object.entries(obj)) {
            if (typeof value === 'string' && value.trim().startsWith('/*')) continue;
            result[key] = filterInvalidProps(value);
        }
        return result;
    }
    return obj;
}
