import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { StackCard } from '../components/StackCard';
import { PractitionerRole } from '../types';
import { Search, Plus, Layers, GitCompare, ArrowRight } from 'lucide-react';

const ROLES: Array<PractitionerRole | 'All'> = [
  'All',
  'Pentester',
  'Bug Bounty Hunter',
  'Red Team',
  'Blue Team',
  'SOC Analyst',
  'OSINT Investigator',
  'DevSecOps',
  'Security Researcher'
];

export const StacksPage: React.FC = () => {
  const { stacks, navigateTo } = useApp();
  const [selectedRole, setSelectedRole] = useState<PractitionerRole | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredStacks = useMemo(() => {
    return stacks.filter((stk) => {
      if (selectedRole !== 'All' && stk.role !== selectedRole) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = stk.name.toLowerCase().includes(q);
        const matchDesc = stk.description.toLowerCase().includes(q);
        const matchAuthor = stk.author.username.toLowerCase().includes(q) || stk.author.display_name.toLowerCase().includes(q);
        if (!matchName && !matchDesc && !matchAuthor) return false;
      }
      return true;
    });
  }, [stacks, selectedRole, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#D5D1C4] dark:border-[#2C3142]">
        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-[#B855F6]">
            PRACTITIONER TOOLKITS
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#111318] dark:text-white tracking-tight mt-1">
            SEE WHAT PEOPLE USE.
          </h1>
          <p className="text-sm text-[#5E626E] dark:text-[#9BA1AC] mt-2 max-w-2xl leading-relaxed">
            Explore real cybersecurity stacks and discover the tools behind different workflows. Curated by verified researchers and practitioners.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigateTo('/stacks/compare')}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#111318] dark:text-white bg-[#F2F0E8] dark:bg-[#1E212D] border border-[#D5D1C4] dark:border-[#2C3142] hover:border-[#B855F6] dark:hover:border-[#B855F6] rounded-md transition-colors cursor-pointer"
          >
            <GitCompare className="w-3.5 h-3.5 text-[#B855F6]" />
            <span>Compare Stacks</span>
          </button>
          <button
            onClick={() => navigateTo('/dashboard')}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-[#B855F6] hover:bg-[#A23BE9] rounded-md transition-colors shadow-md shadow-[#B855F6]/20 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create Stack</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-[#F2F0E8] dark:bg-[#1E212D] rounded-xl border border-[#D5D1C4] dark:border-[#2C3142]">
        <div className="w-full sm:w-80 relative">
          <Search className="w-4 h-4 text-[#8C8F99] dark:text-[#7B8190] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search stacks by name or author..."
            className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm text-[#111318] dark:text-white bg-[#E7E5DE] dark:bg-[#181A24] rounded-md border border-[#D5D1C4] dark:border-[#2C3142] focus:outline-none focus:border-[#B855F6]"
          />
        </div>

        <div className="text-xs font-mono text-[#8C8F99] dark:text-[#7B8190]">
          SHOWING <span className="font-bold text-[#111318] dark:text-white tabular-nums">{filteredStacks.length}</span> STACKS
        </div>
      </div>

      {/* Role Tabs */}
      <div className="space-y-2">
        <div className="text-[11px] font-mono uppercase tracking-widest text-[#8C8F99] dark:text-[#7B8190]">
          Filter by Role
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {ROLES.map((role) => (
            <button
              key={role}
              onClick={() => setSelectedRole(role)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                selectedRole === role
                  ? 'bg-[#B855F6] text-white shadow-xs'
                  : 'bg-[#F2F0E8] dark:bg-[#1E212D] text-[#5E626E] dark:text-[#9BA1AC] border border-[#D5D1C4] dark:border-[#2C3142] hover:text-[#111318] dark:hover:text-white hover:border-[#B855F6]'
              }`}
            >
              {role}
            </button>
          ))}
        </div>
      </div>

      {/* Stacks Grid */}
      {filteredStacks.length === 0 ? (
        <div className="py-16 text-center text-[#686B73] dark:text-[#9BA1AC] space-y-2 bg-white dark:bg-[#14161C] rounded-xl border border-[#E2DFD6] dark:border-[#22262E]">
          <p className="text-base font-semibold text-[#111318] dark:text-white">No stacks found</p>
          <p className="text-xs text-[#8C8F99] dark:text-[#7B8190]">
            Try clearing the role filter or search query.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStacks.map((stk) => (
            <StackCard key={stk.id} stack={stk} />
          ))}
        </div>
      )}

    </div>
  );
};
