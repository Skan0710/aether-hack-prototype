import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  ShieldCheck,
  LayoutDashboard,
  ShieldAlert,
  CreditCard,
  History,
  Settings,
  Info,
} from 'lucide-react';
import { formatINR } from '../../utils/formatCurrency';
import { INITIAL_DEMO_USER } from '../../data/demoUser';

interface SidebarProps {
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onCloseMobile }) => {
  const navItems = [
    {
      to: '/',
      label: 'Dashboard',
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
      to: '/check',
      label: 'Check Payment',
      icon: <ShieldAlert className="w-5 h-5" />,
      badge: 'AI Engine',
    },
    {
      to: '/credit-passport',
      label: 'Credit Passport',
      icon: <CreditCard className="w-5 h-5" />,
      badge: '78/100',
    },
    {
      to: '/activity',
      label: 'Payment History',
      icon: <History className="w-5 h-5" />,
    },
    {
      to: '/settings',
      label: 'Settings & Privacy',
      icon: <Settings className="w-5 h-5" />,
    },
  ];

  return (
    <aside className="w-64 bg-navy-900 border-r border-navy-800 flex flex-col h-full shrink-0">
      {/* Brand Header */}
      <div className="p-5 border-b border-navy-800/70 flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400 shrink-0">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <div>
          <span className="font-semibold text-[15px] text-white tracking-tight block leading-none">PayKavach</span>
          <p className="text-[11px] text-slate-500 mt-1">Financial safety companion</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-3 pt-4 flex-1 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={onCloseMobile}
            className={({ isActive }) =>
              `flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-emerald-500/10 text-emerald-400'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-navy-800/60'
              }`
            }
          >
            <div className="flex items-center gap-3">
              {item.icon}
              <span>{item.label}</span>
            </div>
            {item.badge && (
              <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-navy-800 text-slate-500">
                {item.badge}
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Disclaimers & User Status */}
      <div className="p-3 border-t border-navy-800/70 space-y-3">
        {/* Safety Boundary Disclosure */}
        <div className="flex items-start gap-2 text-[11px] text-slate-500 px-2">
          <Info className="w-3.5 h-3.5 shrink-0 mt-0.5" />
          <p>Companion app — doesn't block bank UPI or request your PIN.</p>
        </div>

        {/* User preview */}
        <div className="flex items-center justify-between p-2.5 rounded-xl bg-navy-850 border border-navy-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center font-semibold text-xs text-emerald-400">
              AS
            </div>
            <div>
              <p className="text-xs font-medium text-white leading-none">{INITIAL_DEMO_USER.name}</p>
              <p className="text-[10px] text-slate-500 mt-1">{INITIAL_DEMO_USER.accountNumberMasked}</p>
            </div>
          </div>
          <p className="text-xs font-semibold text-slate-200">
            {formatINR(INITIAL_DEMO_USER.currentBalance)}
          </p>
        </div>
      </div>
    </aside>
  );
};
