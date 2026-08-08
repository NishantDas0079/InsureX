export type NavSection =
  | 'dashboard'
  | 'explore'
  | 'policies'
  | 'claims'
  | 'documents'
  | 'renewals'
  | 'lifestage'
  | 'ecosystem'
  | 'transparency'
  | 'coverage-gap'
  | 'analytics'
  | 'copilot'
  | 'notifications'
  | 'settings';

export type PolicyCategory =
  | 'Health'
  | 'Motor'
  | 'Travel'
  | 'Home'
  | 'Life'
  | 'Gadget'
  | 'Business'
  | 'Pet';

export interface Policy {
  id: string;
  category: PolicyCategory;
  name: string;
  provider: string;
  policyNumber: string;
  coverageAmount: number;
  monthlyPremium: number;
  annualPremium: number;
  startDate: string;
  expiryDate: string;
  status: 'Active' | 'Expiring Soon' | 'Claim Active' | 'Expired';
  deductible: number;
  claimSettlementRatio: number;
  coveredMembers: string[];
  keyBenefits: string[];
  exclusions: string[];
  aiRecommendationBadge?: string;
  iconName: string;
  autoRenew: boolean;
  documentsCount: number;
}

export interface Claim {
  id: string;
  claimNumber: string;
  policyId: string;
  policyName: string;
  category: PolicyCategory;
  incidentType: string;
  incidentDate: string;
  claimAmount: number;
  approvedAmount?: number;
  status: 'Submitted' | 'AI Verified' | 'Adjuster Review' | 'Approved' | 'Disbursed' | 'Rejected';
  estimatedSettlementTime: string;
  fraudRiskLevel: 'Low Risk' | 'Medium Risk' | 'High Risk';
  timeline: {
    title: string;
    description: string;
    timestamp: string;
    completed: boolean;
    current?: boolean;
  }[];
  uploadedDocuments: string[];
  notes?: string;
}

export interface DocumentItem {
  id: string;
  title: string;
  category: 'Certificate' | 'Invoice' | 'Medical Report' | 'Vehicle Papers' | 'Claim Doc';
  policyName: string;
  uploadDate: string;
  fileSize: string;
  fileType: string;
  aiSummary?: string;
  url?: string;
}

export interface LifeStageEvent {
  id: string;
  title: string;
  icon: string;
  description: string;
  badge: string;
  recommendedPolicies: {
    category: PolicyCategory;
    name: string;
    reason: string;
    estimatedPremium: number;
    coverageAmount: number;
  }[];
  lifeTips: string[];
}

export interface EcosystemService {
  id: string;
  title: string;
  category: 'Health' | 'Motor' | 'Home' | 'Travel' | 'Emergency';
  icon: string;
  description: string;
  partnerName: string;
  discountOrPerk: string;
  actionText: string;
  rating: number;
  locationDependent: boolean;
}

export interface CoverageGap {
  id: string;
  title: string;
  category: PolicyCategory;
  missingFeature: string;
  currentRisk: string;
  recommendedAddon: string;
  estimatedMonthlyCost: number;
  protectionScoreImpact: number;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'renewal' | 'claim' | 'payment' | 'ai' | 'emergency' | 'weather';
  read: boolean;
  actionLink?: NavSection;
}

export interface CopilotMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  suggestedActions?: {
    label: string;
    action: () => void;
  }[];
  relatedData?: any;
}
