import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from '../components/layout/AppLayout';
import { Dashboard } from '../pages/Dashboard';
import { PaymentCheck } from '../pages/PaymentCheck';
import { Verdict } from '../pages/Verdict';
import { CreditPassport } from '../pages/CreditPassport';
import { Activity } from '../pages/Activity';
import { Settings } from '../pages/Settings';

export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/check" element={<PaymentCheck />} />
          <Route path="/verdict/:id?" element={<Verdict />} />
          <Route path="/credit-passport" element={<CreditPassport />} />
          <Route path="/activity" element={<Activity />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
