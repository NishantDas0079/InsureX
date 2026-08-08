import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { BarChart3, TrendingUp, DollarSign, Shield, Zap } from 'lucide-react';

export const AnalyticsView: React.FC = () => {
  const premiumVsClaimsData = [
    { month: 'Jan', premium: 280, claims: 0 },
    { month: 'Feb', premium: 280, claims: 0 },
    { month: 'Mar', premium: 320, claims: 150 },
    { month: 'Apr', premium: 320, claims: 0 },
    { month: 'May', premium: 320, claims: 0 },
    { month: 'Jun', premium: 320, claims: 620 },
    { month: 'Jul', premium: 320, claims: 0 },
    { month: 'Aug', premium: 320, claims: 2450 },
  ];

  const categoryCoverageData = [
    { name: 'Health', value: 500000, color: '#2563EB' },
    { name: 'Life', value: 1500000, color: '#10B981' },
    { name: 'Motor', value: 45000, color: '#F59E0B' },
    { name: 'Home', value: 350000, color: '#8B5CF6' },
    { name: 'Travel', value: 100000, color: '#EC4899' },
  ];

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Header */}
      <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Protection & Financial Analytics</h1>
          <p className="text-xs text-slate-500">
            Real-time analytics on total coverage, claims disbursed, premiums paid, & wellness savings
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-2xl px-4 py-2 text-xs font-bold text-blue-700 flex items-center gap-1.5">
          <BarChart3 className="w-4 h-4 text-blue-600" /> Annual Protection Report
        </div>
      </div>

      {/* Analytics Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200/80 rounded-3xl p-5 shadow-xs">
          <div className="text-[10px] font-bold text-slate-400 uppercase">Total Cover Sum</div>
          <div className="text-2xl font-black text-slate-900 mt-1">$2.49M</div>
          <div className="text-[10px] text-emerald-600 font-bold mt-0.5"> Across 8 Active Policies</div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-3xl p-5 shadow-xs">
          <div className="text-[10px] font-bold text-slate-400 uppercase">Total Claims Disbursed</div>
          <div className="text-2xl font-black text-emerald-600 mt-1">$3,220</div>
          <div className="text-[10px] text-slate-500 mt-0.5">100% Cashless Payout Rate</div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-3xl p-5 shadow-xs">
          <div className="text-[10px] font-bold text-slate-400 uppercase">Annual Premium Paid</div>
          <div className="text-2xl font-black text-blue-600 mt-1">$2,480</div>
          <div className="text-[10px] text-slate-500 mt-0.5">Average $320 / month</div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-3xl p-5 shadow-xs">
          <div className="text-[10px] font-bold text-slate-400 uppercase">Total Savings Unlocked</div>
          <div className="text-2xl font-black text-purple-600 mt-1">$1,240</div>
          <div className="text-[10px] text-purple-700 font-bold mt-0.5">15% No-Claim + Wellness Sync</div>
        </div>
      </div>

      {/* Interactive Recharts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Premium vs Claims Bar Chart */}
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs space-y-4">
          <h2 className="text-base font-extrabold text-slate-900">Premium Paid vs Claims Received (2026)</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={premiumVsClaimsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} />
                <Tooltip />
                <Bar dataKey="premium" fill="#2563EB" name="Premium Paid ($)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="claims" fill="#10B981" name="Claims Received ($)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Coverage Amount Distribution Pie Chart */}
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs space-y-4">
          <h2 className="text-base font-extrabold text-slate-900">Sum Insured Distribution by Category</h2>
          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryCoverageData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryCoverageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="flex flex-wrap justify-center gap-3 text-xs">
            {categoryCoverageData.map((item, idx) => (
              <div key={idx} className="flex items-center gap-1.5 font-bold text-slate-700">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></span>
                <span>{item.name}: ${(item.value / 1000).toFixed(0)}k</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
