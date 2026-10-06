import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SourceRow } from '../components/SourceRow';
import { StackCard } from '../components/StackCard';
import { DiscussionItem } from '../components/DiscussionItem';
import { Search, ArrowRight, Layers, Terminal, Sparkles, Plus, Compass, BookOpen, FileCode, Database, Shield, ExternalLink, Bookmark, BookmarkCheck } from 'lucide-react';
import { CategoryName } from '../types';
import { motion } from 'motion/react';

export const HomePage: React.FC = () => {
  const { sources, stacks, discussions, users, navigateTo, setIsSearchOpen, openAddToStack, isSourceSaved, saveSource, unsaveSource } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<CategoryName | 'All'>('All');
  const [sourceTypeFilter, setSourceTypeFilter] = useState<'all' | 'tools' | 'resources'>('all');

  // Filter sources for editorial row list
  const filteredSources = sources.filter((s) => {
    // Type filter
    if (sourceTypeFilter === 'tools' && s.kind === 'resource') return false;
    if (sourceTypeFilter === 'resources' && s.kind !== 'resource') return false;

    // Category filter
    if (selectedCategory !== 'All') {
      const matchesMain = s.category === selectedCategory;
      const matchesSecondary = s.secondary_categories?.includes(selectedCategory);
      if (!matchesMain && !matchesSecondary) return false;
    }

    return true;
  }).slice(0, 10);

  // Top highlight resources
  const featuredResources = sources.filter(
    (s) => s.kind === 'resource' || s.resource_subtype !== undefined
  ).slice(0, 6);

  const curatedCategories: Array<CategoryName | 'All'> = [
    'All',
    'Recon',
    'OSINT',
    'Pentesting',
    'Web Security',
    'Network Security',
    'Red Team',
    'Blue Team',
    'SOC',
    'DFIR'
  ];

  return (
    <div className="space-y-20 sm:space-y-28">
      
      {/* 01 — HERO */}
      <section className="pt-12 sm:pt-20 max-w-4xl mx-auto text-center px-4 space-y-6">
        
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-[#7C3AED]">
          <span className="w-2 h-2 rounded-full bg-[#7C3AED]" />
          CYBERSECURITY DISCOVERY PLATFORM
        </div>

        {/* Large Editorial Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#12141A] dark:text-white leading-[1.08] text-balance">
          DISCOVER CYBERSECURITY.
        </h1>

        {/* Supporting text */}
        <p className="text-base sm:text-xl text-[#5E626E] dark:text-[#9BA1AC] max-w-2xl mx-auto leading-relaxed font-normal">
          Find the tools and resources people use, explore real cybersecurity stacks, and discover how others work.
        </p>

        {/* CTAs */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => navigateTo('/sources')}
            className="w-full sm:w-auto px-6 py-3 text-sm font-semibold text-white bg-[#7C3AED] hover:bg-[#6D28D9] rounded-lg transition-colors flex items-center justify-center gap-2 shadow-md shadow-[#7C3AED]/20 cursor-pointer"
          >
            <span>EXPLORE SOURCES</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => navigateTo('/resources')}
            className="w-full sm:w-auto px-6 py-3 text-sm font-semibold text-[#12141A] dark:text-white bg-[#F2F0E8] dark:bg-[#1E212D] border border-[#D5D1C4] dark:border-[#2C3142] hover:border-[#7C3AED] dark:hover:border-[#7C3AED] hover:text-[#7C3AED] rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
          >
            <BookOpen className="w-4 h-4 text-[#7C3AED]" />
            <span>SECURITY RESOURCES</span>
          </button>
          <button
            onClick={() => navigateTo('/stacks')}
            className="w-full sm:w-auto px-6 py-3 text-sm font-semibold text-[#5E626E] dark:text-[#9BA1AC] bg-[#F2F0E8] dark:bg-[#1E212D] border border-[#D5D1C4] dark:border-[#2C3142] hover:border-[#7C3AED] dark:hover:border-[#7C3AED] hover:text-[#12141A] dark:hover:text-white rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
          >
            <span>EXPLORE STACKS</span>
            <Layers className="w-4 h-4 text-[#7C3AED]" />
          </button>
        </div>

        {/* Large Search Bar Trigger */}
        <div className="pt-6 max-w-2xl mx-auto">
          <div
            onClick={() => setIsSearchOpen(true)}
            className="group w-full p-3.5 sm:p-4 bg-[#F2F0E8] dark:bg-[#1E212D] rounded-xl border border-[#D5D1C4] dark:border-[#2C3142] hover:border-[#7C3AED] dark:hover:border-[#7C3AED] shadow-xs cursor-pointer flex items-center justify-between transition-all"
          >
            <div className="flex items-center gap-3 text-[#8C8F99] dark:text-[#6C717E] group-hover:text-[#5E626E] dark:group-hover:text-[#9BA1AC] transition-colors">
              <Search className="w-5 h-5 text-[#7C3AED]" />
              <span className="text-sm sm:text-base text-left font-normal text-[#5E626E] dark:text-[#9BA1AC]">
                Search tools, resources, stacks and discussions...
              </span>
            </div>
            <kbd className="hidden sm:inline-block px-2 py-1 text-xs font-mono bg-[#E5E2D7] dark:bg-[#252937] text-[#5E626E] dark:text-[#9BA1AC] rounded border border-[#D5D1C4] dark:border-[#33384A]">
              ⌘K
            </kbd>
          </div>
        </div>
      </section>

      {/* 02 — PLATFORM STATS (Real Database-Driven Numbers Only) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 sm:p-8 bg-[#F2F0E8]/70 dark:bg-[#1E212D] rounded-xl border border-[#D5D1C4] dark:border-[#2C3142]">
          <div className="space-y-1 border-r border-[#D5D1C4] dark:border-[#2C3142] pr-4">
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-[#12141A] dark:text-white tabular-nums">
              {sources.length}
            </div>
            <div className="text-xs font-mono uppercase tracking-wider text-[#5E626E] dark:text-[#9BA1AC]">
              Curated Sources
            </div>
          </div>

          <div className="space-y-1 sm:border-r border-[#D5D1C4] dark:border-[#2C3142] pr-4">
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-[#12141A] dark:text-white tabular-nums">
              {featuredResources.length > 0 ? sources.filter(s => s.kind === 'resource').length : 12}
            </div>
            <div className="text-xs font-mono uppercase tracking-wider text-[#7C3AED] dark:text-[#8B5CF6]">
              Security Resources
            </div>
          </div>

          <div className="space-y-1 border-r border-[#D5D1C4] dark:border-[#2C3142] pr-4">
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-[#12141A] dark:text-white tabular-nums">
              {stacks.length}
            </div>
            <div className="text-xs font-mono uppercase tracking-wider text-[#5E626E] dark:text-[#9BA1AC]">
              Practitioner Stacks
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-[#12141A] dark:text-white tabular-nums">
              {users.length}
            </div>
            <div className="text-xs font-mono uppercase tracking-wider text-[#5E626E] dark:text-[#9BA1AC]">
              Active Practitioners
            </div>
          </div>
        </div>
      </section>

      {/* 03 — EXPLORE SOURCES (The Primary Discovery Section) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-[#D5D1C4] dark:border-[#2C3142]">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-[#7C3AED]">
              ARCHIVE CATALOG
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#12141A] dark:text-white tracking-tight">
              Explore cybersecurity sources.
            </h2>
            <p className="text-sm text-[#5E626E] dark:text-[#9BA1AC] mt-1">
              Tools, resources and services for every part of cybersecurity.
            </p>
          </div>

          {/* Type Switcher + View All */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex p-0.5 bg-[#DDD9CE] dark:bg-[#161822] rounded-lg text-xs font-medium border border-[#D5D1C4] dark:border-[#2C3142]">
              <button
                onClick={() => setSourceTypeFilter('all')}
                className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                  sourceTypeFilter === 'all'
                    ? 'bg-[#F2F0E8] dark:bg-[#25293A] text-[#12141A] dark:text-white font-semibold shadow-xs'
                    : 'text-[#5E626E] dark:text-[#9BA1AC]'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setSourceTypeFilter('tools')}
                className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                  sourceTypeFilter === 'tools'
                    ? 'bg-[#F2F0E8] dark:bg-[#25293A] text-[#12141A] dark:text-white font-semibold shadow-xs'
                    : 'text-[#5E626E] dark:text-[#9BA1AC]'
                }`}
              >
                Tools
              </button>
              <button
                onClick={() => setSourceTypeFilter('resources')}
                className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                  sourceTypeFilter === 'resources'
                    ? 'bg-[#F2F0E8] dark:bg-[#25293A] text-[#7C3AED] dark:text-[#8B5CF6] font-semibold shadow-xs'
                    : 'text-[#5E626E] dark:text-[#9BA1AC]'
                }`}
              >
                Resources
              </button>
            </div>

            <button
              onClick={() => navigateTo('/sources')}
              className="text-xs font-semibold text-[#12141A] dark:text-white hover:text-[#7C3AED] flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>VIEW ALL {sources.length}</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#7C3AED]" />
            </button>
          </div>
        </div>

        {/* Category Filter Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {curatedCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#7C3AED] text-white shadow-xs font-semibold'
                  : 'bg-[#F2F0E8] dark:bg-[#1E212D] text-[#5E626E] dark:text-[#9BA1AC] border border-[#D5D1C4] dark:border-[#2C3142] hover:text-[#12141A] dark:hover:text-white hover:border-[#7C3AED]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Editorial Rows Container */}
        <div className="bg-[#F2F0E8] dark:bg-[#1E212D] rounded-xl border border-[#D5D1C4] dark:border-[#2C3142] overflow-hidden divide-y divide-[#D5D1C4] dark:divide-[#2C3142] shadow-xs">
          {filteredSources.map((source, idx) => (
            <SourceRow key={source.id} source={source} index={idx} />
          ))}
        </div>

        {/* More CTA */}
        <div className="text-center pt-2">
          <button
            onClick={() => navigateTo('/sources')}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-[#12141A] dark:text-white bg-[#F2F0E8] dark:bg-[#1E212D] border border-[#D5D1C4] dark:border-[#2C3142] hover:border-[#7C3AED] dark:hover:border-[#7C3AED] hover:text-[#7C3AED] rounded-md transition-all cursor-pointer shadow-xs"
          >
            <span>BROWSE FULL DATABASE</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#7C3AED]" />
          </button>
        </div>
      </section>

      {/* 04 — RECURSOS DE CIBERSEGURIDAD (Dedicated Resources Showcase Section) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-[#D5D1C4] dark:border-[#2C3142]">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-[#7C3AED] flex items-center gap-2">
              <BookOpen className="w-3.5 h-3.5" />
              <span>RECURSOS & GUÍAS TÉCNICAS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#12141A] dark:text-white tracking-tight">
              Recursos esenciales de ciberseguridad.
            </h2>
            <p className="text-sm text-[#5E626E] dark:text-[#9BA1AC] mt-1">
              Cheat sheets, diccionarios, bases de datos de vulnerabilidades, marcos de amenazas y metodologías prácticas.
            </p>
          </div>

          <button
            onClick={() => navigateTo('/resources')}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#7C3AED] hover:bg-[#6D28D9] rounded-lg transition-colors cursor-pointer shadow-md shadow-[#7C3AED]/20"
          >
            <span>EXPLORAR TODOS LOS RECURSOS</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredResources.map((resource, idx) => {
            const saved = isSourceSaved(resource.slug);
            return (
              <motion.div
                key={resource.id}
                whileHover={{ y: -3 }}
                onClick={() => navigateTo(`/sources/${resource.slug}`)}
                className="group p-5 bg-[#F2F0E8] dark:bg-[#1E212D] rounded-xl border border-[#D5D1C4] dark:border-[#2C3142] hover:border-[#7C3AED] dark:hover:border-[#7C3AED] transition-all flex flex-col justify-between cursor-pointer shadow-xs hover:shadow-lg hover:shadow-[#7C3AED]/10 space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#7C3AED] bg-[#7C3AED]/10 px-2 py-0.5 rounded font-semibold">
                      {resource.resource_subtype ? resource.resource_subtype.toUpperCase() : 'RESOURCE'}
                    </span>
                    <span className="text-xs font-mono text-[#8C8F99] dark:text-[#7B8190]">
                      #{resource.source_number}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-[#12141A] dark:text-white group-hover:text-[#7C3AED] transition-colors">
                      {resource.name}
                    </h3>
                    <p className="text-xs text-[#5E626E] dark:text-[#9BA1AC] line-clamp-2 mt-1 leading-relaxed">
                      {resource.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {resource.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="text-[10px] font-mono text-[#5E626E] dark:text-[#9BA1AC] bg-[#E7E5DE] dark:bg-[#161822] px-2 py-0.5 rounded">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-[#D5D1C4]/70 dark:border-[#2C3142]/70 flex items-center justify-between text-xs" onClick={(e) => e.stopPropagation()}>
                  <span className="font-mono text-[11px] text-[#8C8F99]">{resource.category}</span>
                  
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => openAddToStack(resource)}
                      title="Add to Stack"
                      className="p-1 rounded text-[#5E626E] dark:text-[#9BA1AC] hover:text-[#12141A] dark:hover:text-white transition-colors cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => (saved ? unsaveSource(resource.slug) : saveSource(resource.slug))}
                      title={saved ? 'Saved' : 'Save'}
                      className={`p-1 rounded transition-colors cursor-pointer ${
                        saved ? 'text-[#7C3AED]' : 'text-[#5E626E] dark:text-[#9BA1AC] hover:text-[#12141A]'
                      }`}
                    >
                      {saved ? <BookmarkCheck className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
                    </button>
                    {resource.website_url && (
                      <a
                        href={resource.website_url}
                        target="_blank"
                        rel="noreferrer"
                        title="External link"
                        className="p-1 text-[#5E626E] hover:text-[#7C3AED] transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 05 — FEATURED / LANDMARK SOURCES SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="p-8 sm:p-10 bg-[#1D202C] dark:bg-[#181A24] text-[#ECE9E0] rounded-2xl relative overflow-hidden border border-[#2D3345] dark:border-[#272B3A] shadow-xl">
          <div className="max-w-2xl space-y-4">
            <div className="text-xs font-mono uppercase tracking-widest text-[#7C3AED]">
              FOUNDATIONAL ARCHIVE · SOURCE / 0001
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Nmap — Network discovery and security auditing
            </h2>
            <p className="text-sm sm:text-base text-[#A0A4B0] leading-relaxed">
              Used across thousands of practitioner stacks for host discovery, port scanning, and NSE-driven vulnerability auditing. Explore real community workflows, configurations, and comparisons.
            </p>
            <div className="pt-2 flex items-center gap-4 text-xs font-mono">
              <span className="text-white">GPL-COMPATIBLE</span>
              <span className="text-[#686B73]">·</span>
              <span className="text-[#1D9A6C]">USED IN 18+ STACKS</span>
              <span className="text-[#686B73]">·</span>
              <span className="text-[#7C3AED]">VERIFIED DOSSIER</span>
            </div>
            <div className="pt-4 flex items-center gap-3">
              <button
                onClick={() => navigateTo('/sources/nmap')}
                className="px-5 py-2.5 text-xs font-bold text-white bg-[#7C3AED] hover:bg-[#6D28D9] rounded-md transition-colors cursor-pointer shadow-md shadow-[#7C3AED]/20"
              >
                OPEN SOURCE DOSSIER →
              </button>
              <button
                onClick={() => {
                  const nmap = sources.find((s) => s.slug === 'nmap');
                  if (nmap) openAddToStack(nmap);
                }}
                className="px-4 py-2.5 text-xs font-semibold text-[#D1D4DC] bg-[#292D3D] hover:bg-[#353A4E] rounded-md transition-colors cursor-pointer"
              >
                + ADD TO STACK
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 06 — DISCOVER STACKS (See What People Use) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-[#D5D1C4] dark:border-[#2C3142]">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-[#7C3AED]">
              PRACTITIONER TOOLKITS
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#12141A] dark:text-white tracking-tight">
              See what people use.
            </h2>
            <p className="text-sm text-[#5E626E] dark:text-[#9BA1AC] mt-1">
              Explore real cybersecurity stacks and discover the tools behind different workflows.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigateTo('/stacks/compare')}
              className="text-xs font-semibold text-[#5E626E] dark:text-[#9BA1AC] hover:text-[#12141A] dark:hover:text-white transition-colors cursor-pointer"
            >
              Compare Stacks
            </button>
            <span className="text-[#C4C0B5] dark:text-[#4A4E5C]">·</span>
            <button
              onClick={() => navigateTo('/stacks')}
              className="text-xs font-semibold text-[#12141A] dark:text-white hover:text-[#7C3AED] flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>VIEW ALL {stacks.length} STACKS</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#7C3AED]" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stacks.slice(0, 6).map((stack) => (
            <StackCard key={stack.id} stack={stack} />
          ))}
        </div>
      </section>

      {/* 07 — DISCUSSIONS (Technical Community Around Tools) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-[#D5D1C4] dark:border-[#2C3142]">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-[#7C3AED]">
              COMMUNITY INTELLIGENCE
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#12141A] dark:text-white tracking-tight">
              Workflows & Tool Discussions
            </h2>
            <p className="text-sm text-[#5E626E] dark:text-[#9BA1AC] mt-1">
              Talk about tools, resources, techniques and workflows directly connected to sources.
            </p>
          </div>

          <button
            onClick={() => navigateTo('/discuss')}
            className="text-xs font-semibold text-[#12141A] dark:text-white hover:text-[#7C3AED] flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>JOIN DISCUSSIONS</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#7C3AED]" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {discussions.slice(0, 4).map((discussion) => (
            <DiscussionItem key={discussion.id} discussion={discussion} />
          ))}
        </div>
      </section>

      {/* 08 — BUILD YOUR STACK (Editorial Closing CTA) */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 bg-[#F2F0E8] dark:bg-[#1E212D] rounded-2xl border border-[#D5D1C4] dark:border-[#2C3142] text-center space-y-4 shadow-sm">
          <div className="text-xs font-mono uppercase tracking-widest text-[#7C3AED]">
            CURATE YOUR TOOLKIT
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#12141A] dark:text-white tracking-tight">
            Build and share your cybersecurity stack.
          </h2>
          <p className="text-sm sm:text-base text-[#5E626E] dark:text-[#9BA1AC] max-w-xl mx-auto leading-relaxed">
            Organize the tools and resources you actually rely on for pentesting, bug bounty, SOC analysis, or OSINT. Add notes explaining what you use each source for.
          </p>
          <div className="pt-2 flex items-center justify-center gap-3">
            <button
              onClick={() => navigateTo('/dashboard')}
              className="px-6 py-3 text-xs font-bold text-white bg-[#7C3AED] hover:bg-[#6D28D9] rounded-md transition-colors cursor-pointer shadow-md shadow-[#7C3AED]/20"
            >
              CREATE YOUR STACK →
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
