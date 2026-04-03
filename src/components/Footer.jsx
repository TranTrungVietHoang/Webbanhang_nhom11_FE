import React from 'react';
import { ShoppingBag, Globe, Send, MessageCircle, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const SocialIcons = [Globe, MessageCircle, Send];


const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-20 pb-10 w-full overflow-hidden mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="p-2.5 bg-blue-600 rounded-2xl group-hover:rotate-12 transition-transform shadow-lg shadow-blue-900/20">
                <ShoppingBag className="text-white" size={28} strokeWidth={2.5} />
              </div>
              <span className="text-2xl font-black text-white tracking-tighter uppercase italic">
                Web<span className="text-blue-500">BanHang</span>
              </span>
            </Link>
            <p className="text-slate-400 leading-relaxed font-medium">
              Trải nghiệm mua sắm công nghệ đỉnh cao với chính sách bảo hành và ưu đãi tốt nhất thị trường.
            </p>
            <div className="flex gap-4">
              {SocialIcons.map((Icon, idx) => (
                <a key={idx} href="#" className="p-3 bg-slate-800 hover:bg-blue-600 hover:text-white rounded-xl transition-all shadow-sm">
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-black text-lg uppercase tracking-widest mb-8 border-l-4 border-blue-600 pl-4">Sản Phẩm</h4>
            <ul className="space-y-4 font-bold text-sm">
              <li><Link to="/" className="hover:text-blue-500 transition-colors uppercase">Điện thoại</Link></li>
              <li><Link to="/" className="hover:text-blue-500 transition-colors uppercase">Laptop & Tablet</Link></li>
              <li><Link to="/" className="hover:text-blue-500 transition-colors uppercase">Âm thanh</Link></li>
              <li><Link to="/" className="hover:text-blue-500 transition-colors uppercase">Phụ kiện</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black text-lg uppercase tracking-widest mb-8 border-l-4 border-blue-600 pl-4">Hỗ Trợ</h4>
            <ul className="space-y-4 font-bold text-sm">
              <li><Link to="/chat" className="hover:text-blue-500 transition-colors uppercase">Trung tâm hỗ trợ</Link></li>
              <li><Link to="/member" className="hover:text-blue-500 transition-colors uppercase">Tài khoản</Link></li>
              <li><Link to="/orders" className="hover:text-blue-500 transition-colors uppercase">Lịch sử đơn hàng</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black text-lg uppercase tracking-widest mb-8 border-l-4 border-blue-600 pl-4">Liên Hệ</h4>
            <ul className="space-y-4 font-medium text-sm">
              <li className="flex gap-3 items-center">
                <MapPin size={20} className="text-blue-500" />
                <span>123 Đường ABC, Quận 1, TP. HCM</span>
              </li>
              <li className="flex gap-3 items-center">
                <Phone size={20} className="text-blue-500" />
                <span>1900 6789</span>
              </li>
              <li className="flex gap-3 items-center">
                <Mail size={20} className="text-blue-500" />
                <span>support@antigravity.vn</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-slate-800 text-center text-sm font-bold text-slate-500 uppercase tracking-widest">
          <p>© 2026 WebBanHang - Nhóm 11. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
