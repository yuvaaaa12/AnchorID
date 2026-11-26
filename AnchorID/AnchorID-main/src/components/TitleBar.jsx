import React, { useState, useEffect } from 'react';
import { Minus, Square, X, Shield, Activity, Wifi } from 'lucide-react';

export const TitleBar = ({ apiOnline = true, blockchainOnline = true }) => {
  const [isMaximized, setIsMaximized] = useState(false);
  const isElectron = typeof window !== 'undefined' && window.anchorAPI;

  useEffect(() => {
    if (isElectron) {
      window.anchorAPI.isMaximized().then(setIsMaximized);
    }
  }, [isElectron]);

  const handleMinimize = () => {
    if (isElectron) window.anchorAPI.minimizeWindow();
  };

  const handleMaximize = async () => {
    if (isElectron) {
      window.anchorAPI.maximizeWindow();
      const maximized = await window.anchorAPI.isMaximized();
      setIsMaximized(maximized);
    }
  };

  const handleClose = () => {
    if (isElectron) window.anchorAPI.closeWindow();
  };

  return (
    <div className="h-9 bg-anchor-primary text-slate-300 flex items-center justify-between select-none window-drag-region border-b border-slate-800 text-xs z-50">
      {/* Left: Brand Identity */}
      <div className="flex items-center space-x-2.5 px-3 window-no-drag">
        <div className="w-5 h-5 rounded bg-gradient-to-br from-anchor-accent to-amber-600 flex items-center justify-center text-anchor-primary font-bold shadow-sm">
          <Shield className="w-3.5 h-3.5 text-slate-950 stroke-[2.5]" />
        </div>
        <span className="font-semibold tracking-wider text-slate-100">AnchorID</span>
        <span className="text-[10px] text-anchor-accent font-medium uppercase tracking-widest px-1.5 py-0.5 rounded bg-anchor-secondary/60 border border-anchor-accent/20">
          Enterprise Desktop v1.0
        </span>
      </div>

      {/* Center: System Status Indicators */}
      <div className="flex items-center space-x-4 text-[11px] window-no-drag text-slate-400">
        <div className="flex items-center space-x-1.5">
          <span className={`w-2 h-2 rounded-full ${blockchainOnline ? 'bg-emerald-400 animate-pulse' : 'bg-rose-500'}`} />
          <span className="text-slate-300">Ethereum Hardhat Node</span>
        </div>
        <div className="h-3 w-px bg-slate-700" />
        <div className="flex items-center space-x-1.5">
          <span className={`w-2 h-2 rounded-full ${apiOnline ? 'bg-emerald-400' : 'bg-amber-400'}`} />
          <span className="text-slate-300">API Gateway :5000</span>
        </div>
      </div>

      {/* Right: Window Controls */}
      <div className="flex items-center h-full window-no-drag">
        <button
          onClick={handleMinimize}
          className="h-full px-3.5 hover:bg-slate-800 text-slate-400 hover:text-slate-100 transition-colors flex items-center justify-center"
          title="Minimize"
        >
          <Minus className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={handleMaximize}
          className="h-full px-3.5 hover:bg-slate-800 text-slate-400 hover:text-slate-100 transition-colors flex items-center justify-center"
          title={isMaximized ? "Restore" : "Maximize"}
        >
          <Square className="w-3 h-3" />
        </button>
        <button
          onClick={handleClose}
          className="h-full px-4 hover:bg-rose-600 text-slate-400 hover:text-white transition-colors flex items-center justify-center"
          title="Close Application"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

export default TitleBar;
