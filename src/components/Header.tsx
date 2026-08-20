import React from 'react';
import { useCart } from '../context/CartContext';
import { 
  MapPin, 
  Search, 
  ShoppingBag, 
  Headphones, 
  BookOpen, 
  Clock, 
  ChevronDown,
  Sparkles,
  Layers
} from 'lucide-react';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ searchQuery, setSearchQuery }) => {
  const { 
    cart, 
    distinctRestaurants, 
    setIsCartOpen, 
    setIsSupportOpen, 
    setIsAddressModalOpen, 
    setIsCaseStudyOpen,
    deliveryAddress,
    activeOrder,
    setIsOrderTrackingOpen
  } = useCart();

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 backdrop-blur-2xl bg-white/40 border-b border-white/50 shadow-xs">
      {/* Top Banner for Active Order Live Timer if exists */}
      {activeOrder && activeOrder.status !== 'cancelled' && activeOrder.status !== 'delivered' && (
        <div 
          onClick={() => setIsOrderTrackingOpen(true)}
          className="backdrop-blur-xl bg-linear-to-r from-[#FC8019]/90 via-[#F7881F]/90 to-[#E65100]/90 border-b border-white/20 text-white px-4 py-2 text-xs md:text-sm font-medium flex items-center justify-between cursor-pointer hover:opacity-95 transition-all shadow-inner"
        >
          <div className="flex items-center space-x-2 truncate max-w-[70%]">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
            </span>
            <span className="font-bold">Active Order #{activeOrder.id}:</span>
            <span className="truncate">
              {activeOrder.cancellationGraceRemainingSec > 0 
                ? `⚡ 120s Grace Period: ${activeOrder.cancellationGraceRemainingSec}s left for 100% instant cancel`
                : `🚴 Rider on the way (${activeOrder.estimatedDeliveryMin} mins)`}
            </span>
          </div>
          <div className="flex items-center space-x-1.5 font-bold underline shrink-0 bg-white/20 backdrop-blur-xs px-2.5 py-0.5 rounded-full">
            <span>Track Live</span>
            <Clock className="w-3.5 h-3.5" />
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 gap-4">
          
          {/* Logo & Location */}
          <div className="flex items-center space-x-4 md:space-x-8 shrink-0">
            {/* Swiggy Orange Logo Badge */}
            <div 
              className="flex items-center space-x-2.5 cursor-pointer group"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <div className="w-10 h-10 bg-linear-to-br from-[#FC8019] to-[#F7881F] rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/25 border border-white/40 group-hover:scale-105 transition-transform">
                {/* Stylized Swiggy 'S' icon */}
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12c0 2.85 1.2 5.42 3.12 7.24L12 22l6.88-2.76C20.8 17.42 22 14.85 22 12c0-5.52-4.48-10-10-10zm0 3.5c2.48 0 4.5 2.02 4.5 4.5 0 1.9-1.2 3.53-2.9 4.19l-.1.04v1.77h-3v-3.5c0-.83.67-1.5 1.5-1.5s1.5-.67 1.5-1.5c0-.83-.67-1.5-1.5-1.5S10.5 8.17 10.5 9H7.5c0-2.48 2.02-4.5 4.5-4.5z"/>
                </svg>
              </div>
              <div className="hidden sm:block">
                <span className="text-2xl font-black tracking-tight text-[#FC8019]">SWIGGY</span>
                <span className="text-[10px] ml-1.5 bg-white/70 backdrop-blur-md text-[#FC8019] border border-orange-200/60 font-extrabold px-2 py-0.5 rounded-full uppercase tracking-widest shadow-2xs">
                  NextGen
                </span>
              </div>
            </div>

            {/* Location Selector */}
            <button
              onClick={() => setIsAddressModalOpen(true)}
              className="flex items-center space-x-2 text-left text-gray-700 hover:text-[#FC8019] transition-all py-1.5 px-3 rounded-2xl bg-white/30 hover:bg-white/60 backdrop-blur-md border border-white/50 shadow-2xs"
            >
              <div className="w-6 h-6 rounded-lg bg-orange-100/80 flex items-center justify-center">
                <MapPin className="w-3.5 h-3.5 text-[#FC8019] shrink-0" />
              </div>
              <div className="max-w-[140px] md:max-w-[200px] truncate">
                <div className="flex items-center space-x-1">
                  <span className="text-xs md:text-sm font-extrabold text-gray-900 truncate">Deliver to</span>
                  <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
                </div>
                <p className="text-[11px] text-gray-500 font-medium truncate">{deliveryAddress}</p>
              </div>
            </button>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search for 'Biryani', 'Corner House', 'Milk', 'Pizza'..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-8 py-2.5 bg-white/40 hover:bg-white/60 focus:bg-white/80 backdrop-blur-xl text-sm font-medium rounded-2xl border border-white/60 focus:border-[#FC8019] focus:ring-3 focus:ring-orange-500/10 outline-hidden transition-all placeholder:text-gray-400 shadow-2xs"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-600 bg-white/80 rounded-full w-4 h-4 flex items-center justify-center shadow-2xs"
              >
                ✕
              </button>
            )}
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* UX Case Study Link */}
            <button
              onClick={() => setIsCaseStudyOpen(true)}
              className="flex items-center space-x-1.5 px-3.5 py-2 text-xs font-bold text-gray-700 bg-white/40 hover:bg-white/80 backdrop-blur-md rounded-2xl transition-all border border-white/60 shadow-2xs hover:shadow-xs"
              title="View Dharmi & Pankti's UX Research Case Study"
            >
              <BookOpen className="w-4 h-4 text-[#FC8019]" />
              <span className="hidden lg:inline">UX Research</span>
              <span className="bg-[#FC8019] text-white text-[9px] px-1.5 py-0.2 rounded-full font-extrabold uppercase tracking-wider">New</span>
            </button>

            {/* Direct 1-Click Human Support Access */}
            <button
              onClick={() => setIsSupportOpen(true)}
              className="flex items-center space-x-1.5 px-3.5 py-2 text-xs font-bold text-emerald-900 bg-emerald-50/70 hover:bg-emerald-100/90 backdrop-blur-md rounded-2xl transition-all border border-emerald-200/60 shadow-2xs"
            >
              <Headphones className="w-4 h-4 text-emerald-600" />
              <span className="hidden sm:inline">Support</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            </button>

            {/* Cart Button (with Multi-Restaurant indicator) */}
            <button
              onClick={() => setIsCartOpen(true)}
              className={`relative flex items-center space-x-2 px-4 py-2 rounded-2xl font-extrabold text-xs sm:text-sm transition-all shadow-md ${
                totalCartCount > 0
                  ? 'bg-linear-to-r from-[#FC8019] to-[#F7881F] text-white hover:opacity-95 shadow-orange-500/25 border border-white/30'
                  : 'bg-white/50 backdrop-blur-md text-gray-700 hover:bg-white/80 border border-white/60 shadow-2xs'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Cart</span>
              
              {totalCartCount > 0 && (
                <span className="bg-white text-[#FC8019] text-xs font-black px-1.5 py-0.2 rounded-md shadow-2xs">
                  {totalCartCount}
                </span>
              )}

              {/* Multi-Restaurant Mini Indicator */}
              {distinctRestaurants.length > 1 && (
                <span 
                  title={`Multi-restaurant: ${distinctRestaurants.length} places`}
                  className="hidden md:flex items-center space-x-0.5 bg-black/20 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold backdrop-blur-xs"
                >
                  <Layers className="w-2.5 h-2.5" />
                  <span>{distinctRestaurants.length} Rest.</span>
                </span>
              )}
            </button>
          </div>

        </div>

        {/* Mobile Search Bar */}
        <div className="pb-3 md:hidden">
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search dishes, groceries, restaurants..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-white/50 backdrop-blur-md text-sm font-medium rounded-2xl border border-white/60 focus:border-[#FC8019] outline-hidden shadow-2xs"
            />
          </div>
        </div>
      </div>
    </header>
  );
};
