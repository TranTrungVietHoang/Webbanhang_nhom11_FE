import React from 'react';
import { Search, ChevronDown } from 'lucide-react';

const ProductFilters = ({ searchTerm, setSearchTerm, category, setCategory, status, setStatus }) => {
  return (
    <div className="flex flex-wrap items-center gap-6 mt-8">
      {/* Search Bar */}
      <div className="flex-1 min-w-[300px] relative">
        <input
          type="text"
          placeholder="Tìm tên theo sản phẩm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-4 pr-12 py-3 bg-white border border-gray-200 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300 shadow-sm"
        />
        <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
          <Search size={22} className="text-black" />
        </div>
      </div>

      {/* Category Filter */}
      <div className="relative">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="appearance-none pl-6 pr-12 py-3 bg-white border border-gray-200 rounded-lg font-bold text-gray-700 min-w-[160px] cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
        >
          <option value="">Loại hàng</option>
          <option value="Điện thoại">Điện thoại</option>
          <option value="Máy tính">Máy tính</option>
          <option value="Máy ảnh">Máy ảnh</option>
          <option value="Phụ kiện">Phụ kiện</option>
        </select>
        <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
          <ChevronDown size={20} className="text-gray-400" />
        </div>
      </div>

      {/* Status Filter */}
      <div className="relative">
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="appearance-none pl-6 pr-12 py-3 bg-white border border-gray-200 rounded-lg font-bold text-gray-700 min-w-[160px] cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
        >
          <option value="">Trạng thái</option>
          <option value="Còn hàng">Còn hàng</option>
          <option value="Hết hàng">Hết hàng</option>
        </select>
        <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
          <ChevronDown size={20} className="text-gray-400" />
        </div>
      </div>
    </div>
  );
};

export default ProductFilters;
