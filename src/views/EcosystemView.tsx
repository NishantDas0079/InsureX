import React from 'react';
import {
  LifeBuoy,
  Stethoscope,
  Wrench,
  Truck,
  Hammer,
  Hospital,
  Compass,
  Activity,
  Star,
  MapPin,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { ECOSYSTEM_SERVICES } from '../mockData';
import { EcosystemService, NavSection } from '../types';

interface EcosystemViewProps {
  onNavigate: (section: NavSection) => void;
  onOpenSOS: () => void;
}

export const EcosystemView: React.FC<EcosystemViewProps> = ({ onNavigate, onOpenSOS }) => {
  const getEcoIcon = (iconName: string) => {
    switch (iconName) {
      case 'Stethoscope':
        return Stethoscope;
      case 'Wrench':
        return Wrench;
      case 'Truck':
        return Truck;
      case 'Hammer':
        return Hammer;
      case 'Hospital':
        return Hospital;
      case 'Compass':
        return Compass;
      case 'Activity':
        return Activity;
      default:
        return LifeBuoy;
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-teal-900 via-emerald-900 to-blue-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-200 border border-emerald-400/30 text-xs font-semibold px-3 py-1 rounded-full">
            <LifeBuoy className="w-3.5 h-3.5 text-emerald-300 animate-pulse" />
            <span>Smart Protection Ecosystem</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Partner Services & Assistance Network
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100 max-w-2xl leading-relaxed">
            InsureX connects your policies to 24/7 Telemedicine, Cashless EV Garages, 1-Tap Roadside Towing, and Emergency Network Hospitals.
          </p>
        </div>
      </div>

      {/* Integrated Journey Example Strip */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
          <div>
            <span className="font-bold text-slate-900">Connected Insurance Journeys:</span>
            <span className="text-slate-500 ml-1">
              Motor Policy → Cashless Garage → Tow Truck → Instant Claim Settlement
            </span>
          </div>
        </div>

        <button
          onClick={onOpenSOS}
          className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs px-4 py-2 rounded-xl transition-all shrink-0 uppercase tracking-wider"
        >
          Open Emergency SOS
        </button>
      </div>

      {/* Ecosystem Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ECOSYSTEM_SERVICES.map((service) => {
          const Icon = getEcoIcon(service.icon);

          return (
            <div
              key={service.id}
              className="bg-white border border-slate-200/80 hover:border-emerald-300 rounded-3xl p-6 shadow-xs hover:shadow-lg transition-all space-y-4 flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase">
                    {service.category} Service
                  </span>
                  <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> {service.rating}
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 font-bold group-hover:scale-105 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-slate-900">{service.title}</h3>
                    <p className="text-xs text-slate-500 font-medium">{service.partnerName}</p>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">{service.description}</p>

                <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-xl p-2.5 text-xs text-emerald-900 font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{service.discountOrPerk}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100">
                <button
                  onClick={() => alert(`Launching ${service.title}... Connecting with ${service.partnerName}`)}
                  className="w-full bg-slate-900 hover:bg-emerald-700 text-white font-extrabold text-xs py-2.5 rounded-xl transition-all shadow-xs flex items-center justify-center gap-2 uppercase tracking-wider"
                >
                  {service.actionText} <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
