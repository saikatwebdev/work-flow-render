import React, { useState } from 'react';
import { Settings, User, Mail, Phone, Shield, Trash2, Eye, EyeOff, Save, AlertTriangle, CheckCircle, X } from 'lucide-react';

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState('');
  
  // User data state
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1234567890',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Verification states
  const [emailVerification, setEmailVerification] = useState({
    isVerified: true,
    isVerifying: false,
    code: ''
  });
  
  const [phoneVerification, setPhoneVerification] = useState({
    isVerified: false,
    isVerifying: false,
    code: ''
  });

  // Delete account state
  const [deleteConfirmation, setDeleteConfirmation] = useState({
    password: '',
    confirmText: '',
    isDeleting: false
  });

  const handleInputChange = (field, value) => {
    setUserData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const sendEmailVerification = () => {
    setEmailVerification(prev => ({ ...prev, isVerifying: true }));
    // Simulate API call
    setTimeout(() => {
      setEmailVerification(prev => ({ ...prev, isVerifying: false }));
      setShowSuccessMessage('Verification code sent to your email!');
      setTimeout(() => setShowSuccessMessage(''), 3000);
    }, 1500);
  };

  const sendPhoneVerification = () => {
    setPhoneVerification(prev => ({ ...prev, isVerifying: true }));
    // Simulate API call
    setTimeout(() => {
      setPhoneVerification(prev => ({ ...prev, isVerifying: false }));
      setShowSuccessMessage('Verification code sent to your phone!');
      setTimeout(() => setShowSuccessMessage(''), 3000);
    }, 1500);
  };

  const verifyEmail = () => {
    if (emailVerification.code === '123456') {
      setEmailVerification(prev => ({ ...prev, isVerified: true, code: '' }));
      setShowSuccessMessage('Email verified successfully!');
      setTimeout(() => setShowSuccessMessage(''), 3000);
    } else {
      alert('Invalid verification code. Try 123456 for demo.');
    }
  };

  const verifyPhone = () => {
    if (phoneVerification.code === '123456') {
      setPhoneVerification(prev => ({ ...prev, isVerified: true, code: '' }));
      setShowSuccessMessage('Phone verified successfully!');
      setTimeout(() => setShowSuccessMessage(''), 3000);
    } else {
      alert('Invalid verification code. Try 123456 for demo.');
    }
  };

  const saveProfile = () => {
    // Validate passwords if changing
    if (userData.newPassword) {
      if (userData.newPassword !== userData.confirmPassword) {
        alert('New passwords do not match!');
        return;
      }
      if (userData.newPassword.length < 8) {
        alert('Password must be at least 8 characters long!');
        return;
      }
    }

    // Simulate API call
    setShowSuccessMessage('Profile updated successfully!');
    setTimeout(() => setShowSuccessMessage(''), 3000);
    
    // Clear password fields
    setUserData(prev => ({
      ...prev,
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }));
  };

  const deleteAccount = () => {
    if (deleteConfirmation.password !== 'password123') {
      alert('Incorrect password. Use "password123" for demo.');
      return;
    }
    
    if (deleteConfirmation.confirmText !== 'DELETE MY ACCOUNT') {
      alert('Please type "DELETE MY ACCOUNT" to confirm.');
      return;
    }

    setDeleteConfirmation(prev => ({ ...prev, isDeleting: true }));
    
    // Simulate API call
    setTimeout(() => {
      alert('Account deleted successfully. You will be logged out.');
      setShowDeleteModal(false);
      setDeleteConfirmation({ password: '', confirmText: '', isDeleting: false });
    }, 2000);
  };

  const TabButton = ({ id, label, icon: Icon }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
        activeTab === id
          ? 'bg-blue-100 text-blue-700'
          : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
      }`}
    >
      <Icon className="h-4 w-4 mr-2" />
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Settings className="h-8 w-8 text-blue-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">Account Settings</h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Manage your account information, security settings, and preferences.
          </p>
        </div>

        {/* Success Message */}
        {showSuccessMessage && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
              <p className="text-green-800">{showSuccessMessage}</p>
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Tab Navigation */}
          <div className="border-b border-gray-200 px-6 py-4">
            <div className="flex space-x-2">
              <TabButton id="profile" label="Profile" icon={User} />
              <TabButton id="security" label="Security" icon={Shield} />
              <TabButton id="danger" label="Danger Zone" icon={AlertTriangle} />
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Profile Information</h2>
                
                {/* Name Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={userData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Email Field with Verification */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <div className="flex items-center space-x-3">
                    <div className="flex-1 relative">
                      <input
                        type="email"
                        value={userData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                      />
                      <div className="absolute right-3 top-2.5">
                        {emailVerification.isVerified ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : (
                          <Mail className="h-5 w-5 text-gray-400" />
                        )}
                      </div>
                    </div>
                    {!emailVerification.isVerified && (
                      <button
                        onClick={sendEmailVerification}
                        disabled={emailVerification.isVerifying}
                        className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 disabled:opacity-50"
                      >
                        {emailVerification.isVerifying ? 'Sending...' : 'Verify'}
                      </button>
                    )}
                  </div>
                  
                  {emailVerification.isVerifying === false && !emailVerification.isVerified && (
                    <div className="mt-2 flex items-center space-x-2">
                      <input
                        type="text"
                        placeholder="Enter verification code"
                        value={emailVerification.code}
                        onChange={(e) => setEmailVerification(prev => ({ ...prev, code: e.target.value }))}
                        className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        onClick={verifyEmail}
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                      >
                        Verify
                      </button>
                    </div>
                  )}
                </div>

                {/* Phone Field with Verification */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <div className="flex items-center space-x-3">
                    <div className="flex-1 relative">
                      <input
                        type="tel"
                        value={userData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                      />
                      <div className="absolute right-3 top-2.5">
                        {phoneVerification.isVerified ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : (
                          <Phone className="h-5 w-5 text-gray-400" />
                        )}
                      </div>
                    </div>
                    {!phoneVerification.isVerified && (
                      <button
                        onClick={sendPhoneVerification}
                        disabled={phoneVerification.isVerifying}
                        className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 disabled:opacity-50"
                      >
                        {phoneVerification.isVerifying ? 'Sending...' : 'Verify'}
                      </button>
                    )}
                  </div>
                  
                  {phoneVerification.isVerifying === false && !phoneVerification.isVerified && (
                    <div className="mt-2 flex items-center space-x-2">
                      <input
                        type="text"
                        placeholder="Enter verification code"
                        value={phoneVerification.code}
                        onChange={(e) => setPhoneVerification(prev => ({ ...prev, code: e.target.value }))}
                        className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        onClick={verifyPhone}
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                      >
                        Verify
                      </button>
                    </div>
                  )}
                </div>

                <button
                  onClick={saveProfile}
                  className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  <Save className="h-5 w-5 mr-2" />
                  Save Changes
                </button>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Security Settings</h2>
                
                {/* Current Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={userData.currentPassword}
                      onChange={(e) => handleInputChange('currentPassword', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                      placeholder="Enter current password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                {/* New Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                  <input
                    type="password"
                    value={userData.newPassword}
                    onChange={(e) => handleInputChange('newPassword', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter new password"
                  />
                  <p className="text-sm text-gray-500 mt-1">Password must be at least 8 characters long</p>
                </div>

                {/* Confirm New Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                  <input
                    type="password"
                    value={userData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Confirm new password"
                  />
                </div>

                <button
                  onClick={saveProfile}
                  className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  <Save className="h-5 w-5 mr-2" />
                  Update Password
                </button>
              </div>
            )}

            {/* Danger Zone Tab */}
            {activeTab === 'danger' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-red-600 mb-4">Danger Zone</h2>
                
                <div className="border border-red-200 rounded-lg p-6 bg-red-50">
                  <div className="flex items-start">
                    <AlertTriangle className="h-6 w-6 text-red-500 mr-3 mt-1" />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-red-800 mb-2">Delete Account</h3>
                      <p className="text-red-700 mb-4">
                        Once you delete your account, there is no going back. This action cannot be undone.
                        All your data, contacts, and automation campaigns will be permanently removed.
                      </p>
                      <ul className="text-sm text-red-600 mb-4 space-y-1">
                        <li>• All contact lists will be deleted</li>
                        <li>• Automation campaigns will be stopped and removed</li>
                        <li>• Account settings and preferences will be lost</li>
                        <li>• This action is irreversible</li>
                      </ul>
                      <button
                        onClick={() => setShowDeleteModal(true)}
                        className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Account
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Delete Account Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-red-600">Confirm Account Deletion</h3>
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="space-y-4">
                <p className="text-gray-700">
                  This action cannot be undone. Please confirm by entering your password and typing 
                  <strong> "DELETE MY ACCOUNT"</strong> below.
                </p>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                  <input
                    type="password"
                    value={deleteConfirmation.password}
                    onChange={(e) => setDeleteConfirmation(prev => ({...prev, password: e.target.value}))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Enter your password"
                  />
                  <p className="text-xs text-gray-500 mt-1">Use "password123" for demo</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Type "DELETE MY ACCOUNT" to confirm
                  </label>
                  <input
                    type="text"
                    value={deleteConfirmation.confirmText}
                    onChange={(e) => setDeleteConfirmation(prev => ({...prev, confirmText: e.target.value}))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="DELETE MY ACCOUNT"
                  />
                </div>
                
                <div className="flex space-x-3 pt-4">
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={deleteAccount}
                    disabled={deleteConfirmation.isDeleting}
                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                  >
                    {deleteConfirmation.isDeleting ? 'Deleting...' : 'Delete Account'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsPage;