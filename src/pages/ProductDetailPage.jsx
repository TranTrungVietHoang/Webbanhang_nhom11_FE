import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Heart, Star, ShoppingCart, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';

const ProductDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        setLoading(true);
        fetch(`http://localhost:3000/api/products/${id}`)
            .then(res => res.json())
            .then(data => {
                setProduct(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching product:", err);
                setLoading(false);
            });
    }, [id]);

    const handleQuantityChange = (type) => {
        if (type === 'dec' && quantity > 1) {
            setQuantity(quantity - 1);
        } else if (type === 'inc' && quantity < 45) { // Assuming 45 is max stock for UI
            setQuantity(quantity + 1);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!product) return <div className="text-center py-20 font-serif">Product not found</div>;

    // Use placeholder values to match screenshot perfectly if necessary
    const displayPrice = product.price ? product.price.toLocaleString('vi-VN') + 'đ' : '37.990.000đ';
    const displayStock = 45;

    return (
        <div className="bg-white min-h-screen pb-20 pt-6">
            <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
                
                {/* Global Back Link */}
                <button 
                  onClick={() => navigate(-1)} 
                  className="flex items-center gap-1 text-sm font-serif text-gray-700 hover:text-blue-600 mb-6 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" /> Quay lai
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
                    
                    {/* Left: Images */}
                    <div className="space-y-4">
                        <div className="border-4 border-[#0088ff] rounded w-full aspect-square flex items-center justify-center p-8 bg-gray-50/50">
                            <img 
                                src={product.image} 
                                alt={product.name} 
                                className="w-full h-full object-contain"
                            />
                        </div>
                        <div className="grid grid-cols-4 gap-2">
                            {/* Thumbnails placeholder similar to the screenshot */}
                            {[1, 2, 3].map((idx) => (
                                <div key={idx} className="border border-gray-200 rounded aspect-video flex items-center justify-center bg-black overflow-hidden cursor-pointer">
                                    <img 
                                      src={product.image} 
                                      alt="thumbnail" 
                                      className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Details */}
                    <div className="flex flex-col pt-2 border-t border-transparent md:border-none">
                        
                        <div className="flex justify-between items-start gap-4">
                            <h1 className="text-xl md:text-2xl font-serif text-gray-800 font-medium leading-snug">
                                {product.name} {product.variant && `- ${product.variant}`} - Chính hãng VN/A
                            </h1>
                            <button className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 hover:text-red-500 transition-colors">
                                <Heart className="w-4 h-4 md:w-5 md:h-5" />
                            </button>
                        </div>

                        <div className="flex items-center gap-3 text-xs md:text-sm font-serif text-gray-600 mt-2">
                            <span className="font-medium text-gray-800">5</span>
                            <Star className="w-3.5 h-3.5 fill-[#ffd700] text-[#ffd700] -ml-1.5" />
                            <span className="text-gray-300">|</span>
                            <span>1234 đánh giá</span>
                            <span className="text-gray-300">|</span>
                            <span>856 đã bán</span>
                        </div>

                        <div className="mt-8 mb-10">
                            <h2 className="text-[#de2222] text-4xl md:text-[2.75rem] font-serif font-medium tracking-wide">
                                {displayPrice}
                            </h2>
                        </div>

                        {/* Quantity Selector */}
                        <div className="flex items-center gap-6 mb-10">
                            <span className="font-serif text-xl font-medium text-gray-800">SL</span>
                            <div className="flex items-center border border-gray-300 rounded h-10 w-32">
                                <button 
                                    onClick={() => handleQuantityChange('dec')}
                                    className="px-4 text-gray-600 hover:bg-gray-100 h-full border-r border-gray-300"
                                >
                                    -
                                </button>
                                <input 
                                    type="text" 
                                    value={quantity} 
                                    readOnly 
                                    className="w-full text-center outline-none text-sm font-serif text-gray-800"
                                />
                                <button 
                                    onClick={() => handleQuantityChange('inc')}
                                    className="px-4 text-gray-600 hover:bg-gray-100 h-full border-l border-gray-300"
                                >
                                    +
                                </button>
                            </div>
                            <span className="text-xs font-serif text-gray-600">
                                {displayStock} SP có sẵn
                            </span>
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-4">
                            <button 
                                onClick={() => {
                                    toast.success('Đã thêm vào giỏ hàng!', { style: { background: '#fff', color: '#101d2d', border: '1px solid #e2e8f0' }});
                                }}
                                className="flex-1 max-w-[200px] h-12 bg-[#dfdfdf] hover:bg-[#d0d0d0] text-gray-800 rounded font-serif font-medium flex items-center justify-center gap-2 transition-colors"
                            >
                                <ShoppingCart className="w-5 h-5" />
                                Giỏ hàng
                            </button>
                            <button 
                                className="flex-1 max-w-[200px] h-12 bg-[#0066ff] hover:bg-blue-700 text-white rounded font-serif font-medium transition-colors"
                            >
                                Mua ngay
                            </button>
                        </div>
                    </div>
                </div>

                {/* Description Section */}
                <div className="mt-20">
                    <div className="bg-[#fcfcfc] p-6 mb-8 border-l-4 border-transparent">
                        <h3 className="text-lg font-serif text-gray-800 mb-3">Mô tả sản phẩm</h3>
                        <p className="text-gray-700 text-sm font-serif leading-relaxed">
                            {product.description || "iPhone 17 Pro mạnh mẽ, camera 48MP cải tiến, màn hình Super Retina XDR 6.7 inch, pin sử dụng cả ngày. Thiết kế Titan cao cấp, bền bỉ và nhẹ hơn. Hỗ trợ 5G, Dynamic Island, và nhiều tính năng AI thông minh."}
                        </p>
                    </div>

                    {/* Reviews Section */}
                    <div className="bg-[#fcfcfc] p-6 border-l-4 border-transparent">
                        <h3 className="text-base font-serif text-gray-800 mb-1">Danh Gia san pham</h3>
                        <div className="mb-6 font-serif text-sm text-gray-800">
                            <div className="flex items-center gap-1">
                                <span>5.0</span>
                                <div className="flex">
                                    {[1,2,3,4,5].map(i => <Star key={i} className="w-3.5 h-3.5 fill-[#ffd700] text-[#ffd700]" />)}
                                </div>
                            </div>
                            <div>1234 đánh giá</div>
                        </div>

                        <div className="space-y-6">
                            {/* Review 1 */}
                            <div className="flex gap-4 border-t border-gray-300 pt-6">
                                <div className="w-10 h-10 bg-[#0066ff] rounded-full flex items-center justify-center text-white font-serif font-bold text-lg flex-shrink-0">
                                    A
                                </div>
                                <div className="space-y-2 flex-1 pb-4">
                                    <div>
                                        <p className="text-sm font-serif font-bold text-gray-800">Nguyễn Văn A</p>
                                        <div className="flex">
                                            {[1,2,3,4,5].map(i => <Star key={i} className="w-3.5 h-3.5 fill-[#ffd700] text-[#ffd700]" />)}
                                        </div>
                                    </div>
                                    <p className="text-sm font-serif text-gray-700">
                                        Sản phẩm tuyệt vời! Chất lượng camera rất tốt, màn hình sắc nét. Giao hàng nhanh, đóng gói cẩn thận. Rất hài lòng với lần mua hàng này!
                                    </p>
                                    <p className="text-xs font-serif text-gray-500">19/01/2025</p>
                                </div>
                            </div>

                            {/* Review 2 */}
                            <div className="flex gap-4 border-t border-gray-300 pt-6 pb-4">
                                <div className="w-10 h-10 bg-[#0066ff] rounded-full flex items-center justify-center text-white font-serif font-bold text-lg flex-shrink-0">
                                    N
                                </div>
                                <div className="space-y-2 flex-1">
                                    <div>
                                        <p className="text-sm font-serif font-bold text-gray-800">Nguyễn Văn N</p>
                                        <div className="flex">
                                            {[1,2,3,4,5].map(i => <Star key={i} className="w-3.5 h-3.5 fill-[#ffd700] text-[#ffd700]" />)}
                                        </div>
                                    </div>
                                    <p className="text-sm font-serif text-gray-700">
                                        Đã dùng 1 tuần, rất hài lòng. Hiệu năng mượt mà, không giật lag. Shop tư vấn nhiệt tình!
                                    </p>
                                    <p className="text-xs font-serif text-gray-500">19/06/2025</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ProductDetailPage;
