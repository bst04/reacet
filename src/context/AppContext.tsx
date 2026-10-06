import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Source,
  Stack,
  Discussion,
  UserProfile,
  SourceSubmission,
  CategoryName,
  PractitionerRole
} from '../types';
import { INITIAL_SOURCES } from '../data/sources';
import { INITIAL_STACKS } from '../data/stacks';
import { INITIAL_DISCUSSIONS } from '../data/discussions';
import { INITIAL_USERS } from '../data/users';

interface AppContextType {
  // Navigation & Route
  currentPath: string;
  navigateTo: (path: string) => void;

  // Theme
  theme: 'light' | 'dark';
  toggleTheme: () => void;

  // Data
  sources: Source[];
  stacks: Stack[];
  discussions: Discussion[];
  users: UserProfile[];
  submissions: SourceSubmission[];

  // Current User
  currentUser: UserProfile | null;
  setCurrentUser: (user: UserProfile | null) => void;
  isAuthenticated: boolean;
  switchUser: (username: string) => void;
  logout: () => void;
  updateProfile: (updated: Partial<UserProfile>) => void;
  isEditProfileModalOpen: boolean;
  setIsEditProfileModalOpen: (open: boolean) => void;

  // Newsletter
  isSubscribedNewsletter: boolean;
  subscribeNewsletter: (email: string) => boolean;

  // Actions: Sources
  saveSource: (slug: string) => void;
  unsaveSource: (slug: string) => void;
  isSourceSaved: (slug: string) => boolean;

  // Actions: Stacks
  createStack: (newStack: Omit<Stack, 'id' | 'created_at' | 'updated_at'>) => Stack;
  addSourceToStack: (stackId: string, sourceSlug: string, notes?: string) => void;
  removeSourceFromStack: (stackId: string, sourceSlug: string) => void;

  // Actions: Discussions
  createDiscussion: (newDisc: {
    title: string;
    body: string;
    type: Discussion['type'];
    category: CategoryName;
    source_slug?: string;
    stack_slug?: string;
  }) => Discussion;
  addReplyToDiscussion: (discussionId: string, body: string) => void;
  toggleUpvoteDiscussion: (discussionId: string) => void;

  // Actions: Submissions
  submitSource: (submission: Omit<SourceSubmission, 'id' | 'status' | 'created_at'>) => void;

  // Modals
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  searchInitialQuery: string;
  setSearchInitialQuery: (q: string) => void;

  isAddToStackOpen: boolean;
  setIsAddToStackOpen: (open: boolean) => void;
  sourceForStack: Source | null;
  openAddToStack: (source: Source) => void;

  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;

  // Toast
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Theme state
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('cs_theme');
      if (saved === 'dark' || saved === 'light') return saved;
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    }
    return 'light';
  });

  useEffect(() => {
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      if (theme === 'dark') {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
      localStorage.setItem('cs_theme', theme);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // Newsletter state
  const [isSubscribedNewsletter, setIsSubscribedNewsletter] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('cs_newsletter') === 'true';
    }
    return false;
  });

  const subscribeNewsletter = (email: string): boolean => {
    if (!email || !email.includes('@') || !email.includes('.')) {
      showToast('Please enter a valid email address');
      return false;
    }
    setIsSubscribedNewsletter(true);
    if (typeof window !== 'undefined') {
      localStorage.setItem('cs_newsletter', 'true');
    }
    showToast(`Subscribed! You will receive weekly curated tools & highlights.`);
    return true;
  };

  // Routing based on window.location.hash or fallback to '/'
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace(/^#/, '');
      return hash || '/';
    }
    return '/';
  });

  const navigateTo = (path: string) => {
    if (typeof window !== 'undefined') {
      window.location.hash = path;
    }
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace(/^#/, '');
      setCurrentPath(hash || '/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Data State with LocalStorage persistence where available
  const [sources, setSources] = useState<Source[]>(() => {
    if (typeof window !== 'undefined') {
      const cached = localStorage.getItem('cs_sources');
      if (cached) {
        try {
          return JSON.parse(cached);
        } catch {
          // fallback
        }
      }
    }
    return INITIAL_SOURCES;
  });

  const [stacks, setStacks] = useState<Stack[]>(() => {
    if (typeof window !== 'undefined') {
      const cached = localStorage.getItem('cs_stacks');
      if (cached) {
        try {
          return JSON.parse(cached);
        } catch {
          // fallback
        }
      }
    }
    return INITIAL_STACKS;
  });

  const [discussions, setDiscussions] = useState<Discussion[]>(() => {
    if (typeof window !== 'undefined') {
      const cached = localStorage.getItem('cs_discussions');
      if (cached) {
        try {
          return JSON.parse(cached);
        } catch {
          // fallback
        }
      }
    }
    return INITIAL_DISCUSSIONS;
  });

  const [users] = useState<UserProfile[]>(INITIAL_USERS);

  // Authenticated user: default to Bruno Salvatella
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('cs_user');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          const found = INITIAL_USERS.find((u) => u.username === parsed.username);
          return found || parsed;
        } catch {
          // fallback
        }
      }
    }
    return INITIAL_USERS[0]; // Bruno Salvatella
  });

  const [submissions, setSubmissions] = useState<SourceSubmission[]>([]);

  // Modals
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchInitialQuery, setSearchInitialQuery] = useState('');
  const [isAddToStackOpen, setIsAddToStackOpen] = useState(false);
  const [sourceForStack, setSourceForStack] = useState<Source | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3200);
  };

  const updateProfile = (updated: Partial<UserProfile>) => {
    if (!currentUser) return;
    const newProfile: UserProfile = {
      ...currentUser,
      ...updated
    };
    setCurrentUser(newProfile);
    // Also update in users list if present
    const idx = users.findIndex((u) => u.username === currentUser.username);
    if (idx !== -1) {
      users[idx] = newProfile;
    }
    if (typeof window !== 'undefined') {
      localStorage.setItem('cs_user', JSON.stringify(newProfile));
    }
    showToast('Your profile has been updated');
    setIsEditProfileModalOpen(false);
  };

  // Keyboard shortcut for ⌘K search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen]);

  // Persist helpers
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cs_stacks', JSON.stringify(stacks));
    }
  }, [stacks]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cs_discussions', JSON.stringify(discussions));
    }
  }, [discussions]);

  useEffect(() => {
    if (typeof window !== 'undefined' && currentUser) {
      localStorage.setItem('cs_user', JSON.stringify(currentUser));
    }
  }, [currentUser]);

  // Actions
  const switchUser = (username: string) => {
    const found = users.find((u) => u.username === username);
    if (found) {
      setCurrentUser(found);
      showToast(`Switched account to @${found.username}`);
    }
  };

  const logout = () => {
    setCurrentUser(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('cs_user');
    }
    showToast('Signed out of CyberSources');
  };

  const isSourceSaved = (slug: string) => {
    if (!currentUser) return false;
    return currentUser.saved_sources.includes(slug);
  };

  const saveSource = (slug: string) => {
    if (!currentUser) {
      setIsAuthModalOpen(true);
      return;
    }
    if (!currentUser.saved_sources.includes(slug)) {
      const updated = {
        ...currentUser,
        saved_sources: [...currentUser.saved_sources, slug]
      };
      setCurrentUser(updated);
      showToast(`Saved SOURCE to your profile`);
    }
  };

  const unsaveSource = (slug: string) => {
    if (!currentUser) return;
    const updated = {
      ...currentUser,
      saved_sources: currentUser.saved_sources.filter((s) => s !== slug)
    };
    setCurrentUser(updated);
    showToast(`Removed from saved sources`);
  };

  const createStack = (newStackData: Omit<Stack, 'id' | 'created_at' | 'updated_at'>) => {
    const id = `stack-${Date.now()}`;
    const today = new Date().toISOString().split('T')[0];
    const newStack: Stack = {
      ...newStackData,
      id,
      created_at: today,
      updated_at: today
    };

    setStacks((prev) => [newStack, ...prev]);
    showToast(`Stack "${newStack.name}" created`);
    return newStack;
  };

  const addSourceToStack = (stackId: string, sourceSlug: string, notes?: string) => {
    setStacks((prev) =>
      prev.map((stk) => {
        if (stk.id === stackId) {
          const exists = stk.sources.some((s) => s.source_slug === sourceSlug);
          if (exists) {
            return {
              ...stk,
              sources: stk.sources.map((s) =>
                s.source_slug === sourceSlug ? { ...s, notes: notes || s.notes } : s
              ),
              updated_at: new Date().toISOString().split('T')[0]
            };
          }
          return {
            ...stk,
            sources: [
              ...stk.sources,
              {
                source_slug: sourceSlug,
                notes: notes || '',
                position: stk.sources.length + 1
              }
            ],
            updated_at: new Date().toISOString().split('T')[0]
          };
        }
        return stk;
      })
    );
    showToast(`Added to stack`);
    setIsAddToStackOpen(false);
  };

  const removeSourceFromStack = (stackId: string, sourceSlug: string) => {
    setStacks((prev) =>
      prev.map((stk) => {
        if (stk.id === stackId) {
          return {
            ...stk,
            sources: stk.sources.filter((s) => s.source_slug !== sourceSlug),
            updated_at: new Date().toISOString().split('T')[0]
          };
        }
        return stk;
      })
    );
    showToast(`Removed source from stack`);
  };

  const createDiscussion = (newDisc: {
    title: string;
    body: string;
    type: Discussion['type'];
    category: CategoryName;
    source_slug?: string;
    stack_slug?: string;
  }) => {
    const id = `disc-${Date.now()}`;
    const slug = newDisc.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    const today = new Date().toISOString().split('T')[0];

    const author = currentUser
      ? {
          username: currentUser.username,
          display_name: currentUser.display_name,
          role: currentUser.role,
          avatar_url: currentUser.avatar_url
        }
      : {
          username: 'anonymous',
          display_name: 'Security Researcher',
          role: 'Researcher'
        };

    const created: Discussion = {
      id,
      slug: slug || `discussion-${Date.now()}`,
      title: newDisc.title,
      body: newDisc.body,
      type: newDisc.type,
      category: newDisc.category,
      source_slug: newDisc.source_slug,
      stack_slug: newDisc.stack_slug,
      user: author,
      upvotes: 1,
      upvoted_by: currentUser ? [currentUser.username] : [],
      replies_count: 0,
      replies: [],
      created_at: today
    };

    setDiscussions((prev) => [created, ...prev]);
    showToast(`Discussion published`);
    return created;
  };

  const addReplyToDiscussion = (discussionId: string, body: string) => {
    if (!currentUser) {
      setIsAuthModalOpen(true);
      return;
    }
    const today = new Date().toISOString().split('T')[0];
    const reply = {
      id: `rep-${Date.now()}`,
      user: {
        username: currentUser.username,
        display_name: currentUser.display_name,
        role: currentUser.role,
        avatar_url: currentUser.avatar_url
      },
      body,
      created_at: today
    };

    setDiscussions((prev) =>
      prev.map((d) => {
        if (d.id === discussionId) {
          return {
            ...d,
            replies_count: d.replies_count + 1,
            replies: [...d.replies, reply]
          };
        }
        return d;
      })
    );
    showToast(`Reply posted`);
  };

  const toggleUpvoteDiscussion = (discussionId: string) => {
    if (!currentUser) {
      setIsAuthModalOpen(true);
      return;
    }
    setDiscussions((prev) =>
      prev.map((d) => {
        if (d.id === discussionId) {
          const hasUpvoted = d.upvoted_by.includes(currentUser.username);
          if (hasUpvoted) {
            return {
              ...d,
              upvotes: Math.max(0, d.upvotes - 1),
              upvoted_by: d.upvoted_by.filter((u) => u !== currentUser.username)
            };
          } else {
            return {
              ...d,
              upvotes: d.upvotes + 1,
              upvoted_by: [...d.upvoted_by, currentUser.username]
            };
          }
        }
        return d;
      })
    );
  };

  const submitSource = (sub: Omit<SourceSubmission, 'id' | 'status' | 'created_at'>) => {
    const newSub: SourceSubmission = {
      ...sub,
      id: `sub-${Date.now()}`,
      status: 'Pending Review',
      created_at: new Date().toISOString().split('T')[0]
    };
    setSubmissions((prev) => [newSub, ...prev]);
    showToast(`Source submitted for catalog review`);
  };

  const openAddToStack = (source: Source) => {
    if (!currentUser) {
      setIsAuthModalOpen(true);
      return;
    }
    setSourceForStack(source);
    setIsAddToStackOpen(true);
  };

  return (
    <AppContext.Provider
      value={{
        currentPath,
        navigateTo,
        theme,
        toggleTheme,
        sources,
        stacks,
        discussions,
        users,
        submissions,
        currentUser,
        setCurrentUser,
        isAuthenticated: !!currentUser,
        switchUser,
        logout,
        updateProfile,
        isEditProfileModalOpen,
        setIsEditProfileModalOpen,
        isSubscribedNewsletter,
        subscribeNewsletter,
        saveSource,
        unsaveSource,
        isSourceSaved,
        createStack,
        addSourceToStack,
        removeSourceFromStack,
        createDiscussion,
        addReplyToDiscussion,
        toggleUpvoteDiscussion,
        submitSource,
        isSearchOpen,
        setIsSearchOpen,
        searchInitialQuery,
        setSearchInitialQuery,
        isAddToStackOpen,
        setIsAddToStackOpen,
        sourceForStack,
        openAddToStack,
        isAuthModalOpen,
        setIsAuthModalOpen,
        toastMessage,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
