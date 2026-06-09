// lib/cache.ts
import { cache } from "react"

export function cached<T extends (...args: any[]) => Promise<any>>(fn: T): T {
    return cache(fn)
}