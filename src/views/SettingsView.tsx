import React from 'react';
import { User, Shield, CreditCard, Bell, Lock, Key, CheckCircle2 } from 'lucide-react';

export const SettingsView: React.FC = () => {
  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Account & Security Settings</h1>
          <p className="text-xs text-slate-500">Manage user profile, payment methods, biometric authentication, and notifications</p>
        </div>
        <User className="w-6 h-6 text-blue-600" />
      </div>

      <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs space-y-6 text-xs">
        <div className="space-y-4">
          <h2 className="font-extrabold text-sm text-slate-900 uppercase tracking-wider">User Profile</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-500 font-bold mb-1">Full Name</label>
              <input
                type="text"
                defaultValue="Alex Johnson"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 font-bold text-slate-800"
              />
            </div>
            <div>
              <label className="block text-slate-500 font-bold mb-1">Email Address</label>
              <input
                type="email"
                defaultValue="alex.johnson@insurex.ai"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 font-bold text-slate-800"
              />
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 space-y-3">
          <h2 className="font-extrabold text-sm text-slate-900 uppercase tracking-wider">Security & Biometrics</h2>
          <div className="flex items-center justify-between bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <div>
              <div className="font-bold text-slate-800">FaceID / TouchID Lock</div>
              <div className="text-[11px] text-slate-500">Require biometric verification for viewing digital policy passes</div>
            </div>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">Active</span>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 space-y-3">
          <h2 className="font-extrabold text-sm text-slate-900 uppercase tracking-wider">Payment Method for Auto-Renew</h2>
          <div className="flex items-center justify-between bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <div className="flex items-center gap-3">
              <CreditCard className="w-5 h-5 text-blue-600" />
              <div>
                <div className="font-bold text-slate-800">Chase Visa ending in 8812</div>
                <div className="text-[11px] text-slate-500">Primary card for 5% Auto-Pay discount</div>
              </div>
            </div>
            <button className="text-blue-600 font-bold hover:underline">Manage</button>
          </div>
        </div>
      </div>
    </div>
  );
};
