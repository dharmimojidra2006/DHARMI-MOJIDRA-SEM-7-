import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Dish, CartItem, ActiveOrder, InstamartItem } from '../types';
import { COUPONS } from '../data/mockData';
import confetti from 'canvas-confetti';

interface Coupon {
  code: string;
  discount: number;
  minOrder: number;
  maxDiscount: number;
  desc: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (dish: Dish, customization?: CartItem['customization']) => void;
  addInstamartToCart: (item: InstamartItem) => void;
  removeFromCart: (dishId: string) => void;
  updateQuantity: (dishId: string, delta: number) => void;
  clearCart: () => void;
  
  // Multi-restaurant info
  distinctRestaurants: { id: string; name: string; count: number }[];
  isMultiRestaurant: boolean;
  
  // Bill breakdown
  subtotal: number;
  discountAmount: number;
  deliveryFee: number;
  packagingFee: number;
  platformFee: number;
  totalPayable: number;
  
  // Coupon
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  
  // Navigation & Modals
  activeService: 'food' | 'instamart' | 'dineout' | 'scenes' | 'casestudy';
  setActiveService: (service: 'food' | 'instamart' | 'dineout' | 'scenes' | 'casestudy') => void;
  
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isConfirmationOpen: boolean;
  setIsConfirmationOpen: (open: boolean) => void;
  isSupportOpen: boolean;
  setIsSupportOpen: (open: boolean) => void;
  isOrderTrackingOpen: boolean;
  setIsOrderTrackingOpen: (open: boolean) => void;
  isAddressModalOpen: boolean;
  setIsAddressModalOpen: (open: boolean) => void;
  isCaseStudyOpen: boolean;
  setIsCaseStudyOpen: (open: boolean) => void;
  
  // Location
  deliveryAddress: string;
  setDeliveryAddress: (address: string) => void;
  
  // Active Order & 120s grace period
  activeOrder: ActiveOrder | null;
  setActiveOrder: (order: ActiveOrder | null) => void;
  placeOrder: (paymentMethod: string, specialInstructions?: string) => ActiveOrder;
  cancelOrder: (orderId: string, reason: string) => boolean;
  orderHistory: ActiveOrder[];
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([
    // Seed initial items to showcase the multi-restaurant cart immediately!
    {
      dish: {
        id: 'd-101',
        restaurantId: 'rest-1',
        restaurantName: 'Meghana Foods',
        name: 'Meghana Special Chicken Biryani',
        description: 'Authentic spicy Andhra style chicken biryani cooked with secret spices.',
        price: 340,
        image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500&auto=format&fit=crop&q=80',
        isVeg: false,
        rating: 4.8,
        ratingCount: 1420,
        category: 'Biryani'
      },
      quantity: 1
    },
    {
      dish: {
        id: 'd-301',
        restaurantId: 'rest-3',
        restaurantName: 'Corner House Ice Cream',
        name: 'Death By Chocolate (DBC)',
        description: 'Warm chocolate cake layered with vanilla ice cream and hot fudge.',
        price: 260,
        image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=500&auto=format&fit=crop&q=80',
        isVeg: true,
        rating: 4.95,
        ratingCount: 8900,
        category: 'Sundaes'
      },
      quantity: 1
    }
  ]);

  const [activeService, setActiveService] = useState<'food' | 'instamart' | 'dineout' | 'scenes' | 'casestudy'>('food');
  const [deliveryAddress, setDeliveryAddress] = useState<string>('Flat 402, Green Glen Heights, Bellandur, Bengaluru');
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(COUPONS[0]); // default coupon
  
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [isOrderTrackingOpen, setIsOrderTrackingOpen] = useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [isCaseStudyOpen, setIsCaseStudyOpen] = useState(false);

  const [activeOrder, setActiveOrder] = useState<ActiveOrder | null>(null);
  const [orderHistory, setOrderHistory] = useState<ActiveOrder[]>([]);

  // Distinct restaurants
  const restaurantMap = new Map<string, { id: string; name: string; count: number }>();
  cart.forEach(item => {
    const existing = restaurantMap.get(item.dish.restaurantId);
    if (existing) {
      existing.count += item.quantity;
    } else {
      restaurantMap.set(item.dish.restaurantId, {
        id: item.dish.restaurantId,
        name: item.dish.restaurantName,
        count: item.quantity,
      });
    }
  });
  const distinctRestaurants = Array.from(restaurantMap.values());
  const isMultiRestaurant = distinctRestaurants.length > 1;

  // Bill calculations
  const subtotal = cart.reduce((sum, item) => sum + item.dish.price * item.quantity, 0);
  
  let discountAmount = 0;
  if (appliedCoupon && subtotal >= appliedCoupon.minOrder) {
    discountAmount = Math.min(Math.round((subtotal * appliedCoupon.discount) / 100), appliedCoupon.maxDiscount);
  }

  // If multi-restaurant, standard delivery is combined with a nominal multi-stop bundle fee
  const deliveryFee = cart.length === 0 ? 0 : isMultiRestaurant ? 45 : 30;
  const packagingFee = cart.length === 0 ? 0 : distinctRestaurants.length * 15;
  const platformFee = cart.length === 0 ? 0 : 7;
  const totalPayable = Math.max(0, subtotal - discountAmount + deliveryFee + packagingFee + platformFee);

  // Cart operations
  const addToCart = (dish: Dish, customization?: CartItem['customization']) => {
    setCart(prev => {
      const idx = prev.findIndex(item => item.dish.id === dish.id);
      if (idx > -1) {
        const next = [...prev];
        next[idx] = {
          ...next[idx],
          quantity: next[idx].quantity + 1,
          customization: customization || next[idx].customization,
        };
        return next;
      }
      return [...prev, { dish, quantity: 1, customization }];
    });
  };

  const addInstamartToCart = (item: InstamartItem) => {
    const dishFormat: Dish = {
      id: item.id,
      restaurantId: 'instamart-hub-1',
      restaurantName: 'Swiggy Instamart Express (10 Mins)',
      name: `${item.brand} ${item.name} (${item.weight})`,
      description: `Quick grocery item. Pack size: ${item.weight}`,
      price: item.price,
      originalPrice: item.originalPrice,
      image: item.image,
      isVeg: true,
      rating: 4.8,
      ratingCount: 500,
      category: item.category,
    };
    addToCart(dishFormat);
  };

  const removeFromCart = (dishId: string) => {
    setCart(prev => prev.filter(item => item.dish.id !== dishId));
  };

  const updateQuantity = (dishId: string, delta: number) => {
    setCart(prev => {
      return prev
        .map(item => {
          if (item.dish.id === dishId) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const clearCart = () => setCart([]);

  const applyCoupon = (code: string) => {
    const found = COUPONS.find(c => c.code.toUpperCase() === code.toUpperCase());
    if (!found) {
      return { success: false, message: 'Invalid coupon code' };
    }
    if (subtotal < found.minOrder) {
      return { success: false, message: `Minimum order amount for ${found.code} is ₹${found.minOrder}` };
    }
    setAppliedCoupon(found);
    return { success: true, message: `Coupon ${found.code} applied! Saved ₹${Math.min(Math.round((subtotal * found.discount) / 100), found.maxDiscount)}` };
  };

  const removeCoupon = () => setAppliedCoupon(null);

  // Place order
  const placeOrder = (paymentMethod: string, _specialInstructions?: string): ActiveOrder => {
    const orderId = `SWG-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder: ActiveOrder = {
      id: orderId,
      items: [...cart],
      restaurantNames: distinctRestaurants.map(r => r.name),
      placedAt: Date.now(),
      totalAmount: totalPayable,
      deliveryAddress,
      paymentMethod,
      status: 'confirming', // In 120s grace period
      cancellationGraceRemainingSec: 120,
      estimatedDeliveryMin: isMultiRestaurant ? 35 : 25,
      riderName: 'Ramesh Kumar',
      riderPhone: '+91 98450 12345',
      riderRating: 4.9,
      isMultiRestaurant,
    };

    setActiveOrder(newOrder);
    setOrderHistory(prev => [newOrder, ...prev]);
    clearCart();
    setIsCartOpen(false);
    setIsConfirmationOpen(false);
    setIsOrderTrackingOpen(true);

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // safe fallback
    }

    return newOrder;
  };

  // 120-second live cancellation countdown ticker
  useEffect(() => {
    if (!activeOrder || activeOrder.status === 'cancelled' || activeOrder.status === 'delivered') return;

    const interval = setInterval(() => {
      setActiveOrder(prev => {
        if (!prev) return null;
        if (prev.cancellationGraceRemainingSec > 0) {
          const nextSec = prev.cancellationGraceRemainingSec - 1;
          const nextStatus = nextSec === 0 ? 'preparing' : 'confirming';
          return {
            ...prev,
            cancellationGraceRemainingSec: nextSec,
            status: nextStatus,
          };
        } else {
          // Progress further naturally
          const elapsedSec = Math.floor((Date.now() - prev.placedAt) / 1000);
          if (elapsedSec > 180 && prev.status === 'preparing') {
            return { ...prev, status: 'on_the_way' };
          }
          return prev;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [activeOrder?.placedAt, activeOrder?.status]);

  // Cancel order (with 100% instant refund guarantee)
  const cancelOrder = (orderId: string, _reason: string): boolean => {
    if (!activeOrder || activeOrder.id !== orderId) return false;
    
    // Check if within cancellation grace or allowed
    const isWithinGrace = activeOrder.cancellationGraceRemainingSec > 0;
    
    setActiveOrder(prev => prev ? {
      ...prev,
      status: 'cancelled',
      cancelledAt: Date.now(),
      refundStatus: isWithinGrace ? 'processed' : 'pending',
    } : null);

    setOrderHistory(prev => prev.map(o => o.id === orderId ? {
      ...o,
      status: 'cancelled',
      cancelledAt: Date.now(),
      refundStatus: 'processed',
    } : o));

    return true;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        addInstamartToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        distinctRestaurants,
        isMultiRestaurant,
        subtotal,
        discountAmount,
        deliveryFee,
        packagingFee,
        platformFee,
        totalPayable,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        activeService,
        setActiveService,
        isCartOpen,
        setIsCartOpen,
        isConfirmationOpen,
        setIsConfirmationOpen,
        isSupportOpen,
        setIsSupportOpen,
        isOrderTrackingOpen,
        setIsOrderTrackingOpen,
        isAddressModalOpen,
        setIsAddressModalOpen,
        isCaseStudyOpen,
        setIsCaseStudyOpen,
        deliveryAddress,
        setDeliveryAddress,
        activeOrder,
        setActiveOrder,
        placeOrder,
        cancelOrder,
        orderHistory,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};
