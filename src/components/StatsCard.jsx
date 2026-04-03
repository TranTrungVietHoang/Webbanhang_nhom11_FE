import React from 'react';
import { TrendingUp, Gift, Target, Flame, Award } from 'lucide-react';

const icons = {
  points: TrendingUp,
  rewards: Gift,
  missions: Target,
  streak: Flame,
  award: Award,
};

const colors = {
  points: 'text-blue-600 bg-blue-50 border-blue-100',
  rewards: 'text-emerald-600 bg-emerald-50 border-emerald-100',
  missions: 'text-purple-600 bg-purple-50 border-purple-100',
  streak: 'text-rose-600 bg-rose-50 border-rose-100',
  award: 'text-amber-600 bg-amber-50 border-amber-100',
};

const StatsCard = ({ label, value, type }) => {
  const Icon = icons[type] || Target;
  const colorClasses = colors[type] || colors.missions;

  return (
    <div className="p-5 rounded-2xl border border-slate-100 flex items-center justify-between shadow-sm bg-white hover:shadow-lg transition-all duration-300 group">
      <div className="space-y-1">
        <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">{label}</p>
        <p className="text-2xl font-black text-slate-800 tracking-tighter">{value}</p>
      </div>
      <div className={`p-4 rounded-2xl transition-transform group-hover:scale-110 group-hover:rotate-6 ${colorClasses}`}>
        <Icon className="w-7 h-7" />
      </div>
    </div>
  );
};

export default StatsCard;
