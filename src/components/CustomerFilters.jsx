import React from 'react';
import { Search, ChevronDown } from 'lucide-react';

const CustomerFilters = ({ searchTerm, setSearchTerm, status, setStatus }) => {
  return (
    <div className="bg-gray-200 p-8 rounded-2xl border border-gray-100 flex flex-wrap items-center gap-6 mt-10">
      {/* Search Bar */}
      <div className="flex-1 min-w-[300px] relative">
        <input
          type="text"
          placeholder="Tìm theo tên, sdt hoặc email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-6 pr-12 py-3 bg-white border border-gray-200 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300 shadow-sm text-lg font-medium"
        />
        <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
          <Search size={22} className="text-black" />
        </div>
      </div>

      {/* Status Filter */}
      <div className="relative">
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="appearance-none pl-6 pr-16 py-3 bg-white border border-gray-200 rounded-lg font-black italic uppercase tracking-tighter text-gray-700 min-w-[200px] cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary shadow-sm text-lg"
        >
          <option value="">Trạng thái</option>
          <option value="Hoạt động">Hoạt động</option>
          <option value="Bị khóa">Bị khóa</option>
        </select>
        <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
          <ChevronDown size={24} className="text-gray-400" />
        </div>
      </div>
      
      <div className="flex-1"></div>
    </div>
  );
};

export default CustomerFilters;
