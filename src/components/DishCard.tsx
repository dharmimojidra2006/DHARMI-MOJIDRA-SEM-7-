import React, { useState } from 'react';
import { Dish } from '../types';
import { useCart } from '../context/CartContext';
import { Star, Plus, Minus, Flame, Sparkles, Check } from 'lucide-react';

interface DishCardProps {
  dish: Dish;
  showRestaurantBadge?: boolean;
}

export const DishCard: React.FC<DishCardProps> = ({ dish, showRestaurantBadge = false }) => {
  const { cart, addToCart, updateQuantity } = useCart();
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [selectedSpice, setSelectedSpice] = useState('Medium');
  const [selectedSize, setSelectedSize] = useState('Regular');
  const [addedAnimation, setAddedAnimation] = useState(false);

  const cartItem = cart.find(item => item.dish.id === dish.id);
  const quantityInCart = cartItem ? cartItem.quantity : 0;

  const handleAdd = () => {
    if (dish.customizable) {
      setShowCustomModal(true);
    } else {
      addToCart(dish);
      triggerAddFeedback();
    }
  };

  const confirmCustomization = () => {
    addToCart(dish, {
      spiceLevel: selectedSpice,
      size: selectedSize,
    });
    setShowCustomModal(false);
    triggerAddFeedback();
  };

  const triggerAddFeedback = () => {
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 800);
  };

  return (
    <>
      <div className="backdrop-blur-2xl bg-white/50 rounded-3xl p-4 sm:p-5 border border-white/70 shadow-lg shadow-black/5 hover:bg-white/75 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
        <div>
          {/* Top meta tags */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-1.5">
              {/* Veg / Non Veg indicator badge */}
              <div
                className={`w-4 h-4 rounded-xs border flex items-center justify-center ${
                  dish.isVeg ? 'border-emerald-600' : 'border-rose-600'
                }`}
                title={dish.isVeg ? 'Pure Vegetarian' : 'Non-Vegetarian'}
              >
                <div
                  className={`w-2 h-2 rounded-full ${
                    dish.isVeg ? 'bg-emerald-600' : 'bg-rose-600'
                  }`}
                />
              </div>

              {dish.isBestseller && (
                <span className="bg-amber-100/90 backdrop-blur-xs text-amber-900 text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-amber-200/60 flex items-center space-x-0.5">
                  <Sparkles className="w-2.5 h-2.5 text-amber-600" />
                  <span>Bestseller</span>
                </span>
              )}

              {dish.isSpicy && (
                <span className="bg-rose-100/90 backdrop-blur-xs text-rose-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-rose-200/60 flex items-center space-x-0.5">
                  <Flame className="w-2.5 h-2.5 text-rose-600" />
                  <span>Spicy</span>
                </span>
              )}
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-1 bg-white/80 backdrop-blur-md px-2 py-0.5 rounded-xl text-emerald-700 font-extrabold text-xs border border-white/60 shadow-2xs">
              <Star className="w-3 h-3 fill-emerald-600 text-emerald-600" />
              <span>{dish.rating}</span>
            </div>
          </div>

          {/* Restaurant Source if required */}
          {showRestaurantBadge && (
            <div className="text-[11px] font-bold text-[#FC8019] mb-1">
              📍 {dish.restaurantName}
            </div>
          )}

          {/* Dish Title & Description */}
          <h4 className="font-extrabold text-gray-900 text-base group-hover:text-[#FC8019] transition-colors line-clamp-1">
            {dish.name}
          </h4>
          <p className="text-xs text-gray-500 font-medium mt-1 line-clamp-2 leading-relaxed">
            {dish.description}
          </p>
        </div>

        {/* Bottom pricing and image container */}
        <div className="mt-4 flex items-center justify-between gap-3 pt-3 border-t border-white/60">
          <div>
            <div className="flex items-baseline space-x-1.5">
              <span className="text-base font-black text-gray-900">₹{dish.price}</span>
              {dish.originalPrice && (
                <span className="text-xs text-gray-400 line-through font-medium">₹{dish.originalPrice}</span>
              )}
            </div>
            {dish.customizable && (
              <span className="text-[10px] text-[#FC8019] font-bold block mt-0.5">Customizable</span>
            )}
          </div>

          {/* Right Image + Add to Cart Button */}
          <div className="relative shrink-0">
            <img
              src={dish.image}
              alt={dish.name}
              className="w-20 h-20 object-cover rounded-2xl shadow-sm border border-white/60"
              loading="lazy"
            />

            {/* Add / Quantity Button */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 shadow-lg">
              {quantityInCart > 0 ? (
                <div className="flex items-center bg-white/95 backdrop-blur-md border border-[#FC8019] text-[#FC8019] rounded-xl px-2 py-0.5 font-black text-xs shadow-md">
                  <button
                    onClick={() => updateQuantity(dish.id, -1)}
                    className="p-1 hover:bg-orange-50 rounded-lg cursor-pointer"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="px-2 font-black">{quantityInCart}</span>
                  <button
                    onClick={() => updateQuantity(dish.id, 1)}
                    className="p-1 hover:bg-orange-50 rounded-lg cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleAdd}
                  className={`flex items-center space-x-1 bg-white/90 hover:bg-white backdrop-blur-md border border-white/90 text-[#FC8019] font-black text-xs px-3.5 py-1 rounded-xl transition-all shadow-md active:scale-95 cursor-pointer ${
                    addedAnimation ? 'bg-emerald-500 text-white border-emerald-500' : ''
                  }`}
                >
                  {addedAnimation ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-600" />
                      <span className="text-emerald-700">Added</span>
                    </>
                  ) : (
                    <>
                      <span>ADD</span>
                      <Plus className="w-3 h-3" />
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Customization Modal with Frosted Glass Styling */}
      {showCustomModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-md flex items-center justify-center p-4">
          <div className="backdrop-blur-2xl bg-white/90 rounded-[32px] max-w-sm w-full p-6 shadow-2xl border border-white/70 animate-in fade-in zoom-in duration-200">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs text-[#FC8019] font-black uppercase tracking-wider">Customize</span>
                <h3 className="text-base font-extrabold text-gray-900">{dish.name}</h3>
                <p className="text-xs text-gray-500 font-medium">₹{dish.price}</p>
              </div>
              <button
                onClick={() => setShowCustomModal(false)}
                className="text-gray-400 hover:text-gray-700 p-1.5 rounded-full hover:bg-white/60 transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-2">Select Size</label>
                <div className="grid grid-cols-2 gap-2">
                  {['Regular', 'Large (+₹40)'].map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`p-2.5 rounded-2xl text-xs font-bold border text-center transition-all cursor-pointer ${
                        selectedSize === size
                          ? 'border-[#FC8019] bg-orange-50/90 text-[#FC8019] shadow-xs'
                          : 'border-white/60 bg-white/40 text-gray-700 hover:bg-white/70'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-2">Spice Level</label>
                <div className="grid grid-cols-3 gap-2">
                  {['Mild', 'Medium', 'Extra Spicy 🔥'].map(spice => (
                    <button
                      key={spice}
                      onClick={() => setSelectedSpice(spice)}
                      className={`p-2.5 rounded-2xl text-xs font-bold border text-center transition-all cursor-pointer ${
                        selectedSpice === spice
                          ? 'border-[#FC8019] bg-orange-50/90 text-[#FC8019] shadow-xs'
                          : 'border-white/60 bg-white/40 text-gray-700 hover:bg-white/70'
                      }`}
                    >
                      {spice}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between pt-4 border-t border-white/60">
              <span className="font-black text-gray-900 text-lg">₹{selectedSize.includes('40') ? dish.price + 40 : dish.price}</span>
              <button
                onClick={confirmCustomization}
                className="bg-[#FC8019] hover:bg-[#e67314] text-white font-extrabold px-5 py-2.5 rounded-2xl text-xs sm:text-sm transition-all shadow-lg shadow-orange-500/20 active:scale-95 cursor-pointer"
              >
                Add Item to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
