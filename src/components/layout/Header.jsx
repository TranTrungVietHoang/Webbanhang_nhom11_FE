import { Search, ShoppingCart, Bell, Settings, User } from 'lucide-react';

export default function Header() {
  return (
    <header className="h-20 bg-white shadow-sm flex items-center justify-between px-8 border-b">
      {/* Search Bar */}
      <div className="flex-1 max-w-xl relative">
        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
          <Search size={20} />
        </span>
        <input
          type="text"
          placeholder="Tìm mã đơn hàng hoặc tên khách hàng..."
          className="w-full pl-10 pr-4 py-2 bg-gray-100 border-transparent rounded-sm focus:bg-white focus:border-gray-300 focus:ring-0 outline-none text-sm transition-all"
        />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-6 ml-4">
        <button className="text-gray-600 hover:text-black">
          <User size={22} />
        </button>
        <button className="text-gray-600 hover:text-black">
           <ShoppingCart size={22} />
        </button>
        <button className="text-gray-600 hover:text-black relative">
          <Bell size={22} />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-white"></span>
        </button>
        <button className="text-gray-600 hover:text-black">
          <Settings size={22} />
        </button>
        
        {/* Profile */}
        <div className="flex items-center gap-2 pl-4 border-l">
          <span className="font-bold text-sm tracking-widest text-black">ADMIN</span>
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
             <User size={18} className="text-gray-500" />
          </div>
        </div>
      </div>
    </header>
  );
}
