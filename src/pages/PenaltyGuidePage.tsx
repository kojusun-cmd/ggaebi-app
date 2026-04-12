import { ChevronLeft, ShieldAlert, CheckCircle, XCircle, AlertTriangle } from "lucide-react";

export function PenaltyGuidePage({ onBack }: { onBack: () => void }) {
  return (
    <div style={{ background: '#F8FAFC', minHeight: '100vh', paddingBottom: '40px' }}>
      <header style={{ background: '#fff', padding: '20px', display: 'flex', alignItems: 'center', gap: '8px', zIndex: 50, position: 'sticky', top: 0, boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
        <div onClick={onBack} style={{ cursor: 'pointer', paddingRight: '8px' }}>
          <ChevronLeft size={28} color="#2E343E" />
        </div>
        <h1 style={{ fontSize: '18px', margin: 0, fontWeight: 'bold', color: '#1E293B' }}>안전 거래 페널티 가이드</h1>
      </header>
      
      <div style={{ padding: '24px 20px' }}>
        <div style={{ background: '#fff', padding: '28px 24px', borderRadius: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <ShieldAlert size={28} color="#DC2626" />
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', margin: 0, color: '#1E293B' }}>통합 페널티 시스템</h2>
          </div>
          <p style={{ fontSize: '15px', color: '#475569', lineHeight: 1.6, marginBottom: '20px' }}>
             깨비는 믿고 거래할 수 있는 경매 생태계를 위해 <strong style={{color:'#1E293B'}}>구매와 판매 위반 내역을 하나의 계정에 통합하여 관리</strong>합니다.<br/><br/>
             누적된 페널티는 <strong style={{color:'#DC2626', background:'#FEE2E2', padding: '2px 6px', borderRadius: '4px'}}>매월 1일 자정에 모두 0회로 초기화</strong>됩니다.
          </p>

          <h3 style={{ fontSize: '17px', fontWeight: 'bold', color: '#1E293B', marginBottom: '12px', marginTop: '32px' }}>1. 페널티(경고)는 언제 주어지나요?</h3>
          <div style={{ background: '#F8FAFC', padding: '16px', borderRadius: '12px', marginBottom: '16px', border: '1px solid #E2E8F0' }}>
             <div style={{ fontWeight: 'bold', color: '#0369A1', marginBottom: '8px', fontSize: '14px' }}>🛒 구매자 입장일 때</div>
             <ul style={{ paddingLeft: '20px', margin: 0, color: '#475569', fontSize: '14px', lineHeight: 1.6 }}>
                <li style={{marginBottom: '4px'}}><strong style={{color:'#1E293B'}}>입금 기한 초과:</strong> 낙찰 후 정해진 기한 내에 결제하지 않는 경우 (단순 변심 파기)</li>
                <li><strong style={{color:'#1E293B'}}>일방적 취소:</strong> 낙찰 후 정당한 사유 없이 임의로 거래 파기를 통보하는 경우</li>
             </ul>
             <div style={{ width: '100%', height: '1px', background: '#E2E8F0', margin: '16px 0' }}></div>
             <div style={{ fontWeight: 'bold', color: '#15803D', marginBottom: '8px', fontSize: '14px' }}>📦 판매자 입장일 때</div>
             <ul style={{ paddingLeft: '20px', margin: 0, color: '#475569', fontSize: '14px', lineHeight: 1.6 }}>
                <li style={{marginBottom: '4px'}}><strong style={{color:'#1E293B'}}>발송 지연/거부:</strong> 낙찰자가 입금을 완료했음에도 기한 내에 발송하지 않는 경우</li>
                <li><strong style={{color:'#1E293B'}}>경매 임의 파기:</strong> 이미 입찰자가 발생한 경매를 무단으로 취소하거나 물건 제공을 거부하는 경우</li>
             </ul>
          </div>

          <h3 style={{ fontSize: '17px', fontWeight: 'bold', color: '#1E293B', marginBottom: '12px', marginTop: '32px' }}>2. 어떤 경우에 페널티가 면제되나요?</h3>
          <p style={{ fontSize: '14px', color: '#64748B', marginBottom: '12px', lineHeight: 1.5 }}>피치 못할 사정이나 귀책사유가 없을 때는 고객센터 확인 후 즉시 페널티를 면제받을 수 있습니다.</p>
          <ul style={{ paddingLeft: '20px', margin: 0, color: '#475569', fontSize: '14px', lineHeight: 1.6 }}>
            <li style={{marginBottom: '8px'}}><strong style={{color:'#1E293B'}}>쌍방 합의 취소:</strong> 서로 채팅 합의 하에 거래를 취소하기로 한 경우</li>
            <li style={{marginBottom: '8px'}}><strong style={{color:'#1E293B'}}>상태 불량 및 오안내:</strong> 안내되지 않은 중대한 하자가 발견된 경우 (구매자 면제)</li>
            <li style={{marginBottom: '8px'}}><strong style={{color:'#1E293B'}}>상대방의 무응답:</strong> 결제 후 상대방이 며칠간 어떠한 소통도 불가능한 경우</li>
            <li style={{marginBottom: '0'}}><strong style={{color:'#1E293B'}}>부당한 요구:</strong> 경매 조건에 없던 무리한 할인 요구나 직거래 강요 등을 지속 지시한 경우</li>
          </ul>

          <h3 style={{ fontSize: '17px', fontWeight: 'bold', color: '#1E293B', marginBottom: '12px', marginTop: '32px' }}>3. 월 누적 3회 (삼진아웃) 적용 시?</h3>
          <div style={{ background: '#FEF2F2', padding: '20px', borderRadius: '16px', border: '1px solid #FECACA' }}>
             <p style={{ fontSize: '14px', color: '#991B1B', margin: '0 0 16px 0', lineHeight: 1.6 }}>
               이번 달 총 <strong style={{background:'#FCA5A5', padding:'2px 4px', borderRadius:'4px', color:'#7F1D1D'}}>3회의 통합 페널티</strong>가 누적되면, <strong style={{color:'#7F1D1D'}}>해당 월의 마지막 날까지 앱의 핵심 거래 기능 이용이 전면 정지</strong>됩니다.
             </p>
             <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#DC2626', fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>
                <XCircle size={18} /> 이용 불가능 (정지됨)
             </div>
             <ul style={{ paddingLeft: '20px', margin: '0 0 20px 0', color: '#7F1D1D', fontSize: '13.5px', lineHeight: 1.6 }}>
                <li>신규 상품 경매 등록 및 판매</li>
                <li>모든 경매 상품에 대한 입찰(입금) 참여 불가능</li>
                <li>새로운 채팅방 개설 불가능</li>
             </ul>
             <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#15803D', fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>
                <CheckCircle size={18} /> 조치 가능 (접근 허용)
             </div>
             <ul style={{ paddingLeft: '20px', margin: 0, color: '#166534', fontSize: '13.5px', lineHeight: 1.6 }}>
                <li>진행 중인 '기존 거래'의 배송 확인 및 잔여 채팅</li>
                <li>내 지갑(깨비페이) 잔액을 내 계좌로 일괄 출금/환급</li>
                <li>고객센터 문의 및 페널티 이의 제기</li>
             </ul>
          </div>

          <h3 style={{ fontSize: '17px', fontWeight: 'bold', color: '#1E293B', marginBottom: '12px', marginTop: '32px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <AlertTriangle size={20} color="#EA580C" /> 3진 아웃 없이, 즉시 '영구 정지' 사유
          </h3>
          <p style={{ fontSize: '14px', color: '#64748B', marginBottom: '12px', lineHeight: 1.5 }}>정상적인 생태계를 파괴하는 심각한 위반 행위는 횟수/초기화에 상관없이 <strong>즉각 영구 정지</strong> 처리됩니다.</p>
          <ul style={{ paddingLeft: '20px', margin: 0, color: '#475569', fontSize: '14.5px', lineHeight: 1.6 }}>
            <li style={{marginBottom: '8px'}}><strong style={{color:'#1E293B'}}>사기 행위:</strong> 타인 사진 도용, 물품 미발송 허위 등록, 가품 의도적 판매 등</li>
            <li style={{marginBottom: '8px'}}><strong style={{color:'#1E293B'}}>우회 거래 유도:</strong> 사기를 위해 안전결제(깨비페이)를 거부하고 직접송금을 집요하게 유도하는 행위</li>
            <li style={{marginBottom: '8px'}}><strong style={{color:'#1E293B'}}>매크로 어뷰징:</strong> 불법 프로그램으로 입찰 조작 및 가격 조작을 시도하는 경우 (바람잡이)</li>
            <li style={{marginBottom: '0'}}><strong style={{color:'#1E293B'}}>심각한 커뮤니티 위해:</strong> 타 이용자를 향한 상습적인 욕설, 성희롱, 협박 등 범죄에 준하는 행위</li>
          </ul>

        </div>
      </div>
    </div>
  );
}
