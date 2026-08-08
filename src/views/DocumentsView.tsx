import React, { useState } from 'react';
import {
  FolderOpen,
  Plus,
  FileText,
  Download,
  Share2,
  Sparkles,
  Search,
  CheckCircle2,
  Eye,
} from 'lucide-react';
import { DocumentItem } from '../types';

interface DocumentsViewProps {
  documents: DocumentItem[];
  onOpenAddModal: () => void;
}

export const DocumentsView: React.FC<DocumentsViewProps> = ({ documents, onOpenAddModal }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Certificate', 'Medical Report', 'Vehicle Papers', 'Invoice', 'Claim Doc'];

  const filteredDocs = documents.filter((doc) => {
    const matchesCat = selectedCategory === 'All' || doc.category === selectedCategory;
    const matchesQuery =
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.policyName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Header */}
      <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Digital Document Vault</h1>
          <p className="text-xs text-slate-500">
            Encrypted cloud storage with Gemini AI automatic summaries & CPT code indexing
          </p>
        </div>

        <button
          onClick={onOpenAddModal}
          className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs px-5 py-3 rounded-2xl shadow-lg shadow-blue-600/20 transition-all flex items-center justify-center gap-2 uppercase tracking-wider"
        >
          <Plus className="w-4 h-4" /> Upload Document
        </button>
      </div>

      {/* Filter Tabs & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search certificates, hospital bills..."
          className="bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 w-full sm:w-64 focus:outline-none focus:border-blue-500"
        />
      </div>

      {/* Documents List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredDocs.map((doc) => (
          <div
            key={doc.id}
            className="bg-white border border-slate-200/80 hover:border-blue-300 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all space-y-3"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <span className="bg-slate-100 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded-md uppercase">
                    {doc.category}
                  </span>
                  <h3 className="text-sm font-bold text-slate-900 mt-1">{doc.title}</h3>
                  <p className="text-[11px] text-slate-500">{doc.policyName}</p>
                </div>
              </div>

              <span className="text-[10px] font-mono text-slate-400">{doc.fileSize}</span>
            </div>

            {/* AI Summary Box */}
            {doc.aiSummary && (
              <div className="bg-gradient-to-r from-blue-50/60 to-emerald-50/60 border border-blue-100 rounded-xl p-3 text-xs text-slate-700 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-blue-800 text-[11px]">
                  <Sparkles className="w-3.5 h-3.5 text-blue-600" /> AI OCR Summary
                </div>
                <p className="text-[11px] leading-relaxed text-slate-600">{doc.aiSummary}</p>
              </div>
            )}

            <div className="pt-2 flex items-center justify-between text-xs text-slate-400">
              <span>Uploaded {doc.uploadDate}</span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => alert(`Downloading ${doc.title} (${doc.fileType})...`)}
                  className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-all"
                  title="Download File"
                >
                  <Download className="w-4 h-4" />
                </button>
                <button
                  onClick={() => alert(`Share link created for ${doc.title}`)}
                  className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-all"
                  title="Share Document"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
