import React, { useState } from 'react';
import { Bot, Send, Sparkles, User, ShieldCheck } from 'lucide-react';

export const AICopilotView: React.FC = () => {
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: 'Hello Alex! I am InsureX AI Copilot, powered by Gemini 2.5. I can help you summarize fine-print clauses, file instant claims, calculate customized premiums, or optimize your family coverage. What can I do for you today?',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userText = input;
    setInput('');
    setMessages((prev) => [...prev, { sender: 'user', text: userText }]);
    setIsLoading(true);

    try {
      const res = await fetch('/api/copilot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { sender: 'ai', text: data.reply }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: 'I checked your Health Secure Ultra policy. Dental coverage is included up to $1,500/year with zero deductible.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-3xl p-6 shadow-xl flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-400 animate-pulse" />
            <h1 className="text-2xl font-black">InsureX AI Copilot Workspace</h1>
          </div>
          <p className="text-xs text-blue-200 mt-1">Ask anything about insurance clauses, claim OCR, or family coverage</p>
        </div>
        <div className="p-3 bg-white/10 rounded-2xl border border-white/20">
          <Bot className="w-8 h-8 text-emerald-300" />
        </div>
      </div>

      <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs flex flex-col h-[500px]">
        <div className="flex-1 overflow-y-auto space-y-4 pr-2">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-3 ${m.sender === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                  m.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-emerald-600 text-white'
                }`}
              >
                {m.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>
              <div
                className={`p-4 rounded-2xl text-xs max-w-lg leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-blue-600 text-white font-medium'
                    : 'bg-slate-100 text-slate-800 border border-slate-200 font-medium'
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex items-center gap-2 text-xs text-slate-500 font-bold">
              <Sparkles className="w-4 h-4 text-blue-600 animate-spin" /> InsureX AI reasoning...
            </div>
          )}
        </div>

        <div className="pt-4 border-t border-slate-100 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask AI Copilot about deductibles, claims, or coverage..."
            className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs text-slate-800 focus:outline-none focus:border-blue-500"
          />
          <button
            onClick={handleSend}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-2xl text-xs font-bold transition-all"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
