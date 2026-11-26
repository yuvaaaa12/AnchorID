// Unified API Client for AnchorID Desktop Application

const getApiBaseUrl = () => {
  return localStorage.getItem('anchorid_api_url') || 'http://localhost:5000/api';
};

const getAuthToken = () => {
  return localStorage.getItem('anchorid_token');
};

const request = async (endpoint, options = {}) => {
  const baseUrl = getApiBaseUrl();
  const url = `${baseUrl}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
  
  const headers = {
    ...(options.headers || {}),
  };

  const token = getAuthToken();
  if (token && !headers['Authorization']) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  // Don't set Content-Type if FormData is used
  if (!(options.body instanceof FormData) && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json';
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      const errorMsg = data.message || `Request failed with status ${response.status}`;
      const err = new Error(errorMsg);
      err.status = response.status;
      err.data = data;
      throw err;
    }

    return data;
  } catch (error) {
    console.error(`API Error on [${options.method || 'GET'}] ${url}:`, error);
    throw error;
  }
};

export const api = {
  // Authentication
  login: (email, password) => 
    request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  registerUser: (userData) =>
    request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    }),

  getCurrentUser: () =>
    request('/auth/me'),

  // Credentials
  getCredentials: (params = {}) => {
    const searchParams = new URLSearchParams(params).toString();
    return request(`/credentials${searchParams ? `?${searchParams}` : ''}`);
  },

  getCredentialById: (id) =>
    request(`/credentials/${id}`),

  lookupCredential: (identifier) =>
    request(`/credentials/lookup/${encodeURIComponent(identifier)}`),

  registerCredential: (formData) =>
    request('/credentials', {
      method: 'POST',
      body: formData,
    }),

  // Verification
  verifyById: (identifier) =>
    request('/verify/by-id', {
      method: 'POST',
      body: JSON.stringify({ identifier }),
    }),

  verifyByDocument: (formData) =>
    request('/verify/by-document', {
      method: 'POST',
      body: formData,
    }),

  getVerificationHistory: (params = {}) => {
    const searchParams = new URLSearchParams(params).toString();
    return request(`/verify/history${searchParams ? `?${searchParams}` : ''}`);
  },

  getVerificationDetails: (id) =>
    request(`/verify/history/${id}`),

  downloadReportUrl: (verificationId) => {
    const baseUrl = getApiBaseUrl();
    const token = getAuthToken();
    return `${baseUrl}/verify/report/${verificationId}?token=${encodeURIComponent(token || '')}`;
  },

  // Blockchain
  getBlockchainStatus: () =>
    request('/blockchain/status'),

  getBlockchainTransactions: (params = {}) => {
    const searchParams = new URLSearchParams(params).toString();
    return request(`/blockchain/transactions${searchParams ? `?${searchParams}` : ''}`);
  },

  getBlockchainRecord: (credentialId) =>
    request(`/blockchain/record/${credentialId}`),

  // Analytics & Dashboard
  getDashboardStats: () =>
    request('/analytics/dashboard'),

  // Users & Institutions (Admin)
  getUsers: () =>
    request('/users'),

  getInstitutions: () =>
    request('/institutions'),
};

export default api;
