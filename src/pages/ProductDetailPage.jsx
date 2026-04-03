import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, ShoppingCart, Heart, ArrowLeft, Plus, Minus, Check, Share2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    // Fetch current product
    fetch(`http://localhost:3000/api/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        
        // Fetch all products to find similar ones
        fetch(`http://localhost:3000/api/products`)
          .then(res => res.json())
          .then(allProducts => {
            const similar = allProducts
              .filter(p => p.category === data.category && p.id !== data.id)
              .slice(0, 3);
            setSimilarProducts(similar.length > 0 ? similar : allProducts.filter(p => p.id !== data.id).slice(0, 3));
            setLoading(false);
          });
      })
      .catch(err => {
        console.error("Error fetching product:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return (
    <div className="container mx-auto px-4 py-32 flex justify-center items-center">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div>
    </div>
  );

  if (!product) return (
    <div className="container mx-auto px-4 py-32 text-center">
      <h2 className="text-3xl font-bold mb-4">Sản phẩm không tồn tại</h2>
      <Link to="/" className="btn-primary inline-flex">Quay lại trang chủ</Link>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <Link to="/" className="flex items-center gap-2 text-slate-500 hover:text-blue-600 mb-8 font-medium transition-colors">
        <ArrowLeft className="w-5 h-5" /> Quay lại
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
        {/* Gallery */}
        <div className="lg:col-span-7 space-y-4">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="aspect-[4/3] rounded-3xl overflow-hidden bg-slate-100 relative group"
          >
            <img 
              src={product.detailedImages ? product.detailedImages[activeImage] : product.image} 
              alt={product.name} 
              className="w-full h-full object-cover"
            />
            <button className="absolute top-4 right-4 p-3 bg-white/80 hover:bg-white rounded-full text-slate-400 hover:text-red-500 shadow-sm transition-all">
              <Heart className="w-6 h-6" />
            </button>
          </motion.div>
          
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {(product.detailedImages || [product.image]).map((img, index) => (
              <button 
                key={index}
                onClick={() => setActiveImage(index)}
                className={`w-24 h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                  activeImage === index ? 'border-blue-600 shadow-md ring-2 ring-blue-100' : 'border-transparent hover:border-slate-300'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="lg:col-span-5 space-y-8">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-bold uppercase tracking-wider">
                {product.category}
              </span>
              <span className="flex items-center gap-1 text-green-600 text-xs font-bold">
                 <Check className="w-3 h-3" /> Đang còn hàng
              </span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800 leading-tight">
              {product.name}
            </h1>
            
            <div className="flex items-center gap-4 text-slate-500">
               <div className="flex items-center text-yellow-500 font-bold">
                 <Star className="w-5 h-5 fill-current mr-1" /> {product.rating}
               </div>
               <span className="text-slate-200">|</span>
               <span>{product.reviews?.length || 0} Đánh giá</span>
               <span className="text-slate-200">|</span>
               <span>Đã bán {product.sold}</span>
            </div>

            <div className="pt-6 pb-2">
               <span className="text-4xl font-bold text-red-600">
                 {product.price.toLocaleString()}đ
               </span>
            </div>
          </motion.div>

          <div className="h-[1px] bg-slate-100"></div>

          <div className="space-y-6">
            <div className="flex items-center gap-6">
              <span className="font-bold text-slate-700 min-w-[80px]">Số lượng:</span>
              <div className="flex items-center bg-slate-100 rounded-xl p-1">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 hover:bg-white hover:shadow-sm rounded-lg transition-all"
                >
                  <Minus className="w-5 h-5" />
                </button>
                <span className="px-6 font-bold text-lg min-w-[60px] text-center">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 hover:bg-white hover:shadow-sm rounded-lg transition-all"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
              <span className="text-sm text-slate-400">{product.stock} SP có sẵn</span>
            </div>

            <div className="flex gap-4 pt-4">
              <button className="btn-secondary flex-1 py-4 text-lg border border-slate-200">
                 <ShoppingCart className="w-6 h-6 mr-2" /> Thêm giỏ hàng
              </button>
              <button className="btn-primary flex-[1.5] py-4 text-lg text-white shadow-xl shadow-blue-200">
                 Mua ngay
              </button>
            </div>
          </div>
          
          <div className="flex items-center gap-4 pt-6 text-slate-500 text-sm">
             <button className="flex items-center gap-2 hover:text-blue-600 transition-colors"><Share2 className="w-4 h-4" /> Chia sẻ</button>
             <div className="h-4 w-[1px] bg-slate-200"></div>
             <button className="flex items-center gap-2 hover:text-red-500 transition-colors"><Heart className="w-4 h-4" /> Yêu thích</button>
          </div>
        </div>
      </div>

      {/* Details & Reviews */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 border-t border-slate-100 pt-12">
         <div className="lg:col-span-8 space-y-12">
            <section>
               <h2 className="text-2xl font-bold text-slate-800 mb-6">Mô tả sản phẩm</h2>
               <div className="prose max-w-none text-slate-600 leading-relaxed bg-slate-50/50 p-8 rounded-3xl">
                  {product.description}
               </div>
            </section>

            <section>
               <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold text-slate-800">Đánh giá sản phẩm</h2>
                  <button className="btn-secondary !py-2 !px-4 text-sm">Viết đánh giá</button>
               </div>
               
               <div className="space-y-8">
                 {product.reviews && product.reviews.length > 0 ? (
                    product.reviews.map(review => (
                      <div key={review.id} className="pb-8 border-b border-slate-50 last:border-none">
                         <div className="flex gap-4 items-start">
                             <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xl uppercase">
                                {review.user.charAt(0)}
                             </div>
                             <div className="flex-1 space-y-2">
                                <div className="flex items-center justify-between">
                                   <div className="font-bold text-slate-800">{review.user}</div>
                                   <div className="text-xs text-slate-400">{review.date}</div>
                                </div>
                                <div className="flex gap-1 text-yellow-400">
                                   {[...Array(5)].map((_, i) => (
                                     <Star key={i} className={`w-3.5 h-3.5 fill-current ${i >= review.rating ? 'text-slate-200 fill-none' : ''}`} />
                                   ))}
                                </div>
                                <p className="text-slate-600 text-sm leading-relaxed">{review.comment}</p>
                             </div>
                         </div>
                      </div>
                    ))
                 ) : (
                    <div className="text-center py-12 bg-slate-50 rounded-3xl">
                       <p className="text-slate-400">Chưa có đánh giá nào cho sản phẩm này.</p>
                    </div>
                 )}
               </div>
            </section>
         </div>

         {/* Sidebar / Recommendations */}
         <div className="lg:col-span-4 space-y-8">
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-6">
                <h3 className="font-bold text-lg text-slate-800">Sản phẩm tương tự</h3>
                {similarProducts.map((p) => (
                  <Link key={p.id} to={`/product/${p.id}`} className="flex gap-4 group cursor-pointer">
                     <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0">
                        <img src={p.image} alt={p.name} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                     </div>
                     <div className="space-y-1 py-1">
                        <h4 className="font-medium text-sm text-slate-700 line-clamp-2 group-hover:text-blue-600 transition-colors">{p.name}</h4>
                        <p className="font-bold text-red-600 text-sm">{p.price.toLocaleString()}đ</p>
                     </div>
                  </Link>
                ))}
            </div>
         </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
