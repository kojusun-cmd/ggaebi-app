import React, { useState } from 'react';
import { X, AlertTriangle } from 'lucide-react';

interface BiddingBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  item: any;
  onBidSubmit?: (amount: number) => void;
}

export function BiddingBottomSheet({ isOpen, onClose, item, onBidSubmit }: BiddingBottomSheetProps) {
  // 예시 가격 처리
  const desiredPriceStr = item?.price ? item.price : "850,000";
  const desiredPrice = parseInt(desiredPriceStr.toString().replace(/,/g, '').replace('원', ''));
  // 현재 최고 제안가 (없으면 0원)
  const currentHighestBid = item?.highestBid !== undefined ? item.highestBid : Math.floor(desiredPrice * 0.8 / 10000) * 10000; 

  // 사용자가 원하신 금액 버튼 설정 규칙
  const isHighPriced = desiredPrice >= 100000;
  const step1 = isHighPriced ? 1000 : 100;
  const step2 = isHighPriced ? 10000 : 1000;
  const step3 = isHighPriced ? 50000 : 5000;

  // 초기 제안 금액은 최고 제안가가 있으면 거기서부터, 없으면 희망가의 절반 정도부터 시작
  const initialBid = currentHighestBid > 0 ? currentHighestBid : Math.floor(desiredPrice / 2);
  const [bidAmount, setBidAmount] = useState<number>(initialBid);

  if (!isOpen) return null;

  const handleAdjust = (amount: number) => {
    setBidAmount(prev => {
      const newVal = prev + amount;
      return newVal < 0 ? 0 : newVal; // 최소 0원
    });
  };

  const handleBidSubmit = () => {
    if (bidAmount <= 0) return;

    alert(`${bidAmount.toLocaleString()}원으로 찔러보기(제안)를 완료했습니다!\n\n※ 판매자가 가격을 확인하고 수락을 결정합니다.`);
    if (onBidSubmit) onBidSubmit(bidAmount);
    onClose();
  };

  const canSubmit = bidAmount > 0;

  return (
    <>
      <div 
        style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(30, 41, 59, 0.7)', zIndex: 9998, backdropFilter: 'blur(3px)' }} 
        onClick={onClose}
      />
      <div 
        style={{
          position: 'fixed', bottom: 0, left: '50%', transform: 'translate(-50%, 0)', width: '100%', maxWidth: 'var(--app-width, 420px)', 
          backgroundColor: '#fff', borderTopLeftRadius: '28px', borderTopRightRadius: '28px',
          padding: '24px', paddingBottom: 'calc(24px + env(safe-area-inset-bottom))', zIndex: 9999,
          animation: 'slideUpCenter 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          boxShadow: '0 -10px 40px rgba(0,0,0,0.1)',
          maxHeight: '90vh', overflowY: 'auto'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '900', color: '#1E293B', margin: 0 }}>
            ✨ 가격 찔러보기
          </h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', padding: '4px', cursor: 'pointer' }}>
            <X size={24} color="#94A3B8" />
          </button>
        </div>

        <div style={{ fontSize: '14px', color: '#64748B', marginBottom: '20px', lineHeight: '1.5' }}>
          자유롭게 금액을 조절해서 판매자에게 제안해 보세요!<br/>
          (판매자는 원하지 않는 제안 알림을 끌 수 있습니다)
        </div>

        {/* 판매자 희망가 & 현재 최고 제안가 패널 */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
          <div style={{ flex: 1, background: '#F8FAFC', borderRadius: '16px', padding: '16px', border: '1px solid #E2E8F0' }}>
            <div style={{ fontSize: '12px', color: '#64748B', fontWeight: 'bold', marginBottom: '4px' }}>판매자 희망가</div>
            <div style={{ fontSize: '16px', color: '#0F172A', fontWeight: '900' }}>{desiredPrice.toLocaleString()}원</div>
          </div>
          <div style={{ flex: 1, background: '#F0F9FF', borderRadius: '16px', padding: '16px', border: '1px solid #BAE6FD' }}>
            <div style={{ fontSize: '12px', color: '#0369A1', fontWeight: 'bold', marginBottom: '4px' }}>현재 최고 제안가</div>
            <div style={{ fontSize: '16px', color: '#0284C7', fontWeight: '900' }}>{currentHighestBid > 0 ? `${currentHighestBid.toLocaleString()}원` : '없음'}</div>
          </div>
        </div>

        {/* 버튼식 금액 조절 UI (수동 입력 금지) */}
        <div style={{ background: '#F8FAFC', borderRadius: '24px', padding: '24px 16px', marginBottom: '24px', border: '1px solid #E2E8F0', textAlign: 'center' }}>
          <div style={{ fontSize: '13px', color: '#64748B', fontWeight: 'bold', marginBottom: '12px' }}>나의 제안 금액 설정</div>
          
          <div style={{ fontSize: '40px', fontWeight: '900', color: '#0F172A', marginBottom: '28px', fontFamily: 'Pretendard', letterSpacing: '-1px' }}>
            {bidAmount.toLocaleString()} <span style={{ fontSize: '24px' }}>원</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {/* 플러스 버튼 열 */}
            <div style={{ display: 'flex', gap: '8px' }}>
              <button onClick={() => handleAdjust(step1)} style={controlBtnStyle(true)}>+ {formatAmt(step1)}</button>
              <button onClick={() => handleAdjust(step2)} style={controlBtnStyle(true)}>+ {formatAmt(step2)}</button>
              <button onClick={() => handleAdjust(step3)} style={controlBtnStyle(true)}>+ {formatAmt(step3)}</button>
            </div>
            {/* 마이너스 버튼 열 */}
            <div style={{ display: 'flex', gap: '8px' }}>
              <button onClick={() => handleAdjust(-step1)} style={controlBtnStyle(false)}>- {formatAmt(step1)}</button>
              <button onClick={() => handleAdjust(-step2)} style={controlBtnStyle(false)}>- {formatAmt(step2)}</button>
              <button onClick={() => handleAdjust(-step3)} style={controlBtnStyle(false)}>- {formatAmt(step3)}</button>
            </div>
          </div>
        </div>

        {/* Warning Panel */}
        <div style={{ background: '#FEF2F2', padding: '16px 20px', borderRadius: '20px', display: 'flex', gap: '12px', alignItems: 'flex-start', marginBottom: '24px' }}>
          <AlertTriangle size={20} color="#DC2626" style={{ flexShrink: 0, marginTop: '2px' }} />
          <div>
            <div style={{ fontSize: '13px', color: '#991B1B', fontWeight: 'bold', marginBottom: '6px' }}>장난성 찌르기 주의</div>
            <div style={{ fontSize: '12px', color: '#B91C1C', lineHeight: '1.6' }}>
              너무 무리한 가격을 제안하거나, 낙찰된 후 거래를 파기하면 <strong>서비스 이용이 제한</strong>될 수 있습니다.
            </div>
          </div>
        </div>

        <button 
          onClick={handleBidSubmit}
          disabled={!canSubmit}
          style={{ 
            width: '100%', padding: '18px', borderRadius: '16px', 
            background: canSubmit ? 'linear-gradient(135deg, #10B981 0%, #059669 100%)' : '#CBD5E1', 
            color: '#fff', border: 'none', fontWeight: '900', fontSize: '18px', 
            display: 'flex', alignItems: 'center', justifyContent: 'center', 
            cursor: canSubmit ? 'pointer' : 'not-allowed', 
            boxShadow: canSubmit ? '0 8px 20px rgba(16, 185, 129, 0.3)' : 'none',
            transition: 'all 0.2s',
            transform: canSubmit ? 'scale(1)' : 'scale(0.98)'
          }}
        >
          {bidAmount.toLocaleString()}원 제안하기
        </button>

      </div>
    </>
  );
}

// ---------------- UI Helper Functions ----------------
function formatAmt(num: number) {
  if (num >= 10000) return `${Math.floor(num/10000)}만`;
  return `${num.toLocaleString()}`;
}

function controlBtnStyle(isPlus: boolean): React.CSSProperties {
  return {
    flex: 1, 
    padding: '14px 0', 
    borderRadius: '14px', 
    background: isPlus ? '#F0F9FF' : '#F8FAFC', 
    border: `1px solid ${isPlus ? '#BAE6FD' : '#E2E8F0'}`, 
    color: isPlus ? '#0369A1' : '#475569', 
    fontWeight: 'bold', 
    fontSize: '15px', 
    cursor: 'pointer', 
    transition: 'background 0.1s, transform 0.1s',
    userSelect: 'none'
  };
}
