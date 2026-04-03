import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';
import DiscountCodesPage from './pages/DiscountCodes/DiscountCodesPage';
import CustomerSupportChatPage from './pages/Chat/CustomerSupportChatPage';
import MemberPage from './pages/Member/MemberPage';
import OrderHistoryPage from './pages/Orders/OrderHistoryPage';

function App() {
  return (
    <>
      <Toaster 
        position="top-right" 
        toastOptions={{
          duration: 3000,
          style: {
            background: '#1e293b',
            color: '#fff',
            borderRadius: '1rem',
            padding: '1rem 1.5rem',
            fontWeight: '600',
            fontSize: '0.875rem'
          },
        }}
      />
      <div className="flex flex-col min-h-screen selection:bg-blue-100 selection:text-blue-600">
        <Navbar />
        <main className="flex-grow pt-16">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/coupons" element={<DiscountCodesPage />} />
            <Route path="/chat" element={<CustomerSupportChatPage />} />
            <Route path="/member" element={<MemberPage />} />
            <Route path="/orders" element={<OrderHistoryPage />} />
            <Route path="*" element={
              <div className="container mx-auto px-4 py-32 text-center space-y-6 flex flex-col items-center">
                <h1 className="text-9xl font-black text-slate-100 italic tracking-tighter text-center">404</h1>
                <div className="space-y-2 relative -top-16">
                   <h2 className="text-3xl font-black text-slate-800 uppercase italic tracking-tighter">Trang không tồn tại</h2>
                   <p className="text-slate-400 font-medium">Có vẻ như đường dẫn này đã thay đổi hoặc bị xóa.</p>
                </div>
                <button 
                  onClick={() => window.location.href = '/'}
                  className="px-10 py-4 bg-blue-600 text-white rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 active:scale-95"
                >
                  Quay lại trang chủ
                </button>
              </div>
            } />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
