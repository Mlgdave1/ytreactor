import React, { useState } from 'react';
import { Users, MessageSquare, CreditCard, BarChart3, Settings, Bell, Shield, HelpCircle, Users2, DollarSign } from 'lucide-react';

const stats = [
  { label: 'Total Users', value: '12,345', change: '+12%', icon: Users },
  { label: 'Active Subscriptions', value: '3,456', change: '+8%', icon: CreditCard },
  { label: 'Support Tickets', value: '28', change: '-5%', icon: MessageSquare },
  { label: 'Revenue (MTD)', value: '$45,678', change: '+15%', icon: BarChart3 },
];

const recentTickets = [
  { id: 1, user: 'John Doe', subject: 'Cannot access templates', status: 'open', priority: 'high', time: '2h ago' },
  { id: 2, user: 'Jane Smith', subject: 'Billing question', status: 'pending', priority: 'medium', time: '4h ago' },
  { id: 3, user: 'Mike Johnson', subject: 'Feature request', status: 'closed', priority: 'low', time: '1d ago' },
];

const topSubscribers = [
  { user: 'Creator Studio X', plan: 'Business', revenue: '$299/mo', joined: '2024-01-15' },
  { user: 'React Masters', plan: 'Business', revenue: '$299/mo', joined: '2024-02-01' },
  { user: 'Tech Reviews Daily', plan: 'Pro', revenue: '$99/mo', joined: '2024-02-15' },
];

const topAffiliates = [
  { 
    name: 'Sarah Johnson',
    referrals: 145,
    revenue: '$4,350',
    commission: '$870',
    status: 'active'
  },
  { 
    name: 'Tech Review Pro',
    referrals: 98,
    revenue: '$2,940',
    commission: '$588',
    status: 'active'
  },
  { 
    name: 'Creator Academy',
    referrals: 76,
    revenue: '$2,280',
    commission: '$456',
    status: 'active'
  }
];

export const AdminPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'affiliates'>('overview');

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <p className="text-gray-400">Manage your platform and users</p>
          </div>
          <div className="flex gap-4">
            <button className="p-2 bg-[#272727] rounded-md hover:bg-[#323232] transition-colors">
              <Bell size={20} />
            </button>
            <button className="p-2 bg-[#272727] rounded-md hover:bg-[#323232] transition-colors">
              <Settings size={20} />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-md transition-colors ${
              activeTab === 'overview' 
                ? 'bg-red-500 text-white' 
                : 'bg-[#272727] text-gray-300 hover:bg-[#323232]'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('affiliates')}
            className={`px-4 py-2 rounded-md transition-colors ${
              activeTab === 'affiliates' 
                ? 'bg-red-500 text-white' 
                : 'bg-[#272727] text-gray-300 hover:bg-[#323232]'
            }`}
          >
            Affiliate Program
          </button>
        </div>

        {activeTab === 'overview' ? (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <div key={index} className="bg-[#1a1a1a] p-6 rounded-lg border border-[#272727]">
                  <div className="flex justify-between items-start mb-4">
                    <stat.icon size={24} className="text-red-500" />
                    <span className={`text-sm ${
                      stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'
                    }`}>
                      {stat.change}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold mb-1">{stat.value}</h3>
                  <p className="text-gray-400 text-sm">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Support Tickets */}
              <div className="lg:col-span-2">
                <div className="bg-[#1a1a1a] rounded-lg border border-[#272727] p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                      <MessageSquare size={20} className="text-blue-500" />
                      Recent Support Tickets
                    </h2>
                    <button className="text-sm text-gray-400 hover:text-white transition-colors">
                      View All
                    </button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="text-left text-gray-400 text-sm">
                          <th className="pb-4">User</th>
                          <th className="pb-4">Subject</th>
                          <th className="pb-4">Status</th>
                          <th className="pb-4">Priority</th>
                          <th className="pb-4">Time</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentTickets.map((ticket) => (
                          <tr key={ticket.id} className="border-t border-[#272727]">
                            <td className="py-4">{ticket.user}</td>
                            <td className="py-4">{ticket.subject}</td>
                            <td className="py-4">
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                ticket.status === 'open' ? 'bg-green-500/20 text-green-400' :
                                ticket.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                                'bg-gray-500/20 text-gray-400'
                              }`}>
                                {ticket.status}
                              </span>
                            </td>
                            <td className="py-4">
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                ticket.priority === 'high' ? 'bg-red-500/20 text-red-400' :
                                ticket.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                                'bg-blue-500/20 text-blue-400'
                              }`}>
                                {ticket.priority}
                              </span>
                            </td>
                            <td className="py-4 text-gray-400">{ticket.time}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Top Subscribers */}
              <div>
                <div className="bg-[#1a1a1a] rounded-lg border border-[#272727] p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                      <Shield size={20} className="text-green-500" />
                      Top Subscribers
                    </h2>
                    <button className="text-sm text-gray-400 hover:text-white transition-colors">
                      View All
                    </button>
                  </div>
                  <div className="space-y-4">
                    {topSubscribers.map((sub, index) => (
                      <div key={index} className="p-4 bg-[#272727] rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-medium">{sub.user}</h3>
                          <span className="text-green-400">{sub.revenue}</span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-400">
                          <span>{sub.plan}</span>
                          <span>Joined {sub.joined}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="space-y-8">
            {/* Affiliate Program Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[#1a1a1a] p-6 rounded-lg border border-[#272727]">
                <div className="flex justify-between items-start mb-4">
                  <Users2 size={24} className="text-blue-500" />
                  <span className="text-sm text-green-500">+24%</span>
                </div>
                <h3 className="text-2xl font-bold mb-1">1,234</h3>
                <p className="text-gray-400 text-sm">Active Affiliates</p>
              </div>
              
              <div className="bg-[#1a1a1a] p-6 rounded-lg border border-[#272727]">
                <div className="flex justify-between items-start mb-4">
                  <DollarSign size={24} className="text-green-500" />
                  <span className="text-sm text-green-500">+18%</span>
                </div>
                <h3 className="text-2xl font-bold mb-1">$12,345</h3>
                <p className="text-gray-400 text-sm">Commission Paid (MTD)</p>
              </div>
              
              <div className="bg-[#1a1a1a] p-6 rounded-lg border border-[#272727]">
                <div className="flex justify-between items-start mb-4">
                  <Users size={24} className="text-purple-500" />
                  <span className="text-sm text-green-500">+32%</span>
                </div>
                <h3 className="text-2xl font-bold mb-1">3,456</h3>
                <p className="text-gray-400 text-sm">Referred Users</p>
              </div>
            </div>

            {/* Top Affiliates */}
            <div className="bg-[#1a1a1a] rounded-lg border border-[#272727] p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Top Performing Affiliates</h2>
                <button className="text-sm text-gray-400 hover:text-white transition-colors">
                  View All
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-gray-400 text-sm">
                      <th className="pb-4">Affiliate</th>
                      <th className="pb-4">Referrals</th>
                      <th className="pb-4">Revenue</th>
                      <th className="pb-4">Commission</th>
                      <th className="pb-4">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topAffiliates.map((affiliate, index) => (
                      <tr key={index} className="border-t border-[#272727]">
                        <td className="py-4">{affiliate.name}</td>
                        <td className="py-4">{affiliate.referrals}</td>
                        <td className="py-4">{affiliate.revenue}</td>
                        <td className="py-4 text-green-400">{affiliate.commission}</td>
                        <td className="py-4">
                          <span className="px-2 py-1 rounded-full text-xs bg-green-500/20 text-green-400">
                            {affiliate.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="p-4 bg-[#1a1a1a] rounded-lg border border-[#272727] hover:bg-[#272727] transition-colors flex items-center gap-3">
                <Settings size={20} className="text-blue-500" />
                <div className="text-left">
                  <h3 className="font-medium">Program Settings</h3>
                  <p className="text-sm text-gray-400">Configure commission rates</p>
                </div>
              </button>
              <button className="p-4 bg-[#1a1a1a] rounded-lg border border-[#272727] hover:bg-[#272727] transition-colors flex items-center gap-3">
                <MessageSquare size={20} className="text-purple-500" />
                <div className="text-left">
                  <h3 className="font-medium">Affiliate Support</h3>
                  <p className="text-sm text-gray-400">View support requests</p>
                </div>
              </button>
              <button className="p-4 bg-[#1a1a1a] rounded-lg border border-[#272727] hover:bg-[#272727] transition-colors flex items-center gap-3">
                <BarChart3 size={20} className="text-yellow-500" />
                <div className="text-left">
                  <h3 className="font-medium">Analytics</h3>
                  <p className="text-sm text-gray-400">View program metrics</p>
                </div>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};