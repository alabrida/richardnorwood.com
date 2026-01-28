import { createClient } from "@/lib/supabase/client";
import { ApiResponse, HttpMethod, RequestOptions } from "./types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

/**
 * Universal Endpoint Module
 * Centralized fetch wrapper for all application requests.
 */
export async function apiRequest<T = unknown>(
    endpoint: string,
    method: HttpMethod = "GET",
    options: RequestOptions = {}
): Promise<ApiResponse<T>> {
    const { params, requiresAuth = true, headers, ...rest } = options;

    // Build URL with params
    const url = new URL(`${BASE_URL}${endpoint}`, window.location.origin);
    if (params) {
        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                url.searchParams.append(key, String(value));
            }
        });
    }

    // Build Headers
    const defaultHeaders: HeadersInit = {
        "Content-Type": "application/json",
    };

    // Add Auth Token if required
    if (requiresAuth) {
        const supabase = createClient();
        const { data: { session } } = await supabase.auth.getSession();

        if (session?.access_token) {
            (defaultHeaders as Record<string, string>)["Authorization"] = `Bearer ${session.access_token}`;
        }
    }

    try {
        const response = await fetch(url.toString(), {
            method,
            headers: { ...defaultHeaders, ...headers },
            ...rest,
        });

        const data = await response.json();

        if (!response.ok) {
            return {
                data: null,
                error: {
                    code: String(response.status),
                    message: data.message || response.statusText || "An unexpected error occurred",
                    details: data,
                },
            };
        }

        return {
            data: data as T,
            error: null,
            meta: {
                timestamp: new Date().toISOString(),
            },
        };
    } catch (err) {
        console.error(`API Error [${method} ${endpoint}]:`, err);
        return {
            data: null,
            error: {
                code: "NETWORK_ERROR",
                message: err instanceof Error ? err.message : "Network request failed",
            },
        };
    }
}

// Convenience methods
export const api = {
    get: <T>(endpoint: string, options?: RequestOptions) =>
        apiRequest<T>(endpoint, "GET", options),

    post: <T>(endpoint: string, body: unknown, options?: RequestOptions) =>
        apiRequest<T>(endpoint, "POST", { ...options, body: JSON.stringify(body) }),

    put: <T>(endpoint: string, body: unknown, options?: RequestOptions) =>
        apiRequest<T>(endpoint, "PUT", { ...options, body: JSON.stringify(body) }),

    delete: <T>(endpoint: string, options?: RequestOptions) =>
        apiRequest<T>(endpoint, "DELETE", options),
};
