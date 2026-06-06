import { PaginationData } from "./pagination";

export interface ApiResponse<T = unknown> {
    success: boolean;
    message: string;
    data?: T | null;
    errors?: any;
    pagination?: PaginationData;
    meta?: any;
}


export interface AppError {
    message: string;
    fieldErrors?: Record<string, string[]>;
    status?: number;
}

export interface ActionResult<T = unknown> {
    success: boolean;
    data?: T;
    error?: AppError;
}