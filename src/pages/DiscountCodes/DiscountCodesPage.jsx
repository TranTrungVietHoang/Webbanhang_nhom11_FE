import React from 'react';
import { Ticket, Sparkles, Clock, ChevronRight, Copy } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';

const COUPONS = [
  { id: 1, code: 'WELCOME50', discount: '50.000đ', minOrder: '200.000đ', expiry: '30/05/2026', type: 'Vận chuyển', color: 'bg-blue-600' },
  { id: 2, code: 'TECHSAVVY', discount: '10%', minOrder: '1.000.000đ', expiry: '15/04/2026', type: 'Điện tử', color: 'bg-indigo-600' },
  { id: 3, code: 'FREESHIPMAX', discount: 'Freeship', minOrder: '0đ', expiry: '10/04/2026', type: 'Vận chuyển', color: 'bg-emerald-600' },
  { id: 4, code: 'GOLDMEMBER', discount: '100.000đ', minOrder: '500.000đ', expiry: '20/04/2026', type: 'Đặc quyền', color: 'bg-amber-600' },
];

const DiscountCodesPage = () => {
  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code);
    toast.success(`Đã sao chép mã ${code}!`);
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center space-y-4">
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-xs font-black uppercase tracking-widest"
            >
               <Sparkles size={14} /> Mã giảm giá đặc quyền
            </motion.div>
            <h1 className="text-5xl font-black text-slate-800 tracking-tighter uppercase italic">Ưu đãi dành cho bạn</h1>
            <p className="text-slate-500 font-medium text-lg">Sử dụng các mã giảm giá dưới đây để nhận được ưu đãi tốt nhất khi mua sắm.</p>
          </div>

          {/* Search/Filter Bar */}
          <div className="flex gap-4 p-2 bg-white rounded-2xl shadow-sm border border-slate-100">
             <button className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-black uppercase text-xs tracking-widest shadow-lg shadow-blue-200">Tất cả</button>
             <button className="flex-1 py-3 hover:bg-slate-50 text-slate-500 rounded-xl font-black uppercase text-xs tracking-widest transition-all">Vận chuyển</button>
             <button className="flex-1 py-3 hover:bg-slate-50 text-slate-500 rounded-xl font-black uppercase text-xs tracking-widest transition-all">Sản phẩm</button>
          </div>

          {/* Coupons List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {COUPONS.map((coupon, idx) => (
              <motion.div 
                key={coupon.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all border border-slate-100 flex group"
              >
                {/* Left side - Icon/Color */}
                <div className={`w-32 ${coupon.color} flex flex-col items-center justify-center p-4 text-white space-y-2 relative overflow-hidden`}>
                  <div className="absolute top-0 left-0 w-full h-full bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <Ticket className="w-10 h-10 group-hover:scale-110 transition-transform" strokeWidth={2.5} />
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/80">{coupon.type}</span>
                  <div className="absolute top-[-10px] right-[-10px] w-5 h-5 bg-[#F8FAFC] rounded-full"></div>
                  <div className="absolute bottom-[-10px] right-[-10px] w-5 h-5 bg-[#F8FAFC] rounded-full"></div>
                </div>

                {/* Right side - Content */}
                <div className="flex-1 p-6 space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-2xl font-black text-slate-800 tracking-tighter uppercase">{coupon.discount}</h3>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Đơn tối thiểu {coupon.minOrder}</p>
                    </div>
                    <div className="bg-slate-50 px-3 py-1 rounded-lg border border-slate-100 flex items-center gap-1.5 flex-shrink-0">
                       <Clock size={12} className="text-slate-400" />
                       <span className="text-[10px] font-bold text-slate-500 uppercase">{coupon.expiry}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border border-dashed border-slate-300">
                    <span className="flex-1 font-black text-blue-600 uppercase tracking-widest font-mono">{coupon.code}</span>
                    <button 
                      onClick={() => copyToClipboard(coupon.code)}
                      className="p-2 bg-white text-slate-400 hover:text-blue-600 rounded-lg shadow-sm border border-slate-100 transition-all hover:scale-110 active:scale-95"
                    >
                      <Copy size={16} />
                    </button>
                  </div>

                  <button className="w-full py-3 bg-slate-900 text-white rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-blue-600 transition-all active:scale-95 flex items-center justify-center gap-2 group/btn">
                    Dùng ngay <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Footer Card */}
          <div className="bg-gradient-to-r from-blue-700 to-indigo-900 rounded-[2.5rem] p-10 text-white text-center space-y-4 shadow-2xl shadow-blue-200">
             <h3 className="text-2xl font-black uppercase italic tracking-tighter">Bạn còn 2 voucher chưa dùng</h3>
             <p className="text-blue-100 font-medium">Hoàn thành các nhiệm vụ ngày để săn tiếp voucher 100k!</p>
             <button className="px-10 py-4 bg-white text-blue-900 rounded-xl font-black uppercase text-xs tracking-widest hover:bg-blue-50 transition-all shadow-xl active:scale-95">Xem nhiệm vụ ngay</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscountCodesPage;
