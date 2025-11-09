export interface HealthResponse {
    status: string;
    version?: string;
    uptime?: string | number;
    checked_at?: string;
    region?: string;
}

export interface Product {
    id: string;
    name: string;
    description?: string;
    price: number;
    stock: number;
    currency?: string;
    created_at?: string;
    updated_at?: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
    mobile: string;
    role: 'customer' | 'admin';
    is_active: boolean;
    created_at?: string;
}

export interface Address {
    id: string;
    label: string;
    recipient_name: string;
    line1: string;
    line2?: string;
    city: string;
    region: string;
    postal_code: string;
    country: string;
    phone?: string;
    is_default?: boolean;
    created_at?: string;
}

export interface OrderItem {
    product_id: string;
    quantity: number;
    price?: number;
    product?: Product;
}

export interface Order {
    id: string;
    user_id: string;
    items: OrderItem[];
    total_amount: number;
    currency?: string;
    status?: string;
    address?: Address;
    created_at?: string;
}
