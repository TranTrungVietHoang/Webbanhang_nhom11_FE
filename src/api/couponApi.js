import axiosClient from './axiosClient';

const couponApi = {
    getAll: () => {
        const url = '/coupons';
        return axiosClient.get(url);
    },
    getById: (id) => {
        const url = `/coupons/${id}`;
        return axiosClient.get(url);
    },
    create: (data) => {
        const url = '/coupons';
        return axiosClient.post(url, data);
    },
    update: (id, data) => {
        const url = `/coupons/${id}`;
        return axiosClient.put(url, data);
    },
    remove: (id) => {
        const url = `/coupons/${id}`;
        return axiosClient.delete(url);
    }
};

export default couponApi;
