import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { 
  User, 
  Product, 
  Category, 
  Order, 
  ShopSetting, 
  AuthResponse, 
  ApiResponse, 
  PaginatedResponse 
} from '../types';

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8000/api',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    // Add token to requests if available
    this.api.interceptors.request.use((config) => {
      const token = localStorage.getItem('auth_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // Handle token expiration
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          localStorage.removeItem('auth_token');
          localStorage.removeItem('user');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  // Auth endpoints
  async login(email: string, password: string): Promise<AuthResponse> {
    const response: AxiosResponse<AuthResponse> = await this.api.post('/login', {
      email,
      password,
    });
    return response.data;
  }

  async register(userData: {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    phone?: string;
    address?: string;
    city?: string;
    postal_code?: string;
    country?: string;
  }): Promise<AuthResponse> {
    const response: AxiosResponse<AuthResponse> = await this.api.post('/register', userData);
    return response.data;
  }

  async logout(): Promise<ApiResponse<null>> {
    const response: AxiosResponse<ApiResponse<null>> = await this.api.post('/logout');
    return response.data;
  }

  async getMe(): Promise<ApiResponse<User>> {
    const response: AxiosResponse<ApiResponse<User>> = await this.api.get('/me');
    return response.data;
  }

  async updateProfile(userData: {
    name: string;
    phone?: string;
    address?: string;
    city?: string;
    postal_code?: string;
    country?: string;
  }): Promise<ApiResponse<User>> {
    const response: AxiosResponse<ApiResponse<User>> = await this.api.put('/profile', userData);
    return response.data;
  }

  // Product endpoints
  async getProducts(params?: {
    search?: string;
    category_id?: number;
    is_active?: boolean;
    is_featured?: boolean;
    in_stock?: boolean;
    sort_by?: string;
    sort_order?: 'asc' | 'desc';
    per_page?: number;
    page?: number;
  }): Promise<ApiResponse<PaginatedResponse<Product>>> {
    const response: AxiosResponse<ApiResponse<PaginatedResponse<Product>>> = await this.api.get('/products', { params });
    return response.data;
  }

  async getProduct(id: number): Promise<ApiResponse<Product>> {
    const response: AxiosResponse<ApiResponse<Product>> = await this.api.get(`/products/${id}`);
    return response.data;
  }

  async createProduct(productData: FormData): Promise<ApiResponse<Product>> {
    const response: AxiosResponse<ApiResponse<Product>> = await this.api.post('/admin/products', productData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }

  async updateProduct(id: number, productData: FormData): Promise<ApiResponse<Product>> {
    const response: AxiosResponse<ApiResponse<Product>> = await this.api.put(`/admin/products/${id}`, productData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }

  async deleteProduct(id: number): Promise<ApiResponse<null>> {
    const response: AxiosResponse<ApiResponse<null>> = await this.api.delete(`/admin/products/${id}`);
    return response.data;
  }

  // Category endpoints
  async getCategories(): Promise<ApiResponse<Category[]>> {
    const response: AxiosResponse<ApiResponse<Category[]>> = await this.api.get('/categories');
    return response.data;
  }

  async getCategory(id: number): Promise<ApiResponse<Category>> {
    const response: AxiosResponse<ApiResponse<Category>> = await this.api.get(`/categories/${id}`);
    return response.data;
  }

  async createCategory(categoryData: {
    name: string;
    description?: string;
    image?: File;
    is_active?: boolean;
    sort_order?: number;
  }): Promise<ApiResponse<Category>> {
    const formData = new FormData();
    Object.entries(categoryData).forEach(([key, value]) => {
      if (value !== undefined) {
        formData.append(key, value as string | Blob);
      }
    });

    const response: AxiosResponse<ApiResponse<Category>> = await this.api.post('/admin/categories', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }

  async updateCategory(id: number, categoryData: {
    name?: string;
    description?: string;
    image?: File;
    is_active?: boolean;
    sort_order?: number;
  }): Promise<ApiResponse<Category>> {
    const formData = new FormData();
    Object.entries(categoryData).forEach(([key, value]) => {
      if (value !== undefined) {
        formData.append(key, value as string | Blob);
      }
    });

    const response: AxiosResponse<ApiResponse<Category>> = await this.api.put(`/admin/categories/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }

  async deleteCategory(id: number): Promise<ApiResponse<null>> {
    const response: AxiosResponse<ApiResponse<null>> = await this.api.delete(`/admin/categories/${id}`);
    return response.data;
  }

  // Order endpoints
  async getOrders(): Promise<ApiResponse<Order[]>> {
    const response: AxiosResponse<ApiResponse<Order[]>> = await this.api.get('/orders');
    return response.data;
  }

  async getOrder(id: number): Promise<ApiResponse<Order>> {
    const response: AxiosResponse<ApiResponse<Order>> = await this.api.get(`/orders/${id}`);
    return response.data;
  }

  async createOrder(orderData: {
    items: Array<{
      product_id: number;
      quantity: number;
      product_options?: Record<string, any>;
    }>;
    billing_address: Record<string, any>;
    shipping_address: Record<string, any>;
    payment_method?: string;
    notes?: string;
  }): Promise<ApiResponse<Order>> {
    const response: AxiosResponse<ApiResponse<Order>> = await this.api.post('/orders', orderData);
    return response.data;
  }

  async updateOrderStatus(id: number, status: string): Promise<ApiResponse<Order>> {
    const response: AxiosResponse<ApiResponse<Order>> = await this.api.put(`/admin/orders/${id}`, { status });
    return response.data;
  }

  async deleteOrder(id: number): Promise<ApiResponse<null>> {
    const response: AxiosResponse<ApiResponse<null>> = await this.api.delete(`/admin/orders/${id}`);
    return response.data;
  }

  // Shop settings endpoints
  async getSettings(): Promise<ApiResponse<ShopSetting[]>> {
    const response: AxiosResponse<ApiResponse<ShopSetting[]>> = await this.api.get('/admin/settings');
    return response.data;
  }

  async updateSettings(settings: Record<string, any>): Promise<ApiResponse<ShopSetting[]>> {
    const response: AxiosResponse<ApiResponse<ShopSetting[]>> = await this.api.post('/admin/settings', settings);
    return response.data;
  }

  async updateSetting(key: string, value: any, type: string): Promise<ApiResponse<ShopSetting>> {
    const response: AxiosResponse<ApiResponse<ShopSetting>> = await this.api.put(`/admin/settings/${key}`, {
      value,
      type,
    });
    return response.data;
  }
}

export const apiService = new ApiService();
export default apiService;
