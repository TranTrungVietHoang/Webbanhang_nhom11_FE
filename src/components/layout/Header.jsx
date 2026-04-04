import { Search, ShoppingCart, Bell, Settings, User, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

export default function Header() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [showMenu, setShowMenu] = useState(false);

  console.log('[Header] Rendering with user:', user);
  console.log('[Header] user?.fullName:', user?.fullName);
  console.log('[Header] user?.email:', user?.email);

  const handleLogout = () => {
    console.log('[Header.handleLogout] CLICKED!');
    console.log('[Header.handleLogout] Before logout - user:', user);
    logout();
    console.log('[Header.handleLogout] After logout called');
    navigate('/login');
    console.log('[Header.handleLogout] Navigate to /login called');
  };

  // Lấy chữ cái đầu của tên
  const getInitial = () => {
    if (user?.fullName) {
      const initial = user.fullName.charAt(0).toUpperCase();
      console.log('[Header.getInitial] Returning:', initial, 'from user:', user.fullName);
      return initial;
    }
    console.log('[Header.getInitial] No user, returning U');
    return 'U';
  };

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
        <div className="flex items-center gap-2 pl-4 border-l relative">
          <div className="text-right">
            <div className="font-bold text-sm tracking-widest text-black">
              {user?.fullName || 'ADMIN'}
            </div>
            <div className="text-xs text-gray-500">{user?.email}</div>
          </div>
          <button
            onClick={() => {
              console.log('[Header] Avatar button clicked');
              setShowMenu(!showMenu);
            }}
            className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm hover:bg-blue-700 transition"
          >
            {getInitial()}
          </button>

          {/* Dropdown Menu */}
          {showMenu && (
            <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
              <div className="p-4 border-b">
                <p className="font-semibold text-sm">{user?.fullName}</p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
              <button
                onClick={(e) => {
                  console.log('[Header] Logout button clicked, e:', e);
                  e.preventDefault();
                  handleLogout();
                }}
                className="w-full flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 transition"
              >
                <LogOut size={18} />
                <span>Đăng xuất</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
