import React from 'react';
import { useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CompareTray } from './components/CompareTray';
import { Toast } from './components/Toast';
import { SvgSymbols } from './components/Icons';

// Pages
import { HomePage } from './pages/HomePage';
import { ListingsPage } from './pages/ListingsPage';
import { AdDetailPage } from './pages/AdDetailPage';
import { AddAdPage } from './pages/AddAdPage';
import { BreedersPage } from './pages/BreedersPage';
import { PricesPage } from './pages/PricesPage';
import { CalculatorPage } from './pages/CalculatorPage';
import { ChecklistPage } from './pages/ChecklistPage';
import { ComparePage } from './pages/ComparePage';
import { GuidePage } from './pages/GuidePage';
import { ArticlesPage } from './pages/ArticlesPage';
import { OccasionsPage } from './pages/OccasionsPage';
import { ServicesPage } from './pages/ServicesPage';
import { FaqPage } from './pages/FaqPage';
import { ContactPage } from './pages/ContactPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { HowPage } from './pages/HowPage';
import { TermsPage } from './pages/TermsPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { AdminPage } from './pages/AdminPage';

export const AppContent: React.FC = () => {
  const { page, isAdmin, navigate } = useApp();

  const renderPage = () => {
    switch (page) {
      case 'home':
        return <HomePage />;
      case 'listings':
        return <ListingsPage />;
      case 'ad':
        return <AdDetailPage />;
      case 'add-ad':
        return <AddAdPage />;
      case 'breeders':
        return <BreedersPage />;
      case 'prices':
        return <PricesPage />;
      case 'calculator':
        return <CalculatorPage />;
      case 'checklist':
        return <ChecklistPage />;
      case 'compare':
        return <ComparePage />;
      case 'guide':
        return <GuidePage />;
      case 'articles':
        return <ArticlesPage />;
      case 'occasions':
        return <OccasionsPage />;
      case 'services':
        return <ServicesPage />;
      case 'faq':
        return <FaqPage />;
      case 'contact':
        return <ContactPage />;
      case 'favorites':
        return <FavoritesPage />;
      case 'how':
        return <HowPage />;
      case 'terms':
        return <TermsPage />;
      case 'privacy':
        return <PrivacyPage />;
      case 'admin':
        return <AdminPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f7f1] dark:bg-[#0b1611] text-[#12281e] dark:text-[#e8f0ea] font-['IBM_Plex_Sans_Arabic',sans-serif] selection:bg-[#0f4a36] selection:text-white transition-colors duration-200">
      {/* SVG symbols definitions */}
      <SvgSymbols />

      {/* Floating Admin Mode Quick Action bar if logged in and not on admin page */}
      {isAdmin && page !== 'admin' && (
        <div className="bg-[#0a3123] text-emerald-100 text-xs py-1.5 px-4 border-b border-emerald-700/50 flex items-center justify-between sticky top-0 z-50 shadow-md">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-bold">أنت تتصفح الموقع بصفة مسؤول النظام (Admin Mode)</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate('admin')}
              className="bg-[#58d39a] hover:bg-emerald-400 text-[#0a3123] px-3 py-1 rounded-full text-xs font-black transition-colors cursor-pointer"
            >
              فتح لوحة التحكم الشاملة ←
            </button>
          </div>
        </div>
      )}

      {/* Header and Navigation */}
      <Header />

      {/* Page Content */}
      <main className="flex-1 pb-16">{renderPage()}</main>

      {/* Floating Compare Tray if items selected */}
      <CompareTray />

      {/* Global Toast Notification */}
      <Toast />

      {/* Footer */}
      <Footer />
    </div>
  );
};
