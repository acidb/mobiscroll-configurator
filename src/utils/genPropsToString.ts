// In thise file is the function that generates the props to string
// Here needs to be added more functions for different frameworks 


export function genCodeWithTopVars(
    framework: string,
    componentName: string,
    props: Record<string, any>,
    extracted: string[] = ['data', 'view', 'resources', 'invalid']
) {
    const topVars: string[] = [];
    const templateInlineProps: string[] = [];
    const liveViewInlineProps = props;

    Object.entries(props).forEach(([key, value]) => {
        if (extracted.includes(key)) {
            topVars.push(
                framework === 'angular'
                    ? `  ${key} = ${JSON.stringify(value, null, 2)};`
                    : `const ${key} = ${JSON.stringify(value, null, 2)};`
            );
            if (framework === 'react') {
                templateInlineProps.push(`${key}={${key}}`);
            } else if (framework === 'angular') {
                templateInlineProps.push(`[${key}]="${key}"`);
            } else if (framework === 'vue') {
                templateInlineProps.push(`:${key}="${key}"`);
            } else {
                templateInlineProps.push(`${key}: ${JSON.stringify(value, null, 2)}`);
            }
        } else if (typeof value === 'string') {
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

    return {
        topVars: topVars.join('\n\n'),
        templateInlineProps: templateInlineProps.join(framework === 'js' || framework === 'jquery' ? ',\n  ' : '\n  '),
        liveViewInlineProps // <-- this is just the original props object!
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
