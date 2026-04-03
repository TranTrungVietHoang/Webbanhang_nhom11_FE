import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Ticket, 
  Search, 
  Clock, 
  CheckCircle2, 
  Copy, 
  AlertCircle,
  Tag,
  ArrowRight,
  TrendingDown,
  Gift
} from 'lucide-react';
import loyaltyApi from '../../api/loyaltyApi';
import toast from 'react-hot-toast';

const DiscountCodesPage = () => {
    const [coupons, setCoupons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeFilter, setActiveFilter] = useState('all');

    useEffect(() => {
        const fetchCoupons = async () => {
            try {
                setLoading(true);
                // In actual develop branch this might use a specific coupons API
                // but we integrate with reward catalog for consistency
                const data = await loyaltyApi.getRewardCatalog();
                // Filter for items that look like discount codes
                setCoupons(data.filter(item => item.id.includes('vch') || item.id.includes('off') || item.points < 3000));
            } catch (error) {
                console.error("Failed to fetch coupons:", error);
                toast.error("Không thể tải danh sách mã giảm giá");
            } finally {
                setLoading(false);
            }
        };
        fetchCoupons();
    }, []);

    const copyToClipboard = (code) => {
        navigator.clipboard.writeText(code);
        toast.success(`Đã sao chép mã: ${code}`, {
            style: { borderRadius: '1rem', background: '#1e293b', color: '#fff' }
        });
    };

    const filteredCoupons = coupons.filter(c => {
        const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase());
        if (activeFilter === 'all') return matchesSearch;
        return matchesSearch; // Extend logic if category is added
    });

    return (
        <div className="bg-[#F8FAFC] min-h-screen pt-32 pb-20">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
                    <div className="space-y-4">
                        <span className="inline-block px-4 py-1.5 bg-blue-600/10 text-blue-600 rounded-full text-xs font-black uppercase tracking-widest border border-blue-100">
                           Special Offers
                        </span>
                        <h1 className="text-5xl font-black tracking-tighter uppercase italic text-slate-800">Kho Voucher</h1>
                        <div className="w-24 h-2 bg-blue-600 rounded-full"></div>
                    </div>
                    
                    <div className="flex-1 flex gap-4 max-w-xl w-full">
                        <div className="relative flex-1 group">
                           <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={20} />
                           <input 
                             type="text" 
                             placeholder="Tìm kiếm mã giảm giá..."
                             value={searchTerm}
                             onChange={(e) => setSearchTerm(e.target.value)}
                             className="w-full pl-14 pr-6 py-4 bg-white border border-slate-200 rounded-3xl outline-none focus:ring-4 focus:ring-blue-50 focus:border-blue-600 transition-all font-medium text-slate-700 shadow-sm"
                           />
                        </div>
                    </div>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3, 4, 5, 6].map(i => (
                            <div key={i} className="h-[200px] bg-white rounded-[2.5rem] animate-pulse border border-slate-100"></div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <AnimatePresence>
                            {filteredCoupons.map((coupon, idx) => (
                                <motion.div 
                                    key={coupon.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                    className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-xl shadow-slate-200/50 group relative"
                                >
                                    <div className="p-8 border-b border-dashed border-slate-200 relative">
                                        <div className="absolute -left-4 -bottom-4 w-8 h-8 bg-[#F8FAFC] rounded-full border border-slate-100"></div>
                                        <div className="absolute -right-4 -bottom-4 w-8 h-8 bg-[#F8FAFC] rounded-full border border-slate-100"></div>
                                        
                                        <div className="flex items-start justify-between mb-6">
                                            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-500">
                                                <Ticket size={28} />
                                            </div>
                                            <span className="px-4 py-1.5 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-100">
                                                Hạn dùng 30 ngày
                                            </span>
                                        </div>
                                        
                                        <h3 className="text-xl font-black text-slate-800 uppercase italic tracking-tight mb-2">{coupon.name}</h3>
                                        <p className="text-slate-500 text-sm font-medium line-clamp-2">{coupon.description}</p>
                                    </div>
                                    
                                    <div className="p-8 bg-slate-50/50 flex items-center justify-between">
                                        <div>
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Mã giảm giá</p>
                                            <p className="font-mono font-bold text-lg text-blue-600">APP{coupon.id.toUpperCase()}</p>
                                        </div>
                                        <button 
                                            onClick={() => copyToClipboard(`APP${coupon.id.toUpperCase()}`)}
                                            className="flex items-center gap-2 p-4 bg-slate-950 text-white rounded-2xl hover:bg-blue-600 transition-all active:scale-95 shadow-lg shadow-slate-200"
                                        >
                                            <Copy size={18} />
                                            <span className="text-xs font-bold uppercase tracking-widest">Sao chép</span>
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}
                
                {!loading && filteredCoupons.length === 0 && (
                    <div className="text-center py-32 bg-white rounded-[3rem] border border-slate-100 shadow-sm">
                        <AlertCircle className="w-16 h-16 text-slate-200 mx-auto mb-6" />
                        <h2 className="text-2xl font-black text-slate-400 uppercase italic tracking-tighter">Không tìm thấy voucher</h2>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DiscountCodesPage;
