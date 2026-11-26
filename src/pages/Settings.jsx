import React, { useState } from 'react';
import { Settings as SettingsIcon, Server, Blocks, Sliders, CheckCircle2, Shield, Info } from 'lucide-react';
import Header from '../components/Header';

export const Settings = () => {
  const [apiUrl, setApiUrl] = useState(
    localStorage.getItem('anchorid_api_url') || 'http://localhost:5000/api'
  );
  const [rpcUrl, setRpcUrl] = useState(
    localStorage.getItem('anchorid_rpc_url') || 'http://localhost:8545'
  );
  const [contractAddress, setContractAddress] = useState(
    localStorage.getItem('anchorid_contract_address') || '0x71C8A53E4773539f99B9638E7eF6B6Ce00f2cD95'
  );
  const [ocrTolerance, setOcrTolerance] = useState('0.85');
  const [savedNotice, setSavedNotice] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    localStorage.setItem('anchorid_api_url', apiUrl);
    localStorage.setItem('anchorid_rpc_url', rpcUrl);
    localStorage.setItem('anchorid_contract_address', contractAddress);
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-anchor-background">
      <Header
        title="System Infrastructure & Network Settings"
        subtitle="Configure backend REST endpoints, Ethereum RPC providers, and forensic OCR thresholds"
      />

      <div className="flex-1 overflow-y-auto p-6 max-w-4xl w-full mx-auto space-y-6">
        {savedNotice && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Settings saved successfully. Configuration updated for active session.</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-6">
          {/* API Gateway Configuration */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-desktop-card p-6 space-y-4">
            <div className="flex items-center space-x-3 border-b border-slate-100 pb-3">
              <Server className="w-5 h-5 text-anchor-primary" />
              <div>
                <h3 className="text-sm font-bold text-slate-900">Backend API Gateway</h3>
                <p className="text-xs text-slate-500">Node.js Express REST API server host</p>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <label className="block font-semibold text-slate-700">
                REST Endpoint URL
              </label>
              <input
                type="text"
                value={apiUrl}
                onChange={(e) => setApiUrl(e.target.value)}
                placeholder="http://localhost:5000/api"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-anchor-accent/50 font-mono"
              />
              <p className="text-[11px] text-slate-500">
                Default: http://localhost:5000/api
              </p>
            </div>
          </div>

          {/* Blockchain Node & Contract */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-desktop-card p-6 space-y-4">
            <div className="flex items-center space-x-3 border-b border-slate-100 pb-3">
              <Blocks className="w-5 h-5 text-anchor-primary" />
              <div>
                <h3 className="text-sm font-bold text-slate-900">Ethereum Blockchain Node & Registry</h3>
                <p className="text-xs text-slate-500">Smart contract registry connection parameters</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  JSON-RPC Provider URL
                </label>
                <input
                  type="text"
                  value={rpcUrl}
                  onChange={(e) => setRpcUrl(e.target.value)}
                  placeholder="http://localhost:8545"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-anchor-accent/50 font-mono"
                />
                <p className="text-[11px] text-slate-500 mt-1">
                  Local Hardhat node or Sepolia testnet URL
                </p>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  AnchorID Smart Contract Address
                </label>
                <input
                  type="text"
                  value={contractAddress}
                  onChange={(e) => setContractAddress(e.target.value)}
                  placeholder="0x..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-anchor-accent/50 font-mono"
                />
                <p className="text-[11px] text-slate-500 mt-1">
                  Deployed AnchorIDCredentialRegistry address
                </p>
              </div>
            </div>
          </div>

          {/* Forensic OCR Thresholds */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-desktop-card p-6 space-y-4">
            <div className="flex items-center space-x-3 border-b border-slate-100 pb-3">
              <Sliders className="w-5 h-5 text-anchor-primary" />
              <div>
                <h3 className="text-sm font-bold text-slate-900">OCR & Document Forensic Sensitivity</h3>
                <p className="text-xs text-slate-500">Configure text fuzzy-matching confidence threshold</p>
              </div>
            </div>

            <div className="text-xs space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-slate-700">Fuzzy Match Similarity Threshold:</span>
                <span className="font-mono font-bold text-anchor-secondary">{(parseFloat(ocrTolerance) * 100).toFixed(0)}%</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="1.0"
                step="0.05"
                value={ocrTolerance}
                onChange={(e) => setOcrTolerance(e.target.value)}
                className="w-full accent-anchor-primary cursor-pointer"
              />
              <p className="text-[11px] text-slate-500">
                Higher values enforce stricter character matching between uploaded documents and original master records.
              </p>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 bg-anchor-primary hover:bg-anchor-secondary text-white font-bold text-xs rounded-lg shadow-md transition-all"
            >
              Save Configuration
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;
