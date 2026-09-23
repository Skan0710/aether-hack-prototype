import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Placeholder or foundation pages for Commit 1
const PlaceholderPage = ({ title, desc }: { title: string; desc: string }) => (
  <div className="p-8">
    <h1 className="text-2xl font-bold text-white mb-2">{title}</h1>
    <p className="text-slate-400">{desc}</p>
  </div>
);

export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-navy-950 text-slate-100 flex flex-col">
        {/* Foundation Header */}
        <header className="border-b border-navy-800 bg-navy-900/60 backdrop-blur px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold">
              PK
            </div>
            <div>
              <span className="font-bold text-lg tracking-tight text-white">PayKavach</span>
              <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">Prototype</span>
            </div>
          </div>
          <span className="text-xs text-slate-400 font-mono">The AI that asks why before you pay</span>
        </header>

        {/* Foundation Content */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<PlaceholderPage title="Dashboard" desc="PayKavach AI-Powered Pre-Payment Protection" />} />
            <Route path="/check" element={<PlaceholderPage title="Payment Pre-Check" desc="Scam, voice, and cash-flow evaluation" />} />
            <Route path="/verdict" element={<PlaceholderPage title="Verdict" desc="Explainable verdict analysis" />} />
            <Route path="/credit-passport" element={<PlaceholderPage title="Credit Passport" desc="Synthetic cash-flow health passport" />} />
            <Route path="/activity" element={<PlaceholderPage title="Activity History" desc="Local payment check history" />} />
            <Route path="/settings" element={<PlaceholderPage title="Settings & Privacy" desc="Preferences, consent, and demo reset" />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};
