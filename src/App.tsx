import React, { useState } from 'react';
import { NavSection, Policy, Claim, DocumentItem } from './types';
import { INITIAL_POLICIES, INITIAL_CLAIMS, INITIAL_DOCUMENTS } from './mockData';
import { Header } from './components/Header';
import { SidebarNav } from './components/SidebarNav';
import { EmergencySOSModal } from './components/EmergencySOSModal';
import { AICopilotDrawer } from './components/AICopilotDrawer';
import { PolicyDetailModal } from './components/PolicyDetailModal';
import { ClaimFilingModal } from './components/ClaimFilingModal';
import { AddDocumentModal } from './components/AddDocumentModal';

// Views
import { DashboardView } from './views/DashboardView';
import { ExploreView } from './views/ExploreView';
import { MyPoliciesView } from './views/MyPoliciesView';
import { ClaimsCenterView } from './views/ClaimsCenterView';
import { DocumentsView } from './views/DocumentsView';
import { RenewalsView } from './views/RenewalsView';
import { LifeStagePlannerView } from './views/LifeStagePlannerView';
import { EcosystemView } from './views/EcosystemView';
import { TransparencyView } from './views/TransparencyView';
import { CoverageGapView } from './views/CoverageGapView';
import { AnalyticsView } from './views/AnalyticsView';
import { NotificationsView } from './views/NotificationsView';
import { AICopilotView } from './views/AICopilotView';
import { SettingsView } from './views/SettingsView';

export function App() {
  const [currentSection, setCurrentSection] = useState<NavSection>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // App State
  const [policies, setPolicies] = useState<Policy[]>(INITIAL_POLICIES);
  const [claims, setClaims] = useState<Claim[]>(INITIAL_CLAIMS);
  const [documents, setDocuments] = useState<DocumentItem[]>(INITIAL_DOCUMENTS);
  const [coverageScore, setCoverageScore] = useState<number>(84);

  // Modals & Drawers
  const [isSOSOpen, setIsSOSOpen] = useState(false);
  const [isCopilotOpen, setIsCopilotOpen] = useState(false);
  const [isClaimModalOpen, setIsClaimModalOpen] = useState(false);
  const [isAddDocModalOpen, setIsAddDocModalOpen] = useState(false);
  const [selectedDetailPolicy, setSelectedDetailPolicy] = useState<Policy | null>(null);

  // Handlers
  const handleNavigate = (section: NavSection) => {
    setCurrentSection(section);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRenewPolicy = (policy: Policy) => {
    setPolicies((prev) =>
      prev.map((p) =>
        p.id === policy.id
          ? {
              ...p,
              status: 'Active',
              expiryDate: '2028-01-01',
            }
          : p
      )
    );
  };

  const handlePurchasePolicy = (newPolicy: Policy) => {
    setPolicies((prev) => [newPolicy, ...prev]);
    setCoverageScore((prev) => Math.min(100, prev + 5));
    alert(`Congratulations! ${newPolicy.name} is now active in your Digital Wallet.`);
  };

  const handleSubmitClaim = (newClaim: Claim) => {
    setClaims((prev) => [newClaim, ...prev]);
  };

  const handleAddDocument = (newDoc: DocumentItem) => {
    setDocuments((prev) => [newDoc, ...prev]);
  };

  return (
    <div className="min-h-screen bg-slate-50/70 font-sans text-slate-800 flex flex-col selection:bg-blue-600 selection:text-white">
      {/* Top Main Navigation Header */}
      <Header
        currentSection={currentSection}
        onNavigate={handleNavigate}
        onOpenSOS={() => setIsSOSOpen(true)}
        onOpenCopilot={() => setIsCopilotOpen(true)}
        notificationCount={3}
      />

      {/* Main Layout Container */}
      <div className="flex-1 flex max-w-[1600px] w-full mx-auto px-2 sm:px-4 lg:px-6 pt-4 gap-4">
        {/* Collapsible Sidebar Navigation */}
        <SidebarNav
          currentSection={currentSection}
          onNavigate={handleNavigate}
          isCollapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
          activePoliciesCount={policies.length}
          activeClaimsCount={claims.filter((c) => c.status !== 'Disbursed').length}
          coverageScore={coverageScore}
        />

        {/* Main Workspace Body Content */}
        <main className="flex-1 min-w-0 transition-all">
          {currentSection === 'dashboard' && (
            <DashboardView
              policies={policies}
              claims={claims}
              coverageScore={coverageScore}
              onNavigate={handleNavigate}
              onOpenSOS={() => setIsSOSOpen(true)}
              onOpenClaimModal={() => setIsClaimModalOpen(true)}
              onSelectPolicyDetail={(p) => setSelectedDetailPolicy(p)}
            />
          )}

          {currentSection === 'explore' && (
            <ExploreView onSelectPolicyDetail={(p) => setSelectedDetailPolicy(p)} />
          )}

          {currentSection === 'policies' && (
            <MyPoliciesView
              policies={policies}
              onRenewPolicy={handleRenewPolicy}
              onFileClaimForPolicy={(p) => {
                setSelectedDetailPolicy(null);
                setIsClaimModalOpen(true);
              }}
              onSelectPolicyDetail={(p) => setSelectedDetailPolicy(p)}
            />
          )}

          {currentSection === 'claims' && (
            <ClaimsCenterView
              claims={claims}
              onOpenClaimModal={() => setIsClaimModalOpen(true)}
              onOpenCopilot={() => setIsCopilotOpen(true)}
            />
          )}

          {currentSection === 'documents' && (
            <DocumentsView documents={documents} onOpenAddModal={() => setIsAddDocModalOpen(true)} />
          )}

          {currentSection === 'renewals' && (
            <RenewalsView policies={policies} onRenewPolicy={handleRenewPolicy} />
          )}

          {currentSection === 'lifestage' && (
            <LifeStagePlannerView onSelectPolicyDetail={(p) => setSelectedDetailPolicy(p)} />
          )}

          {currentSection === 'ecosystem' && (
            <EcosystemView onNavigate={handleNavigate} onOpenSOS={() => setIsSOSOpen(true)} />
          )}

          {currentSection === 'transparency' && <TransparencyView />}

          {currentSection === 'coverage-gap' && (
            <CoverageGapView
              score={coverageScore}
              onUpdateScore={(newScore) => setCoverageScore(newScore)}
            />
          )}

          {currentSection === 'analytics' && <AnalyticsView />}

          {currentSection === 'notifications' && <NotificationsView />}

          {currentSection === 'copilot' && <AICopilotView />}

          {currentSection === 'settings' && <SettingsView />}
        </main>
      </div>

      {/* Global Modals & Drawers */}
      <EmergencySOSModal isOpen={isSOSOpen} onClose={() => setIsSOSOpen(false)} />

      <AICopilotDrawer isOpen={isCopilotOpen} onClose={() => setIsCopilotOpen(false)} />

      <PolicyDetailModal
        policy={selectedDetailPolicy}
        isOpen={selectedDetailPolicy !== null}
        onClose={() => setSelectedDetailPolicy(null)}
        onBuyNow={handlePurchasePolicy}
      />

      <ClaimFilingModal
        policies={policies}
        isOpen={isClaimModalOpen}
        onClose={() => setIsClaimModalOpen(false)}
        onSubmitClaim={handleSubmitClaim}
      />

      <AddDocumentModal
        isOpen={isAddDocModalOpen}
        onClose={() => setIsAddDocModalOpen(false)}
        onAddDocument={handleAddDocument}
      />
    </div>
  );
}

export default App;
