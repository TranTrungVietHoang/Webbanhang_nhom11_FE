import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import Orders from './pages/Orders';
import Discounts from './pages/Discounts';
import Products from './pages/Products';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          {/* Default redirect to Orders as per mock */}
          <Route index element={<Navigate to="/orders" replace />} />
          <Route path="orders" element={<Orders />} />
          <Route path="discounts" element={<Discounts />} />
          <Route path="hang-hoa" element={<Products />} />
          {/* Placeholders for other routes */}
          <Route path="doanh-thu" element={<div className="p-8 text-xl">Tính năng Doanh thu đang phát triển</div>} />
          <Route path="khach-hang" element={<div className="p-8 text-xl">Tính năng Khách hàng đang phát triển</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
