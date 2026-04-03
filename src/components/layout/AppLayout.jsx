import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

export default function AppLayout() {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-[#F1F3F4]">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6 shadow-inner">
          <div className="bg-white rounded-md shadow-sm border border-gray-200 min-h-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
