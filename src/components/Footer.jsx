import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Facebook = (props) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>;
const Instagram = (props) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>;
const Footer = () => {
  return (
    <footer className="bg-[#101d2d] text-white pt-16 pb-8">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Info */}
          <div className="space-y-6">
            <h2 className="text-2xl font-sans font-bold tracking-wide">Web Ban Hang</h2>
            <p className="text-gray-300 text-sm leading-relaxed max-w-xs">
              Nền tảng mua sắm trực tuyến hàng đầu Việt Nam với hàng triệu sản phẩm chất lượng.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-blue-400 transition-colors bg-white text-[#101d2d] p-1.5 rounded-full">
                <Facebook className="w-5 h-5 fill-current" />
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors bg-white text-[#101d2d] p-1.5 rounded-lg">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="space-y-6">
            <h3 className="text-xl font-sans font-bold tracking-wide">Liên kết</h3>
            <ul className="space-y-3 text-gray-300 text-sm">
              <li><Link to="/" className="hover:text-white transition-colors">Trang chủ</Link></li>
              <li><Link to="/coupons" className="hover:text-white transition-colors">Mã giảm giá</Link></li>
              <li><Link to="/member" className="hover:text-white transition-colors">Điểm thưởng</Link></li>
              <li><Link to="/chat" className="hover:text-white transition-colors">Hỗ trợ</Link></li>
            </ul>
          </div>

          {/* Policy */}
          <div className="space-y-6">
            <h3 className="text-xl font-sans font-bold tracking-wide">Chính sách</h3>
            <ul className="space-y-3 text-gray-300 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Chính sách bảo mật</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Chính sách vận chuyển</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Chính sách đổi trả</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Điều khoản sử dụng</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h3 className="text-xl font-sans font-bold tracking-wide">Liên hệ</h3>
            <ul className="space-y-4 text-gray-300 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>123 Đường ABC, Quận 1, TP. HCM</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 flex-shrink-0" />
                <span>1900-xxxx</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 flex-shrink-0" />
                <span>support@shoponline.vn</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-gray-700/50 pt-8 text-center">
          <p className="text-gray-400 text-sm font-sans">
            © 2026 WebBanHang. Nhom_11
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
