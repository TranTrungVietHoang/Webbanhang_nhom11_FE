import React, { useState, useEffect } from 'react';
import StatCard from '../components/StatCard';
import RevenueChart from '../components/RevenueChart';
import RecentOrdersTable from '../components/RecentOrdersTable';
import { dashboardService } from '../services/api';
import { ChevronDown, Calendar } from 'lucide-react';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, chartRes, ordersRes] = await Promise.all([
          dashboardService.getStats(),
          dashboardService.getChart(),
          dashboardService.getRecentOrders(),
        ]);
        setStats(statsRes.data);
        setChartData(chartRes.data);
        setOrders(ordersRes.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center h-full text-2xl font-bold animate-pulse">Đang tải dữ liệu...</div>;
  }

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <h2 className="text-4xl font-black italic uppercase tracking-tighter text-black">Doanh thu</h2>
        
        <div className="flex items-center space-x-4">
           <button className="px-6 py-2 bg-white border border-gray-200 rounded-lg font-black italic uppercase tracking-tighter shadow-sm hover:bg-gray-50 transition-colors">Hôm nay</button>
           <button className="px-6 py-2 bg-white border border-gray-200 rounded-lg font-black italic uppercase tracking-tighter shadow-sm hover:bg-gray-50 transition-colors">7 ngày</button>
           
           <div className="flex items-center space-x-2 ml-4">
              <span className="text-sm font-bold text-gray-500 italic uppercase">Từ ngày</span>
              <div className="flex items-center space-x-1">
                 <input type="text" value="20" readOnly className="w-10 py-1 bg-white border border-gray-200 rounded text-center font-bold text-sm" />
                 <input type="text" value="01" readOnly className="w-10 py-1 bg-white border border-gray-200 rounded text-center font-bold text-sm" />
                 <input type="text" value="2026" readOnly className="w-14 py-1 bg-white border border-gray-200 rounded text-center font-bold text-sm" />
              </div>
           </div>

           <div className="flex items-center space-x-2">
              <span className="text-sm font-bold text-gray-500 italic uppercase">Đến ngày</span>
              <div className="flex items-center space-x-1">
                 <input type="text" value="25" readOnly className="w-10 py-1 bg-white border border-gray-200 rounded text-center font-bold text-sm" />
                 <input type="text" value="11" readOnly className="w-10 py-1 bg-white border border-gray-200 rounded text-center font-bold text-sm" />
                 <input type="text" value="2026" readOnly className="w-14 py-1 bg-white border border-gray-200 rounded text-center font-bold text-sm" />
              </div>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <StatCard 
          title="Tổng doanh thu" 
          value={`${stats?.totalRevenue?.value.toLocaleString()}₫`} 
          growth={`+${stats?.totalRevenue?.growth}%`}
          icon="dollar"
        />
        <StatCard 
          title="Tổng đơn hàng" 
          value={stats?.totalOrders?.value.toLocaleString()} 
          growth={`^ ${stats?.totalOrders?.growth}%`}
          icon="bag"
          color="blue"
        />
        <StatCard 
          title="Sản phẩm đã bán" 
          value={stats?.productsSold?.value.toLocaleString()} 
          growth={`^ +${stats?.productsSold?.growth}%`}
          icon="package"
          color="red"
        />
      </div>

      <div className="grid grid-cols-1 gap-8">
         <RevenueChart data={chartData} />
         <RecentOrdersTable orders={orders} />
      </div>
    </div>
  );
};

export default Dashboard;
