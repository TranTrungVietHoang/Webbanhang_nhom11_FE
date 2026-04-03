import { Link, Navigate, useLocation } from 'react-router-dom'
import './Cart.css'

const STORAGE_KEY = 'latestCheckoutOrder'

const formatPrice = (price) => `${Number(price || 0).toLocaleString('vi-VN')}đ`

const getStoredPayload = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch (error) {
    console.error(error)
    return null
  }
}

const CheckoutSuccess = () => {
  const location = useLocation()
  const payload = location.state?.checkoutData || getStoredPayload()

  if (!payload?.order) {
    return <Navigate to="/checkout" replace />
  }

  const { order, customerInfo, subtotal, shippingFee, discount, total } = payload

  return (
    <div className="cart-page">
      <header className="cart-topbar">
        <div className="cart-topbar__inner">
          <Link to="/" className="cart-brand">
            Web Ban Hang
          </Link>

          <div className="cart-topbar__search" aria-hidden="true">
            <span className="cart-topbar__search-icon">⌕</span>
          </div>

          <div className="cart-topbar__actions">
            <span className="cart-user">USER_1</span>
            <Link to="/" className="cart-nav-btn cart-nav-btn--ghost">
              Sản phẩm
            </Link>
            <Link to="/cart" className="cart-nav-btn">
              Giỏ hàng
            </Link>
          </div>
        </div>
      </header>

      <main className="checkout-figma checkout-success">
        <section className="checkout-success__hero">
          <p className="checkout-success__eyebrow">Đặt hàng thành công</p>
          <p>
            Đơn hàng của bạn đã được ghi nhận. Dưới đây là thông tin người nhận và chi tiết
            đơn hàng vừa đặt.
          </p>
        </section>

        <div className="checkout-figma__grid">
          <section className="checkout-success__panel">
            <h2>THÔNG TIN KHÁCH HÀNG</h2>

            <div className="checkout-success__info">
              <div className="checkout-success__info-row">
                <span>Họ và tên</span>
                <strong>{customerInfo.customerName}</strong>
              </div>
              <div className="checkout-success__info-row">
                <span>Số điện thoại</span>
                <strong>{customerInfo.phoneNumber}</strong>
              </div>
              <div className="checkout-success__info-row">
                <span>Địa chỉ</span>
                <strong>{customerInfo.address}</strong>
              </div>
              <div className="checkout-success__info-row">
                <span>Email</span>
                <strong>{customerInfo.email || 'Không cung cấp'}</strong>
              </div>
              <div className="checkout-success__info-row">
                <span>Phương thức thanh toán</span>
                <strong>
                  {customerInfo.paymentMethod === 'transfer'
                    ? 'Chuyển khoản ngân hàng'
                    : 'Trả tiền mặt khi nhận hàng'}
                </strong>
              </div>
              <div className="checkout-success__info-row">
                <span>Ghi chú</span>
                <strong>{customerInfo.note || 'Không có ghi chú'}</strong>
              </div>
              <div className="checkout-success__info-row">
                <span>Mã ưu đãi</span>
                <strong>{customerInfo.promoCode}</strong>
              </div>
            </div>
          </section>

          <aside className="checkout-success__panel checkout-success__panel--order">
            <h2>THÔNG TIN ĐƠN HÀNG</h2>

            <div className="checkout-success__order-meta">
              <div>
                <span>Mã đơn hàng</span>
                <strong>{order.orderId}</strong>
              </div>
              <div>
                <span>Trạng thái</span>
                <strong>{order.status}</strong>
              </div>
            </div>

            <div className="checkout-success__items">
              {order.items.map((item) => (
                <div key={item.id} className="checkout-success__item">
                  <span>{`${item.name} x${item.quantity}`}</span>
                  <strong>{formatPrice(item.price * item.quantity)}</strong>
                </div>
              ))}
            </div>

            <div className="checkout-success__totals">
              <div className="checkout-success__info-row">
                <span>Tạm tính</span>
                <strong>{formatPrice(subtotal)}</strong>
              </div>
              <div className="checkout-success__info-row">
                <span>Phí vận chuyển</span>
                <strong>{formatPrice(shippingFee)}</strong>
              </div>
              <div className="checkout-success__info-row">
                <span>Giảm giá</span>
                <strong>-{formatPrice(discount)}</strong>
              </div>
              <div className="checkout-success__info-row checkout-success__info-row--total">
                <span>Tổng thanh toán</span>
                <strong>{formatPrice(total)}</strong>
              </div>
            </div>

            <div className="checkout-success__actions">
              <Link to="/" className="cart-nav-btn cart-nav-btn--ghost">
                Tiếp tục mua sắm
              </Link>
              <Link to="/cart" className="cart-nav-btn">
                Về giỏ hàng
              </Link>
            </div>
          </aside>
        </div>
      </main>
    </div>
  )
}

export default CheckoutSuccess
