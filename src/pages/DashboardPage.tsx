import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { StackCard } from '../components/StackCard';
import { SourceRow } from '../components/SourceRow';
import { DiscussionItem } from '../components/DiscussionItem';
import { Plus, Layers, Bookmark, BookmarkCheck, MessageSquare, ArrowRight, Sparkles, User, Edit3, ExternalLink } from 'lucide-react';
import { PractitionerRole } from '../types';

export const DashboardPage: React.FC = () => {
  const {
    currentUser,
    stacks,
    sources,
    discussions,
    navigateTo,
    createStack,
    setIsAuthModalOpen,
    setIsEditProfileModalOpen,
    removeSourceFromStack
  } = useApp();

  const [isNewStackModalOpen, setIsNewStackModalOpen] = useState(false);
  const [newStackName, setNewStackName] = useState('');
  const [newStackDesc, setNewStackDesc] = useState('');
  const [newStackRole, setNewStackRole] = useState<PractitionerRole>(
    currentUser?.role || 'Pentester'
  );

  if (!currentUser) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-[#111318] dark:text-white">Practitioner Session Required</h2>
        <p className="text-sm text-[#686B73] dark:text-[#9BA1AC]">
          Sign in to access your personal dashboard, manage your stacks, and access saved sources.
        </p>
        <button
          onClick={() => setIsAuthModalOpen(true)}
          className="px-5 py-2.5 text-xs font-semibold text-white bg-[#B855F6] hover:bg-[#A23BE9] rounded-md transition-colors shadow-md shadow-[#B855F6]/20 cursor-pointer"
        >
          Sign in or Choose Persona →
        </button>
      </div>
    );
  }

  // User's stacks
  const myStacks = stacks.filter((s) => s.author.username === currentUser.username);

  // User's saved sources
  const savedSourcesList = currentUser.saved_sources
    .map((slug) => sources.find((s) => s.slug === slug))
    .filter(Boolean);

  // User's discussions
  const myDiscussions = discussions.filter(
    (d) => d.user.username === currentUser.username
  );

  // Suggested sources not yet saved or in stack
  const suggestedSources = sources
    .filter((s) => !currentUser.saved_sources.includes(s.slug))
    .slice(0, 4);

  const handleCreateNewStack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStackName.trim()) return;

    const slug = newStackName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    createStack({
      slug: slug || `stack-${Date.now()}`,
      name: newStackName.trim(),
      description: newStackDesc.trim() || `Curated security toolkit for ${newStackRole} operations.`,
      role: newStackRole,
      is_public: true,
      author: {
        id: currentUser.id,
        username: currentUser.username,
        display_name: currentUser.display_name,
        role: currentUser.role,
        bio: currentUser.bio
      },
      sources: []
    });

    setIsNewStackModalOpen(false);
    setNewStackName('');
    setNewStackDesc('');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Header Dossier */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#D5D1C4] dark:border-[#2C3142]">
        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-[#B855F6]">
            PRACTITIONER DASHBOARD
          </div>
          <h1 className="text-3xl font-extrabold text-[#111318] dark:text-white tracking-tight mt-1">
            Welcome back, {currentUser.display_name}
          </h1>
          <p className="text-sm text-[#5E626E] dark:text-[#9BA1AC] mt-1 font-mono">
            @{currentUser.username} · {currentUser.role}
          </p>
        </div>

        <div className="flex items-center flex-wrap gap-2.5">
          <button
            onClick={() => setIsEditProfileModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-md border border-[#D5D1C4] dark:border-[#2C3142] text-[#111318] dark:text-white bg-[#F2F0E8] dark:bg-[#1E212D] hover:border-[#B855F6] dark:hover:border-[#B855F6] transition-colors cursor-pointer"
          >
            <Edit3 className="w-3.5 h-3.5 text-[#B855F6]" />
            <span>Edit Profile</span>
          </button>

          <button
            onClick={() => navigateTo(`/profile/${currentUser.username}`)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-md border border-[#D5D1C4] dark:border-[#2C3142] text-[#111318] dark:text-white bg-[#F2F0E8] dark:bg-[#1E212D] hover:border-[#B855F6] dark:hover:border-[#B855F6] transition-colors cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Public Profile</span>
          </button>

          <button
            onClick={() => setIsNewStackModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#B855F6] hover:bg-[#A23BE9] rounded-md transition-colors shadow-md shadow-[#B855F6]/20 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create New Stack</span>
          </button>
        </div>
      </div>

      {/* Grid: Stacks Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-[#D5D1C4] dark:border-[#2C3142]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#B855F6]" />
            <h2 className="text-xl font-bold text-[#111318] dark:text-white">Your Stacks</h2>
          </div>
          <span className="text-xs font-mono text-[#8C8F99] dark:text-[#7B8190] tabular-nums">
            {myStacks.length} {myStacks.length === 1 ? 'Stack' : 'Stacks'}
          </span>
        </div>

        {myStacks.length === 0 ? (
          <div className="p-8 bg-[#F2F0E8] dark:bg-[#1E212D] rounded-xl border border-[#D5D1C4] dark:border-[#2C3142] text-center space-y-3">
            <p className="text-sm text-[#111318] dark:text-white font-medium">No stacks created yet.</p>
            <p className="text-xs text-[#5E626E] dark:text-[#9BA1AC]">
              Curate your primary tools for recon, pentesting, red teaming, or blue team defense.
            </p>
            <button
              onClick={() => setIsNewStackModalOpen(true)}
              className="px-4 py-2 text-xs font-semibold text-white bg-[#B855F6] hover:bg-[#A23BE9] rounded-md transition-colors shadow-md shadow-[#B855F6]/20 cursor-pointer"
            >
              Build Your First Stack →
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myStacks.map((stk) => (
              <StackCard key={stk.id} stack={stk} />
            ))}
          </div>
        )}
      </section>

      {/* Saved Sources */}
      <section className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-[#D5D1C4] dark:border-[#2C3142]">
          <div className="flex items-center gap-2">
            <BookmarkCheck className="w-4 h-4 text-[#B855F6]" />
            <h2 className="text-xl font-bold text-[#111318] dark:text-white">Saved Sources</h2>
          </div>
          <span className="text-xs font-mono text-[#8C8F99] dark:text-[#7B8190] tabular-nums">
            {savedSourcesList.length} bookmarked
          </span>
        </div>

        {savedSourcesList.length === 0 ? (
          <div className="p-8 bg-[#F2F0E8] dark:bg-[#1E212D] rounded-xl border border-[#D5D1C4] dark:border-[#2C3142] text-center text-xs text-[#5E626E] dark:text-[#9BA1AC]">
            No saved sources yet. Browse the archive and click the bookmark icon on any source to pin it here.
          </div>
        ) : (
          <div className="bg-[#F2F0E8] dark:bg-[#1E212D] rounded-xl border border-[#D5D1C4] dark:border-[#2C3142] overflow-hidden divide-y divide-[#D5D1C4] dark:divide-[#2C3142]">
            {savedSourcesList.map((source, idx) => {
              if (!source) return null;
              return <SourceRow key={source.id} source={source} index={idx} />;
            })}
          </div>
        )}
      </section>

      {/* Suggested Sources & Recent Discussions in a 2-col layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Suggested Sources */}
        <section className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#D5D1C4] dark:border-[#2C3142]">
            <h2 className="text-lg font-bold text-[#111318] dark:text-white">Suggested Sources</h2>
            <button
              onClick={() => navigateTo('/sources')}
              className="text-xs font-mono text-[#B855F6] hover:underline cursor-pointer"
            >
              Browse all →
            </button>
          </div>

          <div className="bg-[#F2F0E8] dark:bg-[#1E212D] rounded-xl border border-[#D5D1C4] dark:border-[#2C3142] overflow-hidden divide-y divide-[#D5D1C4] dark:divide-[#2C3142]">
            {suggestedSources.map((source, idx) => (
              <SourceRow key={source.id} source={source} index={idx} />
            ))}
          </div>
        </section>

        {/* My Discussions */}
        <section className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#D5D1C4] dark:border-[#2C3142]">
            <h2 className="text-lg font-bold text-[#111318] dark:text-white">My Discussions</h2>
            <button
              onClick={() => navigateTo('/discuss')}
              className="text-xs font-mono text-[#B855F6] hover:underline cursor-pointer"
            >
              Join discussions →
            </button>
          </div>

          {myDiscussions.length === 0 ? (
            <div className="p-8 bg-[#F2F0E8] dark:bg-[#1E212D] rounded-xl border border-[#D5D1C4] dark:border-[#2C3142] text-center text-xs text-[#5E626E] dark:text-[#9BA1AC]">
              You haven't initiated any discussions yet.
            </div>
          ) : (
            <div className="space-y-3">
              {myDiscussions.map((d) => (
                <DiscussionItem key={d.id} discussion={d} />
              ))}
            </div>
          )}
        </section>

      </div>

      {/* Create Stack Modal */}
      {isNewStackModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div
            className="w-full max-w-lg bg-[#F2F0E8] dark:bg-[#1E212D] rounded-xl shadow-2xl border border-[#D5D1C4] dark:border-[#2C3142] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 bg-[#E7E5DE] dark:bg-[#181A24] border-b border-[#D5D1C4] dark:border-[#2C3142] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#B855F6]" />
                <h3 className="text-sm font-semibold text-[#111318] dark:text-white">
                  Create a New Stack
                </h3>
              </div>
              <button
                onClick={() => setIsNewStackModalOpen(false)}
                className="text-[#5E626E] dark:text-[#9BA1AC] hover:text-[#111318] dark:hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateNewStack} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#5E626E] dark:text-[#9BA1AC] mb-1">
                  Stack Name
                </label>
                <input
                  type="text"
                  required
                  value={newStackName}
                  onChange={(e) => setNewStackName(e.target.value)}
                  placeholder="e.g. My Recon Stack, Bug Bounty Daily Suite"
                  className="w-full px-3 py-2 bg-[#E7E5DE] dark:bg-[#181A24] text-sm text-[#111318] dark:text-white border border-[#D5D1C4] dark:border-[#2C3142] rounded-md focus:outline-none focus:border-[#B855F6]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#5E626E] dark:text-[#9BA1AC] mb-1">
                  Practitioner Role Focus
                </label>
                <select
                  value={newStackRole}
                  onChange={(e) => setNewStackRole(e.target.value as PractitionerRole)}
                  className="w-full px-3 py-2 bg-[#E7E5DE] dark:bg-[#181A24] text-sm text-[#111318] dark:text-white border border-[#D5D1C4] dark:border-[#2C3142] rounded-md focus:outline-none focus:border-[#B855F6]"
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

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#5E626E] dark:text-[#9BA1AC] mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={newStackDesc}
                  onChange={(e) => setNewStackDesc(e.target.value)}
                  placeholder="Briefly describe the workflow scenario or target environment..."
                  className="w-full px-3 py-2 bg-[#E7E5DE] dark:bg-[#181A24] text-sm text-[#111318] dark:text-white border border-[#D5D1C4] dark:border-[#2C3142] rounded-md focus:outline-none focus:border-[#B855F6] resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsNewStackModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-[#5E626E] dark:text-[#9BA1AC] hover:text-[#111318] dark:hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold text-white bg-[#B855F6] hover:bg-[#A23BE9] rounded-md transition-colors shadow-md shadow-[#B855F6]/20 cursor-pointer"
                >
                  Create Stack
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
