import React, { useState, useRef, useEffect } from 'react';
import {
  Bot,
  X,
  Send,
  Sparkles,
  User,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  Zap,
} from 'lucide-react';
import { CopilotMessage, NavSection } from '../types';

interface AICopilotDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (section: NavSection) => void;
}

export const AICopilotDrawer: React.FC<AICopilotDrawerProps> = ({
  isOpen,
  onClose,
  onNavigate,
}) => {
  const [messages, setMessages] = useState<CopilotMessage[]>([
    {
      id: 'm-1',
      sender: 'ai',
      text: 'Hello Alex! I am your **InsureX AI Copilot**. How can I empower your insurance lifecycle today? Ask me anything about policies, claims, coverage gaps, or renewals!',
      timestamp: 'Just now',
    },
  ]);
  const [inputPrompt, setInputPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    'I bought a new car.',
    'Which insurance should I choose?',
    'My phone was stolen.',
    "Explain deductible like I'm 10.",
    'Start a claim.',
    'Upload my hospital bill.',
    'Renew my policy.',
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const promptText = textToSend || inputPrompt.trim();
    if (!promptText || isLoading) return;

    const userMsg: CopilotMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: promptText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputPrompt('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/copilot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: promptText,
          contextData: { user: 'Alex Johnson', activePolicies: 8, coverageScore: 84 },
        }),
      });

      const data = await res.json();

      const aiMsg: CopilotMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: data.text || 'I am ready to help with your InsureX insurance needs.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      const errorMsg: CopilotMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: 'I apologize, I experienced a minor network interruption. However, InsureX AI recommends reviewing your active policies in your Digital Wallet!',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[450px] bg-white shadow-2xl border-l border-slate-200 flex flex-col animate-slideLeft">
      {/* Drawer Header */}
      <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-md shadow-inner">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-base tracking-tight">InsureX AI Copilot</h3>
              <span className="bg-emerald-400/20 text-emerald-200 border border-emerald-400/30 text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase">
                Active
              </span>
            </div>
            <p className="text-xs text-blue-100">Intelligent Conversational Insurance Companion</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-full hover:bg-white/20 text-white transition-all"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Quick Actions Shortcuts Bar */}
      <div className="bg-blue-50/70 border-b border-blue-100 p-2.5 flex items-center justify-between text-xs">
        <button
          onClick={() => {
            onClose();
            onNavigate('claims');
          }}
          className="text-blue-700 font-semibold hover:underline flex items-center gap-1"
        >
          <ShieldCheck className="w-3.5 h-3.5" /> File Claim
        </button>
        <button
          onClick={() => {
            onClose();
            onNavigate('explore');
          }}
          className="text-blue-700 font-semibold hover:underline flex items-center gap-1"
        >
          <Sparkles className="w-3.5 h-3.5" /> Explore Plans
        </button>
        <button
          onClick={() => {
            onClose();
            onNavigate('renewals');
          }}
          className="text-blue-700 font-semibold hover:underline flex items-center gap-1"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Renew Policy
        </button>
      </div>

      {/* Messages List Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                msg.sender === 'user'
                  ? 'bg-slate-900 text-white font-bold text-xs'
                  : 'bg-blue-600 text-white'
              }`}
            >
              {msg.sender === 'user' ? 'AJ' : <Bot className="w-4 h-4" />}
            </div>

            <div
              className={`max-w-[82%] rounded-2xl p-3.5 text-xs leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-blue-600 text-white shadow-xs rounded-tr-xs'
                  : 'bg-white border border-slate-200 text-slate-800 shadow-xs rounded-tl-xs'
              }`}
            >
              <div className="whitespace-pre-wrap font-sans">{msg.text}</div>
              <div
                className={`text-[10px] mt-1.5 ${
                  msg.sender === 'user' ? 'text-blue-200 text-right' : 'text-slate-400'
                }`}
              >
                {msg.timestamp}
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center">
              <Bot className="w-4 h-4 animate-spin" />
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-3 text-xs text-slate-500 shadow-xs flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
              InsureX AI is thinking & reasoning...
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Sample Prompts */}
      <div className="p-3 bg-white border-t border-slate-200">
        <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
          Suggested Prompts
        </div>
        <div className="flex gap-1.5 overflow-x-auto pb-2 scrollbar-none">
          {quickPrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(prompt)}
              className="bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 text-xs px-2.5 py-1.5 rounded-xl border border-slate-200 shrink-0 transition-all text-left"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Box */}
        <div className="flex items-center gap-2 mt-2">
          <input
            type="text"
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask InsureX Copilot about policies, claims, deductibles..."
            className="flex-1 bg-slate-100 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
          />
          <button
            onClick={() => handleSendMessage()}
            disabled={!inputPrompt.trim() || isLoading}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white p-2.5 rounded-xl transition-all shadow-md"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
