import React from 'react';
import {
  FileCheck2,
  Plus,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
  FileText,
  DollarSign,
  MessageSquare,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { Claim } from '../types';

interface ClaimsCenterViewProps {
  claims: Claim[];
  onOpenClaimModal: () => void;
  onOpenCopilot: () => void;
}

export const ClaimsCenterView: React.FC<ClaimsCenterViewProps> = ({
  claims,
  onOpenClaimModal,
  onOpenCopilot,
}) => {
  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Header */}
      <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Claims & Settlement Center</h1>
          <p className="text-xs text-slate-500">
            Powered by Gemini AI OCR, automated fraud scans, & average 3.2-hour payout disbursement
          </p>
        </div>

        <button
          onClick={onOpenClaimModal}
          className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs px-5 py-3 rounded-2xl shadow-lg shadow-blue-600/20 transition-all flex items-center justify-center gap-2 uppercase tracking-wider"
        >
          <Plus className="w-4 h-4" /> Start New Claim
        </button>
      </div>

      {/* Active Claims List */}
      <div className="space-y-6">
        {claims.map((claim) => (
          <div
            key={claim.id}
            className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs space-y-5"
          >
            {/* Top Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="bg-blue-50 text-blue-700 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase border border-blue-200">
                    {claim.category} Claim
                  </span>
                  <span className="bg-emerald-50 text-emerald-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" /> {claim.fraudRiskLevel}
                  </span>
                </div>
                <h3 className="text-lg font-extrabold text-slate-900 mt-1">{claim.incidentType}</h3>
                <div className="text-xs text-slate-500 font-mono">
                  Claim #{claim.claimNumber} • Policy: {claim.policyName}
                </div>
              </div>

              <div className="text-left sm:text-right">
                <div className="text-xs text-slate-400">Claim Value</div>
                <div className="text-xl font-black text-blue-700">${claim.claimAmount.toLocaleString()}</div>
                <div className="text-[11px] font-bold text-emerald-600">{claim.estimatedSettlementTime}</div>
              </div>
            </div>

            {/* Visual Step Timeline */}
            <div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                Live Claim Progress Timeline
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                {claim.timeline.map((step, idx) => (
                  <div
                    key={idx}
                    className={`p-3.5 rounded-2xl border text-xs space-y-1 transition-all ${
                      step.completed
                        ? 'bg-emerald-50/70 border-emerald-200 text-slate-900'
                        : step.current
                        ? 'bg-blue-50 border-blue-300 text-blue-900 shadow-xs'
                        : 'bg-slate-50 border-slate-200 text-slate-400'
                    }`}
                  >
                    <div className="flex items-center justify-between font-bold">
                      <span className="flex items-center gap-1.5">
                        {step.completed ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <Clock className="w-4 h-4 text-slate-400" />
                        )}
                        {step.title}
                      </span>
                    </div>
                    <p className="text-[11px] leading-tight opacity-90">{step.description}</p>
                    <div className="text-[10px] font-mono text-slate-400 pt-1">{step.timestamp}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Uploaded Documents */}
            <div className="bg-slate-50 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-600" />
                <span className="font-bold text-slate-700">Uploaded Proof Documents:</span>
                <span className="text-slate-500">{claim.uploadedDocuments.join(', ')}</span>
              </div>

              <button
                onClick={onOpenCopilot}
                className="bg-white border border-slate-200 hover:border-blue-400 text-blue-700 font-bold px-3 py-1.5 rounded-xl transition-all shadow-2xs flex items-center gap-1.5 shrink-0"
              >
                <MessageSquare className="w-3.5 h-3.5" /> Ask AI Adjuster
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
