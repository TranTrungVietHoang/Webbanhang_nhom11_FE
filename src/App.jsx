import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Customers from './pages/Customers';

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/orders" element={<div className="text-2xl font-bold p-10 bg-white rounded-xl shadow-sm italic uppercase">Quản lý Đơn hàng (Coming Soon)</div>} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/discounts" element={<div className="text-2xl font-bold p-10 bg-white rounded-xl shadow-sm italic uppercase">Mã giảm giá (Coming Soon)</div>} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
