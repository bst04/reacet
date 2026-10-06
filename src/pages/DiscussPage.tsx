import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { DiscussionItem } from '../components/DiscussionItem';
import { DiscussionType, CategoryName } from '../types';
import { MessageSquare, Plus, Search, Filter, MessageSquarePlus } from 'lucide-react';

const DISCUSSION_TYPES: Array<DiscussionType | 'All'> = [
  'All',
  'Question',
  'Discussion',
  'Tool Comparison',
  'Workflow' as any,
  'Guide',
  'Showcase'
];

const CATEGORIES: Array<CategoryName | 'All'> = [
  'All',
  'Recon',
  'OSINT',
  'Web Security',
  'Red Team',
  'Blue Team',
  'SOC',
  'DFIR',
  'Vulnerability Management'
];

export const DiscussPage: React.FC = () => {
  const { discussions, sources, createDiscussion, navigateTo, currentUser, setIsAuthModalOpen } = useApp();

  const [selectedType, setSelectedType] = useState<DiscussionType | 'All'>('All');
  const [selectedCategory, setSelectedCategory] = useState<CategoryName | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  // New discussion modal state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newBody, setNewBody] = useState('');
  const [newType, setNewType] = useState<DiscussionType>('Question');
  const [newCategory, setNewCategory] = useState<CategoryName>('Recon');
  const [newSourceSlug, setNewSourceSlug] = useState<string>('');

  const filteredDiscussions = useMemo(() => {
    return discussions.filter((d) => {
      if (selectedType !== 'All' && d.type !== selectedType) return false;
      if (selectedCategory !== 'All' && d.category !== selectedCategory) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = d.title.toLowerCase().includes(q);
        const matchBody = d.body.toLowerCase().includes(q);
        const matchUser = d.user.username.toLowerCase().includes(q);
        if (!matchTitle && !matchBody && !matchUser) return false;
      }
      return true;
    });
  }, [discussions, selectedType, selectedCategory, searchQuery]);

  const handleOpenCreate = () => {
    if (!currentUser) {
      setIsAuthModalOpen(true);
      return;
    }
    setIsCreateModalOpen(true);
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newBody.trim()) return;

    const created = createDiscussion({
      title: newTitle.trim(),
      body: newBody.trim(),
      type: newType,
      category: newCategory,
      source_slug: newSourceSlug || undefined
    });

    setIsCreateModalOpen(false);
    setNewTitle('');
    setNewBody('');
    setNewSourceSlug('');
    navigateTo(`/discuss/${created.slug}`);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#D5D1C4] dark:border-[#2C3142]">
        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-[#B855F6]">
            COMMUNITY & WORKFLOWS
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#111318] dark:text-white tracking-tight mt-1">
            Technical Discussions
          </h1>
          <p className="text-sm text-[#5E626E] dark:text-[#9BA1AC] mt-2 max-w-2xl leading-relaxed">
            Talk about tools, resources, techniques and workflows. Every conversation connects back to real sources and practitioner stacks.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-white bg-[#B855F6] hover:bg-[#A23BE9] rounded-md transition-colors self-start md:self-auto shadow-md shadow-[#B855F6]/20 cursor-pointer"
        >
          <MessageSquarePlus className="w-3.5 h-3.5" />
          <span>Start Discussion</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-[#F2F0E8] dark:bg-[#1E212D] rounded-xl border border-[#D5D1C4] dark:border-[#2C3142]">
        <div className="w-full sm:w-80 relative">
          <Search className="w-4 h-4 text-[#8C8F99] dark:text-[#7B8190] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search discussions by topic or author..."
            className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm text-[#111318] dark:text-white bg-[#E7E5DE] dark:bg-[#181A24] rounded-md border border-[#D5D1C4] dark:border-[#2C3142] focus:outline-none focus:border-[#B855F6]"
          />
        </div>

        <div className="text-xs font-mono text-[#8C8F99] dark:text-[#7B8190]">
          <span className="font-bold text-[#111318] dark:text-white tabular-nums">{filteredDiscussions.length}</span> DISCUSSIONS
        </div>
      </div>

      {/* Filter Tabs by Discussion Type */}
      <div className="space-y-2">
        <div className="text-[11px] font-mono uppercase tracking-widest text-[#8C8F99] dark:text-[#7B8190]">
          Discussion Type
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {DISCUSSION_TYPES.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                selectedType === type
                  ? 'bg-[#B855F6] text-white shadow-xs'
                  : 'bg-[#F2F0E8] dark:bg-[#1E212D] text-[#5E626E] dark:text-[#9BA1AC] border border-[#D5D1C4] dark:border-[#2C3142] hover:text-[#111318] dark:hover:text-white hover:border-[#B855F6]'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Discussions List */}
      <div className="space-y-3">
        {filteredDiscussions.length === 0 ? (
          <div className="p-16 text-center text-[#686B73] dark:text-[#9BA1AC] space-y-2 bg-white dark:bg-[#14161C] rounded-xl border border-[#E2DFD6] dark:border-[#22262E]">
            <p className="text-base font-semibold text-[#111318] dark:text-white">No discussions found</p>
            <p className="text-xs text-[#8C8F99] dark:text-[#7B8190]">
              Be the first to start a conversation in this topic.
            </p>
            <div className="pt-3">
              <button
                onClick={handleOpenCreate}
                className="px-4 py-2 text-xs font-semibold text-white bg-[#17191D] dark:bg-[#252834] rounded-md"
              >
                Start Discussion →
              </button>
            </div>
          </div>
        ) : (
          filteredDiscussions.map((d) => (
            <DiscussionItem key={d.id} discussion={d} />
          ))
        )}
      </div>

      {/* Create Discussion Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div
            className="w-full max-w-xl bg-[#F2F0E8] dark:bg-[#1E212D] rounded-xl shadow-2xl border border-[#D5D1C4] dark:border-[#2C3142] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 bg-[#E7E5DE] dark:bg-[#181A24] border-b border-[#D5D1C4] dark:border-[#2C3142] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#B855F6]" />
                <h3 className="text-sm font-semibold text-[#111318] dark:text-white">
                  Start a Technical Discussion
                </h3>
              </div>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="text-[#5E626E] dark:text-[#9BA1AC] hover:text-[#111318] dark:hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#5E626E] dark:text-[#9BA1AC] mb-1">
                  Title
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Nmap vs RustScan — what do you actually use in production?"
                  className="w-full px-3 py-2 bg-[#E7E5DE] dark:bg-[#181A24] text-sm text-[#111318] dark:text-white border border-[#D5D1C4] dark:border-[#2C3142] rounded-md focus:outline-none focus:border-[#B855F6]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#5E626E] dark:text-[#9BA1AC] mb-1">
                    Type
                  </label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value as DiscussionType)}
                    className="w-full px-3 py-2 bg-[#E7E5DE] dark:bg-[#181A24] text-sm text-[#111318] dark:text-white border border-[#D5D1C4] dark:border-[#2C3142] rounded-md focus:outline-none focus:border-[#B855F6]"
                  >
                    <option value="Question">Question</option>
                    <option value="Discussion">Discussion</option>
                    <option value="Tool Comparison">Tool Comparison</option>
                    <option value="Guide">Guide</option>
                    <option value="Showcase">Showcase</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#5E626E] dark:text-[#9BA1AC] mb-1">
                    Category
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as CategoryName)}
                    className="w-full px-3 py-2 bg-[#E7E5DE] dark:bg-[#181A24] text-sm text-[#111318] dark:text-white border border-[#D5D1C4] dark:border-[#2C3142] rounded-md focus:outline-none focus:border-[#B855F6]"
                  >
                    <option value="Recon">Recon</option>
                    <option value="OSINT">OSINT</option>
                    <option value="Pentesting">Pentesting</option>
                    <option value="Web Security">Web Security</option>
                    <option value="Network Security">Network Security</option>
                    <option value="Red Team">Red Team</option>
                    <option value="Blue Team">Blue Team</option>
                    <option value="SOC">SOC</option>
                    <option value="DFIR">DFIR</option>
                    <option value="Vulnerability Management">Vulnerability Management</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#5E626E] dark:text-[#9BA1AC] mb-1">
                  Connect to a Source (Optional)
                </label>
                <select
                  value={newSourceSlug}
                  onChange={(e) => setNewSourceSlug(e.target.value)}
                  className="w-full px-3 py-2 bg-[#E7E5DE] dark:bg-[#181A24] text-sm text-[#111318] dark:text-white border border-[#D5D1C4] dark:border-[#2C3142] rounded-md focus:outline-none focus:border-[#B855F6]"
                >
                  <option value="">None / General topic</option>
                  {sources.map((s) => (
                    <option key={s.id} value={s.slug}>
                      {s.name} (SOURCE / {s.source_number})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#5E626E] dark:text-[#9BA1AC] mb-1">
                  Details & Context
                </label>
                <textarea
                  rows={5}
                  required
                  value={newBody}
                  onChange={(e) => setNewBody(e.target.value)}
                  placeholder="Share details on your real workflow, tools involved, pros/cons, or problem statement..."
                  className="w-full px-3 py-2 bg-[#E7E5DE] dark:bg-[#181A24] text-sm text-[#111318] dark:text-white border border-[#D5D1C4] dark:border-[#2C3142] rounded-md focus:outline-none focus:border-[#B855F6] resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-[#5E626E] dark:text-[#9BA1AC] hover:text-[#111318] dark:hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold text-white bg-[#B855F6] hover:bg-[#A23BE9] rounded-md transition-colors shadow-md shadow-[#B855F6]/20 cursor-pointer"
                >
                  Publish Discussion
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
