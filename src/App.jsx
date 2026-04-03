import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/products" element={<div className="text-2xl font-bold p-10 bg-white rounded-xl shadow-sm">Quản lý Hàng hóa (Coming Soon)</div>} />
          <Route path="/orders" element={<div className="text-2xl font-bold p-10 bg-white rounded-xl shadow-sm">Quản lý Đơn hàng (Coming Soon)</div>} />
          <Route path="/customers" element={<div className="text-2xl font-bold p-10 bg-white rounded-xl shadow-sm">Quản lý Khách hàng (Coming Soon)</div>} />
          <Route path="/discounts" element={<div className="text-2xl font-bold p-10 bg-white rounded-xl shadow-sm">Mã giảm giá (Coming Soon)</div>} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
