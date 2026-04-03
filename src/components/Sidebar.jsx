import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Box, ShoppingCart, Users, Ticket, LogOut } from 'lucide-react';

const Sidebar = () => {
    const menuItems = [
        { name: 'Doanh thu', icon: <LayoutDashboard size={24} />, path: '/' },
        { name: 'Hàng hóa', icon: <Box size={24} />, path: '/products' },
        { name: 'Đơn hàng', icon: <ShoppingCart size={24} />, path: '/orders' },
        { name: 'Khách hàng', icon: <Users size={24} />, path: '/customers' },
        { name: 'Mã giảm giá', icon: <Ticket size={24} />, path: '/discounts' },
    ];

    return (
        <div className="w-64 bg-sidebar-bg text-white h-screen fixed left-0 top-0 flex flex-col shadow-xl z-20">
            <div className="p-8 flex items-center justify-center">
               <div className="text-3xl font-bold tracking-tighter text-primary">
                   N<span className="text-white">11</span>
               </div>
            </div>

            <nav className="flex-1 mt-4">
                {menuItems.map((item, index) => (
                    <NavLink
                        key={index}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex items-center px-8 py-4 space-x-4 transition-all duration-300 border-l-4 ${
                                isActive 
                                ? 'bg-primary border-primary font-medium' 
                                : 'border-transparent hover:bg-sidebar-hover text-gray-400 hover:text-white'
                            }`
                        }
                    >
                        {item.icon}
                        <span className="text-lg">{item.name}</span>
                    </NavLink>
                ))}
            </nav>

            <div className="pb-8">
                <button className="w-full flex items-center px-8 py-4 space-x-4 text-gray-400 hover:text-primary transition-colors duration-300">
                    <LogOut size={24} />
                    <span className="text-lg font-bold uppercase tracking-wider italic font-black">Đăng xuất</span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
