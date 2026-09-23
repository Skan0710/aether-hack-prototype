import React from 'react';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { CashFlowDetail } from '../../types/payment';
import { formatINR } from '../../utils/formatCurrency';
import { AlertTriangle, TrendingDown, Calendar } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Cell,
} from 'recharts';

interface CashFlowVisualizerProps {
  cashFlow: CashFlowDetail;
}

export const CashFlowVisualizer: React.FC<CashFlowVisualizerProps> = ({ cashFlow }) => {
  const chartData = [
    {
      name: 'Current Balance',
      amount: cashFlow.currentBalance, // 48,500
      type: 'balance',
    },
    {
      name: 'This Purchase',
      amount: -cashFlow.paymentAmount, // -30,000
      type: 'expense',
    },
    {
      name: 'Post-Purchase',
      amount: cashFlow.currentBalance - cashFlow.paymentAmount, // 18,500
      type: 'balance',
    },
    {
      name: 'Due in 5 Days',
      amount: -cashFlow.obligationsTotal, // -26,500
      type: 'obligation',
    },
    {
      name: 'Projected Deficit',
      amount: -cashFlow.shortfall, // -8,000
      type: 'shortfall',
    },
  ];

  return (
    <Card className="border-amber-500/25">
      <CardHeader
        title="Cash-Flow Foresight"
        subtitle="What your balance looks like before your next salary credit"
        icon={<TrendingDown className="w-5 h-5 text-amber-400" />}
        action={
          <span className="text-xs px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/25 font-semibold">
            Short by {formatINR(cashFlow.shortfall)}
          </span>
        }
      />
      <CardContent className="space-y-6">
        {/* Core Shortfall Callout Banner */}
        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <p className="text-sm text-slate-200 leading-relaxed">
            "You can afford this today, but rent and your EMI are due in 5 days — you'd be short by <strong className="text-white">₹{cashFlow.shortfall.toLocaleString('en-IN')}</strong>. Salary lands on the 1st: buy then, or split it?"
          </p>
        </div>

        {/* 4 Key Financial Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 rounded-xl bg-navy-850 border border-navy-800">
            <span className="text-[11px] text-slate-500">Today's Balance</span>
            <p className="text-sm font-semibold text-white mt-1">
              {formatINR(cashFlow.currentBalance)}
            </p>
          </div>
          <div className="p-3 rounded-xl bg-navy-850 border border-navy-800">
            <span className="text-[11px] text-slate-500">After Purchase</span>
            <p className="text-sm font-semibold text-slate-200 mt-1">
              {formatINR(cashFlow.currentBalance - cashFlow.paymentAmount)}
            </p>
          </div>
          <div className="p-3 rounded-xl bg-navy-850 border border-navy-800">
            <span className="text-[11px] text-slate-500">5-Day Obligations</span>
            <p className="text-sm font-semibold text-amber-300 mt-1">
              {formatINR(cashFlow.obligationsTotal)}
            </p>
          </div>
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/25">
            <span className="text-[11px] text-rose-300/80 font-medium">Net Shortfall</span>
            <p className="text-sm font-bold text-rose-400 mt-1">
              -{formatINR(cashFlow.shortfall)}
            </p>
          </div>
        </div>

        {/* Liquidity Waterfall Bar Chart */}
        <div className="p-4 rounded-xl bg-navy-850/60 border border-navy-800 space-y-2">
          <div className="text-xs font-medium text-slate-300 flex items-center justify-between">
            <span>Projected balance trajectory</span>
            <span className="text-[11px] text-slate-500">Salary arrives in 8 days (1st)</span>
          </div>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 15, right: 10, left: -10, bottom: 5 }}>
                <XAxis
                  dataKey="name"
                  stroke="#64748b"
                  fontSize={11}
                  tickLine={false}
                  axisLine={{ stroke: '#1e293b' }}
                />
                <YAxis
                  stroke="#64748b"
                  fontSize={10}
                  tickLine={false}
                  axisLine={{ stroke: '#1e293b' }}
                  tickFormatter={(val) => `₹${Math.abs(val) / 1000}k`}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-navy-900 border border-navy-750 p-2.5 rounded-lg shadow-soft-lg text-xs">
                          <p className="text-slate-300 font-medium">{data.name}</p>
                          <p className={`font-bold mt-1 ${data.amount < 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
                            {formatINR(data.amount)}
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <ReferenceLine y={0} stroke="#ef4444" strokeDasharray="3 3" />
                <Bar dataKey="amount" radius={[4, 4, 0, 0]}>
                  {chartData.map((entry, index) => {
                    let fill = '#10b981'; // emerald
                    if (entry.type === 'expense') fill = '#f43f5e'; // rose
                    if (entry.type === 'obligation') fill = '#f59e0b'; // amber
                    if (entry.type === 'shortfall') fill = '#ef4444'; // red
                    return <Cell key={`cell-${index}`} fill={fill} />;
                  })}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Timeline Horizon */}
        <div className="space-y-2">
          <div className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>Horizon to Next Salary Credit</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-lg bg-navy-850 border border-navy-800">
              <span className="text-slate-400 font-semibold">Step 1: Today</span>
              <p className="text-slate-200 mt-1 font-medium">₹30,000 at Croma</p>
              <p className="text-[11px] text-slate-400">Leaves ₹18,500 cash in account</p>
            </div>
            <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30">
              <span className="text-amber-400 font-semibold">Step 2: In 5 Days</span>
              <p className="text-slate-200 mt-1 font-medium">₹26,500 Scheduled Bills</p>
              <p className="text-[11px] text-amber-300">Deficit of -₹8,000 hits account</p>
            </div>
            <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
              <span className="text-emerald-400 font-semibold">Step 3: 1st of Month</span>
              <p className="text-slate-200 mt-1 font-medium">Salary Credited</p>
              <p className="text-[11px] text-emerald-300">Safe, fully funded purchase window</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
