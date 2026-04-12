import { useState } from 'react';
import { usePopupHistory } from '../hooks/usePopupHistory';
import { ChevronLeft, Plus, CreditCard, Building2, ShieldCheck, Ticket } from 'lucide-react';

export function PaymentMethodPage({ onBack }: { onBack: () => void, onNavigate: (page: string) => void }) {
  const [showAddMethod, setShowAddMethod] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showReward, setShowReward] = useState(false);
  
  usePopupHistory(
    showAddMethod,
    () => setShowAddMethod(false),
    'PaymentMethod_AddMethod'
  );

  usePopupHistory(
    showReward,
    () => setShowReward(false),
    'PaymentMethod_Reward'
  );

  // 목업용 결제수단 데이터 (초기엔 비어있을 수도 있음)
  const [methods, setMethods] = useState<any[]>([]);

  const handleAddBank = (bankName: string) => {
    setLoading(true);
    // 1.5초 가상 연결 로딩
    setTimeout(() => {
      setLoading(false);
      setShowAddMethod(false);
      setMethods([...methods, { id: Date.now(), type: 'bank', name: bankName, info: '***-***-123456 (주 정산계좌)', isPrimary: true }]);
      
      // 첫 등록이라면 보상 띄우기
      if (methods.length === 0) {
        setShowReward(true);
      }
    }, 1500);
  };

  return (
    <>
      <header className="top-header subpage" style={{ backgroundColor: '#fff', zIndex: 50, borderBottom: '1px solid #E2E8F0', position: 'fixed', width: '100%', maxWidth: '420px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div onClick={onBack} style={{ cursor: 'pointer', paddingRight: '8px' }}>
            <ChevronLeft size={28} color="#2E343E" />
          </div>
          <h1 className="header-title" style={{ fontSize: '20px', margin: 0 }}>결제/정산 수단 관리</h1>
        </div>
      </header>

      <div className="content-area subpage" style={{ paddingTop: '16px', paddingBottom: '100px', background: '#F8FAFC', minHeight: '100vh' }}>
        
        <div style={{ marginBottom: '24px', padding: '0 8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#64748B', fontWeight: 'bold', fontSize: '14px', marginBottom: '8px' }}>
                <ShieldCheck size={18} color="#10B981" /> 안전 결제 적용 중
            </div>
            <p style={{ fontSize: '13px', color: '#94A3B8' }}>등록된 계좌는 깨비머니 충전과 판매 정산에 사용됩니다.</p>
        </div>

        {methods.length === 0 ? (
            <div style={{ background: '#fff', borderRadius: '20px', padding: '40px 20px', textAlign: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', marginBottom: '24px' }}>
                <div style={{ width: '60px', height: '60px', background: '#F1F5F9', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                    <CreditCard size={28} color="#94A3B8" />
                </div>
                <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#1E293B', marginBottom: '8px' }}>등록된 결제 수단이 없어요</h3>
                <p style={{ fontSize: '14px', color: '#64748B' }}>1초 만에 계좌를 연결하고<br/><strong style={{ color: '#35D8E6' }}>구매자 안전결제 수수료 무료 쿠폰 3장</strong>을 받아가세요!</p>
            </div>
        ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
                
                {/* 획득한 쿠폰 알림 배너 */}
                <div style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: '16px', padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ fontSize: '24px' }}>🎟️</div>
                        <div>
                            <div style={{ fontSize: '12px', color: '#10B981', fontWeight: 'bold', marginBottom: '2px' }}>보유 쿠폰</div>
                            <div style={{ fontSize: '14px', color: '#1E293B', fontWeight: 'bold' }}>구매자 결제 수수료 무료 <span style={{ color: '#10B981' }}>3장</span></div>
                        </div>
                    </div>
                    <button style={{ background: '#fff', border: '1px solid #BBF7D0', color: '#10B981', padding: '6px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: 'bold' }}>내역보기</button>
                </div>

                {methods.map(m => (
                    <div key={m.id} style={{ background: '#2E343E', color: '#fff', borderRadius: '20px', padding: '24px', display: 'flex', alignItems: 'center', gap: '16px', boxShadow: '0 8px 16px rgba(46,52,62,0.15)' }}>
                        <div style={{ width: '48px', height: '48px', background: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <Building2 size={24} color="#35D8E6" />
                        </div>
                        <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '4px' }}>
                                <span style={{ fontWeight: 'bold', fontSize: '16px' }}>{m.name}</span>
                                {m.isPrimary && <span style={{ fontSize: '10px', background: 'rgba(53,216,230,0.2)', color: '#35D8E6', padding: '3px 6px', borderRadius: '4px', fontWeight: 'bold' }}>주 계좌</span>}
                            </div>
                            <div style={{ fontSize: '13px', color: '#94A3B8' }}>{m.info}</div>
                        </div>
                    </div>
                ))}
            </div>
        )}

        <button 
           onClick={() => setShowAddMethod(true)}
           style={{ width: '100%', padding: '16px', background: '#fff', border: '2px dashed #CBD5E1', borderRadius: '20px', color: '#1E293B', fontWeight: 'bold', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer', transition: 'all 0.2s' }}>
            <Plus size={20} color="#64748B" /> 새 계좌/카드 연결하기
        </button>

      </div>

      {/* 새 결제수단 바텀시트 */}
      {showAddMethod && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 110, background: 'rgba(0,0,0,0.5)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center' }}>
          <div className="fade-slide-up" style={{ background: '#fff', borderRadius: '24px 24px 0 0', padding: '32px 24px', width: '100%', maxWidth: 'var(--app-width)', paddingBottom: '40px' }}>
             
             {loading ? (
                 <div style={{ textAlign: 'center', padding: '40px 0' }}>
                     <div style={{ width: '40px', height: '40px', border: '4px solid #F1F5F9', borderTop: '4px solid #35D8E6', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 24px' }}></div>
                     <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>오픈뱅킹으로 안전하게<br/>계좌를 연결하고 있어요</h3>
                     <p style={{ fontSize: '14px', color: '#64748B' }}>잠시만 기다려 주세요...</p>
                 </div>
             ) : (
                 <>
                    <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' }}>어떤 은행을 연결할까요?</h3>
                    <p style={{ fontSize: '14px', color: '#64748B', marginBottom: '24px' }}>자주 사용하는 은행을 선택해주세요.</p>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
                        {['신한', '국민', '카카오', '토스', '우리', '농협'].map(bank => (
                            <div key={bank} onClick={() => handleAddBank(bank)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                                <div style={{ width: '56px', height: '56px', background: '#F8FAFC', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #E2E8F0' }}>
                                    <Building2 size={24} color="#64748B" />
                                </div>
                                <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#475569' }}>{bank}</span>
                            </div>
                        ))}
                    </div>

                    <button onClick={() => setShowAddMethod(false)} style={{ width: '100%', padding: '16px', borderRadius: '16px', background: '#F1F5F9', color: '#64748B', border: 'none', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer' }}>취소</button>
                 </>
             )}
          </div>
        </div>
      )}

      {/* 리워드(게이미피케이션) 성공 팝업 모달 */}
      {showReward && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 120, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
          
          <div className="bounce-float-scale" style={{ background: '#fff', borderRadius: '24px', padding: '40px 24px', textAlign: 'center', width: '100%', maxWidth: '320px', position: 'relative', overflow: 'hidden' }}>
             
             {/* 폭죽 대신 빛나는 배경 효과 컨테이너 */}
             <div style={{ position: 'absolute', top: '-50px', left: '-50px', right: '-50px', height: '200px', background: 'radial-gradient(circle, rgba(16,185,129,0.1) 0%, rgba(255,255,255,0) 70%)', zIndex: 0 }}></div>

             <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ width: '80px', height: '80px', background: '#10B981', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', boxShadow: '0 8px 24px rgba(16,185,129,0.3)' }}>
                    <Ticket size={40} color="#fff" />
                </div>
                
                <h2 style={{ fontSize: '22px', fontWeight: '800', marginBottom: '12px', color: '#1E293B', wordBreak: 'keep-all' }}>첫 계좌 연결 성공!</h2>
                <p style={{ fontSize: '15px', color: '#64748B', marginBottom: '24px', lineHeight: '1.5' }}>
                    약속한 선물을 드려요.<br/>
                    어떤 물건을 낙찰받든 <strong>안전결제 수수료가 0원!</strong><br/>
                    부담 없이 마음껏 경매에 참여해 보세요.
                </p>

                <div style={{ background: '#F8FAFC', border: '1px dashed #10B981', padding: '16px', borderRadius: '16px', marginBottom: '24px' }}>
                    <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#10B981' }}>🎁 구매자 안전결제 수수료 100% 무료 쿠폰 x 3장</div>
                    <div style={{ fontSize: '12px', color: '#64748B', marginTop: '4px' }}>낙찰 후 최종 결제 시 자동 적용됩니다.</div>
                </div>

                <button onClick={() => setShowReward(false)} style={{ width: '100%', padding: '16px', borderRadius: '16px', background: '#10B981', color: '#fff', border: 'none', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer', boxShadow: '0 4px 12px rgba(16,185,129,0.2)' }}>
                    선물함 확인하기
                </button>
             </div>

          </div>

          {/* 파티클 이펙트용 */}
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 115, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
             <div className="bounce-float" style={{ position: 'absolute', transform: 'translate(-100px, -150px)', fontSize: '32px' }}>🎊</div>
             <div className="bounce-float" style={{ position: 'absolute', transform: 'translate(120px, -100px)', fontSize: '40px', animationDelay: '0.3s' }}>🎉</div>
             <div className="bounce-float" style={{ position: 'absolute', transform: 'translate(-80px, 120px)', fontSize: '36px', animationDelay: '0.1s' }}>🎟️</div>
             <div className="bounce-float" style={{ position: 'absolute', transform: 'translate(100px, 140px)', fontSize: '28px', animationDelay: '0.5s' }}>✨</div>
          </div>
        </div>
      )}

      {/* 스피너 애니메이션 CSS */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
}
