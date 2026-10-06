import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { Search, X, Layers, MessageSquare, User, ArrowRight, CornerDownLeft, Sparkles } from 'lucide-react';

export const SearchModal: React.FC = () => {
  const {
    isSearchOpen,
    setIsSearchOpen,
    sources,
    stacks,
    discussions,
    users,
    navigateTo,
    searchInitialQuery
  } = useApp();

  const [query, setQuery] = useState(searchInitialQuery || '');
  const [activeTab, setActiveTab] = useState<'all' | 'sources' | 'stacks' | 'discuss' | 'people'>('all');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setQuery(searchInitialQuery || '');
      setSelectedIndex(0);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [isSearchOpen, searchInitialQuery]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      // Default top suggestions
      return {
        sources: sources.slice(0, 4),
        stacks: stacks.slice(0, 2),
        discussions: discussions.slice(0, 2),
        people: users.slice(0, 2)
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

  // Flattened list for keyboard navigation
  const flatItems = useMemo(() => {
    const items: Array<{
      type: 'source' | 'stack' | 'discussion' | 'user';
      title: string;
      subtitle: string;
      meta?: string;
      url: string;
    }> = [];

    if (activeTab === 'all' || activeTab === 'sources') {
      results.sources.forEach((s) => {
        items.push({
          type: 'source',
          title: s.name,
          subtitle: s.description,
          meta: `SOURCE / ${s.source_number} · ${s.category}`,
          url: `/sources/${s.slug}`
        });
      });
    }

    if (activeTab === 'all' || activeTab === 'stacks') {
      results.stacks.forEach((stk) => {
        items.push({
          type: 'stack',
          title: stk.name,
          subtitle: stk.description,
          meta: `STACK · by @${stk.author.username} · ${stk.role}`,
          url: `/stacks/${stk.slug}`
        });
      });
    }

    if (activeTab === 'all' || activeTab === 'discuss') {
      results.discussions.forEach((d) => {
        items.push({
          type: 'discussion',
          title: d.title,
          subtitle: d.body.slice(0, 90) + '...',
          meta: `DISCUSS · ${d.category} · ${d.upvotes} upvotes`,
          url: `/discuss/${d.slug}`
        });
      });
    }

    if (activeTab === 'all' || activeTab === 'people') {
      results.people.forEach((u) => {
        items.push({
          type: 'user',
          title: u.display_name,
          subtitle: u.bio,
          meta: `@${u.username} · ${u.role}`,
          url: `/profile/${u.username}`
        });
      });
    }

    return items;
  }, [results, activeTab]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(flatItems.length, 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + flatItems.length) % Math.max(flatItems.length, 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const item = flatItems[selectedIndex];
      if (item) {
        setIsSearchOpen(false);
        navigateTo(item.url);
      }
    }
  };

  if (!isSearchOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="w-full max-w-2xl bg-[#E7E5DE] dark:bg-[#1A1D27] rounded-xl shadow-2xl border border-[#D5D1C4] dark:border-[#2C3142] overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b border-[#D5D1C4] dark:border-[#2C3142] flex items-center gap-3 bg-[#F2F0E8] dark:bg-[#1E212D]">
          <Search className="w-5 h-5 text-[#686B73] dark:text-[#8C92A0] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Search tools, resources, stacks & discussions... ⌘K"
            className="w-full bg-transparent text-base text-[#12141A] dark:text-white placeholder-[#8C8F99] dark:placeholder-[#6C717E] focus:outline-none"
          />
          {query && (
            <button
              onClick={() => {
                setQuery('');
                inputRef.current?.focus();
              }}
              className="p-1 text-[#686B73] dark:text-[#8C92A0] hover:text-[#12141A] dark:hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-[#DDD9CE] dark:bg-[#25293A] text-[#686B73] dark:text-[#8C92A0] rounded border border-[#D5D1C4] dark:border-[#333845]">
            ESC
          </kbd>
        </div>

        {/* Filter Segmented Controls */}
        <div className="flex items-center gap-1 px-4 py-2 bg-[#DDD9CE] dark:bg-[#161822] border-b border-[#D5D1C4] dark:border-[#2C3142] text-xs overflow-x-auto">
          {(['all', 'sources', 'stacks', 'discuss', 'people'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setSelectedIndex(0);
              }}
              className={`px-3 py-1 rounded capitalize font-medium transition-colors whitespace-nowrap ${
                activeTab === tab
                  ? 'bg-[#F2F0E8] dark:bg-[#25293A] text-[#12141A] dark:text-white shadow-xs'
                  : 'text-[#686B73] dark:text-[#8C92A0] hover:text-[#12141A] dark:hover:text-white'
              }`}
            >
              {tab === 'all' ? 'All Results' : tab}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-2 divide-y divide-[#DDD9CE] dark:divide-[#25293A]">
          {flatItems.length === 0 ? (
            <div className="py-12 text-center text-[#686B73] dark:text-[#8C92A0] space-y-2">
              <p className="text-sm">No matches found for "{query}".</p>
              <p className="text-xs text-[#8C8F99] dark:text-[#6C717E]">
                Try searching for "Nmap", "Recon", "Active Directory", or "@bruno".
              </p>
            </div>
          ) : (
            flatItems.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={`${item.type}-${idx}`}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  onClick={() => {
                    setIsSearchOpen(false);
                    navigateTo(item.url);
                  }}
                  className={`p-3 rounded-lg cursor-pointer transition-colors flex items-center justify-between group ${
                    isSelected ? 'bg-[#F2F0E8] dark:bg-[#25293A] shadow-xs' : 'hover:bg-[#F2F0E8]/70 dark:hover:bg-[#1E212D]'
                  }`}
                >
                  <div className="space-y-1 min-w-0 pr-4">
                    <div className="text-[11px] font-mono uppercase tracking-wider text-[#B855F6]">
                      {item.meta}
                    </div>
                    <div className="text-sm font-semibold text-[#12141A] dark:text-white group-hover:text-[#B855F6] transition-colors truncate">
                      {item.title}
                    </div>
                    <p className="text-xs text-[#686B73] dark:text-[#9BA1AC] line-clamp-1">
                      {item.subtitle}
                    </p>
                  </div>

                  <div className="shrink-0 flex items-center gap-2">
                    {isSelected && (
                      <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-mono text-[#8C8F99] dark:text-[#7B8190]">
                        Open <CornerDownLeft className="w-3 h-3" />
                      </span>
                    )}
                    <ArrowRight className={`w-4 h-4 transition-transform ${isSelected ? 'translate-x-1 text-[#B855F6]' : 'text-[#8C8F99] dark:text-[#5C6170]'}`} />
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-[#DDD9CE]/60 dark:bg-[#161822] border-t border-[#D5D1C4] dark:border-[#2C3142] flex items-center justify-between text-[11px] font-mono text-[#686B73] dark:text-[#8C92A0]">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>Esc Close</span>
          </div>
          <div>
            <span>CYBERSOURCES DISCOVERY ENGINE</span>
          </div>
        </div>
      </div>
    </div>
  );
};
