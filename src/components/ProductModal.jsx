import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const ProductModal = ({ isOpen, onClose, onSave, product }) => {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    category: '',
    price: '',
    quantity: '',
    status: 'Còn hàng',
    image: '',
  });

  useEffect(() => {
    if (product) {
      setFormData(product);
    } else {
      setFormData({
        id: `SP${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
        name: '',
        category: 'Điện thoại',
        price: '',
        quantity: '',
        status: 'Còn hàng',
        image: '',
      });
    }
  }, [product, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'price' || name === 'quantity' ? Number(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-all duration-300">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between px-8 py-6 border-b border-gray-100 bg-gray-50">
          <h3 className="text-2xl font-black italic uppercase tracking-tighter text-black">
            {product ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}
          </h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
            <X size={28} className="text-gray-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-black italic uppercase tracking-tighter text-gray-500">Mã sản phẩm</label>
              <input
                type="text"
                name="id"
                value={formData.id}
                onChange={handleChange}
                disabled={!!product}
                className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-xl font-bold focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-black italic uppercase tracking-tighter text-gray-500">Loại hàng</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl font-bold focus:outline-none focus:ring-2 focus:ring-primary"
                required
              >
                <option value="Điện thoại">Điện thoại</option>
                <option value="Máy tính">Máy tính</option>
                <option value="Máy ảnh">Máy ảnh</option>
                <option value="Phụ kiện">Phụ kiện</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-black italic uppercase tracking-tighter text-gray-500">Tên sản phẩm</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl font-bold focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-black italic uppercase tracking-tighter text-gray-500">Giá bán (₫)</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl font-bold focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-black italic uppercase tracking-tighter text-gray-500">Số lượng</label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl font-bold focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-black italic uppercase tracking-tighter text-gray-500">Trạng thái</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl font-bold focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="Còn hàng">Còn hàng</option>
                <option value="Hết hàng">Hết hàng</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-black italic uppercase tracking-tighter text-gray-500">Link ảnh</label>
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://..."
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl font-bold focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-8 py-3 bg-gray-200 text-gray-700 rounded-xl font-black italic uppercase tracking-tighter hover:bg-gray-300 transition-colors"
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              className="px-10 py-3 bg-primary text-white rounded-xl font-black italic uppercase tracking-tighter hover:bg-primary-dark shadow-lg shadow-primary/30 transition-all hover:-translate-y-0.5 active:translate-y-0"
            >
              Lưu thay đổi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
