import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { MapPin, X, Plus, Check } from 'lucide-react';

export const AddressModal: React.FC = () => {
  const { isAddressModalOpen, setIsAddressModalOpen, deliveryAddress, setDeliveryAddress } = useCart();
  const [customAddress, setCustomAddress] = useState('');

  if (!isAddressModalOpen) return null;

  const popularAddresses = [
    'Flat 402, Green Glen Heights, Bellandur, Bengaluru',
    '#24, 5th Cross, 6th Block, Koramangala, Bengaluru',
    'Villa 12, Palm Meadows, Whitefield, Bengaluru',
    '100 Feet Road, HAL 2nd Stage, Indiranagar, Bengaluru',
    'Building 7A, DLF Cyber City, Sector 25, Gurugram',
    'Hiranandani Gardens, Powai, Mumbai',
  ];

  const handleSelect = (addr: string) => {
    setDeliveryAddress(addr);
    setIsAddressModalOpen(false);
  };

  const handleAddCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (customAddress.trim()) {
      setDeliveryAddress(customAddress.trim());
      setIsAddressModalOpen(false);
      setCustomAddress('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-md flex items-center justify-center p-4">
      <div className="backdrop-blur-2xl bg-white/90 rounded-[32px] max-w-md w-full p-6 shadow-2xl border border-white/70 animate-in zoom-in-95 duration-200">
        <div className="flex items-start justify-between pb-3 border-b border-white/60">
          <div className="flex items-center space-x-2">
            <MapPin className="w-5 h-5 text-[#FC8019]" />
            <h3 className="text-base font-black text-gray-900">Select Delivery Location</h3>
          </div>
          <button
            onClick={() => setIsAddressModalOpen(false)}
            className="text-gray-400 hover:text-gray-700 p-1.5 rounded-full hover:bg-white/60 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-4 space-y-2">
          <label className="text-xs font-black text-gray-500 uppercase tracking-wider block">
            Saved & Popular Addresses
          </label>
          <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
            {popularAddresses.map((addr) => {
              const isSelected = deliveryAddress === addr;
              return (
                <button
                  key={addr}
                  onClick={() => handleSelect(addr)}
                  className={`w-full p-3 rounded-2xl border text-left text-xs flex items-center justify-between transition-all cursor-pointer ${
                    isSelected
                      ? 'border-[#FC8019] bg-orange-50/90 font-black text-[#FC8019] shadow-md'
                      : 'border-white/80 bg-white/60 text-gray-700 hover:bg-white font-medium'
                  }`}
                >
                  <span className="truncate pr-2">{addr}</span>
                  {isSelected && <Check className="w-4 h-4 text-[#FC8019] shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>

        <form onSubmit={handleAddCustom} className="mt-5 pt-4 border-t border-white/60">
          <label className="text-xs font-black text-gray-700 block mb-1.5">
            Or Enter Custom Address
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="e.g. Flat 104, Brigade Metropolis..."
              value={customAddress}
              onChange={(e) => setCustomAddress(e.target.value)}
              className="flex-1 px-3.5 py-2.5 bg-white/70 rounded-2xl border border-white/80 text-xs text-gray-900 focus:border-[#FC8019] outline-hidden shadow-2xs"
            />
            <button
              type="submit"
              disabled={!customAddress.trim()}
              className="bg-[#FC8019] hover:bg-[#e67314] disabled:opacity-40 text-white text-xs font-black px-4 py-2.5 rounded-2xl transition-all shadow-md shadow-orange-500/20 active:scale-95 cursor-pointer shrink-0"
            >
              Set
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
