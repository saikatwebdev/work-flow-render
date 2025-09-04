import React, { useState, useCallback } from 'react';
import { User, Camera, Upload, Save, X, MapPin, Calendar, Briefcase, Globe, Github, Linkedin, Twitter, Instagram, Mail, Phone, CheckCircle, AlertCircle } from 'lucide-react';

const EditProfilePage = () => {
  const [profileData, setProfileData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    username: 'johndoe',
    email: 'john.doe@example.com',
    phone: '+1234567890',
    bio: 'Digital marketing enthusiast and automation specialist. Love creating efficient workflows and connecting with people.',
    location: 'New York, USA',
    website: 'https://johndoe.com',
    company: 'Tech Solutions Inc.',
    jobTitle: 'Marketing Manager',
    dateOfBirth: '1990-05-15',
    gender: 'male',
    timeZone: 'America/New_York',
    language: 'en',
    githubUsername: 'johndoe',
    linkedinUsername: 'john-doe',
    twitterUsername: 'johndoe',
    instagramUsername: 'johndoe',
    emailNotifications: true,
    smsNotifications: false,
    marketingEmails: true,
    profileVisibility: 'public'
  });

  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face');
  const [isUploading, setIsUploading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [activeSection, setActiveSection] = useState('basic');

  const handleInputChange = useCallback((field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: null
      }));
    }
  }, [errors]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, image: 'Image size should be less than 5MB' }));
        return;
      }
      
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({ ...prev, image: 'Please upload a valid image file' }));
        return;
      }

      setProfileImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
      setErrors(prev => ({ ...prev, image: null }));
    }
  };

  const removeImage = () => {
    setProfileImage(null);
    setImagePreview('https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face');
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!profileData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!profileData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!profileData.username.trim()) newErrors.username = 'Username is required';
    if (profileData.username.length < 3) newErrors.username = 'Username must be at least 3 characters';
    if (!profileData.email.trim()) newErrors.email = 'Email is required';
    if (!/\S+@\S+\.\S+/.test(profileData.email)) newErrors.email = 'Email is invalid';
    if (profileData.bio.length > 500) newErrors.bio = 'Bio must be less than 500 characters';
    if (profileData.website && !/^https?:\/\/.+/.test(profileData.website)) {
      newErrors.website = 'Website must be a valid URL (include http:// or https://)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const saveProfile = async () => {
    if (!validateForm()) return;

    setIsUploading(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      
      console.log('Profile data to save:', profileData);
      if (profileImage) {
        console.log('Profile image to upload:', profileImage);
      }
    } catch (error) {
      setErrors(prev => ({ ...prev, general: 'Failed to save profile. Please try again.' }));
    } finally {
      setIsUploading(false);
    }
  };

  const SectionButton = ({ id, label, icon: Icon }) => (
    <button
      onClick={() => setActiveSection(id)}
      className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors w-full ${
        activeSection === id
          ? 'bg-gray-700 text-white shadow-md border border-gray-600'
          : 'text-gray-400 hover:text-white hover:bg-black'
      }`}
    >
      <Icon className="h-4 w-4 mr-3" />
      {label}
    </button>
  );

  const InputField = React.memo(({ label, field, type = 'text', placeholder, error, ...props }) => (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-2">{label}</label>
      <input
        type={type}
        value={profileData[field] || ''}
        onChange={(e) => handleInputChange(field, e.target.value)}
        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-black text-white placeholder-gray-500 ${
          error ? 'border-red-500' : 'border-gray-700'
        }`}
        placeholder={placeholder}
        {...props}
      />
      {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
    </div>
  ));

  return (
    <div className="min-h-screen bg-black py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <User className="h-8 w-8 text-gray-300 mr-3" />
            <h1 className="text-3xl font-bold text-white">Edit Profile</h1>
          </div>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Update your profile information and customize your public presence.
          </p>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className="mb-6 p-4 bg-black border border-gray-700 rounded-lg shadow-lg">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
              <p className="text-gray-300">Profile updated successfully!</p>
            </div>
          </div>
        )}

        {/* Error Message */}
        {errors.general && (
          <div className="mb-6 p-4 bg-black border border-gray-700 rounded-lg shadow-lg">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
              <p className="text-gray-300">{errors.general}</p>
            </div>
          </div>
        )}

        <div className="bg-black rounded-lg shadow-2xl overflow-hidden border border-gray-800">
          <div className="flex flex-col md:flex-row">
            {/* Sidebar Navigation */}
            <div className="w-full md:w-64 bg-black p-6 border-b md:border-b-0 md:border-r border-gray-800">
              <div className="space-y-2">
                <SectionButton id="basic" label="Basic Info" icon={User} />
                <SectionButton id="contact" label="Contact" icon={Mail} />
                <SectionButton id="social" label="Social Media" icon={Globe} />
                <SectionButton id="preferences" label="Preferences" icon={User} />
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6">
              {/* Profile Picture Section */}
              <div className="mb-8 text-center">
                <div className="relative inline-block">
                  <div className="w-32 h-32 rounded-full overflow-hidden bg-black border-4 border-gray-700 shadow-xl">
                    <img 
                      src={imagePreview} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <label className="absolute bottom-0 right-0 bg-black text-white p-2 rounded-full cursor-pointer hover:bg-gray-700 transition-colors border border-gray-600 shadow-md">
                    <Camera className="h-4 w-4" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>
                {profileImage && (
                  <button
                    onClick={removeImage}
                    className="mt-2 text-sm text-gray-400 hover:text-gray-300"
                  >
                    Remove Photo
                  </button>
                )}
                {errors.image && (
                  <p className="text-red-400 text-sm mt-2">{errors.image}</p>
                )}
              </div>

              {/* Basic Info Section */}
              {activeSection === 'basic' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-white mb-4">Basic Information</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField
                      label="First Name"
                      field="firstName"
                      placeholder="Enter your first name"
                      error={errors.firstName}
                    />
                    
                    <InputField
                      label="Last Name"
                      field="lastName"
                      placeholder="Enter your last name"
                      error={errors.lastName}
                    />
                  </div>

                  <InputField
                    label="Username"
                    field="username"
                    placeholder="Choose a unique username"
                    error={errors.username}
                  />

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Bio</label>
                    <textarea
                      value={profileData.bio}
                      onChange={(e) => handleInputChange('bio', e.target.value)}
                      rows={4}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-black text-white placeholder-gray-500 ${
                        errors.bio ? 'border-red-500' : 'border-gray-700'
                      }`}
                      placeholder="Tell us about yourself..."
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      {profileData.bio.length}/500 characters
                    </p>
                    {errors.bio && <p className="text-red-400 text-sm mt-1">{errors.bio}</p>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Gender</label>
                      <select
                        value={profileData.gender}
                        onChange={(e) => handleInputChange('gender', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-black text-white"
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                        <option value="prefer-not-to-say">Prefer not to say</option>
                      </select>
                    </div>

                    <InputField
                      label="Date of Birth"
                      field="dateOfBirth"
                      type="date"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField
                      label="Company"
                      field="company"
                      placeholder="Your company name"
                    />
                    
                    <InputField
                      label="Job Title"
                      field="jobTitle"
                      placeholder="Your job title"
                    />
                  </div>

                  <InputField
                    label="Location"
                    field="location"
                    placeholder="City, Country"
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Time Zone</label>
                      <select
                        value={profileData.timeZone}
                        onChange={(e) => handleInputChange('timeZone', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-black text-white"
                      >
                        <option value="America/New_York">Eastern Time (ET)</option>
                        <option value="America/Chicago">Central Time (CT)</option>
                        <option value="America/Denver">Mountain Time (MT)</option>
                        <option value="America/Los_Angeles">Pacific Time (PT)</option>
                        <option value="Europe/London">London (GMT)</option>
                        <option value="Europe/Paris">Paris (CET)</option>
                        <option value="Asia/Tokyo">Tokyo (JST)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Language</label>
                      <select
                        value={profileData.language}
                        onChange={(e) => handleInputChange('language', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-black text-white"
                      >
                        <option value="en">English</option>
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                        <option value="de">German</option>
                        <option value="it">Italian</option>
                        <option value="pt">Portuguese</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Contact Section */}
              {activeSection === 'contact' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-white mb-4">Contact Information</h2>
                  
                  <InputField
                    label="Email Address"
                    field="email"
                    type="email"
                    placeholder="your.email@example.com"
                    error={errors.email}
                  />

                  <InputField
                    label="Phone Number"
                    field="phone"
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                  />

                  <InputField
                    label="Website"
                    field="website"
                    type="url"
                    placeholder="https://yourwebsite.com"
                    error={errors.website}
                  />
                </div>
              )}

              {/* Social Media Section */}
              {activeSection === 'social' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-white mb-4">Social Media Links</h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Github className="h-5 w-5 text-gray-400" />
                      <div className="flex-1">
                        <input
                          type="text"
                          value={profileData.githubUsername}
                          onChange={(e) => handleInputChange('githubUsername', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-black text-white placeholder-gray-500"
                          placeholder="GitHub username"
                        />
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Linkedin className="h-5 w-5 text-gray-400" />
                      <div className="flex-1">
                        <input
                          type="text"
                          value={profileData.linkedinUsername}
                          onChange={(e) => handleInputChange('linkedinUsername', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-black text-white placeholder-gray-500"
                          placeholder="LinkedIn username"
                        />
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Twitter className="h-5 w-5 text-gray-400" />
                      <div className="flex-1">
                        <input
                          type="text"
                          value={profileData.twitterUsername}
                          onChange={(e) => handleInputChange('twitterUsername', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-black text-white placeholder-gray-500"
                          placeholder="Twitter username"
                        />
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Instagram className="h-5 w-5 text-gray-400" />
                      <div className="flex-1">
                        <input
                          type="text"
                          value={profileData.instagramUsername}
                          onChange={(e) => handleInputChange('instagramUsername', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-black text-white placeholder-gray-500"
                          placeholder="Instagram username"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Preferences Section */}
              {activeSection === 'preferences' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-white mb-4">Preferences</h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-black rounded-lg border border-gray-700 shadow-sm">
                      <div>
                        <h3 className="font-medium text-white">Email Notifications</h3>
                        <p className="text-sm text-gray-400">Receive notifications via email</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={profileData.emailNotifications}
                          onChange={(e) => handleInputChange('emailNotifications', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-black rounded-lg border border-gray-700 shadow-sm">
                      <div>
                        <h3 className="font-medium text-white">SMS Notifications</h3>
                        <p className="text-sm text-gray-400">Receive notifications via SMS</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={profileData.smsNotifications}
                          onChange={(e) => handleInputChange('smsNotifications', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-black rounded-lg border border-gray-700 shadow-sm">
                      <div>
                        <h3 className="font-medium text-white">Marketing Emails</h3>
                        <p className="text-sm text-gray-400">Receive promotional content and updates</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={profileData.marketingEmails}
                          onChange={(e) => handleInputChange('marketingEmails', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black-600"></div>
                      </label>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Profile Visibility</label>
                      <select
                        value={profileData.profileVisibility}
                        onChange={(e) => handleInputChange('profileVisibility', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-black text-white"
                      >
                        <option value="public">Public - Anyone can see your profile</option>
                        <option value="private">Private - Only you can see your profile</option>
                        <option value="connections">Connections - Only your connections can see</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Save Button */}
              <div className="mt-8 pt-6 border-t border-gray-800">
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => window.history.back()}
                    className="px-6 py-3 text-gray-300 bg-black rounded-lg hover:bg-gray-700 transition-colors font-medium border border-gray-700 shadow-sm"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={saveProfile}
                    disabled={isUploading}
                    className="flex items-center px-6 py-3 bg-black-600 text-white rounded-lg hover:bg-black-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                  >
                    {isUploading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="h-5 w-5 mr-2" />
                        Save Changes
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfilePage;