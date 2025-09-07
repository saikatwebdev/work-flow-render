import React from "react";
import { Menu } from "lucide-react";
import UserDropdown from "./UserDropdown";
import NotificationDropdown from "./NotificationDropdown";

const Navbar = ({ onToggleSidebar }) => {
  return (
    <header className="bg-black shadow-sm sticky top-0 z-10" style={{ backgroundColor: '#000000' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-2 rounded-lg text-white"
            style={{ 
              backgroundColor: 'transparent',
              ':hover': { backgroundColor: '#255F38' }
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#255F38'}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
          >
            <Menu className="w-5 h-5" style={{ color: '#ffffff' }} />
          </button>
          {/* Left side - Empty div to maintain layout */}
          <div className="flex-1 flex items-center">
            {/* Search bar removed */}
          </div>

          {/* Right side - Notifications and User */}
          <div className="flex items-center space-x-4">
            <NotificationDropdown />

            {/* User Dropdown */}
            <UserDropdown />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;