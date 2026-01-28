export interface ApiResponse<T = unknown> {
    data: T | null;
    error: ApiError | null;
    meta?: ApiMeta;
}

export interface ApiError {
    code: string;
    message: string;
    details?: unknown;
}

export interface ApiMeta {
    page?: number;
    limit?: number;
    total?: number;
    timestamp: string;
}

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface RequestOptions extends RequestInit {
    params?: Record<string, string | number | boolean>;
    requiresAuth?: boolean;
}
