import React from 'react';
import { useCart } from '../context/CartContext';
import { Utensils, Zap, Calendar, Sparkles, Layers, BookOpen } from 'lucide-react';

export const ServiceTabs: React.FC = () => {
  const { activeService, setActiveService } = useCart();

  const services = [
    {
      id: 'food',
      name: 'Food Delivery',
      subtitle: 'Multi-Restaurant Cart enabled',
      icon: Utensils,
      badge: 'Multi-Cart ✨',
      color: 'from-orange-500 to-amber-500',
    },
    {
      id: 'instamart',
      name: 'Instamart',
      subtitle: 'Groceries in 10-15 mins',
      icon: Zap,
      badge: '10 Mins ⚡',
      color: 'from-blue-600 to-cyan-500',
    },
    {
      id: 'dineout',
      name: 'Dineout',
      subtitle: 'Reserve table & get up to 30% off',
      icon: Calendar,
      badge: 'Flat 20% OFF',
      color: 'from-rose-500 to-pink-500',
    },
    {
      id: 'scenes',
      name: 'Scenes',
      subtitle: 'Food festivals & culinary masterclasses',
      icon: Sparkles,
      badge: 'Events 🎉',
      color: 'from-purple-600 to-indigo-500',
    },
    {
      id: 'casestudy',
      name: 'UX Case Study',
      subtitle: 'Dharmi & Pankti Research Data',
      icon: BookOpen,
      badge: 'Research 📑',
      color: 'from-emerald-600 to-teal-500',
    }
  ];

  return (
    <div className="backdrop-blur-2xl bg-white/30 border-b border-white/50 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center space-x-2 sm:space-x-4 overflow-x-auto pb-1 scrollbar-none">
          {services.map((service) => {
            const Icon = service.icon;
            const isActive = activeService === service.id;

            return (
              <button
                key={service.id}
                onClick={() => setActiveService(service.id as any)}
                className={`relative flex items-center space-x-2.5 px-4 py-2.5 rounded-2xl text-left transition-all shrink-0 border cursor-pointer group ${
                  isActive
                    ? 'backdrop-blur-2xl bg-white/85 border-white shadow-lg shadow-black/5 text-[#FC8019] scale-100'
                    : 'bg-white/35 hover:bg-white/60 backdrop-blur-md border-white/50 text-gray-700 hover:text-gray-900 shadow-2xs'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${
                    isActive ? `bg-linear-to-r ${service.color} text-white shadow-md` : 'bg-white/70 text-gray-600 group-hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center space-x-1.5">
                    <span className={`text-xs sm:text-sm font-extrabold tracking-tight ${isActive ? 'text-[#FC8019]' : 'text-gray-900'}`}>
                      {service.name}
                    </span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold uppercase tracking-wider ${
                        isActive
                          ? 'bg-orange-100/90 text-[#FC8019] border border-orange-200/50'
                          : 'bg-white/80 text-gray-500 border border-white/60'
                      }`}
                    >
                      {service.badge}
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-500 hidden sm:block font-medium">
                    {service.subtitle}
                  </p>
                </div>

                {isActive && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-[#FC8019] rounded-full shadow-xs" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
