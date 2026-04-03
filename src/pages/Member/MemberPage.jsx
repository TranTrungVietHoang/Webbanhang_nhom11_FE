import React, { useState } from 'react';
import { 
    Crown, 
    TrendingUp, 
    Gift, 
    Award, 
    Flame, 
    Ticket, 
    Star, 
    Truck, 
    Box, 
    Sparkles, 
    ShoppingBag, 
    Users, 
    CalendarCheck, 
    Calendar
} from 'lucide-react';

const MemberPage = () => {
    const [activeTab, setActiveTab] = useState('Đổi thưởng');

    const statCards = [
        { icon: TrendingUp, value: '+ 1000', label: 'Điểm tháng này', iconColor: 'text-blue-500' },
        { icon: Gift, value: '5', label: 'Phần thưởng đã đổi', iconColor: 'text-green-500' },
        { icon: Award, value: '2/4', label: 'Nhiệm vụ hoàn thành', iconColor: 'text-purple-500' },
        { icon: Flame, value: '7', label: 'Ngày streak', iconColor: 'text-red-500' },
    ];

    const rewards = [
        { id: 1, name: 'Voucher giảm 50K', points: 250, stock: 50, icon: Ticket, iconColor: 'text-red-400' },
        { id: 2, name: 'Voucher giảm 100K', points: 550, stock: 50, icon: Star, iconColor: 'text-yellow-400' },
        { id: 3, name: 'Voucher giảm 200K', points: 1000, stock: 20, icon: Gift, iconColor: 'text-red-500' },
        { id: 4, name: 'Freeship toàn quốc', points: 150, stock: 100, icon: Truck, iconColor: 'text-teal-500' },
        { id: 5, name: 'Mystery Box', points: 300, stock: 15, icon: Box, iconColor: 'text-pink-300' },
        { id: 6, name: 'Quà đặc biệt', points: 3000, stock: 1, icon: Sparkles, iconColor: 'text-blue-500', disabled: true },
    ];

    const history = [
        { id: 1, title: 'Mua hàng đơn #1245', date: '24/01/2026', points: '+500', isEarn: true, icon: ShoppingBag },
        { id: 2, title: 'Hoàn thành nhiệm vụ hàng ngày', date: '24/01/2026', points: '+50', isEarn: true, icon: Award },
        { id: 3, title: 'Đổi voucher giảm 100k', date: '23/01/2026', points: '-500', isEarn: false, icon: Gift },
        { id: 4, title: 'Giới thiệu bạn bè', date: '22/01/2026', points: '+200', isEarn: true, icon: Users },
        { id: 5, title: 'Checkin liên tiếp 7 ngày', date: '21/01/2026', points: '+100', isEarn: true, icon: CalendarCheck },
        { id: 6, title: 'Viết đánh giá sản phẩm', date: '20/01/2026', points: '+60', isEarn: true, icon: Star },
    ];

    const missions = [
        { id: 1, title: 'Check-in hàng ngày', desc: 'Truy cập website mỗi ngày', points: '+10 điểm', progress: 100, icon: Calendar },
        { id: 2, title: 'Mua sắm trong tuần', desc: 'Hoàn thành 1 đơn hàng', points: '+100 điểm', progress: 0, icon: ShoppingBag },
        { id: 3, title: 'Viết 3 đánh giá', desc: 'Đánh giá sản phẩm đã mua', points: '+20 điểm', progress: 33, icon: Star },
        { id: 4, title: 'Giới thiệu bạn bè', desc: 'Mời 2 người đăng ký', points: '+100 điểm', progress: 50, icon: Users },
    ];

    return (
        <div className="bg-white min-h-screen pb-20 pt-6">
            <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
                
                {/* Gold Banner */}
                <div className="bg-gradient-to-r from-[#d9ca96] via-[#eee3bd] to-[#d9ca96] rounded-xl p-8 text-white relative overflow-hidden mb-6 shadow-sm">
                    <div className="flex justify-between items-start mb-6 w-full">
                        <div>
                            <Crown className="w-10 h-10 mb-2 opacity-90 stroke-2" stroke="white" fill="transparent" />
                            <h1 className="text-3xl font-light tracking-wide mb-1 opacity-95">Gold Member</h1>
                            <p className="text-sm font-medium opacity-90">Chào mừng trở lại !</p>
                            <p className="text-xs mt-3 opacity-90">Hạng hiện tại Gold</p>
                        </div>
                        <div className="text-right">
                            <p className="text-3xl font-light tracking-wide">2900</p>
                            <p className="text-lg opacity-90 font-medium">Điểm thưởng</p>
                        </div>
                    </div>
                    
                    <div className="w-full">
                        <div className="flex justify-between items-end mb-2 text-xs opacity-90 font-medium">
                            <p>Còn 2100 điểm nữa để lên hạng</p>
                            <p>Hạng tiếp theo Platium</p>
                        </div>
                        <div className="w-full bg-white/50 rounded-full h-2.5">
                            <div className="bg-[#ffd700] h-2.5 rounded-full" style={{ width: '58%' }}></div>
                        </div>
                    </div>
                </div>

                {/* Status Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {statCards.map((stat, idx) => (
                        <div key={idx} className="bg-[#f0f2f5] rounded-xl p-4 flex items-center justify-center gap-3 w-full border border-gray-100">
                            <stat.icon className={`w-6 h-6 ${stat.iconColor} flex-shrink-0`} />
                            <div className="flex flex-col items-center">
                                <span className="font-bold text-gray-800 text-sm whitespace-nowrap">{stat.value}</span>
                                <span className="text-xs text-gray-600 whitespace-nowrap">{stat.label}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Tabs */}
                <div className="bg-[#e8ecef] rounded-lg p-1.5 flex gap-1 mb-8 overflow-x-auto text-sm">
                    {['Tổng quan', 'Đổi thưởng', 'Nhiệm vụ', 'Lịch sử'].map(tab => (
                        <button 
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-6 py-2 rounded-md font-medium whitespace-nowrap transition-colors ${
                                activeTab === tab 
                                    ? 'bg-[#0088ff] text-white shadow-sm' 
                                    : 'text-gray-600 hover:bg-gray-200'
                            }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                <div className="font-sans">
                    
                    {/* Đổi thưởng */}
                    {activeTab === 'Đổi thưởng' && (
                        <div>
                            <h2 className="text-lg font-bold text-gray-800 mb-4 font-serif">Đổi điểm lấy quà</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {rewards.map(reward => (
                                    <div key={reward.id} className="bg-[#eef0f3] rounded-xl overflow-hidden border border-gray-200 flex flex-col items-center p-6 pb-4">
                                        <div className="mb-4">
                                            <reward.icon className={`w-12 h-12 ${reward.iconColor}`} strokeWidth={1.5} />
                                        </div>
                                        <h3 className="font-sans font-semibold text-gray-800 mb-4">{reward.name}</h3>
                                        <div className="w-full flex justify-between items-end mb-2">
                                            <span className="text-[#0066cc] font-medium text-sm">{reward.points} điểm</span>
                                            <span className="text-gray-500 text-[10px]">Còn {reward.stock}</span>
                                        </div>
                                        <button 
                                            className={`w-full py-2 rounded-md font-sans text-sm font-medium transition-colors ${
                                                reward.disabled 
                                                    ? 'bg-[#0055d4] text-white cursor-not-allowed' 
                                                    : 'bg-[#0066ff] hover:bg-blue-700 text-white'
                                            }`}
                                        >
                                            {reward.disabled ? 'Không đủ điểm' : 'Đổi ngay'}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Lịch sử */}
                    {activeTab === 'Lịch sử' && (
                        <div>
                            <h2 className="text-lg font-bold text-gray-800 mb-4 font-sans">Lịch sử điểm</h2>
                            <div className="space-y-4">
                                {history.map(item => (
                                    <div key={item.id} className="bg-[#f2f4f6] rounded-xl p-5 flex items-center justify-between border border-gray-100">
                                        <div className="flex items-center gap-4">
                                            <item.icon className={`w-5 h-5 ${item.isEarn ? 'text-green-500' : 'text-red-300'}`} />
                                            <div>
                                                <p className="font-bold text-sm text-gray-800">{item.title}</p>
                                                <p className="text-xs font-sans text-gray-800 font-medium mt-1">{item.date}</p>
                                            </div>
                                        </div>
                                        <div className={`font-bold text-sm ${item.isEarn ? 'text-green-500' : 'text-red-500'}`}>
                                            {item.points}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Nhiệm vụ */}
                    {activeTab === 'Nhiệm vụ' && (
                        <div>
                            <h2 className="text-lg font-bold text-gray-800 mb-4 font-sans">Nhiệm vụ hôm nay</h2>
                            <div className="space-y-4">
                                {missions.map(mission => (
                                    <div key={mission.id} className="bg-[#f0f2f5] rounded-xl p-6 flex flex-col border border-gray-100">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center gap-4">
                                                <mission.icon className="w-6 h-6 text-[#0066ff]" strokeWidth={1.5}/>
                                                <div>
                                                    <p className="font-bold text-sm text-gray-800">{mission.title}</p>
                                                    <p className="text-xs text-gray-600 font-sans mt-0.5">{mission.desc}</p>
                                                </div>
                                            </div>
                                            <div className="bg-[#ffe8a1] px-3 py-1 rounded-full">
                                                <span className="text-[11px] font-medium text-gray-800">{mission.points}</span>
                                            </div>
                                        </div>
                                        
                                        <div className="w-full h-2.5 bg-[#b0b0b0] rounded-full overflow-hidden mb-2">
                                            <div className="h-full bg-[#0066ff] rounded-full" style={{ width: `${mission.progress}%` }}></div>
                                        </div>
                                        <p className="text-[11px] text-gray-500 font-sans">{mission.progress}% hoàn thành</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Tổng quan */}
                    {activeTab === 'Tổng quan' && (
                        <div className="text-center py-20 text-gray-500">
                            Dữ liệu tổng quan đang được cập nhật...
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default MemberPage;
