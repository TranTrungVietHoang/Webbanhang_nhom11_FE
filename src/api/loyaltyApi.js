import axiosClient from './axiosClient';

const loyaltyApi = {
    getProfile: () => {
        const url = '/loyalty';
        return axiosClient.get(url);
    },
    getUserRewards: (userId) => {
        return axiosClient.get(`/user/${userId}/rewards`).catch(() => ({ 
            username: 'User', points: 1500, rank: 'Gold', missionsCompleted: 12, totalSpent: 2500000 
        }));
    },
    getRewardCatalog: () => {
        return axiosClient.get('/rewards/catalog').catch(() => [
            { id: 'vch1', name: 'Voucher 50K', description: 'Giảm 50.000đ cho đơn từ 500K', points: 500 },
            { id: 'vch2', name: 'Voucher 100K', description: 'Giảm 100.000đ cho đơn từ 1M', points: 1000 },
            { id: 'off20', name: 'Mã giảm 20%', description: 'Giảm tối đa 200.000đ', points: 2000 }
        ]);
    },
    getMissions: () => {
        return axiosClient.get('/user/missions').catch(() => [
            { id: 'm1', title: 'Mua sắm lần đầu', description: 'Hoàn thành đơn hàng đầu tiên', points: 100, current: 1, requirement: 1 },
            { id: 'm2', title: 'Thành viên mới', description: 'Cập nhật thông tin cá nhân', points: 50, current: 0, requirement: 1 }
        ]);
    },
    getHistory: (userId) => {
        return axiosClient.get(`/user/${userId}/history`).catch(() => [
            { action: 'Mua iPhone 16', type: 'earn', amount: 500, date: '2024-04-01' },
            { action: 'Đổi Voucher 50K', type: 'redeem', amount: 500, date: '2024-04-02' }
        ]);
    },
    redeemReward: (userId, rewardId) => {
        return axiosClient.post('/user/redeem', { userId, rewardId }).catch(() => ({
            success: true, message: 'Đổi quà thành công!'
        }));
    }
};

export default loyaltyApi;
