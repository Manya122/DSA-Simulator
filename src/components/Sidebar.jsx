// src/components/Sidebar.jsx
import { NavLink, useLocation } from 'react-router-dom';
import { sidebarRoutes } from '../routes/sidebarRoutes';
import {
  ChevronDown,
  Menu,
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

export default function Sidebar({ collapsed, setCollapsed, isMobile }) {
  const location = useLocation();
  const [openGroups, setOpenGroups] = useState(() =>
    JSON.parse(localStorage.getItem('openGroups')) || {}
  );
  const sidebarRef = useRef();

  useEffect(() => {
    localStorage.setItem('openGroups', JSON.stringify(openGroups));
  }, [openGroups]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMobile &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target)
      ) {
        setCollapsed(true);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobile, setCollapsed]);

  useEffect(() => {
    const handleKeyToggle = (e) => {
      if (e.ctrlKey && e.key === 'b') {
        setCollapsed((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyToggle);
    return () => window.removeEventListener('keydown', handleKeyToggle);
  }, [setCollapsed]);

  const toggleGroup = (category) => {
    setOpenGroups((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const linkClass = ({ isActive }) =>
    `group flex items-center gap-2 px-4 py-2 rounded hover:bg-blue-100 dark:hover:bg-blue-800 transition-all
    ${isActive ? 'bg-blue-200 dark:bg-blue-700 font-semibold' : ''}`;

  return (
    <div
      ref={sidebarRef}
      className={`h-full bg-white dark:bg-gray-900 shadow-md border-r dark:border-gray-700 p-2 
      flex flex-col transition-all duration-300
      ${collapsed ? 'w-16' : 'w-64'} 
      ${isMobile ? 'fixed inset-y-0 z-50' : ''}`}
    >
      {/* Logo / Toggle Button */}
      <div className="flex items-center justify-between px-2 mb-4">
        <button
          onClick={() => setCollapsed((prev) => !prev)}
          className="text-blue-600 dark:text-blue-400"
        >
          {collapsed ? <Menu size={22} /> : <h2 className="text-xl font-bold">DSA Simulator</h2>}
        </button>
        {!collapsed && (
          <button
            className="text-gray-500 hover:text-blue-500"
            onClick={() => setCollapsed((prev) => !prev)}
          >
            <ChevronDown size={18} />
          </button>
        )}
      </div>

      {/* Nav Links */}
      <nav className="space-y-2 overflow-y-auto flex-1">
        {sidebarRoutes.map((group) => (
          <div key={group.category}>
            {!collapsed && (
              <button
                className="w-full text-left text-xs font-bold uppercase px-4 py-2 text-gray-500 dark:text-gray-400 hover:text-blue-500"
                onClick={() => toggleGroup(group.category)}
              >
                {group.category}
              </button>
            )}
            {(!collapsed && openGroups[group.category]) || collapsed ? (
              <div className="space-y-1">
                {group.links.map((link) => {
                  const Icon = link.icon;
                  return (
                    <NavLink
                      key={link.path}
                      to={link.path}
                      className={linkClass}
                      title={collapsed ? link.name : ''}
                    >
                      <Icon size={18} />
                      {!collapsed && link.name}
                    </NavLink>
                  );
                })}
              </div>
            ) : null}
          </div>
        ))}
      </nav>
    </div>
  );
}
