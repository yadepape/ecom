import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, CartItem, Cart } from '../types';

interface CartContextType {
  cart: Cart;
  addToCart: (product: Product, quantity?: number, selectedOptions?: Record<string, any>) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartItemCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<Cart>({
    items: [],
    total: 0,
    itemCount: 0,
  });

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setCart(parsedCart);
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const calculateTotal = (items: CartItem[]): number => {
    return items.reduce((total, item) => {
      const price = item.product.sale_price 
        ? parseFloat(item.product.sale_price) 
        : parseFloat(item.product.price);
      return total + (price * item.quantity);
    }, 0);
  };

  const calculateItemCount = (items: CartItem[]): number => {
    return items.reduce((count, item) => count + item.quantity, 0);
  };

  const addToCart = (product: Product, quantity: number = 1, selectedOptions?: Record<string, any>) => {
    setCart(prevCart => {
      const existingItemIndex = prevCart.items.findIndex(
        item => item.product.id === product.id && 
        JSON.stringify(item.selectedOptions) === JSON.stringify(selectedOptions)
      );

      let newItems: CartItem[];

      if (existingItemIndex > -1) {
        // Update existing item quantity
        newItems = [...prevCart.items];
        newItems[existingItemIndex] = {
          ...newItems[existingItemIndex],
          quantity: newItems[existingItemIndex].quantity + quantity,
        };
      } else {
        // Add new item
        const newItem: CartItem = {
          product,
          quantity,
          selectedOptions,
        };
        newItems = [...prevCart.items, newItem];
      }

      return {
        items: newItems,
        total: calculateTotal(newItems),
        itemCount: calculateItemCount(newItems),
      };
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prevCart => {
      const newItems = prevCart.items.filter(item => item.product.id !== productId);
      
      return {
        items: newItems,
        total: calculateTotal(newItems),
        itemCount: calculateItemCount(newItems),
      };
    });
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart(prevCart => {
      const newItems = prevCart.items.map(item => 
        item.product.id === productId 
          ? { ...item, quantity }
          : item
      );

      return {
        items: newItems,
        total: calculateTotal(newItems),
        itemCount: calculateItemCount(newItems),
      };
    });
  };

  const clearCart = () => {
    setCart({
      items: [],
      total: 0,
      itemCount: 0,
    });
  };

  const getCartTotal = (): number => {
    return cart.total;
  };

  const getCartItemCount = (): number => {
    return cart.itemCount;
  };

  const value: CartContextType = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
