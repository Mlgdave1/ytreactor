import React from 'react';

export const TermsOfService: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0f0f0f] py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-white mb-8">Terms of Service</h1>
        
        <div className="prose prose-invert">
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-300">
              By accessing and using YouTube Reactor, you accept and agree to be bound by the terms
              and provision of this agreement.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">2. Description of Service</h2>
            <p className="text-gray-300">
              YouTube Reactor provides tools for creating reaction videos, including:
            </p>
            <ul className="list-disc pl-6 text-gray-300 space-y-2 mt-2">
              <li>Video recording capabilities</li>
              <li>Layout customization</li>
              <li>Asset library access</li>
              <li>Cloud storage integration</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">3. User Responsibilities</h2>
            <p className="text-gray-300">
              You are responsible for:
            </p>
            <ul className="list-disc pl-6 text-gray-300 space-y-2 mt-2">
              <li>Maintaining the confidentiality of your account</li>
              <li>All activities that occur under your account</li>
              <li>Ensuring you have the rights to use any content in your videos</li>
              <li>Complying with all applicable laws and regulations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">4. Content Guidelines</h2>
            <p className="text-gray-300">
              You agree not to use the service to:
            </p>
            <ul className="list-disc pl-6 text-gray-300 space-y-2 mt-2">
              <li>Upload any unlawful or unauthorized content</li>
              <li>Infringe upon any third-party rights</li>
              <li>Distribute malware or harmful code</li>
              <li>Engage in any activity that disrupts the service</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">5. Subscription Terms</h2>
            <p className="text-gray-300">
              Free tier users are limited to 3 videos per month. Paid subscriptions provide:
            </p>
            <ul className="list-disc pl-6 text-gray-300 space-y-2 mt-2">
              <li>Unlimited video creation</li>
              <li>Access to premium assets</li>
              <li>Advanced editing features</li>
              <li>Priority support</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">6. Contact</h2>
            <p className="text-gray-300">
              For any questions regarding these terms, please contact:
              <br />
              <a href="mailto:legal@ytreactor.com" className="text-red-400 hover:text-red-300">
                legal@ytreactor.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};