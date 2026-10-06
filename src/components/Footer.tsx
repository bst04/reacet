import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Terminal, Shield, ArrowUpRight, Mail, CheckCircle2, ArrowRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const {
    navigateTo,
    sources,
    stacks,
    discussions,
    users,
    isSubscribedNewsletter,
    subscribeNewsletter
  } = useApp();

  const [emailInput, setEmailInput] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (subscribeNewsletter(emailInput.trim())) {
      setEmailInput('');
    }
  };

  return (
    <footer className="w-full bg-[#181A22] dark:bg-[#161820] text-[#ECE9E0] border-t border-[#292D3B] dark:border-[#242733] pt-16 pb-12 mt-24 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* 'Stay Updated' Newsletter Subscription Section — Centered in the layout */}
        <div className="max-w-2xl mx-auto text-center space-y-4 py-8 px-6 bg-[#222530] dark:bg-[#1D202A] rounded-2xl border border-[#2F3445] dark:border-[#2B2F3F] shadow-lg shadow-black/20">
          <div className="inline-flex items-center gap-2 text-[11px] font-mono tracking-widest uppercase text-[#7C3AED]">
            <span className="w-2 h-2 rounded-full bg-[#7C3AED]" />
            STAY UPDATED · WEEKLY DISPATCH
          </div>
          
          <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            Discover new cybersecurity tools first.
          </h3>
          
          <p className="text-xs sm:text-sm text-[#A0A4B0] max-w-lg mx-auto leading-relaxed">
            Get weekly updates featuring newly cataloged tools, verified security resources, and top practitioner workflows. Zero noise.
          </p>

          {isSubscribedNewsletter ? (
            <div className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#1D9A6C]/15 border border-[#1D9A6C]/40 text-[#1D9A6C] rounded-lg text-xs font-mono font-medium">
              <CheckCircle2 className="w-4 h-4 text-[#1D9A6C]" />
              <span>You are subscribed to the CyberSources weekly digest.</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2 max-w-md mx-auto">
              <div className="relative w-full">
                <Mail className="w-4 h-4 text-[#828794] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="Enter your email address..."
                  className="w-full pl-10 pr-4 py-2.5 bg-[#181A22] dark:bg-[#14161E] text-xs sm:text-sm text-white placeholder-[#828794] rounded-lg border border-[#3A3F52] focus:outline-none focus:border-[#7C3AED] transition-colors"
                />
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold text-white bg-[#7C3AED] hover:bg-[#6D28D9] rounded-lg transition-colors whitespace-nowrap flex items-center justify-center gap-1.5 shrink-0 shadow-md shadow-[#7C3AED]/20 cursor-pointer"
              >
                <span>Subscribe</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          )}

          <div className="text-[10px] font-mono text-[#828794] pt-1">
            Strict privacy · Unsubscribe at any time · No marketing spam
          </div>
        </div>

        {/* Top Editorial Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-[#292D3B] dark:border-[#242733]">
          
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#7C3AED]" />
              <span className="text-lg font-bold tracking-tight text-white font-mono">
                CYBERSOURCES
              </span>
            </div>
            <p className="text-sm text-[#A0A4B0] leading-relaxed max-w-md">
              A curated discovery platform for cybersecurity tools, resources, and the practitioners who use them. Built around a simple conviction: <span className="text-white font-medium">Less information. Better filtered information.</span>
            </p>
            <div className="pt-2 flex items-center gap-4 text-xs font-mono text-[#828794]">
              <span>ARCHIVE / 2026</span>
              <span>·</span>
              <span className="text-[#1D9A6C]">VERIFIED CATALOG</span>
            </div>
          </div>

          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-[#828794]">
              Discovery Pillars
            </h4>
            <ul className="space-y-2 text-sm text-[#D1D4DC]">
              <li>
                <button
                  onClick={() => navigateTo('/sources')}
                  className="hover:text-[#7C3AED] transition-colors cursor-pointer"
                >
                  All Sources Directory
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('/resources')}
                  className="hover:text-[#7C3AED] transition-colors cursor-pointer font-medium text-white"
                >
                  Security Resources & Guides
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('/stacks')}
                  className="hover:text-[#7C3AED] transition-colors cursor-pointer"
                >
                  Practitioner Stacks
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('/stacks/compare')}
                  className="hover:text-[#7C3AED] transition-colors cursor-pointer"
                >
                  Compare Stacks
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('/discuss')}
                  className="hover:text-[#7C3AED] transition-colors cursor-pointer"
                >
                  Technical Discussions
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('/submit')}
                  className="hover:text-[#7C3AED] transition-colors cursor-pointer"
                >
                  Submit a Tool / Source
                </button>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-[#828794]">
              Active Database Metrics
            </h4>
            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3 rounded bg-[#20232A] border border-[#2B2F39]">
                <div className="text-[#828794] text-[10px] uppercase">Cataloged Sources</div>
                <div className="text-lg font-bold text-white tabular-nums">{sources.length}</div>
              </div>
              <div className="p-3 rounded bg-[#20232A] border border-[#2B2F39]">
                <div className="text-[#828794] text-[10px] uppercase">Curated Stacks</div>
                <div className="text-lg font-bold text-white tabular-nums">{stacks.length}</div>
              </div>
              <div className="p-3 rounded bg-[#20232A] border border-[#2B2F39]">
                <div className="text-[#828794] text-[10px] uppercase">Discussions</div>
                <div className="text-lg font-bold text-white tabular-nums">{discussions.length}</div>
              </div>
              <div className="p-3 rounded bg-[#20232A] border border-[#2B2F39]">
                <div className="text-[#828794] text-[10px] uppercase">Contributors</div>
                <div className="text-lg font-bold text-white tabular-nums">{users.length}</div>
              </div>
            </div>
            <p className="text-[11px] text-[#828794] pt-1">
              Zero fabricated metrics. All data derived live from catalog state.
            </p>
          </div>

        </div>

        {/* Bottom Utility Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#828794] gap-4">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} CyberSources.site</span>
            <span>·</span>
            <span>Independent Cybersecurity Discovery</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => navigateTo('/sources')}
              className="hover:text-white transition-colors"
            >
              License & Verification Policy
            </button>
            <span>·</span>
            <div className="flex items-center gap-1.5 font-mono text-[11px]">
              <span>Press</span>
              <kbd className="px-1.5 py-0.5 bg-[#252830] text-[#D1D4DC] rounded border border-[#343946]">
                ⌘K
              </kbd>
              <span>to search anytime</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};
