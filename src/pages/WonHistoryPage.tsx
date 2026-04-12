import { useState } from 'react';
import { usePopupHistory } from '../hooks/usePopupHistory';
import { ChevronLeft, Award, Star } from 'lucide-react';
import { FEED_ITEMS } from '../data/mockProducts';

export function WonHistoryPage({ onBack, onNavigate }: { onBack: () => void, onNavigate: (page: string, item?: any) => void }) {
  const [showConfetti, setShowConfetti] = useState(false);
  const [showReviewSheet, setShowReviewSheet] = useState(false);

  usePopupHistory(
    showReviewSheet,
    () => setShowReviewSheet(false),
    'WonHistory_ReviewSheet'
  );

  // Mock won items
  const wonItems = FEED_ITEMS.slice(0, 3).map((item, idx) => ({
    ...item,
    status: idx === 0 ? 'confirm_needed' : idx === 1 ? 'shipping' : 'completed',
    savedAmount: Math.floor(Math.random() * 50) * 1000 + 10000
  }));

  const totalSaved = wonItems.reduce((acc, curr) => acc + curr.savedAmount, 0);

  const handleConfirm = () => {
    setShowConfetti(true);
    setTimeout(() => {
      setShowConfetti(false);
      setShowReviewSheet(true);
    }, 1500);
  };

  return (
    <>
      <header className="top-header subpage" style={{ backgroundColor: '#fff', zIndex: 50, borderBottom: 'none' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div onClick={onBack} style={{ cursor: 'pointer', paddingRight: '8px' }}>
            <ChevronLeft size={28} color="#2E343E" />
          </div>
          <h1 className="header-title" style={{ fontSize: '20px', margin: 0 }}>내가 쟁취한 꿀매물</h1>
        </div>
      </header>
      
      <div className="content-area subpage" style={{ paddingTop: '64px', paddingBottom: '100px', background: '#F8FAFC', minHeight: '100vh' }}>
        
        {/* AI 분석 위젯 */}
        <section className="fade-slide-up" style={{ margin: '20px', background: 'rgba(255, 255, 255, 0.7)', backdropFilter: 'blur(10px)', borderRadius: '24px', padding: '24px', boxShadow: '0 8px 32px rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#065F46', fontWeight: 'bold', marginBottom: '12px' }}>
            <Award size={24} color="#10B981" /> AI 득템 분석
          </div>
          <p style={{ fontSize: '15px', color: '#1E293B', marginBottom: '8px', lineHeight: 1.5 }}>
            이번 달, AI 분석 결과 평균 시세보다<br/>총 <strong style={{fontSize: '20px', color: '#10B981'}}>{totalSaved.toLocaleString()}원</strong> 싸게 득템했어요! 🎉
          </p>
          <div style={{ background: '#ECFDF5', padding: '12px', borderRadius: '12px', color: '#047857', fontSize: '13px', fontWeight: '500' }}>
            계속 이렇게 똑똑한 경매를 하면 곧 <strong>'황금 깨비'</strong>로 승급됩니다!
          </div>
        </section>

        {/* 꿀매물 목록 */}
        <section style={{ margin: '20px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '16px', color: '#1E293B' }}>낙찰/구매 내역</h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {wonItems.map((item, index) => (
              <div key={item.id} className="fade-slide-up" style={{ background: '#fff', borderRadius: '20px', padding: '20px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', animationDelay: `${index * 100}ms` }}>
                {/* Status Tracker */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', paddingBottom: '16px', borderBottom: '1px solid #F1F5F9' }}>
                  <div style={{ fontSize: '13px', fontWeight: 'bold', color: item.status === 'completed' ? '#94A3B8' : '#10B981' }}>
                    {item.status === 'confirm_needed' ? '📦 배송 완료' : item.status === 'shipping' ? '🚚 배송 중' : '✅ 거래 종료'}
                  </div>
                  {item.status === 'confirm_needed' && (
                    <div className="pulse-glow" style={{ fontSize: '12px', background: '#FEF2F2', color: '#EF4444', padding: '4px 8px', borderRadius: '8px', fontWeight: 'bold' }}>수취 확인 필요</div>
                  )}
                </div>

                <div style={{ display: 'flex', gap: '16px', marginBottom: '16px', cursor: 'pointer' }} onClick={() => onNavigate('detail', item)}>
                  <div style={{ width: '80px', height: '80px', borderRadius: '12px', overflow: 'hidden', flexShrink: 0 }}>
                    <img src={item.img} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '15px', fontWeight: 'bold', color: '#1E293B', marginBottom: '4px' }}>{item.title}</div>
                    <div style={{ fontSize: '13px', color: '#64748B', marginBottom: '8px', textDecoration: 'line-through' }}>시세 {item.price}</div>
                    <div style={{ fontSize: '18px', fontWeight: '800', color: '#10B981' }}>{parseInt((item.price as string).replace(/[^0-9]/g, '')) - item.savedAmount}원 낙찰</div>
                  </div>
                </div>

                {/* Actions */}
                {item.status === 'confirm_needed' ? (
                  <button onClick={handleConfirm} style={{ width: '100%', padding: '14px', borderRadius: '12px', background: '#10B981', color: '#fff', border: 'none', fontWeight: 'bold', fontSize: '15px', cursor: 'pointer', boxShadow: '0 4px 12px rgba(16, 185, 129, 0.2)' }}>
                    수취 확인 (에스크로 정산 허용)
                  </button>
                ) : item.status === 'shipping' ? (
                  <button style={{ width: '100%', padding: '14px', borderRadius: '12px', background: '#F1F5F9', color: '#64748B', border: 'none', fontWeight: 'bold', fontSize: '15px', cursor: 'pointer' }}>
                    배송 조회
                  </button>
                ) : (
                  <button style={{ width: '100%', padding: '14px', borderRadius: '12px', background: '#F8FAFC', color: '#94A3B8', border: 'none', fontWeight: 'bold', fontSize: '15px', cursor: 'pointer' }}>
                    영수증 보기
                  </button>
                )}
              </div>
            ))}
          </div>
        </section>

      </div>

      {/* Confetti Animation Layer (Mock) */}
      {showConfetti && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100, pointerEvents: 'none', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="bounce-float" style={{ fontSize: '80px' }}>🎉🎊</div>
        </div>
      )}

      {/* Review Bottom Sheet */}
      {showReviewSheet && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 110, background: 'rgba(0,0,0,0.4)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
          <div className="fade-slide-up" style={{ background: '#fff', borderRadius: '24px 24px 0 0', padding: '32px 24px', textAlign: 'center' }}>
             <img src="https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Smiling%20face%20with%20hearts/3D/smiling_face_with_hearts_3d.png" alt="smile" style={{ width: '80px', marginBottom: '16px' }} />
             <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' }}>만족스러운 거래였나요?</h3>
             <p style={{ fontSize: '14px', color: '#64748B', marginBottom: '24px' }}>판매자의 <b>깨비불(매너온도)</b>을 높여주세요!</p>
             
             <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '32px' }}>
               {[1,2,3,4,5].map(i => <Star key={i} size={40} color={i <= 4 ? '#F59E0B' : '#E2E8F0'} fill={i <= 4 ? '#F59E0B' : 'transparent'} />)}
             </div>

             <button onClick={() => setShowReviewSheet(false)} style={{ width: '100%', padding: '16px', borderRadius: '16px', background: '#2E343E', color: '#fff', border: 'none', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer' }}>
               쿨하게 평가 완료 🚀
             </button>
          </div>
        </div>
      )}
    </>
  );
}
