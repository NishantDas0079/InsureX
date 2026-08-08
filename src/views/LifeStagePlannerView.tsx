import React, { useState } from 'react';
import {
  Sparkles,
  GraduationCap,
  Briefcase,
  Car,
  Home,
  Heart,
  Baby,
  Plane,
  Sun,
  CheckCircle2,
  ArrowRight,
  ShieldAlert,
  Zap,
} from 'lucide-react';
import { LIFE_STAGE_EVENTS } from '../mockData';
import { LifeStageEvent, Policy } from '../types';

interface LifeStagePlannerViewProps {
  onSelectPolicyDetail: (policy: Policy) => void;
}

export const LifeStagePlannerView: React.FC<LifeStagePlannerViewProps> = ({ onSelectPolicyDetail }) => {
  const [activeStageId, setActiveStageId] = useState<string>(LIFE_STAGE_EVENTS[0].id);

  const activeStage = LIFE_STAGE_EVENTS.find((s) => s.id === activeStageId) || LIFE_STAGE_EVENTS[0];

  const getStageIcon = (iconName: string) => {
    switch (iconName) {
      case 'GraduationCap':
        return GraduationCap;
      case 'Briefcase':
        return Briefcase;
      case 'Car':
        return Car;
      case 'Home':
        return Home;
      case 'Heart':
        return Heart;
      case 'Baby':
        return Baby;
      case 'Plane':
        return Plane;
      case 'Sun':
        return Sun;
      default:
        return Sparkles;
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Hero Header Banner */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-blue-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-2 bg-purple-500/20 text-purple-200 border border-purple-400/30 text-xs font-semibold px-3 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-purple-300 animate-pulse" />
            <span>AI Life Stage Intelligence Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Life Stage Protection Planner
          </h1>
          <p className="text-xs sm:text-sm text-purple-200 max-w-2xl leading-relaxed">
            Insurance shouldn't be static. As your life evolves from graduation to parenthood & home ownership, InsureX AI proactively aligns your protection matrix.
          </p>
        </div>
      </div>

      {/* Life Stage Milestones Bar */}
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
        {LIFE_STAGE_EVENTS.map((event) => {
          const Icon = getStageIcon(event.icon);
          const isActive = activeStageId === event.id;

          return (
            <button
              key={event.id}
              onClick={() => setActiveStageId(event.id)}
              className={`flex items-center gap-2.5 px-4 py-3 rounded-2xl text-xs font-bold shrink-0 transition-all ${
                isActive
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/25 scale-102'
                  : 'bg-white border border-slate-200/80 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-purple-600'}`} />
              <span>{event.title}</span>
            </button>
          );
        })}
      </div>

      {/* Active Milestone Detail & AI Recommendations */}
      <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center font-bold shadow-md shadow-purple-500/20">
              {React.createElement(getStageIcon(activeStage.icon), { className: 'w-7 h-7 text-white' })}
            </div>
            <div>
              <span className="bg-purple-50 text-purple-700 border border-purple-200 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase">
                {activeStage.badge}
              </span>
              <h2 className="text-xl font-extrabold text-slate-900 mt-1">{activeStage.title}</h2>
              <p className="text-xs text-slate-500 max-w-xl">{activeStage.description}</p>
            </div>
          </div>
        </div>

        {/* AI Recommended Policies Grid */}
        <div>
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-600" /> InsureX AI Recommended Protection Bundle
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeStage.recommendedPolicies.map((rec, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-purple-50/50 to-blue-50/50 border border-purple-200/80 rounded-2xl p-5 space-y-3 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="bg-purple-100 text-purple-800 text-[10px] font-bold px-2 py-0.5 rounded-md uppercase">
                      {rec.category} Protection
                    </span>
                    <span className="text-sm font-black text-purple-700">${rec.estimatedPremium}/mo</span>
                  </div>

                  <h4 className="text-base font-extrabold text-slate-900">{rec.name}</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">{rec.reason}</p>
                </div>

                <div className="pt-3 border-t border-purple-100/80 flex items-center justify-between">
                  <span className="text-xs font-extrabold text-slate-900">
                    Cover: ${rec.coverageAmount.toLocaleString()}
                  </span>

                  <button
                    onClick={() =>
                      onSelectPolicyDetail({
                        id: `lspf-${Date.now()}`,
                        category: rec.category,
                        name: rec.name,
                        provider: 'InsureX AI LifeStage',
                        policyNumber: 'LS-2026-PLAN',
                        coverageAmount: rec.coverageAmount,
                        monthlyPremium: rec.estimatedPremium,
                        annualPremium: rec.estimatedPremium * 11,
                        startDate: '2026-01-01',
                        expiryDate: '2027-01-01',
                        status: 'Active',
                        deductible: 250,
                        claimSettlementRatio: 99.2,
                        coveredMembers: ['Primary Policyholder'],
                        keyBenefits: [rec.reason, '24/7 AI Claims Priority Access'],
                        exclusions: ['Standard exclusions apply'],
                        aiRecommendationBadge: activeStage.badge,
                        iconName: 'Shield',
                        autoRenew: true,
                        documentsCount: 1,
                      })
                    }
                    className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs px-4 py-2 rounded-xl transition-all shadow-xs flex items-center gap-1"
                  >
                    Configure Plan <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Life Stage Expert Tips */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-2">
          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-amber-500" /> Proactive Financial & Insurance Tips for {activeStage.title}
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
            {activeStage.lifeTips.map((tip, idx) => (
              <div key={idx} className="flex items-start gap-2 bg-white p-2.5 rounded-xl border border-slate-200/60">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>{tip}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
