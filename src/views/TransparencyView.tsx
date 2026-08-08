import React from 'react';
import {
  ShieldCheck,
  Clock,
  UserCheck,
  Lock,
  Award,
  Star,
  CheckCircle2,
  HelpCircle,
  TrendingUp,
  FileText,
  Building,
} from 'lucide-react';

export const TransparencyView: React.FC = () => {
  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-200 border border-blue-400/30 text-xs font-semibold px-3 py-1 rounded-full">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-300" />
            <span>Trust & Transparency Assurance</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Trust & Transparency Center
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            We believe insurance should have zero fine-print secrets. Here is an open audit of our claim settlement ratios, processing speed, AI decision logic, and security standards.
          </p>
        </div>
      </div>

      {/* Hero Stat Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200/80 rounded-3xl p-5 text-center shadow-xs">
          <div className="text-xs font-bold text-slate-400 uppercase">Overall Settlement Ratio</div>
          <div className="text-3xl font-black text-emerald-600 mt-1">99.2%</div>
          <div className="text-[10px] text-slate-500 mt-0.5">Top 1% Industry Leader</div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-3xl p-5 text-center shadow-xs">
          <div className="text-xs font-bold text-slate-400 uppercase">Avg Claim Processing</div>
          <div className="text-3xl font-black text-blue-600 mt-1">3.2 Hrs</div>
          <div className="text-[10px] text-slate-500 mt-0.5">Industry Avg is 72 Hours</div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-3xl p-5 text-center shadow-xs">
          <div className="text-xs font-bold text-slate-400 uppercase">Customer Satisfaction</div>
          <div className="text-3xl font-black text-amber-500 mt-1 flex items-center justify-center gap-1">
            <Star className="w-6 h-6 fill-amber-400 text-amber-400" /> 4.9/5
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">120,000+ Verified Reviews</div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-3xl p-5 text-center shadow-xs">
          <div className="text-xs font-bold text-slate-400 uppercase">Encryption & Privacy</div>
          <div className="text-2xl font-black text-slate-900 mt-1">SOC-2 Type II</div>
          <div className="text-[10px] text-slate-500 mt-0.5">256-bit AES Bank Grade</div>
        </div>
      </div>

      {/* Deep-Dive Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* AI Decision Transparency */}
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900">How InsureX AI Recommendation Logic Works</h3>
              <p className="text-xs text-slate-500">100% Explainable & Unbiased</p>
            </div>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            Our AI engines analyze life stage triggers, zip code weather risks, and medical history declarations. InsureX AI never receives financial kickbacks from third-party brokers. Every policy recommendation displays an explicit mathematical confidence score.
          </p>

          <div className="bg-slate-50 rounded-2xl p-3.5 text-xs space-y-2 border border-slate-200">
            <div className="flex items-center gap-2 font-bold text-slate-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Human Review Guarantee
            </div>
            <p className="text-[11px] text-slate-600">
              Any AI claim decline or policy modification is automatically routed to a certified human insurance adjuster for a mandatory secondary review.
            </p>
          </div>
        </div>

        {/* Security & Regulatory Compliance */}
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900">Security & Regulatory Compliance</h3>
              <p className="text-xs text-slate-500">Fully Licensed & Audited</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <Award className="w-5 h-5 text-blue-600 mb-1" />
              <div className="font-bold text-slate-900">IRDAI & FINRA Certified</div>
              <div className="text-[10px] text-slate-500 mt-0.5">Licensed insurance broker & underwriter partner</div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <Building className="w-5 h-5 text-emerald-600 mb-1" />
              <div className="font-bold text-slate-900">FDIC / Reinsurance Backing</div>
              <div className="text-[10px] text-slate-500 mt-0.5">Backed by $10B+ global reinsurance reserves</div>
            </div>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            Your personal health records and vehicle telemetry data are zero-knowledge encrypted and never sold to advertisers.
          </p>
        </div>
      </div>
    </div>
  );
};
