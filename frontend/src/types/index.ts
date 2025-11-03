export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'client';
  phone?: string;
  address?: string;
  city?: string;
  postal_code?: string;
  country?: string;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  short_description?: string;
  price: string;
  sale_price?: string;
  sku: string;
  stock_quantity: number;
  manage_stock: boolean;
  in_stock: boolean;
  images: string[];
  weight?: string;
  dimensions?: string;
  is_featured: boolean;
  is_active: boolean;
  category_id: number;
  attributes: Record<string, any>;
  created_at: string;
  updated_at: string;
  category?: Category;
}

export interface OrderItem {
  id: number;
  order_id: number;
  product_id?: number;
  product_name: string;
  product_sku: string;
  product_price: string;
  quantity: number;
  total_price: string;
  product_options?: Record<string, any>;
  created_at: string;
  updated_at: string;
  product?: Product;
}

export interface Order {
  id: number;
  order_number: string;
  user_id: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  subtotal: string;
  tax_amount: string;
  shipping_amount: string;
  total_amount: string;
  currency: string;
  billing_address: Record<string, any>;
  shipping_address: Record<string, any>;
  payment_method?: string;
  payment_status?: string;
  notes?: string;
  shipped_at?: string;
  delivered_at?: string;
  created_at: string;
  updated_at: string;
  user?: User;
  order_items?: OrderItem[];
}

export interface ShopSetting {
  id: number;
  key: string;
  value: string;
  type: 'text' | 'json' | 'boolean' | 'number';
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    token: string;
    token_type: string;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  current_page: number;
  data: T[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Array<{
    url: string | null;
    label: string;
    page: number | null;
    active: boolean;
  }>;
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedOptions?: Record<string, any>;
}

export interface Cart {
  items: CartItem[];
  total: number;
  itemCount: number;
}
