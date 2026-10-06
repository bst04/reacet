import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { Source, ResourceSubtype, CategoryName } from '../types';
import {
  Search,
  BookOpen,
  Database,
  FileCode,
  Layers,
  Shield,
  ExternalLink,
  Plus,
  Bookmark,
  BookmarkCheck,
  ArrowRight,
  Filter,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { motion } from 'motion/react';

export const ResourcesPage: React.FC = () => {
  const {
    sources,
    navigateTo,
    isSourceSaved,
    saveSource,
    unsaveSource,
    openAddToStack
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubtype, setSelectedSubtype] = useState<ResourceSubtype | 'all'>('all');
  const [selectedCategory, setSelectedCategory] = useState<CategoryName | 'All'>('All');

  // Filter only sources marked as resources (or having a resource_subtype)
  const allResources = useMemo(() => {
    return sources.filter(
      (s) => s.kind === 'resource' || s.resource_subtype !== undefined || s.tags.includes('cheatsheet') || s.tags.includes('wordlists') || s.tags.includes('framework')
    );
  }, [sources]);

  const filteredResources = useMemo(() => {
    return allResources.filter((r) => {
      // Subtype check
      if (selectedSubtype !== 'all' && r.resource_subtype !== selectedSubtype) {
        return false;
      }

      // Category check
      if (selectedCategory !== 'All') {
        const matchesMain = r.category === selectedCategory;
        const matchesSecondary = r.secondary_categories?.includes(selectedCategory);
        if (!matchesMain && !matchesSecondary) return false;
      }

      // Search query check
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = r.name.toLowerCase().includes(q);
        const matchesDesc = r.description.toLowerCase().includes(q);
        const matchesTags = r.tags.some((t) => t.toLowerCase().includes(q));
        const matchesUses = r.used_for.some((u) => u.toLowerCase().includes(q));
        return matchesName || matchesDesc || matchesTags || matchesUses;
      }

      return true;
    });
  }, [allResources, selectedSubtype, selectedCategory, searchQuery]);

  const subtypeFilters: { key: ResourceSubtype | 'all'; label: string; icon: React.FC<{ className?: string }> }[] = [
    { key: 'all', label: 'All Resources', icon: BookOpen },
    { key: 'cheatsheet', label: 'Cheat Sheets & Bypasses', icon: FileCode },
    { key: 'database', label: 'Vulnerability Databases', icon: Database },
    { key: 'wordlist', label: 'Wordlists & Dictionaries', icon: Layers },
    { key: 'framework', label: 'Threat Intel & Frameworks', icon: Shield },
    { key: 'playbook', label: 'Detection Playbooks', icon: Sparkles },
    { key: 'lab', label: 'Interactive Labs', icon: CheckCircle2 }
  ];

  const categories: (CategoryName | 'All')[] = [
    'All',
    'Pentesting',
    'Web Security',
    'Recon',
    'OSINT',
    'Red Team',
    'Blue Team',
    'Vulnerability Management',
    'Security Research'
  ];

  const getSubtypeBadge = (subtype?: ResourceSubtype) => {
    switch (subtype) {
      case 'cheatsheet':
        return { label: 'Cheat Sheet', color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30' };
      case 'database':
        return { label: 'Vulnerability Feed', color: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30' };
      case 'wordlist':
        return { label: 'Wordlist Collection', color: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30' };
      case 'framework':
        return { label: 'Security Framework', color: 'bg-[#7C3AED]/10 text-[#7C3AED] dark:text-[#8B5CF6] border-[#7C3AED]/30' };
      case 'playbook':
        return { label: 'Detection Playbook', color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30' };
      case 'lab':
        return { label: 'Practice Lab', color: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/30' };
      default:
        return { label: 'Security Resource', color: 'bg-zinc-500/10 text-zinc-600 dark:text-zinc-400 border-zinc-500/30' };
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header Dossier */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#D5D1C4] dark:border-[#2C3142]">
        <div className="space-y-2">
          <div className="text-xs font-mono uppercase tracking-widest text-[#7C3AED] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#7C3AED]" />
            <span>KNOWLEDGE ARCHIVE & METHODOLOGIES</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#12141A] dark:text-white tracking-tight">
            Cybersecurity Resources
          </h1>
          <p className="text-sm sm:text-base text-[#5E626E] dark:text-[#9BA1AC] max-w-2xl leading-relaxed">
            Essential reference manuals, attack cheat sheets, vulnerability feeds, fuzzer dictionaries, and threat models curated for practitioners.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-4 py-2.5 rounded-xl bg-[#F2F0E8] dark:bg-[#1E212D] border border-[#D5D1C4] dark:border-[#2C3142] text-xs font-mono">
            <span className="text-[#8C8F99] dark:text-[#7B8190] uppercase">Cataloged: </span>
            <span className="font-bold text-[#12141A] dark:text-white tabular-nums">{allResources.length} Resources</span>
          </div>
        </div>
      </div>

      {/* Subtype Segmented Selector */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {subtypeFilters.map((filter) => {
          const Icon = filter.icon;
          const isActive = selectedSubtype === filter.key;
          return (
            <button
              key={filter.key}
              onClick={() => setSelectedSubtype(filter.key)}
              className={`inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer border ${
                isActive
                  ? 'bg-[#7C3AED] text-white border-[#7C3AED] shadow-sm shadow-[#7C3AED]/25'
                  : 'bg-[#F2F0E8] dark:bg-[#1E212D] text-[#5E626E] dark:text-[#9BA1AC] border-[#D5D1C4] dark:border-[#2C3142] hover:text-[#12141A] dark:hover:text-white hover:border-[#7C3AED]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{filter.label}</span>
            </button>
          );
        })}
      </div>

      {/* Controls: Search and Categories */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 bg-[#F2F0E8] dark:bg-[#1E212D] rounded-xl border border-[#D5D1C4] dark:border-[#2C3142] shadow-xs">
        
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-[#8C8F99] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search cheat sheets, wordlists, CVE feeds, frameworks..."
            className="w-full pl-10 pr-4 py-2 bg-[#E7E5DE] dark:bg-[#161822] text-xs sm:text-sm text-[#12141A] dark:text-white rounded-lg border border-[#D5D1C4] dark:border-[#2C3142] focus:outline-none focus:border-[#7C3AED] transition-colors"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none text-xs">
          <span className="text-[11px] font-mono text-[#8C8F99] uppercase mr-1 hidden lg:inline">Domain:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#181A22] dark:bg-[#25293A] text-white font-medium'
                  : 'text-[#5E626E] dark:text-[#9BA1AC] hover:text-[#12141A] dark:hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

      </div>

      {/* Resources Cards Grid */}
      {filteredResources.length === 0 ? (
        <div className="py-16 text-center bg-[#F2F0E8] dark:bg-[#1E212D] rounded-xl border border-[#D5D1C4] dark:border-[#2C3142] space-y-3">
          <BookOpen className="w-8 h-8 text-[#8C8F99] mx-auto" />
          <p className="text-sm font-semibold text-[#12141A] dark:text-white">No cybersecurity resources match your criteria.</p>
          <p className="text-xs text-[#5E626E] dark:text-[#9BA1AC]">
            Try adjusting your search query or selecting "All Resources".
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedSubtype('all');
              setSelectedCategory('All');
            }}
            className="px-4 py-1.5 text-xs font-semibold text-[#7C3AED] hover:underline cursor-pointer"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource, idx) => {
            const saved = isSourceSaved(resource.slug);
            const badge = getSubtypeBadge(resource.resource_subtype);

            return (
              <motion.div
                key={resource.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.35,
                  delay: Math.min(idx * 0.04, 0.4),
                  ease: [0.22, 1, 0.36, 1]
                }}
                whileHover={{ y: -3 }}
                className="group relative bg-[#F2F0E8] dark:bg-[#1E212D] rounded-xl border border-[#D5D1C4] dark:border-[#2C3142] hover:border-[#7C3AED] dark:hover:border-[#7C3AED] p-6 flex flex-col justify-between transition-all duration-150 shadow-xs hover:shadow-lg hover:shadow-[#7C3AED]/10 cursor-pointer"
                onClick={() => navigateTo(`/sources/${resource.slug}`)}
              >
                {/* Accent top indicator on hover */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#7C3AED] opacity-0 group-hover:opacity-100 transition-opacity rounded-t-xl" />

                <div className="space-y-4">
                  
                  {/* Top metadata badge row */}
                  <div className="flex items-center justify-between gap-2">
                    <span className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded border ${badge.color}`}>
                      {badge.label}
                    </span>
                    <span className="text-xs font-mono font-semibold text-[#8C8F99] dark:text-[#7B8190]">
                      #{resource.source_number}
                    </span>
                  </div>

                  {/* Title and Short Description */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold tracking-tight text-[#12141A] dark:text-white group-hover:text-[#7C3AED] transition-colors">
                        {resource.name}
                      </h3>
                      <ArrowRight className="w-4 h-4 text-[#8C8F99] group-hover:text-[#7C3AED] group-hover:translate-x-1 transition-all" />
                    </div>
                    <p className="text-xs sm:text-sm text-[#5E626E] dark:text-[#9BA1AC] line-clamp-2 leading-relaxed">
                      {resource.description}
                    </p>
                  </div>

                  {/* Concrete Use Cases / Highlights */}
                  {resource.used_for.length > 0 && (
                    <div className="pt-2 border-t border-[#D5D1C4]/60 dark:border-[#2C3142]/60 space-y-1.5">
                      <div className="text-[10px] font-mono uppercase tracking-wider text-[#8C8F99] dark:text-[#7B8190]">
                        Key Applications:
                      </div>
                      <div className="space-y-1">
                        {resource.used_for.slice(0, 2).map((u, i) => (
                          <div key={i} className="text-xs text-[#12141A] dark:text-[#E2E6EF] flex items-start gap-1.5 line-clamp-1">
                            <span className="text-[#7C3AED] font-bold">›</span>
                            <span>{u}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Tags */}
                  <div className="flex items-center flex-wrap gap-1.5 pt-1">
                    {resource.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono px-2 py-0.5 bg-[#E7E5DE] dark:bg-[#161822] text-[#5E626E] dark:text-[#9BA1AC] rounded"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                </div>

                {/* Footer Action Strip */}
                <div className="pt-5 mt-5 border-t border-[#D5D1C4] dark:border-[#2C3142] flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[#12141A] dark:text-white font-medium">{resource.category}</span>
                    <span className="text-[#8C8F99]">·</span>
                    <span className="font-mono text-[#8C8F99]">{resource.pricing}</span>
                  </div>

                  <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => openAddToStack(resource)}
                      title="Add to Stack"
                      className="p-1.5 rounded text-[#5E626E] dark:text-[#9BA1AC] hover:text-[#12141A] dark:hover:text-white hover:bg-[#E7E5DE] dark:hover:bg-[#25293A] transition-colors cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => (saved ? unsaveSource(resource.slug) : saveSource(resource.slug))}
                      title={saved ? 'Remove from saved' : 'Save resource'}
                      className={`p-1.5 rounded transition-colors cursor-pointer ${
                        saved
                          ? 'text-[#7C3AED] bg-[#7C3AED]/15'
                          : 'text-[#5E626E] dark:text-[#9BA1AC] hover:text-[#12141A] dark:hover:text-white hover:bg-[#E7E5DE] dark:hover:bg-[#25293A]'
                      }`}
                    >
                      {saved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                    </button>

                    {resource.website_url && (
                      <a
                        href={resource.website_url}
                        target="_blank"
                        rel="noreferrer"
                        title="Open Resource External Website"
                        className="p-1.5 rounded text-[#5E626E] dark:text-[#9BA1AC] hover:text-[#7C3AED] transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>
      )}

    </div>
  );
};
