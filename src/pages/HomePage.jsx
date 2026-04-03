import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { MessageCircle, ChevronRight, Search, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CATEGORIES = [
  'Tất cả', 'Điện thoại', 'Laptop', 'Âm thanh', 'Đồng hồ', 'Camera', 'Tablet', 'Phụ kiện'
];

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('Tất cả');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setFilteredProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let result = products;
    if (activeCategory !== 'Tất cả') {
      result = result.filter(p => p.category === activeCategory);
    }
    if (searchTerm) {
      result = result.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    setFilteredProducts(result);
  }, [activeCategory, searchTerm, products]);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      <div className="container mx-auto px-4 py-8 relative">
        {/* Category Bar */}
        <div className="flex items-center gap-3 overflow-x-auto pb-6 scrollbar-hide">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-6 py-2 rounded-full font-medium whitespace-nowrap transition-all duration-300 border ${
                activeCategory === cat
                  ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-200'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-blue-400 hover:text-blue-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-12 rounded-3xl overflow-hidden relative group h-[300px] md:h-[450px] bg-gradient-to-br from-blue-700 to-indigo-900 shadow-2xl"
        >
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center mix-blend-overlay opacity-40"></div>
          <div className="relative h-full flex flex-col justify-center px-8 md:px-16 text-white space-y-6">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="px-4 py-1.5 bg-blue-500/30 backdrop-blur-md border border-white/20 rounded-full text-sm font-bold uppercase tracking-widest w-fit"
            >
              New Arrival 2025
            </motion.span>
            <h1 className="text-4xl md:text-6xl font-black max-w-2xl leading-tight tracking-tighter italic">
              KHÁM PHÁ CÔNG NGHỆ <br/> <span className="text-blue-300">ĐỈNH CAO</span> MỖI NGÀY
            </h1>
            <p className="text-slate-200 max-w-lg text-lg font-medium">
              Sở hữu các thiết bị đời mới nhất với giá cực kỳ ưu đãi. Cam kết hàng chính hãng 100% cùng chính sách đổi trả linh hoạt.
            </p>
            <div className="flex gap-4 pt-4">
               <button className="px-8 py-3 bg-white text-blue-900 rounded-full font-black uppercase text-sm tracking-widest hover:bg-blue-50 transition-all shadow-xl active:scale-95">Mua ngay</button>
               <button className="px-8 py-3 bg-white/10 text-white hover:bg-white/20 border border-white/20 rounded-full font-black uppercase text-sm tracking-widest transition-all backdrop-blur-sm">Xem ưu đãi</button>
            </div>
          </div>
        </motion.div>

        {/* Search & Sort Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
           <div className="relative group max-w-md w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={20} />
              <input 
                type="text" 
                placeholder="Tìm kiếm sản phẩm..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-6 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-600 transition-all outline-none font-medium shadow-sm"
              />
           </div>
           
           <div className="flex gap-4">
              <button className="p-4 bg-white border border-slate-200 rounded-2xl text-slate-600 hover:text-blue-600 hover:border-blue-600 hover:bg-blue-50 transition-all shadow-sm">
                 <SlidersHorizontal size={22} />
              </button>
              <button className="px-6 py-4 bg-white border border-slate-200 rounded-2xl text-slate-600 hover:text-blue-600 hover:border-blue-600 hover:bg-blue-50 transition-all font-bold flex items-center gap-2 shadow-sm">
                 <ArrowUpDown size={20} />
                 Sắp xếp
              </button>
           </div>
        </div>

        {/* Product Grid */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-black text-slate-800 tracking-tighter uppercase italic">Sản phẩm dành cho bạn</h2>
            <button className="text-blue-600 font-bold flex items-center gap-1 hover:gap-2 transition-all group">
              Xem tất cả <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-[400px] bg-white border border-slate-100 rounded-3xl animate-pulse"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <AnimatePresence mode="popLayout">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </AnimatePresence>
            </div>
          )}
          
          {!loading && filteredProducts.length === 0 && (
             <div className="py-20 text-center">
                <p className="text-slate-400 font-bold text-xl uppercase tracking-widest">Không tìm thấy sản phẩm phù hợp</p>
             </div>
          )}
        </div>

        {/* Chat Bubble Component */}
        <motion.button 
          whileHover={{ scale: 1.1, rotate: 12 }}
          whileTap={{ scale: 0.9 }}
          className="fixed bottom-8 right-8 p-5 bg-blue-600 text-white rounded-2xl shadow-2xl z-50 hover:bg-blue-700 transition-all group"
        >
          <MessageCircle className="w-7 h-7" />
          <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-slate-800 text-white text-xs font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl">Hỗ trợ trực tuyến</span>
        </motion.button>
      </div>
    </div>
  );
};

export default HomePage;
