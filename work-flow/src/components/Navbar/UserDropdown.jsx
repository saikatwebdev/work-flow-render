import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Settings, LogOut, Edit, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SignOutModal from '../SignOutModal';

const UserDropdown = ({ user, onSignOut }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSignOutModal, setShowSignOutModal] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Sample user data - in a real app, this would come from props or context
  const userData = user || {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    avatar: null
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSignOutClick = () => {
    setIsOpen(false); // Close dropdown first
    setShowSignOutModal(true); // Then show modal
  };

  const handleConfirmSignOut = () => {
    setShowSignOutModal(false);
    
    // Call parent's sign out function if provided
    if (onSignOut) {
      onSignOut();
    }
    
    // Navigate to landing page
    navigate('/');
  };

  const handleCancelSignOut = () => {
    setShowSignOutModal(false);
  };

  const handleEditProfile = () => {
    setIsOpen(false);
    navigate('/editprofile')
  };

  const handleSettings = () => {
     setIsOpen(false);
     navigate('/settings')
  };

  return (
    <>
      <div className="relative" ref={dropdownRef}>
        {/* User Button */}
        <button
          onClick={toggleDropdown}
          className="flex items-center space-x-2 focus:outline-none"
          aria-haspopup="true"
          aria-expanded={isOpen}
        >
          <div className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden" style={{ backgroundColor: '#255F38' }}>
            {userData.avatar ? (
              <img src={userData.avatar} alt={userData.name} className="w-full h-full object-cover" />
            ) : (
              <User className="w-5 h-5 text-white" />
            )}
          </div>
          <ChevronDown 
            className={`w-4 h-4 text-white transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`} 
          />
        </button>

        {/* Dropdown Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
              className="absolute right-0 mt-2 w-72 rounded-lg shadow-xl z-50 overflow-hidden"
              style={{ 
                backgroundColor: '#000000',
                border: '1px solid #255F38'
              }}
            >
              {/* User Info Section */}
              <div className="p-4" style={{ borderBottom: '1px solid #255F38' }}>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#1F7D53' }}>
                    {userData.avatar ? (
                      <img src={userData.avatar} alt={userData.name} className="w-full h-full object-cover rounded-full" />
                    ) : (
                      <User className="w-6 h-6 text-white" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-medium text-white truncate">{userData.name}</h3>
                    <p className="text-sm text-gray-300 truncate">{userData.email}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{userData.phone}</p>
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <div className="py-1">
                <button
                  onClick={handleEditProfile}
                  className="w-full px-4 py-2.5 text-sm text-white flex items-center space-x-3 transition-colors"
                  style={{ backgroundColor: 'transparent' }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#255F38'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                >
                  <Edit className="w-4 h-4 text-gray-400" />
                  <span>Edit Profile</span>
                </button>
                
                <button
                  onClick={handleSettings}
                  className="w-full px-4 py-2.5 text-sm text-white flex items-center space-x-3 transition-colors"
                  style={{ backgroundColor: 'transparent' }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#255F38'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                >
                  <Settings className="w-4 h-4 text-gray-400" />
                  <span>Settings</span>
                </button>

                <div className="my-1" style={{ borderTop: '1px solid #255F38' }}></div>
                
                <button
                  onClick={handleSignOutClick}
                  className="w-full px-4 py-2.5 text-sm text-red-400 flex items-center space-x-3 transition-colors"
                  style={{ backgroundColor: 'transparent' }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#dc2626';
                    e.target.style.color = '#ffffff';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.color = '#f87171';
                  }}
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign out</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Sign Out Modal */}
      <SignOutModal
        isOpen={showSignOutModal}
        onConfirm={handleConfirmSignOut}
        onCancel={handleCancelSignOut}
      />
    </>
  );
};

export default UserDropdown;