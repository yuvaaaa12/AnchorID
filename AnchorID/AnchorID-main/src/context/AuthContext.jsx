import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('anchorid_token');
    const storedUser = localStorage.getItem('anchorid_user');

    if (token && storedUser) {
      try {
        setUser(JSON.parse(storedUser));
        // Verify with backend silently
        api.getCurrentUser()
          .then((res) => {
            if (res.user) {
              setUser(res.user);
              localStorage.setItem('anchorid_user', JSON.stringify(res.user));
            }
          })
          .catch(() => {
            // Keep stored user if offline
          })
          .finally(() => setLoading(false));
      } catch (e) {
        localStorage.removeItem('anchorid_token');
        localStorage.removeItem('anchorid_user');
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    setError(null);
    try {
      const res = await api.login(email, password);
      if (res.token && res.user) {
        localStorage.setItem('anchorid_token', res.token);
        localStorage.setItem('anchorid_user', JSON.stringify(res.user));
        setUser(res.user);
        return res.user;
      }
      throw new Error(res.message || 'Login failed');
    } catch (err) {
      setError(err.message || 'Authentication error');
      throw err;
    }
  };

  // Demo fast login presets to facilitate quick testing
  const demoLogin = (role = 'verifier') => {
    const demoAccounts = {
      admin: {
        id: 'usr_admin_01',
        name: 'Sarah Connor',
        email: 'admin@anchorid.network',
        role: 'ADMIN',
        institution: 'AnchorID Global Governance'
      },
      issuer: {
        id: 'usr_issuer_01',
        name: 'Dr. Robert Langdon',
        email: 'registrar@oxford.edu',
        role: 'ISSUER',
        institution: 'Oxford Institute of Technology',
        institutionId: 'inst_01'
      },
      verifier: {
        id: 'usr_verifier_01',
        name: 'Elena Rostova',
        email: 'talent@vertexcorp.com',
        role: 'VERIFIER',
        institution: 'Vertex Global Talent Acquisition'
      }
    };

    const targetUser = demoAccounts[role] || demoAccounts.verifier;
    const dummyToken = `demo_jwt_token_${targetUser.role.toLowerCase()}`;
    localStorage.setItem('anchorid_token', dummyToken);
    localStorage.setItem('anchorid_user', JSON.stringify(targetUser));
    setUser(targetUser);
  };

  const logout = () => {
    localStorage.removeItem('anchorid_token');
    localStorage.removeItem('anchorid_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, login, demoLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
