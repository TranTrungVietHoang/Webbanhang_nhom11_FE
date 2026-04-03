import React from 'react';
import { Search, ShoppingCart, Bell, Settings, User } from 'lucide-react';

const Header = () => {
  return (
    <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-10 fixed top-0 right-0 left-64 z-10 shadow-sm">
      <div className="flex-1 max-w-md relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search size={22} className="text-black" />
        </div>
        <input
          type="text"
          placeholder="Tìm kiếm..."
          className="block w-full pl-12 pr-4 py-3 bg-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300 text-lg"
        />
      </div>

      <div className="flex items-center space-x-8 ml-8">
        <button className="text-black hover:text-primary transition-colors">
          <ShoppingCart size={32} />
        </button>
        <button className="text-black hover:text-primary transition-colors relative">
           <Bell size={32} />
           <span className="absolute -top-1 -right-1 bg-red-500 w-4 h-4 rounded-full border-2 border-white"></span>
        </button>
        <button className="text-black hover:text-primary transition-colors">
          <Settings size={32} />
        </button>
        
        <div className="flex items-center space-x-3 bg-gray-50 px-4 py-2 rounded-full border border-gray-100 shadow-sm">
           <span className="text-lg font-black italic uppercase tracking-wider text-black">ADMIN</span>
           <div className="bg-gray-300 p-2 rounded-full">
               <User size={32} className="text-black" />
           </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
