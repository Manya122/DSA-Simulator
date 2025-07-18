// src/layouts/MainLayout.jsx
import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { Menu } from 'lucide-react';

export default function MainLayout() {
  const [collapsed, setCollapsed] = useState(() =>
    JSON.parse(localStorage.getItem('sidebarCollapsed')) ?? true
  );
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024); // lg breakpoint

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    localStorage.setItem('sidebarCollapsed', JSON.stringify(collapsed));
  }, [collapsed]);

  return (
    <div className="flex h-screen bg-gray-900 text-white transition-colors duration-300">
      {/* Sidebar */}
      {(!isMobile || !collapsed) && (
        <Sidebar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          isMobile={isMobile}
        />
      )}

      {/* Main */}
      <main className="flex-1 p-4 overflow-y-auto">
        {isMobile && (
          <button
            className="mb-4 text-gray-300 hover:text-white"
            onClick={() => setCollapsed((prev) => !prev)}
          >
            <Menu size={24} />
          </button>
        )}
        <Outlet />
      </main>
    </div>
  );
}
