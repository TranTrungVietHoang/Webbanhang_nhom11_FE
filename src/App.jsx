import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
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
            background: '#fff',
            color: '#333',
            border: '1px solid #e2e8f0',
            borderRadius: '0.5rem',
            padding: '1rem',
            fontWeight: '500',
            fontSize: '0.875rem'
          },
        }}
      />
      <div className="flex flex-col min-h-screen font-sans bg-white text-gray-800">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/coupons" element={<DiscountCodesPage />} />
            <Route path="/chat" element={<CustomerSupportChatPage />} />
            <Route path="/member" element={<MemberPage />} />
            <Route path="/orders" element={<OrderHistoryPage />} />
            <Route path="*" element={
              <div className="container mx-auto px-4 py-32 text-center space-y-6">
                <h1 className="text-6xl font-bold text-gray-300">404</h1>
                <h2 className="text-2xl font-semibold text-gray-600">Trang không tồn tại</h2>
                <button 
                  onClick={() => window.location.href = '/'}
                  className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
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
