import { BarChart3, Package, ShoppingCart, Users, TicketPercent, LogOut } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const navItems = [
  { name: 'Doanh thu', path: '/doanh-thu', icon: BarChart3 },
  { name: 'Hàng hóa', path: '/hang-hoa', icon: Package },
  { name: 'Đơn hàng', path: '/orders', icon: ShoppingCart },
  { name: 'Khách hàng', path: '/khach-hang', icon: Users },
  { name: 'Mã giảm giá', path: '/discounts', icon: TicketPercent },
];

export default function Sidebar() {
  return (
    <aside className="w-60 bg-[#2D313A] text-white flex flex-col min-h-screen shrink-0 font-medium">
      {/* Logo */}
      <div className="h-20 flex items-center justify-center border-b border-gray-700">
        <h1 className="text-3xl font-black tracking-wider text-[#E85C5C]">N11</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6 flex flex-col gap-2">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-4 px-8 py-4 transition-colors ${
                isActive
                  ? 'bg-[#A85A5A] text-white border-l-4 border-white'
                  : 'text-gray-300 hover:bg-[#3D424F]'
              }`
            }
          >
            <item.icon size={22} strokeWidth={2} />
            <span className="text-lg">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-700">
        <button className="flex items-center gap-4 px-4 py-3 text-white hover:text-red-400 transition-colors w-full">
          <LogOut size={22} className="text-red-500" />
          <span className="text-lg">Đăng xuất</span>
        </button>
      </div>
    </aside>
  );
}
