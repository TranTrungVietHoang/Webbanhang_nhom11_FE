import React from 'react';
import { PencilLine, Trash2 } from 'lucide-react';

const ProductTable = ({ products, onEdit, onDelete }) => {
  return (
    <div className="mt-10 overflow-hidden bg-white rounded-2xl shadow-sm border border-gray-100">
      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-8 py-5 text-xl font-black italic uppercase tracking-tighter text-black">Ảnh</th>
            <th className="px-8 py-5 text-xl font-black italic uppercase tracking-tighter text-black">Mã SP</th>
            <th className="px-8 py-5 text-xl font-black italic uppercase tracking-tighter text-black">Tên SP</th>
            <th className="px-8 py-5 text-xl font-black italic uppercase tracking-tighter text-black text-center">Loại</th>
            <th className="px-8 py-5 text-xl font-black italic uppercase tracking-tighter text-black text-center">Giá</th>
            <th className="px-8 py-5 text-xl font-black italic uppercase tracking-tighter text-black text-center">SL</th>
            <th className="px-8 py-5 text-xl font-black italic uppercase tracking-tighter text-black text-center">Trạng thái</th>
            <th className="px-8 py-5 text-xl font-black italic uppercase tracking-tighter text-black"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {products.length > 0 ? (
            products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50 transition-colors group">
                <td className="px-8 py-5">
                  <img 
                    src={product.image || 'https://via.placeholder.com/150'} 
                    alt={product.name} 
                    className="w-24 h-24 object-cover rounded-xl shadow-sm border border-gray-100"
                  />
                </td>
                <td className="px-8 py-5 text-xl font-black text-gray-900 tracking-tighter">{product.id}</td>
                <td className="px-8 py-5 max-w-xs">
                  <div className="text-xl font-black text-gray-800 leading-tight tracking-tight">
                    {product.name}
                  </div>
                </td>
                <td className="px-8 py-5 text-xl font-black text-gray-700 tracking-tighter text-center italic uppercase">{product.category}</td>
                <td className="px-8 py-5 text-xl font-black text-gray-900 tracking-tighter text-center">
                  {product.price.toLocaleString()}₫
                </td>
                <td className="px-8 py-5 text-xl font-black text-gray-700 tracking-tighter text-center">{product.quantity}</td>
                <td className="px-8 py-5 text-center">
                  <span className={`inline-block whitespace-nowrap px-4 py-2 rounded-lg text-lg font-black italic uppercase tracking-tighter leading-none ${
                    product.status === 'Còn hàng' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {product.status}
                  </span>
                </td>
                <td className="px-8 py-5">
                  <div className="flex items-center space-x-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => onEdit(product)}
                      className="p-2 text-gray-400 hover:text-primary transition-colors duration-300"
                    >
                      <PencilLine size={28} />
                    </button>
                    <button 
                      onClick={() => onDelete(product.id)}
                      className="p-2 text-gray-400 hover:text-red-500 transition-colors duration-300"
                    >
                      <Trash2 size={28} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="px-8 py-20 text-center text-2xl font-bold text-gray-400 italic">
                Không tìm thấy sản phẩm nào
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
