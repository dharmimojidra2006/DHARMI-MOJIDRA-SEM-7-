import React, { useState } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { Header } from './components/Header';
import { ServiceTabs } from './components/ServiceTabs';
import { FoodView } from './components/FoodView';
import { InstamartView } from './components/InstamartView';
import { DineoutView } from './components/DineoutView';
import { ScenesView } from './components/ScenesView';
import { CaseStudyView } from './components/CaseStudyModal';
import { MultiRestaurantCart } from './components/MultiRestaurantCart';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { SupportModal } from './components/SupportModal';
import { AddressModal } from './components/AddressModal';
import { 
  ShoppingBag, 
  Layers, 
  ArrowRight, 
  Clock, 
  BookOpen, 
  Sparkles, 
  X 
} from 'lucide-react';

const AppContent: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { 
    activeService, 
    cart, 
    setIsCartOpen, 
    totalPayable, 
    distinctRestaurants,
    isCaseStudyOpen,
    setIsCaseStudyOpen,
    activeOrder,
    setIsOrderTrackingOpen
  } = useCart();

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#fbfbfa] text-[#1A1A1A] flex flex-col selection:bg-orange-100 selection:text-[#FC8019] relative overflow-x-hidden font-sans">
      
      {/* 🔮 Frosted Glass Ambient Mesh Glowing Background Orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-[12%] -left-[10%] w-[55%] h-[55%] bg-[#ffdde1] rounded-full blur-[130px] opacity-70" />
        <div className="absolute top-[30%] -right-[8%] w-[45%] h-[45%] bg-[#ee9ca7] rounded-full blur-[120px] opacity-45" />
        <div className="absolute top-[65%] -left-[5%] w-[40%] h-[40%] bg-[#fed7aa] rounded-full blur-[140px] opacity-50" />
        <div className="absolute -bottom-[10%] left-[25%] w-[60%] h-[55%] bg-[#a1c4fd] rounded-full blur-[160px] opacity-55" />
        <div className="absolute top-[10%] right-[25%] w-[35%] h-[35%] bg-[#fbcfe8] rounded-full blur-[150px] opacity-35" />
      </div>

      {/* Top Header with Glass Effect */}
      <div className="relative z-40">
        <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </div>

      {/* Main Service Switcher Navigation */}
      <div className="relative z-30">
        <ServiceTabs />
      </div>

      {/* Content Area */}
      <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeService === 'food' && <FoodView searchQuery={searchQuery} />}
        {activeService === 'instamart' && <InstamartView searchQuery={searchQuery} />}
        {activeService === 'dineout' && <DineoutView />}
        {activeService === 'scenes' && <ScenesView />}
        {activeService === 'casestudy' && <CaseStudyView />}
      </main>

      {/* Floating Bottom Bar for Mobile / Quick Cart Action if items in cart */}
      {totalCartCount > 0 && (
        <div className="fixed bottom-4 left-4 right-4 max-w-md mx-auto z-40">
          <div 
            onClick={() => setIsCartOpen(true)}
            className="backdrop-blur-2xl bg-[#FC8019]/90 hover:bg-[#FC8019] text-white p-3.5 sm:p-4 rounded-3xl shadow-2xl shadow-orange-500/30 border border-white/30 flex items-center justify-between cursor-pointer transition-all active:scale-98 group"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center font-bold">
                <ShoppingBag className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="flex items-center space-x-1.5">
                  <span className="text-xs sm:text-sm font-extrabold tracking-tight">
                    {totalCartCount} item{totalCartCount > 1 ? 's' : ''} • ₹{totalPayable}
                  </span>
                  {distinctRestaurants.length > 1 && (
                    <span className="bg-white/25 backdrop-blur-xs text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-white/30 flex items-center space-x-1">
                      <Layers className="w-2.5 h-2.5" />
                      <span>{distinctRestaurants.length} Rest.</span>
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-orange-100 font-medium">
                  {distinctRestaurants.length > 1 ? 'Multi-Restaurant Order' : 'Ready for fast checkout'}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-1.5 text-xs sm:text-sm font-extrabold bg-white/20 backdrop-blur-md px-3.5 py-1.5 rounded-2xl border border-white/30 group-hover:bg-white group-hover:text-[#FC8019] transition-all">
              <span>View Cart</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      )}

      {/* Floating Active Order Pill at Bottom Right if order active */}
      {activeOrder && activeOrder.status !== 'cancelled' && activeOrder.status !== 'delivered' && totalCartCount === 0 && (
        <div className="fixed bottom-5 right-5 z-40">
          <button
            onClick={() => setIsOrderTrackingOpen(true)}
            className="backdrop-blur-2xl bg-linear-to-r from-[#FC8019]/95 to-[#E65100]/95 text-white px-4 py-3 rounded-2xl shadow-2xl border border-white/30 flex items-center space-x-2.5 hover:scale-105 transition-all text-xs font-extrabold"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
            </span>
            <span>
              {activeOrder.cancellationGraceRemainingSec > 0
                ? `120s Cancel Window (${activeOrder.cancellationGraceRemainingSec}s)`
                : `Tracking Order #${activeOrder.id}`}
            </span>
            <Clock className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Footer with Frosted Glass Styling */}
      <footer className="relative z-20 backdrop-blur-xl bg-white/40 border-t border-white/50 mt-auto py-8 text-xs text-gray-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 rounded-xl bg-[#FC8019] text-white flex items-center justify-center text-xs font-black shadow-md shadow-orange-500/20">
              S
            </div>
            <span className="font-extrabold text-gray-800 tracking-tight">Swiggy NextGen • Frosted Glass Experience</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 text-gray-600 font-medium">
            <span className="bg-white/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/60 shadow-2xs">
              UX Study by <strong>Dharmi Mojidra</strong> & <strong>Pankti Shah</strong>
            </span>
            <span>•</span>
            <span className="bg-white/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/60 shadow-2xs">
              120s Cancellation Guarantee
            </span>
            <span>•</span>
            <span className="bg-white/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/60 shadow-2xs">
              Multi-Restaurant Cart
            </span>
          </div>
        </div>
      </footer>

      {/* Application Modals & Drawers */}
      <MultiRestaurantCart />
      <OrderConfirmationModal />
      <OrderTrackingModal />
      <SupportModal />
      <AddressModal />

      {/* Case Study Fullscreen Modal if opened via header */}
      {isCaseStudyOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
          <div className="backdrop-blur-2xl bg-white/85 w-full max-w-4xl max-h-[92vh] rounded-[36px] overflow-hidden shadow-2xl border border-white/70 flex flex-col animate-in zoom-in-95 duration-200">
            <div className="p-4 sm:p-5 border-b border-white/60 flex items-center justify-between bg-white/40 backdrop-blur-md">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-xl bg-orange-100/80 text-[#FC8019] flex items-center justify-center font-bold">
                  <BookOpen className="w-4 h-4" />
                </div>
                <h3 className="text-base font-extrabold text-gray-900">
                  Swiggy UX Research & Redesign Case Study
                </h3>
              </div>
              <button
                onClick={() => setIsCaseStudyOpen(false)}
                className="text-gray-500 hover:text-gray-800 p-1.5 rounded-full hover:bg-white/60 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 sm:p-6">
              <CaseStudyView />
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}
