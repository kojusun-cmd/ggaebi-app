import { ChevronLeft } from "lucide-react";

export function NotificationPage({ onBack }: { onBack: () => void }) {
    const notis = [
            { type: 'auction_win', icon: '🎉', title: '경매 낙찰 성공!', desc: '축하합니다! [에어팟 프로 2세대]를 180,000원에 낙찰 받으셨습니다. 빠른결제 전용 깨비머니로 즉시 결제를 진행해주세요.', time: '방금 전', bg: '#EFF6FF', dot: true },
            { type: 'penalty', icon: '🚨', title: '낙찰 파기 경고 1회 누적', desc: '[로지텍 마우스] 낙찰 불이행(노쇼)으로 판매자로부터 패널티 경고 1회가 부여되었습니다. (현재 월 누적 1회)', time: '2시간 전', bg: '#FEF2F2', dot: true },
            { type: 'outbid', icon: '💸', title: '입찰가 추월 알림', desc: '아쉽네요! [나이키 조던 1] 입찰이 추월당했습니다. 현재 최고가: 83,000원', time: '1일 전', bg: '#fff', dot: false },
            { type: 'notice', icon: '🔔', title: '찜한 경매 마감 임박', desc: '관심 등록하신 [아이패드 프로 5세대] 경매가 5분 뒤 종료됩니다!', time: '2일 전', bg: '#fff', dot: false }
          ];
    return (
    <>
      <header className="top-header subpage" style={{ backgroundColor: '#fff', zIndex: 50, borderBottom: '1px solid #E2E8F0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div onClick={onBack} style={{ cursor: 'pointer', paddingRight: '8px' }}>
            <ChevronLeft size={28} color="#2E343E" />
          </div>
          <h1 className="header-title" style={{ fontSize: '18px' }}>알림 메세지</h1>
        </div>
      </header>
      <div className="content-area subpage" style={{ paddingTop: '56px', paddingBottom: '40px', background: '#F8FAFC', minHeight: '100vh' }}>
        {notis.map((noti, idx) => (
          <div key={idx} style={{ padding: '16px 20px', background: noti.bg, borderBottom: '1px solid #F1F5F9', position: 'relative', cursor: 'pointer' }}>
            {noti.dot && <div style={{ position: 'absolute', top: '24px', left: '10px', width: '6px', height: '6px', borderRadius: '50%', background: '#EF4444' }} />}
            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{ fontSize: '24px', flexShrink: 0, marginTop: '2px' }}>{noti.icon}</div>
              <div style={{ flex: 1 }}>
                <h4 style={{ fontSize: '15px', fontWeight: 'bold', color: '#1E293B', marginBottom: '4px' }}>{noti.title}</h4>
                <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.5, marginBottom: '8px' }}>{noti.desc}</p>
                <div style={{ fontSize: '12px', color: '#94A3B8' }}>{noti.time}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
    );
}
