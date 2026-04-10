import { useState } from "react";
import { ChevronLeft, Bell, Settings, Award, ChevronRight, ShieldAlert, Wallet, Clock, Heart, CreditCard, Home, Gavel, Plus, MessageCircle, User, Lock, MapPin } from "lucide-react";
import { AuthBottomSheet } from "../components/AuthBottomSheet";

export function UserPage({ onNavigate, onBack }: { onNavigate: (page: string, item?: any) => void, onBack: () => void }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showAuth, setShowAuth] = useState(false);

    const handleLogin = () => {
        setIsLoggedIn(true);
        setShowAuth(false);
    };

    return (
    <>
      <header className="top-header" style={{ backgroundColor: '#fff', zIndex: 50, borderBottom: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div onClick={onBack} style={{ cursor: 'pointer', paddingRight: '8px' }}>
            <ChevronLeft size={28} color="#2E343E" />
          </div>
          <h1 className="header-title" style={{ fontSize: '20px', margin: 0 }}>내 정보</h1>
        </div>
        <div style={{ display: 'flex', gap: '16px', color: '#1E293B' }}>
          <Bell size={24} onClick={() => onNavigate('notifications')} style={{ cursor: 'pointer' }} />
          <Settings size={24} onClick={() => onNavigate('settings')} style={{ cursor: 'pointer' }} />
        </div>
      </header>
      
      {/* 바디 */}
      <div className="content-area" style={{ paddingTop: '64px', paddingBottom: '100px', background: '#F8FAFC', minHeight: '100vh', position: 'relative' }}>
        
        {!isLoggedIn && (
           <div style={{ position: 'absolute', inset: 0, zIndex: 10, backdropFilter: 'blur(8px)', background: 'rgba(248, 250, 252, 0.7)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
              <div style={{ background: '#fff', padding: '32px 24px', borderRadius: '24px', textAlign: 'center', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', maxWidth: '320px', width: '100%' }}>
                 <div style={{ width: '64px', height: '64px', background: '#F1F5F9', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                    <Lock size={32} color="#94A3B8" />
                 </div>
                 <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1E293B', marginBottom: '8px' }}>나만의 꿀매물 비서를 깨워보세요</h2>
                 <p style={{ fontSize: '14px', color: '#64748B', marginBottom: '24px', lineHeight: 1.5 }}>
                   로그인하고 한눈에 나의 입찰 현황을 <br/>빠르게 관리하세요!
                 </p>
                 <button 
                   onClick={() => setShowAuth(true)}
                   style={{ width: '100%', padding: '16px', borderRadius: '14px', background: 'linear-gradient(135deg, #35D8E6 0%, #10B981 100%)', color: '#fff', border: 'none', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', boxShadow: '0 4px 12px rgba(53, 216, 230, 0.3)' }}
                 >
                   ✨ 나의 꿀매물 비서 깨우기 (로그인/가입)
                 </button>
              </div>
           </div>
        )}

        {/* Blur Wrapper */}
        <div style={{ filter: !isLoggedIn ? 'blur(5px)' : 'none', transition: 'filter 0.3s', pointerEvents: !isLoggedIn ? 'none' : 'auto' }}>
        
        {/* 1. 프로필 & 온도 & 삼진아웃 대시보드 */}
        <section style={{ background: '#fff', padding: '24px 20px', borderBottomLeftRadius: '24px', borderBottomRightRadius: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
          <div 
            onClick={() => onNavigate('profile_edit')}
            style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '8px', cursor: 'pointer', padding: '12px', margin: '-12px -12px 16px -12px', borderRadius: '20px', transition: 'background 0.2s', background: 'transparent' }}
            onMouseDown={(e) => e.currentTarget.style.background = '#F8FAFC'}
            onMouseUp={(e) => e.currentTarget.style.background = 'transparent'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
          >
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#F1F5F9', border: '2px solid #35D8E6', overflow: 'hidden' }}>
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1E293B', margin: 0 }}>도깨비검객</h2>
                <span style={{ fontSize: '11px', background: '#F1F5F9', color: '#64748B', padding: '2px 8px', borderRadius: '12px', fontWeight: 'bold' }}>상위 5%</span>
              </div>
              <div style={{ fontSize: '14px', color: '#64748B', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Award size={16} color="#35D8E6" />
                <span style={{ fontWeight: '500' }}>정확한 스나이퍼 (성공률 87%)</span>
              </div>
            </div>
            <div style={{ cursor: 'pointer' }}>
              <ChevronRight size={24} color="#CBD5E1" />
            </div>
          </div>

          <div style={{ padding: '16px', borderRadius: '16px', background: '#F8FAFC', border: '1px solid #F1F5F9' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#1E293B', display: 'flex', alignItems: 'center', gap: '6px' }}>
                🔥 깨비불 신뢰도
              </div>
              <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#FF4E50' }}>85°C</div>
            </div>
            {/* ProgressBar */}
            <div style={{ height: '8px', background: '#E2E8F0', borderRadius: '4px', overflow: 'hidden', marginBottom: '16px' }}>
              <div style={{ height: '100%', width: '85%', background: 'linear-gradient(90deg, #35D8E6 0%, #FF4E50 100%)', borderRadius: '4px' }} />
            </div>

            {/* 삼진아웃 구역 */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#FEF2F2', padding: '12px', borderRadius: '12px', border: '1px solid #FECACA', cursor: 'pointer' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShieldAlert size={18} color="#DC2626" />
                <span style={{ fontSize: '13px', color: '#991B1B', fontWeight: 'bold' }}>삼진아웃 낙찰 파기 경고</span>
              </div>
              <div style={{ display: 'flex', gap: '4px' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#DC2626' }} />
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#FCA5A5' }} />
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#FCA5A5' }} />
              </div>
            </div>
          </div>
        </section>

        {/* 2. 나의 경매 요약 */}
        <section style={{ margin: '24px 20px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '16px', color: '#1E293B' }}>나의 경매 활동</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div style={{ background: '#fff', borderRadius: '16px', padding: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.03)', cursor: 'pointer' }} onClick={() => onNavigate('bidding')}>
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>📡</div>
              <div style={{ fontSize: '12px', color: '#64748B', marginBottom: '4px', fontWeight: '500' }}>위태위태한</div>
              <div style={{ fontSize: '15px', fontWeight: 'bold', color: '#1E293B', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                입찰 진행 중 <span style={{ color: '#35D8E6', fontSize: '16px' }}>3건</span>
              </div>
            </div>
            <div style={{ background: '#fff', borderRadius: '16px', padding: '16px', boxShadow: '0 4px 12px rgba(239, 68, 68, 0.15)', border: '1px solid #FECACA', cursor: 'pointer' }} onClick={() => onNavigate('bidding')}>
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>⏰</div>
              <div style={{ fontSize: '12px', color: '#DC2626', marginBottom: '4px', fontWeight: 'bold' }}>스피드 결제 필요!</div>
              <div style={{ fontSize: '15px', fontWeight: 'bold', color: '#1E293B', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                결제 대기 중 <span style={{ color: '#EF4444', fontSize: '16px' }}>1건</span>
              </div>
            </div>
            <div style={{ background: '#fff', borderRadius: '16px', padding: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.03)', cursor: 'pointer' }}>
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>🛒</div>
              <div style={{ fontSize: '12px', color: '#64748B', marginBottom: '4px', fontWeight: '500' }}>내가 쟁취한</div>
              <div style={{ fontSize: '15px', fontWeight: 'bold', color: '#1E293B', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                낙찰 완료 <span style={{ color: '#10B981', fontSize: '16px' }}>12건</span>
              </div>
            </div>
            <div style={{ background: '#fff', borderRadius: '16px', padding: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.03)', cursor: 'pointer' }}>
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>📦</div>
              <div style={{ fontSize: '12px', color: '#64748B', marginBottom: '4px', fontWeight: '500' }}>최고가 갱신중</div>
              <div style={{ fontSize: '15px', fontWeight: 'bold', color: '#1E293B', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                나의 판매 <span style={{ color: '#F59E0B', fontSize: '16px' }}>2건</span>
              </div>
            </div>
          </div>
        </section>

        {/* 3. 깨비페이 (지갑) */}
        <section style={{ margin: '24px 20px', background: '#2E343E', borderRadius: '20px', padding: '24px', color: '#fff', boxShadow: '0 8px 16px rgba(46,52,62,0.15)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '16px', fontWeight: 'bold' }}>
              <Wallet size={20} color="#35D8E6" />
              깨비머니 <span style={{ fontSize: '11px', background: 'rgba(255,255,255,0.15)', padding: '4px 8px', borderRadius: '12px', fontWeight: 'bold', marginLeft: '4px' }}>빠른결제 전용</span>
            </div>
            <ChevronRight size={20} color="#94A3B8" style={{ cursor: 'pointer' }} />
          </div>
          <div style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '24px', letterSpacing: '-0.5px' }}>
            1,250,000 <span style={{ fontSize: '18px', fontWeight: 'normal', color: '#94A3B8' }}>원</span>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button style={{ flex: 1, padding: '14px', borderRadius: '14px', background: '#35D8E6', color: '#fff', border: 'none', fontWeight: 'bold', fontSize: '15px', cursor: 'pointer', boxShadow: '0 4px 10px rgba(53, 216, 230, 0.3)' }}>충전하기</button>
            <button style={{ flex: 1, padding: '14px', borderRadius: '14px', background: 'rgba(255,255,255,0.1)', color: '#fff', border: 'none', fontWeight: 'bold', fontSize: '15px', cursor: 'pointer' }}>카드 관리</button>
          </div>
        </section>

        {/* 4. 리스트 메뉴 */}
        <section style={{ margin: '0 20px', background: '#fff', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
          {[
            { icon: <MapPin size={20} color="#64748B" />, title: '내 동네 설정 관리' },
            { icon: <Clock size={20} color="#64748B" />, title: '나의 거래 내역 전체보기' },
            { icon: <Heart size={20} color="#64748B" />, title: '찜한 상품 내역' },
            { icon: <ShieldAlert size={20} color="#64748B" />, title: '패널티 이의 제기 현황', badge: '1건 진행중' },
            { icon: <CreditCard size={20} color="#64748B" />, title: '자동 결제 수단 관리' },
            { icon: <Settings size={20} color="#64748B" />, title: '단골/키워드 알림 관리' },
          ].map((menu, idx) => (
            <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 20px', borderBottom: idx !== 5 ? '1px solid #F1F5F9' : 'none', cursor: 'pointer' }} onClick={() => menu.title.includes('찜한') && onNavigate('wishlist')}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: '15px', color: '#1E293B', fontWeight: '500' }}>
                {menu.icon}
                {menu.title}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {menu.badge && (
                  <span style={{ fontSize: '12px', background: '#F1F5F9', color: '#64748B', padding: '4px 10px', borderRadius: '12px', fontWeight: 'bold' }}>{menu.badge}</span>
                )}
                <ChevronRight size={18} color="#CBD5E1" />
              </div>
            </div>
          ))}
        </section>
        </div> {/* End of Blur Wrapper */}
      </div>

      <nav className="bottom-nav">
        <div className="nav-item" style={{cursor: 'pointer', color: '#94A3B8'}} onClick={() => onNavigate('home')}><Home size={22} strokeWidth={2.5} /><span>홈</span></div>
        <div className="nav-item" style={{cursor: 'pointer', color: '#94A3B8'}} onClick={() => onNavigate('bidding')}><Gavel size={22} /><span>입찰내역</span></div>
        <div className="nav-fab" style={{ cursor: 'pointer', background: 'linear-gradient(135deg, #10B981 0%, #11F17E 100%)' }} onClick={() => onNavigate('registration')}>
          <Plus size={28} color="#fff" strokeWidth={3} />
        </div>
        <div className="nav-item" style={{cursor: 'pointer', color: '#94A3B8'}} onClick={() => onNavigate('chat')}>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <MessageCircle size={22} />
            <div style={{ position: 'absolute', top: '-6px', right: '-8px', background: '#EF4444', color: '#fff', fontSize: '10px', fontWeight: 'bold', width: '16px', height: '16px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #fff', boxShadow: '0 1px 3px rgba(239,68,68,0.3)' }}>1</div>
          </div>
          <span>채팅</span>
        </div>
        <div className="nav-item active" style={{cursor: 'pointer'}} ><User size={22} /><span>내 정보</span></div>
      </nav>

      <AuthBottomSheet 
        isOpen={showAuth} 
        onClose={() => setShowAuth(false)} 
        onLogin={handleLogin}
        onEmailLogin={() => {
            setShowAuth(false);
            onNavigate('email_login');
        }}
        onEmailSignup={() => {
            setShowAuth(false);
            onNavigate('email_signup');
        }}
      />
    </>
    );
}
