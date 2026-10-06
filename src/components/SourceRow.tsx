import React from 'react';
import { motion } from 'motion/react';
import { Source } from '../types';
import { useApp } from '../context/AppContext';
import { ArrowRight, Bookmark, BookmarkCheck, ExternalLink, Plus } from 'lucide-react';

interface SourceRowProps {
  source: Source;
  index?: number;
}

export const SourceRow: React.FC<SourceRowProps> = ({ source, index = 0 }) => {
  const { navigateTo, isSourceSaved, saveSource, unsaveSource, openAddToStack } = useApp();
  const saved = isSourceSaved(source.slug);

  const handleRowClick = () => {
    navigateTo(`/sources/${source.slug}`);
  };

  const handleSaveToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (saved) {
      unsaveSource(source.slug);
    } else {
      saveSource(source.slug);
    }
  };

  const handleAddClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    openAddToStack(source);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.35,
        delay: Math.min(index * 0.04, 0.4),
        ease: [0.22, 1, 0.36, 1]
      }}
      whileHover={{
        y: -3,
        transition: { duration: 0.18, ease: 'easeOut' }
      }}
      onClick={handleRowClick}
      className="group relative flex flex-col md:flex-row md:items-center justify-between py-4 px-4 sm:px-6 border-b border-[#D8D4C7] dark:border-[#2C3142] bg-[#F2F0E8] dark:bg-[#1E212D] hover:bg-[#FAF9F5] dark:hover:bg-[#252937] hover:shadow-lg hover:shadow-[#B855F6]/10 dark:hover:shadow-[#B855F6]/15 hover:z-10 transition-colors duration-150 cursor-pointer"
    >
      {/* Lilac accent line indicator on hover */}
      <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#B855F6] opacity-0 group-hover:opacity-100 transition-opacity" />

      {/* Left zone: Index, Identification, Title, Deck */}
      <div className="flex items-start md:items-center gap-4 sm:gap-6 min-w-0 pr-4">
        
        {/* Editorial Index / Source # */}
        <div className="shrink-0 flex flex-col items-start w-16">
          <span className="text-xs font-mono font-semibold text-[#8C8F99] dark:text-[#7B8190] group-hover:text-[#B855F6] transition-colors tabular-nums">
            {index !== undefined ? String(index + 1).padStart(2, '0') : source.source_number}
          </span>
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#8C8F99] dark:text-[#7B8190]">
            #{source.source_number}
          </span>
        </div>

        {/* Title and Deck */}
        <div className="min-w-0 space-y-1">
          <div className="flex items-center gap-3">
            <h3 className="text-base sm:text-lg font-bold tracking-tight text-[#111318] dark:text-[#F0F2F5] group-hover:text-[#B855F6] transition-colors">
              {source.name}
            </h3>
            {source.verified && (
              <span className="text-[10px] font-mono text-[#1D9A6C] tracking-wider uppercase">
                Verified
              </span>
            )}
            {source.featured && (
              <span className="text-[10px] font-mono text-[#B855F6] bg-[#B855F6]/10 px-1.5 py-0.5 rounded tracking-wider uppercase font-semibold">
                Featured
              </span>
            )}
          </div>
          <p className="text-xs sm:text-sm text-[#5E626E] dark:text-[#9BA1AC] line-clamp-1 max-w-2xl font-normal">
            {source.description}
          </p>
        </div>
      </div>

      {/* Right zone: Unboxed Metadata & Functional Affordances */}
      <div className="mt-3 md:mt-0 flex items-center justify-between md:justify-end gap-5 shrink-0 pl-16 md:pl-0">
        
        {/* Unboxed Metadata (Category · License · Pricing) */}
        <div className="flex items-center gap-2 text-xs font-mono text-[#5E626E] dark:text-[#9BA1AC]">
          <span className="text-[#111318] dark:text-[#E4E7ED] font-medium">{source.category}</span>
          <span aria-hidden="true" className="text-[#B0ACA2] dark:text-[#4A4E5C]">·</span>
          <span>{source.pricing}</span>
          <span aria-hidden="true" className="hidden sm:inline text-[#B0ACA2] dark:text-[#4A4E5C]">·</span>
          <span className="hidden sm:inline text-[#8C8F99] dark:text-[#7B8190]">{source.license}</span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleAddClick}
            title="Add to Stack"
            className="p-1.5 text-[#5E626E] dark:text-[#9BA1AC] hover:text-[#111318] dark:hover:text-white hover:bg-[#E4E1D7] dark:hover:bg-[#2C3142] rounded transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>

          <button
            onClick={handleSaveToggle}
            title={saved ? 'Remove from saved' : 'Save source'}
            className={`p-1.5 rounded transition-colors ${
              saved
                ? 'text-[#B855F6] bg-[#B855F6]/15'
                : 'text-[#5E626E] dark:text-[#9BA1AC] hover:text-[#111318] dark:hover:text-white hover:bg-[#E4E1D7] dark:hover:bg-[#2C3142]'
            }`}
          >
            {saved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
          </button>

          <div className="pl-1 text-[#8C8F99] dark:text-[#7B8190] group-hover:text-[#B855F6] transition-colors">
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

      </div>
    </motion.div>
  );
};
