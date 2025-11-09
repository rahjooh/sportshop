import { apiClient } from './api-client';
import type { Locale } from './i18n-config';
import type { HealthResponse, Product } from './types';

export async function fetchHealth(locale: Locale): Promise<HealthResponse | null> {
    const response = await apiClient<HealthResponse>('/health', locale, {
        cache: 'no-store'
    });

    if (!response.ok) {
        return null;
    }

    return response.data ?? null;
}

export async function fetchProducts(locale: Locale): Promise<Product[] | null> {
    const response = await apiClient<Product[]>('/api/v1/products', locale, {
        next: { revalidate: 60 }
    });

    if (!response.ok) {
        return null;
    }

    return response.data ?? null;
}

export async function fetchProductById(locale: Locale, id: string): Promise<Product | null> {
    const response = await apiClient<Product>(`/api/v1/products/${id}`, locale, {
        next: { revalidate: 60 }
    });

    if (!response.ok) {
        return null;
    }

    return response.data ?? null;
}
