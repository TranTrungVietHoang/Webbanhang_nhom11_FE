import { format } from 'date-fns';
import { Ticket, Calendar, Copy, Edit2, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Hàm tiện ích để nối class tailwind
function cn(...inputs) {
    return twMerge(clsx(inputs));
}

const CouponCard = ({ coupon, onDelete, onEdit }) => {
    const { id, discount, description, minOrder, expiryDate, code, isActive } = coupon;
    const formattedDate = format(new Date(expiryDate), 'dd/MM/yyyy');

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        toast.success(`Đã sao chép mã: ${code}`);
    };

    return (
        <div className={cn(
            "flex w-full bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow relative group",
            !isActive && "opacity-80 grayscale-[20%]"
        )}>
            {/* Left side: Icon/Banner */}
            <div className={cn(
                "w-1/4 sm:w-32 flex flex-col items-center justify-center p-4 border-r-2 border-dashed border-gray-200",
                isActive ? "bg-blue-500" : "bg-gray-300"
            )}>
                <Ticket className="w-12 h-12 text-white mb-2" />
                <div className="flex space-x-2 absolute left-0 bottom-0 top-0 items-center -translate-x-[0.35rem]">
                    <div className="h-6 w-6 bg-white rounded-full"></div>
                </div>
                <div className="flex space-x-2 absolute right-0 bottom-0 top-0 items-center translate-x-[0.35rem]">
                   {/* This is the cutout effect on the right side if we wanted, but we keep the right side content */}
                </div>
            </div>

            {/* Right side: Content */}
            <div className="flex-1 p-4 flex flex-col justify-between">
                <div>
                    <h3 className={cn(
                        "text-lg font-bold mb-1",
                        isActive ? "text-gray-800" : "text-gray-600"
                    )}>
                        {discount}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">{description}</p>
                    
                    <div className="flex items-center text-xs text-gray-500 mb-1">
                        <span className="w-4 h-4 mr-1 flex items-center justify-center bg-gray-200 rounded-full text-[10px]">đ</span>
                        Đơn hàng tối thiểu {minOrder.toLocaleString('vi-VN')} đ
                    </div>
                    <div className="flex items-center text-xs text-gray-500">
                        <Calendar className="w-4 h-4 mr-1" />
                        HSD: {formattedDate}
                    </div>
                </div>

                {/* Actions bottom bar */}
                <div className="mt-4 flex flex-col sm:flex-row items-center justify-between bg-gray-50 p-2 rounded pt-2 pb-2">
                    <span className="font-mono bg-gray-200 px-3 py-1 rounded text-sm text-gray-700 tracking-wider mb-2 sm:mb-0 w-full sm:w-auto text-center">
                        {code}
                    </span>
                    <button 
                        onClick={handleCopy}
                        className={cn(
                            "flex items-center justify-center px-4 py-1.5 rounded text-sm font-medium transition-colors w-full sm:w-auto",
                            isActive ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-gray-400 hover:bg-gray-500 text-white"
                        )}
                    >
                        <Copy className="w-4 h-4 mr-1.5" />
                        Sao chép
                    </button>
                </div>
            </div>
            
            {/* Hover Actions (Edit / Delete) */}
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1">
                <button 
                    onClick={() => onEdit(coupon)}
                    className="p-1.5 bg-yellow-100 hover:bg-yellow-200 text-yellow-600 rounded shadow-sm"
                    title="Chỉnh sửa"
                >
                    <Edit2 className="w-4 h-4" />
                </button>
                <button 
                    onClick={() => onDelete(id)}
                    className="p-1.5 bg-red-100 hover:bg-red-200 text-red-600 rounded shadow-sm"
                    title="Xoá mã này"
                >
                    <Trash2 className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
};

export default CouponCard;
