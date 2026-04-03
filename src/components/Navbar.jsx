import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Bell, Heart, User, Search, Menu } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg border-b border-slate-100 py-3 shadow-sm">
      <div className="container mx-auto px-4 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent min-w-max">
          Web Ban Hang
        </Link>

        {/* Search Bar */}
        <div className="hidden md:flex flex-1 max-w-2xl relative">
          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm..."
            className="w-full bg-slate-100 border-none rounded-full py-2.5 pl-12 pr-4 focus:ring-2 focus:ring-blue-100 transition-all outline-none text-slate-700"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 md:gap-4">
          <button className="p-2 hover:bg-slate-100 rounded-full transition-colors relative">
            <ShoppingCart className="w-6 h-6 text-slate-600" />
            <span className="absolute top-1 right-0 bg-blue-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white">2</span>
          </button>
          
          <button className="hidden sm:block p-2 hover:bg-slate-100 rounded-full transition-colors">
            <Bell className="w-6 h-6 text-slate-600" />
          </button>

          <button className="hidden sm:block p-2 hover:bg-slate-100 rounded-full transition-colors">
            <Heart className="w-6 h-6 text-slate-600" />
          </button>

          <div className="h-8 w-[1px] bg-slate-200 mx-1 hidden sm:block"></div>

          <div className="flex items-center gap-2">
            <button className="hidden lg:block text-slate-600 font-semibold hover:text-blue-600 transition-colors">Đăng nhập</button>
            <button className="btn-primary py-1.5 px-5 !text-sm">Đăng ký</button>
          </div>

          <button className="p-2 bg-slate-100 rounded-full lg:hidden">
             <User className="w-5 h-5 text-slate-600" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
