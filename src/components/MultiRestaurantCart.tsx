import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  Layers, 
  Tag, 
  Check, 
  ShieldCheck, 
  Clock, 
  ArrowRight,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { COUPONS } from '../data/mockData';

export const MultiRestaurantCart: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
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
    setIsConfirmationOpen,
    deliveryAddress,
    setIsAddressModalOpen,
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const [couponFeedback, setCouponFeedback] = useState<{ text: string; success: boolean } | null>(null);

  if (!isCartOpen) return null;

  const handleApplyCoupon = (code: string) => {
    const result = applyCoupon(code);
    setCouponFeedback({ text: result.message, success: result.success });
    setTimeout(() => setCouponFeedback(null), 3000);
  };

  const handleProceedToCheckout = () => {
    setIsConfirmationOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-md flex justify-end">
      <div 
        className="backdrop-blur-2xl bg-white/85 border-l border-white/60 w-full max-w-md h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-300"
      >
        {/* Cart Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-white/60 flex items-center justify-between bg-white/40 backdrop-blur-md">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#FC8019] text-white flex items-center justify-center font-bold shadow-md">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-black text-gray-900">Your Cart</h2>
              <p className="text-xs text-gray-500 font-medium">
                {cart.length === 0 ? 'Empty' : `${cart.reduce((s, i) => s + i.quantity, 0)} items from ${distinctRestaurants.length} spot(s)`}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {cart.length > 0 && (
              <button
                onClick={clearCart}
                className="text-xs text-gray-400 hover:text-rose-600 font-semibold p-1.5 rounded-lg hover:bg-white/60 transition-colors cursor-pointer"
                title="Clear all items"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={() => setIsCartOpen(false)}
              className="text-gray-400 hover:text-gray-700 p-1.5 rounded-full hover:bg-white/80 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Multi-Restaurant Distinct Badge */}
        {isMultiRestaurant && (
          <div className="bg-orange-50/90 backdrop-blur-md border-b border-orange-200/80 px-4 py-2.5 flex items-center space-x-2 text-xs text-[#FC8019] font-black">
            <Sparkles className="w-4 h-4 shrink-0" />
            <span>Multi-Restaurant Order active! All {distinctRestaurants.length} places combined in 1 delivery.</span>
          </div>
        )}

        {/* Cart Body */}
        {cart.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <div className="w-20 h-20 bg-orange-100/70 backdrop-blur-md rounded-3xl flex items-center justify-center text-[#FC8019] mb-4 border border-orange-200/60 shadow-lg">
              <Layers className="w-10 h-10" />
            </div>
            <h3 className="text-lg font-black text-gray-900">Your Cart is Empty</h3>
            <p className="text-xs text-gray-500 font-medium mt-1 max-w-xs">
              Explore Biryani, Burgers, Ice Creams or Groceries and add items from any restaurant!
            </p>
            <button
              onClick={() => setIsCartOpen(false)}
              className="mt-6 bg-[#FC8019] hover:bg-[#e67314] text-white text-xs font-black px-6 py-3 rounded-2xl shadow-lg shadow-orange-500/20 transition-all active:scale-95 cursor-pointer"
            >
              Start Exploring
            </button>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-6">
            
            {/* Delivery Location Preview */}
            <div className="bg-white/60 backdrop-blur-md p-3.5 rounded-2xl border border-white/80 flex items-center justify-between text-xs shadow-2xs">
              <div>
                <span className="font-bold text-gray-800 block">Deliver to:</span>
                <span className="text-gray-500 font-medium truncate block max-w-[220px]">{deliveryAddress}</span>
              </div>
              <button
                onClick={() => setIsAddressModalOpen(true)}
                className="text-[#FC8019] font-black hover:underline cursor-pointer"
              >
                Change
              </button>
            </div>

            {/* Restaurant-wise Grouped Items */}
            <div className="space-y-4">
              {distinctRestaurants.map(rest => {
                const restaurantItems = cart.filter(item => item.dish.restaurantId === rest.id);

                return (
                  <div key={rest.id} className="backdrop-blur-xl bg-white/60 rounded-3xl border border-white/80 overflow-hidden shadow-lg shadow-black/5">
                    {/* Restaurant Group Header */}
                    <div className="bg-white/70 px-4 py-2.5 border-b border-white/60 flex items-center justify-between">
                      <div className="flex items-center space-x-1.5">
                        <span className="text-xs font-black text-gray-900">📍 {rest.name}</span>
                      </div>
                      <span className="text-[10px] bg-orange-100/90 text-[#FC8019] font-black px-2 py-0.5 rounded-full border border-orange-200/50">
                        {restaurantItems.length} dish{restaurantItems.length > 1 ? 'es' : ''}
                      </span>
                    </div>

                    {/* Dish Items inside this restaurant */}
                    <div className="divide-y divide-white/50 p-2">
                      {restaurantItems.map(item => (
                        <div key={item.dish.id} className="p-2.5 flex items-center justify-between gap-2">
                          <div className="flex items-center space-x-2.5 truncate">
                            <div
                              className={`w-3.5 h-3.5 rounded-xs border flex items-center justify-center shrink-0 ${
                                item.dish.isVeg ? 'border-emerald-600' : 'border-rose-600'
                              }`}
                            >
                              <div className={`w-1.5 h-1.5 rounded-full ${item.dish.isVeg ? 'bg-emerald-600' : 'bg-rose-600'}`} />
                            </div>

                            <div className="truncate">
                              <h5 className="text-xs font-black text-gray-900 truncate">{item.dish.name}</h5>
                              <div className="text-[11px] text-gray-500 font-medium flex items-center space-x-2">
                                <span className="font-extrabold text-gray-800">₹{item.dish.price}</span>
                                {item.customization && (
                                  <span className="text-[#FC8019] font-semibold">
                                    • {item.customization.spiceLevel || ''} {item.customization.size || ''}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex items-center bg-white/90 backdrop-blur-md rounded-xl px-2 py-1 text-xs font-black text-gray-800 shrink-0 border border-white/70 shadow-2xs">
                            <button
                              onClick={() => updateQuantity(item.dish.id, -1)}
                              className="p-0.5 hover:text-rose-600 cursor-pointer"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2 font-black">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.dish.id, 1)}
                              className="p-0.5 hover:text-emerald-600 cursor-pointer"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Coupons Section */}
            <div className="backdrop-blur-xl bg-white/60 rounded-3xl p-4 border border-white/80 space-y-3 shadow-lg shadow-black/5">
              <div className="flex items-center space-x-2 text-xs font-black text-gray-800">
                <Tag className="w-3.5 h-3.5 text-[#FC8019]" />
                <span>Apply Coupons & Promo Codes</span>
              </div>

              {appliedCoupon ? (
                <div className="bg-emerald-50/90 backdrop-blur-xs border border-emerald-300/80 rounded-2xl p-3 flex items-center justify-between shadow-2xs">
                  <div className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <div>
                      <span className="text-xs font-black text-emerald-900">'{appliedCoupon.code}' Applied!</span>
                      <p className="text-[10px] text-emerald-700 font-bold">You saved ₹{discountAmount}</p>
                    </div>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-xs text-rose-600 font-black hover:underline cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter coupon code"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                    className="flex-1 px-3 py-2 text-xs bg-white/80 rounded-2xl border border-white/80 focus:border-[#FC8019] outline-hidden uppercase font-mono shadow-2xs"
                  />
                  <button
                    onClick={() => handleApplyCoupon(couponInput)}
                    className="bg-[#FC8019] text-white text-xs font-black px-4 py-2 rounded-2xl hover:bg-[#e67314] transition-colors shadow-md shadow-orange-500/20 cursor-pointer active:scale-95"
                  >
                    Apply
                  </button>
                </div>
              )}

              {couponFeedback && (
                <p className={`text-xs ${couponFeedback.success ? 'text-emerald-600 font-bold' : 'text-rose-600'}`}>
                  {couponFeedback.text}
                </p>
              )}

              {/* Quick Coupon Chips */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {COUPONS.map(c => (
                  <button
                    key={c.code}
                    onClick={() => handleApplyCoupon(c.code)}
                    className="text-[10px] font-bold bg-white/80 hover:bg-orange-50 border border-white/80 hover:border-[#FC8019] text-gray-700 hover:text-[#FC8019] px-2.5 py-1 rounded-xl transition-all shadow-2xs cursor-pointer"
                  >
                    {c.code} ({c.discount}% OFF)
                  </button>
                ))}
              </div>
            </div>

            {/* Bill Breakdown */}
            <div className="backdrop-blur-xl bg-white/60 rounded-3xl p-4 sm:p-5 border border-white/80 space-y-2.5 text-xs shadow-lg shadow-black/5">
              <h4 className="font-black text-gray-900 text-sm mb-2">Bill Details</h4>
              
              <div className="flex justify-between text-gray-600 font-medium">
                <span>Item Total</span>
                <span className="font-bold text-gray-900">₹{subtotal}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600 font-bold">
                  <span>Coupon Discount</span>
                  <span>-₹{discountAmount}</span>
                </div>
              )}

              <div className="flex justify-between text-gray-600 font-medium">
                <span className="flex items-center space-x-1">
                  <span>Delivery Fee</span>
                  {isMultiRestaurant && <span className="text-[10px] text-orange-600 font-bold">(Multi-stop bundle)</span>}
                </span>
                <span className="font-bold text-gray-900">₹{deliveryFee}</span>
              </div>

              <div className="flex justify-between text-gray-600 font-medium">
                <span>Restaurant Packaging ({distinctRestaurants.length} places)</span>
                <span className="font-bold text-gray-900">₹{packagingFee}</span>
              </div>

              <div className="flex justify-between text-gray-600 font-medium">
                <span>Platform Fee</span>
                <span className="font-bold text-gray-900">₹{platformFee}</span>
              </div>

              <div className="pt-3 border-t border-white/60 flex justify-between text-sm font-black text-gray-900">
                <span>TO PAY</span>
                <span className="text-base text-[#FC8019]">₹{totalPayable}</span>
              </div>
            </div>

            {/* 120s Grace Period Notice (Slide 5, 11, 16) */}
            <div className="backdrop-blur-xl bg-emerald-500/15 border border-emerald-400/40 rounded-3xl p-4 flex items-start space-x-2.5 text-xs text-emerald-950 shadow-sm">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-black block">120-Second Cancellation Guarantee</span>
                <span className="text-emerald-800 text-[11px] font-medium leading-relaxed block mt-0.5">
                  Made an accidental mistake? You will have a live 120-second countdown after placing the order to cancel instantly for a 100% full refund with zero fees!
                </span>
              </div>
            </div>

          </div>
        )}

        {/* Cart Drawer Footer */}
        {cart.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-white/60 bg-white/50 backdrop-blur-md space-y-3">
            <div className="flex items-center justify-between text-sm">
              <div>
                <span className="text-xs text-gray-400 block font-medium">Grand Total</span>
                <span className="text-2xl font-black text-gray-900">₹{totalPayable}</span>
              </div>
              <button
                onClick={handleProceedToCheckout}
                className="bg-[#FC8019] hover:bg-[#e67314] text-white font-black text-sm px-6 py-3.5 rounded-2xl transition-all shadow-xl shadow-orange-500/25 flex items-center space-x-2 active:scale-95 cursor-pointer"
              >
                <span>Review & Pay</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
