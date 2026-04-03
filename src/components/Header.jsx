import React from 'react';
import { Search, ShoppingCart, Bell, Heart, User, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Logo */}
        <Link to="/" className="text-blue-600 font-bold text-lg md:text-xl flex-shrink-0 whitespace-nowrap hidden sm:block">
          Web Ban Hang
        </Link>
        <Link to="/" className="text-blue-600 font-bold text-lg sm:hidden">
          WBH
        </Link>

        {/* Search Bar */}
        <div className="flex-1 max-w-2xl px-2 md:px-8">
          <div className="relative flex items-center w-full h-9 bg-gray-100 rounded-full overflow-hidden">
            <Search className="w-4 h-4 text-gray-500 ml-3 flex-shrink-0" />
            <input 
              type="text" 
              className="w-full bg-transparent border-none outline-none px-3 text-sm text-gray-700" 
              placeholder="Tìm kiếm..."
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4 sm:gap-6 flex-shrink-0">
          <div className="flex items-center gap-3 sm:gap-4 text-gray-700">
            <button className="hover:text-blue-600 transition-colors">
              <ShoppingCart className="w-5 h-5" />
            </button>
            <button className="hidden sm:block hover:text-blue-600 transition-colors">
              <Bell className="w-5 h-5" />
            </button>
            <button className="hidden md:block hover:text-blue-600 transition-colors">
              <TrendingUp className="w-5 h-5" />
            </button>
            <button className="hidden sm:block hover:text-blue-600 transition-colors">
              <Heart className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button className="hidden md:block px-4 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors">
              Dang Nhap
            </button>
            <button className="px-4 py-1.5 bg-blue-600 text-white rounded-full text-sm font-medium hover:bg-blue-700 transition-colors whitespace-nowrap">
              Dang Ky
            </button>
            <button className="ml-1 text-gray-700 hover:text-blue-600">
              <Link to="/member"><User className="w-6 h-6" /></Link>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
