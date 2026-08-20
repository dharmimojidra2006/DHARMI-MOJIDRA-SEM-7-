import React, { useState } from 'react';
import { SCENES_EVENTS } from '../data/mockData';
import { SceneEvent } from '../types';
import { Sparkles, Calendar, MapPin, Ticket, CheckCircle, Users } from 'lucide-react';

export const ScenesView: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<SceneEvent | null>(null);
  const [ticketBooked, setTicketBooked] = useState(false);

  const handleBookTicket = (event: SceneEvent) => {
    setSelectedEvent(event);
    setTicketBooked(false);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Scenes Header */}
      <div className="relative overflow-hidden rounded-[32px] bg-linear-to-r from-purple-700/95 via-indigo-700/95 to-fuchsia-700/95 text-white p-6 sm:p-8 shadow-2xl shadow-purple-500/20 border border-white/30 backdrop-blur-2xl">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider mb-3 border border-white/30">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            <span>Swiggy Scenes • Food Festivals & Masterclasses</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
            Discover Bengaluru's Best Food & Culinary Experiences
          </h1>

          <p className="mt-2 text-sm sm:text-base text-purple-100 font-medium">
            From regional Biryani Carnivals to artisanal sourdough workshops and speakeasy mixology sessions — curated exclusively for food lovers.
          </p>
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SCENES_EVENTS.map(event => (
          <div
            key={event.id}
            className="backdrop-blur-2xl bg-white/50 rounded-[32px] overflow-hidden border border-white/70 shadow-lg shadow-black/5 hover:bg-white/75 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
          >
            <div>
              <div className="relative h-52 overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

                <span className="absolute top-3 left-3 bg-purple-600/90 backdrop-blur-md text-white text-[11px] font-black px-3 py-1 rounded-full shadow-md border border-white/30">
                  {event.category}
                </span>

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <div className="flex items-center space-x-2 text-xs text-purple-100 font-bold bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-xl w-fit border border-white/20">
                    <Calendar className="w-3.5 h-3.5 text-yellow-300" />
                    <span>{event.date} • {event.time}</span>
                  </div>
                </div>
              </div>

              <div className="p-5">
                <h3 className="text-lg font-black text-gray-900 group-hover:text-purple-600 transition-colors line-clamp-2">
                  {event.title}
                </h3>
                <p className="text-xs text-gray-500 font-medium mt-1 line-clamp-2 leading-relaxed">
                  {event.description}
                </p>

                <div className="mt-3 flex items-center space-x-1.5 text-xs text-gray-600 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-purple-500 shrink-0" />
                  <span className="truncate">{event.location}</span>
                </div>

                <div className="mt-3 flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-white/60">
                  <span>Host: <strong className="text-gray-800">{event.host}</strong></span>
                  <span className="text-purple-600 font-black">{event.spotsLeft} passes left</span>
                </div>
              </div>
            </div>

            <div className="p-5 pt-0 flex items-center justify-between">
              <div>
                <span className="text-xs text-gray-400 block font-medium">Pass Price</span>
                <span className="text-base font-black text-gray-900">₹{event.price}</span>
              </div>
              <button
                onClick={() => handleBookTicket(event)}
                className="bg-purple-600 hover:bg-purple-700 text-white text-xs font-black px-4 py-2.5 rounded-2xl transition-all shadow-md shadow-purple-500/20 flex items-center space-x-1.5 cursor-pointer active:scale-95"
              >
                <Ticket className="w-3.5 h-3.5" />
                <span>Book Pass</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Ticket Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-md flex items-center justify-center p-4">
          <div className="backdrop-blur-2xl bg-white/90 rounded-[32px] max-w-md w-full p-6 shadow-2xl border border-white/70 animate-in zoom-in-95 duration-200">
            {!ticketBooked ? (
              <>
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs font-black text-purple-600 uppercase tracking-wider">Event Pass</span>
                    <h3 className="text-lg font-black text-gray-900">{selectedEvent.title}</h3>
                  </div>
                  <button onClick={() => setSelectedEvent(null)} className="text-gray-400 hover:text-gray-700 p-1.5 rounded-full hover:bg-white/60">✕</button>
                </div>

                <div className="mt-4 space-y-3 bg-white/60 backdrop-blur-md p-4 rounded-2xl border border-white/80 text-xs text-gray-700 shadow-2xs">
                  <p><strong>📅 Date:</strong> {selectedEvent.date} ({selectedEvent.time})</p>
                  <p><strong>📍 Venue:</strong> {selectedEvent.location}</p>
                  <p><strong>👨‍🍳 Host:</strong> {selectedEvent.host}</p>
                  <p><strong>🎟️ Inclusions:</strong> Entry pass, tasting portions, beverage token & chef meet-and-greet.</p>
                </div>

                <div className="mt-6 flex items-center justify-between pt-4 border-t border-white/60">
                  <div>
                    <span className="text-xs text-gray-400 block font-medium">Total Amount</span>
                    <span className="text-xl font-black text-gray-900">₹{selectedEvent.price}</span>
                  </div>
                  <button
                    onClick={() => setTicketBooked(true)}
                    className="bg-purple-600 hover:bg-purple-700 text-white font-extrabold px-6 py-2.5 rounded-2xl text-sm transition-all shadow-lg shadow-purple-500/20 active:scale-95 cursor-pointer"
                  >
                    Confirm & Pay
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center py-4">
                <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-md">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-black text-gray-900">Pass Booked Successfully!</h3>
                <p className="text-xs text-gray-500 font-medium mt-1 max-w-xs mx-auto">
                  Your entry pass for <strong>{selectedEvent.title}</strong> has been sent to your email.
                </p>
                <div className="mt-4 bg-white/70 backdrop-blur-md p-3.5 rounded-2xl text-xs text-gray-700 text-left border border-white/60 shadow-2xs">
                  <p><strong>Pass ID:</strong> SCN-TKT-{Math.floor(10000 + Math.random() * 90000)}</p>
                  <p><strong>Entry QR:</strong> Show this at registration desk</p>
                </div>
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="mt-6 w-full py-3 bg-gray-900 hover:bg-black text-white text-xs font-black rounded-2xl transition-all shadow-md active:scale-95 cursor-pointer"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
