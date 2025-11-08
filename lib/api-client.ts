import type { Locale } from './i18n-config';

export interface ApiResponse<T> {
    ok: boolean;
    data?: T;
    error?: string;
    status: number;
}

/**
 * createApiClient centralizes fetch configuration for the Go Gin backend.
 * It injects locale headers so backend responses can localize payloads when needed.
 */
export function createApiClient(baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:8080') {
    return async function apiRequest<T>(path: string, locale: Locale, init?: RequestInit): Promise<ApiResponse<T>> {
        const url = `${baseUrl}${path}`;

        try {
            const response = await fetch(url, {
                ...init,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept-Language': locale,
                    ...(init?.headers ?? {})
                }
            });

            const contentType = response.headers.get('content-type');
            const isJson = contentType?.includes('application/json');
            const payload = (isJson ? await response.json() : await response.text()) as T;

            if (!response.ok) {
                console.error('API request failed', { url, status: response.status, payload });
                return {
                    ok: false,
                    status: response.status,
                    error: typeof payload === 'string' ? payload : JSON.stringify(payload)
                };
            }

            return {
                ok: true,
                status: response.status,
                data: payload
            };
        } catch (error) {
            console.error('Network error when calling API', { url, error });
            return {
                ok: false,
                status: 0,
                error: error instanceof Error ? error.message : 'Unknown error'
            };
        }
    };
}

export const apiClient = createApiClient();