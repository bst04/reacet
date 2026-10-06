import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { StackCard } from '../components/StackCard';
import { DiscussionItem } from '../components/DiscussionItem';
import { SourceRow } from '../components/SourceRow';
import { Globe, Github, Twitter, Layers, MessageSquare, Bookmark, UserCheck, UserPlus, ArrowLeft } from 'lucide-react';

interface ProfilePageProps {
  username: string;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ username }) => {
  const {
    users,
    stacks,
    discussions,
    sources,
    navigateTo,
    currentUser,
    showToast,
    setIsEditProfileModalOpen
  } = useApp();
  
  const user = users.find((u) => u.username === username);
  const [activeTab, setActiveTab] = useState<'stacks' | 'sources' | 'discussions'>('stacks');
  const [isFollowing, setIsFollowing] = useState(false);

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-[#111318]">Practitioner Not Found</h2>
        <p className="text-sm text-[#686B73]">
          No profile exists under @{username}.
        </p>
        <button
          onClick={() => navigateTo('/')}
          className="px-4 py-2 text-xs font-semibold text-white bg-[#17191D] rounded-md"
        >
          Return Home
        </button>
      </div>
    );
  }

  // User's stacks
  const userStacks = stacks.filter((s) => s.author.username === user.username);

  // User's discussions
  const userDiscussions = discussions.filter((d) => d.user.username === user.username);

  // User's saved or frequently used sources
  const userSources = user.saved_sources
    .map((slug) => sources.find((s) => s.slug === slug))
    .filter(Boolean);

  const handleFollowToggle = () => {
    setIsFollowing((prev) => !prev);
    showToast(isFollowing ? `Unfollowed @${user.username}` : `Following @${user.username}`);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Back button */}
      <button
        onClick={() => navigateTo('/stacks')}
        className="inline-flex items-center gap-2 text-xs font-semibold text-[#686B73] hover:text-[#111318] transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>BACK</span>
      </button>

      {/* Profile Header Dossier */}
      <div className="bg-[#F2F0E8] dark:bg-[#1E212D] rounded-xl border border-[#D5D1C4] dark:border-[#2C3142] p-6 sm:p-10 space-y-6 shadow-xs">
        
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-xl bg-[#181A22] dark:bg-[#25293A] text-white flex items-center justify-center font-mono font-extrabold text-xl shrink-0">
              {user.username.slice(0, 2).toUpperCase()}
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#12141A] dark:text-white">
                  {user.display_name}
                </h1>
                <span className="font-mono text-xs text-[#8C8F99] dark:text-[#7B8190]">
                  @{user.username}
                </span>
              </div>
              <div className="text-xs font-mono font-semibold text-[#B855F6]">
                {user.role}
              </div>
              <p className="text-xs sm:text-sm text-[#5E626E] dark:text-[#9BA1AC] max-w-xl pt-1">
                {user.bio}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start shrink-0">
            {currentUser?.username === user.username ? (
              <button
                onClick={() => setIsEditProfileModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-md border border-[#12141A] dark:border-[#333845] text-[#12141A] dark:text-white bg-[#E7E5DE] dark:bg-[#25293A] hover:bg-[#B855F6] hover:text-white hover:border-[#B855F6] transition-all cursor-pointer"
              >
                <span>Edit Profile</span>
              </button>
            ) : (
              <button
                onClick={handleFollowToggle}
                className={`inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-md border transition-colors cursor-pointer ${
                  isFollowing
                    ? 'bg-[#1D9A6C]/10 text-[#1D9A6C] border-[#1D9A6C]'
                    : 'bg-[#181A22] dark:bg-[#25293A] text-white border-[#181A22] dark:border-[#25293A] hover:bg-[#B855F6]'
                }`}
              >
                {isFollowing ? <UserCheck className="w-3.5 h-3.5" /> : <UserPlus className="w-3.5 h-3.5" />}
                <span>{isFollowing ? 'Following' : 'Follow Practitioner'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Social / Web Links */}
        <div className="pt-4 border-t border-[#D5D1C4] dark:border-[#2C3142] flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
          <div className="flex items-center gap-4 text-[#5E626E] dark:text-[#9BA1AC]">
            {user.website && (
              <a
                href={user.website}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 text-[#12141A] dark:text-[#E2E6EF] hover:text-[#B855F6] transition-colors"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>Website</span>
              </a>
            )}
            {user.github && (
              <a
                href={user.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 text-[#12141A] dark:text-[#E2E6EF] hover:text-[#B855F6] transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>
            )}
            {user.twitter && (
              <a
                href={user.twitter}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 text-[#12141A] dark:text-[#E2E6EF] hover:text-[#B855F6] transition-colors"
              >
                <Twitter className="w-3.5 h-3.5" />
                <span>Twitter / X</span>
              </a>
            )}
          </div>

          <div className="text-[11px] text-[#8C8F99] dark:text-[#7B8190]">
            MEMBER SINCE {user.joined_date.toUpperCase()}
          </div>
        </div>

      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 p-1 bg-[#DDD9CE] dark:bg-[#161822] rounded-lg text-xs font-semibold max-w-md border border-[#D5D1C4] dark:border-[#2C3142]">
        <button
          onClick={() => setActiveTab('stacks')}
          className={`flex-1 py-2 rounded-md transition-colors ${
            activeTab === 'stacks'
              ? 'bg-[#F2F0E8] dark:bg-[#25293A] text-[#12141A] dark:text-white shadow-xs'
              : 'text-[#686B73] dark:text-[#9BA1AC] hover:text-[#12141A] dark:hover:text-white'
          }`}
        >
          Stacks ({userStacks.length})
        </button>
        <button
          onClick={() => setActiveTab('sources')}
          className={`flex-1 py-2 rounded-md transition-colors ${
            activeTab === 'sources'
              ? 'bg-[#F2F0E8] dark:bg-[#25293A] text-[#12141A] dark:text-white shadow-xs'
              : 'text-[#686B73] dark:text-[#9BA1AC] hover:text-[#12141A] dark:hover:text-white'
          }`}
        >
          Sources ({userSources.length})
        </button>
        <button
          onClick={() => setActiveTab('discussions')}
          className={`flex-1 py-2 rounded-md transition-colors ${
            activeTab === 'discussions'
              ? 'bg-[#F2F0E8] dark:bg-[#25293A] text-[#12141A] dark:text-white shadow-xs'
              : 'text-[#686B73] dark:text-[#9BA1AC] hover:text-[#12141A] dark:hover:text-white'
          }`}
        >
          Discussions ({userDiscussions.length})
        </button>
      </div>

      {/* Tab Panels */}
      {activeTab === 'stacks' && (
        <div className="space-y-4">
          {userStacks.length === 0 ? (
            <div className="p-8 bg-[#F2F0E8] dark:bg-[#1E212D] rounded-xl border border-[#D5D1C4] dark:border-[#2C3142] text-center text-xs text-[#5E626E] dark:text-[#9BA1AC]">
              No public stacks created yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {userStacks.map((stk) => (
                <StackCard key={stk.id} stack={stk} />
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'sources' && (
        <div className="bg-[#F2F0E8] dark:bg-[#1E212D] rounded-xl border border-[#D5D1C4] dark:border-[#2C3142] overflow-hidden divide-y divide-[#D5D1C4] dark:divide-[#2C3142] shadow-xs">
          {userSources.length === 0 ? (
            <div className="p-8 text-center text-xs text-[#5E626E] dark:text-[#9BA1AC]">
              No saved sources yet.
            </div>
          ) : (
            userSources.map((source, idx) => {
              if (!source) return null;
              return <SourceRow key={source.id} source={source} index={idx} />;
            })
          )}
        </div>
      )}

      {activeTab === 'discussions' && (
        <div className="space-y-3">
          {userDiscussions.length === 0 ? (
            <div className="p-8 bg-[#F2F0E8] dark:bg-[#1E212D] rounded-xl border border-[#D5D1C4] dark:border-[#2C3142] text-center text-xs text-[#5E626E] dark:text-[#9BA1AC]">
              No active discussions started by this practitioner.
            </div>
          ) : (
            userDiscussions.map((d) => (
              <DiscussionItem key={d.id} discussion={d} />
            ))
          )}
        </div>
      )}

    </div>
  );
};
