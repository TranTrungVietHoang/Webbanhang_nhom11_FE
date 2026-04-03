import { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import loyaltyApi from '../../api/loyaltyApi';
import { Crown, TrendingUp, Gift, Award, Flame, ShoppingBag, CalendarCheck, Star, UserPlus } from 'lucide-react';

const MemberBanner = ({ profile }) => {
    if (!profile) return null;
    
    // Calculate progress percentage
    const progressPercent = Math.min((profile.currentPoints / profile.nextTierPoints) * 100, 100);

    return (
        <div className="w-full bg-gradient-to-r from-[#D7D29F] via-[#E9E4A9] to-[#D7D29F] rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-sm relative overflow-hidden text-white mb-6 min-h-[220px]">
            {/* Subtle background overlay effect */}
            <div className="absolute inset-0 bg-white opacity-10"></div>
            
            <div className="flex justify-between items-start z-10 relative">
                <div>
                    <Crown className="w-12 h-12 mb-3 text-white fill-transparent opacity-90 stroke-2" />
                    <h1 className="text-4xl font-light tracking-wide mb-2 text-white/95">{profile.tierName} Member</h1>
                    <p className="text-white/80 font-medium">Chào mừng trở lại!</p>
                    <p className="text-white/70 text-sm mt-1">Hạng hiện tại {profile.tierName}</p>
                </div>
                <div className="text-right">
                    <p className="text-4xl font-light mb-1">{profile.currentPoints}</p>
                    <p className="text-lg font-medium text-white/90">Điểm thưởng</p>
                </div>
            </div>

            <div className="mt-8 z-10 relative">
                <div className="flex justify-between items-end mb-2 text-sm text-white/90">
                    <span>Còn {profile.requiredPoints} điểm nữa để lên hạng</span>
                    <span>Hạng tiếp theo {profile.nextTierName}</span>
                </div>
                <div className="h-3 w-full bg-white/40 rounded-full overflow-hidden flex">
                    <div className="h-full bg-[#FFD700] rounded-full shadow-[0_0_10px_rgba(255,215,0,0.4)]" style={{ width: `${progressPercent}%` }}></div>
                </div>
            </div>
        </div>
    );
};

const StatCard = ({ icon: Icon, value, title, iconBgColor, iconColor }) => (
    <div className="bg-[#F0F2F5] rounded-xl flex items-center p-4 shadow-sm w-full">
        <div className={`p-3 rounded-xl flex-shrink-0 mr-4 ${iconBgColor}`}>
            <Icon className={`w-6 h-6 ${iconColor}`} />
        </div>
        <div>
            <p className="text-lg font-bold text-gray-800">{value}</p>
            <p className="text-sm text-gray-600">{title}</p>
        </div>
    </div>
);

const TierList = ({ tiers }) => {
    if (!tiers) return null;
    
    // UI mapping for tier colors
    const getTierStyle = (id) => {
        switch(id) {
            case 1: return { color: "bg-[#F39C12]", name: "Bronze" };
            case 2: return { color: "bg-[#95A5A6]", name: "Silver" };
            case 3: return { color: "bg-[#F1C40F]", name: "Gold" };
            case 4: return { color: "bg-[#9B59B6]", name: "Platinum" };
            default: return { color: "bg-gray-400", name: "Unknown" };
        }
    };

    return (
        <div className="mb-8">
            <h2 className="text-xl font-medium text-gray-800 mb-4 tracking-wide font-serif">Hạng thành viên</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {tiers.map((tier) => {
                    const style = getTierStyle(tier.id);
                    return (
                        <div key={tier.id} className={`rounded-xl border ${tier.isActive ? 'border-yellow-400 bg-[#F0F2F5]' : 'border-gray-200 bg-[#E8ECEF]'} p-6 py-8 shadow-sm flex flex-col justify-start relative`}>
                            <div className={`${style.color} w-10 h-10 rounded-full flex justify-center items-center text-white font-medium mb-4 shadow-sm`}>
                                {tier.id}
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 font-serif">{tier.name}</h3>
                            <p className="text-xs text-gray-500 mb-4 border-b border-gray-300 pb-2">{tier.pointRange}</p>
                            
                            <ul className="space-y-2 flex-grow">
                                {tier.benefits.map((benefit, idx) => (
                                    <li key={idx} className="flex items-start text-sm text-gray-700">
                                        <span className="text-[#F1C40F] mr-2">✦</span>
                                        {benefit}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

const PointRulesList = ({ rules }) => {
    if (!rules) return null;

    const getIcon = (iconName) => {
        switch(iconName) {
            case 'shopping-bag': return <ShoppingBag className="w-6 h-6 text-blue-500 mr-3" />;
            case 'calendar-check': return <CalendarCheck className="w-6 h-6 text-green-500 mr-3" />;
            case 'star': return <Star className="w-6 h-6 text-yellow-500 mr-3" />;
            case 'user-plus': return <UserPlus className="w-6 h-6 text-purple-500 mr-3" />;
            default: return null;
        }
    };

    return (
        <div>
            <h2 className="text-xl font-medium text-gray-800 mb-4 tracking-wide font-serif">Cách tính điểm</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {rules.map((rule) => (
                    <div key={rule.id} className="bg-[#E4E6E8] border border-gray-300 rounded-lg p-4 flex items-center">
                        {getIcon(rule.icon)}
                        <div>
                            <h4 className="font-bold text-gray-800 text-base">{rule.title}</h4>
                            <p className="text-sm text-gray-600">{rule.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const MemberPage = () => {
    const [loyaltyData, setLoyaltyData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLoyalty = async () => {
            try {
                const data = await loyaltyApi.getProfile();
                setLoyaltyData(data);
            } catch (error) {
                console.error("Lỗi fetch API loyalty:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchLoyalty();
    }, []);

    return (
        <div className="min-h-screen bg-white font-sans flex flex-col">
            <Header />

            <main className="flex-1 w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-20 max-w-[1200px]">
                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D7D29F]"></div>
                    </div>
                ) : (
                    loyaltyData && (
                        <>
                            {/* Top Banner */}
                            <MemberBanner profile={loyaltyData.profile} />

                            {/* Stat Cards */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                                <StatCard 
                                    icon={TrendingUp} 
                                    value={`+ ${loyaltyData.profile.stats.monthPoints}`} 
                                    title="Điểm tháng này" 
                                    iconBgColor="bg-blue-100" 
                                    iconColor="text-blue-500" 
                                />
                                <StatCard 
                                    icon={Gift} 
                                    value={loyaltyData.profile.stats.rewardsRedeemed} 
                                    title="Phần thưởng đã đổi" 
                                    iconBgColor="bg-green-100" 
                                    iconColor="text-green-500" 
                                />
                                <StatCard 
                                    icon={Award} 
                                    value={`${loyaltyData.profile.stats.missionsCompleted}/${loyaltyData.profile.stats.missionsTotal}`} 
                                    title="Nhiệm vụ hoàn thành" 
                                    iconBgColor="bg-purple-100" 
                                    iconColor="text-purple-500" 
                                />
                                <StatCard 
                                    icon={Flame} 
                                    value={loyaltyData.profile.stats.streakDays} 
                                    title="Ngày streak" 
                                    iconBgColor="bg-red-100" 
                                    iconColor="text-red-500" 
                                />
                            </div>

                            {/* Navigation Tabs */}
                            <div className="flex bg-[#E8ECEF] rounded-lg p-1.5 mb-8 space-x-1 overflow-x-auto overflow-y-hidden text-sm">
                                <button className="px-6 py-2 rounded shadow-sm bg-[#248EEB] text-white font-medium whitespace-nowrap">Tổng quan</button>
                                <button className="px-6 py-2 rounded bg-transparent text-gray-600 hover:bg-gray-200 transition font-medium whitespace-nowrap">Đổi thưởng</button>
                                <button className="px-6 py-2 rounded bg-transparent text-gray-600 hover:bg-gray-200 transition font-medium whitespace-nowrap">Nhiệm vụ</button>
                                <button className="px-6 py-2 rounded bg-transparent text-gray-600 hover:bg-gray-200 transition font-medium whitespace-nowrap">Lịch sử</button>
                            </div>

                            {/* Tiers List */}
                            <TierList tiers={loyaltyData.tiers} />

                            {/* Point Rules */}
                            <PointRulesList rules={loyaltyData.rules} />
                        </>
                    )
                )}
            </main>
        </div>
    );
};

export default MemberPage;
