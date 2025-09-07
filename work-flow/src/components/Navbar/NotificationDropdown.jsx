import React, { useState, useRef, useEffect } from 'react';
import { Bell, Check, AlertCircle, Info, CheckCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const NotificationDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'success',
      title: 'AI Training Complete',
      message: 'Your AI model has been successfully trained with 150 Q&A pairs.',
      time: '5 minutes ago',
      read: false
    },
    {
      id: 2,
      type: 'info',
      title: 'New Integration Available',
      message: 'WhatsApp Business API integration is now available in your plan.',
      time: '2 hours ago',
      read: false
    },
    {
      id: 3,
      type: 'warning',
      title: 'Usage Limit Warning',
      message: 'You have used 80% of your monthly message quota.',
      time: '1 day ago',
      read: true
    },
    {
      id: 4,
      type: 'success',
      title: 'Report Generated',
      message: 'Your monthly sales report is ready for download.',
      time: '2 days ago',
      read: true
    },
    {
      id: 5,
      type: 'info',
      title: 'System Update',
      message: 'Platform maintenance scheduled for Sunday 2:00 AM - 4:00 AM UTC.',
      time: '3 days ago',
      read: true
    }
  ]);

  const dropdownRef = useRef(null);
  const unreadCount = notifications.filter(n => !n.read).length;

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

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const clearNotification = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5" style={{ color: '#1F7D53' }} />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case 'info':
        return <Info className="w-5 h-5" style={{ color: '#255F38' }} />;
      default:
        return <Bell className="w-5 h-5 text-gray-400" />;
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Notification Button */}
      <button
        onClick={toggleDropdown}
        className="relative p-2 rounded-lg transition-colors"
        style={{ backgroundColor: 'transparent' }}
        onMouseEnter={(e) => e.target.style.backgroundColor = '#255F38'}
        onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
        aria-label="Notifications"
      >
        <Bell className="w-5 h-5 text-white" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute right-0 mt-2 w-96 rounded-lg shadow-xl z-50 overflow-hidden"
            style={{ 
              backgroundColor: '#000000',
              border: '1px solid #255F38'
            }}
          >
            {/* Header */}
            <div className="px-4 py-3 flex items-center justify-between" style={{ borderBottom: '1px solid #255F38' }}>
              <h3 className="text-lg font-semibold text-white">Notifications</h3>
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-sm"
                  style={{ color: '#1F7D53' }}
                  onMouseEnter={(e) => e.target.style.color = '#ffffff'}
                  onMouseLeave={(e) => e.target.style.color = '#1F7D53'}
                >
                  Mark all as read
                </button>
              )}
            </div>

            {/* Notifications List */}
            <div className="max-h-96 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-8 text-center">
                  <Bell className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                  <p className="text-gray-400">No notifications yet</p>
                </div>
              ) : (
                <div>
                  {notifications.map((notification, index) => (
                    <div
                      key={notification.id}
                      className={`p-4 transition-colors cursor-pointer ${
                        !notification.read ? 'opacity-100' : 'opacity-80'
                      }`}
                      style={{ 
                        backgroundColor: !notification.read ? '#255F38' : 'transparent',
                        borderBottom: index < notifications.length - 1 ? '1px solid #255F38' : 'none'
                      }}
                      onMouseEnter={(e) => {
                        if (notification.read) {
                          e.target.style.backgroundColor = '#255F38';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (notification.read) {
                          e.target.style.backgroundColor = 'transparent';
                        }
                      }}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 mt-0.5">
                          {getIcon(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <p className="text-sm font-medium text-white">
                                {notification.title}
                              </p>
                              <p className="text-sm text-gray-300 mt-0.5">
                                {notification.message}
                              </p>
                              <p className="text-xs text-gray-400 mt-1">
                                {notification.time}
                              </p>
                            </div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                clearNotification(notification.id);
                              }}
                              className="ml-2 p-1 rounded transition-colors"
                              style={{ backgroundColor: 'transparent' }}
                              onMouseEnter={(e) => e.target.style.backgroundColor = '#1F7D53'}
                              onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                            >
                              <X className="w-4 h-4 text-gray-400" />
                            </button>
                          </div>
                        </div>
                        {!notification.read && (
                          <div className="w-2 h-2 rounded-full flex-shrink-0 mt-2" style={{ backgroundColor: '#1F7D53' }}></div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {notifications.length > 0 && (
              <div className="px-4 py-3" style={{ borderTop: '1px solid #255F38' }}>
                <button 
                  className="text-sm font-medium"
                  style={{ color: '#1F7D53' }}
                  onMouseEnter={(e) => e.target.style.color = '#ffffff'}
                  onMouseLeave={(e) => e.target.style.color = '#1F7D53'}
                >
                  View all notifications
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationDropdown;