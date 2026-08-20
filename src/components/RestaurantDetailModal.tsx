import React, { useState } from 'react';
import { Restaurant } from '../types';
import { DishCard } from './DishCard';
import { Star, Clock, MapPin, Tag, X, Sparkles, Filter } from 'lucide-react';

interface RestaurantDetailModalProps {
  restaurant: Restaurant | null;
  onClose: () => void;
}

export const RestaurantDetailModal: React.FC<RestaurantDetailModalProps> = ({
  restaurant,
  onClose,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [vegOnly, setVegOnly] = useState<boolean>(false);

  if (!restaurant) return null;

  const categories = ['All', ...Array.from(new Set(restaurant.dishes.map(d => d.category)))];

  const filteredDishes = restaurant.dishes.filter(dish => {
    const matchesCategory = selectedCategory === 'All' || dish.category === selectedCategory;
    const matchesVeg = !vegOnly || dish.isVeg;
    return matchesCategory && matchesVeg;
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-md flex items-end sm:items-center justify-center sm:p-4">
      <div className="backdrop-blur-2xl bg-white/90 w-full max-w-3xl max-h-[90vh] rounded-t-[32px] sm:rounded-[32px] flex flex-col overflow-hidden shadow-2xl border border-white/70 animate-in slide-in-from-bottom duration-300">
        
        {/* Header Image & Info Banner */}
        <div className="relative h-48 sm:h-56 bg-gray-900 shrink-0">
          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="w-full h-full object-cover opacity-85"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/50 hover:bg-black text-white p-2 rounded-full backdrop-blur-md transition-colors cursor-pointer border border-white/20"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Restaurant Details Overlay */}
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <div className="flex items-center space-x-2 mb-1">
              <span className="bg-[#FC8019] text-white text-[11px] font-black px-2.5 py-0.5 rounded-full shadow-md">
                Multi-Cart Partner
              </span>
              {restaurant.pureVeg && (
                <span className="bg-emerald-600/90 backdrop-blur-md text-white text-[11px] font-black px-2.5 py-0.5 rounded-full border border-white/30">
                  Pure Veg 🍃
                </span>
              )}
            </div>

            <h2 className="text-2xl sm:text-3xl font-black">{restaurant.name}</h2>
            <p className="text-xs sm:text-sm text-gray-200 mt-0.5 font-medium">
              {restaurant.cuisine.join(', ')} • ₹{restaurant.priceForTwo} for two
            </p>

            <div className="flex flex-wrap items-center gap-3 mt-2 text-xs font-bold text-gray-200">
              <div className="flex items-center space-x-1 bg-emerald-600/90 backdrop-blur-md text-white px-2.5 py-0.5 rounded-xl border border-white/30 shadow-xs">
                <Star className="w-3.5 h-3.5 fill-white" />
                <span>{restaurant.rating} ({restaurant.ratingCount})</span>
              </div>
              <div className="flex items-center space-x-1 bg-black/40 backdrop-blur-md px-2.5 py-0.5 rounded-xl border border-white/20">
                <Clock className="w-3.5 h-3.5 text-orange-400" />
                <span>{restaurant.deliveryTimeMins} mins</span>
              </div>
              <div className="flex items-center space-x-1 bg-black/40 backdrop-blur-md px-2.5 py-0.5 rounded-xl border border-white/20">
                <MapPin className="w-3.5 h-3.5 text-orange-400" />
                <span>{restaurant.distanceKm} km • {restaurant.address}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Offer bar if exists */}
        {restaurant.offer && (
          <div className="bg-orange-50/90 backdrop-blur-md border-b border-orange-100/80 px-5 py-2.5 flex items-center space-x-2 text-xs text-[#FC8019] font-black">
            <Tag className="w-4 h-4 shrink-0" />
            <span>{restaurant.offer}</span>
          </div>
        )}

        {/* Categories Bar & Filter Controls */}
        <div className="p-4 border-b border-white/60 flex flex-wrap items-center justify-between gap-3 bg-white/40 backdrop-blur-md">
          <div className="flex items-center space-x-2 overflow-x-auto pb-1 max-w-[70%] scrollbar-none">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all border cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#FC8019] text-white border-[#FC8019] shadow-md'
                    : 'bg-white/60 text-gray-700 hover:bg-white border-white/80'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Veg Only Toggle */}
          <button
            onClick={() => setVegOnly(!vegOnly)}
            className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-2xl text-xs font-black border transition-all cursor-pointer ${
              vegOnly
                ? 'bg-emerald-50/90 border-emerald-400 text-emerald-700 shadow-xs'
                : 'bg-white/60 border-white/80 text-gray-600 hover:bg-white'
            }`}
          >
            <div className={`w-3 h-3 rounded-xs border ${vegOnly ? 'border-emerald-600' : 'border-gray-400'} flex items-center justify-center`}>
              <div className={`w-1.5 h-1.5 rounded-full ${vegOnly ? 'bg-emerald-600' : 'bg-transparent'}`} />
            </div>
            <span>Veg Only</span>
          </button>
        </div>

        {/* Dishes List / Grid */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredDishes.map(dish => (
              <DishCard key={dish.id} dish={dish} />
            ))}
          </div>

          {filteredDishes.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <p className="text-sm font-semibold">No dishes match the selected filter.</p>
              <button
                onClick={() => { setSelectedCategory('All'); setVegOnly(false); }}
                className="mt-2 text-xs text-[#FC8019] font-black underline cursor-pointer"
              >
                Reset filters
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
