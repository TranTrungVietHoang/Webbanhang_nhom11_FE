import React from 'react';

export default function OrderDetailsModal({ isOpen, onClose, order }) {
  if (!isOpen || !order) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto flex flex-col">
        {/* Header */}
        <div className="p-6 border-b flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">Chi tiết đơn hàng #{order.id}</h2>
            <p className="text-sm text-gray-500">Ngày đặt: {order.date}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl font-semibold">&times;</button>
        </div>

        {/* Content */}
        <div className="p-6 flex-1">
          {/* Info Cards */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="bg-[#F6F8FB] p-5 rounded">
               <h3 className="font-bold text-gray-900 mb-3">Thông tin khách hàng</h3>
               <div className="space-y-2 text-sm">
                 <p><span className="text-gray-500 w-28 inline-block">Họ tên:</span> <span className="font-medium">{order.customer}</span></p>
                 <p><span className="text-gray-500 w-28 inline-block">Số điện thoại:</span> <span className="font-medium">{order.customerPhone || 'N/A'}</span></p>
                 <p><span className="text-gray-500 w-28 inline-block">Email:</span> <span className="font-medium">{order.customerEmail || 'N/A'}</span></p>
               </div>
            </div>
            
            <div className="bg-[#F6F8FB] p-5 rounded">
               <h3 className="font-bold text-gray-900 mb-3">Thông tin giao hàng</h3>
               <div className="space-y-2 text-sm">
                 <p><span className="text-gray-500 w-36 inline-block">Địa chỉ:</span> <span className="font-medium">{order.delivery?.address || 'N/A'}</span></p>
                 <p><span className="text-gray-500 w-36 inline-block">Phương thức thanh toán:</span> <span className="font-medium">{order.delivery?.method || 'N/A'}</span></p>
                 <p><span className="text-gray-500 w-36 inline-block">Trạng thái:</span> 
                    <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-semibold ml-1">
                      {order.status}
                    </span>
                 </p>
               </div>
            </div>
          </div>

          {/* Products Table */}
          <h3 className="font-bold text-gray-900 mb-4 text-lg">Sản phẩm đặt hàng</h3>
          <div className="border border-gray-200 rounded-lg overflow-hidden mb-6">
             <table className="w-full text-left text-sm">
               <thead className="bg-[#F4F4F4]">
                 <tr>
                   <th className="px-4 py-3 font-semibold">Sản phẩm</th>
                   <th className="px-4 py-3 font-semibold text-center">Số lượng</th>
                   <th className="px-4 py-3 font-semibold text-right">Đơn giá</th>
                   <th className="px-4 py-3 font-semibold text-right">Thành tiền</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-gray-100">
                 {order.products && order.products.map((prod) => (
                   <tr key={prod.id}>
                     <td className="px-4 py-3 flex items-center gap-3">
                        <img 
                          src={prod.image || 'https://via.placeholder.com/150'} 
                          alt={prod.name} 
                          className="w-12 h-12 rounded object-cover border border-gray-200" 
                          onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/150?text=No+Image'; }}
                        />
                       <span className="font-medium">{prod.name}</span>
                     </td>
                     <td className="px-4 py-3 text-center">{prod.qty}</td>
                     <td className="px-4 py-3 text-right">{prod.price.toLocaleString('vi-VN')}đ</td>
                     <td className="px-4 py-3 text-right font-medium">{prod.total.toLocaleString('vi-VN')}đ</td>
                   </tr>
                 ))}
                 {!order.products && (
                    <tr><td colSpan="4" className="text-center py-4 italic text-gray-500">Không có thông tin sản phẩm chi tiết</td></tr>
                 )}
               </tbody>
             </table>
          </div>

          {/* Summary */}
          <div className="flex justify-end mb-8">
            <div className="w-72 bg-[#FAF9F9] p-4 rounded-lg">
               <div className="flex justify-between mb-2 text-sm text-gray-600">
                 <span>Tạm tính:</span>
                 <span className="font-medium text-black">{order.subTotal?.toLocaleString('vi-VN') || 0}đ</span>
               </div>
               <div className="flex justify-between mb-4 text-sm text-gray-600 border-b border-gray-300 pb-3">
                 <span>Phí vận chuyển:</span>
                 <span className="font-medium text-black">{order.shippingFee?.toLocaleString('vi-VN') || 0}đ</span>
               </div>
               <div className="flex justify-between items-center text-base font-bold text-gray-900">
                 <span>Tổng cộng:</span>
                 <span>{order.finalTotal?.toLocaleString('vi-VN') || order.total?.toLocaleString('vi-VN')}đ</span>
               </div>
            </div>
          </div>

          {/* Notes */}
          {order.note && (
             <div className="bg-[#FCEBAE] p-4 rounded text-sm text-gray-900">
               <p className="font-bold mb-1">Ghi chú:</p>
               <p>{order.note}</p>
             </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t flex justify-end gap-3 bg-gray-50">
          <button onClick={onClose} className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded font-medium transition-colors">
            Đóng
          </button>
          <button className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded font-medium transition-colors">
            In đơn hàng
          </button>
          <button className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded font-medium transition-colors">
            Cập nhật trạng thái
          </button>
        </div>
      </div>
    </div>
  );
}
