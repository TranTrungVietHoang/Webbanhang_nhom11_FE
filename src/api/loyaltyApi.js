import axiosClient from './axiosClient';

const loyaltyApi = {
    getProfile: () => {
        const url = '/loyalty';
        return axiosClient.get(url);
    }
};

export default loyaltyApi;
