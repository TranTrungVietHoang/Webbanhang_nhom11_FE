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
      className="bg-white rounded-[2rem] overflow-hidden shadow-sm transition-all duration-500 hover:shadow-2xl border border-slate-100 group relative"
    >
      {/* Wishlist Button */}
      <button className="absolute top-4 left-4 p-2.5 bg-white/80 backdrop-blur-md rounded-2xl text-slate-400 hover:text-rose-500 transition-all z-10 shadow-lg border border-white/20 hover:scale-110 active:scale-95 group/heart">
        <Heart className="w-5 h-5 transition-colors group-hover/heart:fill-rose-500" />
      </button>

      {/* Product Image */}
      <Link to={`/product/${product.id}`} className="block relative aspect-square overflow-hidden bg-slate-50">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </Link>

      <div className="p-7 space-y-4">
        <div className="flex items-center justify-between">
          <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-xs font-black uppercase tracking-widest border border-blue-100">
            {product.category}
          </span>
          <div className="flex items-center gap-1.5 text-amber-400">
            <Star size={16} fill="currentColor" />
            <span className="text-sm font-black text-slate-700 leading-none">{product.rating}</span>
          </div>
        </div>

        <Link to={`/product/${product.id}`}>
          <h3 className="font-bold text-slate-800 line-clamp-2 hover:text-blue-600 transition-colors h-12 leading-6 text-lg tracking-tight">
            {product.name}
          </h3>
        </Link>
        
        <div className="flex items-center justify-between pt-2">
          <div>
            <p className="text-2xl font-black text-blue-600 tracking-tighter italic">
              {product.price.toLocaleString()}đ
            </p>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Đã bán {product.sold}</p>
          </div>
          <button className="p-4 bg-blue-600 text-white rounded-[1.25rem] shadow-xl shadow-blue-200 hover:bg-blue-700 active:scale-90 transition-all group/cart">
            <ShoppingCart size={22} className="group-hover/cart:rotate-[-12deg] transition-transform" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
