import React from 'react';
import { Globe, Camera, Send, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#0F172A] text-slate-300 pt-16 pb-8">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* About */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white mb-6">Web Ban Hang</h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            Nền tảng mua sắm trực tuyến hàng đầu Việt Nam với hàng triệu sản phẩm chất lượng. Chúng tôi cam kết mang lại trải nghiệm mua sắm tuyệt vời nhất cho khách hàng.
          </p>
          <div className="flex gap-4 pt-4">
             <a href="#" className="p-2 bg-slate-800 rounded-full hover:bg-blue-600 transition-colors"><Globe className="w-5 h-5" /></a>
             <a href="#" className="p-2 bg-slate-800 rounded-full hover:bg-pink-600 transition-colors"><Camera className="w-5 h-5" /></a>
             <a href="#" className="p-2 bg-slate-800 rounded-full hover:bg-blue-400 transition-colors"><Send className="w-5 h-5" /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-bold text-white mb-6">Liên kết</h3>
          <ul className="space-y-3">
            <li><a href="#" className="hover:text-white transition-colors">Trang chủ</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Mã giảm giá</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Điểm thưởng</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Hỗ trợ</a></li>
          </ul>
        </div>

        {/* Policies */}
        <div>
          <h3 className="text-lg font-bold text-white mb-6">Chính sách</h3>
          <ul className="space-y-3">
            <li><a href="#" className="hover:text-white transition-colors">Chính sách bảo mật</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Chính sách vận chuyển</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Chính sách đổi trả</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Điều khoản sử dụng</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-bold text-white mb-6">Liên hệ</h3>
          <ul className="space-y-4">
            <li className="flex gap-3">
              <MapPin className="w-5 h-5 text-blue-500 shrink-0" />
              <span>123 Đường ABC, Quận 1, TP. HCM</span>
            </li>
            <li className="flex gap-3">
              <Phone className="w-5 h-5 text-blue-500 shrink-0" />
              <span>1900-xxxx</span>
            </li>
            <li className="flex gap-3">
              <Mail className="w-5 h-5 text-blue-500 shrink-0" />
              <span>support@shoponline.vn</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-16 pt-8 border-t border-slate-800 text-center text-sm text-slate-500">
        <p>© 2026 WebBanHang - Nhóm 11. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
