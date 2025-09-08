import React, { useState } from 'react';
import { 
  X, User, Mail, Phone, MapPin, Building, Globe, Clock, Calendar, 
  Tag, ShoppingBag, DollarSign, FileText, Sparkles, Package, 
  CheckCircle, TrendingUp
} from 'lucide-react';

const CustomerDetails = ({ customer, messages }) => {
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
  const [chatSummary, setChatSummary] = useState('');

  if (!customer) return null;

  const generateChatSummary = () => {
    setIsGeneratingSummary(true);
    
    // Simulate AI summary generation
    setTimeout(() => {
      const summary = `**Conversation Summary**

**Customer Intent:** The customer initiated contact regarding assistance with their project implementation.

**Key Discussion Points:**
• Initial greeting and offer of support
• Customer expressed need for project-related assistance
• Agent acknowledged the request and indicated readiness to help

**Customer Sentiment:** Positive and engaged

**Action Items:**
• Awaiting specific details about the project requirements
• Ready to provide tailored assistance based on customer needs

**Recommended Next Steps:**
1. Gather detailed project specifications
2. Provide relevant solution recommendations
3. Schedule follow-up if necessary`;

      setChatSummary(summary);
      setIsGeneratingSummary(false);
    }, 1500);
  };

  const clearSummary = () => {
    setChatSummary('');
  };

  return (
    <div 
      className="w-96 shadow-xl border-l h-full overflow-hidden"
      style={{ 
        backgroundColor: '#000000',
        borderLeftColor: '#1F7D53'
      }}
    >
      <div className="h-full flex flex-col">
        {/* Header */}
        <div 
          className="px-6 py-6 border-b"
          style={{ 
            backgroundColor: '#255F38',
            borderBottomColor: '#1F7D53'
          }}
        >
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Customer Details</h3>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Profile Section */}
          <div 
            className="p-6 border-b"
            style={{ borderBottomColor: '#1F7D53' }}
          >
            <div className="flex items-center space-x-4 mb-4">
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-bold"
                style={{ backgroundColor: '#255F38' }}
              >
                {customer.name.charAt(0)}
              </div>
              <div>
                <h4 className="text-xl font-semibold" style={{ color: '#255F38' }}>{customer.name}</h4>
                <p className="text-sm" style={{ color: '#1F7D53' }}>Customer since {customer.customerSince}</p>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {customer.tags.map((tag, index) => (
                <span 
                  key={index} 
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                  style={{ 
                    backgroundColor: 'rgba(31, 125, 83, 0.2)',
                    color: '#1F7D53'
                  }}
                >
                  <Tag className="w-3 h-3 mr-1" />
                  {tag}
                </span>
              ))}
            </div>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center text-sm" style={{ color: '#ffffff' }}>
                <Mail className="w-4 h-4 mr-3" style={{ color: '#1F7D53' }} />
                {customer.email}
              </div>
              <div className="flex items-center text-sm" style={{ color: '#ffffff' }}>
                <Phone className="w-4 h-4 mr-3" style={{ color: '#1F7D53' }} />
                {customer.phone}
              </div>
              <div className="flex items-center text-sm" style={{ color: '#ffffff' }}>
                <MapPin className="w-4 h-4 mr-3" style={{ color: '#1F7D53' }} />
                {customer.location}
              </div>
              <div className="flex items-center text-sm" style={{ color: '#ffffff' }}>
                <Building className="w-4 h-4 mr-3" style={{ color: '#1F7D53' }} />
                {customer.company}
              </div>
              <div className="flex items-center text-sm" style={{ color: '#ffffff' }}>
                <Globe className="w-4 h-4 mr-3" style={{ color: '#1F7D53' }} />
                {customer.preferredLanguage}
              </div>
              <div className="flex items-center text-sm" style={{ color: '#ffffff' }}>
                <Clock className="w-4 h-4 mr-3" style={{ color: '#1F7D53' }} />
                {customer.timezone} • Last seen {customer.lastSeen}
              </div>
            </div>
          </div>

          {/* Chat Summary Section */}
          <div 
            className="p-6 border-b"
            style={{ borderBottomColor: '#1F7D53' }}
          >
            <div className="flex items-center justify-between mb-4">
              <h5 className="text-sm font-semibold" style={{ color: '#255F38' }}>Conversation Summary</h5>
              {chatSummary && (
                <button
                  onClick={clearSummary}
                  className="text-xs transition-colors"
                  style={{ color: '#1F7D53' }}
                  onMouseEnter={(e) => e.target.style.color = '#ffffff'}
                  onMouseLeave={(e) => e.target.style.color = '#1F7D53'}
                >
                  Clear
                </button>
              )}
            </div>
            
            {!chatSummary ? (
              <button
                onClick={generateChatSummary}
                disabled={isGeneratingSummary}
                className="w-full py-3 px-4 text-white rounded-lg font-medium transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
                style={{ 
                  background: 'linear-gradient(to right, #255F38, #1F7D53)'
                }}
                onMouseEnter={(e) => {
                  if (!isGeneratingSummary) {
                    e.target.style.background = 'linear-gradient(to right, #1F7D53, #255F38)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isGeneratingSummary) {
                    e.target.style.background = 'linear-gradient(to right, #255F38, #1F7D53)';
                  }
                }}
              >
                <Sparkles className="w-4 h-4" />
                <span>{isGeneratingSummary ? 'Generating Summary...' : 'Generate AI Summary'}</span>
              </button>
            ) : (
              <div 
                className="rounded-lg p-4 text-sm whitespace-pre-line"
                style={{ 
                  backgroundColor: 'rgba(37, 95, 56, 0.1)',
                  color: '#ffffff'
                }}
              >
                {chatSummary}
              </div>
            )}
          </div>

          {/* Customer Stats */}
          <div 
            className="p-6 border-b"
            style={{ borderBottomColor: '#1F7D53' }}
          >
            <h5 className="text-sm font-semibold mb-4" style={{ color: '#255F38' }}>Customer Statistics</h5>
            <div className="grid grid-cols-2 gap-4">
              <div 
                className="rounded-lg p-3"
                style={{ backgroundColor: 'rgba(37, 95, 56, 0.2)' }}
              >
                <div className="flex items-center justify-between">
                  <ShoppingBag className="w-5 h-5" style={{ color: '#255F38' }} />
                  <span className="text-lg font-semibold text-white">{customer.totalPurchases}</span>
                </div>
                <p className="text-xs mt-1" style={{ color: '#1F7D53' }}>Total Orders</p>
              </div>
              <div 
                className="rounded-lg p-3"
                style={{ backgroundColor: 'rgba(31, 125, 83, 0.2)' }}
              >
                <div className="flex items-center justify-between">
                  <DollarSign className="w-5 h-5" style={{ color: '#1F7D53' }} />
                  <span className="text-lg font-semibold text-white">{customer.lifetimeValue}</span>
                </div>
                <p className="text-xs mt-1" style={{ color: '#1F7D53' }}>Lifetime Value</p>
              </div>
              <div 
                className="rounded-lg p-3"
                style={{ backgroundColor: 'rgba(37, 95, 56, 0.15)' }}
              >
                <div className="flex items-center justify-between">
                  <Calendar className="w-5 h-5" style={{ color: '#255F38' }} />
                  <span className="text-sm font-semibold text-white">{customer.joinedDate}</span>
                </div>
                <p className="text-xs mt-1" style={{ color: '#1F7D53' }}>Member Since</p>
              </div>
              <div 
                className="rounded-lg p-3"
                style={{ backgroundColor: 'rgba(31, 125, 83, 0.15)' }}
              >
                <div className="flex items-center justify-between">
                  <TrendingUp className="w-5 h-5" style={{ color: '#1F7D53' }} />
                  <span className="text-sm font-semibold text-white">Active</span>
                </div>
                <p className="text-xs mt-1" style={{ color: '#1F7D53' }}>Account Status</p>
              </div>
            </div>
          </div>

          {/* Recent Orders */}
          <div 
            className="p-6 border-b"
            style={{ borderBottomColor: '#1F7D53' }}
          >
            <h5 className="text-sm font-semibold mb-4" style={{ color: '#255F38' }}>Recent Orders</h5>
            <div className="space-y-3">
              {customer.recentOrders.map((order) => (
                <div 
                  key={order.id} 
                  className="flex items-center justify-between p-3 rounded-lg"
                  style={{ backgroundColor: 'rgba(31, 125, 83, 0.1)' }}
                >
                  <div className="flex items-center space-x-3">
                    <Package className="w-4 h-4" style={{ color: '#1F7D53' }} />
                    <div>
                      <p className="text-sm font-medium text-white">{order.id}</p>
                      <p className="text-xs" style={{ color: '#1F7D53' }}>{order.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-white">{order.amount}</p>
                    <p className="text-xs flex items-center" style={{ color: '#255F38' }}>
                      <CheckCircle className="w-3 h-3 mr-1" />
                      {order.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Notes Section */}
          <div className="p-6">
            <h5 className="text-sm font-semibold mb-3" style={{ color: '#255F38' }}>Internal Notes</h5>
            <div 
              className="rounded-lg p-4"
              style={{ backgroundColor: 'rgba(37, 95, 56, 0.1)' }}
            >
              <FileText className="w-4 h-4 mb-2" style={{ color: '#255F38' }} />
              <p className="text-sm text-white">{customer.notes}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetails;