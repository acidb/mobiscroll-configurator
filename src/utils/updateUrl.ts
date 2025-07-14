/*
    This file contains the function to update the URL parameters after a configuration change.
    This file can be merged with the URL updater that is used for the framework and component selection.
*/


'use client';
export function updateUrl(params: Record<string, any>) {
    if (typeof window === 'undefined') return;
    const url = new URL(window.location.href);

    Object.entries(params).forEach(([key, value]) => {
        if (value === undefined || value === null || value === '') {
            url.searchParams.delete(key);
        } else {
            url.searchParams.set(key, String(value));
        }
    });
    window.history.replaceState({}, '', url.toString());
}