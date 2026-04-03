import { useState, useEffect, useCallback } from 'react';
import couponApi from '../api/couponApi';
import toast from 'react-hot-toast';

export const useCoupons = () => {
    const [coupons, setCoupons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchCoupons = useCallback(async () => {
        try {
            setLoading(true);
            const data = await couponApi.getAll();
            // Data from array
            setCoupons(data);
            setError(null);
        } catch (err) {
            setError(err.message || 'Có lỗi xảy ra khi tải dữ liệu');
            toast.error('Không thể tải dữ liệu mã giảm giá!');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchCoupons();
    }, [fetchCoupons]);

    const createCoupon = async (data) => {
        try {
            const newCoupon = await couponApi.create(data);
            setCoupons(prev => [...prev, newCoupon]);
            toast.success('Thêm mã giảm giá thành công!');
            return true;
        } catch (err) {
            toast.error('Có lỗi xảy ra khi thêm mả giảm giá!');
            return false;
        }
    };

    const updateCoupon = async (id, data) => {
        try {
            const updatedCoupon = await couponApi.update(id, data);
            setCoupons(prev => prev.map(c => c.id === id ? updatedCoupon : c));
            toast.success('Cập nhật mã giảm giá thành công!');
            return true;
        } catch (err) {
            toast.error('Có lỗi xảy ra khi cập nhật!');
            return false;
        }
    };

    const deleteCoupon = async (id) => {
        try {
            await couponApi.remove(id);
            setCoupons(prev => prev.filter(c => c.id !== id));
            toast.success('Đã xoá mã giảm giá!');
            return true;
        } catch (err) {
            toast.error('Có lỗi xảy ra khi xoá!');
            return false;
        }
    };

    return {
        coupons,
        loading,
        error,
        fetchCoupons,
        createCoupon,
        updateCoupon,
        deleteCoupon
    };
};
