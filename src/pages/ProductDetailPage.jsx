import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, ShoppingCart, Heart, ArrowLeft, Plus, Minus, Check, Share2, ShieldCheck, Truck, RotateCcw, ChevronRight, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setLoading(true);
        // Fetch current product
        const res = await fetch(`http://localhost:3000/api/products/${id}`);
        const data = await res.json();
        setProduct(data);
        
        // Fetch all products to find similar ones
        const allRes = await fetch(`http://localhost:3000/api/products`);
        const allProducts = await allRes.json();
        
        const similar = allProducts
          .filter(p => p.category === data.category && p.id !== data.id)
          .slice(0, 4);
        
        setSimilarProducts(similar.length > 0 ? similar : allProducts.filter(p => p.id !== data.id).slice(0, 4));
        setLoading(false);
        window.scrollTo(0, 0);
      } catch (err) {
        console.error("Error fetching product:", err);
        setLoading(false);
      }
    };

    fetchProductData();
  }, [id]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
      <div className="w-16 h-16 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
    </div>
  );

  if (!product) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8FAFC] space-y-6">
      <h2 className="text-4xl font-black text-slate-800 uppercase italic tracking-tighter">Sản phẩm không tồn tại</h2>
      <Link to="/" className="px-8 py-3 bg-blue-600 text-white rounded-full font-black uppercase text-sm tracking-widest hover:bg-blue-700 transition-all shadow-xl">Quay lại trang chủ</Link>
    </div>
  );

  const images = product.detailedImages || [product.image];

  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      {/* Breadcrumb & Navigation */}
      <nav className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-2 text-sm font-bold text-slate-400 uppercase tracking-widest">
          <Link to="/" className="hover:text-blue-600 transition-colors flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" /> TRANG CHỦ
          </Link>
          <ChevronRight size={14} />
          <span className="text-slate-400">{product.category}</span>
          <ChevronRight size={14} />
          <span className="text-blue-600 truncate max-w-[200px]">{product.name}</span>
        </div>
      </nav>

      <main className="container mx-auto px-4 pb-20">
        <div className="bg-white rounded-[3rem] shadow-2xl shadow-slate-200/50 overflow-hidden border border-slate-100">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Gallery Section */}
            <div className="p-8 lg:p-12 bg-slate-50/50 space-y-8">
              <motion.div 
                key={activeImage}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="aspect-square rounded-[2rem] overflow-hidden bg-white shadow-xl border border-white"
              >
                <img 
                  src={images[activeImage]} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </motion.div>
              
              <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                {images.map((img, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`w-28 h-28 rounded-2xl overflow-hidden border-4 transition-all flex-shrink-0 ${
                      activeImage === idx ? 'border-blue-600 scale-105 shadow-xl' : 'border-white opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info Section */}
            <div className="p-8 lg:p-16 space-y-10 self-center">
              <div className="space-y-6">
                <div className="flex flex-wrap items-center gap-4">
                  <span className="px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-xs font-black uppercase tracking-widest border border-blue-200">
                    {product.category}
                  </span>
                  <div className="flex items-center gap-2 text-amber-400">
                    <Star size={20} fill="currentColor" />
                    <span className="text-lg font-black text-slate-800 leading-none">{product.rating}</span>
                    <span className="text-slate-400 font-bold ml-1 text-sm">({product.reviews?.length || 0} Đánh giá)</span>
                  </div>
                  <span className="flex items-center gap-1.5 text-emerald-600 text-xs font-black uppercase tracking-widest">
                     <Check size={14} strokeWidth={3} /> Đang còn hàng
                  </span>
                </div>

                <h1 className="text-4xl md:text-5xl font-black text-slate-800 leading-tight tracking-tighter uppercase italic underline decoration-blue-600/20 decoration-8 underline-offset-8">
                  {product.name}
                </h1>
                
                <div className="flex items-baseline gap-4">
                  <p className="text-5xl font-black text-blue-600 tracking-tighter italic">
                    {product.price.toLocaleString()}đ
                  </p>
                  <p className="text-sm text-slate-400 font-bold uppercase tracking-widest">Đã bán {product.sold}</p>
                </div>
              </div>

              <div className="p-8 bg-slate-50 rounded-[2rem] border border-slate-100 relative group">
                <p className="text-slate-600 leading-relaxed font-medium text-lg italic">
                  "{product.description}"
                </p>
                <div className="absolute -left-2 top-8 w-1 h-12 bg-blue-600 rounded-full"></div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-8">
                  <span className="font-black text-slate-800 uppercase tracking-widest text-sm">Số lượng:</span>
                  <div className="flex items-center bg-slate-100 rounded-2xl p-1.5 border border-slate-200">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-3 bg-white text-slate-600 hover:text-blue-600 rounded-xl transition-all shadow-sm active:scale-90"
                    >
                      <Minus size={20} />
                    </button>
                    <span className="px-8 font-black text-xl min-w-[70px] text-center text-slate-800">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-3 bg-white text-slate-600 hover:text-blue-600 rounded-xl transition-all shadow-sm active:scale-90"
                    >
                      <Plus size={20} />
                    </button>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button className="flex-1 bg-white border-2 border-blue-600 text-blue-600 py-5 rounded-[1.5rem] font-black uppercase text-sm tracking-widest hover:bg-blue-50 transition-all active:scale-95 flex items-center justify-center gap-3 shadow-lg">
                    <ShoppingCart size={22} />
                    Thêm vào giỏ
                  </button>
                  <button className="flex-[1.5] bg-blue-600 text-white py-5 rounded-[1.5rem] font-black uppercase text-sm tracking-widest hover:bg-blue-700 shadow-2xl shadow-blue-300 transition-all active:scale-95 flex items-center justify-center gap-3">
                    Mua ngay
                  </button>
                </div>
              </div>

              {/* Perks */}
              <div className="grid grid-cols-3 gap-6 pt-10 border-t border-slate-100">
                {[
                  { icon: ShieldCheck, label: 'Bảo hành 12th', color: 'emerald' },
                  { icon: Truck, label: 'Freeship toàn quốc', color: 'blue' },
                  { icon: RotateCcw, label: 'Đổi trả 7 ngày', color: 'rose' }
                ].map((perk, i) => (
                  <div key={i} className="flex flex-col items-center text-center space-y-3">
                    <div className={`p-4 bg-${perk.color}-50 text-${perk.color}-600 rounded-[1.25rem] transition-transform hover:scale-110`}>
                      <perk.icon size={28} />
                    </div>
                    <span className="text-[10px] sm:text-xs font-black text-slate-700 uppercase tracking-widest leading-tight">{perk.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Rewards Banner */}
        <motion.div 
           whileHover={{ scale: 1.01 }}
           className="mt-16 bg-gradient-to-r from-blue-700 to-indigo-900 rounded-[2.5rem] p-10 text-white flex flex-col md:flex-row items-center justify-between shadow-2xl shadow-blue-200 relative overflow-hidden"
        >
           <div className="relative z-10 space-y-3 text-center md:text-left mb-8 md:mb-0">
              <h3 className="text-3xl font-black uppercase tracking-tighter italic">MUA SẮM VÀ TÍCH ĐIỂM NGAY</h3>
              <p className="font-medium text-blue-100 text-lg">Bạn sẽ nhận được <span className="text-blue-300 font-bold">+{Math.floor(product.price / 1000)} điểm</span> khi mua sản phẩm này.</p>
           </div>
           <Link to="/member" className="relative z-10 px-10 py-5 bg-white text-blue-900 rounded-2xl font-black uppercase text-sm tracking-widest hover:bg-slate-100 transition-all shadow-xl active:scale-95">
              XEM VÍ ĐIỂM THƯỞNG
           </Link>
           <TrendingUp size={250} className="absolute right-[-50px] bottom-[-80px] text-white/5 rotate-12" />
        </motion.div>

        {/* Similar Products */}
        <section className="mt-24 space-y-12">
          <div className="flex items-center justify-between">
             <h2 className="text-3xl font-black text-slate-800 uppercase italic tracking-tighter">Sản phẩm tương tự</h2>
             <Link to="/" className="text-blue-600 font-black flex items-center gap-2 group underline-offset-4 hover:underline uppercase text-sm tracking-widest">
               Xem tất cả <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
             </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {similarProducts.map((p) => (
              <Link key={p.id} to={`/product/${p.id}`} className="bg-white rounded-[2rem] p-4 border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 group">
                <div className="aspect-square rounded-[1.5rem] overflow-hidden bg-slate-50 mb-4">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
                <h4 className="font-bold text-slate-800 text-lg line-clamp-1 mb-2 px-2 uppercase tracking-tight">{p.name}</h4>
                <p className="font-black text-blue-600 px-2 italic">{p.price.toLocaleString()}đ</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Reviews Section */}
        <section className="mt-24 space-y-12">
           <div className="flex items-center justify-between">
             <h2 className="text-3xl font-black text-slate-800 uppercase italic tracking-tighter">Đánh giá thực tế ({product.reviews?.length || 0})</h2>
             <button className="px-6 py-3 bg-slate-800 text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-slate-900 transition-all">Viết đánh giá</button>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {product.reviews && product.reviews.length > 0 ? product.reviews.map((rev) => (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  key={rev.id} 
                  className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm space-y-5"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-black text-lg uppercase shadow-inner">
                        {rev.user[0]}
                      </div>
                      <div>
                        <p className="font-black text-slate-800 text-sm uppercase tracking-widest leading-none mb-1">{rev.user}</p>
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-tight">{rev.date}</p>
                      </div>
                    </div>
                    <div className="flex gap-1 text-amber-400 bg-amber-50 px-3 py-1.5 rounded-full border border-amber-100">
                      {[...Array(5)].map((_, i) => <Star key={i} size={14} fill={i < rev.rating ? "currentColor" : "none"} className={i < rev.rating ? "" : "text-slate-200"} />)}
                      <span className="text-slate-800 font-black text-xs ml-1">{rev.rating}.0</span>
                    </div>
                  </div>
                  <div className="p-6 bg-slate-50/50 rounded-2xl border-l-4 border-blue-600 relative">
                     <p className="text-slate-600 font-medium leading-relaxed italic text-lg line-clamp-3">
                       "{rev.comment}"
                     </p>
                  </div>
                </motion.div>
              )) : (
                <div className="col-span-full py-20 text-center bg-white rounded-[3rem] border-2 border-dashed border-slate-200">
                  <p className="text-slate-400 font-black uppercase tracking-[0.2em]">Hãy là người đầu tiên đánh giá sản phẩm này</p>
                </div>
              )}
           </div>
        </section>
      </main>
    </div>
  );
};

export default ProductDetailPage;
