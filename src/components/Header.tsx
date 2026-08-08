import React from 'react';
import {
  Shield,
  ArrowLeft,
  AlertTriangle,
  Bot,
  Bell,
  Search,
  User,
  ChevronRight,
  Zap,
} from 'lucide-react';
import { NavSection } from '../types';

interface HeaderProps {
  currentSection: NavSection;
  onNavigate: (section: NavSection) => void;
  onOpenSOS: () => void;
  onOpenCopilot?: () => void;
  onToggleCopilot?: () => void;
  notificationCount?: number;
  unreadNotificationsCount?: number;
  coverageScore?: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentSection,
  onNavigate,
  onOpenSOS,
  onOpenCopilot,
  onToggleCopilot,
  notificationCount = 3,
  unreadNotificationsCount,
  coverageScore = 84,
}) => {
  const handleCopilotClick = onOpenCopilot || onToggleCopilot || (() => {});
  const activeUnreadCount = unreadNotificationsCount ?? notificationCount;
  const getSectionTitle = (section: NavSection) => {
    switch (section) {
      case 'dashboard':
        return 'Main Dashboard';
      case 'explore':
        return 'Explore Insurance Plans';
      case 'policies':
        return 'My Digital Insurance Wallet';
      case 'claims':
        return 'Claims & Settlement Center';
      case 'documents':
        return 'Digital Document Vault';
      case 'renewals':
        return 'Upcoming Policy Renewals';
      case 'lifestage':
        return 'Life Stage Intelligence Planner';
      case 'ecosystem':
        return 'Smart Protection Ecosystem';
      case 'transparency':
        return 'Trust & Transparency Center';
      case 'coverage-gap':
        return 'Coverage Gap & Cross-Sell Analysis';
      case 'analytics':
        return 'Protection & Financial Analytics';
      case 'copilot':
        return 'InsureX AI Copilot Workspace';
      case 'notifications':
        return 'Alerts & Notifications';
      case 'settings':
        return 'Account & App Settings';
      default:
        return 'InsureX Platform';
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-4 lg:px-8 py-3 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left Side: Brand Logo & Back Option */}
        <div className="flex items-center gap-4">
          {/* Main Brand Logo */}
          <div
            onClick={() => onNavigate('dashboard')}
            className="flex items-center gap-2.5 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 via-blue-500 to-emerald-400 p-0.5 shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center">
                <Shield className="w-5 h-5 text-blue-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-extrabold text-slate-900 tracking-tight">
                  Insure<span className="text-blue-600">X</span>
                </span>
                <span className="bg-blue-50 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-blue-200 uppercase tracking-wider">
                  AI Platform
                </span>
              </div>
              <p className="text-[10px] text-slate-500 font-medium hidden sm:block">
                Insurance. Reinvented with Intelligence.
              </p>
            </div>
          </div>

          {/* BACK ARROW BUTTON: Displayed on every sub-section to allow 1-click return to Dashboard */}
          {currentSection !== 'dashboard' && (
            <button
              onClick={() => onNavigate('dashboard')}
              className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs sm:text-sm px-3 py-1.5 rounded-xl border border-slate-200/80 transition-all shadow-xs hover:shadow-md hover:-translate-x-0.5"
              title="Return to Main Dashboard"
            >
              <ArrowLeft className="w-4 h-4 text-blue-600" />
              <span className="hidden xs:inline">Back to Dashboard</span>
            </button>
          )}
        </div>

        {/* Center / Title Indicator */}
        <div className="hidden md:flex items-center gap-2 bg-slate-50 border border-slate-200/60 rounded-full px-3.5 py-1 text-xs text-slate-600 font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>{getSectionTitle(currentSection)}</span>
        </div>

        {/* Right Side: Quick Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Coverage Score Badge */}
          <div
            onClick={() => onNavigate('coverage-gap')}
            className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-blue-50 to-emerald-50 border border-blue-200/70 hover:border-blue-400 rounded-xl px-3 py-1.5 cursor-pointer transition-all shadow-2xs hover:shadow-xs"
            title="View Coverage Gap Analysis"
          >
            <Zap className="w-4 h-4 text-emerald-600" />
            <div className="text-left">
              <div className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">
                Protection Score
              </div>
              <div className="text-xs font-extrabold text-slate-900">
                {coverageScore}<span className="text-[10px] text-slate-500 font-normal">/100</span>
              </div>
            </div>
          </div>

          {/* Emergency SOS Button */}
          <button
            onClick={onOpenSOS}
            className="flex items-center gap-1.5 bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700 text-white font-bold text-xs px-3 py-2 rounded-xl shadow-md shadow-red-600/25 hover:shadow-lg transition-all animate-pulse"
          >
            <AlertTriangle className="w-4 h-4" />
            <span className="hidden xs:inline uppercase tracking-wider text-[11px]">Emergency SOS</span>
          </button>

          {/* AI Copilot Trigger */}
          <button
            onClick={handleCopilotClick}
            className="flex items-center gap-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold text-xs px-3 py-2 rounded-xl border border-blue-200/80 transition-all shadow-xs hover:shadow-sm"
            title="Open AI Copilot"
          >
            <Bot className="w-4 h-4 text-blue-600" />
            <span className="hidden sm:inline">AI Copilot</span>
          </button>

          {/* Notifications Button */}
          <button
            onClick={() => onNavigate('notifications')}
            className="relative p-2 rounded-xl text-slate-600 hover:text-blue-600 hover:bg-slate-100 transition-all border border-transparent hover:border-slate-200"
            title="Notifications"
          >
            <Bell className="w-5 h-5" />
            {activeUnreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-xs animate-bounce">
                {activeUnreadCount}
              </span>
            )}
          </button>

          {/* User Profile Avatar */}
          <button
            onClick={() => onNavigate('settings')}
            className="flex items-center gap-2 p-1 rounded-xl hover:bg-slate-100 transition-all border border-transparent hover:border-slate-200"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-emerald-500 text-white font-bold text-xs flex items-center justify-center shadow-xs">
              AJ
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};
