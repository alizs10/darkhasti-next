'use client'

import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Skeleton } from "../ui/Skeleton";

export default function Logo() {
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);



    useEffect(() => {
        setMounted(true);
    }, []);

    // Return a placeholder or nothing while not mounted to avoid mismatch
    if (!mounted) {
        return <Skeleton className="size-10" />; // or null
    }

    const logoSrc = theme === 'dark' ? '/logo-dark.png' : '/logo-light.png';

    return (
        <Image
            src={logoSrc}
            width={40}
            height={40}
            alt="logo"
            className=""
        />
    );
}