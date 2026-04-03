import { Search, ShoppingCart, Bell, Heart, User } from 'lucide-react';

const Header = () => {
    return (
        <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16 w-full">
                    
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center cursor-pointer">
                        <span className="text-blue-500 font-bold text-xl uppercase tracking-wider">
                            Web Ban Hang
                        </span>
                    </div>

                    {/* Thanh tìm kiếm */}
                    <div className="flex-1 flex justify-center px-2 lg:ml-6 lg:justify-start max-w-2xl">
                        <div className="w-full relative rounded-md shadow-sm hidden md:block">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            </div>
                            <input
                                type="text"
                                className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-full py-2 bg-gray-100 hover:bg-gray-200 transition-colors"
                                placeholder="Tìm kiếm sản phẩm..."
                            />
                        </div>
                    </div>

                    {/* Icons */}
                    <div className="flex items-center space-x-6">
                        <button className="text-gray-500 hover:text-blue-600 transition-colors relative">
                            <ShoppingCart className="h-6 w-6" />
                            <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                                3
                            </span>
                        </button>
                        <button className="text-gray-500 hover:text-blue-600 transition-colors relative">
                            <Bell className="h-6 w-6" />
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                                1
                            </span>
                        </button>
                        <button className="text-gray-500 hover:text-blue-600 transition-colors">
                            <Heart className="h-6 w-6" />
                        </button>
                        <button className="text-gray-500 hover:text-blue-600 transition-colors">
                            <User className="h-6 w-6" />
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
