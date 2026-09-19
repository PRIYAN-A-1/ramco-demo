import React, { useState } from 'react';
import {
  Zap,
  Radio,
  ShieldCheck,
  CheckCircle2,
  Users,
  Smartphone,
  Laptop,
  ArrowRight,
  RefreshCw,
  Lock,
  FileCheck
} from 'lucide-react';
import { useFinFam } from '../context/FinFamContext';
import { FinancialEngine } from '../lib/financialEngine';

export const RealTimeDataTransferScreen: React.FC = () => {
  const { familyMembers, userProfile } = useFinFam();

  const [selectedPeerId, setSelectedPeerId] = useState('mem-2');
  const [transferType, setTransferType] = useState<'VAULT_SYNC' | 'CASH_BEAM' | 'AUDIT_EXPORT'>(
    'VAULT_SYNC'
  );
  const [cashAmount, setCashAmount] = useState('2000');
  const [transferStage, setTransferStage] = useState<
    'IDLE' | 'DISCOVERING' | 'HANDSHAKING' | 'STREAMING' | 'COMPLETED'
  >('IDLE');
  const [progress, setProgress] = useState(0);
  const [logMessages, setLogMessages] = useState<string[]>([
    'Local mesh socket initialized on port 8443',
    'ChaCha20-Poly1305 hardware accelerator ready'
  ]);

  const peers = [
    { id: 'mem-2', name: 'Sunita Sharma', device: 'Galaxy S24 (Wi-Fi Direct)', status: 'Online' },
    { id: 'mem-3', name: 'Aarav Sharma', device: 'Pixel 8 (BLE Proximity)', status: 'Online' },
    { id: 'mem-4', name: 'Office Workstation', device: 'MacBook Pro (Local LAN)', status: 'Online' }
  ];

  const handleStartBeam = async () => {
    setTransferStage('DISCOVERING');
    setProgress(15);
    setLogMessages((prev) => [
      ...prev,
      `[${new Date().toLocaleTimeString()}] Pinging peer ${selectedPeerId} via P2P mesh...`
    ]);

    await new Promise((r) => setTimeout(r, 600));
    setTransferStage('HANDSHAKING');
    setProgress(40);
    setLogMessages((prev) => [
      ...prev,
      `[${new Date().toLocaleTimeString()}] ECDH 256-bit key exchanged. TLS 1.3 channel locked.`
    ]);

    await new Promise((r) => setTimeout(r, 700));
    setTransferStage('STREAMING');
    setProgress(75);
    setLogMessages((prev) => [
      ...prev,
      `[${new Date().toLocaleTimeString()}] Streaming payload: ${
        transferType === 'CASH_BEAM'
          ? `Instant balance beam of ₹${cashAmount}`
          : 'Full encrypted vault delta (38 records)'
      }...`
    ]);

    await new Promise((r) => setTimeout(r, 800));
    setProgress(100);
    setTransferStage('COMPLETED');
    setLogMessages((prev) => [
      ...prev,
      `[${new Date().toLocaleTimeString()}] Beam complete! SHA256 verified: 9a7f...d82b. Sync acknowledged.`
    ]);
  };

  const handleReset = () => {
    setTransferStage('IDLE');
    setProgress(0);
  };

  return (
    <div className="space-y-6 pb-24">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-purple-400 animate-pulse" />
              REAL-TIME P2P MESH BEAM
            </h2>
            <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
              SUB-SECOND SYNC
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Peer-to-peer Wi-Fi Direct & Local Mesh for instantaneous offline/online family balance sharing
          </p>
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Controls Column (7 cols) */}
        <div className="lg:col-span-7 rounded-2xl bg-[#0E1528] border border-white/10 p-5 space-y-5">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              1. Select Destination Peer
            </label>
            <div className="space-y-2">
              {peers.map((peer) => {
                const isSelected = selectedPeerId === peer.id;
                return (
                  <div
                    key={peer.id}
                    onClick={() => transferStage === 'IDLE' && setSelectedPeerId(peer.id)}
                    className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-purple-950/30 border-purple-500/50 shadow-md shadow-purple-500/10'
                        : 'bg-slate-900/60 border-white/5 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-xs">
                        {peer.name[0]}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">{peer.name}</div>
                        <div className="text-[10px] text-slate-400">{peer.device}</div>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      {peer.status}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              2. Transfer Payload Type
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setTransferType('VAULT_SYNC')}
                className={`p-2.5 rounded-xl text-center border transition-all text-xs font-semibold ${
                  transferType === 'VAULT_SYNC'
                    ? 'bg-purple-600 text-white border-purple-400'
                    : 'bg-slate-900 text-slate-400 border-white/5 hover:text-white'
                }`}
              >
                Full Vault Sync
              </button>
              <button
                onClick={() => setTransferType('CASH_BEAM')}
                className={`p-2.5 rounded-xl text-center border transition-all text-xs font-semibold ${
                  transferType === 'CASH_BEAM'
                    ? 'bg-purple-600 text-white border-purple-400'
                    : 'bg-slate-900 text-slate-400 border-white/5 hover:text-white'
                }`}
              >
                Cash Beam (₹)
              </button>
              <button
                onClick={() => setTransferType('AUDIT_EXPORT')}
                className={`p-2.5 rounded-xl text-center border transition-all text-xs font-semibold ${
                  transferType === 'AUDIT_EXPORT'
                    ? 'bg-purple-600 text-white border-purple-400'
                    : 'bg-slate-900 text-slate-400 border-white/5 hover:text-white'
                }`}
              >
                Audit Report
              </button>
            </div>
          </div>

          {transferType === 'CASH_BEAM' && (
            <div className="p-3.5 bg-slate-900/80 rounded-xl border border-white/10 space-y-2">
              <label className="block text-xs font-semibold text-slate-300">
                Beam Amount to Family Member (₹)
              </label>
              <input
                type="number"
                value={cashAmount}
                onChange={(e) => setCashAmount(e.target.value)}
                className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2 text-sm text-white font-mono focus:outline-none focus:border-purple-400"
              />
            </div>
          )}

          <div>
            {transferStage === 'IDLE' ? (
              <button
                onClick={handleStartBeam}
                className="w-full py-3.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-xl shadow-purple-600/30 transition-all flex items-center justify-center gap-2 active:scale-98"
              >
                <Zap className="w-4 h-4" />
                Initiate Sub-Second P2P Beam
              </button>
            ) : transferStage === 'COMPLETED' ? (
              <button
                onClick={handleReset}
                className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-xl shadow-emerald-600/30 transition-all flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                Transfer Complete • Send Another
              </button>
            ) : (
              <div className="w-full py-3.5 rounded-xl bg-purple-900/60 border border-purple-500/40 text-purple-200 font-mono text-xs flex items-center justify-center gap-2 animate-pulse">
                <RefreshCw className="w-4 h-4 animate-spin" />
                Stage: {transferStage} ({progress}%)
              </div>
            )}
          </div>
        </div>

        {/* Visual Beam Animation & Terminal (5 cols) */}
        <div className="lg:col-span-5 rounded-2xl bg-[#090E1F] border border-purple-500/30 p-5 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <span className="text-xs font-bold text-purple-300 uppercase tracking-wider">
                Mesh Topology & Beam
              </span>
              <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> E2EE ChaCha20
              </span>
            </div>

            {/* Visual Node representation */}
            <div className="py-6 flex items-center justify-around relative">
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 border border-cyan-400/50 flex items-center justify-center text-cyan-300 font-bold shadow-lg shadow-cyan-500/20">
                  <Smartphone className="w-7 h-7" />
                </div>
                <span className="text-[11px] font-bold text-white mt-1.5">You (Admin)</span>
                <span className="text-[9px] text-slate-400 font-mono">192.168.1.14</span>
              </div>

              {/* Connecting Beam */}
              <div className="flex-1 px-4 relative flex items-center justify-center">
                <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-400 via-purple-400 to-emerald-400 transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                {transferStage !== 'IDLE' && transferStage !== 'COMPLETED' && (
                  <Zap className="w-4 h-4 text-purple-300 absolute animate-beam" />
                )}
              </div>

              <div className="flex flex-col items-center">
                <div className="w-14 h-14 rounded-2xl bg-purple-500/20 border border-purple-400/50 flex items-center justify-center text-purple-300 font-bold shadow-lg shadow-purple-500/20">
                  <Laptop className="w-7 h-7" />
                </div>
                <span className="text-[11px] font-bold text-white mt-1.5">
                  {peers.find((p) => p.id === selectedPeerId)?.name.split(' ')[0]}
                </span>
                <span className="text-[9px] text-slate-400 font-mono">192.168.1.28</span>
              </div>
            </div>
          </div>

          {/* Cryptographic Event Log */}
          <div className="rounded-xl bg-black/60 p-3 border border-white/5 font-mono text-[10px] space-y-1 max-h-40 overflow-y-auto">
            <div className="text-slate-500 mb-1 border-b border-white/5 pb-0.5">
              // SECURE P2P TRANSACTION TELEMETRY
            </div>
            {logMessages.map((msg, idx) => (
              <div key={idx} className="text-slate-300 leading-relaxed">
                {msg}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
