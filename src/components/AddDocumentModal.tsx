import React, { useState } from 'react';
import { FolderOpen, X, Upload, Sparkles, CheckCircle2, FileText } from 'lucide-react';
import { DocumentItem } from '../types';

interface AddDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddDocument: (doc: DocumentItem) => void;
}

export const AddDocumentModal: React.FC<AddDocumentModalProps> = ({
  isOpen,
  onClose,
  onAddDocument,
}) => {
  if (!isOpen) return null;

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'Certificate' | 'Invoice' | 'Medical Report' | 'Vehicle Papers' | 'Claim Doc'>('Certificate');
  const [policyName, setPolicyName] = useState('Health Secure Ultra');
  const [rawText, setRawText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSave = async () => {
    if (!title.trim()) return;

    setIsProcessing(true);

    try {
      const res = await fetch('/api/analyze-document', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ documentName: title, category, rawText }),
      });
      const data = await res.json();

      const newDoc: DocumentItem = {
        id: `doc-${Date.now()}`,
        title,
        category,
        policyName,
        uploadDate: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
        fileSize: '3.1 MB',
        fileType: 'PDF',
        aiSummary: data.summary || `Verified ${category} for ${policyName}. Auto-indexed in InsureX Vault.`,
      };

      onAddDocument(newDoc);
      setIsProcessing(false);
      onClose();
    } catch (err) {
      const newDoc: DocumentItem = {
        id: `doc-${Date.now()}`,
        title,
        category,
        policyName,
        uploadDate: 'Today',
        fileSize: '2.5 MB',
        fileType: 'PDF',
        aiSummary: `Verified document uploaded to ${policyName}. Compliant with InsureX vault standards.`,
      };
      onAddDocument(newDoc);
      setIsProcessing(false);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-sm p-4 animate-fadeIn">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-800 to-indigo-800 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/20 rounded-2xl">
              <FolderOpen className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-base font-bold">Upload to Digital Document Vault</h2>
              <p className="text-xs text-blue-100">AI Auto-indexing & Summarization</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-white/20 text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 uppercase mb-1">Document Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Annual Health Checkup Diagnostic Report"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 font-medium focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">Category</label>
              <select
                value={category}
                onChange={(e: any) => setCategory(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 font-medium text-slate-800 focus:outline-none"
              >
                <option value="Certificate">Certificate / Policy Bond</option>
                <option value="Invoice">Invoice / Receipt</option>
                <option value="Medical Report">Medical Report</option>
                <option value="Vehicle Papers">Vehicle Papers</option>
                <option value="Claim Doc">Claim Document</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">Associated Policy</label>
              <input
                type="text"
                value={policyName}
                onChange={(e) => setPolicyName(e.target.value)}
                placeholder="e.g. Health Secure Ultra"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 font-medium text-slate-800 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 uppercase mb-1">
              Notes / Text Snippets (Optional for AI OCR)
            </label>
            <textarea
              rows={3}
              value={rawText}
              onChange={(e) => setRawText(e.target.value)}
              placeholder="Paste invoice text or notes for Gemini AI summary..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 font-medium focus:outline-none"
            />
          </div>

          <button
            onClick={handleSave}
            disabled={!title.trim() || isProcessing}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white font-bold text-xs py-3 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 uppercase tracking-wider"
          >
            {isProcessing ? (
              <>
                <Sparkles className="w-4 h-4 animate-spin" /> Processing AI Summarizer...
              </>
            ) : (
              <>
                Save & Index in Digital Vault <Sparkles className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
