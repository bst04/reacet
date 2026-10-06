import React from 'react';
import { Stack } from '../types';
import { useApp } from '../context/AppContext';
import { ArrowRight, Layers, User } from 'lucide-react';

interface StackCardProps {
  stack: Stack;
}

export const StackCard: React.FC<StackCardProps> = ({ stack }) => {
  const { navigateTo, sources } = useApp();

  const handleCardClick = () => {
    navigateTo(`/stacks/${stack.slug}`);
  };

  // Resolve source objects for preview names
  const previewSources = stack.sources.slice(0, 4).map((s) => {
    const srcObj = sources.find((item) => item.slug === s.source_slug);
    return srcObj ? srcObj.name : s.source_slug;
  });

  return (
    <div
      onClick={handleCardClick}
      className="group bg-[#F2F0E8] dark:bg-[#1E212D] rounded-xl border border-[#D5D1C4] dark:border-[#2C3142] hover:border-[#B855F6] dark:hover:border-[#B855F6] p-6 flex flex-col justify-between transition-all duration-150 cursor-pointer shadow-xs hover:shadow-md hover:shadow-[#B855F6]/5"
    >
      <div className="space-y-3">
        {/* Top line: Author & Role */}
        <div className="flex items-center justify-between text-xs text-[#5E626E] dark:text-[#9BA1AC]">
          <div className="flex items-center gap-1.5">
            <span className="font-mono text-[#111318] dark:text-white font-medium">@{stack.author.username}</span>
            <span aria-hidden="true" className="text-[#B0ACA2] dark:text-[#4A4E5C]">·</span>
            <span>{stack.role}</span>
          </div>
          <span className="font-mono text-[11px] text-[#8C8F99] dark:text-[#7B8190] tabular-nums">
            {stack.sources.length} sources
          </span>
        </div>

        {/* Stack Name & Description */}
        <div>
          <h3 className="text-lg font-bold tracking-tight text-[#111318] dark:text-white group-hover:text-[#B855F6] transition-colors">
            {stack.name}
          </h3>
          <p className="text-xs sm:text-sm text-[#5E626E] dark:text-[#9BA1AC] line-clamp-2 mt-1 leading-relaxed">
            {stack.description}
          </p>
        </div>

        {/* Small preview of sources (unboxed text separated by ·) */}
        <div className="pt-2 text-xs font-mono text-[#111318] dark:text-[#DCE0EA] flex items-center flex-wrap gap-x-2 gap-y-1">
          {previewSources.map((name, i) => (
            <React.Fragment key={name}>
              <span className="hover:text-[#B855F6] transition-colors">{name}</span>
              {i < previewSources.length - 1 && (
                <span className="text-[#C4C0B5] dark:text-[#4A4E5C]">·</span>
              )}
            </React.Fragment>
          ))}
          {stack.sources.length > 4 && (
            <span className="text-[#8C8F99] dark:text-[#7B8190] text-[11px]">
              +{stack.sources.length - 4} more
            </span>
          )}
        </div>
      </div>

      {/* Bottom CTA Row */}
      <div className="mt-6 pt-4 border-t border-[#D5D1C4] dark:border-[#272B3B] flex items-center justify-between text-xs">
        <span className="text-[11px] font-mono text-[#8C8F99] dark:text-[#7B8190]">
          Updated {stack.updated_at}
        </span>
        <span className="font-semibold text-[#111318] dark:text-white group-hover:text-[#B855F6] flex items-center gap-1 transition-colors">
          View Stack <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
        </span>
      </div>
    </div>
  );
};
