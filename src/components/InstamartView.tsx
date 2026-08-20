import React, { useState } from 'react';
import { INSTAMART_ITEMS } from '../data/mockData';
import { useCart } from '../context/CartContext';
import { Zap, Plus, Minus, Check, Clock, ShoppingCart, Sparkles, Search } from 'lucide-react';

interface InstamartViewProps {
  searchQuery: string;
}

export const InstamartView: React.FC<InstamartViewProps> = ({ searchQuery }) => {
  const { cart, addInstamartToCart, updateQuantity, setIsCartOpen } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Dairy & Milk', 'Fruits & Vegetables', 'Munchies & Snacks', 'Cold Drinks & Juices', 'Instant Food & Noodles', 'Sweet Tooth & Spreads'];

  const filteredItems = INSTAMART_ITEMS.filter(item => {
    const matchesSearch = searchQuery === '' ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8 pb-16">
      {/* Top Instamart Flash Banner */}
      <div className="relative overflow-hidden rounded-[32px] bg-linear-to-r from-blue-700/95 via-indigo-700/95 to-cyan-600/95 text-white p-6 sm:p-8 shadow-2xl shadow-blue-500/20 border border-white/30 backdrop-blur-2xl">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider mb-3 border border-white/30">
            <Zap className="w-3.5 h-3.5 text-yellow-300 fill-yellow-300" />
            <span>Instant Grocery Delivery • 10 - 15 Mins</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
            Swiggy Instamart: Fresh Groceries & Daily Essentials
          </h1>

          <p className="mt-2 text-sm sm:text-base text-blue-100 font-medium">
            Over 5,000+ handpicked products: fresh fruits, milk, chips, cold drinks, and snacks delivered to your door in 10 minutes flat!
          </p>

          <div className="mt-5 flex items-center space-x-4 text-xs font-bold text-white">
            <span className="bg-white/20 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/30 shadow-2xs">⚡ Express 10 Min Guarantee</span>
            <span className="bg-white/20 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/30 shadow-2xs">🛒 Can combine with Food Cart</span>
          </div>
        </div>

        {/* Decorative background art */}
        <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-white/15 rounded-full blur-2xl pointer-events-none" />
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap border cursor-pointer ${
              selectedCategory === cat
                ? 'backdrop-blur-2xl bg-white/90 border-white text-blue-600 shadow-md'
                : 'bg-white/40 hover:bg-white/70 backdrop-blur-md border-white/50 text-gray-700 shadow-2xs'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {filteredItems.map(item => {
          const cartItem = cart.find(ci => ci.dish.id === item.id);
          const quantity = cartItem ? cartItem.quantity : 0;

          return (
            <div
              key={item.id}
              className="backdrop-blur-2xl bg-white/50 rounded-3xl p-3.5 sm:p-4 border border-white/70 shadow-lg shadow-black/5 hover:bg-white/75 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Product Image + Discount tag */}
                <div className="relative h-36 bg-white/60 rounded-2xl overflow-hidden mb-3 border border-white/60">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform"
                    loading="lazy"
                  />
                  {item.discountPercent && (
                    <span className="absolute top-2 left-2 bg-blue-600/90 backdrop-blur-xs text-white text-[10px] font-black px-2 py-0.5 rounded-full border border-white/30">
                      {item.discountPercent}% OFF
                    </span>
                  )}
                  <span className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-md text-white text-[9px] font-bold px-2 py-0.5 rounded-full flex items-center space-x-1 border border-white/20">
                    <Clock className="w-2.5 h-2.5 text-yellow-300" />
                    <span>10 mins</span>
                  </span>
                </div>

                <div className="text-[10px] font-black text-gray-400 uppercase tracking-wider">
                  {item.brand}
                </div>
                <h4 className="text-sm font-extrabold text-gray-900 line-clamp-2 mt-0.5 group-hover:text-blue-600 transition-colors">
                  {item.name}
                </h4>
                <p className="text-xs text-gray-500 mt-0.5 font-medium">{item.weight}</p>
              </div>

              {/* Price & Add Button */}
              <div className="mt-4 pt-2.5 border-t border-white/60 flex items-center justify-between">
                <div>
                  <div className="text-sm font-black text-gray-900">₹{item.price}</div>
                  {item.originalPrice > item.price && (
                    <div className="text-[11px] text-gray-400 line-through font-medium">₹{item.originalPrice}</div>
                  )}
                </div>

                {quantity > 0 ? (
                  <div className="flex items-center bg-white/95 backdrop-blur-md border border-blue-500 text-blue-600 rounded-xl px-2 py-1 font-black text-xs shadow-md">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="hover:bg-blue-50 rounded-lg p-0.5 cursor-pointer"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="px-2 font-black">{quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="hover:bg-blue-50 rounded-lg p-0.5 cursor-pointer"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => addInstamartToCart(item)}
                    className="flex items-center space-x-1 bg-white/90 hover:bg-white backdrop-blur-md border border-white/90 text-blue-600 font-black text-xs px-3.5 py-1.5 rounded-xl transition-all shadow-md active:scale-95 cursor-pointer"
                  >
                    <span>ADD</span>
                    <Plus className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
