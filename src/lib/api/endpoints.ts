/**
 * Centralized registry of all API endpoints.
 * Use this file to manage all URL paths in one location.
 */

const API_ROOT = process.env.NEXT_PUBLIC_API_URL || "/api";
const WP_API_ROOT = process.env.WP_API_URL || "https://admin.richardnorwood.com/wp-json/wp/v2";

export const ENDPOINTS = {
    // Internal API Routes
    INTERNAL: {
        AUTH: `${API_ROOT}/auth`,
        USER: `${API_ROOT}/user`,
        NEWSLETTER: `${API_ROOT}/newsletter`,
        ASSESSMENT: `${API_ROOT}/assessment`,
    },

    // External / CMS Endpoints
    WORDPRESS: {
        POSTS: `${WP_API_ROOT}/posts`,
        PAGES: `${WP_API_ROOT}/pages`,
        CATEGORIES: `${WP_API_ROOT}/categories`,
    },

    // Third Party
    THIRD_PARTY: {
        // Add other external services here (e.g. Stripe, Calendly wrapper)
    }
} as const;
