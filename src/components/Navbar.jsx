import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Bell, Heart, User, Search, Menu, TrendingUp, ShoppingBag, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Trang chủ', path: '/' },
    { name: 'Mã giảm giá', path: '/coupons' },
    { name: 'Điểm thưởng', path: '/member' },
    { name: 'Hỗ trợ', path: '/chat' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white ${
      isScrolled ? 'shadow-xl py-3 border-b border-slate-100' : 'shadow-sm py-4 border-b border-slate-100'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group min-w-max">
            <div className="p-2 bg-blue-600 rounded-2xl group-hover:rotate-12 transition-transform shadow-lg shadow-blue-500/20">
              <ShoppingBag className="text-white w-6 h-6" strokeWidth={2.5} />
            </div>
            <span className="text-2xl font-black tracking-tighter uppercase italic text-slate-800">
              Web<span className="text-blue-600">BanHang</span>
            </span>
          </Link>

          {/* Desktop Search Bar */}
          <div className="hidden md:flex flex-1 max-w-xl group relative">
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm giá hời..."
              className="w-full bg-slate-100 border-none rounded-2xl py-3 pl-12 pr-4 focus:bg-white focus:ring-4 focus:ring-blue-50 transition-all outline-none font-medium text-sm"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 w-5 h-5 transition-colors" />
          </div>

          {/* Nav Links & Actions */}
          <div className="flex items-center gap-2 md:gap-6">
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8 mr-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-sm font-black uppercase tracking-widest transition-all hover:text-blue-600 relative py-1 group ${
                    location.pathname === link.path ? 'text-blue-600' : 'text-slate-600'
                  }`}
                >
                  {link.name}
                  <span className={`absolute bottom-0 left-0 h-0.5 bg-blue-600 transition-all duration-300 ${
                    location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}></span>
                </Link>
              ))}
            </div>

            {/* Icon Buttons */}
            <div className="flex items-center gap-1 md:gap-2">
              <Link to="/member" className="p-2.5 hover:bg-blue-50 text-slate-600 hover:text-blue-600 rounded-xl transition-all relative group">
                <TrendingUp className="w-6 h-6 group-hover:scale-110 transition-transform" />
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] font-black px-1.5 py-0.5 rounded-full border-2 border-white shadow-sm">NEW</span>
              </Link>
              
              <button className="p-2.5 hover:bg-slate-100 text-slate-600 rounded-xl transition-all relative group">
                <ShoppingCart className="w-6 h-6 group-hover:scale-110 transition-transform" />
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-black px-1.5 py-0.5 rounded-full border-2 border-white shadow-sm">3</span>
              </button>

              <div className="h-6 w-[1px] bg-slate-200 mx-2 hidden sm:block"></div>

              <Link to="/member" className="hidden sm:flex items-center gap-3 p-1.5 pr-4 bg-slate-100 hover:bg-slate-200 rounded-2xl transition-all group">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-blue-600 shadow-sm border border-slate-100">
                  <User className="w-5 h-5" />
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">MEMBER</p>
                  <p className="text-xs font-bold text-slate-800 leading-tight">Gia Huy</p>
                </div>
              </Link>

              {/* Mobile Menu Toggle */}
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2.5 bg-slate-100 text-slate-600 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-all"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-slate-100 overflow-hidden"
          >
            <div className="container mx-auto px-4 py-8 space-y-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block text-xl font-black uppercase tracking-tighter italic ${
                    location.pathname === link.path ? 'text-blue-600' : 'text-slate-800'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-6 border-t border-slate-100 grid grid-cols-2 gap-4">
                <button className="btn-primary w-full py-4 text-xs tracking-widest font-black uppercase">Đăng nhập</button>
                <button className="btn-secondary w-full py-4 text-xs tracking-widest font-black uppercase">Giỏ hàng (3)</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
