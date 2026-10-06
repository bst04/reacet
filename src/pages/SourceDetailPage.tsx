import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { StackCard } from '../components/StackCard';
import { DiscussionItem } from '../components/DiscussionItem';
import {
  ExternalLink,
  Github,
  Plus,
  Bookmark,
  BookmarkCheck,
  Share2,
  CheckCircle2,
  ArrowRight,
  MessageSquarePlus,
  ArrowLeft,
  Layers,
  Sparkles
} from 'lucide-react';
import { DiscussionType, CategoryName } from '../types';

interface SourceDetailPageProps {
  slug: string;
}

export const SourceDetailPage: React.FC<SourceDetailPageProps> = ({ slug }) => {
  const {
    sources,
    stacks,
    discussions,
    navigateTo,
    openAddToStack,
    isSourceSaved,
    saveSource,
    unsaveSource,
    showToast,
    currentUser,
    createDiscussion
  } = useApp();

  const source = sources.find((s) => s.slug === slug);
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
  const [newQuestionTitle, setNewQuestionTitle] = useState('');
  const [newQuestionBody, setNewQuestionBody] = useState('');

  if (!source) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-[#111318]">Source Not Found</h2>
        <p className="text-sm text-[#686B73]">
          The requested cybersecurity source could not be located in the catalog archive.
        </p>
        <button
          onClick={() => navigateTo('/sources')}
          className="px-4 py-2 text-xs font-semibold text-white bg-[#17191D] rounded-md"
        >
          Return to All Sources
        </button>
      </div>
    );
  }

  const saved = isSourceSaved(source.slug);

  // Stacks using this source
  const stacksUsingSource = stacks.filter((stk) =>
    stk.sources.some((s) => s.source_slug === source.slug)
  );

  // Discussions about this source
  const sourceDiscussions = discussions.filter(
    (d) => d.source_slug === source.slug
  );

  // Often used with sources
  const relatedSources = source.often_used_with
    .map((sSlug) => sources.find((s) => s.slug === sSlug))
    .filter(Boolean);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Source link copied to clipboard');
    }
  };

  const handleCreateQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestionTitle.trim()) return;

    createDiscussion({
      title: newQuestionTitle.trim(),
      body: newQuestionBody.trim() || `Community question regarding ${source.name} usage in workflows.`,
      type: 'Question',
      category: source.category,
      source_slug: source.slug
    });

    setIsQuestionModalOpen(false);
    setNewQuestionTitle('');
    setNewQuestionBody('');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Back button */}
      <button
        onClick={() => navigateTo('/sources')}
        className="inline-flex items-center gap-2 text-xs font-semibold text-[#686B73] dark:text-[#9BA1AC] hover:text-[#111318] dark:hover:text-white transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>BACK TO SOURCES DIRECTORY</span>
      </button>

      {/* Main Dossier Header */}
      <div className="bg-[#F2F0E8] dark:bg-[#1E212D] rounded-xl border border-[#D5D1C4] dark:border-[#2C3142] p-6 sm:p-10 space-y-6 shadow-xs">
        
        {/* Top Identification Marker */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-wider text-[#B855F6]">
            <span className="w-2 h-2 rounded-full bg-[#B855F6]" />
            <span>SOURCE #{source.source_number}</span>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-[#5E626E] dark:text-[#9BA1AC]">
            {source.verified && (
              <span className="inline-flex items-center gap-1 text-[#1D9A6C] font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>VERIFIED ARCHIVE</span>
              </span>
            )}
            <span className="text-[#C4C0B5] dark:text-[#4A4E5C]">·</span>
            <span>CATALOGED {source.created_at}</span>
          </div>
        </div>

        {/* Title and Short Deck */}
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#12141A] dark:text-white">
            {source.name}
          </h1>
          <p className="text-base sm:text-lg text-[#5E626E] dark:text-[#9BA1AC] font-normal leading-relaxed">
            {source.description}
          </p>
        </div>

        {/* Primary Action Buttons Bar */}
        <div className="pt-2 flex flex-wrap items-center gap-3">
          <button
            onClick={() => openAddToStack(source)}
            className="px-5 py-2.5 text-xs font-bold text-white bg-[#181A22] hover:bg-[#B855F6] dark:bg-[#25293A] dark:hover:bg-[#B855F6] rounded-md transition-colors flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>ADD TO STACK</span>
          </button>

          <button
            onClick={() => (saved ? unsaveSource(source.slug) : saveSource(source.slug))}
            className={`px-4 py-2.5 text-xs font-semibold rounded-md border transition-colors flex items-center gap-2 cursor-pointer ${
              saved
                ? 'bg-[#B855F6]/10 border-[#B855F6] text-[#B855F6]'
                : 'bg-[#F2F0E8] dark:bg-[#1E212D] border-[#D5D1C4] dark:border-[#2C3142] text-[#12141A] dark:text-white hover:border-[#B855F6] dark:hover:border-[#B855F6]'
            }`}
          >
            {saved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
            <span>{saved ? 'SAVED' : 'SAVE SOURCE'}</span>
          </button>

          <button
            onClick={handleShare}
            className="px-4 py-2.5 text-xs font-semibold bg-[#F2F0E8] dark:bg-[#1E212D] border border-[#D5D1C4] dark:border-[#2C3142] text-[#5E626E] dark:text-[#9BA1AC] hover:text-[#12141A] dark:hover:text-white hover:border-[#B855F6] dark:hover:border-[#B855F6] rounded-md transition-colors flex items-center gap-2 cursor-pointer"
          >
            <Share2 className="w-4 h-4" />
            <span>SHARE</span>
          </button>

          {/* Links */}
          <div className="ml-auto flex items-center gap-3 pt-2 sm:pt-0">
            {source.website_url && (
              <a
                href={source.website_url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-[#12141A] dark:text-white hover:text-[#B855F6] transition-colors"
              >
                <span>Website</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            {source.github_url && (
              <a
                href={source.github_url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-[#12141A] dark:text-white hover:text-[#B855F6] transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>
            )}
          </div>
        </div>

        {/* Detailed Metadata Grid */}
        <div className="pt-6 border-t border-[#D5D1C4] dark:border-[#2C3142] grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
          <div>
            <div className="text-[10px] uppercase text-[#8C8F99] dark:text-[#7B8190]">Category</div>
            <div className="font-semibold text-[#12141A] dark:text-white mt-0.5">{source.category}</div>
          </div>
          <div>
            <div className="text-[10px] uppercase text-[#8C8F99] dark:text-[#7B8190]">Pricing Model</div>
            <div className="font-semibold text-[#12141A] dark:text-white mt-0.5">{source.pricing}</div>
          </div>
          <div>
            <div className="text-[10px] uppercase text-[#8C8F99] dark:text-[#7B8190]">License</div>
            <div className="font-semibold text-[#12141A] dark:text-white mt-0.5">{source.license}</div>
          </div>
          <div>
            <div className="text-[10px] uppercase text-[#8C8F99] dark:text-[#7B8190]">Public Stacks</div>
            <div className="font-semibold text-[#12141A] dark:text-white mt-0.5 tabular-nums">
              {stacksUsingSource.length} {stacksUsingSource.length === 1 ? 'Stack' : 'Stacks'}
            </div>
          </div>
        </div>

      </div>

      {/* Description & Concrete Use Cases */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Left: Long Description */}
        <div className="md:col-span-7 space-y-4">
          <h3 className="text-xs font-mono uppercase tracking-widest text-[#5E626E] dark:text-[#9BA1AC]">
            ARCHIVE DOSSIER OVERVIEW
          </h3>
          <div className="p-6 bg-[#F2F0E8] dark:bg-[#1E212D] rounded-xl border border-[#D5D1C4] dark:border-[#2C3142] text-sm text-[#12141A] dark:text-[#ECEEF2] leading-relaxed space-y-4 shadow-xs">
            <p>{source.long_description}</p>
          </div>

          {/* Tags */}
          <div className="space-y-2 pt-2">
            <div className="text-xs font-mono uppercase tracking-widest text-[#8C8F99] dark:text-[#7B8190]">
              INDEX TAGS
            </div>
            <div className="flex items-center flex-wrap gap-2 text-xs font-mono text-[#5E626E] dark:text-[#9BA1AC]">
              {source.tags.map((tag, i) => (
                <span key={tag} className="hover:text-[#B855F6]">
                  #{tag}{i < source.tags.length - 1 ? ' · ' : ''}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right: USED FOR (Real use-cases derived from practitioner workflows) */}
        <div className="md:col-span-5 space-y-4">
          <h3 className="text-xs font-mono uppercase tracking-widest text-[#5E626E] dark:text-[#9BA1AC]">
            USED FOR
          </h3>
          <div className="p-6 bg-[#F2F0E8] dark:bg-[#1E212D] rounded-xl border border-[#D5D1C4] dark:border-[#2C3142] space-y-3 shadow-xs">
            {source.used_for.map((useCase, idx) => (
              <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm">
                <span className="text-[#B855F6] font-mono font-bold">0{idx + 1}</span>
                <span className="text-[#12141A] dark:text-[#E2E6EF]">{useCase}</span>
              </div>
            ))}
          </div>

          {/* OFTEN USED WITH */}
          {relatedSources.length > 0 && (
            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-mono uppercase tracking-widest text-[#5E626E] dark:text-[#9BA1AC]">
                OFTEN USED WITH
              </h3>
              <div className="bg-[#F2F0E8] dark:bg-[#1E212D] rounded-xl border border-[#D5D1C4] dark:border-[#2C3142] divide-y divide-[#D5D1C4] dark:divide-[#2C3142] overflow-hidden shadow-xs">
                {relatedSources.map((rel) => {
                  if (!rel) return null;
                  return (
                    <div
                      key={rel.id}
                      onClick={() => navigateTo(`/sources/${rel.slug}`)}
                      className="p-3.5 hover:bg-[#E7E5DE] dark:hover:bg-[#25293A] transition-colors cursor-pointer flex items-center justify-between group"
                    >
                      <div>
                        <div className="text-xs font-mono text-[#8C8F99] dark:text-[#7B8190]">
                          SOURCE / {rel.source_number}
                        </div>
                        <div className="text-sm font-bold text-[#12141A] dark:text-white group-hover:text-[#B855F6] transition-colors">
                          {rel.name}
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-[#8C8F99] group-hover:text-[#B855F6] group-hover:translate-x-1 transition-all" />
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

      </div>

      {/* USED BY THE COMMUNITY (Stacks using this source) */}
      <section className="space-y-4 pt-6 border-t border-[#D5D1C4] dark:border-[#2C3142]">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-[#B855F6]">
              COMMUNITY USAGE
            </div>
            <h3 className="text-xl font-bold text-[#12141A] dark:text-white">
              Used in {stacksUsingSource.length} Public {stacksUsingSource.length === 1 ? 'Stack' : 'Stacks'}
            </h3>
          </div>
          <button
            onClick={() => openAddToStack(source)}
            className="text-xs font-semibold text-[#12141A] dark:text-white hover:text-[#B855F6] flex items-center gap-1 cursor-pointer"
          >
            + Add to your stack
          </button>
        </div>

        {stacksUsingSource.length === 0 ? (
          <div className="p-8 bg-[#F2F0E8] dark:bg-[#1E212D] rounded-xl border border-[#D5D1C4] dark:border-[#2C3142] text-center text-xs text-[#5E626E] dark:text-[#9BA1AC]">
            Be the first practitioner to feature {source.name} in a public stack.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stacksUsingSource.map((stk) => (
              <StackCard key={stk.id} stack={stk} />
            ))}
          </div>
        )}
      </section>

      {/* DISCUSSIONS ABOUT THIS SOURCE */}
      <section className="space-y-4 pt-6 border-t border-[#D5D1C4] dark:border-[#2C3142]">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-[#B855F6]">
              KNOWLEDGE & WORKFLOWS
            </div>
            <h3 className="text-xl font-bold text-[#12141A] dark:text-white">
              Discussions about {source.name}
            </h3>
          </div>
          <button
            onClick={() => setIsQuestionModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-[#181A22] hover:bg-[#B855F6] dark:bg-[#25293A] dark:hover:bg-[#B855F6] rounded-md transition-colors cursor-pointer"
          >
            <MessageSquarePlus className="w-3.5 h-3.5" />
            <span>Ask a Question</span>
          </button>
        </div>

        {sourceDiscussions.length === 0 ? (
          <div className="p-8 bg-[#F2F0E8] dark:bg-[#1E212D] rounded-xl border border-[#D5D1C4] dark:border-[#2C3142] text-center space-y-3">
            <p className="text-sm text-[#12141A] dark:text-white font-medium">No community discussions for {source.name} yet.</p>
            <p className="text-xs text-[#5E626E] dark:text-[#9BA1AC]">
              Have a workflow question or comparison? Start the conversation with the community.
            </p>
            <button
              onClick={() => setIsQuestionModalOpen(true)}
              className="px-4 py-2 text-xs font-semibold text-[#12141A] dark:text-white bg-[#E7E5DE] dark:bg-[#25293A] hover:bg-[#DDD9CE] dark:hover:bg-[#2D3348] rounded-md transition-colors cursor-pointer"
            >
              Ask the First Question →
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {sourceDiscussions.map((d) => (
              <DiscussionItem key={d.id} discussion={d} />
            ))}
          </div>
        )}
      </section>

      {/* Ask Question Modal */}
      {isQuestionModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div
            className="w-full max-w-lg bg-[#E7E5DE] dark:bg-[#1A1D27] rounded-xl shadow-2xl border border-[#D5D1C4] dark:border-[#2C3142] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 bg-[#F2F0E8] dark:bg-[#1E212D] border-b border-[#D5D1C4] dark:border-[#2C3142] flex items-center justify-between">
              <h3 className="text-sm font-semibold text-[#12141A] dark:text-white">
                Ask a Question about {source.name}
              </h3>
              <button
                onClick={() => setIsQuestionModalOpen(false)}
                className="text-[#686B73] dark:text-[#9BA1AC] hover:text-[#12141A] dark:hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateQuestion} className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#5E626E] dark:text-[#9BA1AC] mb-1">
                  Question Title
                </label>
                <input
                  type="text"
                  required
                  value={newQuestionTitle}
                  onChange={(e) => setNewQuestionTitle(e.target.value)}
                  placeholder={`e.g. Best scripts for ${source.name} in 2026?`}
                  className="w-full px-3 py-2 bg-[#F2F0E8] dark:bg-[#1E212D] text-sm text-[#12141A] dark:text-white border border-[#D5D1C4] dark:border-[#2C3142] rounded-md focus:outline-none focus:border-[#B855F6]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#5E626E] dark:text-[#9BA1AC] mb-1">
                  Context & Details
                </label>
                <textarea
                  rows={4}
                  value={newQuestionBody}
                  onChange={(e) => setNewQuestionBody(e.target.value)}
                  placeholder="Explain your workflow scenario or comparison points..."
                  className="w-full px-3 py-2 bg-[#F2F0E8] dark:bg-[#1E212D] text-sm text-[#12141A] dark:text-white border border-[#D5D1C4] dark:border-[#2C3142] rounded-md focus:outline-none focus:border-[#B855F6] resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsQuestionModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-[#686B73] dark:text-[#9BA1AC] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold text-white bg-[#181A22] hover:bg-[#B855F6] dark:bg-[#25293A] dark:hover:bg-[#B855F6] rounded-md transition-colors cursor-pointer"
                >
                  Publish Question
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
