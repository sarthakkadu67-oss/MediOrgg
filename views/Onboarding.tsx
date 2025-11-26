import React from 'react';
import { Button } from '../components/Button';
import { Activity } from 'lucide-react';

interface OnboardingProps {
  onComplete: () => void;
}

export const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 p-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-[-10%] right-[-10%] w-64 h-64 rounded-full bg-blue-200 opacity-20 blur-3xl animate-pulse"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-80 h-80 rounded-full bg-emerald-200 opacity-20 blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>

      <div className="flex-1 flex flex-col items-center justify-center text-center z-10">
        <div className="w-24 h-24 bg-white rounded-3xl shadow-2xl flex items-center justify-center mb-8 rotate-3 hover:rotate-6 transition-transform duration-500">
          <Activity size={48} className="text-blue-600" />
        </div>
        
        <h1 className="text-4xl font-extrabold text-slate-800 mb-4 tracking-tight">
          Medi<span className="text-blue-600">Org</span>
        </h1>
        
        <p className="text-lg text-slate-500 mb-8 max-w-xs leading-relaxed font-medium">
          Organize your health. Track hydration, movement, and rest with intelligent insights.
        </p>

        <div className="grid grid-cols-3 gap-4 mb-12 w-full max-w-xs opacity-90">
           <div className="flex flex-col items-center p-3 bg-white/60 rounded-2xl backdrop-blur-sm shadow-sm hover:-translate-y-1 transition-transform">
             <span className="text-2xl mb-1">💧</span>
             <span className="text-xs font-bold text-slate-600">Hydrate</span>
           </div>
           <div className="flex flex-col items-center p-3 bg-white/60 rounded-2xl backdrop-blur-sm shadow-sm hover:-translate-y-1 transition-transform delay-75">
             <span className="text-2xl mb-1">👣</span>
             <span className="text-xs font-bold text-slate-600">Move</span>
           </div>
           <div className="flex flex-col items-center p-3 bg-white/60 rounded-2xl backdrop-blur-sm shadow-sm hover:-translate-y-1 transition-transform delay-100">
             <span className="text-2xl mb-1">😴</span>
             <span className="text-xs font-bold text-slate-600">Rest</span>
           </div>
        </div>
      </div>

      <div className="w-full max-w-sm mx-auto mb-8 z-10">
        <Button onClick={onComplete} fullWidth className="shadow-blue-500/30 h-14 text-lg">
          Get Started
        </Button>
      </div>
    </div>
  );
};