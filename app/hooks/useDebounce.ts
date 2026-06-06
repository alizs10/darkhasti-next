import { useEffect, useState } from 'react';

/**
 * Delays updating a value until after a specified delay has passed
 * since the last time the value changed.
 *
 * @param value - The value to debounce.
 * @param delay - Debounce delay in milliseconds.
 * @returns The debounced value.
 */
export function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        // Cleanup: cancel the timeout if `value` or `delay` changes
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}