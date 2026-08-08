import React, { useState } from 'react';
import {
  Shield,
  X,
  CheckCircle2,
  AlertCircle,
  Calculator,
  Star,
  Users,
  FileText,
  Zap,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { Policy } from '../types';

interface PolicyDetailModalProps {
  policy: Policy | null;
  isOpen: boolean;
  onClose: () => void;
  onBuyPolicy: (policy: Policy) => void;
}

export const PolicyDetailModal: React.FC<PolicyDetailModalProps> = ({
  policy,
  isOpen,
  onClose,
  onBuyPolicy,
}) => {
  if (!isOpen || !policy) return null;

  const [selectedDeductible, setSelectedDeductible] = useState<number>(policy.deductible || 250);
  const [selectedSum, setSelectedSum] = useState<number>(policy.coverageAmount || 100000);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [isBuying, setIsBuying] = useState<boolean>(false);
  const [buySuccess, setBuySuccess] = useState<boolean>(false);

  // Dynamic Premium Calculation Formula based on Deductible & Sum Insured
  const calculatedMonthly = Math.round(
    (selectedSum / 2000) * (1 - selectedDeductible / 3000) + selectedAddons.length * 8
  );

  const toggleAddon = (addon: string) => {
    setSelectedAddons((prev) =>
      prev.includes(addon) ? prev.filter((a) => a !== addon) : [...prev, addon]
    );
  };

  const handleCheckout = () => {
    setIsBuying(true);
    setTimeout(() => {
      setIsBuying(false);
      setBuySuccess(true);
      setTimeout(() => {
        onBuyPolicy({
          ...policy,
          id: `pol-${Date.now()}`,
          policyNumber: `${policy.category.substring(0, 3).toUpperCase()}-2026-${Math.floor(10000 + Math.random() * 90000)}`,
          coverageAmount: selectedSum,
          monthlyPremium: calculatedMonthly,
          annualPremium: calculatedMonthly * 11,
          status: 'Active',
          startDate: new Date().toISOString().split('T')[0],
        });
        setBuySuccess(false);
        onClose();
      }, 1500);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-sm p-4 animate-fadeIn">
      <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white p-6 flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-blue-300 border border-white/20">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-blue-400/20 text-blue-200 text-[10px] font-bold px-2 py-0.5 rounded-full border border-blue-400/30 uppercase">
                  {policy.category} Insurance
                </span>
                {policy.aiRecommendationBadge && (
                  <span className="bg-emerald-400/20 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-400/30 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> {policy.aiRecommendationBadge}
                  </span>
                )}
              </div>
              <h2 className="text-xl font-bold tracking-tight text-white mt-1">{policy.name}</h2>
              <p className="text-xs text-blue-200 font-medium">{policy.provider}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/20 text-white transition-all"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Key Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3 text-center">
              <div className="text-[10px] font-bold text-slate-400 uppercase">Settlement Ratio</div>
              <div className="text-base font-extrabold text-emerald-600">
                {policy.claimSettlementRatio}%
              </div>
            </div>
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3 text-center">
              <div className="text-[10px] font-bold text-slate-400 uppercase">Avg Settlement Time</div>
              <div className="text-base font-extrabold text-slate-900">3.2 Hours</div>
            </div>
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3 text-center">
              <div className="text-[10px] font-bold text-slate-400 uppercase">Customer Rating</div>
              <div className="text-base font-extrabold text-amber-500 flex items-center justify-center gap-1">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" /> 4.9/5
              </div>
            </div>
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3 text-center">
              <div className="text-[10px] font-bold text-slate-400 uppercase">Cashless Outlets</div>
              <div className="text-base font-extrabold text-blue-600">12,000+</div>
            </div>
          </div>

          {/* Interactive Premium Calculator */}
          <div className="bg-gradient-to-br from-blue-50/60 to-emerald-50/40 border border-blue-200/80 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calculator className="w-5 h-5 text-blue-600" />
                <h3 className="font-bold text-sm text-slate-900">Interactive Premium Calculator</h3>
              </div>
              <div className="text-right">
                <div className="text-xl font-black text-blue-700">
                  ${calculatedMonthly}
                  <span className="text-xs font-normal text-slate-500">/mo</span>
                </div>
                <div className="text-[10px] text-slate-500 font-medium">
                  (${calculatedMonthly * 12}/year)
                </div>
              </div>
            </div>

            {/* Sum Insured Slider */}
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                <span>Coverage Sum Insured:</span>
                <span className="font-bold text-blue-600">${selectedSum.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min={10000}
                max={1500000}
                step={10000}
                value={selectedSum}
                onChange={(e) => setSelectedSum(Number(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
            </div>

            {/* Deductible Slider */}
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                <span>Choose Annual Deductible:</span>
                <span className="font-bold text-emerald-600">${selectedDeductible}</span>
              </div>
              <input
                type="range"
                min={0}
                max={1000}
                step={50}
                value={selectedDeductible}
                onChange={(e) => setSelectedDeductible(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
            </div>
          </div>

          {/* Key Benefits */}
          <div>
            <h3 className="font-bold text-sm text-slate-900 mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Key Policy Benefits & Features
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {policy.keyBenefits.map((benefit, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50 border border-slate-200/80 rounded-xl p-2.5 text-xs text-slate-700 flex items-start gap-2"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Exclusions */}
          <div>
            <h3 className="font-bold text-sm text-slate-900 mb-2 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-500" /> Standard Exclusions
            </h3>
            <div className="flex flex-wrap gap-2">
              {policy.exclusions.map((exclusion, idx) => (
                <span
                  key={idx}
                  className="bg-rose-50 text-rose-700 border border-rose-200 text-xs px-2.5 py-1 rounded-lg font-medium"
                >
                  • {exclusion}
                </span>
              ))}
            </div>
          </div>

          {/* Recommended Add-ons */}
          <div>
            <h3 className="font-bold text-sm text-slate-900 mb-2 flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-500" /> Recommended Add-on Riders
            </h3>
            <div className="space-y-2">
              {['Critical Illness Booster (+$8/mo)', 'Zero-Deductible Waiver (+$12/mo)', 'Worldwide Emergency Evacuation (+$6/mo)'].map(
                (addon, idx) => (
                  <label
                    key={idx}
                    className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 cursor-pointer transition-all text-xs text-slate-800"
                  >
                    <span>{addon}</span>
                    <input
                      type="checkbox"
                      checked={selectedAddons.includes(addon)}
                      onChange={() => toggleAddon(addon)}
                      className="w-4 h-4 text-blue-600 rounded cursor-pointer"
                    />
                  </label>
                )
              )}
            </div>
          </div>
        </div>

        {/* Modal Footer / Purchase Action */}
        <div className="bg-slate-50 border-t border-slate-200 p-4 flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-500">Total Premium Payable</div>
            <div className="text-lg font-black text-slate-900">
              ${calculatedMonthly}<span className="text-xs text-slate-500 font-normal"> / month</span>
            </div>
          </div>

          {buySuccess ? (
            <div className="bg-emerald-600 text-white font-bold text-xs px-6 py-3 rounded-xl flex items-center gap-2 animate-bounce">
              <CheckCircle2 className="w-4 h-4" /> Added to Digital Wallet!
            </div>
          ) : (
            <button
              onClick={handleCheckout}
              disabled={isBuying}
              className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs px-6 py-3 rounded-xl shadow-lg shadow-blue-600/25 transition-all flex items-center gap-2 uppercase tracking-wider"
            >
              {isBuying ? 'Issuing Policy Certificate...' : 'Buy Now with Instant AI Pass'}
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
