import React, { useState } from 'react';
import {
  FileCheck2,
  X,
  Upload,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  FileText,
  Clock,
} from 'lucide-react';
import { Policy, Claim } from '../types';

interface ClaimFilingModalProps {
  policies: Policy[];
  isOpen: boolean;
  onClose: () => void;
  onSubmitClaim: (claim: Claim) => void;
  preSelectedCategory?: string;
}

export const ClaimFilingModal: React.FC<ClaimFilingModalProps> = ({
  policies,
  isOpen,
  onClose,
  onSubmitClaim,
  preSelectedCategory,
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<number>(1);
  const [selectedPolicyId, setSelectedPolicyId] = useState<string>(policies[0]?.id || '');
  const [incidentType, setIncidentType] = useState<string>('Medical Hospitalization');
  const [incidentDate, setIncidentDate] = useState<string>('2026-08-05');
  const [claimAmount, setClaimAmount] = useState<string>('1250');
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [verificationResult, setVerificationResult] = useState<any>(null);

  const selectedPolicy = policies.find((p) => p.id === selectedPolicyId) || policies[0];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const fileName = e.target.files[0].name;
      setUploadedFiles((prev) => [...prev, fileName]);
    }
  };

  const handleRunAiVerify = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setVerificationResult({
        ocrStatus: 'Passed 100%',
        icdCode: 'ICD-10-CM / CPT Verified',
        fraudRisk: 'Low Risk (99.6% Trust Score)',
        cashlessEligibility: 'Pre-Approved Cashless Settlement',
      });
      setStep(3);
    }, 1500);
  };

  const handleSubmitFinal = () => {
    const newClaim: Claim = {
      id: `clm-${Date.now()}`,
      claimNumber: `CLM-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      policyId: selectedPolicy.id,
      policyName: selectedPolicy.name,
      category: selectedPolicy.category,
      incidentType,
      incidentDate,
      claimAmount: parseFloat(claimAmount) || 1000,
      approvedAmount: parseFloat(claimAmount) || 1000,
      status: 'Submitted',
      estimatedSettlementTime: 'Estimated settlement in 2 hours',
      fraudRiskLevel: 'Low Risk',
      timeline: [
        {
          title: 'Claim Filed',
          description: 'Submitted through InsureX AI Claim Center',
          timestamp: 'Just now',
          completed: true,
          current: true,
        },
        {
          title: 'AI Verification & Fraud Scan',
          description: 'Document OCR verified. Low risk indicator.',
          timestamp: 'Pending (10 mins)',
          completed: false,
        },
        {
          title: 'Payout Disbursement',
          description: 'Direct ACH transfer to bank or network hospital',
          timestamp: 'Pending (2 hours)',
          completed: false,
        },
      ],
      uploadedDocuments: uploadedFiles.length > 0 ? uploadedFiles : ['Hospital_Bill_Receipt.pdf'],
    };

    onSubmitClaim(newClaim);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-md p-4 animate-fadeIn">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-800 via-blue-700 to-emerald-700 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/20 rounded-2xl">
              <FileCheck2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold tracking-tight">InsureX AI Instant Claim Assistant</h2>
              <p className="text-xs text-blue-100">Step {step} of 3 — AI Powered Verification</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/20 text-white transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto space-y-5">
          {/* Progress Steps Indicator */}
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 border-b border-slate-200 pb-4">
            <div className={`flex items-center gap-2 ${step >= 1 ? 'text-blue-600' : ''}`}>
              <span className="w-6 h-6 rounded-full bg-blue-100 border border-blue-300 text-blue-700 flex items-center justify-center font-bold">
                1
              </span>
              <span>Policy & Incident</span>
            </div>
            <div className="w-8 h-0.5 bg-slate-200"></div>
            <div className={`flex items-center gap-2 ${step >= 2 ? 'text-blue-600' : ''}`}>
              <span className="w-6 h-6 rounded-full bg-blue-100 border border-blue-300 text-blue-700 flex items-center justify-center font-bold">
                2
              </span>
              <span>Upload & AI OCR</span>
            </div>
            <div className="w-8 h-0.5 bg-slate-200"></div>
            <div className={`flex items-center gap-2 ${step >= 3 ? 'text-blue-600' : ''}`}>
              <span className="w-6 h-6 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-700 flex items-center justify-center font-bold">
                3
              </span>
              <span>Confirmation</span>
            </div>
          </div>

          {step === 1 && (
            <div className="space-y-4 animate-fadeIn">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Select Covered Policy
                </label>
                <select
                  value={selectedPolicyId}
                  onChange={(e) => setSelectedPolicyId(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-medium text-slate-800 focus:outline-none focus:border-blue-500"
                >
                  {policies.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.policyNumber}) — Cover: ${p.coverageAmount.toLocaleString()}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Incident Type / Event Reason
                </label>
                <input
                  type="text"
                  value={incidentType}
                  onChange={(e) => setIncidentType(e.target.value)}
                  placeholder="e.g. Hospitalization ER Visit, Windshield Crack, Theft..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Incident Date
                  </label>
                  <input
                    type="date"
                    value={incidentDate}
                    onChange={(e) => setIncidentDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Claim Amount ($)
                  </label>
                  <input
                    type="number"
                    value={claimAmount}
                    onChange={(e) => setClaimAmount(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 focus:outline-none font-bold"
                  />
                </div>
              </div>

              <button
                onClick={() => setStep(2)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-3 rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
              >
                Proceed to Document Upload <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4 animate-fadeIn">
              <div className="border-2 border-dashed border-blue-200 bg-blue-50/50 hover:bg-blue-50 rounded-2xl p-6 text-center cursor-pointer transition-all">
                <Upload className="w-8 h-8 text-blue-600 mx-auto mb-2 animate-bounce" />
                <div className="text-xs font-bold text-slate-800">
                  Drag & Drop Medical Bills, Receipts, or Photos
                </div>
                <div className="text-[11px] text-slate-500 mt-1">
                  InsureX Gemini OCR will automatically scan codes & verify claims instantly
                </div>
                <input
                  type="file"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="claim-doc-upload"
                />
                <label
                  htmlFor="claim-doc-upload"
                  className="mt-3 inline-block bg-blue-600 text-white font-bold text-xs px-4 py-2 rounded-xl cursor-pointer shadow-xs hover:bg-blue-700 transition-all"
                >
                  Choose Document File
                </label>
              </div>

              {uploadedFiles.length > 0 && (
                <div className="space-y-2">
                  <div className="text-xs font-bold text-slate-700 uppercase">Uploaded Files:</div>
                  {uploadedFiles.map((file, idx) => (
                    <div
                      key={idx}
                      className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 flex items-center justify-between text-xs text-slate-800"
                    >
                      <span className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-blue-600" /> {file}
                      </span>
                      <span className="text-emerald-600 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Ready
                      </span>
                    </div>
                  ))}
                </div>
              )}

              <button
                onClick={handleRunAiVerify}
                disabled={isVerifying}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-3 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 uppercase tracking-wider"
              >
                {isVerifying ? (
                  <>
                    <Sparkles className="w-4 h-4 animate-spin text-white" />
                    Running AI Gemini OCR & Fraud Check...
                  </>
                ) : (
                  <>
                    Run AI Instant Verification <Sparkles className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          )}

          {step === 3 && verificationResult && (
            <div className="space-y-4 animate-fadeIn">
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 space-y-3">
                <div className="flex items-center gap-2 text-emerald-800 font-extrabold text-sm">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  AI Verification Completed & Verified
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-white p-2 rounded-xl border border-emerald-100">
                    <span className="text-slate-400 text-[10px] block">OCR Match</span>
                    <span className="font-bold text-slate-800">{verificationResult.ocrStatus}</span>
                  </div>
                  <div className="bg-white p-2 rounded-xl border border-emerald-100">
                    <span className="text-slate-400 text-[10px] block">Fraud Score</span>
                    <span className="font-bold text-emerald-700">{verificationResult.fraudRisk}</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs text-slate-700 space-y-1">
                <div>
                  <strong>Policy:</strong> {selectedPolicy.name}
                </div>
                <div>
                  <strong>Claim Amount:</strong> ${claimAmount}
                </div>
                <div>
                  <strong>Estimated Settlement:</strong> Under 2 hours via Direct ACH
                </div>
              </div>

              <button
                onClick={handleSubmitFinal}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-3 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 uppercase tracking-wider"
              >
                Submit Claim to Settlement Engine <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
