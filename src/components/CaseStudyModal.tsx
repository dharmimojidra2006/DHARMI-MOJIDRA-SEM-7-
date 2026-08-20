import React, { useState } from 'react';
import { CASE_STUDY_HIGHLIGHTS } from '../data/mockData';
import { 
  BookOpen, 
  Layers, 
  Clock, 
  Headphones, 
  LayoutGrid, 
  CheckCircle, 
  ChevronRight, 
  BarChart3, 
  UserCheck, 
  Sparkles,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { useCart } from '../context/CartContext';

export const CaseStudyView: React.FC = () => {
  const { setActiveService, setIsCartOpen } = useCart();
  const [activeTab, setActiveTab] = useState<'overview' | 'problems' | 'interviews' | 'heuristics' | 'architecture'>('overview');

  return (
    <div className="space-y-8 pb-16">
      
      {/* Header Banner */}
      <div className="bg-linear-to-r from-emerald-800/95 via-teal-800/95 to-cyan-900/95 text-white rounded-[32px] p-6 sm:p-8 shadow-2xl shadow-teal-900/15 border border-white/20 backdrop-blur-2xl">
        <div className="max-w-3xl">
          <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider mb-3 border border-white/30">
            <BookOpen className="w-3.5 h-3.5 text-emerald-300" />
            <span>UX Case Study & Redesign Specification</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
            Swiggy UX Research & Feature Evolution
          </h1>
          <p className="mt-2 text-sm sm:text-base text-emerald-100 font-medium">
            Designed by <strong>{CASE_STUDY_HIGHLIGHTS.authors}</strong> — Tackling single-restaurant cart bottlenecks, hidden cancellation policies, and AI chatbot loops.
          </p>
          
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button
              onClick={() => { setActiveService('food'); setIsCartOpen(true); }}
              className="bg-[#FC8019] hover:bg-[#e67314] text-white text-xs sm:text-sm font-black px-5 py-3 rounded-2xl shadow-lg shadow-orange-500/20 transition-all flex items-center space-x-2 active:scale-95 cursor-pointer"
            >
              <span>Test Multi-Restaurant Cart</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <span className="text-xs text-emerald-200 bg-black/30 px-3.5 py-2.5 rounded-2xl backdrop-blur-md border border-white/20 font-bold">
              Based on 32 In-Depth User Interviews & Usability Studies
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Sub-tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1 border-b border-white/60">
        {[
          { id: 'overview', label: '1. Executive Summary' },
          { id: 'problems', label: '2. Four Core Problems' },
          { id: 'interviews', label: '3. Survey & Data (32 Users)' },
          { id: 'heuristics', label: '4. Heuristic Solutions' },
          { id: 'architecture', label: '5. Information Architecture' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2.5 text-xs sm:text-sm font-black whitespace-nowrap transition-all border-b-2 cursor-pointer ${
              activeTab === tab.id
                ? 'border-[#FC8019] text-[#FC8019]'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab 1: Executive Summary */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {CASE_STUDY_HIGHLIGHTS.stats.map((stat, idx) => (
              <div key={idx} className="backdrop-blur-2xl bg-white/60 p-5 rounded-3xl border border-white/80 shadow-lg shadow-black/5 text-center">
                <div className="text-2xl sm:text-3xl font-black text-[#FC8019]">{stat.value}</div>
                <div className="text-xs text-gray-600 font-bold mt-1">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="backdrop-blur-2xl bg-white/60 rounded-[32px] p-6 sm:p-8 border border-white/80 shadow-lg shadow-black/5 space-y-4">
            <h3 className="text-xl font-black text-gray-900">Background & Magic Formula</h3>
            <p className="text-sm text-gray-600 font-medium leading-relaxed">
              Swiggy was founded in 2014 by Sriharsha Majety, Nandan Reddy, and Rahul Jaimini. Prior to Swiggy, Harsha and Nandan ran Bundl (a logistics company), which gave them key insights into Indian hyper-local delivery logistics. While competitors only connected customers to restaurants as marketplaces, Swiggy hired its own delivery fleet — managing the entire end-to-end experience.
            </p>
            <p className="text-sm text-gray-600 font-medium leading-relaxed">
              As Swiggy expanded into Instamart, Dineout, and Scenes, user interviews revealed key friction points: inability to order from 2 restaurants simultaneously, anxiety during accidental orders with no immediate grace cancellation, and frustration with repetitive chatbot loops.
            </p>
          </div>
        </div>
      )}

      {/* Tab 2: Four Core Problems */}
      {activeTab === 'problems' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CASE_STUDY_HIGHLIGHTS.problemsIdentified.map((prob, idx) => (
            <div key={idx} className="backdrop-blur-2xl bg-white/60 rounded-[32px] p-6 border border-white/80 shadow-lg shadow-black/5 space-y-3">
              <div className="flex items-center space-x-2">
                <span className="w-7 h-7 rounded-full bg-orange-100/90 text-[#FC8019] text-xs font-black flex items-center justify-center border border-orange-200/50">
                  0{idx + 1}
                </span>
                <h4 className="text-base font-black text-gray-900">{prob.title}</h4>
              </div>
              <div className="text-xs text-rose-800 bg-rose-50/80 backdrop-blur-xs p-3.5 rounded-2xl border border-rose-100 font-medium">
                <strong>Problem & Impact:</strong> {prob.desc}
              </div>
              <div className="text-xs text-emerald-900 bg-emerald-50/80 backdrop-blur-xs p-3.5 rounded-2xl border border-emerald-100 font-medium">
                <strong>Redesign Solution:</strong> {prob.solution}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: Survey & User Interviews */}
      {activeTab === 'interviews' && (
        <div className="space-y-6">
          <div className="backdrop-blur-2xl bg-white/60 rounded-[32px] p-6 sm:p-8 border border-white/80 shadow-lg shadow-black/5">
            <h3 className="text-lg font-black text-gray-900 mb-4">Key Interview Findings (32 Participants, Ages 19 - 50)</h3>
            
            <div className="space-y-4">
              <div className="border border-white/80 rounded-2xl p-4 bg-white/70 backdrop-blur-md shadow-2xs">
                <h5 className="font-black text-sm text-gray-900">Q: Would you like the ability to order from multiple restaurants in one cart?</h5>
                <div className="mt-2 flex items-center space-x-3">
                  <div className="flex-1 bg-gray-200/70 rounded-full h-4 overflow-hidden">
                    <div className="bg-[#FC8019] h-full rounded-full" style={{ width: '93.8%' }}></div>
                  </div>
                  <span className="text-xs font-black text-[#FC8019]">93.8% YES</span>
                </div>
                <p className="text-xs text-gray-500 font-medium mt-2">"Especially during group orders when one person wants biryani and another wants dessert."</p>
              </div>

              <div className="border border-white/80 rounded-2xl p-4 bg-white/70 backdrop-blur-md shadow-2xs">
                <h5 className="font-black text-sm text-gray-900">Q: Would a 120-second cancellation timer help users?</h5>
                <div className="mt-2 flex items-center space-x-3">
                  <div className="flex-1 bg-gray-200/70 rounded-full h-4 overflow-hidden">
                    <div className="bg-emerald-600 h-full rounded-full" style={{ width: '88.5%' }}></div>
                  </div>
                  <span className="text-xs font-black text-emerald-700">88.5% YES</span>
                </div>
                <p className="text-xs text-gray-500 font-medium mt-2">"Gives users time to correct mistaken addresses or forgotten items without full monetary penalty."</p>
              </div>

              <div className="border border-white/80 rounded-2xl p-4 bg-white/70 backdrop-blur-md shadow-2xs">
                <h5 className="font-black text-sm text-gray-900">Q: What would improve your help & support experience?</h5>
                <div className="mt-2 flex items-center space-x-3">
                  <div className="flex-1 bg-gray-200/70 rounded-full h-4 overflow-hidden">
                    <div className="bg-blue-600 h-full rounded-full" style={{ width: '84.2%' }}></div>
                  </div>
                  <span className="text-xs font-black text-blue-700">84.2% Faster Human Support</span>
                </div>
                <p className="text-xs text-gray-500 font-medium mt-2">"Stop repeating automated bot answers when food is delayed or leaked. Connect to human in 1 tap."</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Heuristic Solutions */}
      {activeTab === 'heuristics' && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="backdrop-blur-2xl bg-white/60 p-6 rounded-[32px] border border-white/80 shadow-lg shadow-black/5 space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-orange-100/90 text-[#FC8019] flex items-center justify-center font-bold border border-orange-200/50">
              <Clock className="w-5 h-5" />
            </div>
            <h4 className="text-base font-black text-gray-900">1. Visibility of System Status</h4>
            <p className="text-xs text-gray-600 font-medium">
              Added a prominent 120-second countdown cancellation grace timer with live percentage ring and 100% instant refund assurance.
            </p>
          </div>

          <div className="backdrop-blur-2xl bg-white/60 p-6 rounded-[32px] border border-white/80 shadow-lg shadow-black/5 space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100/90 text-emerald-600 flex items-center justify-center font-bold border border-emerald-200/50">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="text-base font-black text-gray-900">2. Error Prevention</h4>
            <p className="text-xs text-gray-600 font-medium">
              Implemented a pre-checkout review confirmation modal displaying delivery address, itemized restaurants, and allergies to prevent accidental orders.
            </p>
          </div>

          <div className="backdrop-blur-2xl bg-white/60 p-6 rounded-[32px] border border-white/80 shadow-lg shadow-black/5 space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-100/90 text-blue-600 flex items-center justify-center font-bold border border-blue-200/50">
              <LayoutGrid className="w-5 h-5" />
            </div>
            <h4 className="text-base font-black text-gray-900">3. Aesthetic & Minimal UI</h4>
            <p className="text-xs text-gray-600 font-medium">
              Removed cluttered, overwhelming advertisement popups. Unified Food, Instamart, Dineout, and Scenes into a crisp, one-handed tab switcher.
            </p>
          </div>
        </div>
      )}

      {/* Tab 5: Information Architecture */}
      {activeTab === 'architecture' && (
        <div className="backdrop-blur-2xl bg-white/60 rounded-[32px] p-6 sm:p-8 border border-white/80 shadow-lg shadow-black/5 space-y-6">
          <h3 className="text-lg font-black text-gray-900">Redesigned Information Architecture</h3>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
            <div className="border border-orange-200/80 bg-white/70 backdrop-blur-md rounded-2xl p-4 space-y-2 shadow-2xs">
              <span className="font-black text-[#FC8019] block text-sm">🍔 Food Delivery</span>
              <ul className="list-disc pl-4 space-y-1 text-gray-700 font-medium">
                <li>Multi-Restaurant Cart</li>
                <li>Pure Veg Toggle</li>
                <li>Curated Combos</li>
                <li>120s Instant Cancel Window</li>
              </ul>
            </div>

            <div className="border border-blue-200/80 bg-white/70 backdrop-blur-md rounded-2xl p-4 space-y-2 shadow-2xs">
              <span className="font-black text-blue-600 block text-sm">⚡ Instamart</span>
              <ul className="list-disc pl-4 space-y-1 text-gray-700 font-medium">
                <li>10 Min Express Groceries</li>
                <li>Fresh Produce & Dairy</li>
                <li>Instant Add / Quick Stock</li>
                <li>Unified with Food Cart</li>
              </ul>
            </div>

            <div className="border border-rose-200/80 bg-white/70 backdrop-blur-md rounded-2xl p-4 space-y-2 shadow-2xs">
              <span className="font-black text-rose-600 block text-sm">🍽️ Dineout</span>
              <ul className="list-disc pl-4 space-y-1 text-gray-700 font-medium">
                <li>Table Booking with Slots</li>
                <li>Swiggy Pay Bill Discounts (20-30%)</li>
                <li>Guest Count Selector</li>
                <li>Zero Booking Fee</li>
              </ul>
            </div>

            <div className="border border-purple-200/80 bg-white/70 backdrop-blur-md rounded-2xl p-4 space-y-2 shadow-2xs">
              <span className="font-black text-purple-600 block text-sm">🎟️ Scenes</span>
              <ul className="list-disc pl-4 space-y-1 text-gray-700 font-medium">
                <li>Food Festivals & Carnivals</li>
                <li>Chef Masterclasses</li>
                <li>Instant Pass Booking</li>
                <li>Spot Tracker</li>
              </ul>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
