import React, { useState, useEffect } from 'react';
import CustomerStats from '../components/CustomerStats';
import CustomerFilters from '../components/CustomerFilters';
import CustomerTable from '../components/CustomerTable';
import CustomerModal from '../components/CustomerModal';
import { customerService } from '../services/api';
import { Plus, Download, ChevronLeft, ChevronRight } from 'lucide-react';

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Search and Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [status, setStatus] = useState('');
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const response = await customerService.getCustomers();
      setCustomers(response.data);
      setFilteredCustomers(response.data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  useEffect(() => {
    let result = customers;
    
    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      result = result.filter(c => 
        c.name.toLowerCase().includes(lowerSearch) || 
        c.phone.includes(lowerSearch) || 
        c.email.toLowerCase().includes(lowerSearch)
      );
    }
    
    if (status) {
      result = result.filter(c => c.status === status);
    }
    
    setFilteredCustomers(result);
  }, [searchTerm, status, customers]);

  const handleToggleStatus = async (customer) => {
    const newStatus = customer.status === 'Hoạt động' ? 'Bị khóa' : 'Hoạt động';
    const confirmMessage = `Bạn có chắc chắn muốn ${newStatus === 'Bị khóa' ? 'khóa' : 'mở khóa'} tài khoản của ${customer.name}?`;
    
    if (window.confirm(confirmMessage)) {
      try {
        await customerService.updateCustomer(customer.id, { status: newStatus });
        fetchCustomers();
      } catch (error) {
        console.error('Error toggling customer status:', error);
      }
    }
  };

  const handleAddCustomer = async (formData) => {
    try {
      await customerService.createCustomer(formData);
      setIsModalOpen(false);
      fetchCustomers();
    } catch (error) {
      console.error('Error adding customer:', error);
    }
  };

  const stats = {
    total: customers.length,
    active: customers.filter(c => c.status === 'Hoạt động').length,
    locked: customers.filter(c => c.status === 'Bị khóa').length,
  };

  if (loading) {
    return <div className="flex items-center justify-center h-full text-2xl font-black italic uppercase animate-pulse">Đang tải danh sách khách hàng...</div>;
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h2 className="text-4xl font-black italic uppercase tracking-tighter text-black leading-none">Khách hàng</h2>
          <p className="text-xl font-bold text-gray-500 italic uppercase">Danh sách khách hàng trong hệ thống</p>
        </div>
        
        <div className="flex items-center space-x-4">
           <button 
             onClick={() => setIsModalOpen(true)}
             className="flex items-center space-x-3 px-8 py-4 bg-primary-blue text-white rounded-xl font-black italic uppercase tracking-tighter shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all hover:-translate-y-1"
           >
             <Plus size={24} />
             <span className="text-xl">Thêm Khách hàng</span>
           </button>
           <button className="p-4 bg-green-500 text-white rounded-xl shadow-lg shadow-green-100 hover:bg-green-600 transition-all hover:-translate-y-1">
             <Download size={28} />
           </button>
        </div>
      </div>

      <CustomerStats stats={stats} />

      <CustomerFilters 
        searchTerm={searchTerm} setSearchTerm={setSearchTerm}
        status={status} setStatus={setStatus}
      />

      <CustomerTable 
        customers={filteredCustomers} 
        onToggleStatus={handleToggleStatus}
      />

      {/* Pagination Placeholder */}
      <div className="flex items-center justify-center space-x-3 pt-4 pb-10">
        <button className="p-3 bg-gray-200 text-gray-400 rounded-lg hover:bg-gray-300 transition-colors">
          <ChevronLeft size={24} />
        </button>
        <button className="w-12 h-12 bg-primary-blue text-white rounded-lg font-black italic text-xl shadow-md">1</button>
        <button className="w-12 h-12 bg-gray-200 text-gray-700 rounded-lg font-black italic text-xl hover:bg-gray-300 transition-colors">2</button>
        <button className="w-12 h-12 bg-gray-200 text-gray-700 rounded-lg font-black italic text-xl hover:bg-gray-300 transition-colors">3</button>
        <button className="p-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
          <ChevronRight size={24} />
        </button>
      </div>

      <CustomerModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleAddCustomer} 
      />
    </div>
  );
};

export default Customers;
