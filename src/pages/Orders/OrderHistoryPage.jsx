import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { Clock, ArrowLeft } from 'lucide-react';
import Header from '../../components/Header/Header';
import orderApi from '../../api/orderApi';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

const OrderCard = ({ order }) => {
    // Format date -> e.g., "Lúc 15h:14 25 tháng 1, 2026"
    const orderDate = new Date(order.createdAt);
    const formattedDate = `Lúc ${format(orderDate, 'HH')}h:${format(orderDate, 'mm')} ${format(orderDate, 'dd')} tháng ${format(orderDate, 'M')}, ${format(orderDate, 'yyyy')}`;

    return (
        <div className="bg-[#F4F2EE] mt-6 border-b border-gray-300 pb-2 overflow-hidden shadow-sm">
            
            {/* Header: Order ID & Status */}
            <div className="p-5 pb-3 border-b border-gray-300 flex justify-between items-start">
                <div>
                    <h3 className="font-semibold text-gray-800 tracking-wide text-sm font-serif">Mã đơn hàng: {order.id}</h3>
                    <p className="text-[13px] text-gray-600 font-serif">{formattedDate}</p>
                </div>
                <div className="flex items-center text-[#E0A800] font-serif text-sm">
                    <Clock className="w-5 h-5 mr-1" />
                    <span className="font-medium tracking-wide">Chờ xác nhận</span>
                </div>
            </div>

            {/* Body: Product Items */}
            <div className="p-5 py-4 border-b border-gray-300">
                {order.products.map((product) => (
                    <div key={product.productId} className="flex justify-between items-center mb-0">
                        <div className="flex items-center space-x-4">
                            <div className="w-20 h-20 bg-white p-2 border border-gray-200 flex items-center justify-center shrink-0">
                                <img src={product.image} alt={product.name} className="object-contain h-full w-full" />
                            </div>
                            <div className="flex flex-col h-full font-serif text-sm">
                                <h4 className="font-medium text-gray-800">{product.name}</h4>
                                <p className="text-gray-600 mt-1">Số lượng: {product.quantity}</p>
                            </div>
                        </div>
                        <div className="text-[#3498DB] font-medium font-serif shrink-0">
                            {product.price.toLocaleString('vi-VN')}đ
                        </div>
                    </div>
                ))}
            </div>

            {/* Footer: Payment & Total */}
            <div className="p-5 pt-3 flex justify-between items-center bg-[#F1EDE9]">
                <div className="font-serif text-[13px] text-gray-700 leading-snug">
                    <p>Phương thức thanh toán: {order.paymentMethod}</p>
                    <p>Địa chỉ giao hàng: {order.shippingAddress}</p>
                </div>
                <div className="text-right font-serif">
                    <p className="text-sm font-medium text-gray-700 mb-1">Tổng cộng:</p>
                    <p className="text-[#3498DB] text-2xl tracking-wide">{order.totalAmount.toLocaleString('vi-VN')}đ</p>
                </div>
            </div>
            
        </div>
    );
};

const OrderHistoryPage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await orderApi.getOrders();
                // Sắp xếp theo ngày mới nhất lên đầu
                const sorted = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setOrders(sorted);
            } catch (error) {
                console.error("Lỗi khi fetch orders:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    return (
        <div className="min-h-screen bg-white font-serif flex flex-col">
            <Header />

            <div className="w-full bg-white shadow-sm border-b border-gray-300 relative z-10 sticky top-[64px]">
                <div className="max-w-[1000px] mx-auto px-6 py-4 flex items-center">
                    <button 
                        onClick={() => navigate(-1)} 
                        className="flex items-center text-gray-700 hover:text-black font-serif text-sm mr-8 shrink-0 tracking-wide transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5 mr-1" strokeWidth={1.5} />
                        Quay lại
                    </button>
                    <h1 className="text-2xl font-normal tracking-wide text-gray-900 border-l border-gray-300 pl-8">Lịch sử đơn hàng</h1>
                </div>
            </div>

            <main className="flex-1 w-full max-w-[1000px] mx-auto px-6 py-4 pb-20">
                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                    </div>
                ) : (
                    orders.length === 0 ? (
                        <div className="text-center py-20 text-gray-500 italic">Chưa có đơn hàng nào trong lịch sử.</div>
                    ) : (
                        <div className="flex flex-col space-y-8">
                            {orders.map(order => (
                                <OrderCard key={order.id} order={order} />
                            ))}
                        </div>
                    )
                )}
            </main>
        </div>
    );
};

export default OrderHistoryPage;
