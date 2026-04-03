import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export default function OrderFormModal({ isOpen, onClose, order, onSave }) {
  const [formData, setFormData] = useState({
    id: '',
    customer: '',
    email: '',
    phone: '',
    address: '',
    date: new Date().toISOString().split('T')[0],
    itemsCount: 1,
    total: 0,
    status: 'Chờ xác nhận',
    note: ''
  });

  useEffect(() => {
    if (order) {
      setFormData({
        id: order.id || '',
        customer: order.customer || '',
        email: order.customerEmail || '',
        phone: order.customerPhone || '',
        address: order.delivery?.address || '',
        date: order.date || new Date().toISOString().split('T')[0],
        itemsCount: order.itemsCount || 1,
        total: order.total || 0,
        status: order.status || 'Chờ xác nhận',
        note: order.note || ''
      });
    } else {
      setFormData({
        id: `DH${Math.floor(100 + Math.random() * 900)}`,
        customer: '',
        email: '',
        phone: '',
        address: '',
        date: new Date().toISOString().split('T')[0],
        itemsCount: 1,
        total: 0,
        status: 'Chờ xác nhận',
        note: ''
      });
    }
  }, [order, isOpen]);

  if (!isOpen) return null;

  const isEdit = !!order;

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
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-bold text-gray-900">
            {isEdit ? `Chỉnh sửa đơn hàng #${formData.id}` : 'Thêm đơn hàng mới'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
             <X size={24} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-8 overflow-y-auto flex-1">
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Mã đơn hàng</label>
                <input type="text" name="id" value={formData.id} onChange={handleChange} className="w-full bg-gray-100 border-none rounded px-4 py-2 font-medium focus:ring-2 focus:ring-blue-500 outline-none" readOnly={isEdit} />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Ngày đặt</label>
                <input type="date" name="date" value={formData.date} onChange={handleChange} className="w-full bg-gray-100 border-none rounded px-4 py-2 font-medium focus:ring-2 focus:ring-blue-500 outline-none" required />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Tên khách hàng <span className="text-red-500">*</span></label>
              <input type="text" name="customer" value={formData.customer} onChange={handleChange} placeholder="VD: Nguyễn Văn A" className="w-full bg-gray-100 border-none rounded px-4 py-2 font-medium focus:ring-2 focus:ring-blue-500 outline-none" required />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Số điện thoại</label>
                <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="w-full bg-gray-100 border-none rounded px-4 py-2 font-medium focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Tổng tiền (đ) <span className="text-red-500">*</span></label>
                <input type="number" name="total" value={formData.total} onChange={handleChange} className="w-full bg-gray-100 border-none rounded px-4 py-2 font-medium focus:ring-2 focus:ring-blue-500 outline-none" required />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Địa chỉ giao hàng</label>
              <input type="text" name="address" value={formData.address} onChange={handleChange} className="w-full bg-gray-100 border-none rounded px-4 py-2 font-medium focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Trạng thái <span className="text-red-500">*</span></label>
              <select name="status" value={formData.status} onChange={handleChange} className="w-full bg-gray-100 border-none rounded px-4 py-2 font-medium focus:ring-2 focus:ring-blue-500 outline-none appearance-none">
                 <option value="Chờ xác nhận">Chờ xác nhận</option>
                 <option value="Đang xử lý">Đang xử lý</option>
                 <option value="Đang giao">Đang giao</option>
                 <option value="Hoàn thành">Hoàn thành</option>
                 <option value="Đã hủy">Đã hủy</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Ghi chú</label>
              <textarea name="note" value={formData.note} onChange={handleChange} rows={3} className="w-full bg-gray-100 border-none rounded px-4 py-2 font-medium focus:ring-2 focus:ring-blue-500 outline-none resize-none"></textarea>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex justify-end gap-3 mt-8">
            <button type="button" onClick={onClose} className="px-8 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded font-bold transition-all">
              Hủy
            </button>
            <button type="submit" className="px-8 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-bold transition-all shadow-md shadow-blue-200">
              {isEdit ? 'Cập nhật' : 'Thêm đơn hàng'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
