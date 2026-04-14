import { useState } from "react";
import { usePopupHistory } from "../hooks/usePopupHistory";
import { ChevronLeft, Bell, Settings, Award, ChevronRight, ShieldAlert, Wallet, Clock, Heart, CreditCard, Home, Gavel, Plus, MessageCircle, User, Lock, MapPin } from "lucide-react";
import { AuthBottomSheet } from "../components/AuthBottomSheet";

export function UserPage({ onNavigate, onBack, isLoggedIn, onLogin }: { onNavigate: (page: string, item?: any) => void, onBack: () => void, isLoggedIn: boolean, onLogin: () => void }) {
    const [walletBalance, setWalletBalance] = useState(1250000);
    const [showRechargeSheet, setShowRechargeSheet] = useState(false);
    const [chargeAmount, setChargeAmount] = useState(0);
    const [showCoinDrop, setShowCoinDrop] = useState(false);
    const [unsettledAmount, setUnsettledAmount] = useState(150000);
    const [showSettlementSheet, setShowSettlementSheet] = useState(false);
    const [magicItems, setMagicItems] = useState(0);
    const [showRewardAlert, setShowRewardAlert] = useState(false);
    const [showPenaltySheet, setShowPenaltySheet] = useState(false);
    const penaltyCount = 2; // Mocked

    usePopupHistory(showRechargeSheet, () => setShowRechargeSheet(false), 'UserPage_Recharge');

    const handleChargeSubmit = () => {
        if (chargeAmount === 0) return;
        setShowRechargeSheet(false);
        setShowCoinDrop(true);
        setTimeout(() => {
            setWalletBalance(prev => prev + chargeAmount);
            setShowCoinDrop(false);
            setChargeAmount(0);
        }, 1500);
    };

    const handleSettlement = (type: 'bank' | 'kkaebi') => {
        setShowSettlementSheet(false);
        if (type === 'kkaebi') {
            setShowRewardAlert(true);
            setTimeout(() => {
                setWalletBalance(prev => prev + unsettledAmount);
                setMagicItems(prev => prev + 3);
                setUnsettledAmount(0);
                setShowRewardAlert(false);
            }, 2000);
        } else {
            setUnsettledAmount(0);
        }
    };

    return (
    <>
      <header className="top-header subpage" style={{ backgroundColor: '#fff', zIndex: 50, borderBottom: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
      <div className="content-area subpage" style={{ paddingTop: '64px', paddingBottom: '100px', background: '#F8FAFC', minHeight: '100vh', position: 'relative' }}>
        
        {!isLoggedIn ? (
          <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px', marginTop: '20px' }}>
            <div>
              <h2 style={{ fontSize: '26px', fontWeight: 'bold', color: '#1E293B', marginBottom: '8px', lineHeight: 1.4, letterSpacing: '-0.5px' }}>
                3초 만에 시작하고<br/>
                <span style={{ color: '#FF4E50' }}>꿀매물</span>을 낚아채세요!
              </h2>
              <p style={{ fontSize: '13px', color: '#64748B', marginTop: '12px', background: '#fff', padding: '16px', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
                🎁 지금 가입하면 <b>AI 시세분석 / 초정밀 핫템 알림 프리미엄권(30일)</b>이 즉시 발동됩니다!
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <button onClick={() => { onLogin(); alert('로그인 완료!'); }} style={{ width: '100%', padding: '16px', borderRadius: '14px', background: '#FEE500', color: '#191919', border: 'none', fontWeight: 'bold', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', cursor: 'pointer' }}>
                <img src="https://upload.wikimedia.org/wikipedia/commons/e/e3/KakaoTalk_logo.svg" alt="kakao" style={{ width: '20px', height: '20px' }} />
                카카오로 3초 만에 시작
              </button>
              <button onClick={() => { onLogin(); alert('로그인 완료!'); }} style={{ width: '100%', padding: '16px', borderRadius: '14px', background: '#03C75A', color: '#fff', border: 'none', fontWeight: 'bold', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', cursor: 'pointer' }}>
                <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.986 4.904v6.082l-4.577-6.082H4.407v10.188h4.015V8.995l4.582 6.097h4.002V4.904h-4.02z" fill="#fff"/>
                </svg>
                네이버로 시작
              </button>
              <button onClick={() => { onLogin(); alert('로그인 완료!'); }} style={{ width: '100%', padding: '16px', borderRadius: '14px', background: '#fff', color: '#1E293B', border: '1px solid #E2E8F0', fontWeight: 'bold', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', cursor: 'pointer', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                <svg width="20" height="20" viewBox="0 0 48 48">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.7 17.66 9.5 24 9.5z"/>
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                  <path fill="none" d="M0 0h48v48H0z"/>
                </svg>
                구글로 시작
              </button>
              <button onClick={() => { onLogin(); alert('로그인 완료!'); }} style={{ width: '100%', padding: '16px', borderRadius: '14px', background: '#000', color: '#fff', border: 'none', fontWeight: 'bold', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', cursor: 'pointer' }}>
                <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="apple" style={{ width: '20px', height: '20px', filter: 'invert(1)' }} />
                Apple로 시작
              </button>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '16px', gap: '16px' }}>
              <span onClick={() => onNavigate('email_login')} style={{ fontSize: '13px', color: '#64748B', cursor: 'pointer', textDecoration: 'underline' }}>이메일로 로그인</span>
              <div style={{ width: '1px', height: '12px', background: '#CBD5E1' }} />
              <span onClick={() => onNavigate('email_signup')} style={{ fontSize: '13px', color: '#64748B', cursor: 'pointer', textDecoration: 'underline' }}>이메일로 가입하기</span>
            </div>
          </div>
        ) : (
          <div style={{ transition: 'all 0.3s' }}>
        
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
              {magicItems > 0 && (
                <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '6px', background: '#F0FDF4', padding: '4px 8px', borderRadius: '8px', alignSelf: 'flex-start', width: 'fit-content' }}>
                   <div style={{ fontSize: '14px' }}>🎁</div>
                   <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#10B981' }}>내 아이템: 상단 노출권 {magicItems}장</div>
                </div>
              )}
            </div>
            <div style={{ cursor: 'pointer' }}>
              <ChevronRight size={20} color="#CBD5E1" />
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
            <div onClick={() => setShowPenaltySheet(true)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#FEF2F2', padding: '12px', borderRadius: '12px', border: '1px solid #FECACA', cursor: 'pointer' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShieldAlert size={18} color="#DC2626" />
                <span style={{ fontSize: '13px', color: '#991B1B', fontWeight: 'bold' }}>통합 페널티 경고 ({penaltyCount}/3)</span>
              </div>
              <div style={{ display: 'flex', gap: '4px' }}>
                {[1, 2, 3].map(step => (
                  <div key={step} style={{ width: '12px', height: '12px', borderRadius: '50%', background: step <= penaltyCount ? '#DC2626' : '#FCA5A5' }} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 2. 나의 경매 요약 */}
        <section style={{ margin: '24px 20px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '16px', color: '#1E293B' }}>나의 경매 활동</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            
            <div style={{ gridColumn: '1 / -1', background: '#fff', borderRadius: '16px', padding: '16px', boxShadow: '0 4px 12px rgba(53, 216, 230, 0.1)', border: '1px solid #F1F5F9', cursor: 'pointer' }} onClick={() => onNavigate('bidding')}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <div style={{ fontSize: '28px' }}>📡</div>
                  <div>
                    <div style={{ fontSize: '15px', fontWeight: 'bold', color: '#1E293B', marginBottom: '4px' }}>나의 입찰 내역</div>
                    <div style={{ fontSize: '13px', color: '#64748B' }}>진행 중 <b>3</b> · <span style={{color: '#EF4444'}}>결제 대기 <b>1</b></span></div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ background: '#FEF2F2', padding: '6px 10px', borderRadius: '10px', color: '#EF4444', fontSize: '12px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div style={{width: 6, height: 6, borderRadius: '50%', background: '#EF4444', animation: 'pulse 1.5s infinite'}}></div>
                    결제 요망
                  </div>
                  <ChevronRight size={20} color="#CBD5E1" />
                </div>
              </div>
            </div>

            <div style={{ background: '#fff', borderRadius: '16px', padding: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.03)', cursor: 'pointer' }} onClick={() => onNavigate('won_history')}>
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>🛒</div>
              <div style={{ fontSize: '12px', color: '#64748B', marginBottom: '4px', fontWeight: '500' }}>내가 쟁취한</div>
              <div style={{ fontSize: '15px', fontWeight: 'bold', color: '#1E293B', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                낙찰 완료 <span style={{ color: '#10B981', fontSize: '16px' }}>12건</span>
              </div>
            </div>
            
            <div style={{ background: '#fff', borderRadius: '16px', padding: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.03)', cursor: 'pointer' }} onClick={() => onNavigate('sales_history')}>
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
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }} onClick={() => onNavigate('wallet')} className="cursor-pointer">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '16px', fontWeight: 'bold' }}>
              <Wallet size={20} color="#35D8E6" />
              깨비머니 <span style={{ fontSize: '11px', background: 'rgba(255,255,255,0.15)', padding: '4px 8px', borderRadius: '12px', fontWeight: 'bold', marginLeft: '4px', cursor: 'pointer' }}>빠른결제 전용</span>
            </div>
            <ChevronRight size={20} color="#94A3B8" style={{ cursor: 'pointer' }} />
          </div>
          <div style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '24px', letterSpacing: '-0.5px', cursor: 'pointer' }} onClick={() => onNavigate('wallet')}>
            {walletBalance.toLocaleString()} <span style={{ fontSize: '18px', fontWeight: 'normal', color: '#94A3B8' }}>원</span>
          </div>

          {unsettledAmount > 0 && (
            <div style={{ background: 'rgba(255,255,255,0.1)', padding: '16px', borderRadius: '16px', marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid rgba(255,255,255,0.2)' }}>
                <div>
                   <div style={{ fontSize: '13px', color: '#CBD5E1', marginBottom: '4px' }}>이번 주 판매 정산금 대기중 👀</div>
                   <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#FCD34D' }}>+{unsettledAmount.toLocaleString()}원</div>
                </div>
                <button onClick={() => setShowSettlementSheet(true)} style={{ background: '#10B981', color: '#fff', padding: '10px 16px', borderRadius: '12px', fontWeight: 'bold', fontSize: '14px', border: 'none', cursor: 'pointer', animation: 'pulse 2s infinite', boxShadow: '0 4px 12px rgba(16, 185, 129, 0.4)' }}>
                   정산받기
                </button>
            </div>
          )}

          <div style={{ display: 'flex', gap: '12px' }}>
            <button onClick={() => setShowRechargeSheet(true)} style={{ flex: 1, padding: '14px', borderRadius: '14px', background: '#35D8E6', color: '#fff', border: 'none', fontWeight: 'bold', fontSize: '15px', cursor: 'pointer', boxShadow: '0 4px 10px rgba(53, 216, 230, 0.3)' }}>충전하기</button>
            <button onClick={() => onNavigate('payment_methods')} style={{ flex: 1, padding: '14px', borderRadius: '14px', background: 'rgba(255,255,255,0.1)', color: '#fff', border: 'none', fontWeight: 'bold', fontSize: '15px', cursor: 'pointer', position: 'relative' }}>
              <div style={{ position: 'absolute', top: '-10px', left: '50%', transform: 'translateX(-50%)', background: '#EF4444', color: '#fff', padding: '2px 8px', borderRadius: '8px', fontSize: '10px', whiteSpace: 'nowrap', animation: 'bounce 2s infinite' }}>수수료 무료 쿠폰!</div>
              계좌/카드 관리
            </button>
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
                <ChevronRight size={20} color="#CBD5E1" />
              </div>
            </div>
          ))}
        </section>
          </div>
        )}
      </div>

      <nav className="bottom-nav" style={{ gridTemplateColumns: '1.2fr 1.2fr auto 1.2fr 1.2fr', padding: '0 28px 0 34px' }}>
        <div className="nav-item" style={{cursor: 'pointer', color: '#94A3B8'}} onClick={() => onNavigate('home')}><Home size={24} strokeWidth={2.5} /><span>홈</span></div>
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
        <div className="nav-item active" style={{cursor: 'pointer'}} ><User size={24} /><span>내 정보</span></div>
      </nav>



      {showRechargeSheet && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 110, background: 'rgba(0,0,0,0.4)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center' }}>
          <div className="fade-slide-up" style={{ background: '#fff', borderRadius: '24px 24px 0 0', padding: '32px 24px', textAlign: 'center', width: '100%', maxWidth: 'var(--app-width)' }}>
             <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' }}>빠른 충전하기</h3>
             <p style={{ fontSize: '14px', color: '#64748B', marginBottom: '24px' }}>단 1초 만에 등록된 주계좌에서 충전할 수 있어요!</p>
             
             <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', marginBottom: '8px' }}>
                <button onClick={() => setChargeAmount(prev => prev + 10000)} style={{ padding: '12px', borderRadius: '12px', background: '#F1F5F9', border: 'none', fontWeight: 'bold', color: '#1E293B', cursor: 'pointer', fontSize: '14px' }}>+1만 원</button>
                <button onClick={() => setChargeAmount(prev => prev + 50000)} style={{ padding: '12px', borderRadius: '12px', background: '#F1F5F9', border: 'none', fontWeight: 'bold', color: '#1E293B', cursor: 'pointer', fontSize: '14px' }}>+5만 원</button>
                <button onClick={() => setChargeAmount(prev => prev + 100000)} style={{ padding: '12px', borderRadius: '12px', background: '#F1F5F9', border: 'none', fontWeight: 'bold', color: '#1E293B', cursor: 'pointer', fontSize: '14px' }}>+10만 원</button>
             </div>
             <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#35D8E6', margin: '24px 0' }}>{chargeAmount.toLocaleString()}원</div>

             <div style={{ display: 'flex', gap: '12px' }}>
               <button onClick={() => { setShowRechargeSheet(false); setChargeAmount(0); }} style={{ flex: 1, padding: '16px', borderRadius: '16px', background: '#F1F5F9', color: '#64748B', border: 'none', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer' }}>취소</button>
               <button onClick={handleChargeSubmit} style={{ flex: 1, padding: '16px', borderRadius: '16px', background: '#35D8E6', color: '#fff', border: 'none', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer' }}>충전하기</button>
             </div>
          </div>
        </div>
      )}

      {showCoinDrop && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 120, pointerEvents: 'none', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="bounce-float" style={{ fontSize: '80px', filter: 'drop-shadow(0 10px 20px rgba(245, 158, 11, 0.4))' }}>🪙✨</div>
        </div>
      )}

      {showSettlementSheet && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 110, background: 'rgba(0,0,0,0.4)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center' }}>
          <div className="fade-slide-up" style={{ background: '#fff', borderRadius: '24px 24px 0 0', padding: '32px 24px', width: '100%', maxWidth: 'var(--app-width)' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px', color: '#1E293B' }}>어떻게 정산받으실래요?</h3>
            <p style={{ fontSize: '14px', color: '#64748B', marginBottom: '24px' }}>판매 대금 <strong style={{color:'#1E293B'}}>{unsettledAmount.toLocaleString()}원</strong>을 정산합니다.</p>
            
            {/* Option 1: Withdraw to Bank */}
            <div onClick={() => handleSettlement('bank')} style={{ border: '2px solid #F1F5F9', borderRadius: '16px', padding: '20px', marginBottom: '12px', cursor: 'pointer', transition: 'border-color 0.2s', position: 'relative' }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#1E293B', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    🏦 내 계좌로 바로 받기
                  </div>
                  <div style={{ background: '#F1F5F9', padding: '4px 8px', borderRadius: '8px', fontSize: '12px', fontWeight: 'bold', color: '#64748B' }}>수수료 평생 0원</div>
               </div>
               <div style={{ fontSize: '14px', color: '#64748B', lineHeight: 1.5 }}>단 1초 만에 지금 바로<br/>내 명의 계좌로 깔끔하게 입금됩니다.</div>
            </div>

            {/* Option 2: Keep in Kkaebi (Magic Item Reward) */}
            <div onClick={() => handleSettlement('kkaebi')} style={{ border: '2px solid #35D8E6', borderRadius: '16px', padding: '20px', marginBottom: '24px', cursor: 'pointer', background: '#F8FFFF', position: 'relative', overflow: 'hidden', boxShadow: '0 4px 12px rgba(53, 216, 230, 0.15)' }}>
               <div style={{ position: 'absolute', top: 0, right: 0, background: '#EF4444', color: '#fff', padding: '6px 14px', borderBottomLeftRadius: '16px', fontSize: '12px', fontWeight: 'bold', animation: 'pulse 2s infinite' }}>⭐ 강력 추천 혜택!</div>
               <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#1E293B' }}>👻 깨비머니로 놔두기</div>
               </div>
               <div style={{ fontSize: '14px', color: '#475569', marginBottom: '12px', lineHeight: 1.5 }}>다음에 경매 입찰하실 때 편하게 쓰시라고<br/>엄청난 아이템 보상을 드려요!</div>
               <div style={{ background: '#fff', padding: '16px', borderRadius: '12px', border: '1px dashed #35D8E6', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ fontSize: '32px' }}>🎁</div>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#10B981', marginBottom: '2px' }}>클릭 시 즉시 획득</div>
                    <div style={{ fontSize: '15px', fontWeight: 'bold', color: '#1E293B' }}>최상단 끌올 노출권 3장 지급!</div>
                  </div>
               </div>
            </div>

            <button onClick={() => setShowSettlementSheet(false)} style={{ width: '100%', padding: '16px', borderRadius: '16px', background: '#F1F5F9', color: '#64748B', border: 'none', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer' }}>나중에 정산할래요</button>
          </div>
        </div>
      )}

      {showRewardAlert && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 120, pointerEvents: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ background: 'rgba(0,0,0,0.8)', padding: '24px 32px', borderRadius: '24px', textAlign: 'center', color: '#fff', animation: 'fadeInOut 2s ease-in-out' }}>
               <div style={{ fontSize: '48px', marginBottom: '16px', animation: 'bounce 1s infinite' }}>🎁✨</div>
               <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' }}>탁월한 선택입니다!</h3>
               <p style={{ fontSize: '15px', color: '#94A3B8' }}>상단 끌올 노출권 3장이 인벤토리에 지급되었습니다.</p>
            </div>
            <style>{`
                @keyframes fadeInOut {
                    0% { opacity: 0; transform: scale(0.9); }
                    20% { opacity: 1; transform: scale(1); }
                    80% { opacity: 1; transform: scale(1); }
                    100% { opacity: 0; transform: scale(1.1); }
                }
            `}</style>
          </div>
      )}

      {showPenaltySheet && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 110, background: 'rgba(0,0,0,0.4)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center' }}>
          <div className="fade-slide-up" style={{ background: '#fff', borderRadius: '24px 24px 0 0', padding: '32px 24px', width: '100%', maxWidth: 'var(--app-width)', position: 'relative' }}>
             <button onClick={() => setShowPenaltySheet(false)} style={{ position: 'absolute', top: '24px', right: '24px', background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#64748B' }}>✕</button>
             <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px', color: '#1E293B', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShieldAlert size={24} color="#DC2626" />
                나의 통합 페널티 내역
             </h3>
             <p style={{ fontSize: '14px', color: '#64748B', marginBottom: '20px', lineHeight: 1.5 }}>
               현재 구매/판매 통합 <b>{penaltyCount}회</b>의 경고가 누적되었습니다.<br/>
               <span style={{ color: '#EF4444', fontWeight: 'bold' }}>총 3회 누적 시 이번 달 서비스 이용이 정지</span>되며, <br/>패널티는 매월 1일에 초기화됩니다.
             </p>
             
             <div style={{ background: '#F8FAFC', borderRadius: '16px', padding: '16px', marginBottom: '16px', border: '1px solid #E2E8F0' }}>
               <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', paddingBottom: '12px', borderBottom: '1px dashed #CBD5E1', marginBottom: '12px' }}>
                  <div style={{ background: '#FEE2E2', color: '#DC2626', fontSize: '12px', fontWeight: 'bold', padding: '4px 8px', borderRadius: '6px', whiteSpace: 'nowrap' }}>판매자 경고</div>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#1E293B', marginBottom: '4px' }}>판매 상품 미발송 (경고 1회)</div>
                    <div style={{ fontSize: '12px', color: '#94A3B8' }}>2026.04.15 14:30 · 구매자 클레임 접수 및 승인</div>
                  </div>
               </div>
               <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <div style={{ background: '#FEE2E2', color: '#DC2626', fontSize: '12px', fontWeight: 'bold', padding: '4px 8px', borderRadius: '6px', whiteSpace: 'nowrap' }}>구매자 경고</div>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#1E293B', marginBottom: '4px' }}>낙찰 후 입금 기한 초과 (경고 1회)</div>
                    <div style={{ fontSize: '12px', color: '#94A3B8' }}>2026.04.12 09:15 · 입금 지연으로 자동 취소</div>
                  </div>
               </div>
             </div>

             <div onClick={() => { setShowPenaltySheet(false); onNavigate('guide_penalty'); }} style={{ textAlign: 'center', marginBottom: '20px', cursor: 'pointer' }}>
                <span style={{ fontSize: '13px', color: '#64748B', fontWeight: 'bold', textDecoration: 'underline' }}>페널티 가이드라인 상세 보기</span>
             </div>

             <button onClick={() => setShowPenaltySheet(false)} style={{ width: '100%', padding: '16px', borderRadius: '16px', background: '#DC2626', color: '#fff', border: 'none', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer' }}>확인했습니다</button>
          </div>
        </div>
      )}
    </>
    );
}
