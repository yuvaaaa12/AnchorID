import React, { useState, useEffect } from 'react';
import { History, Search, Filter, FileText, CheckCircle2, XCircle, AlertTriangle, Download } from 'lucide-react';
import Header from '../components/Header';
import { Badge } from '../components/Badge';
import api from '../services/api';

export const VerificationHistory = ({ onNavigate, onSelectResult }) => {
  const [history, setHistory] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [verdictFilter, setVerdictFilter] = useState('ALL');
  const [loading, setLoading] = useState(false);

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const data = await api.getVerificationHistory();
      if (data && data.logs) {
        setHistory(data.logs);
      }
    } catch (err) {
      // Demo log history fallback
      setHistory([
        {
          id: 'VRF-2026-081',
          date: '2026-11-24 10:45',
          verifier: 'Elena Rostova (Vertex Corp)',
          credentialId: 'CID-2026-RAM-001',
          studentName: 'Aarav Sharma',
          institution: 'Ramaiah Institute of Technology',
          verdict: 'PASS',
          hashMatch: true,
          fieldMatch: true,
        },
        {
          id: 'VRF-2026-080',
          date: '2026-11-24 09:30',
          verifier: 'Elena Rostova (Vertex Corp)',
          credentialId: 'CID-2026-RVC-008',
          studentName: 'Priya Mukherjee',
          institution: 'RV College of Engineering',
          verdict: 'TAMPERED',
          hashMatch: false,
          fieldMatch: false,
        },
        {
          id: 'VRF-2026-079',
          date: '2026-11-23 15:12',
          verifier: 'Mark Spencer (HR Deloitte)',
          credentialId: 'UNKNOWN-999',
          studentName: 'Kunal Verma',
          institution: 'Delhi Technological University',
          verdict: 'FAIL',
          hashMatch: false,
          fieldMatch: false,
        },
        {
          id: 'VRF-2026-078',
          date: '2026-11-23 11:20',
          verifier: 'Sarah Connor (Admin)',
          credentialId: 'CID-2026-PES-022',
          studentName: 'Sanya Kapoor',
          institution: 'PES University',
          verdict: 'PASS',
          hashMatch: true,
          fieldMatch: true,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const filteredLogs = history.filter(item => {
    const matchesSearch = 
      item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.credentialId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = verdictFilter === 'ALL' || item.verdict === verdictFilter;
    return matchesSearch && matchesFilter;
  });

  const handleInspect = (item) => {
    if (onSelectResult) {
      onSelectResult({
        verdict: item.verdict,
        hashMatch: item.hashMatch,
        fieldMatch: item.fieldMatch,
        originalRecord: {
          credentialId: item.credentialId,
          studentName: item.studentName,
          institution: item.institution,
          usn: item.credentialId,
          graduationYear: 2025,
          blockchainTx: '0x9b4412df7f2982d137887556f8f17a9425176c12d4a52c7c5b6a7d8e9f0a1b2c',
          blockNumber: 19842109,
        },
        comparisonDetails: [
          { field: 'Student Name', uploaded: item.studentName, original: item.studentName, match: item.verdict !== 'TAMPERED' },
          { field: 'Credential Reference', uploaded: item.credentialId, original: item.credentialId, match: true },
          { field: 'Institution', uploaded: item.institution, original: item.institution, match: true },
        ]
      });
      onNavigate('result');
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-anchor-background">
      <Header
        title="Verification Audit Trail & History"
        subtitle="Immutable timestamped log of all credential verification requests and forensic verdicts"
        onRefresh={fetchHistory}
        loading={loading}
      />

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Search & Filter Bar */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-desktop-card p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search candidate name, ID, or ref..."
              className="w-full pl-9 pr-4 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-anchor-accent/50"
            />
          </div>

          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <span className="text-xs font-semibold text-slate-500">Filter Verdict:</span>
            {['ALL', 'PASS', 'TAMPERED', 'FAIL'].map((filter) => (
              <button
                key={filter}
                onClick={() => setVerdictFilter(filter)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  verdictFilter === filter
                    ? 'bg-anchor-primary text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* History Table */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-desktop-card overflow-hidden">
          <div className="p-4 border-b border-slate-100">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
              <History className="w-4 h-4 text-anchor-primary" />
              <span>Audit Records ({filteredLogs.length})</span>
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 uppercase tracking-wider text-[10px]">
                  <th className="py-3 px-4 font-bold">Verification ID</th>
                  <th className="py-3 px-4 font-bold">Date & Time</th>
                  <th className="py-3 px-4 font-bold">Initiated By</th>
                  <th className="py-3 px-4 font-bold">Candidate / ID</th>
                  <th className="py-3 px-4 font-bold">Institution</th>
                  <th className="py-3 px-4 font-bold text-center">Verdict</th>
                  <th className="py-3 px-4 font-bold text-right">Dossier</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-anchor-secondary">
                      {log.id}
                    </td>

                    <td className="py-3 px-4 text-slate-500 text-[11px]">
                      {log.date}
                    </td>

                    <td className="py-3 px-4 text-slate-700">
                      {log.verifier}
                    </td>

                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-900">{log.studentName}</div>
                      <div className="text-[10px] text-slate-500 font-mono">{log.credentialId}</div>
                    </td>

                    <td className="py-3 px-4 text-slate-600 truncate max-w-[180px]">
                      {log.institution}
                    </td>

                    <td className="py-3 px-4 text-center">
                      <Badge type={log.verdict} size="sm" />
                    </td>

                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => handleInspect(log)}
                        className="px-3 py-1 bg-slate-100 hover:bg-anchor-secondary hover:text-white rounded text-xs font-semibold text-slate-700 transition-colors inline-flex items-center gap-1"
                      >
                        <FileText className="w-3 h-3" />
                        <span>Inspect</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerificationHistory;
