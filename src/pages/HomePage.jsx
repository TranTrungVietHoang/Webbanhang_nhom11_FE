import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Star, ShoppingCart, MessageCircle } from 'lucide-react';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('Tat ca');
  const navigate = useNavigate();

  const categories = [
    'Tat ca', 'Dien thoai', 'Laptop', 'Am thanh', 'Dong ho', 'Camera', 'Tablet', 'Phu kien'
  ];

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

  const filteredProducts = activeCategory === 'Tat ca' 
    ? products 
    : products.filter(p => {
        // Fallback matching logic based on normalized names
        const normCat = p.category?.toLowerCase() || '';
        const searchCat = activeCategory.toLowerCase();
        if (searchCat === 'dien thoai' && normCat.includes('iphone')) return true;
        if (searchCat === 'laptop' && normCat.includes('macbook')) return true;
        if (searchCat === 'dong ho' && normCat.includes('watch')) return true;
        return normCat.includes(searchCat);
      });

  return (
    <div className="bg-white min-h-screen relative pb-16">
      
      {/* Category Bar */}
      <div className="border-b border-gray-100 mb-8 pt-4">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide py-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-1.5 rounded-full font-serif text-sm whitespace-nowrap border transition-colors shadow-sm ${
                  activeCategory === cat 
                    ? 'bg-[#0066ff] text-white border-[#0066ff]' 
                    : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {loading ? (
        <div className="container mx-auto px-4 lg:px-8 py-20 flex justify-center">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredProducts.map(product => (
              <div 
                key={product.id}
                className="bg-white rounded-xl overflow-hidden cursor-pointer flex flex-col pt-2 pb-4 px-4 relative group"
                style={{
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(0,0,0,0.02)'
                }}
                onClick={() => navigate(`/product/${product.id}`)}
              >
                {/* Heart Button */}
                <button className="absolute top-4 left-4 z-10 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
                  <Heart className="w-4 h-4 text-gray-600" />
                </button>

                {/* Product Image */}
                <div className="w-full h-48 flex items-center justify-center overflow-hidden bg-white mb-4 mt-2">
                  <img 
                    src={product.image}
                    alt={product.name}
                    className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Product Info */}
                <div className="flex-1 flex flex-col justify-end space-y-3 px-1">
                  <h3 className="text-sm font-serif font-medium text-gray-800 line-clamp-2 leading-relaxed">
                    {product.name} {product.variant && `- ${product.variant}`} {product.originalName && `- ${product.originalName}`}
                  </h3>
                  
                  <div className="flex items-center text-sm font-serif text-gray-600 gap-1.5">
                    <span>5</span>
                    <Star className="w-4 h-4 fill-[#ffd700] text-[#ffd700]" />
                    <span className="mx-1">|</span>
                    <span>Đã bán {product.sold || Math.floor(Math.random() * 900) + 100}</span>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[#de2222] font-serif font-medium text-lg">
                      {product.price.toLocaleString('vi-VN')}đ
                    </span>
                    <button className="w-9 h-9 bg-[#0066ff] hover:bg-blue-700 rounded-full flex items-center justify-center text-white shadow-md transition-colors">
                      <ShoppingCart className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6">
        <button 
          onClick={() => navigate('/chat')}
          className="w-14 h-14 bg-white border border-gray-200 rounded-full shadow-lg flex items-center justify-center text-blue-500 hover:text-blue-600 transition-colors"
        >
          <MessageCircle className="w-7 h-7" strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
};

export default HomePage;
