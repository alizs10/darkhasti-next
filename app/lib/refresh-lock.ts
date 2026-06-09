// lib/refresh-lock.ts
//
// Prevents the race condition where multiple concurrent auth() calls each
// independently attempt to refresh the token. Only one refresh runs at a
// time; every other caller waits for the same promise and gets the result.

import { TokenData } from "../actions/auth"; // adjust path to your refresh() action

type RefreshFn = (token: string) => Promise<TokenData>;

let inflightRefresh: Promise<TokenData> | null = null;

/**
 * Call this instead of calling refresh() directly inside the JWT callback.
 * If a refresh is already in progress, the returned promise resolves to the
 * same result — no second HTTP request is made.
 */
export async function lockedRefresh(
    refreshToken: string,
    refreshFn: RefreshFn
): Promise<TokenData> {
    if (inflightRefresh) {
        // Another caller already started a refresh — piggyback on it.
        return inflightRefresh;
    }

    inflightRefresh = refreshFn(refreshToken).finally(() => {
        // Clear the lock once the refresh settles (success or failure).
        inflightRefresh = null;
    });

    return inflightRefresh;
}