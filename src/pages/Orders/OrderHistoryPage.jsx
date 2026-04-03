import React from 'react';
import { Package, Truck, CheckCircle2, XCircle, Clock, ChevronRight, ExternalLink, Box, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ORDERS = [
  { id: 'ORD-9928', date: '10/04/2026', total: '1.250.000đ', status: 'Đang giao', items: 'iPhone 15 Pro, Ốp lưng Silicon', color: 'bg-blue-50 text-blue-600 border-blue-100', icon: Truck },
  { id: 'ORD-8812', date: '05/04/2026', total: '450.000đ', status: 'Hoàn thành', items: 'Sạc 20W USB-C', color: 'bg-emerald-50 text-emerald-600 border-emerald-100', icon: CheckCircle2 },
  { id: 'ORD-7701', date: '28/03/2026', total: '15.000.000đ', status: 'Hủy đơn', items: 'Macbook Air M2', color: 'bg-rose-50 text-rose-600 border-rose-100', icon: XCircle },
  { id: 'ORD-6625', date: '20/03/2026', total: '2.100.000đ', status: 'Hoàn thành', items: 'AirPods Pro 2', color: 'bg-emerald-50 text-emerald-600 border-emerald-100', icon: CheckCircle2 },
];

const OrderHistoryPage = () => {
  return (
    <div className="bg-[#F8FAFC] min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="space-y-12">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-4">
              <motion.div 
                 initial={{ opacity: 0, x: -20 }}
                 animate={{ opacity: 1, x: 0 }}
                 className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-xs font-black uppercase tracking-widest"
              >
                 <Package size={14} /> Quản lý đơn hàng
              </motion.div>
              <h1 className="text-5xl font-black text-slate-800 tracking-tighter uppercase italic">Lịch sử mua sắm</h1>
              <p className="text-slate-500 font-medium text-lg max-w-md">Theo dõi chi tiết quá trình vận chuyển và lịch sử các đơn hàng đã đặt.</p>
            </div>
            
            <div className="flex gap-4 p-2 bg-white rounded-2xl shadow-sm border border-slate-100">
               <button className="px-6 py-3 bg-blue-600 text-white rounded-xl font-black uppercase text-[10px] tracking-widest shadow-xl shadow-blue-200">Tất cả</button>
               <button className="px-6 py-3 hover:bg-slate-50 text-slate-500 rounded-xl font-black uppercase text-[10px] tracking-widest transition-all">Đang giao</button>
               <button className="px-6 py-3 hover:bg-slate-50 text-slate-500 rounded-xl font-black uppercase text-[10px] tracking-widest transition-all">Hoàn thành</button>
            </div>
          </div>

          {/* Orders List */}
          <div className="space-y-6">
             {ORDERS.map((order, idx) => (
                <motion.div 
                  key={order.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white rounded-[2.5rem] p-8 shadow-sm hover:shadow-2xl transition-all border border-slate-100 group relative overflow-hidden"
                >
                   {/* Background Glow */}
                   <div className="absolute top-[-50px] right-[-50px] w-48 h-48 bg-blue-500/5 blur-[80px] rounded-full group-hover:bg-blue-500/10 transition-all"></div>
                   
                   <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 relative z-10">
                      {/* Left side info */}
                      <div className="flex items-center gap-6">
                         <div className={`w-20 h-20 rounded-3xl flex items-center justify-center border transition-all group-hover:scale-110 group-hover:rotate-6 ${order.color}`}>
                            <order.icon size={32} />
                         </div>
                         <div className="space-y-1">
                            <h3 className="text-2xl font-black text-slate-800 tracking-tighter uppercase italic flex items-center gap-3">
                               {order.id} 
                               <span className="text-xs font-bold text-slate-300 not-italic tracking-widest font-sans">{order.date}</span>
                            </h3>
                            <p className="text-slate-500 font-medium line-clamp-1 max-w-sm">{order.items}</p>
                            <div className="flex items-center gap-4 pt-2">
                               <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-inner ${order.color}`}>
                                  {order.status}
                               </span>
                               <span className="text-blue-600 font-black text-lg italic">{order.total}</span>
                            </div>
                         </div>
                      </div>

                      {/* Right side actions */}
                      <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto">
                         <button className="flex-1 lg:flex-none px-8 py-4 bg-slate-900 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-blue-600 transition-all active:scale-95 flex items-center justify-center gap-2 group/btn">
                            Xem chi tiết <ChevronRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                         </button>
                         <button className="p-4 bg-slate-100 text-slate-400 hover:text-slate-800 rounded-2xl transition-all shadow-sm active:scale-95">
                            <ExternalLink size={20} />
                         </button>
                      </div>
                   </div>

                   {/* Progress Indicator (Simplified) */}
                   <div className="mt-10 pt-8 border-t border-slate-50 flex items-center justify-between">
                      {[
                        { label: 'Đặt hàng', done: true },
                        { label: 'Thanh toán', done: true },
                        { label: 'Đang giao', done: order.status === 'Đang giao' || order.status === 'Hoàn thành' },
                        { label: 'Nhận hàng', done: order.status === 'Hoàn thành' }
                      ].map((step, i, arr) => (
                        <React.Fragment key={i}>
                          <div className="flex flex-col items-center gap-2">
                             <div className={`w-3 h-3 rounded-full transition-all duration-1000 ${step.done ? 'bg-blue-600 scale-125 ring-4 ring-blue-100' : 'bg-slate-200'}`}></div>
                             <span className={`text-[9px] font-black uppercase tracking-widest ${step.done ? 'text-blue-600' : 'text-slate-300'}`}>{step.label}</span>
                          </div>
                          {i < arr.length - 1 && <div className={`flex-1 h-[2px] mx-4 transition-all duration-1000 ${arr[i+1].done ? 'bg-blue-600' : 'bg-slate-100'}`}></div>}
                        </React.Fragment>
                      ))}
                   </div>
                </motion.div>
             ))}
          </div>

          {/* Empty State / Help Sidebar */}
          <div className="bg-white p-12 rounded-[3.5rem] text-center space-y-6 border border-slate-100 shadow-sm relative overflow-hidden group">
             <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5"></div>
             <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-4 relative z-10 group-hover:rotate-12 transition-transform">
                <Box size={40} />
             </div>
             <div className="relative z-10 space-y-2">
                <h3 className="text-2xl font-black text-slate-800 uppercase tracking-tighter italic">Cần hỗ trợ về đơn hàng?</h3>
                <p className="text-slate-500 max-w-sm mx-auto font-medium">Nếu có bất kỳ thắc mắc nào về vận chuyển hoặc đổi trả, hãy liên hệ Shop ngay nhé!</p>
             </div>
             <div className="relative z-10 pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <button className="w-full sm:w-auto px-10 py-5 bg-blue-600 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 active:scale-95 flex items-center gap-3">
                   Chat với CSKH <ArrowRight size={16} />
                </button>
                <button className="w-full sm:w-auto px-10 py-5 bg-white border-2 border-slate-200 text-slate-700 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-slate-50 transition-all active:scale-95">Xem chính sách</button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderHistoryPage;
