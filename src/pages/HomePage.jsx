import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { MessageCircle, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const CATEGORIES = [
  'Tất cả', 'Điện thoại', 'Laptop', 'Âm thanh', 'Đồng hồ', 'Camera', 'Tablet', 'Phụ kiện'
];

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('Tất cả');

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

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    if (category === 'Tất cả') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(p => p.category === category));
    }
  };

  return (
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

      {/* Hero Section (Optional improvement) */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mb-12 rounded-3xl overflow-hidden relative group h-[300px] md:h-[400px] bg-gradient-to-br from-blue-700 to-indigo-900"
      >
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center mix-blend-overlay opacity-40"></div>
        <div className="relative h-full flex flex-col justify-center px-8 md:px-16 text-white space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold max-w-2xl leading-tight">
            Khám phá công nghệ <br/> <span className="text-blue-300">đỉnh cao</span> mỗi ngày
          </h1>
          <p className="text-slate-200 max-w-lg text-lg">
            Sở hữu các thiết bị đời mới nhất với giá cực kỳ ưu đãi. Cam kết hàng chính hãng 100%.
          </p>
          <div className="flex gap-4 pt-4">
             <button className="btn-primary px-8 py-3 text-lg">Mua ngay</button>
             <button className="btn-secondary px-8 py-3 text-lg bg-white/10 text-white hover:bg-white/20 border border-white/20">Xem ưu đãi</button>
          </div>
        </div>
      </motion.div>

      {/* Product Grid */}
      <div>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-slate-800">Sản phẩm dành cho bạn</h2>
          <button className="text-blue-600 font-semibold flex items-center hover:underline">
            Xem tất cả <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-[350px] bg-slate-100 rounded-2xl animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>

      {/* Chat Bubble Component */}
      <motion.button 
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 p-4 bg-blue-600 text-white rounded-full shadow-2xl z-50 hover:bg-blue-700 transition-colors"
      >
        <MessageCircle className="w-6 h-6" />
      </motion.button>
    </div>
  );
};

export default HomePage;
