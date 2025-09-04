import React, { useState, useCallback } from 'react';
import {
  User,
  Camera,
  Save,
  X,
  Mail,
  Globe,
  CheckCircle,
  AlertCircle,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Sliders,
  Info,
} from 'lucide-react';

const EditProfileModal = () => {
  const [isOpen, setIsOpen] = useState(false);
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
    profileVisibility: 'public',
  });

  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  );
  const [isUploading, setIsUploading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [activeSection, setActiveSection] = useState('basic');

  const handleInputChange = useCallback(
    (field, value) => {
      setProfileData((prev) => ({
        ...prev,
        [field]: value,
      }));

      if (errors[field]) {
        setErrors((prev) => ({
          ...prev,
          [field]: null,
        }));
      }
    },
    [errors]
  );

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          image: 'Image size should be less than 5MB',
        }));
        return;
      }

      if (!file.type.startsWith('image/')) {
        setErrors((prev) => ({
          ...prev,
          image: 'Please upload a valid image file',
        }));
        return;
      }

      setProfileImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
      setErrors((prev) => ({ ...prev, image: null }));
    }
  };

  const removeImage = () => {
    setProfileImage(null);
    setImagePreview(
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    );
  };

  const validateForm = () => {
    const newErrors = {};

    if (!profileData.firstName.trim())
      newErrors.firstName = 'First name is required';
    if (!profileData.lastName.trim())
      newErrors.lastName = 'Last name is required';
    if (!profileData.username.trim())
      newErrors.username = 'Username is required';
    if (profileData.username.length < 3)
      newErrors.username = 'Username must be at least 3 characters';
    if (!profileData.email.trim()) newErrors.email = 'Email is required';
    if (!/\S+@\S+\.\S+/.test(profileData.email))
      newErrors.email = 'Email is invalid';
    if (profileData.bio.length > 500)
      newErrors.bio = 'Bio must be less than 500 characters';
    if (
      profileData.website &&
      !/^https?:\/\/.+/.test(profileData.website)
    ) {
      newErrors.website =
        'Website must be a valid URL (include http:// or https://)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const saveProfile = async () => {
    if (!validateForm()) return;

    setIsUploading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setIsOpen(false);
      }, 2000);

      console.log('Profile data to save:', profileData);
      if (profileImage) {
        console.log('Profile image to upload:', profileImage);
      }
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        general: 'Failed to save profile. Please try again.',
      }));
    } finally {
      setIsUploading(false);
    }
  };

  const closeModal = () => {
    setIsOpen(false);
    setActiveSection('basic');
    setErrors({});
    setShowSuccess(false);
  };

  const SectionButton = ({ id, label, icon: Icon }) => (
    <button
      onClick={() => setActiveSection(id)}
      className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors w-full ${
        activeSection === id
          ? 'bg-blue-100 text-blue-700'
          : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
      }`}
    >
      <Icon className="h-4 w-4 mr-2" />
      {label}
    </button>
  );

  const InputField = ({
    label,
    field,
    type = 'text',
    placeholder,
    error,
    ...props
  }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <input
        type={type}
        value={profileData[field] || ''}
        onChange={(e) => handleInputChange(field, e.target.value)}
        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          error ? 'border-red-300' : 'border-gray-300'
        }`}
        placeholder={placeholder}
        {...props}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Background Page Content */}
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Dashboard</h1>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-900">
                  Total Users
                </h3>
                <p className="text-3xl font-bold text-blue-700">1,234</p>
              </div>
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-green-900">
                  Active Projects
                </h3>
                <p className="text-3xl font-bold text-green-700">56</p>
              </div>
              <div className="bg-purple-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-purple-900">
                  Revenue
                </h3>
                <p className="text-3xl font-bold text-purple-700">$12,456</p>
              </div>
            </div>

            {/* Profile Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800">
                Profile Settings
              </h2>
              <button
                onClick={() => setIsOpen(true)}
                className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                <User className="h-5 w-5 mr-2" />
                Edit Profile
              </button>
            </div>

            {/* Profile Card */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center space-x-4">
                <img
                  src={imagePreview}
                  alt="Profile"
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {profileData.firstName} {profileData.lastName}
                  </h3>
                  <p className="text-gray-600">@{profileData.username}</p>
                  <p className="text-sm text-gray-500">
                    {profileData.jobTitle} at {profileData.company}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Background Sample Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <p className="text-sm text-gray-600">
                    Updated profile information
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <p className="text-sm text-gray-600">
                    Completed project milestone
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <p className="text-sm text-gray-600">
                    Added new team member
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Completion Rate</span>
                  <span className="font-semibold">94%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tasks Completed</span>
                  <span className="font-semibold">127</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Team Members</span>
                  <span className="font-semibold">8</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-sm"
            onClick={closeModal}
          ></div>

          {/* Modal */}
          <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-white">
              <div className="flex items-center">
                <User className="h-6 w-6 text-blue-600 mr-3" />
                <h1 className="text-2xl font-bold text-gray-900">
                  Edit Profile
                </h1>
              </div>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            {/* Success */}
            {showSuccess && (
              <div className="mx-6 mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <p className="text-green-800">
                    Profile updated successfully!
                  </p>
                </div>
              </div>
            )}

            {/* Error */}
            {errors.general && (
              <div className="mx-6 mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center">
                  <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                  <p className="text-red-800">{errors.general}</p>
                </div>
              </div>
            )}

            {/* Body */}
            <div className="flex h-[calc(90vh-180px)]">
              {/* Sidebar */}
              <div className="w-56 bg-gray-50 p-4 border-r border-gray-200">
                <div className="space-y-1">
                  <SectionButton id="basic" label="Basic Info" icon={Info} />
                  <SectionButton
                    id="contact"
                    label="Contact"
                    icon={Mail}
                  />
                  <SectionButton
                    id="social"
                    label="Social Media"
                    icon={Globe}
                  />
                  <SectionButton
                    id="preferences"
                    label="Preferences"
                    icon={Sliders}
                  />
                </div>
              </div>

              {/* Main Section */}
              <div className="flex-1 overflow-y-auto">
                <div className="p-6">
                  {/* Avatar */}
                  <div className="mb-6 text-center">
                    <div className="relative inline-block">
                      <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 border-4 border-white shadow-lg">
                        <img
                          src={imagePreview}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <label className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700 transition-colors">
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
                        className="mt-2 text-sm text-red-600 hover:text-red-700"
                      >
                        Remove Photo
                      </button>
                    )}
                    {errors.image && (
                      <p className="text-red-500 text-sm mt-2">
                        {errors.image}
                      </p>
                    )}
                  </div>

                  {/* Sections */}
                  {activeSection === 'basic' && (
                    <div className="space-y-6">
                      <h2 className="text-xl font-semibold text-gray-800 mb-4">
                        Basic Information
                      </h2>

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
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Bio
                        </label>
                        <textarea
                          value={profileData.bio}
                          onChange={(e) =>
                            handleInputChange('bio', e.target.value)
                          }
                          rows={3}
                          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            errors.bio ? 'border-red-300' : 'border-gray-300'
                          }`}
                          placeholder="Tell us about yourself..."
                        />
                        <p className="text-sm text-gray-500 mt-1">
                          {profileData.bio.length}/500 characters
                        </p>
                        {errors.bio && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.bio}
                          </p>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Gender
                          </label>
                          <select
                            value={profileData.gender}
                            onChange={(e) =>
                              handleInputChange('gender', e.target.value)
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                            <option value="prefer-not-to-say">
                              Prefer not to say
                            </option>
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
                          placeholder="Enter your company"
                        />
                        <InputField
                          label="Job Title"
                          field="jobTitle"
                          placeholder="Enter your job title"
                        />
                      </div>
                    </div>
                  )}

                  {activeSection === 'contact' && (
                    <div className="space-y-6">
                      <h2 className="text-xl font-semibold text-gray-800 mb-4">
                        Contact Information
                      </h2>

                      <InputField
                        label="Email"
                        field="email"
                        type="email"
                        placeholder="your@email.com"
                        error={errors.email}
                      />
                      <InputField
                        label="Phone"
                        field="phone"
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                      />
                      <InputField
                        label="Location"
                        field="location"
                        placeholder="City, Country"
                      />
                      <InputField
                        label="Website"
                        field="website"
                        type="url"
                        placeholder="https://example.com"
                        error={errors.website}
                      />
                    </div>
                  )}

                  {activeSection === 'social' && (
                    <div className="space-y-6">
                      <h2 className="text-xl font-semibold text-gray-800 mb-4">
                        Social Media
                      </h2>

                      <InputField
                        label="GitHub"
                        field="githubUsername"
                        placeholder="GitHub username"
                      />
                      <InputField
                        label="LinkedIn"
                        field="linkedinUsername"
                        placeholder="LinkedIn username"
                      />
                      <InputField
                        label="Twitter"
                        field="twitterUsername"
                        placeholder="Twitter handle"
                      />
                      <InputField
                        label="Instagram"
                        field="instagramUsername"
                        placeholder="Instagram username"
                      />
                    </div>
                  )}

                  {activeSection === 'preferences' && (
                    <div className="space-y-6">
                      <h2 className="text-xl font-semibold text-gray-800 mb-4">
                        Preferences
                      </h2>

                      <div className="space-y-4">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={profileData.emailNotifications}
                            onChange={(e) =>
                              handleInputChange(
                                'emailNotifications',
                                e.target.checked
                              )
                            }
                            className="rounded text-blue-600 focus:ring-blue-500"
                          />
                          <span className="ml-2 text-gray-700">
                            Email Notifications
                          </span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={profileData.smsNotifications}
                            onChange={(e) =>
                              handleInputChange(
                                'smsNotifications',
                                e.target.checked
                              )
                            }
                            className="rounded text-blue-600 focus:ring-blue-500"
                          />
                          <span className="ml-2 text-gray-700">
                            SMS Notifications
                          </span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={profileData.marketingEmails}
                            onChange={(e) =>
                              handleInputChange(
                                'marketingEmails',
                                e.target.checked
                              )
                            }
                            className="rounded text-blue-600 focus:ring-blue-500"
                          />
                          <span className="ml-2 text-gray-700">
                            Marketing Emails
                          </span>
                        </label>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Profile Visibility
                        </label>
                        <select
                          value={profileData.profileVisibility}
                          onChange={(e) =>
                            handleInputChange(
                              'profileVisibility',
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="public">Public</option>
                          <option value="private">Private</option>
                          <option value="friends">Friends Only</option>
                        </select>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end space-x-3 p-6 border-t border-gray-200 bg-gray-50">
              <button
                onClick={closeModal}
                className="px-4 py-2 border rounded-lg hover:bg-gray-100 transition-colors"
                disabled={isUploading}
              >
                Cancel
              </button>
              <button
                onClick={saveProfile}
                disabled={isUploading}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {isUploading ? (
                  <>
                    <svg
                      className="animate-spin h-4 w-4 mr-2 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 
5.373 0 10.746 0 12h4zm2 5.291A7.962 7.962 0 
014 12H0c0 3.042 1.135 5.824 3 
7.938l3-2.647z"
                      />
                    </svg>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfileModal;
