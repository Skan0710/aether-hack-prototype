import React from 'react';
import { DEMO_SCENARIOS, DemoScenarioConfig } from '../../data/demoScenarios';
import { Sparkles, ShieldAlert, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface DemoScenarioSelectorProps {
  selectedId: string | null;
  onSelect: (scenario: DemoScenarioConfig) => void;
}

export const DemoScenarioSelector: React.FC<DemoScenarioSelectorProps> = ({
  selectedId,
  onSelect,
}) => {
  const getIcon = (variant: string) => {
    switch (variant) {
      case 'hold':
        return <ShieldAlert className="w-4 h-4 text-rose-400" />;
      case 'warn':
        return <AlertTriangle className="w-4 h-4 text-amber-400" />;
      case 'pass':
      default:
        return <CheckCircle2 className="w-4 h-4 text-emerald-400" />;
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5 font-mono">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>Predefined Hackathon Scenarios</span>
        </label>
        <span className="text-[11px] text-slate-400">Click to autofill exact test case</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {DEMO_SCENARIOS.map((scenario) => {
          const isSelected = selectedId === scenario.id;
          const borderClass = isSelected
            ? scenario.badgeVariant === 'hold'
              ? 'border-rose-500 bg-rose-500/10'
              : scenario.badgeVariant === 'warn'
              ? 'border-amber-500 bg-amber-500/10'
              : 'border-emerald-500 bg-emerald-500/10'
            : 'border-navy-800 bg-navy-850 hover:border-navy-700 hover:bg-navy-800';

          return (
            <button
              key={scenario.id}
              type="button"
              onClick={() => onSelect(scenario)}
              className={`p-3 rounded-xl border text-left transition-all ${borderClass}`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-1.5">
                  {getIcon(scenario.badgeVariant)}
                  <span className="text-xs font-semibold text-white truncate max-w-[130px]">
                    {scenario.name.split(':')[0]}
                  </span>
                </div>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded font-mono font-medium ${
                    scenario.badgeVariant === 'hold'
                      ? 'bg-rose-500/20 text-rose-300'
                      : scenario.badgeVariant === 'warn'
                      ? 'bg-amber-500/20 text-amber-300'
                      : 'bg-emerald-500/20 text-emerald-300'
                  }`}
                >
                  {scenario.badge.split(' ')[1] || scenario.badge}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                {scenario.description}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
};
