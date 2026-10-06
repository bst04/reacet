import React from 'react';
import { useApp } from '../context/AppContext';
import { StackCard } from '../components/StackCard';
import { DiscussionItem } from '../components/DiscussionItem';
import { ArrowLeft, ArrowRight, GitCompare, User, Plus, ExternalLink, Shield } from 'lucide-react';

interface StackDetailPageProps {
  slug: string;
}

export const StackDetailPage: React.FC<StackDetailPageProps> = ({ slug }) => {
  const { stacks, sources, discussions, navigateTo, openAddToStack } = useApp();

  const stack = stacks.find((s) => s.slug === slug);

  if (!stack) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-[#111318]">Stack Not Found</h2>
        <p className="text-sm text-[#686B73]">
          The requested practitioner stack could not be found.
        </p>
        <button
          onClick={() => navigateTo('/stacks')}
          className="px-4 py-2 text-xs font-semibold text-white bg-[#17191D] rounded-md"
        >
          Return to Stacks
        </button>
      </div>
    );
  }

  // Similar stacks with matching role or author
  const similarStacks = stacks
    .filter((s) => s.id !== stack.id && (s.role === stack.role || s.author.username === stack.author.username))
    .slice(0, 3);

  // Discussions relevant to this stack or sources in this stack
  const stackSourceSlugs = stack.sources.map((s) => s.source_slug);
  const relevantDiscussions = discussions.filter(
    (d) => d.stack_slug === stack.slug || (d.source_slug && stackSourceSlugs.includes(d.source_slug))
  ).slice(0, 3);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Back button */}
      <button
        onClick={() => navigateTo('/stacks')}
        className="inline-flex items-center gap-2 text-xs font-semibold text-[#686B73] dark:text-[#9BA1AC] hover:text-[#111318] dark:hover:text-white transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>BACK TO STACKS DIRECTORY</span>
      </button>

      {/* Main Stack Header */}
      <div className="bg-white dark:bg-[#14161C] rounded-xl border border-[#E2DFD6] dark:border-[#22262E] p-6 sm:p-10 space-y-6">
        
        {/* Top metadata */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="text-[#B855F6] font-bold">PRACTITIONER TOOLKIT</span>
            <span className="text-[#C4C0B5] dark:text-[#4A4E5C]">·</span>
            <span className="text-[#111318] dark:text-white font-semibold">{stack.role}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigateTo('/stacks/compare')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#111318] dark:text-white bg-[#E7E5DE] dark:bg-[#252937] hover:bg-[#DDD9CE] dark:hover:bg-[#2D3243] rounded-md transition-colors cursor-pointer"
            >
              <GitCompare className="w-3.5 h-3.5 text-[#B855F6]" />
              <span>Compare</span>
            </button>
            <button
              onClick={() => navigateTo('/dashboard')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-[#B855F6] hover:bg-[#A23BE9] rounded-md transition-colors shadow-md shadow-[#B855F6]/20 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create Your Stack</span>
            </button>
          </div>
        </div>

        {/* Title and Author Lockup */}
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#111318] dark:text-white">
            {stack.name}
          </h1>

          <div className="flex items-center gap-2 pt-1 text-sm text-[#5E626E] dark:text-[#9BA1AC]">
            <span>by</span>
            <button
              onClick={() => navigateTo(`/profile/${stack.author.username}`)}
              className="font-mono text-[#111318] dark:text-white font-bold hover:text-[#B855F6] transition-colors cursor-pointer"
            >
              @{stack.author.username}
            </button>
            <span>({stack.author.display_name})</span>
            <span className="text-[#C4C0B5] dark:text-[#4A4E5C]">·</span>
            <span className="text-xs font-mono text-[#8C8F99] dark:text-[#7B8190]">
              Updated {stack.updated_at}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-base text-[#5E626E] dark:text-[#9BA1AC] leading-relaxed max-w-3xl">
          {stack.description}
        </p>

        {/* Stack metrics summary */}
        <div className="pt-6 border-t border-[#D5D1C4] dark:border-[#2C3142] flex items-center gap-6 text-xs font-mono">
          <div>
            <span className="text-[#8C8F99] dark:text-[#7B8190] uppercase">Total Sources:</span>{' '}
            <span className="font-bold text-[#111318] dark:text-white tabular-nums">{stack.sources.length}</span>
          </div>
          <div>
            <span className="text-[#8C8F99] dark:text-[#7B8190] uppercase">Scope:</span>{' '}
            <span className="font-bold text-[#111318] dark:text-white">{stack.is_public ? 'Public Stack' : 'Private'}</span>
          </div>
        </div>

      </div>

      {/* SOURCES IN THIS STACK (Clean Editorial List with Practitioner's Notes) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-[#D5D1C4] dark:border-[#2C3142]">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-[#B855F6]">
              TOOLKIT DOSSIER
            </div>
            <h2 className="text-2xl font-bold text-[#111318] dark:text-white">
              Sources in this Stack
            </h2>
          </div>
          <span className="text-xs font-mono text-[#8C8F99] dark:text-[#7B8190] tabular-nums">
            {stack.sources.length} tools configured
          </span>
        </div>

        <div className="space-y-4">
          {stack.sources.map((item, idx) => {
            const source = sources.find((s) => s.slug === item.source_slug);
            if (!source) return null;

            return (
              <div
                key={item.source_slug}
                onClick={() => navigateTo(`/sources/${source.slug}`)}
                className="group p-5 sm:p-6 bg-[#F2F0E8] dark:bg-[#1E212D] rounded-xl border border-[#D5D1C4] dark:border-[#2C3142] hover:border-[#B855F6] dark:hover:border-[#B855F6] transition-all cursor-pointer shadow-xs hover:shadow-md hover:shadow-[#B855F6]/5"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  
                  {/* Left: Index & Identity */}
                  <div className="flex items-start gap-4">
                    <span className="text-base font-mono font-bold text-[#B855F6] tabular-nums pt-0.5">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-bold text-[#111318] dark:text-white group-hover:text-[#B855F6] transition-colors">
                          {source.name}
                        </h3>
                        <span className="text-xs font-mono text-[#8C8F99] dark:text-[#7B8190]">
                          SOURCE / {source.source_number}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-[#5E626E] dark:text-[#9BA1AC]">
                        {source.description}
                      </p>
                    </div>
                  </div>

                  {/* Right: Unboxed metadata */}
                  <div className="flex items-center gap-3 self-start sm:self-auto shrink-0 pl-9 sm:pl-0 text-xs font-mono text-[#5E626E] dark:text-[#9BA1AC]">
                    <span className="text-[#111318] dark:text-white font-medium">{source.category}</span>
                    <span className="text-[#C4C0B5] dark:text-[#4A4E5C]">·</span>
                    <span>{source.pricing}</span>
                    <ArrowRight className="w-4 h-4 text-[#8C8F99] group-hover:text-[#B855F6] group-hover:translate-x-1 transition-all ml-2" />
                  </div>

                </div>

                {/* Practitioner's concrete usage note */}
                {item.notes && (
                  <div className="mt-4 pt-3 border-t border-[#D5D1C4] dark:border-[#2C3142] ml-9 pl-3 border-l-2 border-l-[#B855F6] bg-[#E7E5DE]/80 dark:bg-[#181A24] py-2 rounded-r-md">
                    <div className="text-[10px] font-mono uppercase text-[#8C8F99] dark:text-[#7B8190]">
                      How @{stack.author.username} uses this source:
                    </div>
                    <p className="text-xs sm:text-sm text-[#111318] dark:text-[#E2E6EF] italic mt-0.5 font-serif">
                      "{item.notes}"
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* DISCUSSIONS CONNECTED TO THIS WORKFLOW */}
      {relevantDiscussions.length > 0 && (
        <section className="space-y-4 pt-4 border-t border-[#D5D1C4] dark:border-[#2C3142]">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-[#B855F6]">
                WORKFLOW DISCUSSIONS
              </div>
              <h3 className="text-xl font-bold text-[#111318] dark:text-white">
                Discussions about tools in this stack
              </h3>
            </div>
            <button
              onClick={() => navigateTo('/discuss')}
              className="text-xs font-semibold text-[#111318] dark:text-white hover:text-[#B855F6] cursor-pointer"
            >
              All discussions →
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {relevantDiscussions.map((d) => (
              <DiscussionItem key={d.id} discussion={d} />
            ))}
          </div>
        </section>
      )}

      {/* SIMILAR STACKS */}
      {similarStacks.length > 0 && (
        <section className="space-y-4 pt-4 border-t border-[#D5D1C4] dark:border-[#2C3142]">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-[#B855F6]">
                EXPLORE FURTHER
              </div>
              <h3 className="text-xl font-bold text-[#111318] dark:text-white">
                Similar Practitioner Stacks
              </h3>
            </div>
            <button
              onClick={() => navigateTo('/stacks')}
              className="text-xs font-semibold text-[#111318] dark:text-white hover:text-[#B855F6] cursor-pointer"
            >
              Browse all stacks →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {similarStacks.map((stk) => (
              <StackCard key={stk.id} stack={stk} />
            ))}
          </div>
        </section>
      )}

    </div>
  );
};
