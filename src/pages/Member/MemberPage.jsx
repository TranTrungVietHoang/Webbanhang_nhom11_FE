import { useState, useEffect } from 'react';
import MemberCard from '../../components/MemberCard';
import StatsCard from '../../components/StatsCard';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Target, Gift, Users, Calendar, Star, CheckCircle2, Ticket, Truck, Box, Sparkles } from 'lucide-react';

const icons = {
  ShoppingBag, Target, Gift, Users, Calendar, Star, Ticket, Truck, Box, Sparkles
};

const TABS = ['Tổng quan', 'Đổi thưởng', 'Nhiệm vụ', 'Lịch sử'];

const MemberPage = () => {
    const [activeTab, setActiveTab] = useState('Tổng quan');
    const [userData, setUserData] = useState(null);
    const [history, setHistory] = useState([]);
    const [missions, setMissions] = useState([]);
    const [availableRewards, setAvailableRewards] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                const [statsRes, historyRes, missionsRes, rewardsRes] = await Promise.all([
                    fetch('http://localhost:3000/api/user/rewards'),
                    fetch('http://localhost:3000/api/user/history'),
                    fetch('http://localhost:3000/api/user/missions'),
                    fetch('http://localhost:3000/api/user/available-rewards'),
                ]);
                
                const stats = await statsRes.json();
                const hist = await historyRes.json();
                const miss = await missionsRes.json();
                const rewards = await rewardsRes.json();
                
                setUserData(stats);
                setHistory(hist);
                setMissions(miss);
                setAvailableRewards(rewards);
            } catch (err) {
                console.error("Error fetching member data:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchAllData();
    }, []);

    if (loading) return (
        <div className="flex items-center justify-center py-32">
            <div className="w-12 h-12 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-50">

            <main className="flex-1 w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-[1200px] space-y-8">
                {/* Gold Member Card */}
                <MemberCard user={userData} />

                {/* Quick Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {userData?.stats.map((stat) => (
                        <StatsCard key={stat.id} {...stat} />
                    ))}
                </div>

                {/* Navigation Tabs */}
                <div className="border-b border-slate-200">
                    <div className="flex gap-8 overflow-x-auto pb-4 scrollbar-hide">
                        {TABS.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`relative font-bold text-lg transition-colors pb-1 whitespace-nowrap ${
                                    activeTab === tab ? 'text-blue-600' : 'text-slate-500 hover:text-slate-700'
                                }`}
                            >
                                {tab}
                                {activeTab === tab && (
                                    <motion.div 
                                        layoutId="activeTabUnderline"
                                        className="absolute bottom-[-17px] left-0 right-0 h-1 bg-blue-600 rounded-full"
                                    />
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Tab Content */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.3 }}
                        className="min-h-[400px]"
                    >
                        {activeTab === 'Lịch sử' && (
                            <div className="space-y-4">
                                {history.map((item) => {
                                    const Icon = icons[item.icon] || Star;
                                    return (
                                        <div key={item.id} className="bg-white p-6 rounded-2xl flex items-center justify-between shadow-sm border border-slate-100 group hover:shadow-md transition-all">
                                            <div className="flex items-center gap-5">
                                                <div className={`p-4 rounded-xl ${item.points > 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                                                    <Icon size={24} />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-slate-800 uppercase tracking-tight">{item.label}</p>
                                                    <p className="text-slate-400 text-sm font-medium">{item.date}</p>
                                                </div>
                                            </div>
                                            <div className={`text-2xl font-black ${item.points > 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                                                {item.points > 0 ? `+${item.points}` : item.points}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}

                        {activeTab === 'Nhiệm vụ' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {missions.map((mission) => {
                                    const Icon = icons[mission.icon] || Target;
                                    return (
                                        <div key={mission.id} className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm space-y-5 hover:shadow-md transition-all group">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-4">
                                                   <div className="p-3 bg-blue-50 text-blue-600 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-all transform group-hover:rotate-12">
                                                      <Icon size={24} />
                                                   </div>
                                                   <div>
                                                      <p className="font-bold text-slate-800 text-lg uppercase tracking-tight">{mission.label}</p>
                                                      <p className="text-slate-400 text-sm font-medium">{mission.description}</p>
                                                   </div>
                                                </div>
                                                <div className="text-right">
                                                   <span className="text-blue-600 font-black text-xl">+{mission.reward} điểm</span>
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-widest">
                                                   <span>{mission.progress}% hoàn thành</span>
                                                   {mission.progress === 100 && <span className="text-emerald-500 flex items-center gap-1"><CheckCircle2 size={12} /> Done</span>}
                                                </div>
                                                <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                                                   <motion.div 
                                                     initial={{ width: 0 }}
                                                     animate={{ width: `${mission.progress}%` }}
                                                     className={`h-full ${mission.progress === 100 ? 'bg-emerald-400' : 'bg-blue-500'}`}
                                                   />
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}

                        {activeTab === 'Tổng quan' && (
                            <div className="bg-white p-12 rounded-3xl text-center space-y-6 border border-slate-100 shadow-sm">
                                <div className="w-24 h-24 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto">
                                    <Star size={48} fill="currentColor" />
                                </div>
                                <h3 className="text-3xl font-black text-slate-800 uppercase tracking-tighter italic">Đặc quyền Gold Member</h3>
                                <p className="text-slate-500 max-w-lg mx-auto leading-relaxed font-medium">
                                    Bạn đang hạng Vàng với nhiều quyền lợi hấp dẫn. Tiếp tục tích lũy điểm để nhận ưu đãi Platinum.
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6">
                                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                                        <p className="text-blue-500 font-black text-xl mb-1">50%</p>
                                        <p className="text-slate-800 font-bold uppercase text-xs tracking-widest">Giảm phí ship</p>
                                    </div>
                                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                                        <p className="text-blue-500 font-black text-xl mb-1">X2</p>
                                        <p className="text-slate-800 font-bold uppercase text-xs tracking-widest">Điểm sinh nhật</p>
                                    </div>
                                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                                        <p className="text-blue-500 font-black text-xl mb-1">40K</p>
                                        <p className="text-slate-800 font-bold uppercase text-xs tracking-widest">Voucher tháng</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'Đổi thưởng' && (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {availableRewards.map((reward) => {
                                    const Icon = icons[reward.icon] || Gift;
                                    const canAfford = userData?.points >= reward.points;
                                    return (
                                        <div key={reward.id} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center group transition-all hover:shadow-lg">
                                            <div className={`p-6 rounded-2xl mb-4 ${reward.color}`}>
                                                <Icon size={48} />
                                            </div>
                                            <h4 className="text-xl font-bold text-slate-800 mb-2 uppercase tracking-tight">{reward.name}</h4>
                                            <div className="flex justify-between w-full text-sm font-bold mb-6 px-4">
                                                <span className="text-blue-600 italic">{reward.points.toLocaleString()} điểm</span>
                                                <span className="text-slate-400">Còn {reward.stock}</span>
                                            </div>
                                            <button 
                                                disabled={!canAfford}
                                                className={`w-full py-4 rounded-xl font-black uppercase text-sm transition-all shadow-sm ${
                                                    canAfford 
                                                        ? 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-blue-200' 
                                                        : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                                                }`}
                                            >
                                                {canAfford ? 'Đổi ngay' : 'Không đủ điểm'}
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </main>
        </div>
    );
};

export default MemberPage;
