import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ArrowLeft, ChevronUp, MessageSquare, CornerDownRight, ExternalLink, Shield } from 'lucide-react';

interface DiscussionDetailPageProps {
  slug: string;
}

export const DiscussionDetailPage: React.FC<DiscussionDetailPageProps> = ({ slug }) => {
  const {
    discussions,
    sources,
    navigateTo,
    currentUser,
    toggleUpvoteDiscussion,
    addReplyToDiscussion,
    setIsAuthModalOpen
  } = useApp();

  const discussion = discussions.find((d) => d.slug === slug);
  const [replyText, setReplyText] = useState('');

  if (!discussion) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-[#111318]">Discussion Not Found</h2>
        <p className="text-sm text-[#686B73]">
          The requested discussion could not be located.
        </p>
        <button
          onClick={() => navigateTo('/discuss')}
          className="px-4 py-2 text-xs font-semibold text-white bg-[#17191D] rounded-md"
        >
          Return to Discussions
        </button>
      </div>
    );
  }

  const hasUpvoted = currentUser ? discussion.upvoted_by.includes(currentUser.username) : false;
  const connectedSource = discussion.source_slug
    ? sources.find((s) => s.slug === discussion.source_slug)
    : null;

  const handleReplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      setIsAuthModalOpen(true);
      return;
    }
    if (!replyText.trim()) return;

    addReplyToDiscussion(discussion.id, replyText.trim());
    setReplyText('');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Back button */}
      <button
        onClick={() => navigateTo('/discuss')}
        className="inline-flex items-center gap-2 text-xs font-semibold text-[#686B73] dark:text-[#9BA1AC] hover:text-[#111318] dark:hover:text-white transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>BACK TO DISCUSSIONS</span>
      </button>

      {/* Main Discussion Post */}
      <div className="bg-[#F2F0E8] dark:bg-[#1E212D] rounded-xl border border-[#D5D1C4] dark:border-[#2C3142] p-6 sm:p-10 space-y-6 shadow-xs">
        
        {/* Top metadata */}
        <div className="flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[#B855F6] uppercase font-bold text-[11px]">
              {discussion.type}
            </span>
            <span className="text-[#C4C0B5] dark:text-[#4A4E5C]">·</span>
            <span className="font-semibold text-[#111318] dark:text-white">{discussion.category}</span>
          </div>

          <div className="flex items-center gap-2 text-[#8C8F99] dark:text-[#7B8190] font-mono text-[11px]">
            <span>Posted on {discussion.created_at}</span>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111318] dark:text-white tracking-tight leading-snug">
          {discussion.title}
        </h1>

        {/* Connected Source Banner if applicable */}
        {connectedSource && (
          <div
            onClick={() => navigateTo(`/sources/${connectedSource.slug}`)}
            className="p-3.5 bg-[#E7E5DE] dark:bg-[#181A24] hover:bg-[#DDD9CE] dark:hover:bg-[#252937] rounded-lg border border-[#D5D1C4] dark:border-[#2C3142] flex items-center justify-between cursor-pointer group transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[#B855F6]" />
              <span className="text-xs font-mono font-semibold text-[#111318] dark:text-white">
                SOURCE / {connectedSource.source_number} — {connectedSource.name}
              </span>
              <span className="text-xs text-[#5E626E] dark:text-[#9BA1AC] hidden sm:inline">
                ({connectedSource.description})
              </span>
            </div>
            <span className="text-xs font-mono text-[#B855F6] group-hover:underline flex items-center gap-1">
              View Source Dossier →
            </span>
          </div>
        )}

        {/* Author header */}
        <div className="flex items-center gap-3 pt-2 pb-4 border-b border-[#D5D1C4] dark:border-[#2C3142]">
          <div className="w-8 h-8 rounded-full bg-[#E4E1D7] dark:bg-[#252937] flex items-center justify-center font-mono font-bold text-xs text-[#111318] dark:text-white">
            {discussion.user.username.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <div className="text-sm font-bold text-[#111318] dark:text-white">
              {discussion.user.display_name}{' '}
              <span className="font-mono text-xs font-normal text-[#8C8F99] dark:text-[#7B8190]">
                @{discussion.user.username}
              </span>
            </div>
            <div className="text-xs text-[#5E626E] dark:text-[#9BA1AC]">
              {discussion.user.role}
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="text-sm sm:text-base text-[#111318] dark:text-[#ECEEF2] leading-relaxed whitespace-pre-line space-y-4">
          <p>{discussion.body}</p>
        </div>

        {/* Actions bar (Upvote button + reply counter) */}
        <div className="pt-4 border-t border-[#D5D1C4] dark:border-[#2C3142] flex items-center justify-between">
          <button
            onClick={() => toggleUpvoteDiscussion(discussion.id)}
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded border text-xs font-mono font-semibold transition-all cursor-pointer ${
              hasUpvoted
                ? 'bg-[#B855F6] text-white border-[#B855F6]'
                : 'bg-[#E7E5DE] dark:bg-[#181A24] text-[#111318] dark:text-white border-[#D5D1C4] dark:border-[#2C3142] hover:border-[#B855F6] dark:hover:border-[#B855F6]'
            }`}
          >
            <ChevronUp className="w-4 h-4" />
            <span className="tabular-nums">{discussion.upvotes} upvotes</span>
          </button>

          <div className="flex items-center gap-1.5 text-xs font-mono text-[#5E626E] dark:text-[#9BA1AC]">
            <MessageSquare className="w-4 h-4" />
            <span className="tabular-nums">{discussion.replies_count} replies</span>
          </div>
        </div>

      </div>

      {/* Replies Thread */}
      <div className="space-y-4">
        <h3 className="text-xs font-mono uppercase tracking-widest text-[#5E626E] dark:text-[#9BA1AC]">
          COMMUNITY REPLIES ({discussion.replies.length})
        </h3>

        {discussion.replies.length === 0 ? (
          <div className="p-8 bg-[#F2F0E8] dark:bg-[#1E212D] rounded-xl border border-[#D5D1C4] dark:border-[#2C3142] text-center text-xs text-[#5E626E] dark:text-[#9BA1AC]">
            No replies yet. Share your experience or insights below.
          </div>
        ) : (
          <div className="space-y-3">
            {discussion.replies.map((reply) => (
              <div
                key={reply.id}
                className="p-5 bg-[#F2F0E8] dark:bg-[#1E212D] rounded-xl border border-[#D5D1C4] dark:border-[#2C3142] space-y-2.5 shadow-xs"
              >
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#111318] dark:text-white">
                      {reply.user.display_name}
                    </span>
                    <span className="font-mono text-xs text-[#8C8F99] dark:text-[#7B8190]">
                      @{reply.user.username}
                    </span>
                    <span className="text-[#C4C0B5] dark:text-[#4A4E5C]">·</span>
                    <span className="text-[#5E626E] dark:text-[#9BA1AC]">{reply.user.role}</span>
                  </div>
                  <span className="font-mono text-[11px] text-[#8C8F99] dark:text-[#7B8190]">
                    {reply.created_at}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#111318] dark:text-[#E2E6EF] leading-relaxed whitespace-pre-line">
                  {reply.body}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Reply Submission Form */}
        <form onSubmit={handleReplySubmit} className="p-5 bg-[#F2F0E8] dark:bg-[#1E212D] rounded-xl border border-[#D5D1C4] dark:border-[#2C3142] space-y-3 shadow-xs">
          <label className="block text-xs font-mono uppercase tracking-wider text-[#5E626E] dark:text-[#9BA1AC]">
            Add a reply as {currentUser ? `@${currentUser.username}` : 'guest'}
          </label>
          <textarea
            rows={3}
            required
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Share your perspective, command flags, or alternative tool recommendations..."
            className="w-full px-3 py-2 bg-[#E7E5DE] dark:bg-[#181A24] text-sm text-[#111318] dark:text-white border border-[#D5D1C4] dark:border-[#2C3142] rounded-md focus:outline-none focus:border-[#B855F6] resize-none"
          />
          <div className="flex items-center justify-end">
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold text-white bg-[#B855F6] hover:bg-[#A23BE9] rounded-md transition-colors shadow-md shadow-[#B855F6]/20 cursor-pointer"
            >
              Post Reply
            </button>
          </div>
        </form>

      </div>

    </div>
  );
};
