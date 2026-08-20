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
  Layers,
  Utensils,
  Zap,
  Calendar
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
    setIsOrderTrackingOpen,
    activeService,
    setActiveService
  } = useCart();

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const appOptions = [
    {
      id: 'food',
      name: 'Food Delivery',
      shortName: 'Food',
      icon: Utensils,
      activeClass: 'bg-linear-to-r from-[#FC8019] to-[#F7881F] text-white shadow-md shadow-orange-500/25 border-orange-400/50',
      badge: 'Multi-Cart'
    },
    {
      id: 'instamart',
      name: 'Instamart',
      shortName: 'Instamart',
      icon: Zap,
      activeClass: 'bg-linear-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/25 border-blue-400/50',
      badge: '10 Min'
    },
    {
      id: 'scenes',
      name: 'Scenes',
      shortName: 'Scenes',
      icon: Sparkles,
      activeClass: 'bg-linear-to-r from-purple-600 to-fuchsia-600 text-white shadow-md shadow-purple-500/25 border-purple-400/50',
      badge: 'Events'
    },
    {
      id: 'dineout',
      name: 'Dineout',
      shortName: 'Dineout',
      icon: Calendar,
      activeClass: 'bg-linear-to-r from-rose-600 to-pink-600 text-white shadow-md shadow-rose-500/25 border-rose-400/50',
      badge: 'Up to 30% OFF'
    }
  ];

  return (
    <header className="sticky top-0 z-40 backdrop-blur-2xl bg-white/60 border-b border-white/60 shadow-xs transition-all">
      {/* Top Banner for Active Order Live Timer if exists */}
      {activeOrder && activeOrder.status !== 'cancelled' && activeOrder.status !== 'delivered' && (
        <div 
          onClick={() => setIsOrderTrackingOpen(true)}
          className="backdrop-blur-xl bg-linear-to-r from-[#FC8019]/95 via-[#F7881F]/95 to-[#E65100]/95 border-b border-white/20 text-white px-4 py-2 text-xs md:text-sm font-medium flex items-center justify-between cursor-pointer hover:opacity-95 transition-all shadow-inner"
        >
          <div className="flex items-center space-x-2 truncate max-w-[70%]">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
            </span>
            <span className="font-black">Active Order #{activeOrder.id}:</span>
            <span className="truncate font-medium">
              {activeOrder.cancellationGraceRemainingSec > 0 
                ? `⚡ 120s Grace Period: ${activeOrder.cancellationGraceRemainingSec}s left for 100% instant refund`
                : `🚴 Rider on the way (${activeOrder.estimatedDeliveryMin} mins)`}
            </span>
          </div>
          <div className="flex items-center space-x-1.5 font-bold underline shrink-0 bg-white/20 backdrop-blur-xs px-2.5 py-0.5 rounded-full border border-white/30 text-xs">
            <span>Track Live</span>
            <Clock className="w-3.5 h-3.5" />
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-3 md:gap-6">
          
          {/* Authentic Swiggy Logo & Deliver-to Location */}
          <div className="flex items-center space-x-3 sm:space-x-5 shrink-0">
            
            {/* Proper Official Swiggy Logo */}
            <div 
              className="flex items-center space-x-2.5 cursor-pointer group"
              onClick={() => {
                setActiveService('food');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              title="Swiggy - Go to Home"
            >
              <div className="relative">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-linear-to-br from-[#FC8019] via-[#FF7A00] to-[#E65100] flex items-center justify-center shadow-lg shadow-orange-500/25 border border-white/60 group-hover:scale-105 transition-all duration-300">
                  {/* Clean Authentic Swiggy Geo-Pin Location Marker Mark */}
                  <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white drop-shadow-xs" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C7.58 2 4 5.58 4 10c0 5.25 7.12 11.45 7.43 11.71.34.29.81.29 1.15 0C12.88 21.45 20 15.25 20 10c0-4.42-3.58-8-8-8zm0 4c2.21 0 4 1.79 4 4 0 1.63-.98 3.03-2.38 3.65l-.12.05V15h-3v-3.25c0-.97.78-1.75 1.75-1.75s1.75-.78 1.75-1.75S13.22 6.5 12.25 6.5 10.5 7.28 10.5 8.25H8.75C8.75 6.46 10.21 5 12 5z" />
                  </svg>
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white"></div>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center space-x-1.5">
                  <span className="text-2xl sm:text-3xl font-black tracking-tighter text-[#FC8019] font-sans leading-none">
                    swiggy
                  </span>
                  <span className="hidden xl:inline-block text-[9px] bg-orange-100/90 text-[#FC8019] border border-orange-200 font-black px-1.5 py-0.5 rounded-md uppercase tracking-wider shadow-2xs">
                    NextGen
                  </span>
                </div>
                <span className="text-[9px] sm:text-[10px] text-gray-500 font-bold tracking-wide -mt-0.5 hidden sm:block">
                  Live Food & Grocery
                </span>
              </div>
            </div>

            {/* Deliver-to Location Selector Button */}
            <button
              onClick={() => setIsAddressModalOpen(true)}
              className="flex items-center space-x-2 text-left text-gray-700 hover:text-[#FC8019] transition-all py-1.5 px-3 rounded-2xl bg-white/60 hover:bg-white/90 backdrop-blur-md border border-white/80 shadow-2xs cursor-pointer"
            >
              <div className="w-6 h-6 rounded-xl bg-orange-100/90 flex items-center justify-center shrink-0 border border-orange-200/50">
                <MapPin className="w-3.5 h-3.5 text-[#FC8019]" />
              </div>
              <div className="max-w-[110px] sm:max-w-[160px] md:max-w-[180px] truncate">
                <div className="flex items-center space-x-1">
                  <span className="text-xs font-black text-gray-900 truncate">Deliver to</span>
                  <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
                </div>
                <p className="text-[11px] text-gray-500 font-medium truncate">{deliveryAddress}</p>
              </div>
            </button>
          </div>

          {/* Top Quick App Switcher: Food Delivery, Instamart, Scenes, Dineout */}
          <div className="hidden lg:flex items-center space-x-1.5 bg-white/50 backdrop-blur-xl p-1 rounded-2xl border border-white/80 shadow-inner">
            {appOptions.map((app) => {
              const Icon = app.icon;
              const isActive = activeService === app.id;

              return (
                <button
                  key={app.id}
                  onClick={() => setActiveService(app.id as any)}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer border ${
                    isActive
                      ? `${app.activeClass} font-black scale-102`
                      : 'border-transparent text-gray-700 hover:text-gray-900 hover:bg-white/60'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-gray-500'}`} />
                  <span>{app.name}</span>
                  {isActive && (
                    <span className="text-[9px] bg-white/20 text-white font-black px-1.5 py-0.2 rounded-md uppercase tracking-wider">
                      {app.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Action Icons (Search, UX Case Study, Support, Cart) */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* Desktop Search Bar */}
            <div className="hidden 2xl:flex relative w-56">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search food, groceries..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-6 py-2 bg-white/60 hover:bg-white/90 focus:bg-white backdrop-blur-xl text-xs font-medium rounded-2xl border border-white/80 focus:border-[#FC8019] outline-hidden transition-all placeholder:text-gray-400 shadow-2xs"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-600 bg-white/80 rounded-full w-4 h-4 flex items-center justify-center shadow-2xs"
                >
                  ✕
                </button>
              )}
            </div>

            {/* UX Case Study Link */}
            <button
              onClick={() => setIsCaseStudyOpen(true)}
              className="flex items-center space-x-1.5 px-3 py-2 text-xs font-black text-gray-700 bg-white/60 hover:bg-white/90 backdrop-blur-md rounded-2xl transition-all border border-white/80 shadow-2xs cursor-pointer"
              title="View Dharmi & Pankti's UX Research Case Study"
            >
              <BookOpen className="w-3.5 h-3.5 text-[#FC8019]" />
              <span className="hidden sm:inline">UX Study</span>
              <span className="bg-[#FC8019] text-white text-[9px] px-1.5 py-0.2 rounded-full font-black uppercase tracking-wider">
                Research
              </span>
            </button>

            {/* 1-Click Human Support Desk */}
            <button
              onClick={() => setIsSupportOpen(true)}
              className="flex items-center space-x-1.5 px-3 py-2 text-xs font-black text-emerald-950 bg-emerald-50/80 hover:bg-emerald-100 backdrop-blur-md rounded-2xl transition-all border border-emerald-200/60 shadow-2xs cursor-pointer"
              title="Instant Support - Zero chatbot loops"
            >
              <Headphones className="w-3.5 h-3.5 text-emerald-600" />
              <span className="hidden md:inline">Support</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            </button>

            {/* Cart Button with Multi-Restaurant Indicator */}
            <button
              onClick={() => setIsCartOpen(true)}
              className={`relative flex items-center space-x-2 px-3.5 sm:px-4 py-2 rounded-2xl font-black text-xs sm:text-sm transition-all shadow-md cursor-pointer active:scale-95 ${
                totalCartCount > 0
                  ? 'bg-linear-to-r from-[#FC8019] to-[#F7881F] text-white hover:opacity-95 shadow-orange-500/25 border border-white/40'
                  : 'bg-white/70 backdrop-blur-md text-gray-800 hover:bg-white border border-white/80 shadow-2xs'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Cart</span>
              
              {totalCartCount > 0 && (
                <span className="bg-white text-[#FC8019] text-xs font-black px-1.5 py-0.2 rounded-md shadow-2xs">
                  {totalCartCount}
                </span>
              )}

              {/* Multi-Restaurant Badge */}
              {distinctRestaurants.length > 1 && (
                <span 
                  title={`Multi-restaurant: ${distinctRestaurants.length} places`}
                  className="hidden xl:flex items-center space-x-0.5 bg-black/20 text-white text-[10px] px-1.5 py-0.5 rounded-full font-black backdrop-blur-xs"
                >
                  <Layers className="w-2.5 h-2.5" />
                  <span>{distinctRestaurants.length}</span>
                </span>
              )}
            </button>
          </div>

        </div>

        {/* Mobile App Options Row & Search Bar */}
        <div className="pb-3 lg:hidden space-y-2">
          {/* Quick App Switcher Bar for Mobile / Tablet */}
          <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 scrollbar-none">
            {appOptions.map((app) => {
              const Icon = app.icon;
              const isActive = activeService === app.id;

              return (
                <button
                  key={app.id}
                  onClick={() => setActiveService(app.id as any)}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs whitespace-nowrap transition-all duration-200 cursor-pointer border ${
                    isActive
                      ? `${app.activeClass} font-black shadow-sm`
                      : 'bg-white/60 border-white/80 text-gray-700 font-bold hover:bg-white'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-gray-500'}`} />
                  <span>{app.name}</span>
                </button>
              );
            })}
          </div>

          {/* Search Bar for Mobile */}
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search dishes, groceries, restaurants..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-8 py-2 bg-white/70 backdrop-blur-md text-xs font-medium rounded-2xl border border-white/80 focus:border-[#FC8019] outline-hidden shadow-2xs"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-600 bg-white/90 rounded-full w-4 h-4 flex items-center justify-center shadow-2xs"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

