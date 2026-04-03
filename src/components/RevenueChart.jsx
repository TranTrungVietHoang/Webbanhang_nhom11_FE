import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart
} from 'recharts';

const RevenueChart = ({ data }) => {
  return (
    <div className="bg-gray-200 p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center">
      <h3 className="text-xl font-black italic uppercase tracking-tighter self-start mb-6 text-black">Biểu đồ doanh thu</h3>
      <div className="w-full h-80 relative">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
            <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#6B7280', fontSize: 14, fontWeight: 500 }}
                dy={15}
            />
            <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#6B7280', fontSize: 14, fontWeight: 500 }}
                dx={-10}
                tickFormatter={(value) => value.toLocaleString()}
            />
            <Tooltip 
               contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
               formatter={(value) => [`${value.toLocaleString()}₫`, 'Doanh thu']}
            />
            <Line 
              type="monotone" 
              dataKey="revenue" 
              stroke="#3B82F6" 
              strokeWidth={4} 
              dot={{ r: 6, fill: '#3B82F6', strokeWidth: 2, stroke: '#fff' }}
              activeDot={{ r: 8, strokeWidth: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
        
        {/* Floating label like in Figma */}
        <div className="absolute top-0 right-10 bg-green-500 text-white px-4 py-3 rounded-xl shadow-lg flex flex-col items-center leading-none">
           <span className="text-lg font-black tracking-tighter">90,000,000đ</span>
           <span className="text-sm font-bold mt-1 tracking-tighter">+10%</span>
        </div>
      </div>
    </div>
  );
};

export default RevenueChart;
