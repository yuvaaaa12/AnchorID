import React from 'react';
import { Bell, ShieldCheck, RefreshCw } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Header = ({ title, subtitle, onRefresh, loading = false }) => {
  const { user } = useAuth();

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between select-none">
      <div>
        <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
          {title}
        </h2>
        {subtitle && <p className="text-xs text-slate-500">{subtitle}</p>}
      </div>

      <div className="flex items-center space-x-4">
        {onRefresh && (
          <button
            onClick={onRefresh}
            disabled={loading}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors shadow-sm disabled:opacity-50"
            title="Refresh Data"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-slate-500 ${loading ? 'animate-spin' : ''}`} />
            <span>Sync</span>
          </button>
        )}

        <div className="h-6 w-px bg-slate-200" />

        <div className="flex items-center space-x-3">
          <div className="text-right">
            <p className="text-xs font-semibold text-slate-900">{user?.name || 'Administrator'}</p>
            <p className="text-[10px] text-slate-500">{user?.role || 'VERIFIER'} • {user?.institution || 'AnchorID'}</p>
          </div>
          <div className="w-8 h-8 rounded-full bg-anchor-primary text-anchor-accent font-bold flex items-center justify-center text-xs shadow-sm">
            {user?.name ? user.name.charAt(0) : 'A'}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
