import React, { useState } from 'react';
import { ShieldCheck, Lock, Mail, ArrowRight, Building, Award, UserCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Login = () => {
  const { login, demoLogin, error: authError } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [localError, setLocalError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setLocalError('Please enter both email and password.');
      return;
    }
    setLocalError('');
    setLoading(true);
    try {
      await login(email, password);
    } catch (err) {
      setLocalError(err.message || 'Login failed. Ensure backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full w-full bg-anchor-primary flex items-center justify-center p-6 relative overflow-hidden select-none">
      {/* Background Decorative Rings */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-anchor-secondary/30 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-anchor-accent/10 blur-3xl pointer-events-none" />

      <div className="max-w-md w-full bg-white rounded-2xl shadow-desktop-modal border border-slate-200 overflow-hidden relative z-10">
        {/* Header */}
        <div className="bg-gradient-to-r from-anchor-primary via-anchor-secondary to-anchor-primary p-7 text-center border-b border-slate-800">
          <div className="w-14 h-14 mx-auto rounded-xl bg-gradient-to-br from-anchor-accent to-amber-600 flex items-center justify-center text-anchor-primary font-bold shadow-lg mb-3">
            <ShieldCheck className="w-8 h-8 text-anchor-primary stroke-[2.5]" />
          </div>
          <h2 className="text-xl font-bold text-white tracking-wide">AnchorID Enterprise</h2>
          <p className="text-xs text-anchor-accent font-medium mt-1 tracking-wider uppercase">
            Blockchain Credential Verification Platform
          </p>
        </div>

        {/* Content Body */}
        <div className="p-7 space-y-6">
          {(localError || authError) && (
            <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs">
              {localError || authError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Corporate Email / Username
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@anchorid.network"
                  className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-anchor-accent/50 focus:border-anchor-accent"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-anchor-accent/50 focus:border-anchor-accent"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 bg-anchor-primary hover:bg-anchor-secondary text-white text-xs font-semibold rounded-lg shadow-sm transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              <span>{loading ? 'Authenticating...' : 'Sign In to Workspace'}</span>
              <ArrowRight className="w-4 h-4 text-anchor-accent" />
            </button>
          </form>

          {/* Quick Evaluation Role Switcher */}
          <div className="pt-2 border-t border-slate-200">
            <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider text-center mb-2.5">
              Instant Demonstration Profiles
            </p>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => demoLogin('verifier')}
                className="p-2 border border-slate-200 hover:border-anchor-accent rounded-lg text-center hover:bg-amber-50/50 transition-colors group"
              >
                <UserCheck className="w-4 h-4 mx-auto text-slate-600 group-hover:text-anchor-accent" />
                <span className="block text-[11px] font-bold text-slate-800 mt-1">HR Verifier</span>
                <span className="block text-[9px] text-slate-400">Audit & Verify</span>
              </button>
              <button
                type="button"
                onClick={() => demoLogin('issuer')}
                className="p-2 border border-slate-200 hover:border-anchor-accent rounded-lg text-center hover:bg-amber-50/50 transition-colors group"
              >
                <Award className="w-4 h-4 mx-auto text-slate-600 group-hover:text-anchor-accent" />
                <span className="block text-[11px] font-bold text-slate-800 mt-1">Institution</span>
                <span className="block text-[9px] text-slate-400">Issue & Hash</span>
              </button>
              <button
                type="button"
                onClick={() => demoLogin('admin')}
                className="p-2 border border-slate-200 hover:border-anchor-accent rounded-lg text-center hover:bg-amber-50/50 transition-colors group"
              >
                <Building className="w-4 h-4 mx-auto text-slate-600 group-hover:text-anchor-accent" />
                <span className="block text-[11px] font-bold text-slate-800 mt-1">Administrator</span>
                <span className="block text-[9px] text-slate-400">Governance</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-7 py-3 text-center border-t border-slate-200 text-[11px] text-slate-500">
          Cryptographically secured via Ethereum smart contracts & SHA-256
        </div>
      </div>
    </div>
  );
};

export default Login;
