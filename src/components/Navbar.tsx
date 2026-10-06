import React from 'react';
import { useApp } from '../context/AppContext';
import { Search, Plus, User, LogOut, Layers, MessageSquare, Compass, Shield, Sun, Moon, Edit3, BookOpen } from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    currentPath,
    navigateTo,
    currentUser,
    isAuthenticated,
    setIsSearchOpen,
    setIsAuthModalOpen,
    setIsEditProfileModalOpen,
    logout,
    theme,
    toggleTheme
  } = useApp();

  const isCurrent = (route: string) => {
    if (route === '/' && (currentPath === '/' || currentPath === '')) return true;
    if (route !== '/' && currentPath.startsWith(route)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#E7E5DE]/90 dark:bg-[#161822]/90 backdrop-blur-md border-b border-[#D5D1C4] dark:border-[#2E3345] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Zone 1: Brand Wordmark (Single text element wordmark as per Top Bar Contract) */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => navigateTo('/')}
            className="flex items-center gap-2.5 text-left group focus:outline-none cursor-pointer"
            title="CyberSources — Discover Cybersecurity"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#7C3AED] group-hover:scale-125 transition-transform" />
            <span className="text-xl font-bold tracking-tight text-[#111318] dark:text-white group-hover:text-[#7C3AED] transition-colors">
              CyberSources
            </span>
          </button>
        </div>

        {/* Zone 2: Primary Nav Links (Text links with subtle hover underlines, single-line) */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
          <button
            onClick={() => navigateTo('/sources')}
            className={`transition-colors pb-0.5 whitespace-nowrap cursor-pointer ${
              isCurrent('/sources')
                ? 'text-[#111318] dark:text-white font-semibold border-b-2 border-[#7C3AED]'
                : 'text-[#5E626E] dark:text-[#9BA1AC] hover:text-[#111318] dark:hover:text-white'
            }`}
          >
            Sources
          </button>
          <button
            onClick={() => navigateTo('/resources')}
            className={`transition-colors pb-0.5 whitespace-nowrap cursor-pointer ${
              isCurrent('/resources')
                ? 'text-[#111318] dark:text-white font-semibold border-b-2 border-[#7C3AED]'
                : 'text-[#5E626E] dark:text-[#9BA1AC] hover:text-[#111318] dark:hover:text-white'
            }`}
          >
            Resources
          </button>
          <button
            onClick={() => navigateTo('/stacks')}
            className={`transition-colors pb-0.5 whitespace-nowrap cursor-pointer ${
              isCurrent('/stacks')
                ? 'text-[#111318] dark:text-white font-semibold border-b-2 border-[#7C3AED]'
                : 'text-[#5E626E] dark:text-[#9BA1AC] hover:text-[#111318] dark:hover:text-white'
            }`}
          >
            Stacks
          </button>
          <button
            onClick={() => navigateTo('/discuss')}
            className={`transition-colors pb-0.5 whitespace-nowrap cursor-pointer ${
              isCurrent('/discuss')
                ? 'text-[#111318] dark:text-white font-semibold border-b-2 border-[#7C3AED]'
                : 'text-[#5E626E] dark:text-[#9BA1AC] hover:text-[#111318] dark:hover:text-white'
            }`}
          >
            Discuss
          </button>
          <button
            onClick={() => setIsSearchOpen(true)}
            className="flex items-center gap-2 text-[#5E626E] dark:text-[#9BA1AC] hover:text-[#111318] dark:hover:text-white transition-colors whitespace-nowrap cursor-pointer"
          >
            <Search className="w-4 h-4" />
            <span>Search</span>
            <kbd className="hidden lg:inline-block px-1.5 py-0.5 text-[11px] font-mono bg-[#E2E0D6] dark:bg-[#1E202A] text-[#5E626E] dark:text-[#9BA1AC] rounded border border-[#D5D2C6] dark:border-[#2C313E]">
              ⌘K
            </kbd>
          </button>
        </nav>

        {/* Zone 3: Primary Actions (Single-line, clear hierarchy) */}
        <div className="flex items-center gap-2.5">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            title={theme === 'dark' ? 'Switch to Light mode' : 'Switch to Dark mode'}
            className="p-2 text-[#5E626E] dark:text-[#9BA1AC] hover:text-[#111318] dark:hover:text-white hover:bg-[#E2E0D6] dark:hover:bg-[#1E202A] rounded-md transition-colors cursor-pointer"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-[#FBBF24]" />
            ) : (
              <Moon className="w-4 h-4 text-[#7C3AED]" />
            )}
          </button>

          <button
            onClick={() => navigateTo('/submit')}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#111318] dark:text-[#E2E6EF] bg-transparent border border-[#111318]/20 dark:border-[#333845] hover:border-[#111318] dark:hover:border-white rounded-md transition-all whitespace-nowrap cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 text-[#7C3AED]" />
            <span>Submit</span>
          </button>

          {isAuthenticated && currentUser ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigateTo('/dashboard')}
                className={`inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                  isCurrent('/dashboard')
                    ? 'bg-[#191B22] dark:bg-[#252834] text-white'
                    : 'bg-[#E2E0D6] dark:bg-[#1E202A] text-[#111318] dark:text-[#F0F2F5] hover:bg-[#D5D2C6] dark:hover:bg-[#252834]'
                }`}
              >
                <div className="w-2 h-2 rounded-full bg-[#1D9A6C]" />
                <span className="font-mono">@{currentUser.username}</span>
              </button>

              <button
                onClick={() => setIsEditProfileModalOpen(true)}
                title="Edit profile"
                className="hidden sm:inline-flex p-1.5 text-[#5E626E] dark:text-[#9BA1AC] hover:text-[#111318] dark:hover:text-white rounded-md hover:bg-[#E2E0D6] dark:hover:bg-[#1E202A] transition-colors cursor-pointer"
                aria-label="Edit Profile"
              >
                <Edit3 className="w-4 h-4" />
              </button>

              <button
                onClick={logout}
                title="Sign out"
                className="p-1.5 text-[#5E626E] dark:text-[#9BA1AC] hover:text-[#D94B4B] rounded-md hover:bg-[#E2E0D6] dark:hover:bg-[#1E202A] transition-colors cursor-pointer"
                aria-label="Sign out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="px-4 py-1.5 text-xs font-semibold text-white bg-[#191B22] dark:bg-[#252834] hover:bg-[#7C3AED] dark:hover:bg-[#7C3AED] rounded-md transition-colors whitespace-nowrap cursor-pointer"
            >
              Sign in
            </button>
          )}

          {/* Mobile Search trigger */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="md:hidden p-2 text-[#111318] dark:text-white hover:bg-[#E2E0D6] dark:hover:bg-[#1E202A] rounded-md transition-colors cursor-pointer"
            aria-label="Search"
          >
            <Search className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Mobile Subnav Strip */}
      <div className="md:hidden flex items-center justify-around border-t border-[#DCD9CF] dark:border-[#282B37] py-2 px-3 bg-[#E5E3DC] dark:bg-[#16171E] text-xs font-medium text-[#5E626E] dark:text-[#9BA1AC]">
        <button
          onClick={() => navigateTo('/sources')}
          className={`flex items-center gap-1 ${isCurrent('/sources') ? 'text-[#7C3AED] font-semibold' : ''}`}
        >
          <Compass className="w-3.5 h-3.5" />
          <span>Sources</span>
        </button>
        <button
          onClick={() => navigateTo('/resources')}
          className={`flex items-center gap-1 ${isCurrent('/resources') ? 'text-[#7C3AED] font-semibold' : ''}`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Resources</span>
        </button>
        <button
          onClick={() => navigateTo('/stacks')}
          className={`flex items-center gap-1 ${isCurrent('/stacks') ? 'text-[#7C3AED] font-semibold' : ''}`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Stacks</span>
        </button>
        <button
          onClick={() => navigateTo('/discuss')}
          className={`flex items-center gap-1 ${isCurrent('/discuss') ? 'text-[#7C3AED] font-semibold' : ''}`}
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Discuss</span>
        </button>
      </div>
    </header>
  );
};
