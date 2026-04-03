import { useState, useEffect } from 'react';
import { Image as ImageIcon, X } from 'lucide-react';

export default function ProductFormModal({ isOpen, onClose, product, onSave }) {
  const [formData, setFormData] = useState({
    sku: '',
    name: '',
    category: 'Điện thoại',
    price: 0,
    quantity: 0,
    image: '',
    description: ''
  });

  useEffect(() => {
    if (product) {
      setFormData({
        sku: product.sku || '',
        name: product.name || '',
        category: product.category || 'Điện thoại',
        price: product.price || 0,
        quantity: product.quantity || 0,
        image: product.image || '',
        description: product.description || ''
      });
    } else {
      setFormData({
        sku: '',
        name: '',
        category: 'Điện thoại',
        price: 0,
        quantity: 0,
        image: '',
        description: ''
      });
    }
  }, [product, isOpen]);

  if (!isOpen) return null;

  const isEdit = !!product;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-bold text-gray-900">
            {isEdit ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-8 overflow-y-auto flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
            
            {/* Left Column */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2">Mã sản phẩm <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  name="sku" 
                  value={formData.sku} 
                  onChange={handleChange}
                  placeholder="VD: SP001" 
                  className="w-full bg-gray-100 border-none rounded px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Tên sản phẩm <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange}
                  placeholder="VD: Iphone 15promax" 
                  className="w-full bg-gray-100 border-none rounded px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Loại sản phẩm <span className="text-red-500">*</span></label>
                <select 
                  name="category" 
                  value={formData.category} 
                  onChange={handleChange}
                  className="w-full bg-gray-100 border-none rounded px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium appearance-none"
                >
                  <option value="Điện thoại">Điện thoại</option>
                  <option value="Laptop">Laptop</option>
                  <option value="Phụ kiện">Phụ kiện</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Giá bán (đ) <span className="text-red-500">*</span></label>
                <input 
                  type="number" 
                  name="price" 
                  value={formData.price} 
                  onChange={handleChange}
                  className="w-full bg-gray-100 border-none rounded px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Số lượng <span className="text-red-500">*</span></label>
                <input 
                  type="number" 
                  name="quantity" 
                  value={formData.quantity} 
                  onChange={handleChange}
                  className="w-full bg-gray-100 border-none rounded px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                  required
                />
                <p className="text-[11px] text-gray-500 mt-2">Trạng thái sẽ tự động cập nhật dựa theo số lượng</p>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2">Hình ảnh sản phẩm <span className="text-red-500">*</span></label>
                <div className="w-full aspect-[4/3] bg-gray-100 rounded flex flex-col items-center justify-center border-2 border-dashed border-gray-200 relative overflow-hidden group">
                  {formData.image ? (
                    <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex flex-col items-center">
                      <ImageIcon size={48} className="text-gray-300 mb-2" />
                      <span className="text-sm text-gray-400">Chưa có ảnh</span>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">URL hình ảnh:</label>
                <input 
                  type="text" 
                  name="image" 
                  value={formData.image} 
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg" 
                  className="w-full bg-gray-100 border-none rounded px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Mô tả sản phẩm <span className="text-red-500">*</span></label>
                <textarea 
                  name="description" 
                  value={formData.description} 
                  onChange={handleChange}
                  placeholder="Mô tả chi tiết sản phẩm..."
                  rows={4}
                  className="w-full bg-gray-100 border-none rounded px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium resize-none"
                  required
                ></textarea>
              </div>
            </div>

          </div>

          {/* Footer Actions */}
          <div className="flex justify-end gap-4 mt-12">
            <button 
              type="button" 
              onClick={onClose} 
              className="px-10 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded font-bold transition-all"
            >
              Hủy
            </button>
            <button 
              type="submit" 
              className="px-10 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded font-bold transition-all shadow-md shadow-blue-200"
            >
              {isEdit ? 'Cập nhật' : 'Thêm sản phẩm'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
