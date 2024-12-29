import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { DashboardPage } from './pages/DashboardPage';
import { RecorderPage } from './pages/RecorderPage';
import { HeroBanner } from './components/sections/HeroBanner';
import { LocalRecording } from './components/LocalRecording';
import { Testimonial } from './components/sections/Testimonial';
import { HowItWorks } from './components/sections/HowItWorks';
import { CallToAction } from './components/sections/CallToAction';
import { PricingSection } from './components/pricing/PricingSection';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { TermsOfService } from './pages/TermsOfService';
import { AdminPage } from './pages/AdminPage';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#0f0f0f] flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={
              <>
                <HeroBanner />
                <section className="container mx-auto py-8">
                  <LocalRecording />
                </section>
                <Testimonial />
                <HowItWorks />
                <PricingSection />
                <CallToAction />
              </>
            } />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/recorder" element={<RecorderPage />} />
            <Route path="/pricing" element={<PricingSection />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
};