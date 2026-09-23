import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, Zap, AlertTriangle, CreditCard, ArrowRight, ShieldCheck } from 'lucide-react';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

export const QuickDemoLauncher: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Card>
      <CardHeader
        title="Judge Showcase Scenarios"
        subtitle="Interactive story demos — one click to walk through each outcome"
        icon={<Zap className="w-5 h-5 text-slate-300" />}
        action={
          <Button
            size="sm"
            variant="secondary"
            leftIcon={<ShieldCheck className="w-4 h-4" />}
            onClick={() => navigate('/check')}
          >
            Custom Payment
          </Button>
        }
      />
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Demo 1 */}
          <div
            onClick={() => navigate('/check?scenario=demo1-scam')}
            className="p-4 rounded-xl bg-navy-850 hover:bg-navy-800 border border-navy-800 hover:border-rose-500/40 cursor-pointer transition-colors group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-[11px] text-slate-500 font-medium">Scenario 1</span>
                <Badge variant="hold" size="sm">HOLD</Badge>
              </div>
              <h4 className="text-sm font-semibold text-white flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0" />
                Hospital Emergency Scam
              </h4>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                An AI voice clone impersonates "Mom" asking for urgent money — PayKavach catches it before you pay.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-navy-800 flex items-center justify-between text-xs text-slate-400 group-hover:text-rose-300 font-medium transition-colors">
              <span>Try demo</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Demo 2 */}
          <div
            onClick={() => navigate('/check?scenario=demo2-cashflow')}
            className="p-4 rounded-xl bg-navy-850 hover:bg-navy-800 border border-navy-800 hover:border-amber-500/40 cursor-pointer transition-colors group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-[11px] text-slate-500 font-medium">Scenario 2</span>
                <Badge variant="warn" size="sm">WARN</Badge>
              </div>
              <h4 className="text-sm font-semibold text-white flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                Smartphone Purchase
              </h4>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                Affordable today, but rent and EMI due in 5 days would leave you ₹8,000 short.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-navy-800 flex items-center justify-between text-xs text-slate-400 group-hover:text-amber-300 font-medium transition-colors">
              <span>Try demo</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Demo 3 */}
          <div
            onClick={() => navigate('/credit-passport')}
            className="p-4 rounded-xl bg-navy-850 hover:bg-navy-800 border border-navy-800 hover:border-emerald-500/40 cursor-pointer transition-colors group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-[11px] text-slate-500 font-medium">Scenario 3</span>
                <Badge variant="pass" size="sm">78/100</Badge>
              </div>
              <h4 className="text-sm font-semibold text-white flex items-center gap-1.5">
                <CreditCard className="w-4 h-4 text-emerald-400 shrink-0" />
                Credit Health Passport
              </h4>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                A transparent, explainable score built from salary regularity and on-time payments.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-navy-800 flex items-center justify-between text-xs text-slate-400 group-hover:text-emerald-300 font-medium transition-colors">
              <span>Try demo</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
