import { ChevronLeft } from "lucide-react";
import { useState } from "react";
import { SwipeToDeleteCard } from "../components/SwipeToDeleteCard";
import { FEED_ITEMS } from "../data/mockData";
import { useNow } from "../hooks/useNow";
import { AuctionTimer } from "../components/AuctionTimer";
import { FeedItemCard } from "../components/FeedItemCard";
import { usePopupHistory } from "../hooks/usePopupHistory";

export function BiddingPage({ onBack, onNavigate, initialTab }: { onBack: () => void, onNavigate: (page: string, item?: any) => void, initialTab?: string }) {
    const now = useNow();
    const [activeTab, setActiveTab] = useState(initialTab || 'progress');
    const [paymentExpiry] = useState(() => Date.now() + 15000);
    const isExpired = paymentExpiry - now <= 0;
    const [wonItems] = useState([
            { ...FEED_ITEMS[12], endTime: Date.now() - 3600000, tradeStatus: 'won' } // 낙찰 성공 샘플
          ]);
    const [completedItems, setCompletedItems] = useState([
            { ...FEED_ITEMS[15], endTime: Date.now() - 10000, tradeStatus: 'assessing' }, // 낙찰자 선택중
            { ...FEED_ITEMS[14], endTime: Date.now() - 80000, tradeStatus: 'sold' } // 판매완료
          ]);
    const [showChatModal, setShowChatModal] = useState(false);
    const [showPaymentSheet, setShowPaymentSheet] = useState(false);
    const [chatStep, setChatStep] = useState(0);
    const activeItems = FEED_ITEMS.slice(16, 20);

    usePopupHistory(showChatModal, () => { setShowChatModal(false); setChatStep(0); }, 'BiddingChatModal');
    usePopupHistory(showPaymentSheet, () => setShowPaymentSheet(false), 'BiddingPaymentSheet');

    return (
    <>
      <header className="top-header" style={{ backgroundColor: '#fff', zIndex: 50, borderBottom: 'none', paddingBottom: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div onClick={onBack} style={{ cursor: 'pointer', paddingRight: '8px' }}>
            <ChevronLeft size={28} color="#2E343E" />
          </div>
          <h1 className="header-title" style={{ fontSize: '20px', marginLeft: '-6px' }}>나의 입찰 내역</h1>
        </div>
      </header>

      {/* 탭 네비게이션 */}
      <div
        style={{
          position: 'sticky',
          top: '44px',
          marginTop: '-1px',
          background: '#fff',
          zIndex: 40,
          borderBottom: '1px solid #E2E8F0',
          display: 'flex',
          padding: '0 39px 0 45px',
        }}
      >
        <button 
          onClick={() => setActiveTab('progress')}
          style={{ flex: 1, padding: '16px 0', border: 'none', background: 'transparent', fontSize: '15px', fontWeight: 'bold', color: activeTab === 'progress' ? '#1E293B' : '#94A3B8', borderBottom: activeTab === 'progress' ? '2px solid #1E293B' : '2px solid transparent', cursor: 'pointer', transition: 'all 0.2s', textAlign: 'center' }}
        >
          입찰 진행 중
        </button>
        <button 
          onClick={() => setActiveTab('payment')}
          style={{ flex: 1, padding: '16px 0', border: 'none', background: 'transparent', fontSize: '15px', fontWeight: 'bold', color: activeTab === 'payment' ? '#1E293B' : '#94A3B8', borderBottom: activeTab === 'payment' ? '2px solid #1E293B' : '2px solid transparent', cursor: 'pointer', transition: 'all 0.2s', textAlign: 'center' }}
        >
          결제 대기
        </button>
      </div>

      <div
        className="content-area"
        style={{
          paddingTop: '16px',
          paddingBottom: '100px',
        }}
      >
        
        {activeTab === 'payment' && (
          <div style={{ marginTop: '18px' }}>
            {/* 낙찰 성공 (최상단 강조) */}
            {wonItems.length > 0 && (
              <section style={{ marginBottom: 0 }}>
                <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '6px', color: '#10B981' }}>
                  🎉 낙찰 성공! 결제를 진행해주세요
                </h2>
                <div className="feed-grid fade-slide-up bidding-payment-feed">
                  {wonItems.map(item => (
                    <div key={item.id} className="bidding-payment-won-card" style={{ display: 'flex', flexDirection: 'column', background: '#F0FDF4', border: '2px solid #10B981', borderRadius: '20px', margin: '0 -8px', boxShadow: '0 4px 12px rgba(16, 185, 129, 0.15)', overflow: 'hidden' }}>
                      <div className="feed-card" style={{ margin: 0, border: 'none', background: 'transparent', boxShadow: 'none', padding: '12px' }} onClick={() => onNavigate('detail', item)}>
                        <div className="feed-img-box" style={{ overflow: 'hidden', padding: 0, position: 'relative' }}>
                          <img src={item.img} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.currentTarget.src = `https://picsum.photos/seed/${item.id}/400/400`; }} />
                          <div style={{ position: 'absolute', top: '8px', left: '50%', transform: 'translateX(-50%)', background: 'linear-gradient(135deg, #FDE68A 0%, #D97706 100%)', color: '#fff', fontSize: '13px', padding: '4px 10px', borderRadius: '12px', fontWeight: 'bold', whiteSpace: 'nowrap', boxShadow: '0 2px 4px rgba(0,0,0,0.2)', textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}>
                            🏆 내게 낙찰됨
                          </div>
                        </div>
                        <div className="feed-info" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', justifyContent: 'center' }}>
                          <div className="feed-title" style={{ color: '#065F46', paddingRight: '4px', marginBottom: '4px', wordBreak: 'keep-all' }}>{item.title}</div>
                          
                          <div>
                            <div className="feed-price" style={{ margin: 0, whiteSpace: 'nowrap' }}>
                              {item.price}
                            </div>
                            <div style={{ marginTop: '2px' }}>
                              <span style={{ fontSize: '12px', fontWeight: 'normal', color: '#94A3B8' }}>(최종 낙찰가)</span>
                            </div>
                          </div>
                            
                          <div className="feed-meta" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px', paddingBottom: '2px', marginTop: '16px', whiteSpace: 'nowrap' }}>
                            {!isExpired ? (
                              <span style={{ color: '#EF4444', fontWeight: 'bold' }}>결제기한 <AuctionTimer endTime={paymentExpiry} /> 남음</span>
                            ) : (
                              <span style={{ color: '#DC2626', fontWeight: 'bold', fontSize: '12px' }}>기한 경과 (패널티 1회 🚨)</span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* 하단 풀사이즈 안내 및 액션 영역 (옵션 1 구조) */}
                      <div style={{ padding: '4px 12px 12px 12px' }}>
                        {!isExpired ? (
                          <div style={{ display: 'flex', gap: '8px', width: '100%', marginBottom: '12px' }}>
                            <button style={{ flex: 1, padding: '12px', background: '#fff', color: '#059669', border: '1px solid #059669', borderRadius: '12px', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer' }} onClick={(e) => { e.stopPropagation(); setShowChatModal(true); }}>
                              채팅 💬
                            </button>
                            <button style={{ flex: 1, padding: '12px', background: '#10B981', color: '#fff', border: 'none', borderRadius: '12px', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer', boxShadow: '0 2px 4px rgba(16,185,129,0.3)' }} onClick={(e) => { e.stopPropagation(); setShowPaymentSheet(true); }}>
                              결제하기 💳
                            </button>
                          </div>
                        ) : (
                          <div style={{ width: '100%', padding: '12px', background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '12px', textAlign: 'center', fontSize: '14px', color: '#991B1B', fontWeight: 'bold', lineHeight: '1.4', marginBottom: '12px' }}>
                            자동 낙찰 취소 됨<br/>삼진아웃 패널티 1회 적립
                          </div>
                        )}

                        {/* 강력한 법적/이용 제재 안내 문구박스 */}
                        {!isExpired && (
                          <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', padding: '12px 14px', borderRadius: '10px', fontSize: '12px', color: '#991B1B', lineHeight: '1.5', display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                            <span style={{ fontSize: '16px', lineHeight: 1 }}>🚨</span>
                            <span>결제 기한 내 미결제 시 낙찰이 <b>자동 취소</b>되며, <b>패널티 1회</b>가 부여됩니다. (누적 패널티 발생 시 플랫폼 이용 영구 제한 조치)</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* 심사/결과 대기 중 영역 */}
            <section style={{ marginTop: '56px', marginBottom: '36px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px' }}>⏳ 결과 대기 및 거래 종료</h2>
              <div className="feed-grid fade-slide-up bidding-payment-feed">
                {completedItems.length > 0 ? (
                  completedItems.map(item => (
                    <SwipeToDeleteCard 
                      key={item.id} 
                      className="bidding-payment-swipe-card"
                      onDelete={() => setCompletedItems(prev => prev.filter(i => i.id !== item.id))}
                      onClick={() => onNavigate('detail', item)}
                    >
                      <div
                        style={
                          item.tradeStatus === 'assessing'
                            ? {
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 0,
                                background: '#fff',
                                borderRadius: '20px',
                                overflow: 'hidden',
                                boxShadow: 'var(--shadow-card)',
                              }
                            : { display: 'flex', flexDirection: 'column', gap: '10px' }
                        }
                      >
                        <div
                          className="feed-card"
                          style={
                            item.tradeStatus === 'assessing'
                              ? { cursor: 'pointer', margin: 0, boxShadow: 'none', borderRadius: 0 }
                              : { cursor: 'pointer' }
                          }
                        >
                          <div className="feed-img-box" style={{ overflow: 'hidden', padding: 0, position: 'relative' }}>
                            <img src={item.img} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: item.tradeStatus === 'sold' ? 0.6 : 1 }} onError={(e) => { e.currentTarget.src = `https://picsum.photos/seed/${item.id}/400/400`; }} />
                            {item.tradeStatus === 'assessing' && (
                              <div style={{ position: 'absolute', top: '8px', left: '50%', transform: 'translateX(-50%)', background: 'rgba(255, 78, 80, 0.95)', color: '#fff', fontSize: '12px', padding: '4px 8px', borderRadius: '12px', fontWeight: 'bold', whiteSpace: 'nowrap' }}>
                                결과 대기중
                              </div>
                            )}
                            {item.tradeStatus === 'sold' && (
                              <div style={{ position: 'absolute', top: '8px', left: '50%', transform: 'translateX(-50%)', background: 'rgba(46, 52, 62, 0.9)', color: '#fff', fontSize: '12px', padding: '4px 8px', borderRadius: '12px', fontWeight: 'bold', whiteSpace: 'nowrap' }}>
                                판매완료
                              </div>
                            )}
                          </div>
                          <div className="feed-info" style={{ display: 'flex', flexDirection: 'column', paddingBottom: '4px', overflow: 'hidden', justifyContent: 'center' }}>
                            <div className="feed-title" style={{ paddingRight: '4px', marginBottom: '4px', wordBreak: 'keep-all' }}>{item.title}</div>
                            
                            <div>
                              <div className="feed-price" style={{ margin: 0, whiteSpace: 'nowrap' }}>
                                {item.price}
                              </div>
                              <div style={{ marginTop: '2px' }}>
                                <span style={{ fontSize: '12px', fontWeight: 'normal', color: '#94A3B8' }}>(내 입찰가)</span>
                              </div>
                            </div>

                            <div className="feed-meta" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px', paddingBottom: '2px', marginTop: '16px', whiteSpace: 'nowrap' }}>
                              <span style={{ color: item.tradeStatus === 'sold' ? '#94A3B8' : '#FF4E50', fontWeight: 'bold' }}>경매종료</span>
                              <span style={{ color: item.tradeStatus === 'sold' ? '#94A3B8' : '#FF4E50', fontWeight: 'bold', fontSize: '12px' }}>
                                {item.tradeStatus === 'sold' ? '판매완료' : '다른회원 거래중'}
                              </span>
                            </div>
                          </div>
                        </div>

                        {item.tradeStatus === 'assessing' && (
                          <div style={{ background: '#F8FAFC', borderTop: '1px solid #E2E8F0', padding: '12px 14px', fontSize: '12px', color: '#475569', lineHeight: 1.6, display: 'flex', gap: '8px', alignItems: 'flex-start', wordBreak: 'keep-all' }}>
                            <span style={{ fontSize: '14px', lineHeight: 1.2 }}>ℹ️</span>
                            <span>
                              <b style={{ color: '#334155' }}>현재 최고가 낙찰자</b>가 결제를 진행 중입니다.<br />
                              낙찰자가 포기할 경우, <b style={{ color: '#334155' }}>대기자인 회원님</b>께 안내됩니다.
                            </span>
                          </div>
                        )}
                      </div>
                    </SwipeToDeleteCard>
                  ))
                ) : (
                    <div style={{ color: '#94A3B8', fontSize: '14px', textAlign: 'center' }}>결과 대기 중인 항목이 없습니다.</div>
                )}
              </div>
            </section>
          </div>
        )}

        {activeTab === 'progress' && (
          <section style={{ marginTop: '18px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ fontSize: '20px', filter: 'drop-shadow(1px 2px 2px rgba(0,0,0,0.2))' }}>🔨</span> 나의 입찰 진행중
            </h2>
            <div className="feed-grid fade-slide-up bidding-progress-feed">
              {activeItems.length > 0 ? (
                activeItems.map(item => (
                  <FeedItemCard
                    key={item.id}
                    item={item}
                    onNavigate={onNavigate}
                    badge={
                      <div style={{ position: 'absolute', top: '8px', left: '50%', transform: 'translateX(-50%)', background: 'rgba(53, 216, 230, 0.95)', color: '#fff', fontSize: '12px', padding: '4px 8px', borderRadius: '12px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '2px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', whiteSpace: 'nowrap' }}>
                        최고가 입찰중
                      </div>
                    }
                    priceSuffix={<span style={{fontSize:'12px', fontWeight:'normal', color:'#94A3B8'}}>(내 입찰가)</span>}
                    customMeta={
                      <span style={{ color: '#35D8E6', fontWeight: '600' }}>진행중</span>
                    }
                  />
                ))
              ) : (
                  <div style={{ color: '#94A3B8', fontSize: '14px', textAlign: 'center' }}>진행 중인 항목이 없습니다.</div>
              )}
            </div>
          </section>
        )}

      </div>

      {showChatModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', zIndex: 999, display: 'flex', flexDirection: 'column' }}>
          <div style={{ background: '#fff', padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #E2E8F0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div onClick={() => { setShowChatModal(false); setChatStep(0); }} style={{ cursor: 'pointer' }}><ChevronLeft size={28} /></div>
              <span style={{ fontWeight: 'bold', fontSize: '18px' }}>판매자 ({wonItems[0]?.title || '상품'})</span>
            </div>
          </div>
          
          <div style={{ flex: 1, background: '#F8FAFC', padding: '20px', overflowY: 'auto' }}>
            <div style={{ textAlign: 'center', margin: '20px 0', color: '#94A3B8', fontSize: '13px' }}>오후 2:30</div>
            
            <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
              <div style={{ width: '40px', height: '40px', background: '#E2E8F0', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>🧑</div>
              <div style={{ background: '#fff', padding: '12px 16px', borderRadius: '0 16px 16px 16px', border: '1px solid #E2E8F0', maxWidth: '75%', fontSize: '14px' }}>
                낙찰을 축하드립니다! 직거래와 택배 중 어떤 걸로 진행하시겠어요?
              </div>
            </div>

            {/* Step 0: 초기 카테고리 선택 */}
            {chatStep === 0 && (
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '20px' }}>
                <button onClick={() => setChatStep(1)} style={{ background: '#fff', color: '#10B981', border: '1px solid #10B981', padding: '8px 12px', borderRadius: '16px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer' }}>
                  제품/배송 문의 📦
                </button>
                <button onClick={() => setChatStep(2)} style={{ background: '#fff', color: '#EF4444', border: '1px solid #FCA5A5', padding: '8px 12px', borderRadius: '16px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer' }}>
                  낙찰 포기 (취소요청) ⚠️
                </button>
              </div>
            )}

            {/* Step 1: 일반 문의 */}
            {chatStep === 1 && (
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                <div style={{ background: '#10B981', color: '#fff', padding: '12px 16px', borderRadius: '16px 0 16px 16px', maxWidth: '75%', fontSize: '14px' }}>
                  [제품/배송 문의] 상세한 배송 일정과 직거래 가능 위치 여쭤봅니다!
                </div>
              </div>
            )}

            {/* Step 2: 낙찰 취소 요청 */}
            {chatStep >= 2 && (
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                <div style={{ background: '#10B981', color: '#fff', padding: '12px 16px', borderRadius: '16px 0 16px 16px', maxWidth: '75%', fontSize: '14px' }}>
                  [낙찰포기] 부득이한 사정으로 낙찰 취소를 요청합니다. 정말 죄송합니다.
                </div>
              </div>
            )}

            {/* Step 2 Continued: 판매자 화면 시뮬레이션 */}
            {chatStep === 2 && (
              <div style={{ marginTop: '30px', padding: '16px', border: '1px dashed #94A3B8', borderRadius: '12px', background: '#F1F5F9' }}>
                <div style={{ textAlign: 'center', fontSize: '12px', color: '#64748B', marginBottom: '12px', fontWeight: 'bold' }}>👇 시뮬레이션: 이 요청을 받은 '판매자'의 화면 👇</div>
                <div style={{ background: '#fff', padding: '16px', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                  <p style={{ fontSize: '13px', marginBottom: '12px', fontWeight: 'bold' }}>낙찰자가 구매 포기를 요청했습니다. 어떻게 처리하시겠습니까?</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <button onClick={() => setChatStep(4)} style={{ padding: '10px', background: '#fff', border: '1px solid #CBD5E1', color: '#475569', borderRadius: '8px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer' }}>
                      사유 인정 (패널티 없이 취소 승인)
                    </button>
                    <button onClick={() => setChatStep(5)} style={{ padding: '10px', background: '#FEF2F2', border: '1px solid #FCA5A5', color: '#DC2626', borderRadius: '8px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer' }}>
                      악의적 노쇼 (■ 파기 패널티 부여 후 승인)
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: 패널티 없이 취소 성공 (낙찰자 수신) */}
            {chatStep === 4 && (
              <div style={{ display: 'flex', gap: '8px', marginTop: '20px' }}>
                <div style={{ width: '40px', height: '40px', background: '#E2E8F0', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>🤖</div>
                <div style={{ background: '#F0FDF4', border: '1px solid #A7F3D0', padding: '16px', borderRadius: '0 16px 16px 16px', maxWidth: '85%' }}>
                  <div style={{ fontWeight: 'bold', color: '#059669', marginBottom: '8px' }}>✅ 원만하게 합의 취소 완료됨</div>
                  <div style={{ fontSize: '13px', color: '#064E3B', lineHeight: 1.4 }}>
                    판매자가 귀하의 사유를 받아들여 <b>패널티 없이 취소</b>가 완료되었습니다.<br/><br/>판매자에게 정중한 인사를 남겨주세요.
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: 패널티 부여됨 (낙찰자 수신) */}
            {chatStep >= 5 && (
              <div style={{ display: 'flex', gap: '8px', marginTop: '20px' }}>
                <div style={{ width: '40px', height: '40px', background: '#E2E8F0', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>🤖</div>
                <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', padding: '16px', borderRadius: '0 16px 16px 16px', maxWidth: '85%' }}>
                  <div style={{ fontWeight: 'bold', color: '#DC2626', marginBottom: '8px' }}>🚨 낙찰 파기 패널티 조치됨 (알림)</div>
                  <div style={{ fontSize: '13px', color: '#7F1D1D', marginBottom: '16px', lineHeight: 1.4 }}>
                    판매자가 취소 요청을 승인하였으나, <b>파기 패널티 조치</b>를 등록했습니다.<br/><br/><b>현재 나의 누적 삼진아웃 경고: [1회/3회]</b>
                  </div>
                  <button onClick={() => setChatStep(6)} style={{ width: '100%', background: '#fff', color: '#DC2626', border: '1px solid #DC2626', padding: '8px', borderRadius: '8px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}>
                    억울한 패널티인가요? 상세 이의 제기하기
                  </button>
                </div>
              </div>
            )}
          </div>

          <div style={{ padding: '16px', background: '#fff', borderTop: '1px solid #E2E8F0', display: 'flex', gap: '8px' }}>
            <input type="text" placeholder="메시지를 입력하세요..." style={{ flex: 1, padding: '12px 16px', borderRadius: '24px', border: '1px solid #E2E8F0', outline: 'none', background: '#F8FAFC' }} />
            <button style={{ width: '46px', height: '46px', background: '#10B981', color: '#fff', borderRadius: '50%', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>전송</button>
          </div>

          {/* 이의 제기 접수 팝업 */}
          {chatStep === 6 && (
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', zIndex: 1000}}>
              <div style={{ background: '#fff', borderRadius: '20px', padding: '24px', width: '100%', maxWidth: '340px', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '12px', textAlign: 'center' }}>이의 제기 신청</h3>
                <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.5, marginBottom: '20px', textAlign: 'center' }}>
                  관리자가 진위를 파악할 수 있도록,<br/><b>현재 채팅방 내역 원본</b>이 함께 자동 제출됩니다. 진행하시겠습니까?
                </p>
                <div style={{ background: '#F1F5F9', padding: '12px', borderRadius: '8px', marginBottom: '24px', fontSize: '12px', color: '#64748B', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>📄</span> 자동 첨부: #CHAT-1240 내역 원본 
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button onClick={() => setChatStep(5)} style={{ flex: 1, padding: '12px', border: 'none', background: '#E2E8F0', color: '#475569', borderRadius: '12px', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer' }}>취소</button>
                  <button onClick={() => { alert('이의 제기를 성공적으로 접수했습니다. 처리 기간 동안 패널티 효력이 정지됩니다.'); setChatStep(0); setShowChatModal(false); }} style={{ flex: 1, padding: '12px', border: 'none', background: '#10B981', color: '#fff', borderRadius: '12px', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer' }}>제출하기</button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 결제 진행 바텀 시트 */}
      {showPaymentSheet && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', zIndex: 1000, display: 'flex', alignItems: 'flex-end', animation: 'fadeIn 0.2s ease-out' }} onClick={() => setShowPaymentSheet(false)}>
          <div style={{ background: '#fff', width: '100%', borderRadius: '24px 24px 0 0', padding: '24px', animation: 'slideUp 0.3s ease-out' }} onClick={(e) => e.stopPropagation()}>
            <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' }}>결제 전 필수 확인사항</h3>
            <p style={{ color: '#475569', fontSize: '14px', marginBottom: '24px', lineHeight: '1.5' }}>
              안전한 거래와 권리 보호를 위해 아래 내용을 숙지해주세요.
            </p>
            
            <div style={{ background: '#F8FAFC', borderRadius: '12px', padding: '16px', marginBottom: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <div style={{ flexShrink: 0, fontSize: '18px' }}>🔒</div>
                <div style={{ fontSize: '13px', color: '#1E293B', lineHeight: '1.4' }}>
                  <b>반드시 깨비옥션 안전결제</b>를 이용해주세요.<br/>외부 직거래 유도나 개인 계좌 송금 요구는 사기일 확률이 매우 높습니다.
                </div>
              </div>
              <div style={{ width: '100%', height: '1px', background: '#E2E8F0' }}></div>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <div style={{ flexShrink: 0, fontSize: '18px' }}>⏰</div>
                <div style={{ fontSize: '13px', color: '#1E293B', lineHeight: '1.4' }}>
                  결제 기한(24시간)을 넘길 경우 <b>낙찰이 즉시 취소</b>되며 다음 대기자에게 권리가 넘어갑니다. (이 경우 패널티가 부과됩니다)
                </div>
              </div>
            </div>

            <button 
              onClick={() => { setShowPaymentSheet(false); onNavigate('checkout', wonItems[0]); }}
              style={{ width: '100%', padding: '16px', background: '#10B981', color: '#fff', border: 'none', borderRadius: '12px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 4px 12px rgba(16,185,129,0.3)' }}
            >
              확인했으며 결제 진행합니다
            </button>
          </div>
        </div>
      )}
    </>
    );
}
