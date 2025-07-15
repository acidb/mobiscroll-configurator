// In thise file is the function that generates the props to string
// Here needs to be added more functions for different frameworks 

export function genReactProps(props: Record<string, any>): string {
    const indent = '  ';
    return Object.entries(props)

        .sort(([a], [b]) => a.localeCompare(b))
        .map(([k, v]) => {
            if (typeof v === 'string' && v.trim().startsWith('/*')) {
                return null;;
            }
            if (typeof v === 'boolean' || typeof v === 'number') return `  ${k}={${v}}`;
            if (typeof v === 'string') return `  ${k}="${v}"`;
            return `${indent}${k}={${JSON.stringify(v)}}`;
        })
        .filter(Boolean)
        .join('\n');
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
