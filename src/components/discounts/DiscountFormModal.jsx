import { useState, useEffect } from 'react';

export default function DiscountFormModal({ isOpen, onClose, discount, onSave }) {
  const [formData, setFormData] = useState({
    code: '',
    title: '',
    description: '',
    type: 'Phần trăm (%)',
    value: '',
    minOrder: '',
    maxDiscount: '',
    expiryDate: '',
    usageLimit: '',
    status: 'active'
  });

  useEffect(() => {
    if (discount) {
      setFormData({
        code: discount.code || '',
        title: discount.title || '',
        description: discount.description || '',
        type: 'Phần trăm (%)',
        value: discount.value || '',
        minOrder: discount.minOrder || '',
        maxDiscount: discount.maxDiscount || '',
        expiryDate: discount.expiryDate || '',
        usageLimit: discount.usageLimit || '',
        status: discount.status || 'active'
      });
    } else {
      setFormData({
        code: '',
        title: '',
        description: '',
        type: 'Phần trăm (%)',
        value: '',
        minOrder: '',
        maxDiscount: '',
        expiryDate: '',
        usageLimit: '',
        status: 'active'
      });
    }
  }, [discount, isOpen]);

  if (!isOpen) return null;

  const isEdit = !!discount;

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
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-bold text-gray-900">
            {isEdit ? 'Chỉnh sửa mã giảm giá' : 'Thêm mã giảm giá mới'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl font-semibold">&times;</button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-5">
            {/* Mã giảm giá */}
            <div>
              <label className="block text-sm font-semibold mb-1">Mã giảm giá <span className="text-red-500">*</span></label>
              <input type="text" name="code" value={formData.code} onChange={handleChange} placeholder="VD: VNVODICH2026" className="w-full bg-gray-50 border border-gray-200 rounded px-3 py-2 outline-none focus:border-blue-500" required />
            </div>

            {/* Tiêu đề */}
            <div>
              <label className="block text-sm font-semibold mb-1">Tiêu đề <span className="text-red-500">*</span></label>
              <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="VD: Giảm 25%" className="w-full bg-gray-50 border border-gray-200 rounded px-3 py-2 outline-none focus:border-blue-500" required />
            </div>

            {/* Mô tả */}
            <div>
              <label className="block text-sm font-semibold mb-1">Mô tả <span className="text-red-500">*</span></label>
              <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Mô tả chi tiết về mã giảm giá" rows="3" className="w-full bg-gray-50 border border-gray-200 rounded px-3 py-2 outline-none focus:border-blue-500" required></textarea>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Loại giảm giá */}
              <div>
                <label className="block text-sm font-semibold mb-1">Loại giảm giá <span className="text-red-500">*</span></label>
                <select name="type" value={formData.type} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded px-3 py-2 outline-none focus:border-blue-500">
                  <option value="Phần trăm (%)">Phần trăm (%)</option>
                  <option value="Số tiền">Số tiền trực tiếp</option>
                </select>
              </div>

              {/* Giá trị giảm */}
              <div>
                <label className="block text-sm font-semibold mb-1">Giá trị giảm <span className="text-red-500">*</span></label>
                <input type="number" name="value" value={formData.value} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded px-3 py-2 outline-none focus:border-blue-500" required />
              </div>

              {/* Đơn hàng tối thiểu */}
              <div>
                <label className="block text-sm font-semibold mb-1">Đơn hàng tối thiểu(đ) <span className="text-red-500">*</span></label>
                <input type="number" name="minOrder" value={formData.minOrder} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded px-3 py-2 outline-none focus:border-blue-500" required />
              </div>

              {/* Giảm tối đa */}
              <div>
                <label className="block text-sm font-semibold mb-1">Giảm tối đa (đ) <span className="text-red-500">*</span></label>
                <input type="number" name="maxDiscount" value={formData.maxDiscount} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded px-3 py-2 outline-none focus:border-blue-500" required />
              </div>

              {/* Hạn sử dụng */}
              <div>
                <label className="block text-sm font-semibold mb-1">Hạn sử dụng <span className="text-red-500">*</span></label>
                <input type="date" name="expiryDate" value={formData.expiryDate} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded px-3 py-2 outline-none focus:border-blue-500" required />
              </div>

              {/* Giới hạn sử dụng */}
              <div>
                <label className="block text-sm font-semibold mb-1">Giới hạn sử dụng <span className="text-red-500">*</span></label>
                <input type="text" name="usageLimit" value={formData.usageLimit} onChange={handleChange} placeholder="Không giới hạn" className="w-full bg-gray-50 border border-gray-200 rounded px-3 py-2 outline-none focus:border-blue-500" />
              </div>
            </div>

            {/* Trạng thái */}
            <div>
              <label className="block text-sm font-semibold mb-1">Trạng thái <span className="text-red-500">*</span></label>
              <select name="status" value={formData.status} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded px-3 py-2 outline-none focus:border-blue-500">
                <option value="active">Đang hoạt động</option>
                <option value="expired">Đã hết hạn</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-8">
            <button type="button" onClick={onClose} className="px-5 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded font-medium transition-colors">
              Hủy
            </button>
            <button type="submit" className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-medium transition-colors">
              {isEdit ? 'Cập nhật' : 'Thêm mã'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
