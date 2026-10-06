import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { X, User, Globe, Github, Twitter, Check } from 'lucide-react';
import { PractitionerRole } from '../types';

export const EditProfileModal: React.FC = () => {
  const {
    isEditProfileModalOpen,
    setIsEditProfileModalOpen,
    currentUser,
    updateProfile
  } = useApp();

  const [displayName, setDisplayName] = useState('');
  const [role, setRole] = useState<PractitionerRole>('Pentester');
  const [bio, setBio] = useState('');
  const [website, setWebsite] = useState('');
  const [github, setGithub] = useState('');
  const [twitter, setTwitter] = useState('');

  useEffect(() => {
    if (currentUser) {
      setDisplayName(currentUser.display_name || '');
      setRole(currentUser.role || 'Pentester');
      setBio(currentUser.bio || '');
      setWebsite(currentUser.website || '');
      setGithub(currentUser.github || '');
      setTwitter(currentUser.twitter || '');
    }
  }, [currentUser, isEditProfileModalOpen]);

  if (!isEditProfileModalOpen || !currentUser) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      display_name: displayName.trim() || currentUser.username,
      role,
      bio: bio.trim(),
      website: website.trim() || undefined,
      github: github.trim() || undefined,
      twitter: twitter.trim() || undefined
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div
        className="w-full max-w-lg bg-[#E7E5DE] dark:bg-[#1A1D27] rounded-xl shadow-2xl border border-[#D5D1C4] dark:border-[#2C3142] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 bg-[#F2F0E8] dark:bg-[#1E212D] border-b border-[#D5D1C4] dark:border-[#2C3142] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#B855F6]" />
            <h3 className="text-sm font-semibold text-[#12141A] dark:text-[#F0F2F6]">
              Edit Practitioner Profile
            </h3>
          </div>
          <button
            onClick={() => setIsEditProfileModalOpen(false)}
            className="p-1 text-[#686B73] dark:text-[#8C92A0] hover:text-[#12141A] dark:hover:text-white rounded"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* User Identity Banner */}
        <div className="px-5 py-3 bg-[#DDD9CE]/60 dark:bg-[#161822] border-b border-[#D5D1C4] dark:border-[#2C3142] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#181A22] dark:bg-[#25293A] text-white flex items-center justify-center font-mono font-bold text-xs">
              {currentUser.username.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="text-xs font-mono font-bold text-[#12141A] dark:text-white">
                @{currentUser.username}
              </div>
              <div className="text-[11px] text-[#686B73] dark:text-[#8C92A0]">
                Joined {currentUser.joined_date}
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[#686B73] dark:text-[#8C92A0] mb-1">
                Display Name *
              </label>
              <input
                type="text"
                required
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Full Name / Alias"
                className="w-full px-3 py-2 bg-[#F2F0E8] dark:bg-[#1E212D] text-sm text-[#12141A] dark:text-white border border-[#D5D1C4] dark:border-[#2C3142] rounded-md focus:outline-none focus:border-[#B855F6]"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[#686B73] dark:text-[#8C92A0] mb-1">
                Primary Security Role *
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as PractitionerRole)}
                className="w-full px-3 py-2 bg-[#F2F0E8] dark:bg-[#1E212D] text-sm text-[#12141A] dark:text-white border border-[#D5D1C4] dark:border-[#2C3142] rounded-md focus:outline-none focus:border-[#B855F6]"
              >
                <option value="Pentester">Pentester</option>
                <option value="Bug Bounty Hunter">Bug Bounty Hunter</option>
                <option value="Red Team">Red Team</option>
                <option value="Blue Team">Blue Team</option>
                <option value="SOC Analyst">SOC Analyst</option>
                <option value="OSINT Investigator">OSINT Investigator</option>
                <option value="DevSecOps">DevSecOps</option>
                <option value="Security Researcher">Security Researcher</option>
                <option value="CTF Player">CTF Player</option>
                <option value="Privacy Researcher">Privacy Researcher</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-[#686B73] dark:text-[#8C92A0] mb-1">
              Practitioner Bio
            </label>
            <textarea
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Describe your cybersecurity focus, workflows, or target areas..."
              className="w-full px-3 py-2 bg-[#F2F0E8] dark:bg-[#1E212D] text-sm text-[#12141A] dark:text-white border border-[#D5D1C4] dark:border-[#2C3142] rounded-md focus:outline-none focus:border-[#B855F6] resize-none"
            />
          </div>

          <div className="space-y-3 pt-1">
            <label className="block text-xs font-mono uppercase tracking-wider text-[#686B73] dark:text-[#8C92A0]">
              Links & Profiles
            </label>
            
            <div className="flex items-center bg-[#F2F0E8] dark:bg-[#1E212D] border border-[#D5D1C4] dark:border-[#2C3142] rounded-md overflow-hidden text-xs">
              <span className="px-3 py-2 bg-[#E7E5DE] dark:bg-[#1A1D27] text-[#686B73] dark:text-[#8C92A0] border-r border-[#D5D1C4] dark:border-[#2C3142] flex items-center gap-1 font-mono">
                <Globe className="w-3.5 h-3.5" />
                <span>URL</span>
              </span>
              <input
                type="url"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                placeholder="https://yourportfolio.site"
                className="w-full px-3 py-2 text-[#12141A] dark:text-white focus:outline-none"
              />
            </div>

            <div className="flex items-center bg-[#F2F0E8] dark:bg-[#1E212D] border border-[#D5D1C4] dark:border-[#2C3142] rounded-md overflow-hidden text-xs">
              <span className="px-3 py-2 bg-[#E7E5DE] dark:bg-[#1A1D27] text-[#686B73] dark:text-[#8C92A0] border-r border-[#D5D1C4] dark:border-[#2C3142] flex items-center gap-1 font-mono">
                <Github className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </span>
              <input
                type="url"
                value={github}
                onChange={(e) => setGithub(e.target.value)}
                placeholder="https://github.com/username"
                className="w-full px-3 py-2 text-[#12141A] dark:text-white focus:outline-none"
              />
            </div>

            <div className="flex items-center bg-[#F2F0E8] dark:bg-[#1E212D] border border-[#D5D1C4] dark:border-[#2C3142] rounded-md overflow-hidden text-xs">
              <span className="px-3 py-2 bg-[#E7E5DE] dark:bg-[#1A1D27] text-[#686B73] dark:text-[#8C92A0] border-r border-[#D5D1C4] dark:border-[#2C3142] flex items-center gap-1 font-mono">
                <Twitter className="w-3.5 h-3.5" />
                <span>X / Twitter</span>
              </span>
              <input
                type="url"
                value={twitter}
                onChange={(e) => setTwitter(e.target.value)}
                placeholder="https://twitter.com/username"
                className="w-full px-3 py-2 text-[#12141A] dark:text-white focus:outline-none"
              />
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-3 flex items-center justify-end gap-3 border-t border-[#D5D1C4] dark:border-[#2C3142]">
            <button
              type="button"
              onClick={() => setIsEditProfileModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-[#686B73] dark:text-[#8C92A0] hover:text-[#12141A] dark:hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold text-white bg-[#181A22] hover:bg-[#B855F6] dark:bg-[#25293A] dark:hover:bg-[#B855F6] rounded-md transition-colors"
            >
              Save Changes
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
