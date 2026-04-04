import React from 'react';
import Sidebar from './layout/Sidebar';
import Header from './Header';

const Layout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-dashboard-bg text-black font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col ml-64">
        <Header />
        <main className="flex-1 p-10 mt-20 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
