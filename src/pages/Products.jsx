import React, { useState, useEffect } from 'react';
import ProductTable from '../components/ProductTable';
import ProductFilters from '../components/ProductFilters';
import ProductModal from '../components/ProductModal';
import { productService } from '../services/api';
import { Plus, Download, ChevronLeft, ChevronRight } from 'lucide-react';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // States for search and filter
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('');
  
  // States for modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await productService.getProducts();
      setProducts(response.data);
      setFilteredProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    let result = products;
    
    // Chỉ lấy sản phẩm có ảnh
    result = result.filter(p => p.image && p.image.trim() !== '');

    if (searchTerm) {
      result = result.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    
    if (category) {
      result = result.filter(p => p.category === category);
    }
    
    if (status) {
      result = result.filter(p => p.status === status);
    }
    
    setFilteredProducts(result);
  }, [searchTerm, category, status, products]);

  const handleCreate = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này không?')) {
      try {
        await productService.deleteProduct(id);
        fetchProducts();
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  const handleSave = async (formData) => {
    try {
      if (editingProduct) {
        await productService.updateProduct(editingProduct.id, formData);
      } else {
        await productService.createProduct(formData);
      }
      setIsModalOpen(false);
      fetchProducts();
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-full text-2xl font-bold animate-pulse">Đang tải danh sách hàng hóa...</div>;
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h2 className="text-4xl font-black italic uppercase tracking-tighter text-black leading-none">Hàng hóa</h2>
          <p className="text-xl font-bold text-gray-500 italic uppercase">Danh sách hàng hóa trong hệ thống</p>
        </div>
        
        <div className="flex items-center space-x-4">
           <button 
             onClick={handleCreate}
             className="flex items-center space-x-3 px-8 py-4 bg-primary text-white rounded-xl font-black italic uppercase tracking-tighter shadow-lg shadow-primary/30 hover:bg-primary-dark transition-all hover:-translate-y-1 active:translate-y-0"
           >
             <Plus size={24} />
             <span className="text-xl">Thêm sản phẩm</span>
           </button>
           <button className="p-4 bg-green-500 text-white rounded-xl shadow-lg shadow-green-100 hover:bg-green-600 transition-all hover:-translate-y-1 active:translate-y-0">
             <Download size={28} />
           </button>
        </div>
      </div>

      <ProductFilters 
        searchTerm={searchTerm} setSearchTerm={setSearchTerm}
        category={category} setCategory={setCategory}
        status={status} setStatus={setStatus}
      />

      <ProductTable 
        products={filteredProducts} 
        onEdit={handleEdit} 
        onDelete={handleDelete} 
      />

      {/* Pagination Placeholder */}
      <div className="flex items-center justify-center space-x-3 pt-4 pb-10">
        <button className="p-3 bg-gray-200 text-gray-400 rounded-lg hover:bg-gray-300 transition-colors">
          <ChevronLeft size={24} />
        </button>
        <button className="w-12 h-12 bg-primary text-white rounded-lg font-black italic text-xl shadow-md">1</button>
        <button className="w-12 h-12 bg-gray-200 text-gray-700 rounded-lg font-black italic text-xl hover:bg-gray-300 transition-colors">2</button>
        <button className="w-12 h-12 bg-gray-200 text-gray-700 rounded-lg font-black italic text-xl hover:bg-gray-300 transition-colors">3</button>
        <button className="p-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
          <ChevronRight size={24} />
        </button>
      </div>

      <ProductModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleSave} 
        product={editingProduct} 
      />
    </div>
  );
};

export default Products;
