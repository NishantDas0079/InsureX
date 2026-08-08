import React from 'react';
import {
  LayoutDashboard,
  Compass,
  Wallet,
  FileCheck2,
  FolderOpen,
  RefreshCw,
  Sparkles,
  LifeBuoy,
  ShieldCheck,
  Zap,
  BarChart3,
  Bot,
  Bell,
  Settings,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';
import { NavSection } from '../types';

interface SidebarNavProps {
  currentSection: NavSection;
  onNavigate: (section: NavSection) => void;
  collapsed?: boolean;
  isCollapsed?: boolean;
  onToggleCollapse: () => void;
  activeClaimsCount?: number;
  activePoliciesCount?: number;
  upcomingRenewalsCount?: number;
  coverageScore?: number;
}

export const SidebarNav: React.FC<SidebarNavProps> = ({
  currentSection,
  onNavigate,
  collapsed,
  isCollapsed,
  onToggleCollapse,
  activeClaimsCount = 0,
  activePoliciesCount,
  upcomingRenewalsCount = 0,
  coverageScore = 84,
}) => {
  const isCurrentlyCollapsed = isCollapsed ?? collapsed ?? false;
  const navItems = [
    { id: 'dashboard' as NavSection, label: 'Main Dashboard', icon: LayoutDashboard },
    { id: 'explore' as NavSection, label: 'Explore Insurance', icon: Compass, badge: 'AI Picks' },
    { id: 'policies' as NavSection, label: 'My Policies', icon: Wallet },
    {
      id: 'claims' as NavSection,
      label: 'Claims Center',
      icon: FileCheck2,
      badge: activeClaimsCount > 0 ? `${activeClaimsCount} Active` : undefined,
      badgeColor: 'bg-emerald-100 text-emerald-800',
    },
    { id: 'documents' as NavSection, label: 'Digital Vault', icon: FolderOpen },
    {
      id: 'renewals' as NavSection,
      label: 'Renewals',
      icon: RefreshCw,
      badge: upcomingRenewalsCount > 0 ? `${upcomingRenewalsCount} Due` : undefined,
      badgeColor: 'bg-amber-100 text-amber-800',
    },
    { id: 'lifestage' as NavSection, label: 'Life Stage Planner', icon: Sparkles, badge: 'New AI' },
    { id: 'ecosystem' as NavSection, label: 'Ecosystem Services', icon: LifeBuoy },
    { id: 'transparency' as NavSection, label: 'Trust & Transparency', icon: ShieldCheck },
    { id: 'coverage-gap' as NavSection, label: 'Coverage Gap Analysis', icon: Zap, badge: 'Score 84' },
    { id: 'analytics' as NavSection, label: 'Analytics Dashboard', icon: BarChart3 },
    { id: 'copilot' as NavSection, label: 'AI Copilot Chat', icon: Bot },
    { id: 'notifications' as NavSection, label: 'Notifications', icon: Bell },
    { id: 'settings' as NavSection, label: 'Settings & Profile', icon: Settings },
  ];

  return (
    <aside
      className={`bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-2xl shadow-xs flex flex-col justify-between transition-all duration-300 z-30 shrink-0 ${
        isCurrentlyCollapsed ? 'w-16 lg:w-20' : 'w-64'
      }`}
    >
      <div className="p-3 flex flex-col gap-1 overflow-y-auto max-h-[calc(100vh-100px)]">
        {/* Toggle Collapse Button */}
        <button
          onClick={onToggleCollapse}
          className="self-end p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl mb-2 transition-all hidden lg:block border border-transparent hover:border-slate-200"
          title={isCurrentlyCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {isCurrentlyCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </button>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentSection === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all group relative ${
                isActive
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20 font-semibold'
                  : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900'
              }`}
              title={isCurrentlyCollapsed ? item.label : undefined}
            >
              <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-white' : 'text-slate-500 group-hover:text-blue-600'}`} />

              {!isCurrentlyCollapsed && <span className="truncate flex-1 text-left">{item.label}</span>}

              {!isCurrentlyCollapsed && item.badge && (
                <span
                  className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                    item.badgeColor
                      ? item.badgeColor
                      : isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-blue-50 text-blue-700 border border-blue-200'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Footer Info Box in Sidebar */}
      {!isCurrentlyCollapsed && (
        <div className="p-3 m-3 bg-gradient-to-br from-blue-50 to-emerald-50 rounded-xl border border-blue-200/60 text-xs shadow-2xs">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span className="font-bold text-slate-900">InsureX AI Active</span>
          </div>
          <p className="text-[11px] text-slate-600 leading-tight">
            24/7 Policy Guardian monitoring 8 active claims & renewals.
          </p>
        </div>
      )}
    </aside>
  );
};
