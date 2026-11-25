import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import TitleBar from './components/TitleBar';
import Sidebar from './components/Sidebar';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import VerifyById from './pages/VerifyById';
import VerifyByDocument from './pages/VerifyByDocument';
import VerificationResult from './pages/VerificationResult';
import CredentialRegistration from './pages/CredentialRegistration';
import BlockchainExplorer from './pages/BlockchainExplorer';
import VerificationHistory from './pages/VerificationHistory';
import UserManagement from './pages/UserManagement';
import Settings from './pages/Settings';

function MainAppShell() {
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [currentResult, setCurrentResult] = useState(null);

  if (loading) {
    return (
      <div className="h-screen w-screen bg-anchor-primary flex items-center justify-center text-white select-none">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-anchor-accent border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-semibold uppercase tracking-widest text-anchor-accent">
            Initializing AnchorID Desktop...
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="h-screen w-screen flex flex-col overflow-hidden bg-anchor-background">
        <TitleBar apiOnline={true} blockchainOnline={true} />
        <div className="flex-1 overflow-hidden">
          <Login />
        </div>
      </div>
    );
  }

  const renderActivePage = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard onNavigate={setActiveTab} onSelectResult={setCurrentResult} />;
      case 'verify-id':
        return <VerifyById onNavigate={setActiveTab} onSelectResult={setCurrentResult} />;
      case 'verify-doc':
        return <VerifyByDocument onNavigate={setActiveTab} onSelectResult={setCurrentResult} />;
      case 'result':
        return <VerificationResult result={currentResult} onNavigate={setActiveTab} />;
      case 'register':
        return <CredentialRegistration onNavigate={setActiveTab} />;
      case 'blockchain':
        return <BlockchainExplorer />;
      case 'history':
        return <VerificationHistory onNavigate={setActiveTab} onSelectResult={setCurrentResult} />;
      case 'users':
        return <UserManagement />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard onNavigate={setActiveTab} onSelectResult={setCurrentResult} />;
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden bg-anchor-background font-sans antialiased text-slate-800">
      {/* Top Frameless Titlebar */}
      <TitleBar apiOnline={true} blockchainOnline={true} />

      {/* Main Desktop Layout: Persistent Sidebar + Content Area */}
      <div className="flex-1 flex overflow-hidden">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
        <main className="flex-1 flex flex-col h-full overflow-hidden bg-anchor-background">
          {renderActivePage()}
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainAppShell />
    </AuthProvider>
  );
}
