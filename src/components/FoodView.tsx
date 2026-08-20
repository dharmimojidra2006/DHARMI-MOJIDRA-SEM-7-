import React, { useState } from 'react';
import { RESTAURANTS } from '../data/mockData';
import { Restaurant, Dish } from '../types';
import { DishCard } from './DishCard';
import { RestaurantDetailModal } from './RestaurantDetailModal';
import { useCart } from '../context/CartContext';
import { 
  Sparkles, 
  Layers, 
  Clock, 
  Star, 
  ChevronRight, 
  Plus, 
  Tag, 
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

interface FoodViewProps {
  searchQuery: string;
}

export const FoodView: React.FC<FoodViewProps> = ({ searchQuery }) => {
  const { addToCart, setIsCartOpen, distinctRestaurants } = useCart();
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'veg' | 'fast' | 'topRated'>('all');
  const [activeRestaurantModal, setActiveRestaurantModal] = useState<Restaurant | null>(null);

  // Filter restaurants
  const filteredRestaurants = RESTAURANTS.filter(restaurant => {
    const matchesSearch = searchQuery === '' || 
      restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      restaurant.cuisine.some(c => c.toLowerCase().includes(searchQuery.toLowerCase())) ||
      restaurant.dishes.some(d => d.name.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesSearch) return false;

    if (selectedFilter === 'veg') return restaurant.pureVeg || restaurant.dishes.some(d => d.isVeg);
    if (selectedFilter === 'fast') return restaurant.deliveryTimeMins <= 25;
    if (selectedFilter === 'topRated') return restaurant.rating >= 4.6;
    return true;
  });

  // Featured Curated Multi-Restaurant Combo
  const multiComboItems = [
    RESTAURANTS[0].dishes[0], // Meghana Special Biryani
    RESTAURANTS[2].dishes[0], // Corner House Death By Chocolate (DBC)
  ];

  const handleAddMultiCombo = () => {
    multiComboItems.forEach(dish => addToCart(dish));
    setIsCartOpen(true);
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* 🌟 Signature UX Innovation Hero Banner: Multi-Restaurant Cart */}
      <div className="relative overflow-hidden rounded-[32px] bg-linear-to-r from-[#FC8019]/95 via-[#F7881F]/95 to-[#E65100]/95 text-white p-6 sm:p-8 shadow-2xl shadow-orange-500/20 border border-white/30 backdrop-blur-2xl">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider mb-3 border border-white/30">
            <Layers className="w-3.5 h-3.5 text-white" />
            <span>Redesign Highlight • 93.8% User Approved</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
            Order from Multiple Restaurants in One Single Cart!
          </h1>
          
          <p className="mt-2 text-sm sm:text-base text-orange-50 font-medium leading-relaxed">
            No need to place multiple separate orders. Combine your favorite spicy Biryani, gourmet Burgers, and Corner House Ice Cream into a single delivery route!
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={handleAddMultiCombo}
              className="bg-white text-[#FC8019] hover:bg-orange-50 font-black text-xs sm:text-sm px-5 py-3 rounded-2xl shadow-lg transition-transform active:scale-95 flex items-center space-x-2 border border-white/50"
            >
              <Sparkles className="w-4 h-4 text-[#FC8019]" />
              <span>Try Popular Pair: Biryani + DBC Sundae</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center space-x-3 text-xs text-orange-50 font-semibold bg-black/20 px-3.5 py-2.5 rounded-2xl backdrop-blur-md border border-white/20">
              <span className="flex items-center space-x-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
                <span>120s Instant Cancel Guarantee</span>
              </span>
              <span>•</span>
              <span className="flex items-center space-x-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
                <span>100% Zero Penalty Refund</span>
              </span>
            </div>
          </div>
        </div>

        {/* Decorative background abstract circles */}
        <div className="absolute -right-12 -bottom-16 w-80 h-80 bg-white/15 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute right-12 top-6 w-48 h-48 bg-amber-400/25 rounded-full blur-xl pointer-events-none" />
      </div>

      {/* Multi-Restaurant Live Cart Status Pill if active */}
      {distinctRestaurants.length > 1 && (
        <div className="backdrop-blur-xl bg-emerald-500/15 border border-emerald-400/40 rounded-3xl p-4 sm:p-5 flex items-center justify-between shadow-lg shadow-emerald-900/5">
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold shadow-md">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-extrabold text-emerald-950">
                Multi-Restaurant Cart Active ({distinctRestaurants.length} Restaurants)
              </h4>
              <p className="text-xs text-emerald-800 font-medium">
                {distinctRestaurants.map(r => r.name).join(' + ')} will be delivered together!
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsCartOpen(true)}
            className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold px-4 py-2.5 rounded-2xl shadow-md transition-all active:scale-95"
          >
            View Multi-Cart →
          </button>
        </div>
      )}

      {/* Filter Chips Bar */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none">
          {[
            { id: 'all', label: 'All Restaurants' },
            { id: 'veg', label: 'Pure Veg / Veg Friendly 🍃' },
            { id: 'fast', label: 'Fast Delivery (< 25 mins) ⚡' },
            { id: 'topRated', label: 'Top Rated 4.6+ ⭐' },
          ].map(filter => (
            <button
              key={filter.id}
              onClick={() => setSelectedFilter(filter.id as any)}
              className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all border cursor-pointer ${
                selectedFilter === filter.id
                  ? 'backdrop-blur-2xl bg-white/90 border-white text-[#FC8019] shadow-md scale-100'
                  : 'bg-white/40 hover:bg-white/70 backdrop-blur-md border-white/50 text-gray-700 shadow-2xs'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <span className="text-xs text-gray-500 font-bold bg-white/40 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/40 shadow-2xs">
          Showing {filteredRestaurants.length} top spots
        </span>
      </div>

      {/* Trending Dishes in Bengaluru Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg sm:text-xl font-black text-gray-900 flex items-center space-x-2">
              <span>Top Trending Cravings</span>
              <TrendingUp className="w-4 h-4 text-[#FC8019]" />
            </h3>
            <p className="text-xs text-gray-500 font-medium">Tap ADD to mix and match from different spots in one order</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {RESTAURANTS.flatMap(r => r.dishes.slice(0, 1)).slice(0, 6).map(dish => (
            <DishCard key={dish.id} dish={dish} showRestaurantBadge={true} />
          ))}
        </div>
      </div>

      {/* All Restaurants List with Quick Previews */}
      <div className="pt-4">
        <h3 className="text-lg sm:text-xl font-black text-gray-900 mb-4">
          Explore All Food Delivery Partners
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRestaurants.map(restaurant => (
            <div
              key={restaurant.id}
              className="backdrop-blur-2xl bg-white/50 rounded-[32px] overflow-hidden border border-white/70 shadow-lg shadow-black/5 hover:bg-white/75 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Image Header */}
                <div 
                  onClick={() => setActiveRestaurantModal(restaurant)}
                  className="relative h-48 overflow-hidden cursor-pointer"
                >
                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-black/20" />

                  {/* Rating Tag */}
                  <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md text-gray-900 px-2.5 py-1 rounded-xl text-xs font-black flex items-center space-x-1 shadow-md border border-white/50">
                    <Star className="w-3.5 h-3.5 fill-emerald-600 text-emerald-600" />
                    <span>{restaurant.rating}</span>
                    <span className="text-gray-400 font-normal">({restaurant.ratingCount})</span>
                  </div>

                  {/* Delivery Time */}
                  <div className="absolute bottom-3 right-3 bg-black/50 backdrop-blur-md text-white px-2.5 py-1 rounded-xl text-xs font-bold flex items-center space-x-1 border border-white/20">
                    <Clock className="w-3 h-3 text-orange-400" />
                    <span>{restaurant.deliveryTimeMins} mins</span>
                  </div>

                  {/* Pure veg badge */}
                  {restaurant.pureVeg && (
                    <div className="absolute top-3 left-3 bg-emerald-600/90 backdrop-blur-md text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border border-white/30">
                      Pure Veg 🍃
                    </div>
                  )}
                </div>

                {/* Info Content */}
                <div className="p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 
                        onClick={() => setActiveRestaurantModal(restaurant)}
                        className="text-lg font-black text-gray-900 group-hover:text-[#FC8019] transition-colors cursor-pointer"
                      >
                        {restaurant.name}
                      </h4>
                      <p className="text-xs text-gray-500 font-medium mt-0.5 truncate max-w-[240px]">
                        {restaurant.cuisine.join(', ')}
                      </p>
                    </div>
                    <span className="text-xs font-extrabold text-gray-700 bg-white/80 backdrop-blur-md px-2.5 py-1 rounded-xl border border-white/60 shadow-2xs">
                      ₹{restaurant.priceForTwo} for 2
                    </span>
                  </div>

                  {/* Offer tag */}
                  {restaurant.offer && (
                    <div className="mt-3 flex items-center space-x-1.5 text-xs text-[#FC8019] font-bold bg-orange-50/80 backdrop-blur-xs px-3 py-1.5 rounded-xl border border-orange-100/70">
                      <Tag className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{restaurant.offer}</span>
                    </div>
                  )}

                  {/* Quick sample dishes from this restaurant */}
                  <div className="mt-4 pt-3 border-t border-white/60 space-y-2">
                    <div className="text-[10px] font-black text-gray-400 uppercase tracking-wider">
                      Popular Picks
                    </div>
                    {restaurant.dishes.slice(0, 2).map(dish => (
                      <div key={dish.id} className="flex items-center justify-between text-xs py-1">
                        <div className="flex items-center space-x-2 truncate max-w-[180px]">
                          <div className={`w-2.5 h-2.5 rounded-xs shrink-0 border ${dish.isVeg ? 'border-emerald-600 bg-emerald-600' : 'border-rose-600 bg-rose-600'}`} />
                          <span className="font-semibold text-gray-800 truncate">{dish.name}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="font-extrabold text-gray-900">₹{dish.price}</span>
                          <button
                            onClick={() => addToCart(dish)}
                            className="bg-white/80 hover:bg-[#FC8019] text-[#FC8019] hover:text-white border border-orange-200 text-[11px] font-black px-2.5 py-1 rounded-xl transition-all shadow-2xs cursor-pointer"
                          >
                            + ADD
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* View full menu button */}
              <div className="px-5 pb-5">
                <button
                  onClick={() => setActiveRestaurantModal(restaurant)}
                  className="w-full py-2.5 bg-white/60 hover:bg-white/90 text-gray-700 hover:text-[#FC8019] text-xs font-bold rounded-2xl border border-white/80 transition-all flex items-center justify-center space-x-1 shadow-2xs cursor-pointer"
                >
                  <span>View Full Menu ({restaurant.dishes.length} items)</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Restaurant Detail Modal */}
      <RestaurantDetailModal
        restaurant={activeRestaurantModal}
        onClose={() => setActiveRestaurantModal(null)}
      />

    </div>
  );
};
