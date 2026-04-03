import React from 'react';
import { Eye, Lock, Unlock } from 'lucide-react';

const CustomerTable = ({ customers, onToggleStatus }) => {
  return (
    <div className="mt-8 overflow-hidden bg-white rounded-2xl shadow-sm border border-gray-100">
      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-6 py-4 text-sm font-black italic uppercase tracking-tighter text-black">STT</th>
            <th className="px-6 py-4 text-sm font-black italic uppercase tracking-tighter text-black">Tên KH</th>
            <th className="px-6 py-4 text-sm font-black italic uppercase tracking-tighter text-black">SDT</th>
            <th className="px-6 py-4 text-sm font-black italic uppercase tracking-tighter text-black">Email</th>
            <th className="px-6 py-4 text-sm font-black italic uppercase tracking-tighter text-black text-center">Tổng đơn</th>
            <th className="px-6 py-4 text-sm font-black italic uppercase tracking-tighter text-black text-center">Tổng chi tiêu</th>
            <th className="px-6 py-4 text-sm font-black italic uppercase tracking-tighter text-black text-center">Trạng thái</th>
            <th className="px-6 py-4 text-sm font-black italic uppercase tracking-tighter text-black"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {customers.map((customer, index) => (
            <tr key={customer.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 text-base font-bold text-gray-500">{index + 1}</td>
              <td className="px-6 py-4 text-lg font-black text-gray-900 tracking-tight leading-tight">{customer.name}</td>
              <td className="px-6 py-4 text-base font-bold text-gray-700 tracking-tighter">{customer.phone}</td>
              <td className="px-6 py-4 text-base font-medium text-gray-600">{customer.email}</td>
              <td className="px-6 py-4 text-lg font-black text-gray-900 tracking-tighter text-center">{customer.totalOrders}</td>
              <td className="px-6 py-4 text-lg font-black text-gray-900 tracking-tighter text-center">
                {(customer.totalSpent / 1000000).toFixed(0)}M
              </td>
              <td className="px-6 py-4 text-center">
                <span className={`px-4 py-1 rounded-lg text-sm font-black italic uppercase tracking-tighter leading-none ${
                   customer.status === 'Hoạt động' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-500'
                }`}>
                  {customer.status}
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center space-x-3">
                  <button className="p-2 text-black hover:text-primary transition-colors">
                    <Eye size={24} />
                  </button>
                  <button 
                    onClick={() => onToggleStatus(customer)}
                    className={`p-2 transition-colors ${customer.status === 'Bị khóa' ? 'text-gray-400 hover:text-green-500' : 'text-black hover:text-red-500'}`}
                  >
                    {customer.status === 'Bị khóa' ? <Unlock size={24} /> : <Lock size={24} />}
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {customers.length === 0 && (
            <tr>
              <td colSpan="8" className="px-6 py-10 text-center text-xl text-gray-400 font-bold italic uppercase">
                Không tìm thấy khách hàng nào
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerTable;
