import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { AddToStackModal } from './components/AddToStackModal';
import { AuthModal } from './components/AuthModal';
import { EditProfileModal } from './components/EditProfileModal';

import { HomePage } from './pages/HomePage';
import { SourcesPage } from './pages/SourcesPage';
import { ResourcesPage } from './pages/ResourcesPage';
import { SourceDetailPage } from './pages/SourceDetailPage';
import { StacksPage } from './pages/StacksPage';
import { StackDetailPage } from './pages/StackDetailPage';
import { StackComparePage } from './pages/StackComparePage';
import { DiscussPage } from './pages/DiscussPage';
import { DiscussionDetailPage } from './pages/DiscussionDetailPage';
import { ProfilePage } from './pages/ProfilePage';
import { DashboardPage } from './pages/DashboardPage';
import { SubmitPage } from './pages/SubmitPage';
import { SearchPage } from './pages/SearchPage';
import { Check, Info } from 'lucide-react';

const RouterView: React.FC = () => {
  const { currentPath } = useApp();
  const cleanPath = currentPath.split('?')[0].replace(/\/$/, '') || '/';

  // Detail routes
  if (cleanPath === '/stacks/compare') {
    return <StackComparePage />;
  }

  if (cleanPath.startsWith('/sources/')) {
    const slug = cleanPath.replace('/sources/', '');
    return <SourceDetailPage slug={slug} />;
  }

  if (cleanPath.startsWith('/stacks/')) {
    const slug = cleanPath.replace('/stacks/', '');
    return <StackDetailPage slug={slug} />;
  }

  if (cleanPath.startsWith('/discuss/')) {
    const slug = cleanPath.replace('/discuss/', '');
    return <DiscussionDetailPage slug={slug} />;
  }

  if (cleanPath.startsWith('/profile/')) {
    const username = cleanPath.replace('/profile/', '');
    return <ProfilePage username={username} />;
  }

  // Primary section routes
  if (cleanPath === '/sources' || cleanPath.startsWith('/categories/')) {
    return <SourcesPage />;
  }

  if (cleanPath === '/resources') {
    return <ResourcesPage />;
  }

  if (cleanPath === '/stacks') {
    return <StacksPage />;
  }

  if (cleanPath === '/discuss') {
    return <DiscussPage />;
  }

  if (cleanPath === '/search') {
    return <SearchPage />;
  }

  if (cleanPath === '/submit') {
    return <SubmitPage />;
  }

  if (cleanPath === '/dashboard') {
    return <DashboardPage />;
  }

  return <HomePage />;
};

const ToastNotification: React.FC = () => {
  const { toastMessage } = useApp();
  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-2 fade-in duration-200">
      <div className="flex items-center gap-2.5 px-4 py-3 bg-[#191B22] dark:bg-[#1C1F28] text-white rounded-lg shadow-xl border border-[#2B2F3D] text-xs font-mono">
        <span className="w-2 h-2 rounded-full bg-[#7C3AED]" />
        <span>{toastMessage}</span>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <div className="min-h-screen flex flex-col bg-[#E7E5DE] dark:bg-[#161822] text-[#12141A] dark:text-[#F0F2F6] transition-colors">
        <Navbar />
        <main className="flex-1">
          <RouterView />
        </main>
        <Footer />

        {/* Global Modals & Overlays */}
        <SearchModal />
        <AddToStackModal />
        <AuthModal />
        <EditProfileModal />
        <ToastNotification />
      </div>
    </AppProvider>
  );
}
