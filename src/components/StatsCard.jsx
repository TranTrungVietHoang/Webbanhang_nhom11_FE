import React from 'react';
import { TrendingUp, Gift, Target, Flame } from 'lucide-react';

const icons = {
  points: TrendingUp,
  rewards: Gift,
  missions: Target,
  streak: Flame,
};

const colors = {
  points: 'text-blue-600 bg-blue-50 border-blue-100',
  rewards: 'text-emerald-600 bg-emerald-50 border-emerald-100',
  missions: 'text-purple-600 bg-purple-50 border-purple-100',
  streak: 'text-rose-600 bg-rose-50 border-rose-100',
};

const StatsCard = ({ label, value, type }) => {
  const Icon = icons[type];
  const colorClasses = colors[type];

  return (
    <div className={`p-5 rounded-2xl border flex items-center justify-between shadow-sm bg-white hover:shadow-md transition-all`}>
      <div className="space-y-1">
        <p className="text-slate-500 font-medium text-sm">{label}</p>
        <p className={`text-2xl font-bold`}>{value}</p>
      </div>
      <div className={`p-4 rounded-xl ${colorClasses.split(' ')[1]} ${colorClasses.split(' ')[0]}`}>
        <Icon className="w-7 h-7" />
      </div>
    </div>
  );
};

export default StatsCard;
