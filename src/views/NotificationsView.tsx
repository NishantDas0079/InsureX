import React from 'react';
import { Bell, CheckCircle2, ShieldAlert, Sparkles, Clock } from 'lucide-react';

export const NotificationsView: React.FC = () => {
  const notifications = [
    {
      id: '1',
      title: 'Claim Disbursement Successful',
      message: 'Claim #CLM-2026-8812 for $1,250 has been transferred to your connected Chase Bank account.',
      time: '2 hours ago',
      type: 'success',
    },
    {
      id: '2',
      title: 'Policy Renewal Reminder',
      message: 'Auto Guardian EV Comprehensive is expiring in 12 days. 15% No-claim discount applied.',
      time: 'Yesterday',
      type: 'alert',
    },
    {
      id: '3',
      title: 'AI Protection Insight',
      message: 'New Life Stage milestone detected! You might need Zero-Dep bumper cover for your new vehicle.',
      time: '2 days ago',
      type: 'ai',
    },
  ];

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Real-Time Alerts & Notifications</h1>
          <p className="text-xs text-slate-500">Updates on claims, renewal discounts, and AI security alerts</p>
        </div>
        <Bell className="w-6 h-6 text-blue-600" />
      </div>

      <div className="space-y-3">
        {notifications.map((n) => (
          <div
            key={n.id}
            className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs space-y-2 flex items-start gap-3"
          >
            <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600 shrink-0 mt-0.5">
              {n.type === 'success' ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              ) : n.type === 'alert' ? (
                <Clock className="w-5 h-5 text-amber-600" />
              ) : (
                <Sparkles className="w-5 h-5 text-purple-600" />
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900">{n.title}</h3>
                <span className="text-[10px] text-slate-400">{n.time}</span>
              </div>
              <p className="text-xs text-slate-600 mt-1">{n.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
