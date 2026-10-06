import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { SourceRow } from '../components/SourceRow';
import { StackCard } from '../components/StackCard';
import { DiscussionItem } from '../components/DiscussionItem';
import { Search, X, Layers, MessageSquare, User, ArrowRight } from 'lucide-react';

export const SearchPage: React.FC = () => {
  const { sources, stacks, discussions, users, navigateTo } = useApp();
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'sources' | 'stacks' | 'discussions' | 'people'>('all');

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      return {
        sources: sources.slice(0, 6),
        stacks: stacks.slice(0, 3),
        discussions: discussions.slice(0, 3),
        people: users.slice(0, 4)
      };
    }

    const matchedSources = sources.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q) ||
        s.tags.some((t) => t.toLowerCase().includes(q)) ||
        s.source_number.includes(q)
    );

    const matchedStacks = stacks.filter(
      (stk) =>
        stk.name.toLowerCase().includes(q) ||
        stk.description.toLowerCase().includes(q) ||
        stk.role.toLowerCase().includes(q)
    );

    const matchedDiscussions = discussions.filter(
      (d) =>
        d.title.toLowerCase().includes(q) ||
        d.body.toLowerCase().includes(q) ||
        d.category.toLowerCase().includes(q)
    );

    const matchedUsers = users.filter(
      (u) =>
        u.username.toLowerCase().includes(q) ||
        u.display_name.toLowerCase().includes(q) ||
        u.role.toLowerCase().includes(q)
    );

    return {
      sources: matchedSources,
      stacks: matchedStacks,
      discussions: matchedDiscussions,
      people: matchedUsers
    };
  }, [query, sources, stacks, discussions, users]);

  const totalMatches =
    results.sources.length +
    results.stacks.length +
    results.discussions.length +
    results.people.length;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Search Header Bar */}
      <div className="space-y-4">
        <div className="text-xs font-mono uppercase tracking-widest text-[#B855F6]">
          GLOBAL SEARCH
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#111318] dark:text-white tracking-tight">
          Search the Cybersecurity Archive
        </h1>

        <div className="relative pt-2">
          <Search className="w-5 h-5 text-[#8C8F99] dark:text-[#7B8190] absolute left-4 top-1/2 -translate-y-1/2 pt-1" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search tools, resources, stacks & discussions... (⌘K)"
            className="w-full pl-12 pr-10 py-3.5 bg-[#F2F0E8] dark:bg-[#1E212D] text-base text-[#111318] dark:text-white rounded-xl border border-[#D5D1C4] dark:border-[#2C3142] focus:outline-none focus:border-[#B855F6] dark:focus:border-[#B855F6] shadow-xs"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 pt-1 text-[#8C8F99] hover:text-[#111318] dark:hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center justify-between border-b border-[#D5D1C4] dark:border-[#2C3142] pb-2 text-xs">
        <div className="flex items-center gap-1 font-medium overflow-x-auto">
          {(['all', 'sources', 'stacks', 'discussions', 'people'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 rounded capitalize transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === tab
                  ? 'bg-[#B855F6] text-white shadow-xs'
                  : 'text-[#5E626E] dark:text-[#9BA1AC] hover:text-[#111318] dark:hover:text-white hover:bg-[#E4E1D7] dark:hover:bg-[#252937]'
              }`}
            >
              {tab === 'all'
                ? `All (${totalMatches})`
                : tab === 'sources'
                ? `Sources (${results.sources.length})`
                : tab === 'stacks'
                ? `Stacks (${results.stacks.length})`
                : tab === 'discussions'
                ? `Discussions (${results.discussions.length})`
                : `People (${results.people.length})`}
            </button>
          ))}
        </div>

        <div className="hidden sm:block text-xs font-mono text-[#8C8F99] dark:text-[#7B8190]">
          {query ? `Results for "${query}"` : 'Curated archive index'}
        </div>
      </div>

      {/* Results Layout */}
      <div className="space-y-10">
        
        {/* Sources Section */}
        {(activeTab === 'all' || activeTab === 'sources') && results.sources.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-mono uppercase tracking-widest text-[#B855F6]">
                SOURCES ({results.sources.length})
              </h2>
              {activeTab === 'all' && results.sources.length > 5 && (
                <button
                  onClick={() => setActiveTab('sources')}
                  className="text-xs font-semibold text-[#111318] dark:text-white hover:text-[#B855F6] cursor-pointer"
                >
                  View all sources →
                </button>
              )}
            </div>
            <div className="bg-[#F2F0E8] dark:bg-[#1E212D] rounded-xl border border-[#D5D1C4] dark:border-[#2C3142] overflow-hidden divide-y divide-[#D5D1C4] dark:divide-[#2C3142]">
              {results.sources.slice(0, activeTab === 'all' ? 5 : undefined).map((source, idx) => (
                <SourceRow key={source.id} source={source} index={idx} />
              ))}
            </div>
          </div>
        )}

        {/* Stacks Section */}
        {(activeTab === 'all' || activeTab === 'stacks') && results.stacks.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-mono uppercase tracking-widest text-[#B855F6]">
                STACKS ({results.stacks.length})
              </h2>
              {activeTab === 'all' && results.stacks.length > 3 && (
                <button
                  onClick={() => setActiveTab('stacks')}
                  className="text-xs font-semibold text-[#111318] dark:text-white hover:text-[#B855F6] cursor-pointer"
                >
                  View all stacks →
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.stacks.slice(0, activeTab === 'all' ? 3 : undefined).map((stk) => (
                <StackCard key={stk.id} stack={stk} />
              ))}
            </div>
          </div>
        )}

        {/* Discussions Section */}
        {(activeTab === 'all' || activeTab === 'discussions') && results.discussions.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-mono uppercase tracking-widest text-[#B855F6]">
                DISCUSSIONS ({results.discussions.length})
              </h2>
            </div>
            <div className="space-y-3">
              {results.discussions.slice(0, activeTab === 'all' ? 3 : undefined).map((d) => (
                <DiscussionItem key={d.id} discussion={d} />
              ))}
            </div>
          </div>
        )}

        {/* People Section */}
        {(activeTab === 'all' || activeTab === 'people') && results.people.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-mono uppercase tracking-widest text-[#B855F6]">
                PRACTITIONERS ({results.people.length})
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {results.people.map((u) => (
                <div
                  key={u.id}
                  onClick={() => navigateTo(`/profile/${u.username}`)}
                  className="p-4 bg-[#F2F0E8] dark:bg-[#1E212D] rounded-lg border border-[#D5D1C4] dark:border-[#2C3142] hover:border-[#B855F6] dark:hover:border-[#B855F6] transition-all cursor-pointer group space-y-2 shadow-xs"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-bold text-sm text-[#111318] dark:text-white group-hover:text-[#B855F6] transition-colors">
                        {u.display_name}
                      </div>
                      <div className="font-mono text-xs text-[#8C8F99] dark:text-[#7B8190]">
                        @{u.username}
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-[#B855F6] bg-[#B855F6]/10 px-2 py-0.5 rounded">
                      {u.role}
                    </span>
                  </div>
                  <p className="text-xs text-[#5E626E] dark:text-[#9BA1AC] line-clamp-2">
                    {u.bio}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {totalMatches === 0 && (
          <div className="py-16 text-center text-[#5E626E] dark:text-[#9BA1AC] space-y-2 bg-[#F2F0E8] dark:bg-[#1E212D] rounded-xl border border-[#D5D1C4] dark:border-[#2C3142]">
            <p className="text-base font-semibold text-[#111318] dark:text-white">No results found for "{query}"</p>
            <p className="text-xs text-[#8C8F99] dark:text-[#7B8190]">
              Check spelling or try a broader term like "Recon", "Active Directory", or "Burp".
            </p>
          </div>
        )}

      </div>

    </div>
  );
};
