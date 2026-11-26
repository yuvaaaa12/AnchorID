import React, { useState, useEffect } from 'react';
import { 
  Award, 
  FileCheck2, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Blocks, 
  Search, 
  UploadCloud, 
  ExternalLink,
  ShieldCheck,
  TrendingUp,
  Activity
} from 'lucide-react';
import Header from '../components/Header';
import { StatCard, Badge } from '../components/Badge';
import api from '../services/api';

export const Dashboard = ({ onNavigate }) => {
  const [stats, setStats] = useState({
    totalRegistered: 142,
    totalVerifications: 890,
    successfulPass: 814,
    failedVerifications: 48,
    tamperedDetected: 28,
    latestBlockNumber: '19,842,109',
    contractAddress: '0x71C8A53E4773539f99B9638E7eF6B6Ce00f2cD95',
  });
  const [recentVerifications, setRecentVerifications] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const data = await api.getDashboardStats();
      if (data) {
        setStats(prev => ({ ...prev, ...data.stats }));
        if (data.recent) setRecentVerifications(data.recent);
      }
    } catch (err) {
      // Fallback demo data if backend is syncing or starting
      setRecentVerifications([
        {
          id: 'VRF-2026-081',
          studentName: 'Aarav Sharma',
          usn: '1MS21CS045',
          institution: 'Ramaiah Institute of Technology',
          verdict: 'PASS',
          timestamp: '10 mins ago',
          hashMatch: true,
          fieldMatch: true,
        },
        {
          id: 'VRF-2026-080',
          studentName: 'Priya Mukherjee',
          usn: '1RV20EC089',
          institution: 'RV College of Engineering',
          verdict: 'TAMPERED',
          timestamp: '28 mins ago',
          hashMatch: false,
          fieldMatch: false,
          note: 'Graduation CGPA altered from 7.42 to 9.20'
        },
        {
          id: 'VRF-2026-079',
          studentName: 'Kunal Verma',
          usn: 'UNKNOWN-772',
          institution: 'Delhi Technological University',
          verdict: 'FAIL',
          timestamp: '1 hour ago',
          hashMatch: false,
          fieldMatch: false,
          note: 'No record registered on blockchain registry'
        },
        {
          id: 'VRF-2026-078',
          studentName: 'Sanya Kapoor',
          usn: '1PE19IS022',
          institution: 'PES University',
          verdict: 'PASS',
          timestamp: '3 hours ago',
          hashMatch: true,
          fieldMatch: true,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-anchor-background">
      <Header 
        title="Executive Overview" 
        subtitle="Real-time cryptographic verification metrics and tamper detection radar"
        onRefresh={fetchDashboardData}
        loading={loading}
      />

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Top Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <StatCard
            title="Registered Credentials"
            value={stats.totalRegistered}
            subtitle="Verified on Ethereum"
            icon={Award}
            variant="primary"
          />
          <StatCard
            title="Total Verifications"
            value={stats.totalVerifications}
            subtitle="Audit requests logged"
            icon={FileCheck2}
            variant="default"
          />
          <StatCard
            title="PASS / Authentic"
            value={stats.successfulPass}
            subtitle={`${((stats.successfulPass / (stats.totalVerifications || 1)) * 100).toFixed(1)}% verified`}
            icon={CheckCircle2}
            variant="success"
          />
          <StatCard
            title="Tampered Certificates"
            value={stats.tamperedDetected}
            subtitle="Integrity breaches caught"
            icon={AlertTriangle}
            variant="tampered"
          />
          <StatCard
            title="Unregistered / FAIL"
            value={stats.failedVerifications}
            subtitle="Record not found"
            icon={XCircle}
            variant="danger"
          />
        </div>

        {/* Quick Action Banner */}
        <div className="bg-gradient-to-r from-anchor-primary via-anchor-secondary to-anchor-primary rounded-xl p-6 text-white shadow-desktop-card flex flex-col md:flex-row items-center justify-between gap-4 border border-slate-800">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-anchor-accent animate-ping" />
              <h3 className="text-base font-bold text-white tracking-wide">
                Instant Verification Dispatcher
              </h3>
            </div>
            <p className="text-xs text-slate-300 max-w-xl">
              Initiate instant multi-vector forensic verification. Choose between rapid USN/Credential ID database lookup or AI-powered OCR document inspection with SHA-256 binary validation.
            </p>
          </div>
          <div className="flex items-center space-x-3 w-full md:w-auto">
            <button
              onClick={() => onNavigate('verify-id')}
              className="flex-1 md:flex-initial flex items-center justify-center space-x-2 px-4 py-2.5 rounded-lg bg-anchor-accent hover:bg-anchor-accent-hover text-anchor-primary font-bold text-xs shadow-md transition-all"
            >
              <Search className="w-4 h-4 stroke-[2.5]" />
              <span>Verify by ID</span>
            </button>
            <button
              onClick={() => onNavigate('verify-doc')}
              className="flex-1 md:flex-initial flex items-center justify-center space-x-2 px-4 py-2.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-white font-medium text-xs border border-slate-700 shadow-md transition-all"
            >
              <UploadCloud className="w-4 h-4 text-anchor-accent" />
              <span>Upload Certificate</span>
            </button>
          </div>
        </div>

        {/* Main 2-Column Section: Recent Verifications & Blockchain Ledger Status */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Recent Activity Stream (2 cols) */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-desktop-card p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h4 className="text-sm font-bold text-slate-900 tracking-tight">
                  Recent Verification Activity
                </h4>
                <p className="text-xs text-slate-500">Live feed of processed certificates and verdicts</p>
              </div>
              <button
                onClick={() => onNavigate('history')}
                className="text-xs font-semibold text-anchor-secondary hover:text-anchor-accent transition-colors flex items-center gap-1"
              >
                <span>View Full Audit Log</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[10px]">
                    <th className="py-2.5 px-3">Verification ID</th>
                    <th className="py-2.5 px-3">Candidate / USN</th>
                    <th className="py-2.5 px-3">Issuing Body</th>
                    <th className="py-2.5 px-3 text-center">Hash Integrity</th>
                    <th className="py-2.5 px-3 text-center">Verdict</th>
                    <th className="py-2.5 px-3 text-right">Timestamp</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {recentVerifications.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-3 font-mono font-semibold text-anchor-secondary">
                        {item.id}
                      </td>
                      <td className="py-3 px-3">
                        <div className="font-bold text-slate-900">{item.studentName}</div>
                        <div className="text-[10px] text-slate-500 font-mono">{item.usn}</div>
                      </td>
                      <td className="py-3 px-3 text-slate-600 truncate max-w-[180px]">
                        {item.institution}
                      </td>
                      <td className="py-3 px-3 text-center">
                        <span className={`inline-block w-2.5 h-2.5 rounded-full ${item.hashMatch ? 'bg-emerald-500' : 'bg-rose-500'}`} title={item.hashMatch ? "Exact SHA-256 Match" : "Hash Altered"} />
                      </td>
                      <td className="py-3 px-3 text-center">
                        <Badge type={item.verdict} size="sm" />
                      </td>
                      <td className="py-3 px-3 text-right text-slate-500 text-[11px]">
                        {item.timestamp}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right: Blockchain Network & Forensic Summary */}
          <div className="space-y-6">
            {/* Blockchain State Card */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-desktop-card p-5 space-y-4">
              <div className="flex items-center space-x-3 border-b border-slate-100 pb-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center">
                  <Blocks className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Ethereum Ledger Status</h4>
                  <p className="text-[11px] text-slate-500">Decentralized Anchor Registry</p>
                </div>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between items-center py-1 border-b border-slate-100">
                  <span className="text-slate-500">Ledger Network:</span>
                  <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    Hardhat Local / Sepolia
                  </span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-slate-100">
                  <span className="text-slate-500">Registry Contract:</span>
                  <span className="font-mono text-[11px] text-anchor-secondary font-semibold" title={stats.contractAddress}>
                    {stats.contractAddress.slice(0, 10)}...{stats.contractAddress.slice(-6)}
                  </span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-slate-100">
                  <span className="text-slate-500">Latest Mined Block:</span>
                  <span className="font-mono font-semibold text-slate-900">#{stats.latestBlockNumber}</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-slate-500">Cryptographic Standard:</span>
                  <span className="font-semibold text-slate-800">SHA-256 (256-bit Digest)</span>
                </div>
              </div>

              <button
                onClick={() => onNavigate('blockchain')}
                className="w-full py-2 px-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-xs font-semibold text-anchor-secondary transition-colors text-center block"
              >
                Inspect Ledger Registry
              </button>
            </div>

            {/* Verification Logic Guide */}
            <div className="bg-anchor-secondary/5 rounded-xl border border-anchor-secondary/20 p-4 space-y-2 text-xs">
              <div className="flex items-center space-x-2 text-anchor-secondary font-bold">
                <ShieldCheck className="w-4 h-4 text-anchor-accent" />
                <span>Verdict Architecture</span>
              </div>
              <ul className="space-y-1.5 text-[11px] text-slate-600">
                <li className="flex items-start gap-1.5">
                  <span className="font-bold text-emerald-600">PASS:</span>
                  <span>Registered record found, on-chain hash valid, and fields match.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="font-bold text-amber-600">TAMPERED:</span>
                  <span>Record exists, but document binary or OCR fields show alterations.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="font-bold text-rose-600">FAIL:</span>
                  <span>Credential ID or USN is unregistered on both DB and blockchain.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
