// lib/zod-errors.ts

import { ZodError } from "zod";

export function zodFieldErrors(error: ZodError) {

    const result: Record<string, string[]> = {};

    for (const issue of error.issues) {

        const field = issue.path[0]?.toString();

        if (!field) continue;

        if (!result[field]) {
            result[field] = [];
        }

        result[field].push(issue.message);
    }

    return result;
}