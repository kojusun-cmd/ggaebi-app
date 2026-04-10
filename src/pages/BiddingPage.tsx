import { ChevronLeft } from "lucide-react";
import { useState } from "react";
import { SwipeToDeleteCard } from "../components/SwipeToDeleteCard";
import { FEED_ITEMS } from "../data/mockData";
import { useNow } from "../hooks/useNow";
import { AuctionTimer } from "../components/AuctionTimer";
import { FeedItemCard } from "../components/FeedItemCard";

export function BiddingPage({ onBack, onNavigate }: { onBack: () => void, onNavigate: (page: string, item?: any) => void }) {
    const now = useNow();
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
    const [chatStep, setChatStep] = useState(0);
    const activeItems = FEED_ITEMS.slice(16, 20);
    return (
    <>
      <header className="top-header" style={{ backgroundColor: '#fff', zIndex: 50 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div onClick={onBack} style={{ cursor: 'pointer', paddingRight: '8px' }}>
            <ChevronLeft size={28} color="#2E343E" />
          </div>
          <h1 className="header-title" style={{ fontSize: '20px' }}>나의 입찰 내역</h1>
        </div>
      </header>

      <div className="content-area" style={{ paddingTop: '80px', paddingBottom: '100px' }}>
        
        {/* 낙찰 성공 (최상단 강조) */}
        {wonItems.length > 0 && (
          <section style={{ marginBottom: '36px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', padding: '0 20px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '6px', color: '#10B981' }}>
              🎉 낙찰 성공! 결제를 진행해주세요
            </h2>
            <div className="feed-grid fade-slide-up">
              {wonItems.map(item => (
                <div key={item.id} className="feed-card" style={{ cursor: 'pointer', border: '2px solid #10B981', boxShadow: '0 4px 12px rgba(16, 185, 129, 0.15)', background: '#F0FDF4' }} onClick={() => onNavigate('detail', item)}>
                  <div className="feed-img-box" style={{ overflow: 'hidden', padding: 0, position: 'relative' }}>
                    <img src={item.img} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.currentTarget.src = `https://picsum.photos/seed/${item.id}/400/400`; }} />
                    <div style={{ position: 'absolute', top: '8px', left: '50%', transform: 'translateX(-50%)', background: 'linear-gradient(135deg, #FDE68A 0%, #D97706 100%)', color: '#fff', fontSize: '13px', padding: '4px 10px', borderRadius: '12px', fontWeight: 'bold', whiteSpace: 'nowrap', boxShadow: '0 2px 4px rgba(0,0,0,0.2)', textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}>
                      🏆 내게 낙찰됨
                    </div>
                  </div>
                  <div className="feed-info" style={{ paddingBottom: '12px' }}>
                    <div className="feed-title" style={{ color: '#065F46' }}>{item.title}</div>
                    <div className="feed-price">{item.price} <span style={{fontSize:'12px', fontWeight:'normal', color:'#94A3B8'}}>(최종 낙찰가)</span></div>
                    <div className="feed-meta" style={{ marginBottom: '12px' }}>
                      {!isExpired ? (
                        <span style={{ color: '#EF4444', fontWeight: 'bold' }}>결제 기한: <AuctionTimer endTime={paymentExpiry} /> 남음</span>
                      ) : (
                        <span style={{ color: '#DC2626', fontWeight: 'bold', fontSize: '13px' }}>결제 기한 경과 (낙찰 파기 패널티 1회 부여됨 🚨)</span>
                      )}
                    </div>
                    {!isExpired ? (
                      <div style={{ display: 'flex', gap: '8px', width: '100%' }}>
                        <button style={{ flex: 1, padding: '10px', background: '#fff', color: '#059669', border: '1px solid #059669', borderRadius: '8px', fontWeight: 'bold', fontSize: '13px', cursor: 'pointer' }} onClick={(e) => { e.stopPropagation(); setShowChatModal(true); }}>
                          판매자와 채팅 💬
                        </button>
                        <button style={{ flex: 1, padding: '10px', background: '#10B981', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', fontSize: '13px', cursor: 'pointer', boxShadow: '0 2px 4px rgba(16,185,129,0.3)' }} onClick={(e) => { e.stopPropagation(); alert('결제 페이지로 이동합니다.'); }}>
                          즉시 결제하기 💳
                        </button>
                      </div>
                    ) : (
                      <div style={{ width: '100%', padding: '10px', background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '8px', textAlign: 'center', fontSize: '13px', color: '#991B1B', fontWeight: 'bold', lineHeight: '1.4' }}>
                        결제 미이행으로 자동 낙찰 취소 및<br/>삼진아웃 패널티가 1회 적립되었습니다.
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 심사/결과 대기 중 영역 */}
        <section style={{ marginBottom: '36px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 'bold', padding: '0 20px', marginBottom: '16px' }}>⏳ 결과 대기 및 거래 종료</h2>
          <div className="feed-grid fade-slide-up">
            {completedItems.length > 0 ? (
              completedItems.map(item => (
                <SwipeToDeleteCard 
                  key={item.id} 
                  onDelete={() => setCompletedItems(prev => prev.filter(i => i.id !== item.id))}
                  onClick={() => onNavigate('detail', item)}
                >
                  <div className="feed-card" style={{ cursor: 'pointer' }}>
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
                    <div className="feed-info">
                      <div className="feed-title">{item.title}</div>
                      <div className="feed-price">{item.price} <span style={{fontSize:'12px', fontWeight:'normal', color:'#94A3B8'}}>(내 입찰가)</span></div>
                      <div className="feed-meta">
                        <span style={{ color: item.tradeStatus === 'sold' ? '#94A3B8' : '#FF4E50' }}>경매 종료됨</span>
                        <span style={{ color: item.tradeStatus === 'sold' ? '#94A3B8' : '#FF4E50', fontWeight: '600' }}>
                          {item.tradeStatus === 'sold' ? '판매완료' : '다른 낙찰자가 거래중'}
                        </span>
                      </div>
                      {item.tradeStatus === 'assessing' && (
                        <div style={{ fontSize: '11px', color: '#64748B', marginTop: '8px', background: '#F1F5F9', padding: '8px', borderRadius: '6px', lineHeight: 1.4 }}>
                          현재 최고가 낙찰자가 결제를 진행 중입니다.<br/>낙찰자가 포기할 경우, 대기자인 회원님께 안내됩니다.
                        </div>
                      )}
                    </div>
                  </div>
                </SwipeToDeleteCard>
              ))
            ) : (
                <div style={{ padding: '20px', color: '#94A3B8', fontSize: '14px', textAlign: 'center' }}>결과 대기 중인 항목이 없습니다.</div>
            )}
          </div>
        </section>

        {/* 입찰 진행 중 영역 */}
        <section>
          <h2 style={{ fontSize: '18px', fontWeight: 'bold', padding: '0 20px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ fontSize: '20px', filter: 'drop-shadow(1px 2px 2px rgba(0,0,0,0.2))' }}>🔨</span> 나의 입찰 진행중
          </h2>
          <div className="feed-grid fade-slide-up">
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
                <div style={{ padding: '20px', color: '#94A3B8', fontSize: '14px', textAlign: 'center' }}>진행 중인 항목이 없습니다.</div>
            )}
          </div>
        </section>

      </div>

      {showChatModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', zIndex: 999, display: 'flex', flexDirection: 'column' }}>
          <div style={{ background: '#fff', padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #E2E8F0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div onClick={() => { setShowChatModal(false); setChatStep(0); }} style={{ cursor: 'pointer' }}><ChevronLeft size={24} /></div>
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
    </>
    );
}
