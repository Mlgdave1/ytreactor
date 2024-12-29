import React from 'react';
import { Shield, Lock, Eye, Server, UserCheck, Mail } from 'lucide-react';

export const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0f0f0f] py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Privacy Policy</h1>
          <p className="text-xl text-gray-400">Last updated: {new Date().toLocaleDateString()}</p>
        </div>
        
        <div className="prose prose-invert max-w-none">
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-8 h-8 text-red-500" />
              <h2 className="text-2xl font-semibold text-white m-0">Data Collection and Usage</h2>
            </div>
            <div className="bg-[#1a1a1a] rounded-lg p-6 border border-[#272727]">
              <p className="text-gray-300 mb-4">
                When you use YouTube Reactor, we collect and process the following data through Google OAuth:
              </p>
              <ul className="list-disc pl-6 text-gray-300 space-y-2">
                <li>Basic profile information (name, email, profile picture)</li>
                <li>YouTube channel information for content creation</li>
                <li>Video metadata for reaction video processing</li>
              </ul>
              <p className="text-gray-300 mt-4">
                This data is essential for providing our core services and is used exclusively for:
              </p>
              <ul className="list-disc pl-6 text-gray-300 space-y-2 mt-2">
                <li>Account creation and management</li>
                <li>Facilitating YouTube video reactions</li>
                <li>Enhancing user experience through personalization</li>
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <Lock className="w-8 h-8 text-blue-500" />
              <h2 className="text-2xl font-semibold text-white m-0">Data Security</h2>
            </div>
            <div className="bg-[#1a1a1a] rounded-lg p-6 border border-[#272727]">
              <p className="text-gray-300 mb-4">
                We implement robust security measures to protect your data:
              </p>
              <ul className="list-disc pl-6 text-gray-300 space-y-2">
                <li>End-to-end encryption for all data transmission</li>
                <li>Secure cloud storage with regular security audits</li>
                <li>Regular security assessments and updates</li>
                <li>Strict access controls and authentication</li>
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <Eye className="w-8 h-8 text-green-500" />
              <h2 className="text-2xl font-semibold text-white m-0">Data Access and Control</h2>
            </div>
            <div className="bg-[#1a1a1a] rounded-lg p-6 border border-[#272727]">
              <p className="text-gray-300 mb-4">
                You have complete control over your data:
              </p>
              <ul className="list-disc pl-6 text-gray-300 space-y-2">
                <li>Access your stored data anytime</li>
                <li>Request data deletion</li>
                <li>Export your data in standard formats</li>
                <li>Revoke access to Google services</li>
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <Server className="w-8 h-8 text-purple-500" />
              <h2 className="text-2xl font-semibold text-white m-0">Data Retention</h2>
            </div>
            <div className="bg-[#1a1a1a] rounded-lg p-6 border border-[#272727]">
              <p className="text-gray-300 mb-4">
                We retain your data only as long as necessary:
              </p>
              <ul className="list-disc pl-6 text-gray-300 space-y-2">
                <li>Account data: Until account deletion</li>
                <li>Video reactions: 30 days after creation</li>
                <li>Usage logs: 90 days for security purposes</li>
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <UserCheck className="w-8 h-8 text-yellow-500" />
              <h2 className="text-2xl font-semibold text-white m-0">User Rights</h2>
            </div>
            <div className="bg-[#1a1a1a] rounded-lg p-6 border border-[#272727]">
              <p className="text-gray-300 mb-4">
                You have the following rights regarding your data:
              </p>
              <ul className="list-disc pl-6 text-gray-300 space-y-2">
                <li>Right to access your personal data</li>
                <li>Right to rectification of inaccurate data</li>
                <li>Right to erasure ("right to be forgotten")</li>
                <li>Right to data portability</li>
                <li>Right to withdraw consent</li>
              </ul>
            </div>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-6">
              <Mail className="w-8 h-8 text-red-500" />
              <h2 className="text-2xl font-semibold text-white m-0">Contact Information</h2>
            </div>
            <div className="bg-[#1a1a1a] rounded-lg p-6 border border-[#272727]">
              <p className="text-gray-300 mb-4">
                For any privacy-related questions or concerns:
              </p>
              <ul className="list-none text-gray-300 space-y-2">
                <li>Email: privacy@ytreactor.com</li>
                <li>Address: [Your Business Address]</li>
                <li>Phone: [Your Business Phone]</li>
              </ul>
              <p className="text-gray-300 mt-4">
                We aim to respond to all inquiries within 48 hours.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};