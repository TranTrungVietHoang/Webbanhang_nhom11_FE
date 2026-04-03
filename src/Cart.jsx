import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import cartService from './services/cartService'
import './Cart.css'

const formatPrice = (price) => `${Number(price || 0).toLocaleString('vi-VN')}đ`

const getItemImage = (item) => {
  if (item?.image) return item.image

  return `https://placehold.co/160x160/f3f4f6/111827?text=${encodeURIComponent(
    item?.name || 'San pham',
  )}`
}

const Cart = () => {
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadCart()
  }, [])

  const loadCart = async () => {
    try {
      setLoading(true)
      const response = await cartService.getCart()
      setCartItems(response.items || [])
      setError(null)
    } catch (err) {
      setError('Không thể tải giỏ hàng.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const getItemTotal = (price, quantity) => Number(price || 0) * Number(quantity || 0)

  const getTotalPrice = () =>
    cartItems.reduce((total, item) => total + getItemTotal(item.price, item.quantity), 0)

  const getTotalItems = () =>
    cartItems.reduce((total, item) => total + Number(item.quantity || 0), 0)

  const increaseQuantity = async (id, currentQty) => {
    try {
      const response = await cartService.updateQuantity(id, currentQty + 1)
      setCartItems(response.items || [])
      setError(null)
    } catch (err) {
      setError('Không thể cập nhật số lượng.')
      console.error(err)
    }
  }

  const decreaseQuantity = async (id, currentQty) => {
    if (currentQty <= 1) return

    try {
      const response = await cartService.updateQuantity(id, currentQty - 1)
      setCartItems(response.items || [])
      setError(null)
    } catch (err) {
      setError('Không thể cập nhật số lượng.')
      console.error(err)
    }
  }

  const removeItem = async (id) => {
    try {
      const response = await cartService.removeFromCart(id)
      setCartItems(response.items || [])
      setError(null)
    } catch (err) {
      setError('Không thể xóa sản phẩm khỏi giỏ hàng.')
      console.error(err)
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

      <main className="cart-layout">
        <section className="cart-figma-panel">
          <div className="cart-figma-head">
            <span>Sản Phẩm</span>
            <span>Giá Tiền</span>
            <span>Số Lượng</span>
            <span>Tổng giá</span>
            <span aria-hidden="true"></span>
          </div>

          {loading && cartItems.length === 0 ? (
            <div className="cart-state">Đang tải giỏ hàng...</div>
          ) : null}

          {!loading && cartItems.length === 0 ? (
            <div className="cart-state cart-state--empty">
              <p>Giỏ hàng trống.</p>
              <Link to="/" className="cart-primary-btn">
                Tiếp tục mua sắm
              </Link>
            </div>
          ) : null}

          {cartItems.length > 0 ? (
            <div className="cart-figma-list">
              {cartItems.map((item) => (
                <article key={item.id} className="cart-figma-row">
                  <div className="cart-figma-row__product">
                    <img
                      src={getItemImage(item)}
                      alt={item.name}
                      className="cart-figma-row__image"
                      onError={(event) => {
                        event.currentTarget.src = getItemImage({ name: item.name })
                      }}
                    />

                    <div className="cart-figma-row__meta">
                      <h2>{item.name}</h2>
                    </div>
                  </div>

                  <div className="cart-figma-row__price">{formatPrice(item.price)}</div>

                  <div className="cart-figma-row__quantity">
                    <div className="cart-figma-quantity">
                      <button
                        type="button"
                        className="cart-figma-quantity__btn"
                        onClick={() => decreaseQuantity(item.id, item.quantity)}
                        aria-label={`Giảm số lượng ${item.name}`}
                      >
                        -
                      </button>
                      <span className="cart-figma-quantity__value">{item.quantity}</span>
                      <button
                        type="button"
                        className="cart-figma-quantity__btn"
                        onClick={() => increaseQuantity(item.id, item.quantity)}
                        aria-label={`Tăng số lượng ${item.name}`}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="cart-figma-row__total">
                    {formatPrice(getItemTotal(item.price, item.quantity))}
                  </div>

                  <div className="cart-figma-row__remove">
                    <button
                      type="button"
                      className="cart-figma-remove"
                      onClick={() => removeItem(item.id)}
                      aria-label={`Xóa ${item.name} khỏi giỏ hàng`}
                    >
                      ×
                    </button>
                  </div>
                </article>
              ))}
            </div>
          ) : null}

          {error ? <div className="cart-inline-error">{error}</div> : null}

          {cartItems.length > 0 ? (
            <footer className="cart-figma-footer">
              <div className="cart-figma-selected">
                <span className="cart-figma-selected__box" aria-hidden="true"></span>
                <p>ĐÃ CHỌN: {getTotalItems()} sản phẩm đã chọn</p>
              </div>

              <div className="cart-figma-summary">
                <div className="cart-figma-summary__text">
                  <span>Tổng thanh toán</span>
                  <strong>{formatPrice(getTotalPrice())}</strong>
                </div>

                <Link to="/checkout" className="cart-figma-checkout">
                  Thanh toán
                </Link>
              </div>
            </footer>
          ) : null}
        </section>
      </main>
    </div>
  )
}

export default Cart
