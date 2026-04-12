import { useState, useRef, useEffect } from 'react';

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
  const showAuthSheetRef = useRef(showAuthSheet);

  useEffect(() => {
    showAuthSheetRef.current = showAuthSheet;
  }, [showAuthSheet]);

  const closeAuthSheet = () => {
    if (window.history.state?.sheet === 'auth') {
      window.history.back();
    } else {
      setShowAuthSheet(false);
    }
  };

  useEffect(() => {
    window.history.replaceState({ page: 'home', history: ['home'], item: null }, '');

    const handlePopState = (e: PopStateEvent) => {
      if (showAuthSheetRef.current) {
        setShowAuthSheet(false);
        return; // 바텀시트만 닫고 페이지 전환이나 스크롤 변경은 하지 않음
      }

      if (e.state && e.state.page) {
        const nextTarget = e.state.page;
        const newHistory = e.state.history || ['home'];
        
        setHistory(newHistory);
        setCurrentPage(nextTarget);
        if (e.state.item !== undefined) {
          setSelectedItem(e.state.item);
        }

        setTimeout(() => {
          if (appWrapperRef.current) {
            appWrapperRef.current.scrollTop = scrollPositions.current[nextTarget] || 0;
          }
        }, 0);
      } else {
        setCurrentPage('home');
        setHistory(['home']);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = (page: string, item?: any) => {
    // 보호된 페이지 목록 - 로그인 필요
    const protectedPages = ['bidding', 'registration', 'chat', 'notifications', 'user', 'won_history', 'sales_history', 'wallet', 'payment_methods', 'checkout', 'profile_edit'];
    
    if (protectedPages.includes(page) && !isLoggedIn) {
      window.history.pushState({ ...window.history.state, sheet: 'auth' }, '');
      setShowAuthSheet(true);
      return; 
    }

    if (appWrapperRef.current) {
      scrollPositions.current[currentPage] = appWrapperRef.current.scrollTop;
    }
    
    const finalItem = item !== undefined ? item : selectedItem;
    if (item !== undefined) setSelectedItem(item);
    
    setHistory(prev => {
        const newHistory = [...prev, page];
        if (window.history.state?.sheet === 'auth') {
          window.history.replaceState({ page, history: newHistory, item: finalItem }, '');
        } else {
          window.history.pushState({ page, history: newHistory, item: finalItem }, '');
        }
        return newHistory;
    });

    setShowAuthSheet(false);
    setCurrentPage(page);
    setTimeout(() => {
      if (appWrapperRef.current) appWrapperRef.current.scrollTop = 0;
    }, 0);
  };

  const handleBack = () => {
    window.history.back();
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
        onClose={closeAuthSheet}
        onLogin={() => {
          setIsLoggedIn(true);
          closeAuthSheet();
          alert('로그인되었습니다!\n(현재는 데모 상태입니다)');
        }}
        onEmailLogin={() => {
          closeAuthSheet();
          setTimeout(() => handleNavigate('email_login'), 0);
        }}
        onEmailSignup={() => {
          closeAuthSheet();
          setTimeout(() => handleNavigate('email_signup'), 0);
        }}
      />
    </div>
  );
}

export default App;
