import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { GitCompare, ArrowRight, ArrowLeft, Check, Layers, ExternalLink } from 'lucide-react';

export const StackComparePage: React.FC = () => {
  const { stacks, sources, navigateTo } = useApp();

  const [stackAId, setStackAId] = useState<string>(stacks[0]?.id || '');
  const [stackBId, setStackBId] = useState<string>(stacks[1]?.id || '');

  const stackA = stacks.find((s) => s.id === stackAId);
  const stackB = stacks.find((s) => s.id === stackBId);

  // Set arithmetic
  const slugsA = new Set(stackA ? stackA.sources.map((s) => s.source_slug) : []);
  const slugsB = new Set(stackB ? stackB.sources.map((s) => s.source_slug) : []);

  const bothSlugs = Array.from(slugsA).filter((s) => slugsB.has(s));
  const onlyASlugs = Array.from(slugsA).filter((s) => !slugsB.has(s));
  const onlyBSlugs = Array.from(slugsB).filter((s) => !slugsA.has(s));

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Back button */}
      <button
        onClick={() => navigateTo('/stacks')}
        className="inline-flex items-center gap-2 text-xs font-semibold text-[#686B73] dark:text-[#9BA1AC] hover:text-[#111318] dark:hover:text-white transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>BACK TO STACKS</span>
      </button>

      {/* Header */}
      <div className="pb-6 border-b border-[#D5D1C4] dark:border-[#2C3142] space-y-2">
        <div className="text-xs font-mono uppercase tracking-widest text-[#B855F6]">
          INTERACTIVE COMPARISON
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#12141A] dark:text-white tracking-tight">
          Compare Practitioner Stacks
        </h1>
        <p className="text-sm text-[#5E626E] dark:text-[#9BA1AC] max-w-2xl leading-relaxed">
          Select two toolkits to analyze overlapping workflows and unique tool choices side by side.
        </p>
      </div>

      {/* Stack Selection Selectors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-[#F2F0E8] dark:bg-[#1E212D] rounded-xl border border-[#D5D1C4] dark:border-[#2C3142] shadow-xs">
        
        {/* Stack A selector */}
        <div className="space-y-2">
          <label className="block text-xs font-mono uppercase tracking-wider text-[#5E626E] dark:text-[#9BA1AC]">
            Stack A
          </label>
          <select
            value={stackAId}
            onChange={(e) => setStackAId(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-[#E7E5DE] dark:bg-[#25293A] text-sm font-semibold text-[#12141A] dark:text-white rounded-lg border border-[#D5D1C4] dark:border-[#2C3142] focus:outline-none focus:border-[#B855F6]"
          >
            {stacks.map((stk) => (
              <option key={stk.id} value={stk.id} disabled={stk.id === stackBId}>
                {stk.name} (@{stk.author.username} · {stk.role})
              </option>
            ))}
          </select>
          {stackA && (
            <p className="text-xs text-[#5E626E] dark:text-[#9BA1AC] line-clamp-2 pt-1">
              {stackA.description}
            </p>
          )}
        </div>

        {/* Stack B selector */}
        <div className="space-y-2">
          <label className="block text-xs font-mono uppercase tracking-wider text-[#5E626E] dark:text-[#9BA1AC]">
            Stack B
          </label>
          <select
            value={stackBId}
            onChange={(e) => setStackBId(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-[#E7E5DE] dark:bg-[#25293A] text-sm font-semibold text-[#12141A] dark:text-white rounded-lg border border-[#D5D1C4] dark:border-[#2C3142] focus:outline-none focus:border-[#B855F6]"
          >
            {stacks.map((stk) => (
              <option key={stk.id} value={stk.id} disabled={stk.id === stackAId}>
                {stk.name} (@{stk.author.username} · {stk.role})
              </option>
            ))}
          </select>
          {stackB && (
            <p className="text-xs text-[#5E626E] dark:text-[#9BA1AC] line-clamp-2 pt-1">
              {stackB.description}
            </p>
          )}
        </div>

      </div>

      {/* Comparison Results */}
      {stackA && stackB && (
        <div className="space-y-8">
          
          {/* Section 1: Both Use (Intersection) */}
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#E2DFD6] dark:border-[#22262E]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#1D9A6C]" />
                <h3 className="text-lg font-bold text-[#111318] dark:text-white">
                  Both Stacks Use
                </h3>
              </div>
              <span className="text-xs font-mono text-[#8C8F99] dark:text-[#7B8190] tabular-nums">
                {bothSlugs.length} shared tools
              </span>
            </div>

            {bothSlugs.length === 0 ? (
              <div className="p-6 bg-white dark:bg-[#14161C] rounded-lg border border-[#E2DFD6] dark:border-[#22262E] text-center text-xs text-[#686B73] dark:text-[#9BA1AC]">
                No overlapping tools between these two stacks. Completely disjoint workflows.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {bothSlugs.map((slug) => {
                  const source = sources.find((s) => s.slug === slug);
                  if (!source) return null;
                  return (
                    <div
                      key={slug}
                      onClick={() => navigateTo(`/sources/${source.slug}`)}
                      className="p-4 bg-[#F2F0E8] dark:bg-[#1E212D] rounded-xl border border-[#D5D1C4] dark:border-[#2C3142] hover:border-[#B855F6] dark:hover:border-[#B855F6] transition-all cursor-pointer group shadow-xs"
                    >
                      <div className="text-[10px] font-mono text-[#1D9A6C] font-semibold uppercase">
                        SHARED · SOURCE / {source.source_number}
                      </div>
                      <div className="text-sm font-bold text-[#111318] dark:text-white group-hover:text-[#B855F6] transition-colors mt-0.5">
                        {source.name}
                      </div>
                      <div className="text-xs text-[#5E626E] dark:text-[#9BA1AC] line-clamp-1 mt-1">
                        {source.description}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Section 2: Side by Side (Only A vs Only B) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Only Stack A */}
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-[#D5D1C4] dark:border-[#2C3142]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#B855F6]" />
                  <h3 className="text-base font-bold text-[#111318] dark:text-white">
                    Only in {stackA.name}
                  </h3>
                </div>
                <span className="text-xs font-mono text-[#8C8F99] dark:text-[#7B8190] tabular-nums">
                  {onlyASlugs.length} tools
                </span>
              </div>

              {onlyASlugs.length === 0 ? (
                <div className="p-4 bg-[#F2F0E8] dark:bg-[#1E212D] rounded-xl border border-[#D5D1C4] dark:border-[#2C3142] text-center text-xs text-[#5E626E] dark:text-[#9BA1AC]">
                  All tools in this stack are also in {stackB.name}.
                </div>
              ) : (
                <div className="space-y-2">
                  {onlyASlugs.map((slug) => {
                    const source = sources.find((s) => s.slug === slug);
                    const note = stackA.sources.find((s) => s.source_slug === slug)?.notes;
                    if (!source) return null;
                    return (
                      <div
                        key={slug}
                        onClick={() => navigateTo(`/sources/${source.slug}`)}
                        className="p-3.5 bg-[#F2F0E8] dark:bg-[#1E212D] rounded-xl border border-[#D5D1C4] dark:border-[#2C3142] hover:border-[#B855F6] dark:hover:border-[#B855F6] transition-all cursor-pointer group space-y-1 shadow-xs"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-bold text-[#111318] dark:text-white group-hover:text-[#B855F6] transition-colors">
                            {source.name}
                          </span>
                          <span className="text-[10px] font-mono text-[#8C8F99] dark:text-[#7B8190]">
                            {source.category}
                          </span>
                        </div>
                        <p className="text-xs text-[#5E626E] dark:text-[#9BA1AC] line-clamp-1">
                          {source.description}
                        </p>
                        {note && (
                          <p className="text-[11px] text-[#111318] dark:text-[#E2E6EF] italic font-serif pt-1">
                            "{note}"
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Only Stack B */}
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-[#E2DFD6] dark:border-[#22262E]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#243BFF]" />
                  <h3 className="text-base font-bold text-[#111318] dark:text-white">
                    Only in {stackB.name}
                  </h3>
                </div>
                <span className="text-xs font-mono text-[#8C8F99] dark:text-[#7B8190] tabular-nums">
                  {onlyBSlugs.length} tools
                </span>
              </div>

              {onlyBSlugs.length === 0 ? (
                <div className="p-4 bg-white dark:bg-[#14161C] rounded-lg border border-[#E2DFD6] dark:border-[#22262E] text-center text-xs text-[#686B73] dark:text-[#9BA1AC]">
                  All tools in this stack are also in {stackA.name}.
                </div>
              ) : (
                <div className="space-y-2">
                  {onlyBSlugs.map((slug) => {
                    const source = sources.find((s) => s.slug === slug);
                    const note = stackB.sources.find((s) => s.source_slug === slug)?.notes;
                    if (!source) return null;
                    return (
                      <div
                        key={slug}
                        onClick={() => navigateTo(`/sources/${source.slug}`)}
                        className="p-3.5 bg-white dark:bg-[#14161C] rounded-lg border border-[#E2DFD6] dark:border-[#22262E] hover:border-[#111318] dark:hover:border-white transition-all cursor-pointer group space-y-1"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-bold text-[#111318] dark:text-white group-hover:text-[#243BFF] transition-colors">
                            {source.name}
                          </span>
                          <span className="text-[10px] font-mono text-[#8C8F99] dark:text-[#7B8190]">
                            {source.category}
                          </span>
                        </div>
                        <p className="text-xs text-[#686B73] dark:text-[#9BA1AC] line-clamp-1">
                          {source.description}
                        </p>
                        {note && (
                          <p className="text-[11px] text-[#111318] dark:text-[#E2E6EF] italic font-serif pt-1">
                            "{note}"
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

          </div>

        </div>
      )}

    </div>
  );
};
