import React, { useState } from 'react';
import { Users, UserPlus, Shield, Building2, CheckCircle2, Lock } from 'lucide-react';
import Header from '../components/Header';
import { Badge } from '../components/Badge';

export const UserManagement = () => {
  const [users, setUsers] = useState([
    {
      id: 'USR-001',
      name: 'Sarah Connor',
      email: 'admin@anchorid.network',
      role: 'ADMIN',
      organization: 'AnchorID Global Governance',
      status: 'ACTIVE',
      lastLogin: 'Today, 10:30'
    },
    {
      id: 'USR-002',
      name: 'Dr. Robert Langdon',
      email: 'registrar@oxford.edu',
      role: 'ISSUER',
      organization: 'Oxford Institute of Technology',
      status: 'ACTIVE',
      lastLogin: 'Yesterday, 14:15'
    },
    {
      id: 'USR-003',
      name: 'Elena Rostova',
      email: 'talent@vertexcorp.com',
      role: 'VERIFIER',
      organization: 'Vertex Global Talent Acquisition',
      status: 'ACTIVE',
      lastLogin: 'Today, 09:12'
    },
    {
      id: 'USR-004',
      name: 'Mark Spencer',
      email: 'mspencer@deloitte.com',
      role: 'VERIFIER',
      organization: 'Deloitte HR Advisory',
      status: 'ACTIVE',
      lastLogin: 'Nov 22, 17:05'
    },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newUserData, setNewUserData] = useState({
    name: '',
    email: '',
    role: 'VERIFIER',
    organization: '',
  });

  const handleAddUser = (e) => {
    e.preventDefault();
    if (!newUserData.name || !newUserData.email) return;

    setUsers([
      ...users,
      {
        id: `USR-00${users.length + 1}`,
        name: newUserData.name,
        email: newUserData.email,
        role: newUserData.role,
        organization: newUserData.organization || 'Independent Verifier',
        status: 'ACTIVE',
        lastLogin: 'Never',
      }
    ]);
    setShowAddModal(false);
    setNewUserData({ name: '', email: '', role: 'VERIFIER', organization: '' });
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-anchor-background">
      <Header
        title="Identity & Role-Based Access Governance"
        subtitle="Manage authorized university credential issuers, corporate HR verifiers, and system administrators"
      />

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Top Control Bar */}
        <div className="flex items-center justify-between">
          <div className="text-xs text-slate-500">
            Total Authorized Stakeholders: <span className="font-bold text-slate-900">{users.length}</span>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-anchor-primary hover:bg-anchor-secondary text-white font-bold text-xs rounded-lg shadow-sm transition-all"
          >
            <UserPlus className="w-4 h-4 text-anchor-accent" />
            <span>Provision New User / Node</span>
          </button>
        </div>

        {/* User Table */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-desktop-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 uppercase tracking-wider text-[10px]">
                  <th className="py-3 px-4 font-bold">User Identity</th>
                  <th className="py-3 px-4 font-bold">Assigned Role</th>
                  <th className="py-3 px-4 font-bold">Accredited Organization</th>
                  <th className="py-3 px-4 font-bold">Node Status</th>
                  <th className="py-3 px-4 font-bold">Last Activity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-900">{u.name}</div>
                      <div className="text-[11px] text-slate-500 font-mono">{u.email}</div>
                    </td>

                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        u.role === 'ADMIN' 
                          ? 'bg-rose-100 text-rose-800' 
                          : u.role === 'ISSUER' 
                            ? 'bg-indigo-100 text-indigo-800' 
                            : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {u.role}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-slate-700">
                      {u.organization}
                    </td>

                    <td className="py-3 px-4">
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        {u.status}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-slate-500 text-[11px]">
                      {u.lastLogin}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Provision Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 select-none">
            <div className="bg-white rounded-xl shadow-desktop-modal border border-slate-200 max-w-md w-full p-6 space-y-4">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <UserPlus className="w-4 h-4 text-anchor-accent" />
                <span>Provision Organization / User Account</span>
              </h3>

              <form onSubmit={handleAddUser} className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={newUserData.name}
                    onChange={(e) => setNewUserData({ ...newUserData, name: e.target.value })}
                    placeholder="e.g. John Doe"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-anchor-accent/50"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={newUserData.email}
                    onChange={(e) => setNewUserData({ ...newUserData, email: e.target.value })}
                    placeholder="name@organization.com"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-anchor-accent/50"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Role Assignment</label>
                  <select
                    value={newUserData.role}
                    onChange={(e) => setNewUserData({ ...newUserData, role: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-anchor-accent/50"
                  >
                    <option value="VERIFIER">HR / Credential Verifier</option>
                    <option value="ISSUER">Institution / Credential Issuer</option>
                    <option value="ADMIN">System Administrator</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Organization Name</label>
                  <input
                    type="text"
                    value={newUserData.organization}
                    onChange={(e) => setNewUserData({ ...newUserData, organization: e.target.value })}
                    placeholder="e.g. Cambridge University / Microsoft"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-anchor-accent/50"
                  />
                </div>

                <div className="flex justify-end space-x-2 pt-3">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 border border-slate-300 rounded-lg text-slate-600 hover:bg-slate-100 font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-anchor-primary hover:bg-anchor-secondary text-white rounded-lg font-bold"
                  >
                    Create User Node
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserManagement;
