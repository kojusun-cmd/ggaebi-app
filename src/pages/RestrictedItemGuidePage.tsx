import { ChevronLeft } from "lucide-react";

export function RestrictedItemGuidePage({ onBack }: { onBack: () => void }) {
    return (
    <>
      <header className="top-header subpage" style={{ backgroundColor: '#fff', zIndex: 50, borderBottom: '1px solid #E2E8F0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div onClick={onBack} style={{ cursor: 'pointer', paddingRight: '8px' }}>
            <ChevronLeft size={28} color="#2E343E" />
          </div>
          <h1 className="header-title" style={{ fontSize: '18px' }}>경매 거래 금지 품목</h1>
        </div>
      </header>
      <div className="content-area subpage" style={{ paddingTop: '56px', paddingBottom: '40px', background: '#F8FAFC', minHeight: '100vh', padding: '76px 20px 40px 20px' }}>
        
        <p style={{ fontSize: '14px', color: '#64748B', lineHeight: 1.5, marginBottom: '24px' }}>
          안전하고 깨끗한 경매 환경을 위해 아래 품목은 <strong>등록이 엄격히 금지</strong>됩니다. 발견 시 즉시 블라인드 처리 및 패널티가 부과될 수 있습니다.
        </p>

        <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#1E293B', marginBottom: '12px' }}>🚫 엄격 금지 항목 (형사조치 가능)</h3>
        <ul style={{ background: '#fff', borderRadius: '16px', padding: '16px 24px', margin: 0, color: '#475569', fontSize: '14px', lineHeight: 1.8, marginBottom: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
          <li>가품 / 레플리카 / 복제품 (명품, 피규어 등)</li>
          <li><strong>주류 및 담배류 (모든 종류의 주류, 수제 담금주, 전자담배 기기 포함)</strong></li>
          <li>도난 물품 및 습득한 분실물</li>
          <li>전문의약품 강제 처방전 및 의료기기 (영양제, 도수 렌즈 포함)</li>
          <li>총기류, 도검류, 폭발물 등 무기류</li>
          <li>개인정보가 포함된 티켓, 신분증, 암호화폐 지갑</li>
        </ul>

        <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#1E293B', marginBottom: '12px' }}>⚠️ 조건부 허용 항목 (가이드라인 준수 필수)</h3>
        <ul style={{ background: '#fff', borderRadius: '16px', padding: '16px 24px', margin: 0, color: '#475569', fontSize: '14px', lineHeight: 1.8, boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
          <li><strong>하이엔드 명품 (시작가 100만 원 이상):</strong> 영수증, 공식 보증서, 외부 인증 사진 필수</li>
          <li><strong>수제 식음료 및 가공식품:</strong> 유통기한 명시된 미개봉 가공식품 한정 (수제품은 영업신고증 필요)</li>
          <li><strong>반려동물 및 생명체:</strong> 금전적 '경매' 불가. 100% 무료 분양이나 관련 용품에 한함</li>
        </ul>
      </div>
    </>
    );
}
