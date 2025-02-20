
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import DashbordHeader from './DashbordHeader';
import Greeting from './Greeting'; // Import the Greeting component
import "../Dashbord/adminlayout.css";

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className={`admin-layout ${collapsed ? 'collapsed' : ''}`}>
      <Sidebar collapsed={collapsed} toggleSidebar={toggleSidebar} />
      <div className={`main-content ${collapsed ? 'collapsed' : ''}`}>
        <DashbordHeader collapsed ={collapsed} />
        <div className="greeting-container">
          <Greeting />
        </div>
        <main>
          <Outlet /> 
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
