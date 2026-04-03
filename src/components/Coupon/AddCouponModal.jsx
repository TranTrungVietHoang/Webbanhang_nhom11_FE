import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { format } from 'date-fns';

const AddCouponModal = ({ isOpen, onClose, onSubmit, editData }) => {
    const isEditMode = !!editData;

    const [formData, setFormData] = useState({
        discount: '',
        description: '',
        minOrder: '',
        code: '',
        expiryDate: '',
        isActive: true
    });

    useEffect(() => {
        if (isOpen && editData) {
            setFormData({
                ...editData,
                minOrder: editData.minOrder,
                expiryDate: format(new Date(editData.expiryDate), 'yyyy-MM-dd')
            });
        } else if (isOpen) {
            // Reset form when opening to add
            setFormData({
                discount: '',
                description: '',
                minOrder: '',
                code: '',
                expiryDate: '',
                isActive: true
            });
        }
    }, [isOpen, editData]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Prepare data
        const submitData = {
            ...formData,
            minOrder: Number(formData.minOrder),
            // Convert simple date string back to ISO
            expiryDate: new Date(formData.expiryDate).toISOString()
        };

        onSubmit(submitData);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all">
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                    <h3 className="text-xl font-semibold text-gray-800">
                        {isEditMode ? 'Cập nhật mã giảm giá' : 'Thêm mã giảm giá mới'}
                    </h3>
                    <button 
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>
                
                <form onSubmit={handleSubmit} className="p-6">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Mức giảm (VD: Giảm 25%)</label>
                            <input 
                                required
                                type="text"
                                name="discount"
                                value={formData.discount}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Giảm 25%"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả chi tiết</label>
                            <input 
                                required
                                type="text"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Giảm 25% cho đơn hàng từ 1 triệu..."
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Đơn tối thiểu (VNĐ)</label>
                                <input 
                                    required
                                    type="number"
                                    name="minOrder"
                                    value={formData.minOrder}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="1000000"
                                    min="0"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Hạn sử dụng</label>
                                <input 
                                    required
                                    type="date"
                                    name="expiryDate"
                                    value={formData.expiryDate}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Mã code</label>
                            <input 
                                required
                                type="text"
                                name="code"
                                value={formData.code}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono uppercase"
                                placeholder="MEGA2026"
                            />
                        </div>

                        <div className="flex items-center mt-2">
                            <input 
                                type="checkbox"
                                id="isActive"
                                name="isActive"
                                checked={formData.isActive}
                                onChange={handleChange}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label htmlFor="isActive" className="ml-2 block text-sm text-gray-700">
                                Có thể sử dụng (Kích hoạt)
                            </label>
                        </div>
                    </div>

                    <div className="mt-6 flex justify-end space-x-3">
                        <button 
                            type="button" 
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                        >
                            Huỷ
                        </button>
                        <button 
                            type="submit"
                            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors shadow-sm"
                        >
                            {isEditMode ? 'Lưu thay đổi' : 'Thêm mã mới'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddCouponModal;
