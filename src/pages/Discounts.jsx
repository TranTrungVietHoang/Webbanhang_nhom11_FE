import { useState, useEffect } from 'react';
import { Plus, TicketPercent, Copy, Edit, Trash2 } from 'lucide-react';
import clsx from 'clsx';
import DiscountFormModal from '../components/discounts/DiscountFormModal';

function DiscountCard({ discount, isExpired, onEdit }) {
  return (
    <div className="flex bg-white border border-gray-200 rounded-sm overflow-hidden mb-4 shadow-sm w-full max-w-3xl">
      {/* Left Icon Area */}
      <div className={clsx('w-32 flex items-center justify-center border-r border-dashed border-gray-300', isExpired ? 'bg-gray-400' : 'bg-blue-600')}>
        <TicketPercent size={48} className="text-white" strokeWidth={1.5} />
      </div>

      {/* Right Content Area */}
      <div className="flex-1 p-4 flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-1">{discount.title}</h3>
          <p className="text-sm text-gray-600 mb-1">{discount.description}</p>
          <div className="text-xs text-gray-500 mb-1 flex items-center gap-1">
            <span className="inline-block w-3 h-3 border border-gray-400 rounded-sm flex-shrink-0 text-[8px] text-center font-bold">đ</span>
            Đơn hàng tối thiểu {Number(discount.minOrder).toLocaleString('vi-VN')} đ
          </div>
          <div className="text-xs text-gray-500 mb-3 flex items-center gap-1">
             <span className="inline-block w-3 h-3 border border-gray-400 rounded-sm flex-shrink-0 text-[8px] text-center font-bold">📅</span>
             HSD: {discount.expiryDate}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex items-center gap-2">
           <div className="bg-gray-200 text-gray-600 px-4 py-1.5 text-sm font-medium tracking-wide w-48 text-center rounded-sm">
             {discount.code}
           </div>
           <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-sm text-sm font-medium flex items-center gap-1 transition-colors">
             <Copy size={16} /> Sao chép
           </button>
           <div className="flex-1"></div>
           <button onClick={() => onEdit(discount)} className="text-gray-400 hover:text-gray-600 transition-colors"><Edit size={16} /></button>
           <button className="text-gray-400 hover:text-red-500 transition-colors ml-2"><Trash2 size={16} /></button>
        </div>
      </div>
    </div>
  );
}

export default function Discounts() {
  const [discounts, setDiscounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDiscount, setEditingDiscount] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/api/discounts')
      .then((res) => res.json())
      .then((data) => {
        setDiscounts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch discounts', err);
        setLoading(false);
      });
  }, []);

  const handleSaveDiscount = (formData) => {
    const isEdit = !!editingDiscount;
    const url = isEdit ? `http://localhost:3000/api/discounts/${editingDiscount.id}` : 'http://localhost:3000/api/discounts';
    const method = isEdit ? 'PUT' : 'POST';

    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
    .then(res => res.json())
    .then(savedDiscount => {
       if (isEdit) {
         setDiscounts(prev => prev.map(d => d.id === savedDiscount.id ? savedDiscount : d));
       } else {
         setDiscounts(prev => [...prev, savedDiscount]);
       }
       setIsModalOpen(false);
       setEditingDiscount(null);
    })
    .catch(err => console.error("Save failed", err));
  };

  const handleEdit = (discount) => {
    setEditingDiscount(discount);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingDiscount(null);
    setIsModalOpen(true);
  };

  const activeDiscounts = discounts.filter((d) => d.status === 'active');
  const expiredDiscounts = discounts.filter((d) => d.status === 'expired');

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">Mã giảm giá</h2>
          <p className="text-sm text-gray-500">
            Bạn có <span className="font-bold text-black">{activeDiscounts.length}</span> mã giảm giá để sử dụng
          </p>
        </div>
        <button onClick={handleAddNew} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center gap-2 transition-colors">
          <Plus size={18} />
          <span>Thêm mã</span>
        </button>
      </div>

      {loading ? (
        <p className="text-gray-500">Đang tải dữ liệu...</p>
      ) : (
        <>
          {/* Active Discounts */}
          <div className="mb-10">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Có thể sử dụng</h3>
            {activeDiscounts.length > 0 ? (
              activeDiscounts.map((discount) => (
                <DiscountCard key={discount.id} discount={discount} isExpired={false} onEdit={handleEdit} />
              ))
            ) : (
              <p className="text-gray-500 italic">Không có mã nào có thể sử dụng.</p>
            )}
          </div>

          {/* Expired Discounts */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">Đã hết hạn</h3>
            {expiredDiscounts.length > 0 ? (
              expiredDiscounts.map((discount) => (
                <DiscountCard key={discount.id} discount={discount} isExpired={true} onEdit={handleEdit} />
              ))
            ) : (
              <p className="text-gray-500 italic">Không có mã nào hết hạn.</p>
            )}
          </div>
        </>
      )}

      {isModalOpen && (
        <DiscountFormModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          discount={editingDiscount}
          onSave={handleSaveDiscount}
        />
      )}
    </div>
  );
}
