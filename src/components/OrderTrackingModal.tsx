import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { 
  X, 
  Clock, 
  MapPin, 
  Phone, 
  MessageSquare, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  Layers, 
  Navigation,
  RotateCcw,
  Headphones,
  Check
} from 'lucide-react';

export const OrderTrackingModal: React.FC = () => {
  const {
    activeOrder,
    isOrderTrackingOpen,
    setIsOrderTrackingOpen,
    cancelOrder,
    setIsSupportOpen,
    setActiveService
  } = useCart();

  const [showCancelReasonModal, setShowCancelReasonModal] = useState(false);
  const [cancelReason, setCancelReason] = useState('Placed order accidentally');
  const [cancellationSuccess, setCancellationSuccess] = useState(false);

  if (!isOrderTrackingOpen || !activeOrder) return null;

  const isGraceActive = activeOrder.cancellationGraceRemainingSec > 0;
  const isCancelled = activeOrder.status === 'cancelled';

  const handleConfirmCancel = () => {
    cancelOrder(activeOrder.id, cancelReason);
    setCancellationSuccess(true);
    setTimeout(() => {
      setShowCancelReasonModal(false);
    }, 1500);
  };

  // Progress percentage for 120s grace period
  const graceProgressPercent = Math.max(0, (activeOrder.cancellationGraceRemainingSec / 120) * 100);

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
      <div className="backdrop-blur-2xl bg-white/90 rounded-[32px] max-w-xl w-full max-h-[92vh] flex flex-col overflow-hidden shadow-2xl border border-white/70 animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-white/60 flex items-center justify-between bg-white/40 backdrop-blur-md">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-gray-500">Order ID: #{activeOrder.id}</span>
              {activeOrder.isMultiRestaurant && (
                <span className="bg-orange-100/90 text-[#FC8019] text-[10px] font-black px-2.5 py-0.5 rounded-full flex items-center space-x-1 border border-orange-200/50">
                  <Layers className="w-3 h-3" />
                  <span>Multi-Restaurant Route</span>
                </span>
              )}
            </div>
            <h3 className="text-lg font-black text-gray-900 mt-0.5">
              {isCancelled ? 'Order Cancelled' : 'Live Order Tracking'}
            </h3>
          </div>

          <button
            onClick={() => setIsOrderTrackingOpen(false)}
            className="text-gray-400 hover:text-gray-700 p-1.5 rounded-full hover:bg-white/60 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">

          {/* ⚡ 120-SECOND LIVE CANCELLATION COUNTDOWN GRACE WINDOW (Key Slide 5, 11, 15, 16, 22, 23) */}
          {isGraceActive && !isCancelled && (
            <div className="backdrop-blur-2xl bg-linear-to-br from-amber-500/95 via-orange-500/95 to-[#FC8019]/95 text-white p-5 rounded-[28px] shadow-xl shadow-orange-500/25 border border-white/30 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                  </span>
                  <span className="text-xs uppercase font-black tracking-wider">
                    Immediate Cancellation Window
                  </span>
                </div>

                <div className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-mono font-black flex items-center space-x-1 border border-white/30">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{activeOrder.cancellationGraceRemainingSec}s left</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-black/20 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-white h-full transition-all duration-1000 ease-linear rounded-full"
                  style={{ width: `${graceProgressPercent}%` }}
                />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                <p className="text-xs text-orange-50 leading-relaxed font-medium">
                  Accidentally placed the order or forgot an item? Cancel now for an <strong>instant 100% full refund</strong> with zero fees.
                </p>

                <button
                  onClick={() => setShowCancelReasonModal(true)}
                  className="bg-white text-[#FC8019] hover:bg-orange-50 font-black text-xs px-4 py-2.5 rounded-2xl transition-all active:scale-95 shadow-md shrink-0 flex items-center justify-center space-x-1 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Cancel Order (100% Refund)</span>
                </button>
              </div>
            </div>
          )}

          {/* Cancellation State Display (Slide 23) */}
          {isCancelled && (
            <div className="backdrop-blur-xl bg-rose-50/90 border border-rose-200 rounded-[28px] p-5 text-center space-y-3 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto shadow-xs">
                <X className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-black text-rose-900">Order Successfully Cancelled</h4>
                <p className="text-xs text-rose-700 font-medium mt-1 max-w-sm mx-auto">
                  Your payment of <strong>₹{activeOrder.totalAmount}</strong> has been refunded 100% to your original payment mode.
                </p>
              </div>
              <div className="bg-white/80 backdrop-blur-md p-3.5 rounded-2xl border border-rose-100 text-xs text-gray-700 text-left space-y-1 shadow-2xs">
                <p><strong>Refund Reference:</strong> REF-{Math.floor(100000 + Math.random() * 900000)}</p>
                <p><strong>Refund Status:</strong> <span className="text-emerald-600 font-black">100% Settled</span></p>
              </div>
            </div>
          )}

          {/* 🗺️ MULTI-RESTAURANT VISUAL ROUTE MAP (Slide 24 Wireframe) */}
          {!isCancelled && (
            <div className="bg-slate-900/95 backdrop-blur-2xl rounded-[28px] p-5 text-white shadow-xl border border-slate-700 relative overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Navigation className="w-4 h-4 text-emerald-400 animate-pulse" />
                  <span className="text-xs font-bold text-gray-300">Live Delivery Fleet Tracker</span>
                </div>
                <span className="text-xs font-mono font-black bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full border border-emerald-500/30">
                  ETA: ~{activeOrder.estimatedDeliveryMin} Mins
                </span>
              </div>

              {/* Visualized Map Graph / Route */}
              <div className="bg-slate-800/80 rounded-2xl p-4 border border-slate-700 space-y-4">
                <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-linear-to-b before:from-orange-500 before:via-emerald-400 before:to-blue-400">
                  
                  {/* Restaurant Pickup Stops */}
                  {activeOrder.restaurantNames.map((restName, idx) => (
                    <div key={idx} className="relative">
                      <div className="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-[#FC8019] text-white flex items-center justify-center text-[10px] font-bold shadow-md">
                        {idx + 1}
                      </div>
                      <div>
                        <span className="text-xs font-bold text-white block">
                          Stop {idx + 1}: {restName}
                        </span>
                        <span className="text-[11px] text-gray-400">
                          {isGraceActive ? 'Order received • Preparing' : 'Food picked up by rider'}
                        </span>
                      </div>
                    </div>
                  ))}

                  {/* Customer Drop-off Stop */}
                  <div className="relative">
                    <div className="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-bold shadow-md">
                      📍
                    </div>
                    <div>
                      <span className="text-xs font-bold text-white block">
                        Final Drop: {activeOrder.deliveryAddress}
                      </span>
                      <span className="text-[11px] text-emerald-400">
                        {isGraceActive ? 'Awaiting pickup sequence' : 'Rider on quickest multi-stop route'}
                      </span>
                    </div>
                  </div>

                </div>
              </div>

              {/* Delivery Partner Details */}
              <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-2xl bg-orange-500/20 text-orange-400 flex items-center justify-center font-bold text-sm border border-orange-500/30">
                    {activeOrder.riderName.charAt(0)}
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-white">{activeOrder.riderName}</h5>
                    <p className="text-[11px] text-gray-400">
                      ★ {activeOrder.riderRating} • Swiggy Fleet Partner
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <a
                    href={`tel:${activeOrder.riderPhone}`}
                    className="p-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-emerald-400 transition-colors border border-slate-700 cursor-pointer"
                    title="Call Rider"
                  >
                    <Phone className="w-4 h-4" />
                  </a>
                  <button
                    onClick={() => {
                      setIsOrderTrackingOpen(false);
                      setIsSupportOpen(true);
                    }}
                    className="p-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-orange-400 transition-colors border border-slate-700 cursor-pointer"
                    title="Help Support"
                  >
                    <Headphones className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* Order Itemized Summary */}
          <div className="backdrop-blur-xl bg-white/60 rounded-3xl p-4 sm:p-5 border border-white/80 text-xs space-y-3 shadow-sm">
            <h4 className="font-black text-gray-900">Items Ordered ({activeOrder.items.length})</h4>
            <div className="divide-y divide-white/60">
              {activeOrder.items.map(item => (
                <div key={item.dish.id} className="py-2.5 flex justify-between items-center">
                  <div className="truncate max-w-[240px]">
                    <span className="font-bold text-gray-800 block truncate">
                      {item.quantity}x {item.dish.name}
                    </span>
                    <span className="text-[10px] text-gray-500 font-medium block">From: {item.dish.restaurantName}</span>
                  </div>
                  <span className="font-black text-gray-900">₹{item.dish.price * item.quantity}</span>
                </div>
              ))}
            </div>
            <div className="pt-3 border-t border-white/60 flex justify-between font-black text-sm text-gray-900">
              <span>Total Paid</span>
              <span className="text-[#FC8019] text-base">₹{activeOrder.totalAmount}</span>
            </div>
          </div>

          {/* Direct Support Shortcut Button */}
          <div className="flex items-center justify-between backdrop-blur-xl bg-emerald-500/15 p-4 rounded-3xl border border-emerald-400/40 text-xs text-emerald-950 shadow-2xs">
            <div>
              <span className="font-black block">Need help with this order?</span>
              <span className="text-emerald-800 text-[11px] font-medium">Direct 1-click connect to Human Support Agent</span>
            </div>
            <button
              onClick={() => {
                setIsOrderTrackingOpen(false);
                setIsSupportOpen(true);
              }}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-black px-4 py-2.5 rounded-2xl shadow-md shadow-emerald-600/20 shrink-0 active:scale-95 cursor-pointer"
            >
              Get Support
            </button>
          </div>

        </div>

      </div>

      {/* Cancellation Reason Modal */}
      {showCancelReasonModal && (
        <div className="fixed inset-0 z-60 bg-black/50 backdrop-blur-md flex items-center justify-center p-4">
          <div className="backdrop-blur-2xl bg-white/95 rounded-[32px] max-w-sm w-full p-6 shadow-2xl border border-white/80 animate-in zoom-in-95 duration-200">
            {!cancellationSuccess ? (
              <>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="text-xs font-black text-rose-600 uppercase tracking-wider">120s Grace Period</span>
                    <h3 className="text-base font-black text-gray-900">Cancel Order #{activeOrder.id}?</h3>
                  </div>
                  <button onClick={() => setShowCancelReasonModal(false)} className="text-gray-400 hover:text-gray-700 p-1 rounded-full hover:bg-white/60">✕</button>
                </div>

                <p className="text-xs text-gray-600 font-medium mb-3">
                  Please select a reason. <strong>100% of ₹{activeOrder.totalAmount}</strong> will be refunded immediately:
                </p>

                <div className="space-y-2 mb-5">
                  {[
                    'Placed order accidentally',
                    'Forgot to add another dish',
                    'Wrong delivery address selected',
                    'Ordered wrong items',
                    'Changed my mind'
                  ].map(reason => (
                    <button
                      key={reason}
                      onClick={() => setCancelReason(reason)}
                      className={`w-full p-3 rounded-2xl text-xs font-semibold border text-left transition-all cursor-pointer ${
                        cancelReason === reason
                          ? 'border-rose-500 bg-rose-50/90 text-rose-700 font-black shadow-xs'
                          : 'border-white/80 bg-white/60 text-gray-700 hover:bg-white'
                      }`}
                    >
                      {reason}
                    </button>
                  ))}
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setShowCancelReasonModal(false)}
                    className="flex-1 py-2.5 rounded-2xl border border-white/80 bg-white/60 text-xs font-bold text-gray-700 hover:bg-white cursor-pointer"
                  >
                    Keep Order
                  </button>
                  <button
                    onClick={handleConfirmCancel}
                    className="flex-1 py-2.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-black shadow-md shadow-rose-600/20 transition-all active:scale-95 cursor-pointer"
                  >
                    Confirm Cancel
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center py-4 space-y-2">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="text-base font-black text-gray-900">Refund Processed Instantly!</h4>
                <p className="text-xs text-gray-500 font-medium">100% amount credited back to your account.</p>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
