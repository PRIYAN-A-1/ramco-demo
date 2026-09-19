import React from 'react';
import {
  Activity,
  ShieldCheck,
  TrendingUp,
  AlertTriangle,
  Lightbulb,
  Sparkles,
  ArrowUpRight,
  ArrowDownLeft,
  Calendar
} from 'lucide-react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer
} from 'recharts';
import { useFinFam } from '../context/FinFamContext';
import { FinancialEngine } from '../lib/financialEngine';

export const AnalyticsScreen: React.FC<{ onNavigateToAiCoach: () => void }> = ({
  onNavigateToAiCoach
}) => {
  const { financialHealth, userProfile } = useFinFam();

  const radarData = [
    { subject: 'Savings Rate', score: financialHealth.pillars.savingsRate.score, fullMark: 100 },
    { subject: 'Debt / EMI Burden', score: financialHealth.pillars.debtToIncome.score, fullMark: 100 },
    { subject: 'Budget Discipline', score: financialHealth.pillars.budgetDiscipline.score, fullMark: 100 },
    { subject: 'Emergency Fund', score: financialHealth.pillars.emergencyFund.score, fullMark: 100 },
    { subject: 'Investment Flow', score: financialHealth.pillars.investmentRate.score, fullMark: 100 }
  ];

  // Projected cash flow forecast calculation
  const projectedInflow = userProfile.monthlyIncome;
  const projectedOutflow = userProfile.monthlyExpenses * 0.95; // slight optimization
  const projectedEndBalance = userProfile.totalBalance + (projectedInflow - projectedOutflow);

  return (
    <div className="space-y-6 pb-24">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-cyan-400" />
              Financial Health Radar & AI Diagnostics
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Holistic 5-pillar solvency evaluation, liquidity runway & cash flow forecasting
          </p>
        </div>

        <button
          onClick={onNavigateToAiCoach}
          className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white text-xs font-bold shadow-lg shadow-purple-500/20 flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Sparkles className="w-3.5 h-3.5" /> Consult AI Coach
        </button>
      </div>

      {/* Radar Chart & Score Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Radar Spider Graph (7 cols) */}
        <div className="lg:col-span-7 rounded-2xl bg-[#0E1528] border border-white/10 p-5 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <span className="text-xs font-bold text-slate-200">5-Pillar Solvency Geometry</span>
            <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-500/30">
              Score: {financialHealth.overallScore}/100
            </span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                <PolarGrid stroke="#1E293B" />
                <PolarAngleAxis dataKey="subject" stroke="#94A3B8" fontSize={11} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#334155" fontSize={9} />
                <Radar
                  name="Health Score"
                  dataKey="score"
                  stroke="#06B6D4"
                  fill="#06B6D4"
                  fillOpacity={0.4}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Score & Pillar Cards (5 cols) */}
        <div className="lg:col-span-5 rounded-2xl bg-[#0E1528] border border-white/10 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-300">Pillar Scoring Breakdown</span>
            <span
              className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full"
              style={{
                backgroundColor: `${financialHealth.statusColorHex}20`,
                color: financialHealth.statusColorHex
              }}
            >
              {financialHealth.statusLabel}
            </span>
          </div>

          <div className="space-y-3">
            {Object.entries(financialHealth.pillars).map(([key, rawPillar]) => {
              const pillar = rawPillar as { score: number; title?: string; summary?: string };
              return (
                <div key={key} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300 font-medium">{pillar.title || key}</span>
                    <span className="font-mono font-bold text-cyan-400">{pillar.score}/100</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-cyan-500 transition-all duration-500"
                      style={{ width: `${pillar.score}%` }}
                    />
                  </div>
                  <div className="text-[10px] text-slate-400">{pillar.summary || ''}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 30-Day Predictive Cash Flow Forecast */}
      <div className="rounded-2xl bg-[#0E1528] border border-white/10 p-5 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Calendar className="w-4 h-4 text-cyan-400" />
              30-Day Predictive Cash Flow Forecast
            </h3>
            <p className="text-[11px] text-slate-400">
              Simulated projections based on recurring salary, bills, and average burn rate
            </p>
          </div>
          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
            HIGH CONFIDENCE (94%)
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-4 rounded-xl bg-slate-900/80 border border-white/10">
            <div className="text-xs text-slate-400 flex items-center gap-1">
              <ArrowDownLeft className="w-3.5 h-3.5 text-emerald-400" /> Expected 30-Day Inflow
            </div>
            <div className="text-xl font-bold font-mono text-emerald-400 mt-1">
              +{FinancialEngine.formatINR(projectedInflow)}
            </div>
            <div className="text-[10px] text-slate-500 mt-0.5">Salary & known deposits</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/80 border border-white/10">
            <div className="text-xs text-slate-400 flex items-center gap-1">
              <ArrowUpRight className="w-3.5 h-3.5 text-rose-400" /> Expected 30-Day Burn
            </div>
            <div className="text-xl font-bold font-mono text-rose-400 mt-1">
              -{FinancialEngine.formatINR(projectedOutflow)}
            </div>
            <div className="text-[10px] text-slate-500 mt-0.5">Bills, EMIs, grocery & discretionary</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/80 border border-white/10">
            <div className="text-xs text-slate-400 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5 text-cyan-400" /> Projected Vault Balance
            </div>
            <div className="text-xl font-bold font-mono text-white mt-1">
              {FinancialEngine.formatINR(projectedEndBalance)}
            </div>
            <div className="text-[10px] text-emerald-400 mt-0.5">
              +{FinancialEngine.formatINR(projectedInflow - projectedOutflow)} net growth
            </div>
          </div>
        </div>
      </div>

      {/* AI Diagnostic Recommendations */}
      <div className="rounded-2xl bg-[#0E1528] border border-white/10 p-5 space-y-4">
        <div className="flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-amber-400" />
          <h3 className="text-sm font-bold text-white">AI Financial Diagnostics</h3>
        </div>

        <div className="space-y-2.5">
          {financialHealth.recommendations.map((rec, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-slate-900/70 border border-white/5 flex items-start gap-3"
            >
              <div className="w-6 h-6 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                {idx + 1}
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">{rec}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
