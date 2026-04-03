import axiosClient from './axiosClient';

const orderApi = {
    getOrders: () => {
        const url = '/orders';
        return axiosClient.get(url);
    }
};

export default orderApi;
