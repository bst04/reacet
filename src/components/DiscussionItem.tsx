import React from 'react';
import { Discussion } from '../types';
import { useApp } from '../context/AppContext';
import { ChevronUp, MessageSquare, ArrowRight, CornerRightDown } from 'lucide-react';

interface DiscussionItemProps {
  discussion: Discussion;
}

export const DiscussionItem: React.FC<DiscussionItemProps> = ({ discussion }) => {
  const { navigateTo, toggleUpvoteDiscussion, currentUser, sources } = useApp();
  const hasUpvoted = currentUser ? discussion.upvoted_by.includes(currentUser.username) : false;

  const connectedSource = discussion.source_slug
    ? sources.find((s) => s.slug === discussion.source_slug)
    : null;

  const handleUpvote = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleUpvoteDiscussion(discussion.id);
  };

  return (
    <div
      onClick={() => navigateTo(`/discuss/${discussion.slug}`)}
      className="group p-5 bg-[#F2F0E8] dark:bg-[#1E212D] rounded-xl border border-[#D5D1C4] dark:border-[#2C3142] hover:border-[#B855F6] dark:hover:border-[#B855F6] transition-all duration-150 cursor-pointer flex items-start gap-4 shadow-xs hover:shadow-md hover:shadow-[#B855F6]/5"
    >
      {/* Upvote Button / Counter */}
      <button
        onClick={handleUpvote}
        className={`shrink-0 flex flex-col items-center justify-center w-12 py-2 rounded-lg border transition-all cursor-pointer ${
          hasUpvoted
            ? 'bg-[#B855F6] text-white border-[#B855F6]'
            : 'bg-[#E7E5DE] dark:bg-[#181A24] text-[#111318] dark:text-[#E2E6EF] border-[#D5D1C4] dark:border-[#2C3142] hover:border-[#B855F6] dark:hover:border-[#B855F6]'
        }`}
      >
        <ChevronUp className="w-4 h-4" />
        <span className="text-xs font-mono font-bold tabular-nums">
          {discussion.upvotes}
        </span>
      </button>

      {/* Content */}
      <div className="flex-1 min-w-0 space-y-1.5">
        {/* Metadata line: Type · Category · Connected Source · Author */}
        <div className="flex items-center flex-wrap gap-x-2 gap-y-1 text-xs text-[#5E626E] dark:text-[#9BA1AC]">
          <span className="font-mono text-[#B855F6] uppercase font-semibold text-[11px]">
            {discussion.type}
          </span>
          <span className="text-[#C4C0B5] dark:text-[#4A4E5C]">·</span>
          <span className="font-medium text-[#111318] dark:text-[#E2E6EF]">{discussion.category}</span>
          
          {connectedSource && (
            <>
              <span className="text-[#C4C0B5] dark:text-[#4A4E5C]">·</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateTo(`/sources/${connectedSource.slug}`);
                }}
                className="font-mono text-xs text-[#B855F6] hover:underline"
              >
                SOURCE / {connectedSource.source_number} ({connectedSource.name})
              </button>
            </>
          )}

          <span className="text-[#C4C0B5] dark:text-[#4A4E5C]">·</span>
          <span className="font-mono text-[11px] text-[#8C8F99] dark:text-[#7B8190]">
            @{discussion.user.username}
          </span>
        </div>

        {/* Title */}
        <h4 className="text-base font-bold text-[#111318] dark:text-white group-hover:text-[#B855F6] transition-colors leading-snug">
          {discussion.title}
        </h4>

        {/* Body snippet */}
        <p className="text-xs sm:text-sm text-[#5E626E] dark:text-[#9BA1AC] line-clamp-2 leading-relaxed">
          {discussion.body}
        </p>

        {/* Bottom line: Replies count & date */}
        <div className="pt-2 flex items-center justify-between text-xs text-[#8C8F99] dark:text-[#7B8190]">
          <div className="flex items-center gap-1.5 font-mono">
            <MessageSquare className="w-3.5 h-3.5" />
            <span className="tabular-nums">{discussion.replies_count} replies</span>
          </div>
          <span className="font-mono text-[11px]">
            {discussion.created_at}
          </span>
        </div>
      </div>
    </div>
  );
};
