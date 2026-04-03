import { useState } from 'react';
import Header from '../../components/Header/Header';
import CouponCard from '../../components/Coupon/CouponCard';
import AddCouponModal from '../../components/Coupon/AddCouponModal';
import { useCoupons } from '../../hooks/useCoupons';
import { Plus } from 'lucide-react';

const DiscountCodesPage = () => {
    const { coupons, loading, error, createCoupon, updateCoupon, deleteCoupon } = useCoupons();
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCoupon, setEditingCoupon] = useState(null);

    const activeCoupons = coupons.filter(c => c.isActive);
    const expiredCoupons = coupons.filter(c => !c.isActive);

    const handleOpenAddModal = () => {
        setEditingCoupon(null);
        setIsModalOpen(true);
    };

    const handleOpenEditModal = (coupon) => {
        setEditingCoupon(coupon);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setEditingCoupon(null);
        setIsModalOpen(false);
    };

    const handleSubmitModal = async (data) => {
        let success = false;
        if (editingCoupon) {
            success = await updateCoupon(editingCoupon.id, data);
        } else {
            success = await createCoupon(data);
        }
        
        if (success) {
            handleCloseModal();
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xoá mã giảm giá này không?')) {
            await deleteCoupon(id);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
            <Header />

            <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header section of page */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 pb-4 border-b border-gray-200 gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-1">Mã giảm giá của tôi</h1>
                        <p className="text-gray-600">Bạn có {activeCoupons.length} mã giảm giá để sử dụng</p>
                    </div>
                    <button 
                        onClick={handleOpenAddModal}
                        className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        <Plus className="w-5 h-5 mr-1" />
                        Thêm mã
                    </button>
                </div>

                {loading && (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                    </div>
                )}

                {error && (
                    <div className="bg-red-50 text-red-600 p-4 rounded-md mb-8">
                        {error}
                    </div>
                )}

                {!loading && !error && (
                    <div className="space-y-10">
                        {/* Section: Active */}
                        <section>
                            <h2 className="text-lg font-semibold text-gray-800 mb-4 pb-2">Có thể sử dụng</h2>
                            {activeCoupons.length === 0 ? (
                                <p className="text-gray-500 italic bg-white p-4 rounded border border-gray-100 text-center shadow-sm">Chưa có mã giảm giá nào còn hạn.</p>
                            ) : (
                                <div className="flex flex-col space-y-4">
                                    {activeCoupons.map(coupon => (
                                        <CouponCard 
                                            key={coupon.id} 
                                            coupon={coupon} 
                                            onDelete={handleDelete}
                                            onEdit={handleOpenEditModal}
                                        />
                                    ))}
                                </div>
                            )}
                        </section>

                        {/* Section: Expired */}
                        <section>
                            <h2 className="text-lg font-semibold text-gray-800 mb-4 pb-2">Đã hết hạn / Vô hiệu hóa</h2>
                            {expiredCoupons.length === 0 ? (
                                <p className="text-gray-500 italic bg-white p-4 rounded border border-gray-100 text-center shadow-sm">Không có mã giảm giá nào hết hạn.</p>
                            ) : (
                                <div className="flex flex-col space-y-4">
                                    {expiredCoupons.map(coupon => (
                                        <CouponCard 
                                            key={coupon.id} 
                                            coupon={coupon} 
                                            onDelete={handleDelete}
                                            onEdit={handleOpenEditModal}
                                        />
                                    ))}
                                </div>
                            )}
                        </section>
                    </div>
                )}
            </main>

            {/* Modal */}
            <AddCouponModal 
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSubmit={handleSubmitModal}
                editData={editingCoupon}
            />
        </div>
    );
};

export default DiscountCodesPage;
