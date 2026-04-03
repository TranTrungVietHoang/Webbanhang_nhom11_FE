import React from 'react';
import { Users, UserCheck, UserX } from 'lucide-react';

const StatItem = ({ title, value, icon: Icon, colorClass }) => (
  <div className="bg-gray-200 p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-6 flex-1 min-w-[280px]">
    <div className={`p-4 rounded-full ${colorClass} text-white shadow-md`}>
      <Icon size={40} strokeWidth={2.5}/>
    </div>
    <div>
      <h3 className="text-xl font-black italic uppercase tracking-tighter text-black leading-none mb-1">{title}</h3>
      <p className="text-3xl font-black tracking-tight text-gray-900">{value.toLocaleString()}</p>
    </div>
  </div>
);

const CustomerStats = ({ stats }) => {
  return (
    <div className="flex flex-wrap gap-8 mt-6">
      <StatItem 
        title="Tổng khách hàng" 
        value={stats.total} 
        icon={Users} 
        colorClass="bg-blue-500" 
      />
      <StatItem 
        title="Đang hoạt động" 
        value={stats.active} 
        icon={UserCheck} 
        colorClass="bg-green-500" 
      />
      <StatItem 
        title="Bị khóa" 
        value={stats.locked} 
        icon={UserX} 
        colorClass="bg-red-500" 
      />
    </div>
  );
};

export default CustomerStats;
