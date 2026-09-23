import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, Zap, AlertTriangle, CreditCard, ArrowRight, ShieldCheck } from 'lucide-react';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';

export const QuickDemoLauncher: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Card className="border-cyan-500/20 shadow-glow-accent">
      <CardHeader
        title="Interactive Hackathon Showcase"
        subtitle="1-click launch for the three Enigma 5.0 evaluation scenarios"
        icon={<Zap className="w-5 h-5 text-cyan-400" />}
        action={
          <Button
            size="sm"
            variant="emerald"
            leftIcon={<ShieldCheck className="w-4 h-4" />}
            onClick={() => navigate('/check')}
          >
            Check Custom Payment
          </Button>
        }
      />
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Demo 1 */}
          <div
            onClick={() => navigate('/check?scenario=demo1-scam')}
            className="p-4 rounded-xl bg-navy-850 hover:bg-navy-800/90 border border-rose-500/30 hover:border-rose-500/60 cursor-pointer transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20 font-semibold">
                  DEMO 1
                </span>
                <span className="text-xs font-bold text-rose-400 font-mono">HOLD (94/100)</span>
              </div>
              <h4 className="text-sm font-semibold text-white group-hover:text-rose-300 transition-colors flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0" />
                Scam Intercepted
              </h4>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                Hospital emergency voice note impersonating "Mom". 91% AI voice clone, first-time payee.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-navy-750 flex items-center justify-between text-xs text-rose-400 font-medium">
              <span>₹20,000 to rahul.k88@ybl</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Demo 2 */}
          <div
            onClick={() => navigate('/check?scenario=demo2-cashflow')}
            className="p-4 rounded-xl bg-navy-850 hover:bg-navy-800/90 border border-amber-500/30 hover:border-amber-500/60 cursor-pointer transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 font-semibold">
                  DEMO 2
                </span>
                <span className="text-xs font-bold text-amber-400 font-mono">WARN (-₹8,000)</span>
              </div>
              <h4 className="text-sm font-semibold text-white group-hover:text-amber-300 transition-colors flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                Cash-Flow Foresight
              </h4>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                ₹30,000 phone purchase leaves ₹8,000 deficit against ₹26,500 obligations due in 5 days.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-navy-750 flex items-center justify-between text-xs text-amber-400 font-medium">
              <span>₹30,000 at Croma</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Demo 3 */}
          <div
            onClick={() => navigate('/credit-passport')}
            className="p-4 rounded-xl bg-navy-850 hover:bg-navy-800/90 border border-emerald-500/30 hover:border-emerald-500/60 cursor-pointer transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
                  DEMO 3
                </span>
                <span className="text-xs font-bold text-emerald-400 font-mono">PASSPORT (78/100)</span>
              </div>
              <h4 className="text-sm font-semibold text-white group-hover:text-emerald-300 transition-colors flex items-center gap-1.5">
                <CreditCard className="w-4 h-4 text-emerald-400 shrink-0" />
                Credit Passport
              </h4>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                Transparent cash-flow health passport. 12/12 salary, 96% on-time, ±8% stability.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-navy-750 flex items-center justify-between text-xs text-emerald-400 font-medium">
              <span>View Financial DNA</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
