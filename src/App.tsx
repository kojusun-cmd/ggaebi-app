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
  const [scrollThumbTop, setScrollThumbTop] = useState(0);
  const [scrollThumbHeight, setScrollThumbHeight] = useState(44);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollFadeTimerRef = useRef<number | null>(null);

  // Auth States
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('ggaebi_isLoggedIn') === 'true';
  });
  const [showAuthSheet, setShowAuthSheet] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      localStorage.setItem('ggaebi_isLoggedIn', 'true');
    } else {
      localStorage.removeItem('ggaebi_isLoggedIn');
    }
  }, [isLoggedIn]);

  useEffect(() => {
    // 최초 구동 시 메인 히스토리 주입 (가짜)
    if (!window.history.state || !window.history.state.page) {
      window.history.replaceState({ page: 'home', history: ['home'], item: null }, '');
    }

    const handlePopState = (e: PopStateEvent) => {
      // 팝업들은 usePopupHistory 훅에서 자체적으로 닫히므로, 
      // 앱 라우터는 안전하게 e.state.page만 보고 페이지를 전환하면 됨.
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

  const updateScrollIndicator = () => {
    setIsScrolling(true);
    if (scrollFadeTimerRef.current) {
      window.clearTimeout(scrollFadeTimerRef.current);
    }
    scrollFadeTimerRef.current = window.setTimeout(() => {
      setIsScrolling(false);
    }, 700);

    const el = appWrapperRef.current;
    if (!el) return;

    const { scrollTop, scrollHeight, clientHeight } = el;
    const trackHeight = Math.max(clientHeight - 28, 80);
    const hasOverflow = scrollHeight > clientHeight + 1;
    setShowScrollIndicator(true);
    if (!hasOverflow) {
      setScrollThumbHeight(trackHeight);
      setScrollThumbTop(0);
      return;
    }

    const thumbHeight = Math.max((clientHeight / scrollHeight) * trackHeight, 36);
    const maxScroll = Math.max(scrollHeight - clientHeight, 1);
    const maxThumbTop = Math.max(trackHeight - thumbHeight, 0);
    const thumbTop = (scrollTop / maxScroll) * maxThumbTop;

    setScrollThumbHeight(thumbHeight);
    setScrollThumbTop(thumbTop);
  };

  useEffect(() => {
    const timer = setTimeout(updateScrollIndicator, 0);
    const delayedTimer = setTimeout(updateScrollIndicator, 450);
    const lateTimer = setTimeout(updateScrollIndicator, 1200);
    window.addEventListener('resize', updateScrollIndicator);
    const el = appWrapperRef.current;
    const observer = el ? new ResizeObserver(() => updateScrollIndicator()) : null;
    if (el && observer) observer.observe(el);
    return () => {
      clearTimeout(timer);
      clearTimeout(delayedTimer);
      clearTimeout(lateTimer);
      window.removeEventListener('resize', updateScrollIndicator);
      observer?.disconnect();
      if (scrollFadeTimerRef.current) {
        window.clearTimeout(scrollFadeTimerRef.current);
      }
    };
  }, [currentPage]);

  const handleNavigate = (page: string, item?: any) => {
    // 보호된 페이지 목록 - 로그인 필요 (user는 자체적으로 로그인 UI를 보여주므로 제외)
    const protectedPages = ['bidding', 'registration', 'chat', 'notifications', 'won_history', 'sales_history', 'wallet', 'payment_methods', 'checkout', 'profile_edit'];
    
    if (protectedPages.includes(page) && !isLoggedIn) {
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
        // 팝업이 띄워진 상태에서 페이지 이동을 요청한 경우 (팝업 히스토리를 덮어씌움)
        if (window.history.state?.popup) {
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
    <>
      <div className="app-wrapper" ref={appWrapperRef} onScroll={updateScrollIndicator}>
        {showScrollIndicator && (
          <div
            className={`app-scroll-indicator-track ${currentPage === 'home' ? 'home-page' : ''} ${isScrolling ? 'is-scrolling' : ''}`}
            aria-hidden="true"
          >
            <div
              className="app-scroll-indicator-thumb"
              style={{
                height: `${scrollThumbHeight}px`,
                transform: `translateY(${scrollThumbTop}px)`,
              }}
            />
          </div>
        )}
        {currentPage === 'home' && <MainPage onNavigate={handleNavigate} appWrapperRef={appWrapperRef} />}
        {currentPage === 'search' && <SearchPage onNavigate={handleNavigate} onBack={handleBack} />}
        {currentPage === 'registration' && <ProductRegistrationPage onBack={handleBack} onComplete={() => handleNavigate('home')} />}
        {currentPage === 'detail' && <DetailPage item={selectedItem} onBack={handleBack} />}
        {currentPage === 'wishlist' && <WishlistPage onNavigate={handleNavigate} onBack={handleBack} />}
        {currentPage === 'bidding' && <BiddingPage onNavigate={handleNavigate} onBack={handleBack} initialTab={selectedItem?.tab} />}
        {currentPage === 'chat' && <ChatListPage onNavigate={handleNavigate} onBack={handleBack} />}
        {currentPage === 'user' && <UserPage onNavigate={handleNavigate} onBack={handleBack} isLoggedIn={isLoggedIn} onLogin={() => setIsLoggedIn(true)} />}
        {currentPage === 'settings' && <SettingsPage onBack={handleBack} onNavigate={handleNavigate} onLogout={() => { setIsLoggedIn(false); handleNavigate('home'); }} />}
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
      </div>

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
    </>
  );
}

export default App;
