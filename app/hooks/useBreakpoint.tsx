import { useState, useEffect } from 'react';

export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

const breakpoints: Record<Breakpoint, number> = {
    xs: 0,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536,
};

const getCurrentBreakpoint = (width: number): Breakpoint => {
    if (width >= breakpoints['2xl']) return '2xl';
    if (width >= breakpoints.xl) return 'xl';
    if (width >= breakpoints.lg) return 'lg';
    if (width >= breakpoints.md) return 'md';
    if (width >= breakpoints.sm) return 'sm';
    return 'xs';
};

export function useBreakpoint(): Breakpoint {
    const [breakpoint, setBreakpoint] = useState<Breakpoint>(() =>
        getCurrentBreakpoint(typeof window !== 'undefined' ? window.innerWidth : 0)
    );

    useEffect(() => {
        const handleResize = () => {
            setBreakpoint(getCurrentBreakpoint(window.innerWidth));
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Call immediately to set initial value

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return breakpoint;
}