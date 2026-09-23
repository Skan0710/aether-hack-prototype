import React, { useState } from 'react';
import { Menu, Shield, Wallet, Bell } from 'lucide-react';
import { INITIAL_DEMO_USER } from '../../data/demoUser';
import { formatINR } from '../../utils/formatCurrency';

interface HeaderProps {
  onOpenMobileMenu: () => void;
  language: 'en' | 'hi';
  onToggleLanguage: (lang: 'en' | 'hi') => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenMobileMenu,
  language,
  onToggleLanguage,
}) => {
  const [showNotification, setShowNotification] = useState(false);

  return (
    <header className="h-16 border-b border-navy-800 bg-navy-900/80 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30">
      {/* Left: Mobile hamburger & title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileMenu}
          className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-navy-800"
          aria-label="Open navigation"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
            <Shield className="w-3.5 h-3.5" />
            <span>AI Pre-Payment Guard Active</span>
          </div>
        </div>
      </div>

      {/* Right: Balance, Language, User */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Balance Badge */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-navy-800/80 border border-navy-750">
          <Wallet className="w-4 h-4 text-emerald-400 shrink-0" />
          <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-1.5">
            <span className="text-[10px] text-slate-400 uppercase font-mono hidden sm:inline">Balance:</span>
            <span className="text-xs sm:text-sm font-semibold text-white font-mono">
              {formatINR(INITIAL_DEMO_USER.currentBalance)}
            </span>
          </div>
        </div>

        {/* Language selector toggle */}
        <div className="flex items-center bg-navy-800 rounded-lg p-0.5 border border-navy-700">
          <button
            onClick={() => onToggleLanguage('en')}
            className={`px-2 py-1 text-xs rounded-md font-medium transition-all ${
              language === 'en'
                ? 'bg-emerald-500/20 text-emerald-300 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            EN
          </button>
          <button
            onClick={() => onToggleLanguage('hi')}
            className={`px-2 py-1 text-xs rounded-md font-medium transition-all ${
              language === 'hi'
                ? 'bg-emerald-500/20 text-emerald-300 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            हिन्दी
          </button>
        </div>

        {/* Notifications / Simulator alert */}
        <div className="relative">
          <button
            onClick={() => setShowNotification(!showNotification)}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-navy-800 transition-colors relative"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-cyan-400" />
          </button>
          {showNotification && (
            <div className="absolute right-0 mt-2 w-72 p-3 bg-navy-900 border border-navy-750 rounded-xl shadow-2xl z-50 text-xs">
              <div className="font-semibold text-white mb-1">Simulated Session</div>
              <p className="text-slate-400 leading-relaxed">
                Demo user <span className="text-slate-200 font-medium">Aarav Sharma</span> loaded with ₹48,500 balance and ₹26,500 in upcoming obligations due in 5 days.
              </p>
            </div>
          )}
        </div>

        {/* User Pill */}
        <div className="flex items-center gap-2 pl-2 border-l border-navy-800">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-500 to-cyan-500 flex items-center justify-center font-bold text-xs text-white shadow-sm">
            AS
          </div>
          <span className="text-xs font-medium text-slate-200 hidden lg:inline">
            {INITIAL_DEMO_USER.name}
          </span>
        </div>
      </div>
    </header>
  );
};
