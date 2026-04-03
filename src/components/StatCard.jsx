import React from 'react';
import { DollarSign, ShoppingBag, Package } from 'lucide-react';

const StatCard = ({ title, value, growth, icon, color = 'green' }) => {
  const IconComponent = icon === 'dollar' ? DollarSign : icon === 'bag' ? ShoppingBag : Package;
  
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-md transition-shadow duration-300">
      <div className="flex items-center space-x-3 mb-2">
         {IconComponent && <IconComponent size={32} className="text-black" />}
         <h3 className="text-xl font-black italic uppercase tracking-tighter text-black">{title}</h3>
      </div>
      <p className="text-3xl font-black mb-1">{value}</p>
      <p className={`text-lg font-bold ${growth.startsWith('+') || growth.includes('^') ? 'text-green-500' : 'text-blue-500'}`}>
        {growth} <span className="text-gray-400 font-medium">So với tháng trước</span>
      </p>
    </div>
  );
};

export default StatCard;
