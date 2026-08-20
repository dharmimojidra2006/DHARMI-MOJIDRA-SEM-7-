import React, { useState } from 'react';
import { DINEOUT_VENUES } from '../data/mockData';
import { DineoutVenue } from '../types';
import { Star, MapPin, Tag, Calendar, Users, Clock, CheckCircle, Sparkles } from 'lucide-react';

export const DineoutView: React.FC = () => {
  const [selectedVenue, setSelectedVenue] = useState<DineoutVenue | null>(null);
  const [selectedDate, setSelectedDate] = useState('Today');
  const [selectedSlot, setSelectedSlot] = useState('08:00 PM');
  const [guestCount, setGuestCount] = useState(2);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const handleBook = (venue: DineoutVenue) => {
    setSelectedVenue(venue);
    setSelectedSlot(venue.availableSlots[0] || '08:00 PM');
    setBookingConfirmed(false);
  };

  const handleConfirmBooking = () => {
    setBookingConfirmed(true);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Dineout Banner */}
      <div className="relative overflow-hidden rounded-[32px] bg-linear-to-r from-rose-600/95 via-pink-600/95 to-red-600/95 text-white p-6 sm:p-8 shadow-2xl shadow-rose-500/20 border border-white/30 backdrop-blur-2xl">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider mb-3 border border-white/30">
            <Sparkles className="w-3.5 h-3.5 text-white" />
            <span>Swiggy Dineout • Flat 15% - 30% Off Dining Bills</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
            Reserve Premium Tables & Save Big on Every Meal
          </h1>

          <p className="mt-2 text-sm sm:text-base text-rose-100 font-medium">
            Pre-book instant table reservations across top craft breweries, rooftop lounges, and fine dining hotspots with zero booking fee.
          </p>
        </div>
      </div>

      {/* Venues Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {DINEOUT_VENUES.map(venue => (
          <div
            key={venue.id}
            className="backdrop-blur-2xl bg-white/50 rounded-[32px] overflow-hidden border border-white/70 shadow-lg shadow-black/5 hover:bg-white/75 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
          >
            <div>
              <div className="relative h-48 overflow-hidden">
                <img
                  src={venue.image}
                  alt={venue.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/75 via-transparent to-transparent" />

                <div className="absolute bottom-3 left-3 bg-emerald-600/90 backdrop-blur-md text-white px-2.5 py-0.5 rounded-xl text-xs font-black flex items-center space-x-1 border border-white/30">
                  <Star className="w-3.5 h-3.5 fill-white" />
                  <span>{venue.rating} ({venue.reviewsCount})</span>
                </div>

                <div className="absolute top-3 right-3 bg-rose-500/90 backdrop-blur-md text-white text-[11px] font-black px-3 py-1 rounded-full shadow-md border border-white/30">
                  {venue.offer}
                </div>
              </div>

              <div className="p-5">
                <h3 className="text-lg font-black text-gray-900 group-hover:text-rose-600 transition-colors">
                  {venue.name}
                </h3>
                <p className="text-xs text-gray-500 font-medium mt-0.5">{venue.cuisine.join(', ')} • ₹{venue.priceForTwo} for 2</p>

                <div className="flex items-center space-x-1.5 text-xs text-gray-600 mt-2 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                  <span className="truncate">{venue.location}</span>
                </div>

                <div className="flex flex-wrap gap-1.5 mt-3">
                  {venue.features.map(f => (
                    <span key={f} className="bg-white/80 backdrop-blur-xs text-gray-600 text-[10px] font-bold px-2.5 py-0.5 rounded-lg border border-white/60">
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-5 pt-0">
              <button
                onClick={() => handleBook(venue)}
                className="w-full py-2.5 bg-rose-500 hover:bg-rose-600 text-white text-xs font-black rounded-2xl transition-all shadow-md shadow-rose-500/20 flex items-center justify-center space-x-1 cursor-pointer active:scale-95"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book Table (Free)</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Booking Modal */}
      {selectedVenue && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-md flex items-center justify-center p-4">
          <div className="backdrop-blur-2xl bg-white/90 rounded-[32px] max-w-md w-full p-6 shadow-2xl border border-white/70 animate-in zoom-in-95 duration-200">
            {!bookingConfirmed ? (
              <>
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs font-black text-rose-600 uppercase tracking-wider">Table Reservation</span>
                    <h3 className="text-xl font-black text-gray-900">{selectedVenue.name}</h3>
                    <p className="text-xs text-gray-500 font-medium">{selectedVenue.location}</p>
                  </div>
                  <button onClick={() => setSelectedVenue(null)} className="text-gray-400 hover:text-gray-700 p-1.5 rounded-full hover:bg-white/60">✕</button>
                </div>

                <div className="mt-5 space-y-4">
                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1.5">Select Date</label>
                    <div className="grid grid-cols-3 gap-2">
                      {['Today', 'Tomorrow', 'This Weekend'].map(d => (
                        <button
                          key={d}
                          onClick={() => setSelectedDate(d)}
                          className={`py-2 rounded-2xl text-xs font-bold border transition-all cursor-pointer ${
                            selectedDate === d ? 'bg-rose-50/90 border-rose-500 text-rose-600 shadow-xs' : 'border-white/60 bg-white/40 text-gray-700 hover:bg-white/70'
                          }`}
                        >
                          {d}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1.5">Number of Guests</label>
                    <div className="flex items-center space-x-2">
                      {[1, 2, 3, 4, 6, 8].map(count => (
                        <button
                          key={count}
                          onClick={() => setGuestCount(count)}
                          className={`w-9 h-9 rounded-xl text-xs font-black border flex items-center justify-center cursor-pointer transition-all ${
                            guestCount === count ? 'bg-rose-500 border-rose-500 text-white shadow-md' : 'border-white/60 bg-white/40 text-gray-700 hover:bg-white/70'
                          }`}
                        >
                          {count}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1.5">Select Time Slot</label>
                    <div className="grid grid-cols-3 gap-2">
                      {selectedVenue.availableSlots.map(slot => (
                        <button
                          key={slot}
                          onClick={() => setSelectedSlot(slot)}
                          className={`py-2 rounded-2xl text-xs font-bold border transition-all cursor-pointer ${
                            selectedSlot === slot ? 'bg-rose-50/90 border-rose-500 text-rose-600 shadow-xs' : 'border-white/60 bg-white/40 text-gray-700 hover:bg-white/70'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="bg-rose-50/80 backdrop-blur-xs border border-rose-200/60 rounded-2xl p-3 text-xs text-rose-800 font-bold flex items-center space-x-2">
                    <Tag className="w-4 h-4 shrink-0 text-rose-600" />
                    <span>Included: {selectedVenue.offer}</span>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between pt-4 border-t border-white/60">
                  <div className="text-xs text-gray-500 font-medium">
                    <span className="font-extrabold text-gray-900">Zero Booking Charge</span>
                  </div>
                  <button
                    onClick={handleConfirmBooking}
                    className="bg-rose-500 hover:bg-rose-600 text-white font-extrabold px-6 py-2.5 rounded-2xl text-sm transition-all shadow-lg shadow-rose-500/20 active:scale-95 cursor-pointer"
                  >
                    Confirm Table
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center py-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-md">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-black text-gray-900">Table Reserved Successfully!</h3>
                <p className="text-xs text-gray-500 font-medium mt-1 max-w-xs mx-auto">
                  Your reservation at <strong>{selectedVenue.name}</strong> for {guestCount} guests at {selectedSlot} is confirmed.
                </p>
                <div className="mt-4 bg-white/70 backdrop-blur-md p-3.5 rounded-2xl text-xs text-gray-700 text-left space-y-1 border border-white/60 shadow-2xs">
                  <p><strong>Booking ID:</strong> SWG-DIN-{Math.floor(10000 + Math.random() * 90000)}</p>
                  <p><strong>Discount Voucher:</strong> 25% OFF with Swiggy Pay</p>
                </div>
                <button
                  onClick={() => setSelectedVenue(null)}
                  className="mt-6 w-full py-3 bg-gray-900 hover:bg-black text-white text-xs font-black rounded-2xl transition-all shadow-md active:scale-95 cursor-pointer"
                >
                  Close & Explore More
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
