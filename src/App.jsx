import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Home from './Home'
import Cart from './Cart'
import Checkout from './Checkout'
import CheckoutSuccess from './CheckoutSuccess'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/checkout/success" element={<CheckoutSuccess />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default App;
