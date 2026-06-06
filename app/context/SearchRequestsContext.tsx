// contexts/SearchRequestsContext.tsx
"use client"

import { useRouter, useSearchParams } from 'next/navigation';
import { createContext, useContext, useState, ReactNode, ChangeEvent, KeyboardEvent } from 'react';

interface SearchRequestsContextType {
    searchValue: string;
    search: string | null;
    clearInput: () => void;
    cancelSearch: () => void;
    results_count?: number;
    onSearchChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handleKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
}

const SearchRequestsContext = createContext<SearchRequestsContextType | undefined>(undefined);

export function SearchRequestsProvider({ children, results_count }: { children: ReactNode, results_count?: number }) {
    const searchParams = useSearchParams()
    const search = searchParams.get("search")
    const [searchValue, setSearchValue] = useState<string>
        (search ?? "")

    const router = useRouter()

    function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {

        if (e.key === 'Enter') {

            if (searchValue.trim().length === 0) return

            router.push(`/requests?search=${searchValue.trim()}`)

        }

    }

    function onSearchChange(e: ChangeEvent<HTMLInputElement>) {
        setSearchValue(e.target.value)
    }

    function clearInput() {
        setSearchValue("")
    }

    function cancelSearch() {
        setSearchValue("")
        router.push("/requests")
    }

    const values = {
        searchValue,
        search,
        clearInput,
        results_count,
        cancelSearch,
        onSearchChange,
        handleKeyDown
    }

    return (
        <SearchRequestsContext.Provider value={values}>
            {children}
        </SearchRequestsContext.Provider>
    );
}

export function useSearchRequests() {
    const context = useContext(SearchRequestsContext);
    if (context === undefined) {
        throw new Error('useSearchRequests must be used within an SearchRequestsProvider');
    }
    return context;
}