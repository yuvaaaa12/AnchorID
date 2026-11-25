import React, { useState, useEffect } from 'react';
import { Blocks, Search, ExternalLink, Copy, Check, ShieldCheck, Activity } from 'lucide-react';
import Header from '../components/Header';
import api from '../services/api';

export const BlockchainExplorer = () => {
  const [transactions, setTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedTx, setCopiedTx] = useState(null);

  const fetchLedger = async () => {
    setLoading(true);
    try {
      const data = await api.getBlockchainTransactions();
      if (data && data.transactions) {
        setTransactions(data.transactions);
      }
    } catch (err) {
      // Demo on-chain transactions fallback
      setTransactions([
        {
          credentialId: 'CID-2026-RAM-001',
          sha256Hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
          txHash: '0x9b4412df7f2982d137887556f8f17a9425176c12d4a52c7c5b6a7d8e9f0a1b2c',
          blockNumber: 19842109,
          issuerWallet: '0x3E5c731454687b3e0eF694F90fB4764b82d4310E',
          timestamp: '2026-11-24 10:14:02',
          gasFee: '0.0014 ETH',
          status: 'CONFIRMED'
        },
        {
          credentialId: 'CID-2026-RVC-008',
          sha256Hash: '7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069',
          txHash: '0x3a887b2f4c1e48e02d6b7978cf2a1e64d93f773b0a7c4e5f6e8b1d2c3e4a5f6a',
          blockNumber: 19842012,
          issuerWallet: '0x8891d44B9E3A591Fe50f242547b9C47101E7E5b6',
          timestamp: '2026-11-23 16:45:18',
          gasFee: '0.0012 ETH',
          status: 'CONFIRMED'
        },
        {
          credentialId: 'CID-2026-PES-022',
          sha256Hash: 'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad',
          txHash: '0x12c4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4',
          blockNumber: 19841890,
          issuerWallet: '0x1A2B3C4D5E6F7890123456789ABCDEF012345678',
          timestamp: '2026-11-22 09:30:44',
          gasFee: '0.0011 ETH',
          status: 'CONFIRMED'
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLedger();
  }, []);

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedTx(id);
    setTimeout(() => setCopiedTx(null), 2000);
  };

  const handleOpenExplorer = (txHash) => {
    const isElectron = typeof window !== 'undefined' && window.anchorAPI;
    const url = `https://sepolia.etherscan.io/tx/${txHash}`;
    if (isElectron) {
      window.anchorAPI.openExternal(url);
    } else {
      window.open(url, '_blank');
    }
  };

  const filtered = transactions.filter(t => 
    t.credentialId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.txHash.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.sha256Hash.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-anchor-background">
      <Header
        title="Decentralized Blockchain Ledger Explorer"
        subtitle="Direct inspection of cryptographic credential registrations on Ethereum smart contracts"
        onRefresh={fetchLedger}
        loading={loading}
      />

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Top Filter and Search Bar */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-desktop-card p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Filter by Credential ID, Tx Hash, or SHA-256..."
              className="w-full pl-9 pr-4 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-anchor-accent/50"
            />
          </div>

          <div className="flex items-center space-x-3 text-xs text-slate-500">
            <span className="flex items-center gap-1.5 font-semibold text-slate-700">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              Network: Ethereum Hardhat / Sepolia
            </span>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-desktop-card overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
              <Blocks className="w-4 h-4 text-anchor-primary" />
              <span>Immutable Ledger Records ({filtered.length})</span>
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 uppercase tracking-wider text-[10px]">
                  <th className="py-3 px-4 font-bold">Credential Reference</th>
                  <th className="py-3 px-4 font-bold">SHA-256 Anchor</th>
                  <th className="py-3 px-4 font-bold">Transaction Hash</th>
                  <th className="py-3 px-4 font-bold">Block #</th>
                  <th className="py-3 px-4 font-bold">Issuer Wallet</th>
                  <th className="py-3 px-4 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {filtered.map((tx) => (
                  <tr key={tx.credentialId} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 font-bold font-mono text-anchor-secondary">
                      {tx.credentialId}
                    </td>

                    <td className="py-3 px-4 font-mono text-[11px] text-slate-700 max-w-[200px] truncate" title={tx.sha256Hash}>
                      {tx.sha256Hash.slice(0, 16)}...{tx.sha256Hash.slice(-8)}
                    </td>

                    <td className="py-3 px-4 font-mono text-[11px] text-indigo-600 max-w-[180px] truncate" title={tx.txHash}>
                      {tx.txHash.slice(0, 10)}...{tx.txHash.slice(-6)}
                    </td>

                    <td className="py-3 px-4 font-mono text-slate-800">
                      #{tx.blockNumber}
                    </td>

                    <td className="py-3 px-4 font-mono text-[11px] text-slate-500 max-w-[140px] truncate" title={tx.issuerWallet}>
                      {tx.issuerWallet.slice(0, 6)}...{tx.issuerWallet.slice(-4)}
                    </td>

                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end space-x-1.5">
                        <button
                          onClick={() => handleCopy(tx.txHash, tx.credentialId)}
                          className="p-1.5 text-slate-500 hover:text-slate-800 rounded hover:bg-slate-100"
                          title="Copy Tx Hash"
                        >
                          {copiedTx === tx.credentialId ? (
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                        <button
                          onClick={() => handleOpenExplorer(tx.txHash)}
                          className="p-1.5 text-anchor-secondary hover:text-anchor-accent rounded hover:bg-slate-100"
                          title="View on Etherscan"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </button>
                      </div>
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

export default BlockchainExplorer;
