import React from 'react';
import { CheckCircle2, XCircle, AlertTriangle, Clock, Shield } from 'lucide-react';

export const Badge = ({ type, text, size = 'md' }) => {
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-[10px]',
    md: 'px-2.5 py-1 text-xs',
    lg: 'px-3 py-1.5 text-sm font-semibold',
  };

  switch (type?.toUpperCase()) {
    case 'PASS':
    case 'SUCCESS':
    case 'VERIFIED':
      return (
        <span className={`inline-flex items-center gap-1 rounded-full font-medium bg-emerald-50 text-emerald-700 border border-emerald-300 ${sizeClasses[size]}`}>
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>{text || 'PASS'}</span>
        </span>
      );

    case 'TAMPERED':
    case 'ALTERED':
    case 'WARNING':
      return (
        <span className={`inline-flex items-center gap-1 rounded-full font-medium bg-amber-50 text-amber-800 border border-amber-300 ${sizeClasses[size]}`}>
          <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
          <span>{text || 'TAMPERED'}</span>
        </span>
      );

    case 'FAIL':
    case 'FORGERY':
    case 'INVALID':
    case 'DANGER':
      return (
        <span className={`inline-flex items-center gap-1 rounded-full font-medium bg-rose-50 text-rose-700 border border-rose-300 ${sizeClasses[size]}`}>
          <XCircle className="w-3.5 h-3.5 text-rose-600" />
          <span>{text || 'FAIL'}</span>
        </span>
      );

    case 'PENDING':
      return (
        <span className={`inline-flex items-center gap-1 rounded-full font-medium bg-slate-100 text-slate-700 border border-slate-300 ${sizeClasses[size]}`}>
          <Clock className="w-3.5 h-3.5 text-slate-500 animate-spin" />
          <span>{text || 'PENDING'}</span>
        </span>
      );

    case 'BLOCKCHAIN':
      return (
        <span className={`inline-flex items-center gap-1 rounded-full font-medium bg-indigo-50 text-indigo-700 border border-indigo-200 ${sizeClasses[size]}`}>
          <Shield className="w-3.5 h-3.5 text-indigo-600" />
          <span>{text || 'ON-CHAIN'}</span>
        </span>
      );

    default:
      return (
        <span className={`inline-flex items-center gap-1 rounded-full font-medium bg-slate-100 text-slate-800 border border-slate-300 ${sizeClasses[size]}`}>
          <span>{text || type}</span>
        </span>
      );
  }
};

export const StatCard = ({ title, value, subtitle, icon: Icon, trend, variant = 'default' }) => {
  const borderColors = {
    default: 'border-slate-200',
    primary: 'border-anchor-secondary/30',
    accent: 'border-anchor-accent/50',
    success: 'border-emerald-200',
    danger: 'border-rose-200',
    tampered: 'border-amber-200',
  };

  const iconBg = {
    default: 'bg-slate-100 text-slate-600',
    primary: 'bg-anchor-primary/10 text-anchor-primary',
    accent: 'bg-anchor-accent/15 text-anchor-accent-hover',
    success: 'bg-emerald-100 text-emerald-700',
    danger: 'bg-rose-100 text-rose-700',
    tampered: 'bg-amber-100 text-amber-700',
  };

  return (
    <div className={`bg-white rounded-xl p-5 border ${borderColors[variant]} shadow-desktop-card flex items-start justify-between transition-all hover:shadow-md`}>
      <div className="space-y-1.5">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{title}</p>
        <p className="text-2xl font-bold text-slate-900 tracking-tight">{value}</p>
        {subtitle && (
          <p className="text-xs text-slate-500 flex items-center gap-1">
            {subtitle}
          </p>
        )}
      </div>
      {Icon && (
        <div className={`p-3 rounded-lg ${iconBg[variant]}`}>
          <Icon className="w-5 h-5 stroke-[2.2]" />
        </div>
      )}
    </div>
  );
};
