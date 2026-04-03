import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronRight, 
  Star, 
  Smartphone, 
  Zap, 
  ShieldCheck, 
  Truck, 
  Lock,
  ArrowRight
} from 'lucide-react';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('Tất cả');
  const navigate = useNavigate();

  const categories = ['Tất cả', 'iPhone', 'iPad', 'MacBook', 'Watch', 'Phụ kiện'];

  useEffect(() => {
    fetch('http://localhost:3000/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching products:', err);
        setLoading(false);
      });
  }, []);

  const filteredProducts = activeCategory === 'Tất cả' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center overflow-hidden bg-slate-950">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&q=80&w=2000"
            className="w-full h-full object-cover opacity-60 scale-105 animate-slow-zoom"
            alt="Hero"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/50 to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10 text-white">
          <div className="max-w-2xl space-y-8">
            <span className="inline-block px-4 py-1.5 bg-blue-600/20 text-blue-400 border border-blue-400/30 rounded-full text-xs font-bold uppercase tracking-[0.2em]">
              Sản phẩm mới nhất
            </span>
            <h1 className="text-7xl font-black leading-[1.1] tracking-tighter">
              iPhone 16 Pro.<br />
              <span className="text-blue-500">Bứt phá giới hạn.</span>
            </h1>
            <p className="text-xl text-slate-300 font-medium">
              Sức mạnh từ chip A18 Pro, hệ thống camera chuyên nghiệp và thời lượng pin vượt trội.
            </p>
            <button 
              onClick={() => navigate('/product/1')}
              className="group flex items-center gap-4 bg-white text-slate-950 px-8 py-4 rounded-2xl font-bold transition-all hover:bg-blue-600 hover:text-white"
            >
              Xem ngay
              <ChevronRight size={20} className="transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 border-b border-slate-100">
        <div className="container mx-auto px-6">
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-8 py-3 rounded-2xl font-bold transition-all whitespace-nowrap ${
                  activeCategory === cat 
                    ? 'bg-slate-950 text-white shadow-xl shadow-slate-200' 
                    : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-24 container mx-auto px-6">
        <div className="flex items-end justify-between mb-16">
          <div className="space-y-4">
            <h2 className="text-5xl font-black tracking-tighter">Danh sách sản phẩm</h2>
            <div className="w-24 h-2 bg-blue-600 rounded-full"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {filteredProducts.map(product => (
            <div 
              key={product.id}
              className="group cursor-pointer"
              onClick={() => navigate(`/product/${product.id}`)}
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] bg-slate-50 mb-8 transition-all group-hover:shadow-2xl group-hover:shadow-slate-200">
                <img 
                  src={product.image}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  alt={product.name}
                />
                <div className="absolute top-6 left-6 flex flex-col gap-2">
                  <span className="bg-white/90 backdrop-blur px-4 py-1.5 rounded-full text-xs font-bold text-slate-900 shadow-sm uppercase tracking-wider">
                    {product.category}
                  </span>
                  {product.discount && (
                    <span className="bg-red-500 px-4 py-1.5 rounded-full text-xs font-bold text-white shadow-sm uppercase tracking-wider">
                      -{product.discount}%
                    </span>
                  )}
                </div>
              </div>
              <div className="space-y-3 px-2">
                <h3 className="text-2xl font-black tracking-tight group-hover:text-blue-600 transition-colors uppercase italic antialiased">
                  {product.name}
                </h3>
                <div className="flex items-center justify-between">
                  <p className="text-2xl font-bold text-slate-400 font-mono tracking-tighter">
                    {product.price.toLocaleString()} VNĐ
                  </p>
                  <ArrowRight size={24} className="text-slate-200 group-hover:text-blue-600 group-hover:translate-x-2 transition-all" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
