import axiosClient from './axiosClient';

const chatApi = {
    getMessages: () => {
        const url = '/chat';
        return axiosClient.get(url);
    },
    sendMessage: (data) => {
        const url = '/chat';
        return axiosClient.post(url, data);
    }
};

export default chatApi;
