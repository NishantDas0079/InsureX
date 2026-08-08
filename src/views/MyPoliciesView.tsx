import React, { useState } from 'react';
import {
  Wallet,
  Download,
  Share2,
  RefreshCw,
  FileCheck2,
  Shield,
  CheckCircle2,
  Calendar,
  Users,
  X,
  QrCode,
  ArrowRight,
} from 'lucide-react';
import { Policy } from '../types';

interface MyPoliciesViewProps {
  policies: Policy[];
  onRenewPolicy: (policy: Policy) => void;
  onFileClaimForPolicy: (policy: Policy) => void;
  onSelectPolicyDetail: (policy: Policy) => void;
}

export const MyPoliciesView: React.FC<MyPoliciesViewProps> = ({
  policies,
  onRenewPolicy,
  onFileClaimForPolicy,
  onSelectPolicyDetail,
}) => {
  const [downloadModalPolicy, setDownloadModalPolicy] = useState<Policy | null>(null);

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Header */}
      <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Digital Insurance Wallet</h1>
          <p className="text-xs text-slate-500">
            All active certificates, digital health cards, and policy bonds securely stored
          </p>
        </div>
        <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-2xl px-4 py-2 text-xs text-blue-700 font-bold">
          <Wallet className="w-4 h-4 text-blue-600" /> {policies.length} Total Policies Vaulted
        </div>
      </div>

      {/* Policy Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {policies.map((policy) => (
          <div
            key={policy.id}
            className="bg-white border border-slate-200/80 hover:border-blue-300 rounded-3xl p-6 shadow-xs hover:shadow-lg transition-all space-y-5"
          >
            {/* Card Header */}
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-lg shadow-md shadow-blue-500/20">
                  <Shield className="w-6 h-6 text-blue-100" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="bg-blue-50 text-blue-700 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase border border-blue-200">
                      {policy.category}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                        policy.status === 'Expiring Soon'
                          ? 'bg-amber-100 text-amber-800 border border-amber-300'
                          : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      }`}
                    >
                      {policy.status}
                    </span>
                  </div>
                  <h3 className="text-base font-extrabold text-slate-900 mt-1">{policy.name}</h3>
                  <div className="text-xs text-slate-500 font-mono">{policy.policyNumber}</div>
                </div>
              </div>

              <button
                onClick={() => setDownloadModalPolicy(policy)}
                className="p-2 rounded-xl text-slate-400 hover:text-blue-600 hover:bg-slate-100 transition-all"
                title="View Digital QR & Certificate"
              >
                <QrCode className="w-5 h-5" />
              </button>
            </div>

            {/* Policy Info Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-slate-50 rounded-2xl p-3.5 text-xs">
              <div>
                <span className="text-[10px] text-slate-400 block font-bold uppercase">Sum Insured</span>
                <span className="font-extrabold text-slate-900">${policy.coverageAmount.toLocaleString()}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block font-bold uppercase">Expiry Date</span>
                <span className="font-extrabold text-slate-800">{policy.expiryDate}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block font-bold uppercase">Premium</span>
                <span className="font-extrabold text-blue-600">${policy.monthlyPremium}/mo</span>
              </div>
            </div>

            {/* Covered Members */}
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase mb-1 flex items-center gap-1">
                <Users className="w-3.5 h-3.5" /> Covered Beneficiaries & Asset:
              </div>
              <div className="flex flex-wrap gap-1.5">
                {policy.coveredMembers.map((m, idx) => (
                  <span
                    key={idx}
                    className="bg-slate-100 text-slate-700 text-[11px] font-medium px-2.5 py-1 rounded-lg border border-slate-200"
                  >
                    {m}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick Action Footer Buttons */}
            <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
              <button
                onClick={() => onFileClaimForPolicy(policy)}
                className="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold text-xs px-3 py-2 rounded-xl transition-all flex items-center gap-1.5"
              >
                <FileCheck2 className="w-4 h-4 text-emerald-600" /> File Claim
              </button>

              <button
                onClick={() => onRenewPolicy(policy)}
                className="bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 font-bold text-xs px-3 py-2 rounded-xl transition-all flex items-center gap-1.5"
              >
                <RefreshCw className="w-4 h-4 text-amber-600" /> Renew Plan
              </button>

              <button
                onClick={() => setDownloadModalPolicy(policy)}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs px-3 py-2 rounded-xl transition-all flex items-center gap-1.5"
              >
                <Download className="w-4 h-4 text-slate-600" /> Download Certificate
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Digital Certificate & QR Modal */}
      {downloadModalPolicy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-md p-4 animate-fadeIn">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-400" />
                <h3 className="font-bold text-sm">InsureX Digital Pass Certificate</h3>
              </div>
              <button onClick={() => setDownloadModalPolicy(null)} className="p-1 text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 text-center space-y-4">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 inline-block">
                {/* Simulated QR Code */}
                <div className="w-40 h-40 bg-slate-900 mx-auto rounded-xl p-2 flex items-center justify-center text-white font-mono text-[10px] text-center leading-tight shadow-inner">
                  [InsureX QR Token]
                  <br />
                  {downloadModalPolicy.policyNumber}
                  <br />
                  VERIFIED IRDAI
                </div>
              </div>

              <div>
                <h4 className="font-extrabold text-slate-900 text-base">{downloadModalPolicy.name}</h4>
                <p className="text-xs text-slate-500 font-mono">{downloadModalPolicy.policyNumber}</p>
                <p className="text-xs text-emerald-600 font-bold mt-1">
                  Sum Insured: ${downloadModalPolicy.coverageAmount.toLocaleString()}
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => alert('Certificate PDF downloaded successfully!')}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-2.5 rounded-xl shadow-md flex items-center justify-center gap-1.5"
                >
                  <Download className="w-4 h-4" /> Download PDF
                </button>
                <button
                  onClick={() => alert('Policy pass link copied to clipboard!')}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs py-2.5 rounded-xl flex items-center justify-center gap-1.5"
                >
                  <Share2 className="w-4 h-4" /> Share Link
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
