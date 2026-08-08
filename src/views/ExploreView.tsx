import React, { useState } from 'react';
import {
  Compass,
  Heart,
  Car,
  Plane,
  Home,
  Shield,
  Smartphone,
  Briefcase,
  Dog,
  Sparkles,
  Star,
  CheckCircle2,
  ArrowRight,
  Filter,
} from 'lucide-react';
import { Policy, PolicyCategory } from '../types';

interface ExploreViewProps {
  onSelectPolicyDetail: (policy: Policy) => void;
}

export const ExploreView: React.FC<ExploreViewProps> = ({ onSelectPolicyDetail }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'All', label: 'All Insurance', icon: Compass },
    { id: 'Health', label: 'Health Care', icon: Heart },
    { id: 'Motor', label: 'Motor & EV', icon: Car },
    { id: 'Travel', label: 'Global Travel', icon: Plane },
    { id: 'Home', label: 'Home Sanctuary', icon: Home },
    { id: 'Life', label: 'Term Life', icon: Shield },
    { id: 'Gadget', label: 'Tech & Gadget', icon: Smartphone },
    { id: 'Business', label: 'Startup & Cyber', icon: Briefcase },
    { id: 'Pet', label: 'Pet Guardian', icon: Dog },
  ];

  const explorePlans: Policy[] = [
    {
      id: 'exp-1',
      category: 'Health',
      name: 'Health Secure Ultra',
      provider: 'InsureX Shield Care',
      policyNumber: 'HLT-PLAN-99',
      coverageAmount: 500000,
      monthlyPremium: 85,
      annualPremium: 980,
      startDate: '2026-01-01',
      expiryDate: '2027-01-01',
      status: 'Active',
      deductible: 500,
      claimSettlementRatio: 99.1,
      coveredMembers: ['Family Floater (Up to 4 Members)'],
      keyBenefits: [
        'Cashless hospitalization at 12,000+ network hospitals',
        'Zero co-pay for room rent & ICU',
        '24/7 Unlimited Telemedicine Consults',
      ],
      exclusions: ['Cosmetic Surgery'],
      aiRecommendationBadge: 'Top Family Pick',
      iconName: 'HeartPulse',
      autoRenew: true,
      documentsCount: 4,
    },
    {
      id: 'exp-2',
      category: 'Motor',
      name: 'Auto Guardian EV Comprehensive',
      provider: 'InsureX Drive Safe',
      policyNumber: 'MTR-PLAN-88',
      coverageAmount: 45000,
      monthlyPremium: 62,
      annualPremium: 710,
      startDate: '2026-01-01',
      expiryDate: '2027-01-01',
      status: 'Active',
      deductible: 250,
      claimSettlementRatio: 98.8,
      coveredMembers: ['Electric & Hybrid Vehicles'],
      keyBenefits: [
        'Zero Depreciation coverage on EV battery & composite parts',
        '24/7 Roadside Assistance & Towing up to 100 miles',
      ],
      exclusions: ['Driving without license'],
      aiRecommendationBadge: 'EV Optimized',
      iconName: 'Car',
      autoRenew: true,
      documentsCount: 3,
    },
    {
      id: 'exp-3',
      category: 'Travel',
      name: 'Global Nomad Worldwide Pass',
      provider: 'InsureX Voyage',
      policyNumber: 'TRV-PLAN-77',
      coverageAmount: 100000,
      monthlyPremium: 18,
      annualPremium: 200,
      startDate: '2026-01-01',
      expiryDate: '2026-12-31',
      status: 'Active',
      deductible: 50,
      claimSettlementRatio: 98.4,
      coveredMembers: ['Individual Traveler'],
      keyBenefits: [
        'Worldwide emergency medical evacuation ($100k)',
        'Flight cancellation & luggage delay reimbursement',
      ],
      exclusions: ['Unapproved war zones'],
      aiRecommendationBadge: 'Frequent Traveler Favorite',
      iconName: 'Plane',
      autoRenew: false,
      documentsCount: 1,
    },
    {
      id: 'exp-4',
      category: 'Home',
      name: 'Home Sanctuary Property Shield',
      provider: 'InsureX Haven',
      policyNumber: 'HOM-PLAN-66',
      coverageAmount: 350000,
      monthlyPremium: 32,
      annualPremium: 360,
      startDate: '2026-01-01',
      expiryDate: '2027-01-01',
      status: 'Active',
      deductible: 500,
      claimSettlementRatio: 97.9,
      coveredMembers: ['Residential Structure & Contents'],
      keyBenefits: [
        'Structure coverage against earthquake, fire & flood',
        'Home electronics & valuble contents theft protection',
      ],
      exclusions: ['Intentional damage'],
      aiRecommendationBadge: 'Property Guard',
      iconName: 'Home',
      autoRenew: true,
      documentsCount: 2,
    },
    {
      id: 'exp-5',
      category: 'Life',
      name: 'Term Life Vantage 360',
      provider: 'InsureX Life Heritage',
      policyNumber: 'LIF-PLAN-55',
      coverageAmount: 1500000,
      monthlyPremium: 48,
      annualPremium: 550,
      startDate: '2026-01-01',
      expiryDate: '2056-01-01',
      status: 'Active',
      deductible: 0,
      claimSettlementRatio: 99.5,
      coveredMembers: ['Insured & Family Beneficiary'],
      keyBenefits: [
        'Critical Illness diagnosis rider payout ($250k)',
        'Tax savings under Section 80C / 10D',
      ],
      exclusions: ['Suicide in year 1'],
      aiRecommendationBadge: 'Essential Life Net',
      iconName: 'Shield',
      autoRenew: true,
      documentsCount: 5,
    },
    {
      id: 'exp-6',
      category: 'Gadget',
      name: 'Tech Armor Pro Protection',
      provider: 'InsureX Byte Care',
      policyNumber: 'GDT-PLAN-44',
      coverageAmount: 3500,
      monthlyPremium: 12,
      annualPremium: 130,
      startDate: '2026-01-01',
      expiryDate: '2027-01-01',
      status: 'Active',
      deductible: 75,
      claimSettlementRatio: 99.0,
      coveredMembers: ['Laptops, Phones & Tablets'],
      keyBenefits: [
        'Liquid spill, drop crack & screen damage',
        'Worldwide theft protection with instant claim payout',
      ],
      exclusions: ['Cosmetic scuffs'],
      aiRecommendationBadge: 'Instant Gadget Care',
      iconName: 'Smartphone',
      autoRenew: true,
      documentsCount: 2,
    },
    {
      id: 'exp-7',
      category: 'Pet',
      name: 'Paws & Tail Vet Shield',
      provider: 'InsureX PetCare',
      policyNumber: 'PET-PLAN-33',
      coverageAmount: 15000,
      monthlyPremium: 22,
      annualPremium: 240,
      startDate: '2026-01-01',
      expiryDate: '2027-01-01',
      status: 'Active',
      deductible: 100,
      claimSettlementRatio: 98.2,
      coveredMembers: ['Dogs & Cats'],
      keyBenefits: ['90% Vet bill reimbursement', 'Hereditary condition cover & 24/7 Tele-vet chat'],
      exclusions: ['Pre-existing conditions'],
      aiRecommendationBadge: 'Best for Canines',
      iconName: 'Dog',
      autoRenew: true,
      documentsCount: 2,
    },
    {
      id: 'exp-8',
      category: 'Business',
      name: 'Startup Cyber & Liability Shield',
      provider: 'InsureX Enterprise',
      policyNumber: 'BUS-PLAN-22',
      coverageAmount: 1000000,
      monthlyPremium: 145,
      annualPremium: 1600,
      startDate: '2026-01-01',
      expiryDate: '2027-01-01',
      status: 'Active',
      deductible: 1000,
      claimSettlementRatio: 99.4,
      coveredMembers: ['SMEs & Startups'],
      keyBenefits: ['Ransomware cyber data breach liability', 'General commercial third-party liability'],
      exclusions: ['Gross negligence'],
      aiRecommendationBadge: 'SME Cyber Standard',
      iconName: 'Briefcase',
      autoRenew: true,
      documentsCount: 3,
    },
  ];

  const filteredPlans = explorePlans.filter((plan) => {
    const matchesCategory = selectedCategory === 'All' || plan.category === selectedCategory;
    const matchesSearch =
      plan.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      plan.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Header */}
      <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Explore Insurance Plans</h1>
          <p className="text-xs text-slate-500">
            AI-Engineered protection policies with transparent settlement ratios & zero hidden clauses
          </p>
        </div>

        {/* Search Input */}
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search Health, Motor, EV, Cyber..."
          className="bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 text-xs text-slate-800 w-full md:w-72 focus:outline-none focus:border-blue-500"
        />
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = selectedCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold shrink-0 transition-all ${
                isActive
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                  : 'bg-white border border-slate-200/80 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPlans.map((plan) => (
          <div
            key={plan.id}
            className="bg-white border border-slate-200/80 hover:border-blue-300 rounded-3xl p-6 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between group space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="bg-blue-50 text-blue-700 border border-blue-200 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase">
                  {plan.category}
                </span>
                {plan.aiRecommendationBadge && (
                  <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-emerald-600" /> {plan.aiRecommendationBadge}
                  </span>
                )}
              </div>

              <div>
                <h3 className="text-base font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {plan.name}
                </h3>
                <p className="text-xs text-slate-500 font-medium">{plan.provider}</p>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-2 gap-2 bg-slate-50 rounded-2xl p-3 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase font-bold">Sum Insured</span>
                  <span className="font-black text-slate-900">${plan.coverageAmount.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase font-bold">Claim Ratio</span>
                  <span className="font-black text-emerald-600">{plan.claimSettlementRatio}%</span>
                </div>
              </div>

              {/* Key Benefits */}
              <div className="space-y-1.5">
                <div className="text-[10px] font-bold text-slate-400 uppercase">Key Benefits:</div>
                {plan.keyBenefits.map((b, i) => (
                  <div key={i} className="text-xs text-slate-700 flex items-start gap-1.5 leading-tight">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Price & Action */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-lg font-black text-blue-700">${plan.monthlyPremium}</span>
                <span className="text-xs text-slate-500 font-normal"> / month</span>
              </div>

              <button
                onClick={() => onSelectPolicyDetail(plan)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md transition-all flex items-center gap-1.5 uppercase tracking-wider"
              >
                View & Customize <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
