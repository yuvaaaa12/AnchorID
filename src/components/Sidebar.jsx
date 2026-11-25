import React from 'react';
import { 
  LayoutDashboard, 
  FileCheck, 
  Search, 
  UploadCloud, 
  Blocks, 
  History, 
  Users, 
  Settings, 
  LogOut,
  ShieldCheck,
  Building2,
  Award
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Sidebar = ({ activeTab, onTabChange }) => {
  const { user, logout } = useAuth();
  const userRole = user?.role || 'VERIFIER';

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Main Dashboard',
      icon: LayoutDashboard,
      roles: ['ADMIN', 'ISSUER', 'VERIFIER'],
    },
    {
      id: 'verify-id',
      label: 'Verify by ID',
      icon: Search,
      roles: ['ADMIN', 'ISSUER', 'VERIFIER'],
      badge: 'Quick'
    },
    {
      id: 'verify-doc',
      label: 'Verify Document',
      icon: UploadCloud,
      roles: ['ADMIN', 'ISSUER', 'VERIFIER'],
      badge: 'OCR'
    },
    {
      id: 'register',
      label: 'Register Credential',
      icon: Award,
      roles: ['ADMIN', 'ISSUER'],
      badge: 'Issuer'
    },
    {
      id: 'blockchain',
      label: 'Blockchain Explorer',
      icon: Blocks,
      roles: ['ADMIN', 'ISSUER', 'VERIFIER'],
    },
    {
      id: 'history',
      label: 'Verification History',
      icon: History,
      roles: ['ADMIN', 'ISSUER', 'VERIFIER'],
    },
    {
      id: 'users',
      label: 'User Management',
      icon: Users,
      roles: ['ADMIN'],
    },
    {
      id: 'settings',
      label: 'System Settings',
      icon: Settings,
      roles: ['ADMIN', 'ISSUER', 'VERIFIER'],
    },
  ];

  const filteredItems = menuItems.filter(item => item.roles.includes(userRole));

  return (
    <aside className="w-64 bg-anchor-primary text-slate-300 flex flex-col h-full border-r border-slate-800 shadow-xl select-none">
      {/* Brand Section */}
      <div className="p-5 border-b border-slate-800/80 flex items-center space-x-3 bg-anchor-primary">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-anchor-accent to-amber-600 flex items-center justify-center text-anchor-primary font-bold shadow-md">
          <ShieldCheck className="w-6 h-6 text-anchor-primary stroke-[2.5]" />
        </div>
        <div>
          <h1 className="text-base font-bold text-white tracking-wide flex items-center gap-1.5">
            AnchorID
          </h1>
          <p className="text-[11px] text-anchor-accent font-medium tracking-wider">
            BLOCKCHAIN INTEGRITY
          </p>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
          Navigation Modules
        </div>
        {filteredItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-medium transition-all ${
                isActive
                  ? 'bg-anchor-secondary text-white border-l-4 border-anchor-accent shadow-sm'
                  : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-anchor-accent' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${
                  isActive 
                    ? 'bg-anchor-accent/20 text-anchor-accent border border-anchor-accent/30' 
                    : 'bg-slate-800 text-slate-400'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* User Information & Role */}
      <div className="p-3.5 border-t border-slate-800 bg-slate-950/40">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2.5 overflow-hidden">
            <div className="w-8 h-8 rounded-full bg-anchor-secondary flex items-center justify-center text-xs font-bold text-anchor-accent border border-anchor-accent/30">
              {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <div className="truncate">
              <div className="text-xs font-semibold text-slate-200 truncate">
                {user?.name || 'Authorized User'}
              </div>
              <div className="text-[10px] text-slate-400 truncate flex items-center gap-1">
                <Building2 className="w-2.5 h-2.5" />
                {user?.institution || 'Verifier Node'}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-1">
          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-anchor-accent/20 text-anchor-accent border border-anchor-accent/30">
            {userRole}
          </span>
          <button
            onClick={logout}
            className="flex items-center space-x-1 text-[11px] text-slate-400 hover:text-rose-400 transition-colors px-2 py-1 rounded hover:bg-slate-800"
            title="Log Out"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
