// contexts/RequestsContext.tsx
"use client"

// import { handleCreateRequest } from '@/app/actions/request';
import { Request, RequestOrder, PaginationData } from '@/app/types';
import { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
import { deleteRequestReq } from '../actions/request';
import { toast } from 'sonner';

interface RequestsContextType {
    requests: Request[];
    pagination: PaginationData | null;
    isLoadingMore: boolean;
    loadMoreRequests: () => Promise<void>;
    appendRequests: (newRequests: Request[]) => void;
    setPagination: (pagination: PaginationData) => void;
    setLoadingMore: (loading: boolean) => void;
    removeRequest: (request_id: string | number) => void;
    // request_id: string | number;
    // createRequest: (inputs: RequestInputs) => Promise<Request | undefined>;
}

const RequestsContext = createContext<RequestsContextType | undefined>(undefined);

interface RequestsProviderProps {
    init_data?: Request[] | null;
    // request_id: string | number;
    children: ReactNode;
    requestOrder: RequestOrder;
    initialPagination?: PaginationData | null;
    onLoadMore?: (cursor: string, direction: 'next') => Promise<{ data: Request[]; pagination: PaginationData }>;
}

export function RequestsProvider({
    children,
    init_data,
    requestOrder,
    // request_id,
    initialPagination = null,
    onLoadMore
}: RequestsProviderProps) {
    const [requests, setRequests] = useState<Request[]>(init_data ?? []);
    const [pagination, setPagination] = useState<PaginationData | null>(initialPagination);
    const [isLoadingMore, setLoadingMore] = useState(false);

    useEffect(() => {
        setRequests(init_data ?? []);
    }, [init_data]);

    useEffect(() => {
        if (initialPagination) {
            setPagination(initialPagination);
        }
    }, [initialPagination]);

    // async function createRequest(inputs: RequestInputs) {
    //     try {
    //         const newRequest = await handleCreateRequest({
    //             body: inputs.body,
    //             request_id: inputs.request_id,
    //             parent_id: inputs.parent_id
    //         });

    //         if (newRequest) {
    //             if (requestOrder === 'new') {
    //                 setRequests(prev => ([newRequest, ...prev]));
    //             } else {
    //                 setRequests(prev => ([...prev, newRequest]));
    //             }
    //         }

    //         return newRequest;
    //     } catch (error) {
    //         throw new Error("Something went wrong");
    //     }
    // }

    const appendRequests = useCallback((newRequests: Request[]) => {
        setRequests(prev => [...prev, ...newRequests]);
    }, []);

    async function removeRequest(request_id: string | number) {

        const res = await deleteRequestReq(request_id)
        if (!res.error) {
            toast.error("خطا در حذف درخواست. دوباره تلاش کنید.")
            return
        }

        setRequests(prev => prev.filter(c => c.id !== request_id))
        toast.success("درخواست شما حذف شد")


    }

    const loadMoreRequests = useCallback(async () => {
        if (!onLoadMore || !pagination?.has_more_pages || isLoadingMore) return;

        setLoadingMore(true);
        try {
            const result = await onLoadMore(pagination.next_cursor!, 'next');
            appendRequests(result.data);
            setPagination(result.pagination);
        } catch (error) {
            console.error('Failed to load more requests:', error);
        } finally {
            setLoadingMore(false);
        }
    }, [onLoadMore, pagination, isLoadingMore, appendRequests]);

    const values = {
        requests,
        // request_id,
        pagination,
        isLoadingMore,
        // createRequest,
        loadMoreRequests,
        appendRequests,
        setPagination,
        setLoadingMore,
        removeRequest
    };

    return (
        <RequestsContext.Provider value={values}>
            {children}
        </RequestsContext.Provider>
    );
}

export function useRequests() {
    const context = useContext(RequestsContext);
    if (context === undefined) {
        throw new Error('useRequests must be used within an RequestsProvider');
    }
    return context;
}