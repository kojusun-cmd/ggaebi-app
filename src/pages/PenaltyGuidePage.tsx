import { ChevronLeft, ShieldAlert } from "lucide-react";

export function PenaltyGuidePage({ onBack }: { onBack: () => void }) {
    return (
    <>
      <header className="top-header" style={{ backgroundColor: '#DC2626', zIndex: 50, borderBottom: 'none' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div onClick={onBack} style={{ cursor: 'pointer', paddingRight: '8px' }}>
            <ChevronLeft size={28} color="#fff" />
          </div>
          <h1 className="header-title" style={{ fontSize: '18px', color: '#fff' }}>깨비 패널티 안내</h1>
        </div>
      </header>
      <div className="content-area" style={{ paddingTop: '56px', paddingBottom: '40px', background: '#FEF2F2', minHeight: '100vh' }}>
        <div style={{ padding: '32px 20px', background: '#DC2626', color: '#fff', borderBottomLeftRadius: '24px', borderBottomRightRadius: '24px', boxShadow: '0 4px 12px rgba(220,38,38,0.2)' }}>
          <ShieldAlert size={48} color="#fff" style={{ marginBottom: '16px' }} />
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }}>합의 기반의 유연한<br/>삼진아웃 제도</h2>
          <p style={{ fontSize: '14px', opacity: 0.9, lineHeight: 1.5 }}>
            깨비 마켓은 시스템의 일방적인 개입보다는 당사자 간의 소통을 통한 문제 해결을 권장합니다. 판매자로부터 받은 경고가 <strong>월 3회 누적</strong>될 경우 계정이 정지됩니다. (매월 1일 갱신)
          </p>
        </div>

        <div style={{ padding: '24px 20px' }}>
          <div style={{ background: '#fff', borderRadius: '16px', padding: '20px', marginBottom: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', borderLeft: '4px solid #10B981' }}>
            <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#1E293B', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ background: '#D1FAE5', color: '#059669', padding: '2px 8px', borderRadius: '4px', fontSize: '12px' }}>패널티 면제</span> 합의를 통한 낙찰 취소
            </div>
            <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.5 }}>단순 변심이나 상품 오해 시 채팅을 통해 판매자에게 양해를 구하세요. 판매자가 '경고 적용'을 체크 해제하고 취소해주면 패널티 없이 마무리됩니다.</p>
          </div>

          <div style={{ background: '#fff', borderRadius: '16px', padding: '20px', marginBottom: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', borderLeft: '4px solid #F59E0B' }}>
            <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#1E293B', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ background: '#FEF3C7', color: '#D97706', padding: '2px 8px', borderRadius: '4px', fontSize: '12px' }}>경고 1회</span> 판매자 직권의 패널티 부여
            </div>
            <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.5 }}>무리한 요구가 있거나, <strong>24시간 연락 두절(노쇼)</strong> 시 판매자가 직권으로 '낙찰 파기 경고'를 포함해 취소합니다. 내 프로필 옆에 파기 꼬리표가 한 달간 노출됩니다.</p>
            <div style={{ marginTop: '12px', padding: '12px', background: '#F8FAFC', borderRadius: '8px', fontSize: '13px', color: '#64748B' }}>
              💬 억울한 패널티인가요? 관리자 이의 제기로 바로 잡을 수 있습니다!
            </div>
          </div>

          <div style={{ background: '#fff', borderRadius: '16px', padding: '20px', marginBottom: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', borderLeft: '4px solid #EF4444' }}>
            <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#1E293B', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ background: '#FEE2E2', color: '#DC2626', padding: '2px 8px', borderRadius: '4px', fontSize: '12px' }}>이용 제한</span> 월 누적 3회 삼진아웃
            </div>
            <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.5 }}>판매자로부터 받은 경고가 해당 월에 총 3회 누적되면, 앱 커뮤니티의 질서를 위해 시스템 차원의 강력한 제재(이용 정지 등)가 즉각 발동됩니다.</p>
          </div>
          
          <div style={{ background: '#fff', borderRadius: '16px', padding: '20px', marginBottom: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', borderLeft: '4px solid #7F1D1D' }}>
            <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#1E293B', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ background: '#7F1D1D', color: '#fff', padding: '2px 8px', borderRadius: '4px', fontSize: '12px' }}>즉시 정지</span> 사기 및 가품 판매
            </div>
            <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.5 }}>합의 여부나 규칙에 상관없이 <strong>가품 허위 판매, 벽돌 배송, 금전 갈취 등의 사기 행위 적발 시 그 즉시 계정 연동 및 가입이 영구 차단</strong> 되며 고발 조치됩니다.</p>
          </div>
        </div>
      </div>
    </>
    );
}
