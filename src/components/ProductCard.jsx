import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const ProductCard = ({ product }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      className="product-card group relative"
    >
      {/* Wishlist Button */}
      <button className="absolute top-3 left-3 p-1.5 bg-white/80 hover:bg-white rounded-full text-slate-400 hover:text-red-500 transition-colors z-10 shadow-sm border border-slate-100">
        <Heart className="w-4 h-4" />
      </button>

      {/* Product Image */}
      <Link to={`/product/${product.id}`}>
        <div className="relative aspect-[4/3] overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-4 space-y-2">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-semibold text-slate-800 line-clamp-2 min-h-[48px] group-hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
        </Link>
        
        <div className="flex items-center gap-2 text-sm">
          <div className="flex items-center text-yellow-400 font-bold">
            {product.rating} <Star className="w-4 h-4 ml-0.5 fill-current" />
          </div>
          <span className="text-slate-200">|</span>
          <span className="text-slate-400">Đã bán {product.sold}</span>
        </div>

        <div className="flex items-center justify-between pt-2">
          <span className="text-lg font-bold text-red-600">
            {product.price.toLocaleString()}đ
          </span>
          
          <button className="p-2.5 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white rounded-xl transition-all active:scale-95 shadow-sm border border-blue-100">
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
