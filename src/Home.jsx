import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import cartService from './services/cartService'
import './Cart.css'

const formatPrice = (price) => `${Number(price || 0).toLocaleString('vi-VN')}đ`

const getProductImage = (product) => {
  if (product?.image) return product.image

  return `https://placehold.co/480x320/f3f4f6/111827?text=${encodeURIComponent(
    product?.name || 'San pham',
  )}`
}

const Home = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const data = await cartService.getProducts()
        setProducts(Array.isArray(data) ? data : [])
        setError(null)
      } catch (err) {
        setError('Không thể tải danh sách sản phẩm.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const handleAddToCart = async (id) => {
    try {
      await cartService.addToCart(id, 1)
      alert('Đã thêm vào giỏ hàng.')
    } catch (err) {
      console.error(err)
      alert('Thêm vào giỏ hàng thất bại.')
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
              Trang chủ
            </Link>
            <Link to="/cart" className="cart-nav-btn">
              Giỏ hàng
            </Link>
          </div>
        </div>
      </header>

      <main className="cart-layout">
        <section className="home-hero">
          <div className="home-hero__content">
            <p className="home-kicker">He thong mua sam</p>
            <h1>Danh sách sản phẩm nổi bật</h1>
            <p>
              Giao diện trang chủ đã được đồng bộ với trang giỏ hàng để hiển thị rõ sản
              phẩm, giá bán và thao tác thêm vào giỏ.
            </p>
          </div>
          <div className="home-hero__stats">
            <div className="home-stat-card">
              <span>Tổng sản phẩm</span>
              <strong>{products.length}</strong>
            </div>
            <div className="home-stat-card">
              <span>Trạng thái</span>
              <strong>{loading ? 'Đang tải' : 'Sẵn sàng'}</strong>
            </div>
          </div>
        </section>

        {error ? <div className="cart-inline-error">{error}</div> : null}

        {loading ? <div className="cart-state">Đang tải sản phẩm...</div> : null}

        {!loading && products.length === 0 ? (
          <div className="cart-state cart-state--empty">
            <p>Chưa có sản phẩm để hiển thị.</p>
          </div>
        ) : null}

        {products.length > 0 ? (
          <section className="home-grid">
            {products.map((product) => (
              <article key={product.id} className="home-product-card">
                <div className="home-product-card__image-wrap">
                  <img
                    src={getProductImage(product)}
                    alt={product.name}
                    className="home-product-card__image"
                    onError={(event) => {
                      event.currentTarget.src = getProductImage({ name: product.name })
                    }}
                  />
                </div>

                <div className="home-product-card__content">
                  <h2>{product.name}</h2>
                  <p className="home-product-card__price">{formatPrice(product.price)}</p>
                </div>

                <button
                  type="button"
                  className="home-product-card__action"
                  onClick={() => handleAddToCart(product.id)}
                >
                  Thêm vào giỏ
                </button>
              </article>
            ))}
          </section>
        ) : null}
      </main>
    </div>
  )
}

export default Home
