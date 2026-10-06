import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { SourceRow } from '../components/SourceRow';
import { CategoryName } from '../types';
import { Search, Filter, SlidersHorizontal, Plus } from 'lucide-react';

const CATEGORIES: CategoryName[] = [
  'All',
  'Recon',
  'OSINT',
  'Pentesting',
  'Web Security',
  'Network Security',
  'Red Team',
  'Blue Team',
  'SOC',
  'DFIR',
  'Malware Analysis',
  'Cloud Security',
  'DevSecOps',
  'Privacy',
  'Bug Bounty',
  'CTF',
  'Security Research',
  'Automation',
  'Cryptography',
  'Forensics',
  'Vulnerability Management'
];

export const SourcesPage: React.FC = () => {
  const { sources, navigateTo } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<CategoryName>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [pricingFilter, setPricingFilter] = useState<'All' | 'Free / Open Source' | 'Freemium' | 'Commercial'>('All');
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'number' | 'name' | 'recent'>('number');

  const filteredSources = useMemo(() => {
    return sources
      .filter((s) => {
        // Category
        if (selectedCategory !== 'All') {
          const matchPrimary = s.category === selectedCategory;
          const matchSecondary = s.secondary_categories?.includes(selectedCategory);
          if (!matchPrimary && !matchSecondary) return false;
        }

        // Query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = s.name.toLowerCase().includes(q);
          const matchDesc = s.description.toLowerCase().includes(q);
          const matchTag = s.tags.some((t) => t.toLowerCase().includes(q));
          const matchNumber = s.source_number.includes(q);
          if (!matchName && !matchDesc && !matchTag && !matchNumber) return false;
        }

        // Pricing
        if (pricingFilter !== 'All') {
          if (s.pricing !== pricingFilter) return false;
        }

        // Verified
        if (verifiedOnly && !s.verified) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        if (sortBy === 'recent') return b.created_at.localeCompare(a.created_at);
        return a.source_number.localeCompare(b.source_number);
      });
  }, [sources, selectedCategory, searchQuery, pricingFilter, verifiedOnly, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#D5D1C4] dark:border-[#2C3142]">
        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-[#B855F6]">
            PRIMARY ARCHIVE
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#111318] dark:text-white tracking-tight mt-1">
            Cybersecurity Sources
          </h1>
          <p className="text-sm text-[#5E626E] dark:text-[#9BA1AC] mt-2 max-w-2xl leading-relaxed">
            Curated tools, security resources, and specialized services. Every item verified with license, tags, community stacks, and workflows.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-xs font-mono text-[#8C8F99] dark:text-[#7B8190]">
            SHOWING <span className="font-bold text-[#111318] dark:text-white tabular-nums">{filteredSources.length}</span> OF <span className="tabular-nums">{sources.length}</span>
          </div>
          <button
            onClick={() => navigateTo('/submit')}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-[#B855F6] hover:bg-[#A23BE9] rounded-md transition-colors shadow-md shadow-[#B855F6]/20 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Submit Source</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 p-4 bg-[#F2F0E8] dark:bg-[#1E212D] rounded-xl border border-[#D5D1C4] dark:border-[#2C3142]">
        
        {/* Search */}
        <div className="md:col-span-5 relative">
          <Search className="w-4 h-4 text-[#8C8F99] dark:text-[#6C717E] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by tool name, tag, or #number..."
            className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm text-[#111318] dark:text-white bg-[#E7E5DE] dark:bg-[#181A24] rounded-md border border-[#D5D1C4] dark:border-[#2C3142] focus:outline-none focus:border-[#B855F6]"
          />
        </div>

        {/* Pricing Filter */}
        <div className="md:col-span-3">
          <select
            value={pricingFilter}
            onChange={(e) => setPricingFilter(e.target.value as any)}
            className="w-full px-3 py-2 text-xs sm:text-sm text-[#111318] dark:text-white bg-[#E7E5DE] dark:bg-[#181A24] rounded-md border border-[#D5D1C4] dark:border-[#2C3142] focus:outline-none focus:border-[#B855F6]"
          >
            <option value="All">All Licenses & Pricing</option>
            <option value="Free / Open Source">Free / Open Source</option>
            <option value="Freemium">Freemium</option>
            <option value="Commercial">Commercial</option>
          </select>
        </div>

        {/* Sort */}
        <div className="md:col-span-2">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="w-full px-3 py-2 text-xs sm:text-sm text-[#111318] dark:text-white bg-[#E7E5DE] dark:bg-[#181A24] rounded-md border border-[#D5D1C4] dark:border-[#2C3142] focus:outline-none focus:border-[#B855F6]"
          >
            <option value="number">Order: Source #</option>
            <option value="name">Order: Alphabetical</option>
            <option value="recent">Order: Recently Added</option>
          </select>
        </div>

        {/* Verified Toggle */}
        <div className="md:col-span-2 flex items-center justify-center">
          <label className="flex items-center gap-2 cursor-pointer text-xs font-mono text-[#5E626E] dark:text-[#9BA1AC]">
            <input
              type="checkbox"
              checked={verifiedOnly}
              onChange={(e) => setVerifiedOnly(e.target.checked)}
              className="accent-[#B855F6] rounded"
            />
            <span>Verified Only</span>
          </label>
        </div>

      </div>

      {/* Category Pills / Tab Strip */}
      <div className="space-y-2">
        <div className="text-[11px] font-mono uppercase tracking-widest text-[#8C8F99] dark:text-[#7B8190]">
          Categories ({CATEGORIES.length - 1})
        </div>
        <div className="flex items-center gap-1.5 flex-wrap">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#B855F6] text-white shadow-xs'
                  : 'bg-[#F2F0E8] dark:bg-[#1E212D] text-[#5E626E] dark:text-[#9BA1AC] border border-[#D5D1C4] dark:border-[#2C3142] hover:text-[#111318] dark:hover:text-white hover:border-[#B855F6]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Editorial Row Container */}
      <div className="bg-[#F2F0E8] dark:bg-[#1E212D] rounded-xl border border-[#D5D1C4] dark:border-[#2C3142] overflow-hidden divide-y divide-[#D5D1C4] dark:divide-[#2C3142] shadow-xs">
        {filteredSources.length === 0 ? (
          <div className="py-16 text-center text-[#5E626E] dark:text-[#9BA1AC] space-y-2">
            <p className="text-base font-semibold text-[#111318] dark:text-white">No sources found matching your criteria</p>
            <p className="text-xs text-[#8C8F99] dark:text-[#6C717E]">
              Try resetting the filters or submit a new tool to the archive.
            </p>
            <div className="pt-3">
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                  setPricingFilter('All');
                  setVerifiedOnly(false);
                }}
                className="px-4 py-2 text-xs font-semibold text-[#111318] dark:text-white bg-[#E7E5DE] dark:bg-[#252937] hover:bg-[#DDD9CE] dark:hover:bg-[#2D3243] rounded-md transition-colors cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          </div>
        ) : (
          filteredSources.map((source, idx) => (
            <SourceRow key={source.id} source={source} index={idx} />
          ))
        )}
      </div>

    </div>
  );
};
