import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Settings, 
  Award, 
  TrendingUp, 
  Target, 
  Clock, 
  Gift,
  CheckCircle2
} from 'lucide-react';
import StatsCard from '../../components/StatsCard';
import { loyaltyApi } from '../../services/loyaltyApi';
import toast from 'react-hot-toast';

const MemberPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [catalogs, setCatalogs] = useState([]);
  const [missions, setMissions] = useState([]);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchLoyaltyData();
  }, []);

  const fetchLoyaltyData = async () => {
    try {
      setLoading(true);
      const [userRes, catalogRes, missionRes, historyRes] = await Promise.all([
        loyaltyApi.getUserRewards('user123'),
        loyaltyApi.getRewardCatalog(),
        loyaltyApi.getMissions(),
        loyaltyApi.getHistory('user123')
      ]);

      setUserData(userRes);
      setCatalogs(catalogRes);
      setMissions(missionRes);
      setHistory(historyRes);
    } catch (error) {
      toast.error('Không thể tải dữ liệu thành viên');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleRedeem = async (rewardId) => {
    try {
      const result = await loyaltyApi.redeemReward('user123', rewardId);
      toast.success(result.message);
      fetchLoyaltyData(); // Refresh data
    } catch (error) {
      toast.error(error.message || 'Đổi quà thất bại');
    }
  };

  const tabs = [
    { id: 'overview', label: 'Tổng quan', icon: User },
    { id: 'rewards', label: 'Đổi thưởng', icon: Gift },
    { id: 'missions', label: 'Nhiệm vụ', icon: Target },
    { id: 'history', label: 'Lịch sử', icon: Clock },
    { id: 'settings', label: 'Cài đặt', icon: Settings }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20">
      <div className="bg-slate-900 pt-32 pb-48">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative">
              <div className="w-32 h-32 rounded-3xl bg-blue-500 flex items-center justify-center text-4xl font-black text-white shadow-2xl uppercase">
                {userData?.username?.charAt(0)}
              </div>
              <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-emerald-500 rounded-xl border-4 border-slate-900 flex items-center justify-center text-white">
                <CheckCircle2 size={18} />
              </div>
            </div>
            <div className="text-center md:text-left space-y-2">
              <h1 className="text-4xl font-black text-white tracking-tight uppercase italic">{userData?.username}</h1>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start pt-2">
                <span className="px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-blue-400 text-xs font-bold uppercase tracking-widest border border-white/10">
                  {userData?.rank} Rank
                </span>
                <span className="px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-slate-400 text-xs font-bold uppercase tracking-widest border border-white/10">
                  Thành viên từ 2024
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 -mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-[2.5rem] p-4 shadow-xl shadow-slate-200/50 border border-slate-100">
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold transition-all ${
                        activeTab === tab.id
                          ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                          : 'text-slate-500 hover:bg-slate-50 hover:text-blue-600'
                      }`}
                    >
                      <Icon size={20} />
                      {tab.label}
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              {activeTab === 'overview' && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-8"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <StatsCard 
                      title="Điểm tích lũy" 
                      value={userData?.points} 
                      unit="pts"
                      icon={Award}
                      color="blue"
                    />
                    <StatsCard 
                      title="Nhiệm vụ xong" 
                      value={userData?.missionsCompleted} 
                      unit="tks"
                      icon={Target}
                      color="emerald"
                    />
                    <StatsCard 
                      title="Mức chi tiêu" 
                      value={(userData?.totalSpent || 0).toLocaleString()} 
                      unit="đ"
                      icon={TrendingUp}
                      color="indigo"
                    />
                  </div>

                  <div className="bg-white rounded-[2.5rem] p-10 shadow-xl shadow-slate-200/50 border border-slate-100">
                    <h3 className="text-2xl font-black mb-8 uppercase italic">Tiến trình hạng {userData?.rank}</h3>
                    <div className="space-y-6">
                      <div className="flex justify-between font-bold text-slate-400 text-sm uppercase tracking-widest">
                        <span>Bạc</span>
                        <span className="text-blue-600">Vàng (Còn 500 pts)</span>
                      </div>
                      <div className="h-4 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-600 w-[65%] rounded-full shadow-[0_0_15px_rgba(37,99,235,0.4)]"></div>
                      </div>
                      <p className="text-slate-500 font-medium">Bạn đang ở top 5% thành viên tích cực nhất tháng này!</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'rewards' && (
                <motion.div
                  key="rewards"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  {catalogs.map(reward => (
                    <div key={reward.id} className="bg-white rounded-3xl p-6 shadow-xl border border-slate-100 flex gap-6">
                      <div className="w-24 h-24 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 text-3xl">
                        <Gift size={40} />
                      </div>
                      <div className="flex-1 space-y-3">
                        <h4 className="text-xl font-black uppercase italic tracking-tight">{reward.name}</h4>
                        <p className="text-slate-500 font-medium text-sm">{reward.description}</p>
                        <div className="flex items-center justify-between pt-2">
                          <span className="text-blue-600 font-black">{reward.points} pts</span>
                          <button 
                            disabled={userData.points < reward.points}
                            onClick={() => handleRedeem(reward.id)}
                            className="px-6 py-2 bg-slate-950 text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-blue-600 transition-all disabled:opacity-50"
                          >
                            Đổi ngay
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {activeTab === 'missions' && (
                <motion.div
                  key="missions"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  {missions.map(mission => (
                    <div key={mission.id} className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
                            <Target size={24} />
                          </div>
                          <div>
                            <h4 className="text-lg font-black uppercase italic">{mission.title}</h4>
                            <p className="text-slate-500 text-sm font-medium">{mission.description}</p>
                          </div>
                        </div>
                        <span className="text-blue-600 font-black">+{mission.points} pts</span>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-widest">
                          <span>Tiến độ</span>
                          <span>{mission.current}/{mission.requirement}</span>
                        </div>
                        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-emerald-500 rounded-full" 
                            style={{ width: `${(mission.current/mission.requirement) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {activeTab === 'history' && (
                <motion.div
                  key="history"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-[2.5rem] shadow-xl border border-slate-100 overflow-hidden"
                >
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-100">
                          <th className="px-8 py-6 text-left text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Sự kiện</th>
                          <th className="px-8 py-6 text-left text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Loại</th>
                          <th className="px-8 py-6 text-left text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Thay đổi</th>
                          <th className="px-8 py-6 text-left text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Ngày</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {history.map((item, i) => (
                          <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                            <td className="px-8 py-6 font-bold text-slate-700">{item.action}</td>
                            <td className="px-8 py-6">
                              <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                                item.type === 'earn' ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'
                              }`}>
                                {item.type === 'earn' ? 'Nhận' : 'Chi'}
                              </span>
                            </td>
                            <td className={`px-8 py-6 font-mono font-bold ${
                                item.type === 'earn' ? 'text-emerald-600' : 'text-red-600'
                              }`}>
                              {item.type === 'earn' ? '+' : '-'}{item.amount}
                            </td>
                            <td className="px-8 py-6 text-slate-400 text-sm font-medium">{item.date}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberPage;
