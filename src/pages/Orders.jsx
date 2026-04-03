import { useState, useEffect } from 'react';
import { Download, Eye, Edit, Trash2, Search, Plus } from 'lucide-react';
import clsx from 'clsx';
import OrderDetailsModal from '../components/orders/OrderDetailsModal';
import OrderFormModal from '../components/orders/OrderFormModal';

const STATUS_COLORS = {
  'Hoàn thành': 'bg-green-100 text-green-700',
  'Đang giao': 'bg-blue-100 text-blue-700',
  'Đã hủy': 'bg-red-100 text-red-700',
  'Chờ xác nhận': 'bg-yellow-100 text-amber-700',
  'Đang xử lý': 'bg-pink-100 text-pink-700',
};

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);

  // Filters state
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [timeFilter, setTimeFilter] = useState('');

  const fetchOrders = () => {
    setLoading(true);
    fetch('http://localhost:3000/api/orders')
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
        setFilteredOrders(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch orders', err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Filter Logic
  useEffect(() => {
    let result = [...orders];

    if (searchQuery) {
      result = result.filter(o => 
        o.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
        o.customer.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (statusFilter) {
      result = result.filter(o => o.status === statusFilter);
    }

    if (timeFilter) {
       // Simple time filtering mock logic
       const now = new Date();
       if (timeFilter === 'hôm nay') {
         const today = now.toISOString().split('T')[0];
         result = result.filter(o => o.date === today);
       } else if (timeFilter === '7 ngày qua') {
         const sevenDaysAgo = new Date(now.setDate(now.getDate() - 7));
         result = result.filter(o => new Date(o.date) >= sevenDaysAgo);
       }
    }

    setFilteredOrders(result);
  }, [searchQuery, statusFilter, timeFilter, orders]);

  const handleSaveOrder = (formData) => {
    const isEdit = !!editingOrder;
    const url = isEdit ? `http://localhost:3000/api/orders/${editingOrder.id}` : 'http://localhost:3000/api/orders';
    const method = isEdit ? 'PUT' : 'POST';

    // Format for backend
    const payload = {
      ...formData,
      itemsCount: parseInt(formData.itemsCount) || 1,
      total: parseInt(formData.total) || 0,
      delivery: {
        address: formData.address,
        method: isEdit ? (editingOrder.delivery?.method || 'N/A') : 'Tiêu chuẩn'
      }
    };

    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    .then(res => res.json())
    .then(() => {
       fetchOrders();
       setIsFormOpen(false);
       setEditingOrder(null);
    })
    .catch(err => console.error("Save failed", err));
  };

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa đơn hàng này?")) {
      fetch(`http://localhost:3000/api/orders/${id}`, { method: 'DELETE' })
        .then(() => fetchOrders())
        .catch(err => console.error("Delete failed", err));
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">Đơn hàng</h2>
          <p className="text-sm text-gray-500">Danh sách đơn hàng trong hệ thống</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => { setEditingOrder(null); setIsFormOpen(true); }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center gap-2 transition-colors shadow-md"
          >
            <Plus size={18} />
            <span>Thêm đơn hàng</span>
          </button>
          <button className="bg-green-500 hover:bg-green-600 text-white p-2 rounded transition-colors shadow-md">
            <Download size={20} />
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <div className="relative flex-1 max-w-sm">
          <input
            type="text"
            placeholder="Tìm mã đơn hàng hoặc tên khách hàng"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
          />
          <Search className="absolute right-3 top-2.5 text-gray-400" size={18} />
        </div>
        <select 
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 outline-none focus:border-blue-500 bg-white text-sm"
        >
          <option value="">Tất cả trạng thái</option>
          {Object.keys(STATUS_COLORS).map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <select 
          value={timeFilter}
          onChange={(e) => setTimeFilter(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 outline-none focus:border-blue-500 bg-white text-sm"
        >
          <option value="">Thời gian</option>
          <option value="hôm nay">Hôm nay</option>
          <option value="7 ngày qua">7 ngày qua</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-sm">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-[#EFEDED] text-gray-700 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 font-semibold">STT</th>
              <th className="px-6 py-4 font-semibold">Mã ĐH</th>
              <th className="px-6 py-4 font-semibold">Khách hàng</th>
              <th className="px-6 py-4 font-semibold">Ngày đặt</th>
              <th className="px-6 py-4 font-semibold text-center">Số mặt hàng</th>
              <th className="px-6 py-4 font-semibold text-right">Tổng tiền</th>
              <th className="px-6 py-4 font-semibold text-center">Trạng thái</th>
              <th className="px-6 py-4 font-semibold text-center">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {loading ? (
              <tr><td colSpan="8" className="px-6 py-12 text-center text-gray-400">Đang tải dữ liệu...</td></tr>
            ) : filteredOrders.length === 0 ? (
              <tr><td colSpan="8" className="px-6 py-12 text-center text-gray-400">Không tìm thấy đơn hàng nào</td></tr>
            ) : (
              filteredOrders.map((order, index) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4 font-bold text-gray-900">{order.id}</td>
                  <td className="px-6 py-4">{order.customer}</td>
                  <td className="px-6 py-4 text-gray-600">{order.date}</td>
                  <td className="px-6 py-4 text-center">{order.itemsCount}</td>
                  <td className="px-6 py-4 text-right font-bold text-gray-900">{order.total.toLocaleString('vi-VN')}đ</td>
                  <td className="px-6 py-4 text-center">
                    <span className={clsx('px-3 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase', STATUS_COLORS[order.status] || 'bg-gray-100 text-gray-700')}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-3 text-gray-400">
                      <button onClick={() => setSelectedOrder(order)} title="Xem chi tiết" className="hover:text-blue-600 transition-all transform hover:scale-110"><Eye size={18} /></button>
                      <button onClick={() => { setEditingOrder(order); setIsFormOpen(true); }} title="Sửa" className="hover:text-amber-600 transition-all transform hover:scale-110"><Edit size={18} /></button>
                      <button onClick={() => handleDelete(order.id)} title="Xóa" className="hover:text-red-600 transition-all transform hover:scale-110"><Trash2 size={18} /></button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 gap-2">
        <button className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded hover:bg-gray-300 text-gray-600 font-medium">{'<'}</button>
        <button className="w-8 h-8 flex items-center justify-center bg-blue-500 rounded text-white font-medium">1</button>
        <button className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded hover:bg-gray-300 text-gray-600 font-medium">2</button>
        <button className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded hover:bg-gray-300 text-gray-600 font-medium">3</button>
        <button className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded hover:bg-gray-300 text-gray-600 font-medium">{'>'}</button>
      </div>

      {selectedOrder && (
        <OrderDetailsModal 
          isOpen={!!selectedOrder} 
          onClose={() => setSelectedOrder(null)} 
          order={selectedOrder} 
        />
      )}

      {isFormOpen && (
        <OrderFormModal 
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          order={editingOrder}
          onSave={handleSaveOrder}
        />
      )}
    </div>
  );
}
