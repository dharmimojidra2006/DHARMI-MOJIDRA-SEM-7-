export interface Dish {
  id: string;
  restaurantId: string;
  restaurantName: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  isVeg: boolean;
  isBestseller?: boolean;
  isSpicy?: boolean;
  rating: number;
  ratingCount: number;
  category: string;
  customizable?: boolean;
}

export interface Restaurant {
  id: string;
  name: string;
  cuisine: string[];
  rating: number;
  ratingCount: string;
  deliveryTimeMins: number;
  distanceKm: number;
  priceForTwo: number;
  image: string;
  offer?: string;
  pureVeg?: boolean;
  address: string;
  dishes: Dish[];
  featured?: boolean;
}

export interface CartItem {
  dish: Dish;
  quantity: number;
  customization?: {
    size?: string;
    spiceLevel?: string;
    addExtras?: string[];
  };
}

export interface InstamartItem {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  originalPrice: number;
  weight: string;
  image: string;
  inStock: boolean;
  discountPercent?: number;
}

export interface DineoutVenue {
  id: string;
  name: string;
  location: string;
  cuisine: string[];
  rating: number;
  reviewsCount: string;
  priceForTwo: number;
  image: string;
  offer: string;
  features: string[];
  availableSlots: string[];
}

export interface SceneEvent {
  id: string;
  title: string;
  category: string;
  date: string;
  time: string;
  location: string;
  price: number;
  image: string;
  host: string;
  spotsLeft: number;
  description: string;
}

export interface OrderItem {
  dishName: string;
  restaurantName: string;
  quantity: number;
  price: number;
}

export interface ActiveOrder {
  id: string;
  items: CartItem[];
  restaurantNames: string[];
  placedAt: number; // timestamp
  totalAmount: number;
  deliveryAddress: string;
  paymentMethod: string;
  status: 'confirming' | 'preparing' | 'on_the_way' | 'delivered' | 'cancelled';
  cancellationGraceRemainingSec: number; // starts at 120s
  estimatedDeliveryMin: number;
  riderName: string;
  riderPhone: string;
  riderRating: number;
  isMultiRestaurant: boolean;
  cancelledAt?: number;
  refundStatus?: 'processed' | 'pending';
}

export interface SupportChatMessage {
  id: string;
  sender: 'user' | 'system' | 'agent' | 'bot';
  senderName: string;
  text: string;
  timestamp: string;
  options?: string[];
  isHumanAgent?: boolean;
}
