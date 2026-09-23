import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from '../components/layout/AppLayout';
import { Dashboard } from '../pages/Dashboard';

// Temporary placeholders for future commits
const PlaceholderPage = ({ title, desc }: { title: string; desc: string }) => (
  <div className="p-8 kavach-card max-w-2xl mx-auto text-center space-y-4">
    <h1 className="text-2xl font-bold text-white">{title}</h1>
    <p className="text-slate-400">{desc}</p>
  </div>
);

export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/check" element={<PlaceholderPage title="Payment Pre-Check" desc="AI Risk Engine screening" />} />
          <Route path="/verdict/:id?" element={<PlaceholderPage title="Payment Verdict" desc="Explainable verdict analysis" />} />
          <Route path="/credit-passport" element={<PlaceholderPage title="Credit Passport" desc="Synthetic cash-flow health passport" />} />
          <Route path="/activity" element={<PlaceholderPage title="Activity History" desc="Local payment check history" />} />
          <Route path="/settings" element={<PlaceholderPage title="Settings & Privacy" desc="Preferences, consent, and demo reset" />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
