import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import cartService from './services/cartService'
import './Cart.css'

const formatPrice = (price) => `${Number(price || 0).toLocaleString('vi-VN')}đ`
const STORAGE_KEY = 'latestCheckoutOrder'

const Checkout = () => {
  const navigate = useNavigate()
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [promoCode, setPromoCode] = useState('')
  const [discount, setDiscount] = useState(0)
  const [customerInfo, setCustomerInfo] = useState({
    customerName: '',
    phoneNumber: '',
    address: '',
    email: '',
    note: '',
    paymentMethod: 'transfer',
  })

  useEffect(() => {
    const loadCart = async () => {
      try {
        setLoading(true)
        const data = await cartService.getCart()
        setCartItems(data.items || [])
        setError(null)
      } catch (err) {
        setError('Không thể tải giỏ hàng.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    loadCart()
  }, [])

  const getSubTotal = () =>
    cartItems.reduce((sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 0), 0)

  const getShippingFee = () => (cartItems.length > 0 ? 30000 : 0)

  const getTotal = () => getSubTotal() - discount + getShippingFee()

  const applyPromo = () => {
    const code = promoCode.trim().toLowerCase()

    if (code === 'freeship') {
      setDiscount(30000)
      alert('Mã freeship áp dụng thành công.')
      return
    }

    if (code === 'discount50') {
      const amount = Math.min(Math.round(getSubTotal() * 0.5), 500000)
      setDiscount(amount)
      alert(`Giảm ${formatPrice(amount)} thành công.`)
      return
    }

    setDiscount(0)
    alert('Mã không hợp lệ hoặc không còn hiệu lực.')
  }

  const handleCheckout = async (event) => {
    event.preventDefault()

    const normalizedCustomer = {
      customerName: customerInfo.customerName.trim(),
      phoneNumber: customerInfo.phoneNumber.trim(),
      address: customerInfo.address.trim(),
      email: customerInfo.email.trim(),
      note: customerInfo.note.trim(),
      paymentMethod: customerInfo.paymentMethod.trim(),
    }
    const normalizedPromoCode = promoCode.trim()

    if (
      !normalizedCustomer.customerName ||
      !normalizedCustomer.phoneNumber ||
      !normalizedCustomer.address ||
      !normalizedCustomer.email ||
      !normalizedCustomer.note ||
      !normalizedCustomer.paymentMethod
    ) {
      setError('Vui lòng điền đầy đủ tất cả thông tin trên trang thanh toán.')
      return
    }

    try {
      setLoading(true)

      const payload = {
        customerName: normalizedCustomer.customerName,
        phoneNumber: normalizedCustomer.phoneNumber,
        address: normalizedCustomer.address,
        paymentMethod: normalizedCustomer.paymentMethod,
      }

      const result = await cartService.checkout(payload)
      const checkoutData = {
        order: result.order,
        customerInfo: { ...normalizedCustomer, promoCode: normalizedPromoCode },
        subtotal: getSubTotal(),
        shippingFee: getShippingFee(),
        discount,
        total: getTotal(),
      }

      localStorage.setItem(STORAGE_KEY, JSON.stringify(checkoutData))
      navigate('/checkout/success', {
        replace: true,
        state: { checkoutData },
      })
    } catch (err) {
      setError('Thanh toán thất bại, vui lòng thử lại.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

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

      <main className="checkout-figma">
        <div className="checkout-figma__grid">
          <section className="checkout-figma__left">
            <h1 className="checkout-figma__title">THANH TOÁN</h1>

            <p className="checkout-figma__promo">
              <span>Bạn có mã ưu đãi?</span>
              <button type="button" className="checkout-figma__promo-link" onClick={applyPromo}>
                Nhấn vào đây để nhập mã
              </button>
            </p>

            <form id="checkout-form" className="checkout-figma-form" onSubmit={handleCheckout}>
              <div className="checkout-figma-block">
                <h2>THÔNG TIN THANH TOÁN</h2>

                <label className="checkout-figma-field">
                  <span>Họ và tên *</span>
                  <input
                    type="text"
                    placeholder="Nhập đầy đủ họ và tên"
                    value={customerInfo.customerName}
                    onChange={(event) =>
                      setCustomerInfo({ ...customerInfo, customerName: event.target.value })
                    }
                    required
                  />
                </label>

                <label className="checkout-figma-field">
                  <span>Địa chỉ *</span>
                  <input
                    type="text"
                    placeholder="Ví dụ: Số xx Ngõ xx Phú Kiều, Bắc Từ Liêm, Hà Nội"
                    value={customerInfo.address}
                    onChange={(event) =>
                      setCustomerInfo({ ...customerInfo, address: event.target.value })
                    }
                    required
                  />
                </label>

                <label className="checkout-figma-field">
                  <span>Số điện thoại *</span>
                  <input
                    type="tel"
                    placeholder="Nhập số điện thoại của bạn"
                    value={customerInfo.phoneNumber}
                    onChange={(event) =>
                      setCustomerInfo({ ...customerInfo, phoneNumber: event.target.value })
                    }
                    required
                  />
                </label>

                <label className="checkout-figma-field">
                  <span>Email *</span>
                  <input
                    type="email"
                    placeholder="Nhập Email của bạn"
                    value={customerInfo.email}
                    onChange={(event) =>
                      setCustomerInfo({ ...customerInfo, email: event.target.value })
                    }
                    required
                  />
                </label>
              </div>

              <div className="checkout-figma-block">
                <h2>THÔNG TIN BỔ SUNG</h2>

                <label className="checkout-figma-field">
                  <span>Ghi chú về đơn hàng *</span>
                  <textarea
                    placeholder="Ghi chú về đơn hàng"
                    value={customerInfo.note}
                    onChange={(event) =>
                      setCustomerInfo({ ...customerInfo, note: event.target.value })
                    }
                    required
                  />
                </label>
              </div>

              <div className="checkout-figma-field checkout-figma-field--promo">
                <span>Mã ưu đãi</span>
                <div className="checkout-figma-promo-row">
                  <input
                    type="text"
                    placeholder="Nhập mã ưu đãi"
                    value={promoCode}
                    onChange={(event) => setPromoCode(event.target.value)}
                  />
                  <button type="button" className="checkout-figma-promo-btn" onClick={applyPromo}>
                    Áp dụng
                  </button>
                </div>
              </div>

              {error ? <div className="cart-inline-error">{error}</div> : null}
            </form>
          </section>

          <aside className="checkout-figma__right">
            <div className="checkout-figma-order">
              <h2>ĐƠN HÀNG CỦA BẠN</h2>

              <div className="checkout-figma-order__head">
                <span>SẢN PHẨM</span>
                <span>TẠM TÍNH</span>
              </div>

              <div className="checkout-figma-order__items">
                {cartItems.length === 0 ? (
                  <p className="checkout-figma-order__empty">Giỏ hàng trống.</p>
                ) : (
                  cartItems.map((item) => (
                    <div key={item.id} className="checkout-figma-order__item">
                      <span>{`${item.name} x${item.quantity}`}</span>
                      <strong>{formatPrice(item.price * item.quantity)}</strong>
                    </div>
                  ))
                )}
              </div>

              <div className="checkout-figma-order__line-item">
                <span>Tạm tính</span>
                <strong>{formatPrice(getSubTotal())}</strong>
              </div>

              <div className="checkout-figma-order__line-item">
                <span>Phí vận chuyển</span>
                <strong>{formatPrice(getShippingFee())}</strong>
              </div>

              <div className="checkout-figma-order__line-item">
                <span>Giảm giá</span>
                <strong>-{formatPrice(discount)}</strong>
              </div>

              <div className="checkout-figma-payment">
                <label className="checkout-figma-payment__option">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="transfer"
                    checked={customerInfo.paymentMethod === 'transfer'}
                    onChange={(event) =>
                      setCustomerInfo({ ...customerInfo, paymentMethod: event.target.value })
                    }
                  />
                  <span>Chuyển Khoản ngân hàng</span>
                </label>

                {customerInfo.paymentMethod === 'transfer' ? (
                  <p className="checkout-figma-payment__desc">
                    Thực hiện thanh toán vào ngay tài khoản ngân hàng của chúng tôi. Vui lòng
                    sử dụng mã đơn hàng của bạn trong phần nội dung thanh toán. Đơn hàng sẽ
                    được giao sau khi tiền đã chuyển.
                  </p>
                ) : null}

                <label className="checkout-figma-payment__option">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cash"
                    checked={customerInfo.paymentMethod === 'cash'}
                    onChange={(event) =>
                      setCustomerInfo({ ...customerInfo, paymentMethod: event.target.value })
                    }
                  />
                  <span>Trả tiền mặt khi nhận hàng</span>
                </label>
              </div>

              <div className="checkout-figma-order__line-item checkout-figma-order__line-item--total">
                <span>Tổng</span>
                <strong>{formatPrice(getTotal())}</strong>
              </div>

              <button
                type="submit"
                form="checkout-form"
                className="checkout-figma-submit"
                disabled={loading || cartItems.length === 0}
              >
                {loading ? 'Đang xử lý...' : 'ĐẶT HÀNG'}
              </button>

              <p className="checkout-figma-privacy">
                Thông tin cá nhân của bạn sẽ được sử dụng để xử lý đơn hàng, tăng trải nghiệm
                sử dụng website và cho các mục đích khác đã được mô tả trong{' '}
                <span>chính sách riêng tư</span> của chúng tôi.
              </p>
            </div>
          </aside>
        </div>
      </main>
    </div>
  )
}

export default Checkout
