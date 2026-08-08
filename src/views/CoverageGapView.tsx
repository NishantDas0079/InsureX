import React, { useState } from 'react';
import {
  Zap,
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  Plus,
  ArrowRight,
  TrendingUp,
  Sparkles,
} from 'lucide-react';
import { COVERAGE_GAPS } from '../mockData';
import { CoverageGap } from '../types';

interface CoverageGapViewProps {
  score: number;
  onUpdateScore: (newScore: number) => void;
}

export const CoverageGapView: React.FC<CoverageGapViewProps> = ({ score, onUpdateScore }) => {
  const [sealedGapIds, setSealedGapIds] = useState<string[]>([]);

  const handleSealGap = (gap: CoverageGap) => {
    if (sealedGapIds.includes(gap.id)) return;
    setSealedGapIds((prev) => [...prev, gap.id]);
    onUpdateScore(Math.min(100, score + gap.protectionScoreImpact));
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-200 border border-blue-400/30 text-xs font-semibold px-3 py-1 rounded-full">
            <Zap className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span>AI Portfolio Gap Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Smart Cross-Sell & Coverage Gap Analysis
          </h1>
          <p className="text-xs sm:text-sm text-blue-200 max-w-2xl leading-relaxed">
            InsureX AI continuously benchmarks your active portfolio against unexpected risk scenarios to pinpoint missing coverage before accidents occur.
          </p>
        </div>
      </div>

      {/* Score Meter & Summary */}
      <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="relative w-20 h-20 flex items-center justify-center shrink-0">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-slate-100"
                strokeWidth="4"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-emerald-500"
                strokeDasharray={`${score}, 100`}
                strokeWidth="4"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <span className="absolute text-xl font-black text-slate-900">{score}</span>
          </div>
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase">Protection Health Score</div>
            <h2 className="text-xl font-extrabold text-slate-900 mt-0.5">
              {score >= 95 ? 'Fully Sealed (100/100)' : `${COVERAGE_GAPS.length - sealedGapIds.length} Missing Coverage Gaps`}
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Sealing identified gaps will boost your score to 100 and protect against $25k+ out-of-pocket risks.
            </p>
          </div>
        </div>
      </div>

      {/* Identified Gaps List */}
      <div className="space-y-4">
        {COVERAGE_GAPS.map((gap) => {
          const isSealed = sealedGapIds.includes(gap.id);

          return (
            <div
              key={gap.id}
              className={`bg-white border rounded-3xl p-6 shadow-xs space-y-4 transition-all ${
                isSealed ? 'border-emerald-300 bg-emerald-50/30' : 'border-slate-200/80 hover:border-blue-300'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="bg-blue-50 text-blue-700 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase border border-blue-200">
                      {gap.category} Gap
                    </span>
                    <span className="bg-rose-50 text-rose-700 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-rose-200 flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3 text-rose-600" /> Current Risk Active
                    </span>
                  </div>
                  <h3 className="text-base font-extrabold text-slate-900 mt-1">{gap.title}</h3>
                  <p className="text-xs text-slate-600 mt-0.5">{gap.missingFeature}</p>
                </div>

                <div className="text-left sm:text-right">
                  <div className="text-xs text-slate-400">Add-on Cost</div>
                  <div className="text-lg font-black text-blue-700">+${gap.estimatedMonthlyCost}/mo</div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                    +{gap.protectionScoreImpact} Protection Score
                  </span>
                </div>
              </div>

              <div className="bg-slate-50 rounded-2xl p-3.5 text-xs text-slate-700 space-y-1">
                <span className="font-bold text-slate-900">Recommended Solution Rider: </span>
                <span className="text-blue-700 font-extrabold">{gap.recommendedAddon}</span>
              </div>

              <div className="flex justify-end pt-1">
                {isSealed ? (
                  <div className="bg-emerald-600 text-white font-bold text-xs px-6 py-2.5 rounded-xl flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" /> Gap Sealed & Rider Active!
                  </div>
                ) : (
                  <button
                    onClick={() => handleSealGap(gap)}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs px-6 py-2.5 rounded-xl shadow-md transition-all flex items-center gap-1.5 uppercase tracking-wider"
                  >
                    Seal Gap Now (+${gap.estimatedMonthlyCost}/mo) <Zap className="w-4 h-4 text-emerald-400" />
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
