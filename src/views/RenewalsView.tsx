import React, { useState } from 'react';
import {
  RefreshCw,
  Clock,
  CheckCircle2,
  DollarSign,
  Sparkles,
  Zap,
  ShieldCheck,
  TrendingDown,
} from 'lucide-react';
import { Policy } from '../types';

interface RenewalsViewProps {
  policies: Policy[];
  onRenewPolicy: (policy: Policy) => void;
}

export const RenewalsView: React.FC<RenewalsViewProps> = ({ policies, onRenewPolicy }) => {
  const [renewedIds, setRenewedIds] = useState<string[]>([]);
  const [autoRenewMap, setAutoRenewMap] = useState<Record<string, boolean>>(
    policies.reduce((acc, p) => ({ ...acc, [p.id]: p.autoRenew }), {})
  );

  const handleOneClickRenew = (policy: Policy) => {
    setRenewedIds((prev) => [...prev, policy.id]);
    onRenewPolicy(policy);
  };

  const toggleAutoRenew = (id: string) => {
    setAutoRenewMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Header */}
      <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Upcoming Renewals & Savings</h1>
          <p className="text-xs text-slate-500">
            One-click seamless policy renewal with guaranteed No-Claim discount retention
          </p>
        </div>

        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl px-4 py-2 text-xs font-bold text-emerald-800 flex items-center gap-1.5">
          <TrendingDown className="w-4 h-4 text-emerald-600" /> Save up to 20% on Early Renewals
        </div>
      </div>

      {/* Renewals List */}
      <div className="space-y-4">
        {policies.map((policy) => {
          const isRenewed = renewedIds.includes(policy.id);
          const isAuto = autoRenewMap[policy.id];
          const discountedPremium = Math.round(policy.annualPremium * 0.85);

          return (
            <div
              key={policy.id}
              className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs space-y-4 hover:border-blue-300 transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="bg-blue-50 text-blue-700 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase border border-blue-200">
                      {policy.category}
                    </span>
                    <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-amber-300 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-amber-600" /> Expires {policy.expiryDate}
                    </span>
                  </div>
                  <h3 className="text-lg font-extrabold text-slate-900 mt-1">{policy.name}</h3>
                  <div className="text-xs text-slate-500 font-mono">Policy #{policy.policyNumber}</div>
                </div>

                <div className="text-left sm:text-right">
                  <div className="text-xs text-slate-400">Renewal Annual Premium</div>
                  <div className="flex items-center sm:justify-end gap-2">
                    <span className="text-sm line-through text-slate-400">${policy.annualPremium}</span>
                    <span className="text-xl font-black text-emerald-600">${discountedPremium}</span>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                    15% No-Claim Bonus Applied
                  </span>
                </div>
              </div>

              {/* AI Recommended Discount Offers */}
              <div className="bg-gradient-to-r from-blue-50 to-emerald-50 border border-blue-200 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-blue-600 shrink-0" />
                  <div>
                    <span className="font-bold text-slate-800">AI Discount Stack: </span>
                    <span className="text-slate-600">
                      15% No-Claim Bonus + 5% Auto-Pay Discount unlocked for this cycle!
                    </span>
                  </div>
                </div>

                {/* Auto-renew Toggle */}
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs font-bold text-slate-700">Auto-Renew:</span>
                  <button
                    onClick={() => toggleAutoRenew(policy.id)}
                    className={`w-11 h-6 rounded-full p-0.5 transition-all ${
                      isAuto ? 'bg-emerald-600' : 'bg-slate-300'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
                        isAuto ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    ></div>
                  </button>
                </div>
              </div>

              {/* Action Button */}
              <div className="flex justify-end pt-2">
                {isRenewed ? (
                  <div className="bg-emerald-600 text-white font-bold text-xs px-6 py-3 rounded-xl flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" /> Renewed & Certificate Updated!
                  </div>
                ) : (
                  <button
                    onClick={() => handleOneClickRenew(policy)}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs px-6 py-3 rounded-xl shadow-lg shadow-blue-600/20 transition-all flex items-center gap-2 uppercase tracking-wider"
                  >
                    1-Click Renew Now (${discountedPremium}/yr) <RefreshCw className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
