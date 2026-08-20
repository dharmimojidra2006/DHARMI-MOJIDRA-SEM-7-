import React, { useState, useEffect, useRef } from 'react';
import { useCart } from '../context/CartContext';
import { 
  X, 
  Headphones, 
  Send, 
  Bot, 
  UserCheck, 
  PhoneCall, 
  Clock, 
  ShieldCheck, 
  RotateCcw, 
  AlertTriangle, 
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { SupportChatMessage } from '../types';

export const SupportModal: React.FC = () => {
  const { isSupportOpen, setIsSupportOpen, activeOrder, cancelOrder } = useCart();
  const [messages, setMessages] = useState<SupportChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'system',
      senderName: 'Swiggy Priority Support',
      text: 'Welcome to Swiggy Direct Support. How can we assist you today?',
      timestamp: 'Just now',
      options: [
        '⚡ Connect to Human Agent Directly',
        '🔄 Cancel my recent order',
        '🚴 Where is my delivery rider?',
        '💰 Refund status check',
        '📍 Change delivery address'
      ]
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isHumanConnected, setIsHumanConnected] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  if (!isSupportOpen) return null;

  const handleConnectHuman = () => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setIsHumanConnected(true);
      setMessages(prev => [
        ...prev,
        {
          id: `msg-${Date.now()}`,
          sender: 'system',
          senderName: 'Priority Routing',
          text: '✅ Transferred to Priority Human Support Desk in 2 seconds. Agent Priya Sharma has joined the chat.',
          timestamp: 'Just now',
          isHumanAgent: true,
        },
        {
          id: `msg-${Date.now() + 1}`,
          sender: 'agent',
          senderName: 'Priya Sharma (Senior Support Lead)',
          text: 'Hi there! I am Priya from Swiggy Support. I am reviewing your active order right away. How can I resolve your issue today?',
          timestamp: 'Just now',
          isHumanAgent: true,
          options: [
            'Please expedite rider pickup',
            'I need an immediate refund',
            'Update delivery instructions'
          ]
        }
      ]);
    }, 1200);
  };

  const handleOptionClick = (option: string) => {
    // User sends message
    const userMsg: SupportChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      senderName: 'You',
      text: option,
      timestamp: 'Just now'
    };

    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    if (option.includes('Human Agent') || option.includes('⚡')) {
      handleConnectHuman();
      return;
    }

    if (option.includes('Cancel my recent order')) {
      setTimeout(() => {
        setIsTyping(false);
        if (activeOrder) {
          if (activeOrder.cancellationGraceRemainingSec > 0) {
            cancelOrder(activeOrder.id, 'User requested via support');
            setMessages(prev => [
              ...prev,
              {
                id: `msg-${Date.now()}`,
                sender: 'agent',
                senderName: isHumanConnected ? 'Priya Sharma' : 'Swiggy Care',
                text: `✅ Order #${activeOrder.id} has been cancelled within the 120s grace window. 100% refund of ₹${activeOrder.totalAmount} has been initiated instantly to your original payment mode!`,
                timestamp: 'Just now',
                isHumanAgent: isHumanConnected
              }
            ]);
          } else {
            setMessages(prev => [
              ...prev,
              {
                id: `msg-${Date.now()}`,
                sender: 'agent',
                senderName: isHumanConnected ? 'Priya Sharma' : 'Swiggy Care',
                text: `Your order #${activeOrder.id} is currently with the restaurant. As per policy, cancellation requires restaurant confirmation. I have placed a high priority cancellation request with our merchant team for you.`,
                timestamp: 'Just now',
                isHumanAgent: isHumanConnected
              }
            ]);
          }
        } else {
          setMessages(prev => [
            ...prev,
            {
              id: `msg-${Date.now()}`,
              sender: 'agent',
              senderName: isHumanConnected ? 'Priya Sharma' : 'Swiggy Care',
              text: 'You do not have any active orders currently. Would you like to check past orders or account balance?',
              timestamp: 'Just now',
              isHumanAgent: isHumanConnected
            }
          ]);
        }
      }, 1000);
      return;
    }

    // Default response
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [
        ...prev,
        {
          id: `msg-${Date.now()}`,
          sender: isHumanConnected ? 'agent' : 'bot',
          senderName: isHumanConnected ? 'Priya Sharma' : 'Swiggy Care',
          text: `Thank you for sharing. I've noted down: "${option}". Our system has synchronized this with your delivery rider and restaurant partner.`,
          timestamp: 'Just now',
          isHumanAgent: isHumanConnected
        }
      ]);
    }, 1000);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userText = inputText;
    setInputText('');

    setMessages(prev => [
      ...prev,
      {
        id: `msg-${Date.now()}`,
        sender: 'user',
        senderName: 'You',
        text: userText,
        timestamp: 'Just now'
      }
    ]);

    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [
        ...prev,
        {
          id: `msg-${Date.now()}`,
          sender: isHumanConnected ? 'agent' : 'agent',
          senderName: isHumanConnected ? 'Priya Sharma' : 'Swiggy Support',
          text: `Got it! I am directly taking care of this for you. Your request regarding "${userText}" is being resolved immediately.`,
          timestamp: 'Just now',
          isHumanAgent: true,
        }
      ]);
    }, 1100);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
      <div className="backdrop-blur-2xl bg-white/90 rounded-[32px] max-w-lg w-full h-[600px] max-h-[92vh] flex flex-col overflow-hidden shadow-2xl border border-white/70 animate-in zoom-in-95 duration-200">
        
        {/* Support Header */}
        <div className="p-4 sm:p-5 border-b border-white/20 flex items-center justify-between bg-emerald-950/90 text-white backdrop-blur-xl">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-2xl bg-emerald-700/80 flex items-center justify-center font-bold shadow-inner border border-emerald-500/30">
                {isHumanConnected ? <UserCheck className="w-5 h-5 text-emerald-300" /> : <Headphones className="w-5 h-5 text-white" />}
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 border-2 border-emerald-900 rounded-full"></span>
            </div>

            <div>
              <div className="flex items-center space-x-1.5">
                <h3 className="text-sm font-black text-white">
                  {isHumanConnected ? 'Priya Sharma (Human Lead)' : 'Swiggy Direct Support'}
                </h3>
                <span className="bg-emerald-800/90 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-700/50">
                  {isHumanConnected ? 'Human Agent' : 'Instant Desk'}
                </span>
              </div>
              <p className="text-[11px] text-emerald-200 font-medium">
                {isHumanConnected ? 'Direct Human Connected • Avg reply < 5s' : 'Zero chatbot loops • 1-Tap Agent transfer'}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {!isHumanConnected && (
              <button
                onClick={handleConnectHuman}
                className="bg-white text-emerald-950 hover:bg-emerald-50 text-xs font-black px-3.5 py-2 rounded-2xl shadow-md flex items-center space-x-1 transition-all active:scale-95 cursor-pointer"
                title="Connect to a real human support agent"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Human Agent</span>
              </button>
            )}
            <button
              onClick={() => setIsSupportOpen(false)}
              className="text-emerald-200 hover:text-white p-1.5 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Chat Message Stream */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white/40 backdrop-blur-md text-xs">
          {messages.map(msg => {
            const isMe = msg.sender === 'user';
            const isSys = msg.sender === 'system';

            if (isSys) {
              return (
                <div key={msg.id} className="text-center my-2">
                  <div className="inline-block backdrop-blur-md bg-gray-200/80 text-gray-800 font-bold px-3.5 py-1.5 rounded-full text-[11px] border border-white/60 shadow-2xs">
                    {msg.text}
                  </div>
                  {msg.options && (
                    <div className="flex flex-wrap gap-1.5 justify-center mt-3">
                      {msg.options.map(opt => (
                        <button
                          key={opt}
                          onClick={() => handleOptionClick(opt)}
                          className="bg-white/90 hover:bg-emerald-50 border border-white/80 hover:border-emerald-500 text-gray-800 hover:text-emerald-800 font-bold px-3.5 py-2 rounded-2xl text-xs transition-all shadow-xs backdrop-blur-md active:scale-95 cursor-pointer"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
              >
                <span className="text-[10px] text-gray-400 font-bold mb-1 px-1">{msg.senderName}</span>
                <div
                  className={`max-w-[85%] rounded-3xl p-3.5 leading-relaxed backdrop-blur-md ${
                    isMe
                      ? 'bg-[#FC8019] text-white rounded-br-xs shadow-md shadow-orange-500/20 font-medium'
                      : msg.isHumanAgent
                      ? 'bg-emerald-50/90 text-emerald-950 border border-emerald-200 rounded-bl-xs shadow-xs font-medium'
                      : 'bg-white/80 text-gray-800 border border-white/80 rounded-bl-xs shadow-xs font-medium'
                  }`}
                >
                  {msg.text}
                </div>

                {/* Sub-options if available */}
                {msg.options && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {msg.options.map(opt => (
                      <button
                        key={opt}
                        onClick={() => handleOptionClick(opt)}
                        className="bg-white/80 hover:bg-emerald-50 border border-emerald-300/70 text-emerald-900 text-[11px] font-bold px-3 py-1.5 rounded-xl transition-all shadow-2xs backdrop-blur-xs cursor-pointer"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          {isTyping && (
            <div className="flex items-center space-x-2 text-gray-500 text-xs py-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce"></span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce delay-100"></span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce delay-200"></span>
              <span className="text-[11px] font-bold">Support Agent is typing...</span>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Input Bar */}
        <form
          onSubmit={handleSendMessage}
          className="p-3 border-t border-white/60 bg-white/70 backdrop-blur-md flex items-center space-x-2"
        >
          <input
            type="text"
            placeholder="Type your message or issue..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-1 px-4 py-2.5 bg-white/80 rounded-2xl border border-white/80 focus:border-emerald-600 outline-hidden text-xs text-gray-900 shadow-2xs"
          />
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="bg-emerald-700 hover:bg-emerald-800 disabled:opacity-40 text-white p-3 rounded-2xl transition-all shrink-0 shadow-lg shadow-emerald-700/25 active:scale-95 cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
};
