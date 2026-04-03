import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, 
  Search, 
  MapPin, 
  Package, 
  Truck, 
  CheckCircle2, 
  ExternalLink,
  ChevronRight,
  TrendingUp,
  AlertCircle,
  Clock
} from 'lucide-react';
import { loyaltyApi } from '../../services/loyaltyApi';
import toast from 'react-hot-toast';

const OrderHistoryPage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                setLoading(true);
                // Integrating with loyalty history or dedicated orders endpoint if available
                const data = await loyaltyApi.getHistory('user123');
                // Filter for purchase actions and map to order-like structure
                const mappedOrders = data
                  .filter(item => item.action.toLowerCase().includes('đơn hàng') || item.action.toLowerCase().includes('mua'))
                  .map((item, idx) => ({
                    id: `ORD-${9900 + idx}`,
                    date: item.date,
                    status: 'Delivered',
                    total: item.amount * 1000, // Dummy scale
                    items: [item.action],
                    points: item.amount
                  }));
                setOrders(mappedOrders);
            } catch (error) {
                console.error("Failed to fetch orders:", error);
                toast.error("Không thể tải lịch sử đơn hàng");
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    const filteredOrders = orders.filter(o => 
        o.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
        o.items.some(item => item.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="bg-[#F8FAFC] min-h-screen pt-32 pb-20">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8 text-white">
                    <div className="space-y-4">
                        <span className="inline-block px-4 py-1.5 bg-blue-600/10 text-blue-600 rounded-full text-xs font-black uppercase tracking-widest border border-blue-100">
                           Purchase History
                        </span>
                        <h1 className="text-5xl font-black tracking-tighter uppercase italic text-slate-800">Đơn hàng của tôi</h1>
                        <div className="w-24 h-2 bg-blue-600 rounded-full"></div>
                    </div>
                    
                    <div className="flex-1 flex gap-4 max-w-xl w-full">
                        <div className="relative flex-1 group">
                           <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={20} />
                           <input 
                             type="text" 
                             placeholder="Tìm kiếm đơn hàng theo mã hoặc sản phẩm..."
                             value={searchTerm}
                             onChange={(e) => setSearchTerm(e.target.value)}
                             className="w-full pl-14 pr-6 py-4 bg-white border border-slate-200 rounded-3xl outline-none focus:ring-4 focus:ring-blue-50 focus:border-blue-600 transition-all font-medium text-slate-700 shadow-sm"
                           />
                        </div>
                    </div>
                </div>

                {loading ? (
                    <div className="space-y-6">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="h-[200px] bg-white rounded-[2.5rem] animate-pulse border border-slate-100 shadow-sm"></div>
                        ))}
                    </div>
                ) : (
                    <div className="space-y-8">
                        <AnimatePresence>
                            {filteredOrders.map((order, idx) => (
                                <motion.div 
                                    key={order.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-xl shadow-slate-200/50 group"
                                >
                                    <div className="p-8 md:p-10 flex flex-col md:flex-row gap-10">
                                        <div className="flex-shrink-0">
                                           <div className="w-24 h-24 bg-blue-50 text-blue-600 rounded-[2rem] flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-500">
                                              <ShoppingBag size={40} />
                                           </div>
                                        </div>
                                        
                                        <div className="flex-1 space-y-6">
                                           <div className="flex flex-wrap items-center justify-between gap-4">
                                              <div className="space-y-1">
                                                 <h3 className="text-2xl font-black text-slate-800 uppercase italic tracking-tight">{order.id}</h3>
                                                 <p className="text-slate-400 font-bold text-xs uppercase tracking-[0.2em]">{order.date}</p>
                                              </div>
                                              <span className={`px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest flex items-center gap-2 ${
                                                  order.status === 'Delivered' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-blue-50 text-blue-600 border border-blue-100'
                                              }`}>
                                                  <CheckCircle2 size={14} /> {order.status === 'Delivered' ? 'Giao thành công' : 'Đang xử lý'}
                                              </span>
                                           </div>
                                           
                                           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4 border-t border-slate-50 italic font-medium">
                                              <div className="flex items-center gap-3 text-slate-500">
                                                 <Package size={20} className="text-blue-600/50" />
                                                 <span>{order.items[0]}</span>
                                              </div>
                                              <div className="flex items-center gap-3 text-slate-500">
                                                 <TrendingUp size={20} className="text-emerald-600/50" />
                                                 <span>Tích lũy: <b className="text-slate-800">+{order.points} pts</b></span>
                                              </div>
                                              <div className="flex items-center gap-3 text-slate-500">
                                                 <MapPin size={20} className="text-rose-600/50" />
                                                 <span>Hà Nội, Việt Nam</span>
                                              </div>
                                           </div>
                                        </div>
                                        
                                        <div className="flex flex-col justify-between items-end border-l border-slate-100 pl-10">
                                           <div className="text-right">
                                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Tổng cộng</p>
                                              <p className="text-3xl font-black text-blue-600 tracking-tighter">{order.total.toLocaleString()} VNĐ</p>
                                           </div>
                                           <button className="group flex items-center gap-3 bg-slate-950 text-white px-8 py-4 rounded-2xl font-bold transition-all hover:bg-blue-600 shadow-lg shadow-slate-200">
                                              Chi tiết
                                              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                           </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}
                
                {!loading && filteredOrders.length === 0 && (
                    <div className="text-center py-32 bg-white rounded-[3rem] border border-slate-100 shadow-sm flex flex-col items-center">
                        <Clock className="w-16 h-16 text-slate-200 mb-6" />
                        <h2 className="text-2xl font-black text-slate-400 uppercase italic tracking-tighter mb-4">Chưa có lịch sử đơn hàng</h2>
                        <button className="px-10 py-4 bg-blue-600 text-white rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-200">
                           Mua sắm ngay
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrderHistoryPage;
