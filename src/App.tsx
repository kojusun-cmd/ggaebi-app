import { useState, useEffect, useRef, type MouseEvent } from 'react';
import {
  ChevronRight, ChevronLeft, ChevronUp, ChevronDown, Search, Bell, Home, Gavel, Heart, MessageCircle, User, MapPin, Trash2, ShieldAlert, Plus, Camera, Wand2, ImagePlus, Sparkles, CheckCircle, TrendingUp, Package
} from 'lucide-react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler);

import { FEED_ITEMS as RAW_FEED_ITEMS } from './data/mockProducts';
import { UserPage } from './pages/UserPage';
import { SettingsPage } from './pages/SettingsPage';
import { EmailSignupPage } from './pages/EmailSignupPage';
import { ProfileEditPage } from './pages/ProfileEditPage';
import { WonHistoryPage } from './pages/WonHistoryPage';
import { SalesHistoryPage } from './pages/SalesHistoryPage';
import { WalletPage } from './pages/WalletPage';
import { PaymentMethodPage } from './pages/PaymentMethodPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { DetailPage } from './pages/DetailPage';
import { CustomToggle } from './components/CustomToggle';
import { MainPage } from './pages/MainPage';
import { ProductRegistrationPage } from './pages/ProductRegistrationPage';
import { WishlistPage } from './pages/WishlistPage';
import { BiddingPage } from './pages/BiddingPage';
import { ChatListPage } from './pages/ChatListPage';
import { PenaltyGuidePage } from './pages/PenaltyGuidePage';
import { RestrictedItemGuidePage } from './pages/RestrictedItemGuidePage';
import { NotificationPage } from './pages/NotificationPage';
import { SearchPage } from './pages/SearchPage';
import { AuthBottomSheet } from './components/AuthBottomSheet';
import { EmailLoginPage } from './pages/EmailLoginPage';

/* --- 앱 최상단 라우터 역할 --- */
function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [, setHistory] = useState<string[]>(['home']);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const appWrapperRef = useRef<HTMLDivElement>(null);
  const scrollPositions = useRef<Record<string, number>>({});

  // Auth States
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAuthSheet, setShowAuthSheet] = useState(false);

  const handleNavigate = (page: string, item?: any) => {
    // 보호된 페이지 목록 - 로그인 필요
    const protectedPages = ['bidding', 'registration', 'chat', 'notifications', 'user', 'won_history', 'sales_history', 'wallet', 'payment_methods', 'checkout', 'profile_edit'];
    
    if (protectedPages.includes(page) && !isLoggedIn) {
      setShowAuthSheet(true);
      return; 
    }

    if (appWrapperRef.current) {
      scrollPositions.current[currentPage] = appWrapperRef.current.scrollTop;
    }
    
    if (item) setSelectedItem(item);
    setHistory(prev => [...prev, page]);
    setCurrentPage(page);
    setTimeout(() => {
      if (appWrapperRef.current) appWrapperRef.current.scrollTop = 0;
    }, 0);
  };

  const handleBack = () => {
    setHistory(prev => {
      let nextTarget = 'home';
      const sourcePage = prev[prev.length - 1];
      if (prev.length > 1) {
        const newHistory = prev.slice(0, -1);
        nextTarget = newHistory[newHistory.length - 1];
        setCurrentPage(nextTarget as any);
        setTimeout(() => {
          if (appWrapperRef.current) {
            if (nextTarget === 'home' && ['wishlist', 'bidding', 'chat', 'user'].includes(sourcePage)) {
              appWrapperRef.current.scrollTop = 0;
            } else {
              appWrapperRef.current.scrollTop = scrollPositions.current[nextTarget] || 0;
            }
          }
        }, 0);
        return newHistory;
      }
      setCurrentPage('home');
      setTimeout(() => {
        if (appWrapperRef.current) {
          if (['wishlist', 'bidding', 'chat', 'user'].includes(sourcePage)) {
            appWrapperRef.current.scrollTop = 0;
          } else {
            appWrapperRef.current.scrollTop = scrollPositions.current['home'] || 0;
          }
        }
      }, 0);
      return ['home'];
    });
  };

  return (
    <div className="app-wrapper" ref={appWrapperRef}>
      {currentPage === 'home' && <MainPage onNavigate={handleNavigate} appWrapperRef={appWrapperRef} />}
      {currentPage === 'search' && <SearchPage onNavigate={handleNavigate} onBack={handleBack} />}
      {currentPage === 'registration' && <ProductRegistrationPage onBack={handleBack} onComplete={() => handleNavigate('home')} />}
      {currentPage === 'detail' && <DetailPage item={selectedItem} onBack={handleBack} />}
      {currentPage === 'wishlist' && <WishlistPage onNavigate={handleNavigate} onBack={handleBack} />}
      {currentPage === 'bidding' && <BiddingPage onNavigate={handleNavigate} onBack={handleBack} initialTab={selectedItem?.tab} />}
      {currentPage === 'chat' && <ChatListPage onNavigate={handleNavigate} onBack={handleBack} />}
      {currentPage === 'user' && <UserPage onNavigate={handleNavigate} onBack={handleBack} />}
      {currentPage === 'settings' && <SettingsPage onBack={handleBack} onNavigate={handleNavigate} />}
      {currentPage === 'guide_penalty' && <PenaltyGuidePage onBack={handleBack} />}
      {currentPage === 'guide_restricted' && <RestrictedItemGuidePage onBack={handleBack} />}
      {currentPage === 'notifications' && <NotificationPage onBack={handleBack} />}
      {currentPage === 'email_login' && <EmailLoginPage onBack={handleBack} onComplete={() => { setIsLoggedIn(true); handleNavigate('home'); }} />}
      {currentPage === 'email_signup' && <EmailSignupPage onBack={handleBack} onComplete={() => { setIsLoggedIn(true); handleNavigate('home'); }} />}
      {currentPage === 'profile_edit' && <ProfileEditPage onBack={handleBack} onComplete={handleBack} />}
      {currentPage === 'won_history' && <WonHistoryPage onBack={handleBack} onNavigate={handleNavigate} />}
      {currentPage === 'sales_history' && <SalesHistoryPage onBack={handleBack} onNavigate={handleNavigate} />}
      {currentPage === 'wallet' && <WalletPage onBack={handleBack} />}
      {currentPage === 'payment_methods' && <PaymentMethodPage onBack={handleBack} onNavigate={handleNavigate} />}
      {currentPage === 'checkout' && <CheckoutPage onBack={handleBack} onNavigate={handleNavigate} item={selectedItem} />}

      {/* Auth Bottom Sheet */}
      <AuthBottomSheet 
        isOpen={showAuthSheet} 
        onClose={() => setShowAuthSheet(false)}
        onLogin={() => {
          setIsLoggedIn(true);
          setShowAuthSheet(false);
          alert('로그인되었습니다!\n(현재는 데모 상태입니다)');
        }}
        onEmailLogin={() => {
          setShowAuthSheet(false);
          handleNavigate('email_login');
        }}
        onEmailSignup={() => {
          setShowAuthSheet(false);
          handleNavigate('email_signup');
        }}
      />
    </div>
  );
}

export default App;
