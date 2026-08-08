import React from 'react';
import {
  Shield,
  Zap,
  CheckCircle2,
  AlertCircle,
  Clock,
  ArrowRight,
  TrendingUp,
  Users,
  Heart,
  Sparkles,
  RefreshCw,
  Plus,
  Compass,
  FileCheck2,
  DollarSign,
  ChevronRight,
  Car,
  HeartPulse,
  Home,
  AlertTriangle,
} from 'lucide-react';
import { Policy, Claim, NavSection, LifeStageEvent } from '../types';

interface DashboardViewProps {
  policies: Policy[];
  claims: Claim[];
  coverageScore: number;
  onNavigate: (section: NavSection) => void;
  onOpenSOS: () => void;
  onOpenClaimModal: () => void;
  onSelectPolicyDetail: (policy: Policy) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  policies,
  claims,
  coverageScore,
  onNavigate,
  onOpenSOS,
  onOpenClaimModal,
  onSelectPolicyDetail,
}) => {
  const activePolicies = policies.filter((p) => p.status === 'Active' || p.status === 'Expiring Soon');
  const activeClaims = claims.filter((c) => c.status !== 'Disbursed' && c.status !== 'Rejected');
  const expiringSoon = policies.filter((p) => p.status === 'Expiring Soon');

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Welcome & Overview Hero Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-200 border border-blue-400/30 text-xs font-semibold px-3 py-1 rounded-full">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span>InsureX AI Guardian Active</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Welcome back, Alex Johnson 👋
            </h1>
            <p className="text-sm text-blue-200 max-w-xl leading-relaxed">
              Your overall family protection is <strong className="text-emerald-300">Strong</strong>. All active policies are monitored with real-time AI risk analysis.
            </p>
          </div>

          {/* Protection Score Donut Widget */}
          <div
            onClick={() => onNavigate('coverage-gap')}
            className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 flex items-center gap-4 cursor-pointer hover:bg-white/15 transition-all shadow-inner group"
          >
            <div className="relative w-16 h-16 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-700"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-emerald-400"
                  strokeDasharray={`${coverageScore}, 100`}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <span className="absolute text-sm font-black text-white">{coverageScore}</span>
            </div>
            <div>
              <div className="text-xs font-bold text-blue-200 uppercase tracking-wider">Coverage Health</div>
              <div className="text-sm font-extrabold text-white group-hover:text-emerald-300 transition-colors flex items-center gap-1">
                84/100 Optimal <ChevronRight className="w-4 h-4" />
              </div>
              <div className="text-[10px] text-blue-300 mt-0.5">3 Gaps Detected • Tap to fix</div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Action Buttons Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button
          onClick={onOpenClaimModal}
          className="bg-white hover:bg-blue-50/60 border border-slate-200 rounded-2xl p-4 text-left transition-all shadow-xs hover:shadow-md group flex items-center justify-between"
        >
          <div>
            <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <FileCheck2 className="w-5 h-5" />
            </div>
            <div className="text-xs font-bold text-slate-900">Start Claim</div>
            <div className="text-[10px] text-slate-500">Instant AI OCR Scan</div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
        </button>

        <button
          onClick={() => onNavigate('explore')}
          className="bg-white hover:bg-blue-50/60 border border-slate-200 rounded-2xl p-4 text-left transition-all shadow-xs hover:shadow-md group flex items-center justify-between"
        >
          <div>
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <Compass className="w-5 h-5" />
            </div>
            <div className="text-xs font-bold text-slate-900">Explore Plans</div>
            <div className="text-[10px] text-slate-500">AI Tailored Quotes</div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all" />
        </button>

        <button
          onClick={() => onNavigate('lifestage')}
          className="bg-white hover:bg-blue-50/60 border border-slate-200 rounded-2xl p-4 text-left transition-all shadow-xs hover:shadow-md group flex items-center justify-between"
        >
          <div>
            <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="text-xs font-bold text-slate-900">Life Stage AI</div>
            <div className="text-[10px] text-slate-500">Milestone Advisor</div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-purple-600 group-hover:translate-x-0.5 transition-all" />
        </button>

        <button
          onClick={onOpenSOS}
          className="bg-gradient-to-r from-rose-50 to-red-50 hover:from-rose-100 hover:to-red-100 border border-red-200 rounded-2xl p-4 text-left transition-all shadow-xs hover:shadow-md group flex items-center justify-between"
        >
          <div>
            <div className="w-9 h-9 rounded-xl bg-red-600 text-white flex items-center justify-center mb-2 group-hover:scale-110 transition-transform shadow-sm">
              <AlertTriangle className="w-5 h-5 animate-pulse" />
            </div>
            <div className="text-xs font-bold text-red-900">Emergency SOS</div>
            <div className="text-[10px] text-red-700">1-Tap Assistance</div>
          </div>
          <ChevronRight className="w-4 h-4 text-red-400 group-hover:text-red-700 group-hover:translate-x-0.5 transition-all" />
        </button>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 Cols): Active Policies & Active Claims */}
        <div className="lg:col-span-2 space-y-6">
          {/* Active Policies Summary */}
          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Active Policies ({activePolicies.length})</h2>
                <p className="text-xs text-slate-500">Digital Insurance Wallet Overview</p>
              </div>
              <button
                onClick={() => onNavigate('policies')}
                className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
              >
                View Digital Wallet <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {activePolicies.slice(0, 4).map((policy) => (
                <div
                  key={policy.id}
                  onClick={() => onSelectPolicyDetail(policy)}
                  className="bg-slate-50 hover:bg-blue-50/50 border border-slate-200/80 hover:border-blue-300 rounded-2xl p-4 cursor-pointer transition-all group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="bg-white text-slate-700 border border-slate-200 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                      {policy.category}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        policy.status === 'Expiring Soon'
                          ? 'bg-amber-100 text-amber-800 border border-amber-300'
                          : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      }`}
                    >
                      {policy.status}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {policy.name}
                  </h3>
                  <div className="text-[11px] text-slate-500 font-mono mt-0.5">{policy.policyNumber}</div>

                  <div className="mt-3 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-[10px] text-slate-400 block">Sum Insured</span>
                      <span className="font-extrabold text-slate-900">${policy.coverageAmount.toLocaleString()}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 block">Monthly</span>
                      <span className="font-extrabold text-blue-600">${policy.monthlyPremium}/mo</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Active Claim Status Tracker Widget */}
          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileCheck2 className="w-5 h-5 text-emerald-600" />
                <h2 className="text-lg font-bold text-slate-900">Live Claim Tracker</h2>
              </div>
              <button
                onClick={() => onNavigate('claims')}
                className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
              >
                Claims Center <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {activeClaims.length > 0 ? (
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                      Claim #{claims[0].claimNumber}
                    </span>
                    <h3 className="text-sm font-extrabold text-slate-900 mt-0.5">
                      {claims[0].incidentType} (${claims[0].claimAmount.toLocaleString()})
                    </h3>
                  </div>
                  <span className="bg-emerald-600 text-white font-bold text-xs px-3 py-1 rounded-full shadow-xs">
                    {claims[0].status}
                  </span>
                </div>

                <div className="text-xs text-slate-600 font-medium">
                  Status: <span className="text-emerald-800 font-bold">{claims[0].estimatedSettlementTime}</span>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-emerald-200/80 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-600 h-full w-4/5 rounded-full animate-pulse"></div>
                </div>
              </div>
            ) : (
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-center text-xs text-slate-500">
                No claims active. All insured assets are safe & protected!
              </div>
            )}
          </div>
        </div>

        {/* Right Column (1 Col): AI Recommendations, Family & Savings */}
        <div className="space-y-6">
          {/* AI Protection Insights Card */}
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-3xl p-6 shadow-lg space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-300" />
              <h3 className="font-extrabold text-base">AI Copilot Recommendation</h3>
            </div>

            <p className="text-xs text-blue-100 leading-relaxed">
              "Alex, bundling your **Auto Guardian** and **Home Sanctuary** plans will unlock a **15% Multi-Policy Discount**, saving you **$160/year** while sealing your theft coverage gap!"
            </p>

            <button
              onClick={() => onNavigate('coverage-gap')}
              className="w-full bg-white text-blue-900 hover:bg-blue-50 font-extrabold text-xs py-2.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5 uppercase tracking-wider"
            >
              Seal Coverage Gap <Zap className="w-4 h-4 text-emerald-600" />
            </button>
          </div>

          {/* Family Coverage Overview */}
          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-600" />
                <h3 className="font-bold text-sm text-slate-900">Family Protection Overview</h3>
              </div>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                4 Members
              </span>
            </div>

            <div className="space-y-2">
              {[
                { name: 'Alex Johnson (Self)', role: 'Primary Insured', cover: 'Full Floater' },
                { name: 'Sarah Johnson (Spouse)', role: 'Beneficiary', cover: 'Full Floater' },
                { name: 'Leo Johnson (Child)', role: 'Dependent', cover: 'Pediatric Care' },
                { name: 'Maya Johnson (Child)', role: 'Dependent', cover: 'Pediatric Care' },
              ].map((member, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl text-xs"
                >
                  <div>
                    <span className="font-bold text-slate-800 block">{member.name}</span>
                    <span className="text-[10px] text-slate-500">{member.role}</span>
                  </div>
                  <span className="text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-md">
                    {member.cover}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Savings Summary Widget */}
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-3xl p-6 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                Annual Savings Summary
              </span>
              <DollarSign className="w-5 h-5 text-emerald-600" />
            </div>

            <div className="text-2xl font-black text-slate-900">$1,240 Saved</div>
            <p className="text-xs text-slate-600 leading-snug">
              Saved this year through InsureX Wellness Sync (+10%), No-Claim Bonuses, and Bundled Discounts!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
