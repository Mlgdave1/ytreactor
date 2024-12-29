import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { DeployTimestamp } from './DeployTimestamp';
import { cn } from '../../utils/cn';

const navItems = [
  { path: '/pricing', label: 'Subscribe' },
  { path: '/templates', label: 'Templates' },
  { path: '/dashboard', label: 'Dashboard' },
  { path: '/admin', label: 'Admin', adminOnly: true }
];

export const Navbar: React.FC = () => {
  const location = useLocation();
  const isAdmin = true; // TODO: Replace with actual admin check

  return (
    <nav className="bg-[#0f0f0f] border-b border-[#272727]">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center">
              <div className="w-8 h-8 mr-2">
                <img 
                  src="https://imgur.com/5LjJnvO.jpg" 
                  alt="YTReactor Logo"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className="text-xl font-bold text-white">
                YouTube Reactor
              </div>
            </Link>
            <DeployTimestamp />
          </div>

          <div className="flex items-center gap-2">
            {navItems.map((item) => (
              (item.adminOnly && !isAdmin) ? null : (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "px-4 py-2 rounded-md font-medium transition-colors",
                    location.pathname === item.path
                      ? "bg-red-500 text-white"
                      : "text-gray-300 hover:bg-[#272727] hover:text-white"
                  )}
                >
                  {item.label}
                </Link>
              )
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};