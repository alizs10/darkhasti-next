'use client'

import { Moon, SunDim } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "./Button";

function ThemeToggleSkeleton() {
    return (

        <Button
            className="aspect-square p-0!"
            variant="ghost"
            size="md"

        >
            <div className="w-6 min-w-6 aspect-square animate-pulse bg-muted rounded-xl" />
        </Button>
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
        <Button
            onClick={toggleTheme}
            className="aspect-square p-0!"
            variant="ghost"
            size="md"
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
        >
            {theme === 'light' ?
                <SunDim className="size-6" aria-hidden="true" /> :
                <Moon className="size-6" aria-hidden="true" />
            }
        </Button>
    );
}

export default ThemeToggle;