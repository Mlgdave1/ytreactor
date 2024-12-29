import React from 'react';
import { Users, DollarSign, Link, TrendingUp } from 'lucide-react';

const stats = [
  {
    label: 'Total Referrals',
    value: '48',
    change: '+12',
    icon: Users,
    color: 'blue'
  },
  {
    label: 'Commission Earned',
    value: '$342',
    change: '+$86',
    icon: DollarSign,
    color: 'green'
  },
  {
    label: 'Conversion Rate',
    value: '8.4%',
    change: '+1.2%',
    icon: TrendingUp,
    color: 'purple'
  },
  {
    label: 'Active Links',
    value: '3',
    change: '+1',
    icon: Link,
    color: 'yellow'
  }
];

const recentReferrals = [
  { user: 'John Smith', plan: 'Pro', commission: '$24', date: '2024-02-28' },
  { user: 'Sarah Wilson', plan: 'Business', commission: '$72', date: '2024-02-27' },
  { user: 'Mike Brown', plan: 'Pro', commission: '$24', date: '2024-02-26' }
];

export const AffiliateStats: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">Affiliate Dashboard</h2>
        <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors">
          Get Affiliate Link
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-[#1a1a1a] p-6 rounded-lg border border-[#272727]">
            <div className="flex justify-between items-start mb-4">
              <stat.icon size={24} className={`text-${stat.color}-500`} />
              <span className="text-sm text-green-500">
                {stat.change.startsWith('+') ? stat.change : `+${stat.change}`}
              </span>
            </div>
            <h3 className="text-2xl font-bold mb-1">{stat.value}</h3>
            <p className="text-gray-400 text-sm">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Recent Referrals */}
      <div className="bg-[#1a1a1a] rounded-lg border border-[#272727] p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">Recent Referrals</h3>
          <button className="text-sm text-gray-400 hover:text-white transition-colors">
            View All
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-400 text-sm">
                <th className="pb-4">User</th>
                <th className="pb-4">Plan</th>
                <th className="pb-4">Commission</th>
                <th className="pb-4">Date</th>
              </tr>
            </thead>
            <tbody>
              {recentReferrals.map((referral, index) => (
                <tr key={index} className="border-t border-[#272727]">
                  <td className="py-4">{referral.user}</td>
                  <td className="py-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      referral.plan === 'Business' 
                        ? 'bg-purple-500/20 text-purple-400'
                        : 'bg-blue-500/20 text-blue-400'
                    }`}>
                      {referral.plan}
                    </span>
                  </td>
                  <td className="py-4 text-green-400">{referral.commission}</td>
                  <td className="py-4 text-gray-400">{referral.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Promotional Materials */}
      <div className="bg-[#1a1a1a] rounded-lg border border-[#272727] p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Promotional Materials</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-[#272727] rounded-lg">
            <h4 className="font-medium text-white mb-2">Affiliate Links</h4>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value="https://ytreactor.com/?ref=user123"
                readOnly
                className="flex-1 px-3 py-2 bg-[#1a1a1a] rounded border border-[#323232] text-gray-400 text-sm"
              />
              <button className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-sm">
                Copy
              </button>
            </div>
          </div>
          <div className="p-4 bg-[#272727] rounded-lg">
            <h4 className="font-medium text-white mb-2">Banners & Assets</h4>
            <button className="w-full px-3 py-2 bg-[#1a1a1a] text-gray-400 rounded border border-[#323232] hover:bg-[#323232] transition-colors text-sm">
              Download Media Kit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};