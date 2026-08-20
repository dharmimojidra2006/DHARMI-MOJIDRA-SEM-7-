import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { 
  ShieldCheck, 
  MapPin, 
  CreditCard, 
  Wallet, 
  Banknote, 
  X, 
  Clock, 
  CheckCircle,
  AlertCircle,
  Layers
} from 'lucide-react';

export const OrderConfirmationModal: React.FC = () => {
  const {
    isConfirmationOpen,
    setIsConfirmationOpen,
    cart,
    distinctRestaurants,
    isMultiRestaurant,
    totalPayable,
    deliveryAddress,
    placeOrder,
  } = useCart();

  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'swiggy_money' | 'cod'>('upi');
  const [cookingInstructions, setCookingInstructions] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isConfirmationOpen) return null;

  const handleFinalPlaceOrder = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      placeOrder(
        paymentMethod === 'upi' ? 'UPI (Google Pay / PhonePe)' : 
        paymentMethod === 'swiggy_money' ? 'Swiggy Money Balance' :
        paymentMethod === 'card' ? 'Credit / Debit Card' : 'Cash on Delivery',
        cookingInstructions
      );
      setIsSubmitting(false);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-md flex items-center justify-center p-4">
      <div className="backdrop-blur-2xl bg-white/90 rounded-[32px] max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-white/70 animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-white/60">
          <div>
            <div className="flex items-center space-x-1.5 text-xs font-black text-emerald-600 uppercase tracking-wider mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span>Step 2: Error Prevention Review</span>
            </div>
            <h3 className="text-xl font-black text-gray-900">Confirm Order Details</h3>
          </div>
          <button
            onClick={() => setIsConfirmationOpen(false)}
            className="text-gray-400 hover:text-gray-700 p-1.5 rounded-full hover:bg-white/60 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4 text-xs">
          
          {/* Order Summary Box */}
          <div className="backdrop-blur-xl bg-white/60 rounded-3xl p-4 border border-white/80 shadow-sm">
            <div className="flex items-center justify-between font-black text-gray-800 mb-2">
              <span className="flex items-center space-x-1.5">
                <Layers className="w-4 h-4 text-[#FC8019]" />
                <span>{cart.reduce((s, i) => s + i.quantity, 0)} Items from {distinctRestaurants.length} Restaurant(s)</span>
              </span>
              <span className="text-emerald-700 text-sm">₹{totalPayable}</span>
            </div>
            
            <div className="space-y-1.5 text-gray-600 pl-2 border-l-2 border-orange-400 font-medium">
              {cart.map(item => (
                <div key={item.dish.id} className="flex justify-between">
                  <span>{item.quantity}x {item.dish.name}</span>
                  <span className="font-bold text-gray-800">₹{item.dish.price * item.quantity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery Location Confirmation */}
          <div className="backdrop-blur-xl bg-orange-50/70 rounded-3xl p-4 border border-orange-200/60 flex items-start space-x-3 shadow-2xs">
            <MapPin className="w-4 h-4 text-[#FC8019] shrink-0 mt-0.5" />
            <div>
              <span className="font-black text-gray-900 block">Deliver To:</span>
              <span className="text-gray-600 font-medium block mt-0.5">{deliveryAddress}</span>
            </div>
          </div>

          {/* Cooking Instructions / Allergy Note */}
          <div>
            <label className="font-black text-gray-700 block mb-1">
              Add Cooking / Delivery Instructions (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. Leave at door, extra spicy, no cutlery"
              value={cookingInstructions}
              onChange={(e) => setCookingInstructions(e.target.value)}
              className="w-full px-4 py-2.5 bg-white/70 rounded-2xl border border-white/80 text-xs text-gray-900 focus:border-[#FC8019] outline-hidden shadow-2xs"
            />
          </div>

          {/* Payment Method Selector */}
          <div>
            <label className="font-black text-gray-700 block mb-2">
              Choose Payment Method
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'upi', label: 'UPI (GPay / PhonePe)', icon: Wallet, badge: 'Instant' },
                { id: 'swiggy_money', label: 'Swiggy Money (₹850)', icon: Wallet, badge: '1-Tap' },
                { id: 'card', label: 'Credit / Debit Card', icon: CreditCard },
                { id: 'cod', label: 'Cash on Delivery', icon: Banknote },
              ].map(method => {
                const Icon = method.icon;
                const isSelected = paymentMethod === method.id;
                return (
                  <button
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id as any)}
                    className={`p-3 rounded-2xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[#FC8019] bg-orange-50/90 text-[#FC8019] font-black shadow-md'
                        : 'border-white/80 bg-white/60 text-gray-700 hover:bg-white font-medium'
                    }`}
                  >
                    <div className="flex items-center space-x-2 truncate">
                      <Icon className="w-4 h-4 shrink-0" />
                      <span className="truncate text-xs">{method.label}</span>
                    </div>
                    {method.badge && (
                      <span className="text-[9px] bg-emerald-100/90 text-emerald-800 font-black px-2 py-0.5 rounded-full border border-emerald-200/50">
                        {method.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 120s Grace Period Safety Reminder */}
          <div className="backdrop-blur-xl bg-emerald-500/15 border border-emerald-400/40 rounded-3xl p-3.5 text-emerald-950 flex items-center space-x-2.5 shadow-2xs">
            <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="text-[11px] leading-tight font-medium">
              <strong>120-Sec Grace Window:</strong> After tapping Place Order, you can cancel instantly for 100% refund with zero penalty!
            </span>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-white/60 flex items-center justify-between">
          <div>
            <span className="text-gray-400 text-[11px] block font-medium">Total Amount</span>
            <span className="text-xl font-black text-gray-900">₹{totalPayable}</span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsConfirmationOpen(false)}
              className="px-4 py-2.5 rounded-2xl border border-white/80 bg-white/60 text-gray-700 font-bold text-xs hover:bg-white cursor-pointer transition-colors"
            >
              Back
            </button>
            <button
              onClick={handleFinalPlaceOrder}
              disabled={isSubmitting}
              className="bg-[#FC8019] hover:bg-[#e67314] text-white font-black text-xs sm:text-sm px-6 py-3 rounded-2xl transition-all shadow-xl shadow-orange-500/25 flex items-center space-x-1.5 disabled:opacity-50 active:scale-95 cursor-pointer"
            >
              {isSubmitting ? (
                <span>Confirming...</span>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4" />
                  <span>Place Order • ₹{totalPayable}</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
