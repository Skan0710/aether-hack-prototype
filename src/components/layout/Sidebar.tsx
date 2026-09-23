import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  ShieldCheck,
  LayoutDashboard,
  ShieldAlert,
  CreditCard,
  History,
  Settings,
  Zap,
  Sparkles,
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
      <div className="p-5 border-b border-navy-800/80 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-glow-pass">
            <ShieldCheck className="w-6 h-6 text-emerald-400" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-lg text-white tracking-tight">PayKavach</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <p className="text-[11px] text-slate-400 font-mono tracking-tight">ENIGMA 5.0 Prototype</p>
          </div>
        </div>
      </div>

      {/* Tagline Banner */}
      <div className="mx-4 mt-4 p-3 rounded-xl bg-gradient-to-r from-emerald-950/40 to-navy-850 border border-emerald-500/20">
        <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 shrink-0" />
          <span>Financial Shield</span>
        </div>
        <p className="text-[11px] text-slate-300 mt-1 italic leading-tight">
          "The AI that asks why before you pay."
        </p>
      </div>

      {/* Navigation */}
      <nav className="p-4 flex-1 space-y-1.5 overflow-y-auto">
        <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 px-3 py-1 font-mono">
          Core Navigation
        </div>
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={onCloseMobile}
            className={({ isActive }) =>
              `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-navy-800/60'
              }`
            }
          >
            <div className="flex items-center gap-3">
              {item.icon}
              <span>{item.label}</span>
            </div>
            {item.badge && (
              <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-navy-800 text-slate-400 border border-navy-700 font-mono">
                {item.badge}
              </span>
            )}
          </NavLink>
        ))}

        <div className="pt-4 text-[11px] font-semibold uppercase tracking-wider text-slate-400 px-3 py-1 font-mono">
          Interactive Demos
        </div>
        <NavLink
          to="/check?scenario=demo1-scam"
          onClick={onCloseMobile}
          className="flex items-center gap-2.5 px-3.5 py-2 rounded-lg text-xs font-medium text-rose-400 hover:bg-rose-500/10 border border-rose-500/20 transition-colors"
        >
          <Zap className="w-3.5 h-3.5 text-rose-400 shrink-0" />
          <span>Demo 1: Scam HOLD</span>
        </NavLink>
        <NavLink
          to="/check?scenario=demo2-cashflow"
          onClick={onCloseMobile}
          className="flex items-center gap-2.5 px-3.5 py-2 rounded-lg text-xs font-medium text-amber-400 hover:bg-amber-500/10 border border-amber-500/20 transition-colors"
        >
          <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span>Demo 2: Cash-Flow WARN</span>
        </NavLink>
        <NavLink
          to="/credit-passport"
          onClick={onCloseMobile}
          className="flex items-center gap-2.5 px-3.5 py-2 rounded-lg text-xs font-medium text-cyan-400 hover:bg-cyan-500/10 border border-cyan-500/20 transition-colors"
        >
          <Zap className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
          <span>Demo 3: Credit Passport</span>
        </NavLink>
      </nav>

      {/* Disclaimers & User Status */}
      <div className="p-4 border-t border-navy-800/80 bg-navy-950/40 space-y-3">
        {/* Safety Boundary Disclosure */}
        <div className="flex items-start gap-2 text-[11px] text-slate-400 bg-navy-850/60 p-2.5 rounded-lg border border-navy-800">
          <Info className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
          <p>
            Companion app. <span className="text-slate-300">Does not block bank UPI.</span> No PIN requested.
          </p>
        </div>

        {/* User preview */}
        <div className="flex items-center justify-between p-2 rounded-xl bg-navy-800/50 border border-navy-750">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-500 to-cyan-500 flex items-center justify-center font-bold text-xs text-white">
              AS
            </div>
            <div>
              <p className="text-xs font-semibold text-white leading-none">{INITIAL_DEMO_USER.name}</p>
              <p className="text-[10px] text-slate-400 font-mono mt-0.5">{INITIAL_DEMO_USER.accountNumberMasked}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-slate-400 uppercase font-mono">Balance</p>
            <p className="text-xs font-semibold text-emerald-400 font-mono">
              {formatINR(INITIAL_DEMO_USER.currentBalance)}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};
