import { useState, useEffect } from 'react'

function App() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Goi API tu Backend (se duoc cau hinh qua Docker Compose)
    fetch('http://localhost:3000/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data)
        setLoading(false)
      })
      .catch(err => {
        console.error("Error fetching products:", err)
        setLoading(false)
      })
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-blue-600">Web Ban Hang - Nhom 11</h1>
        <p className="text-gray-600">Demo Docker + CI/CD + React + Node.js</p>
      </header>

      <main>
        {loading ? (
          <p>Loading products from Backend...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map(product => (
              <div key={product.id} className="bg-white p-4 rounded-lg shadow-md">
                <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-md mb-4" />
                <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
                <p className="text-red-600 font-bold">{product.price.toLocaleString()}đ</p>
                <div className="mt-2 flex items-center justify-between text-sm text-gray-500">
                  <span>⭐ {product.rating}</span>
                  <span>Da ban {product.sold}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

export default App
