import React, { useState } from 'react';
import {
  User,
  Shield,
  CreditCard,
  Bell,
  Fingerprint,
  Users,
  CheckCircle,
  LogOut,
  ChevronRight,
  Sparkles,
  Scale
} from 'lucide-react';
import { useFinFam } from '../context/FinFamContext';
import { FinancialEngine } from '../lib/financialEngine';

export const ProfileScreen: React.FC<{
  onNavigateToDecisionOptimizer?: () => void;
  onNavigateToSubscription?: () => void;
}> = ({ onNavigateToDecisionOptimizer, onNavigateToSubscription }) => {
  const { userProfile, familyMembers, updateProfile } = useFinFam();

  const [isBiometricEnabled, setIsBiometricEnabled] = useState(true);
  const [isPushAlertsEnabled, setIsPushAlertsEnabled] = useState(true);
  const [isEditingName, setIsEditingName] = useState(false);
  const [userName, setUserName] = useState(userProfile.name);

  const handleSaveName = () => {
    updateProfile({ name: userName });
    setIsEditingName(false);
  };

  return (
    <div className="space-y-6 pb-28">
      {/* Header Profile Card */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-[#0B1530] via-[#0E1B42] to-[#122256] border border-cyan-500/30 shadow-2xl relative overflow-hidden space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-cyan-500 flex items-center justify-center font-bold text-2xl text-[#050816] shadow-lg shadow-cyan-500/30">
              {userProfile.name.split(' ').map((n) => n[0]).join('')}
            </div>

            <div>
              {isEditingName ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="bg-[#050816] border border-cyan-500/50 rounded-lg px-2.5 py-1 text-sm text-white font-bold"
                  />
                  <button
                    onClick={handleSaveName}
                    className="px-2 py-1 bg-cyan-500 text-[#050816] rounded-lg text-xs font-bold"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <h2
                  onClick={() => setIsEditingName(true)}
                  className="text-xl font-black text-white cursor-pointer hover:text-cyan-300 transition-colors flex items-center gap-2"
                  title="Click to edit"
                >
                  {userProfile.name}
                  <span className="text-[10px] text-slate-400 font-normal underline">edit</span>
                </h2>
              )}
              <div className="text-xs text-slate-400 mt-0.5">{userProfile.email}</div>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30">
                  {userProfile.familyName}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-bold border border-purple-500/30">
                  Tier: {userProfile.premiumTier || 'FREE'}
                </span>
              </div>
            </div>
          </div>

          <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 pt-3 sm:pt-0 border-white/10">
            <div className="text-[10px] text-slate-400">Total Net Worth</div>
            <div className="text-xl font-black font-mono text-cyan-400">
              {FinancialEngine.formatINR(userProfile.totalBalance)}
            </div>
          </div>
        </div>
      </div>

      {/* AIML 04 Quick Banner */}
      {onNavigateToDecisionOptimizer && (
        <div
          onClick={onNavigateToDecisionOptimizer}
          className="p-4 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-blue-950/30 to-purple-950/40 border border-cyan-500/30 hover:border-cyan-400 cursor-pointer transition-all flex items-center justify-between group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white flex items-center gap-1.5">
                <span>Multi-Criteria Decision Optimizer</span>
                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300">NEW</span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Evaluate financial trade-offs (WSM model, sensitivity analysis & confidence scoring).
              </p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-cyan-400 group-hover:translate-x-1 transition-transform" />
        </div>
      )}

      {/* Security & Preferences Section */}
      <div className="p-5 rounded-2xl bg-[#0E1528] border border-white/10 space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Shield className="w-4 h-4 text-cyan-400" />
          Security & Biometrics
        </h3>

        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 rounded-xl bg-[#050816] border border-white/5">
            <div className="flex items-center gap-3">
              <Fingerprint className="w-5 h-5 text-cyan-400" />
              <div>
                <div className="text-xs font-semibold text-white">Biometric Vault Authentication</div>
                <div className="text-[10px] text-slate-400">Require Touch ID / Face ID for payments & transfers</div>
              </div>
            </div>
            <button
              onClick={() => setIsBiometricEnabled(!isBiometricEnabled)}
              className={`w-11 h-6 rounded-full transition-colors relative ${
                isBiometricEnabled ? 'bg-cyan-500' : 'bg-slate-700'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform absolute top-1 ${
                  isBiometricEnabled ? 'right-1' : 'left-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-[#050816] border border-white/5">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-indigo-400" />
              <div>
                <div className="text-xs font-semibold text-white">Smart Push Notifications</div>
                <div className="text-[10px] text-slate-400">Bill reminders & high-urgency budget anomaly pings</div>
              </div>
            </div>
            <button
              onClick={() => setIsPushAlertsEnabled(!isPushAlertsEnabled)}
              className={`w-11 h-6 rounded-full transition-colors relative ${
                isPushAlertsEnabled ? 'bg-cyan-500' : 'bg-slate-700'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform absolute top-1 ${
                  isPushAlertsEnabled ? 'right-1' : 'left-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Household Members Overview */}
      <div className="p-5 rounded-2xl bg-[#0E1528] border border-white/10 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Users className="w-4 h-4 text-cyan-400" />
            Family Members ({familyMembers.length})
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {familyMembers.map((m) => (
            <div
              key={m.id}
              className="p-3 rounded-xl bg-[#050816] border border-white/5 flex items-center justify-between"
            >
              <div className="flex items-center gap-2.5">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs text-white"
                  style={{ backgroundColor: m.avatarColorHex || m.avatarColor || '#06B6D4' }}
                >
                  {m.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <div>
                  <div className="text-xs font-bold text-white">{m.name}</div>
                  <div className="text-[10px] text-slate-400">{m.role}</div>
                </div>
              </div>

              <div className="text-right text-[11px] font-mono text-cyan-400">
                +{FinancialEngine.formatINR(m.monthlyContribution)}/mo
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
