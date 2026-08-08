import React, { useState } from 'react';
import {
  AlertTriangle,
  X,
  PhoneCall,
  MapPin,
  Ambulance,
  Car,
  Home,
  Plane,
  Wrench,
  CheckCircle2,
  Clock,
  Hospital,
  ShieldAlert,
  ArrowRight,
  Radio,
} from 'lucide-react';

interface EmergencySOSModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTriggerClaim: (type: string) => void;
}

export const EmergencySOSModal: React.FC<EmergencySOSModalProps> = ({
  isOpen,
  onClose,
  onTriggerClaim,
}) => {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [isGpsShared, setIsGpsShared] = useState<boolean>(true);
  const [dispatchStatus, setDispatchStatus] = useState<'idle' | 'dispatching' | 'dispatched'>('idle');

  if (!isOpen) return null;

  const emergencyTypes = [
    {
      id: 'medical',
      title: 'Medical Emergency',
      icon: Ambulance,
      color: 'from-rose-500 to-red-600',
      description: 'Cashless ER admission, ambulance dispatch & medical pre-authorization.',
      hotline: '1-800-555-ER-911',
      nearbyText: 'UCSF Medical Center (0.8 miles) - Cashless Approved',
    },
    {
      id: 'road',
      title: 'Road Accident',
      icon: Car,
      color: 'from-amber-500 to-orange-600',
      description: 'Police report support, instant photo evidence upload & towing dispatch.',
      hotline: '1-800-555-ROAD-911',
      nearbyText: 'Tesla Authorized Care Garage (1.2 miles)',
    },
    {
      id: 'home',
      title: 'Home Emergency',
      icon: Home,
      color: 'from-blue-600 to-indigo-600',
      description: 'Burst pipe, fire hazard, structural collapse or break-in locksmith.',
      hotline: '1-800-555-HOME-911',
      nearbyText: 'HandyGuard Emergency Squad (15 mins arrival)',
    },
    {
      id: 'travel',
      title: 'Travel Emergency',
      icon: Plane,
      color: 'from-purple-600 to-indigo-700',
      description: 'Overseas ER, lost passport evacuation, & flight cancellation aid.',
      hotline: '+1-800-555-GLOBAL',
      nearbyText: 'Global Travel Medevac Desk Active',
    },
    {
      id: 'breakdown',
      title: 'Vehicle Breakdown',
      icon: Wrench,
      color: 'from-emerald-600 to-teal-700',
      description: 'EV battery depletion, flat tire, key lockout & 100-mile towing.',
      hotline: '1-800-555-TOW-AUTO',
      nearbyText: 'InsureX FleetAssist Tow Truck (8 mins away)',
    },
  ];

  const handleDispatch = () => {
    setDispatchStatus('dispatching');
    setTimeout(() => {
      setDispatchStatus('dispatched');
    }, 1500);
  };

  const currentEmergency = emergencyTypes.find((e) => e.id === selectedType) || emergencyTypes[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-md p-4 animate-fadeIn">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-red-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-rose-600 via-red-600 to-amber-600 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/20 rounded-2xl animate-pulse">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-black tracking-tight">InsureX Emergency SOS Center</h2>
              <p className="text-xs text-rose-100 font-medium">
                1-Tap Medical, Road, Home & Travel Emergency Dispatch
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/20 text-white transition-all"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* GPS Location Bar */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <MapPin className="w-5 h-5 text-rose-600 shrink-0 animate-bounce" />
              <div>
                <div className="text-xs font-bold text-slate-800">Your Current GPS Position</div>
                <div className="text-[11px] text-slate-500 font-mono">
                  37.7749° N, 122.4194° W — San Francisco, CA (High Accuracy)
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsGpsShared(!isGpsShared)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                isGpsShared
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  : 'bg-slate-200 text-slate-600'
              }`}
            >
              {isGpsShared ? '✓ Live Shared' : 'Share GPS'}
            </button>
          </div>

          {!selectedType ? (
            /* Emergency Type Selector */
            <div>
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                Select Emergency Category for Instant Action
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {emergencyTypes.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setSelectedType(item.id)}
                      className="flex items-start gap-3 p-4 rounded-2xl border border-slate-200 hover:border-red-400 bg-white hover:bg-rose-50/50 transition-all text-left group shadow-xs hover:shadow-md"
                    >
                      <div
                        className={`p-3 rounded-xl bg-gradient-to-br ${item.color} text-white shadow-sm shrink-0 group-hover:scale-105 transition-transform`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-900 group-hover:text-red-700">
                          {item.title}
                        </div>
                        <div className="text-xs text-slate-500 mt-1 leading-snug">
                          {item.description}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            /* Active Emergency Workflow Details */
            <div className="space-y-5 animate-fadeIn">
              <button
                onClick={() => {
                  setSelectedType(null);
                  setDispatchStatus('idle');
                }}
                className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
              >
                ← Choose Different Emergency Category
              </button>

              <div className="bg-gradient-to-r from-rose-50 to-amber-50 border border-rose-200 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className={`p-3.5 rounded-2xl bg-gradient-to-br ${currentEmergency.color} text-white`}>
                    <currentEmergency.icon className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">{currentEmergency.title}</h3>
                    <p className="text-xs text-slate-600">{currentEmergency.nearbyText}</p>
                  </div>
                </div>

                <a
                  href={`tel:${currentEmergency.hotline}`}
                  className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs px-5 py-3 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition-all uppercase tracking-wider"
                >
                  <PhoneCall className="w-4 h-4 animate-bounce" />
                  Call Hotline ({currentEmergency.hotline})
                </a>
              </div>

              {/* Action Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* 1-Tap Dispatch Button */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col justify-between">
                  <div>
                    <div className="text-xs font-bold text-slate-800 flex items-center gap-2">
                      <Radio className="w-4 h-4 text-rose-600 animate-pulse" />
                      1-Tap Dispatch Rescue Unit
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                      Transmits GPS coordinates to nearest response team & pre-authorizes emergency billing.
                    </p>
                  </div>

                  {dispatchStatus === 'idle' && (
                    <button
                      onClick={handleDispatch}
                      className="mt-4 w-full bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs py-2.5 rounded-xl transition-all shadow-md"
                    >
                      Dispatch Now
                    </button>
                  )}

                  {dispatchStatus === 'dispatching' && (
                    <div className="mt-4 w-full bg-amber-500 text-white font-bold text-xs py-2.5 rounded-xl text-center animate-pulse flex items-center justify-center gap-2">
                      <Clock className="w-4 h-4 animate-spin" /> Locating Nearest Unit...
                    </div>
                  )}

                  {dispatchStatus === 'dispatched' && (
                    <div className="mt-4 w-full bg-emerald-600 text-white font-bold text-xs py-2.5 rounded-xl text-center flex items-center justify-center gap-2">
                      <CheckCircle2 className="w-4 h-4" /> Unit #EV-902 En Route (4 mins)
                    </div>
                  )}
                </div>

                {/* Instant Claim Initiation */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col justify-between">
                  <div>
                    <div className="text-xs font-bold text-slate-800 flex items-center gap-2">
                      <ShieldAlert className="w-4 h-4 text-blue-600" />
                      Instant Emergency Claim Pre-Filing
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                      Creates a priority emergency claim ticket for cashless network hospital or garage settlement.
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      onClose();
                      onTriggerClaim(currentEmergency.id);
                    }}
                    className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-2.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5"
                  >
                    Initiate Priority Claim <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-50 border-t border-slate-200 p-4 flex items-center justify-between text-xs text-slate-500">
          <span className="flex items-center gap-1.5">
            <ShieldAlert className="w-4 h-4 text-emerald-600" />
            24/7 InsureX Emergency Global Desk Active
          </span>
          <button
            onClick={onClose}
            className="text-slate-700 font-bold hover:underline"
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
};
