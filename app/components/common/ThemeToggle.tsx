'use client'

import { Moon, SunDim } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

function ThemeToggleSkeleton() {
    return (
        <div className="p-3 rounded-full text-foreground hover:bg-muted">
            <div className="w-6 min-w-6 aspect-square animate-pulse bg-muted rounded-xl" />
        </div>
    )
}

function ThemeToggle() {

    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        if (!mounted) {
            setMounted(true);
        }
    }, [])

    const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

    if (!mounted) {
        // if (true) {
        return <ThemeToggleSkeleton />
    }

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-foreground hover:bg-muted"
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
        >
            {theme === 'light' ?
                <SunDim className="size-6" aria-hidden="true" /> :
                <Moon className="size-6" aria-hidden="true" />
            }
        </button>
    );
}

export default ThemeToggle;