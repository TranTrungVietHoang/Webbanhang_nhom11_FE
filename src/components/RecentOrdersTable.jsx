import React from 'react';

const RecentOrdersTable = ({ orders }) => {
  return (
    <div className="bg-gray-200 p-8 rounded-2xl shadow-sm border border-gray-100 mt-8">
      <h3 className="text-xl font-black italic uppercase tracking-tighter mb-6 text-black">Đơn hàng gần đây</h3>
      <div className="overflow-x-auto bg-white rounded-xl shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="px-6 py-4 text-sm font-black uppercase tracking-wider text-black">Mã đơn</th>
              <th className="px-6 py-4 text-sm font-black uppercase tracking-wider text-black">Khách hàng</th>
              <th className="px-6 py-4 text-sm font-black uppercase tracking-wider text-black">Ngày</th>
              <th className="px-6 py-4 text-sm font-black uppercase tracking-wider text-black">Giảm giá</th>
              <th className="px-6 py-4 text-sm font-black uppercase tracking-wider text-black">Tổng tiền</th>
              <th className="px-6 py-4 text-sm font-black uppercase tracking-wider text-black">Trạng thái</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm font-bold text-gray-900">{order.id}</td>
                <td className="px-6 py-4 text-sm font-medium text-gray-700">{order.customer}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{order.date}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{order.discount}</td>
                <td className="px-6 py-4 text-sm font-black text-gray-900">{order.total.toLocaleString()}₫</td>
                <td className="px-6 py-4 text-sm">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold leading-none ${
                    order.status === 'Đã hoàn thành' ? 'bg-green-100 text-green-700' :
                    order.status === 'Đang chờ thanh toán' ? 'bg-orange-100 text-orange-700' :
                    order.status === 'Đang xử lý' ? 'bg-blue-100 text-blue-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentOrdersTable;
