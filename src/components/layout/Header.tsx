import React from 'react';
import { Menu, Shield, Wallet } from 'lucide-react';
import { INITIAL_DEMO_USER } from '../../data/demoUser';
import { formatINR } from '../../utils/formatCurrency';

interface HeaderProps {
  onOpenMobileMenu: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenMobileMenu }) => {
  return (
    <header className="h-16 border-b border-navy-800 bg-navy-900/85 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30">
      {/* Left: Mobile hamburger & status */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileMenu}
          className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-navy-800"
          aria-label="Open navigation"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="hidden sm:flex items-center gap-1.5 text-emerald-400 text-xs font-medium">
          <Shield className="w-3.5 h-3.5" />
          <span>Pre-payment guard active</span>
        </div>
      </div>

      {/* Right: Balance, User */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Balance Pill */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-navy-800/70 border border-navy-750">
          <Wallet className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="text-xs sm:text-sm font-semibold text-white">
            {formatINR(INITIAL_DEMO_USER.currentBalance)}
          </span>
        </div>

        {/* User Pill */}
        <div className="flex items-center gap-2 pl-2 border-l border-navy-800">
          <div className="w-8 h-8 rounded-full bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center font-semibold text-xs text-emerald-400">
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
