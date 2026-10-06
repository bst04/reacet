import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, User, Shield, Check, ArrowRight } from 'lucide-react';
import { PractitionerRole } from '../types';

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    users,
    currentUser,
    switchUser,
    setCurrentUser,
    showToast
  } = useApp();

  const [customUsername, setCustomUsername] = useState('');
  const [customName, setCustomName] = useState('');
  const [customRole, setCustomRole] = useState<PractitionerRole>('Pentester');
  const [activeTab, setActiveTab] = useState<'personas' | 'custom'>('personas');

  if (!isAuthModalOpen) return null;

  const handleCustomLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customUsername.trim()) return;

    const formattedUsername = customUsername.toLowerCase().replace(/[^a-z0-9]/g, '');
    const newUser = {
      id: `user-${Date.now()}`,
      username: formattedUsername,
      display_name: customName.trim() || formattedUsername,
      role: customRole,
      bio: `Practitioner focused on ${customRole} workflows.`,
      joined_date: 'Oct 2026',
      saved_sources: [],
      followed_stacks: [],
      followed_profiles: []
    };

    setCurrentUser(newUser);
    setIsAuthModalOpen(false);
    showToast(`Signed in as @${newUser.username}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div
        className="w-full max-w-md bg-[#E7E5DE] dark:bg-[#1A1D27] rounded-xl shadow-2xl border border-[#D5D1C4] dark:border-[#2C3142] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 bg-[#F2F0E8] dark:bg-[#1E212D] border-b border-[#D5D1C4] dark:border-[#2C3142] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#B855F6]" />
            <h3 className="text-sm font-semibold text-[#12141A] dark:text-white">
              Sign in to CyberSources
            </h3>
          </div>
          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="p-1 text-[#686B73] dark:text-[#8C92A0] hover:text-[#12141A] dark:hover:text-white rounded"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab switch */}
        <div className="flex p-1 bg-[#DDD9CE] dark:bg-[#161822] border-b border-[#D5D1C4] dark:border-[#2C3142] text-xs font-medium">
          <button
            type="button"
            onClick={() => setActiveTab('personas')}
            className={`flex-1 py-1.5 rounded transition-colors ${
              activeTab === 'personas'
                ? 'bg-[#F2F0E8] dark:bg-[#25293A] text-[#12141A] dark:text-white shadow-xs'
                : 'text-[#686B73] dark:text-[#8C92A0] hover:text-[#12141A] dark:hover:text-white'
            }`}
          >
            Select Practitioner Persona
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('custom')}
            className={`flex-1 py-1.5 rounded transition-colors ${
              activeTab === 'custom'
                ? 'bg-[#F2F0E8] dark:bg-[#25293A] text-[#12141A] dark:text-white shadow-xs'
                : 'text-[#686B73] dark:text-[#8C92A0] hover:text-[#12141A] dark:hover:text-white'
            }`}
          >
            Custom Account
          </button>
        </div>

        {activeTab === 'personas' ? (
          <div className="p-5 space-y-3">
            <p className="text-xs text-[#686B73] dark:text-[#9BA1AC] leading-relaxed">
              Explore CyberSources with real practitioner toolkits, stacks, and discussions:
            </p>

            <div className="space-y-2 max-h-72 overflow-y-auto">
              {users.map((u) => {
                const isActive = currentUser?.username === u.username;
                return (
                  <div
                    key={u.id}
                    onClick={() => {
                      switchUser(u.username);
                      setIsAuthModalOpen(false);
                    }}
                    className={`p-3 rounded-lg border cursor-pointer transition-all flex items-center justify-between group ${
                      isActive
                        ? 'bg-[#F2F0E8] dark:bg-[#25293A] border-[#B855F6] ring-1 ring-[#B855F6]'
                        : 'bg-[#F2F0E8]/70 dark:bg-[#1E212D] border-[#D5D1C4] dark:border-[#2C3142] hover:bg-[#F2F0E8] dark:hover:bg-[#25293A] hover:border-[#B855F6]/40'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-[#12141A] dark:text-white group-hover:text-[#B855F6] transition-colors">
                          {u.display_name}
                        </span>
                        <span className="text-[11px] font-mono text-[#8C8F99] dark:text-[#7B8190]">
                          @{u.username}
                        </span>
                      </div>
                      <div className="text-xs text-[#686B73] dark:text-[#9BA1AC] mt-0.5">
                        {u.role}
                      </div>
                    </div>

                    {isActive ? (
                      <span className="text-[11px] font-mono text-[#1D9A6C] bg-[#1D9A6C]/10 px-2 py-0.5 rounded">
                        Active
                      </span>
                    ) : (
                      <ArrowRight className="w-4 h-4 text-[#8C8F99] dark:text-[#5C6170] group-hover:text-[#12141A] dark:group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <form onSubmit={handleCustomLogin} className="p-5 space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[#686B73] dark:text-[#8C92A0] mb-1">
                Username
              </label>
              <div className="flex items-center bg-[#F2F0E8] dark:bg-[#1E212D] border border-[#D5D1C4] dark:border-[#2C3142] rounded-md overflow-hidden">
                <span className="px-2.5 text-xs font-mono text-[#8C8F99] dark:text-[#7B8190] bg-[#E7E5DE] dark:bg-[#1A1D27] border-r border-[#D5D1C4] dark:border-[#2C3142] py-2">
                  @
                </span>
                <input
                  type="text"
                  required
                  value={customUsername}
                  onChange={(e) => setCustomUsername(e.target.value)}
                  placeholder="cybersec_pro"
                  className="w-full px-3 py-2 text-sm text-[#12141A] dark:text-white focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[#686B73] dark:text-[#8C92A0] mb-1">
                Display Name
              </label>
              <input
                type="text"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                placeholder="Full Name / Alias"
                className="w-full px-3 py-2 bg-[#F2F0E8] dark:bg-[#1E212D] text-sm text-[#12141A] dark:text-white border border-[#D5D1C4] dark:border-[#2C3142] rounded-md focus:outline-none focus:border-[#B855F6]"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[#686B73] dark:text-[#8C92A0] mb-1">
                Primary Cybersecurity Role
              </label>
              <select
                value={customRole}
                onChange={(e) => setCustomRole(e.target.value as PractitionerRole)}
                className="w-full px-3 py-2 bg-[#F2F0E8] dark:bg-[#1E212D] text-sm text-[#12141A] dark:text-white border border-[#D5D1C4] dark:border-[#2C3142] rounded-md focus:outline-none focus:border-[#B855F6]"
              >
                <option value="Pentester">Pentester</option>
                <option value="Red Team">Red Team</option>
                <option value="Blue Team">Blue Team</option>
                <option value="SOC Analyst">SOC Analyst</option>
                <option value="Bug Bounty Hunter">Bug Bounty Hunter</option>
                <option value="OSINT Investigator">OSINT Investigator</option>
                <option value="DevSecOps">DevSecOps</option>
                <option value="Security Researcher">Security Researcher</option>
                <option value="CTF Player">CTF Player</option>
                <option value="Privacy Researcher">Privacy Researcher</option>
              </select>
            </div>

            <div className="pt-2 flex items-center justify-end gap-3 border-t border-[#D5D1C4] dark:border-[#2C3142]">
              <button
                type="button"
                onClick={() => setIsAuthModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-[#686B73] dark:text-[#8C92A0] hover:text-[#12141A] dark:hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-semibold text-white bg-[#181A22] hover:bg-[#B855F6] dark:bg-[#25293A] dark:hover:bg-[#B855F6] rounded-md transition-colors"
              >
                Create & Sign In
              </button>
            </div>
          </form>
        )}

        {/* Quiet disclaimer */}
        <div className="p-3 bg-[#DDD9CE]/60 dark:bg-[#161822] border-t border-[#D5D1C4] dark:border-[#2C3142] text-center text-[11px] font-mono text-[#8C8F99] dark:text-[#7B8190]">
          Sovereign local session · Instant practitioner sandbox
        </div>
      </div>
    </div>
  );
};
