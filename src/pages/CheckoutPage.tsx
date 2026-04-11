import React, { useState } from 'react';
import { ChevronLeft, Info, CheckCircle2, Ticket, CreditCard, Wallet, Sparkles } from 'lucide-react';

interface CheckoutPageProps {
  onBack: () => void;
  item?: any;
  onNavigate?: (page: string, payload?: any) => void;
}

export function CheckoutPage({ onBack, item, onNavigate }: CheckoutPageProps) {
  const [paymentMethod, setPaymentMethod] = useState<'kkaebi' | 'general'>('kkaebi');
  const [useCoupon, setUseCoupon] = useState(false);

  // Fallback item data if not provided
  const title = item?.title || "다이슨 에어랩 상태 A급";
  const itemPriceStr = item?.price || "350000";
  // Remove commas and extract number
  const itemPriceNum = parseInt(itemPriceStr.toString().replace(/,/g, '').replace(/원/g, ''), 10) || 350000;
  
  // Mock User Data
  const kkaebiBalance = 500000;
  const couponCount = 3;

  // Fee Calculation Logic
  // 깨비머니: 2.0%, 일반결제: 3.5%
  const feeRate = paymentMethod === 'kkaebi' ? 0.02 : 0.035;
  const originalFeeAmount = Math.floor(itemPriceNum * feeRate);
  const finalFeeAmount = useCoupon ? 0 : originalFeeAmount;
  
  const totalPrice = itemPriceNum + finalFeeAmount;

  const handlePayment = () => {
    alert('결제가 성공적으로 완료되었습니다! 🎉');
    onBack();
  };

  return (
    <>
      <header className="top-header" style={{ backgroundColor: '#fff', borderBottom: '1px solid #E2E8F0', zIndex: 50 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div onClick={onBack} style={{ cursor: 'pointer', paddingRight: '8px' }}>
            <ChevronLeft size={28} color="#2E343E" />
          </div>
          <h1 className="header-title" style={{ fontSize: '20px' }}>안전 결제하기</h1>
        </div>
      </header>

      <div className="content-area" style={{ paddingTop: '56px', paddingBottom: '120px', background: '#F8FAFC', minHeight: '100vh' }}>
        
        {/* 1. 최종 낙찰 상품 요약 */}
        <div style={{ background: '#fff', padding: '24px 20px', marginBottom: '12px' }}>
          <h2 style={{ fontSize: '15px', color: '#64748B', fontWeight: 'bold', marginBottom: '16px' }}>결제 상품 정보</h2>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '12px', overflow: 'hidden', background: '#E2E8F0 flex-shrink-0' }}>
              <img 
                src={item?.img || "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?fit=crop&w=400&h=400"} 
                alt="상품 이미지" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div>
              <div style={{ fontSize: '13px', color: '#10B981', fontWeight: 'bold', marginBottom: '4px' }}>최고가 낙찰 성공</div>
              <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#1E293B', marginBottom: '4px' }}>{title}</div>
              <div style={{ fontSize: '18px', fontWeight: '900', color: '#0F172A' }}>{itemPriceNum.toLocaleString()}원</div>
            </div>
          </div>
        </div>

        {/* 2. 결제 수단 선택 (핵심: 2% vs 3.5% 차등 노출) */}
        <div style={{ background: '#fff', padding: '24px 20px', marginBottom: '12px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1E293B', marginBottom: '16px' }}>결제 수단 선택</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {/* 깨비 결제 옵션 */}
            <div 
              onClick={() => setPaymentMethod('kkaebi')}
              style={{ 
                border: paymentMethod === 'kkaebi' ? '2px solid #10B981' : '1px solid #E2E8F0', 
                background: paymentMethod === 'kkaebi' ? '#F0FDF4' : '#fff',
                padding: '16px', borderRadius: '16px', cursor: 'pointer', transition: 'all 0.2s',
                display: 'flex', gap: '12px', alignItems: 'center', position: 'relative'
              }}
            >
              <div style={{ width: '24px', height: '24px', borderRadius: '50%', border: paymentMethod === 'kkaebi' ? '6px solid #10B981' : '2px solid #CBD5E1', background: '#fff', flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <Wallet size={18} color="#10B981" />
                  <span style={{ fontWeight: 'bold', fontSize: '16px', color: '#064E3B' }}>깨비머니 간편결제</span>
                  <span style={{ fontSize: '11px', background: '#10B981', color: '#fff', padding: '2px 6px', borderRadius: '6px', fontWeight: 'bold' }}>수수료 2.0% (파격할인)</span>
                </div>
                <div style={{ fontSize: '13px', color: '#475569' }}>
                  잔액 {kkaebiBalance.toLocaleString()}원 <span style={{ color: '#94A3B8' }}>(부족 시 자동 충전)</span>
                </div>
              </div>
            </div>

            {/* 일반 카드 결제 옵션 */}
            <div 
              onClick={() => setPaymentMethod('general')}
              style={{ 
                border: paymentMethod === 'general' ? '2px solid #334155' : '1px solid #E2E8F0', 
                background: paymentMethod === 'general' ? '#F8FAFC' : '#fff',
                padding: '16px', borderRadius: '16px', cursor: 'pointer', transition: 'all 0.2s',
                display: 'flex', gap: '12px', alignItems: 'center'
              }}
            >
              <div style={{ width: '24px', height: '24px', borderRadius: '50%', border: paymentMethod === 'general' ? '6px solid #334155' : '2px solid #CBD5E1', background: '#fff', flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <CreditCard size={18} color="#475569" />
                  <span style={{ fontWeight: 'bold', fontSize: '16px', color: '#1E293B' }}>일반 신용/체크카드</span>
                  <span style={{ fontSize: '11px', background: '#E2E8F0', color: '#64748B', padding: '2px 6px', borderRadius: '6px', fontWeight: 'bold' }}>표준 수수료 3.5%</span>
                </div>
                <div style={{ fontSize: '13px', color: '#64748B' }}>
                  네이버페이, 카카오페이, 일반 카드 결제
                </div>
              </div>
            </div>
          </div>
          
          <div style={{ marginTop: '16px', padding: '12px', background: '#EEF2FF', borderRadius: '8px', display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
            <Info size={16} color="#4F46E5" style={{ flexShrink: 0, marginTop: '2px' }} />
            <p style={{ margin: 0, fontSize: '12px', color: '#3730A3', lineHeight: 1.5 }}>
              <b>왜 수수료가 다른가요?</b> 일반 카드 결제 시 카드사에 납부할 원가가 발생합니다. <br/>계좌 기반의 <b>깨비머니를 이용하시면 절감된 원가 혜택을 수수료 파격 할인으로 돌려드립니다!</b>
            </p>
          </div>
        </div>

        {/* 3. 할인 및 쿠폰 적용 */}
        <div style={{ background: '#fff', padding: '24px 20px', marginBottom: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1E293B', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Ticket size={20} color="#F59E0B" /> 쿠폰 적용
            </h2>
            <div style={{ fontSize: '13px', color: '#F59E0B', fontWeight: 'bold', background: '#FEF3C7', padding: '4px 8px', borderRadius: '6px' }}>
              보유 수량: {couponCount}장
            </div>
          </div>

          <div style={{ 
              border: useCoupon ? '2px solid #F59E0B' : '1px solid #E2E8F0',
              background: useCoupon ? '#FFFBEB' : '#fff',
              padding: '16px', borderRadius: '12px',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              cursor: 'pointer', transition: 'all 0.2s'
            }}
            onClick={() => setUseCoupon(!useCoupon)}
          >
            <div>
              <div style={{ fontWeight: 'bold', fontSize: '15px', color: '#B45309', marginBottom: '4px' }}>구매자 안전결제 수수료 무료 쿠폰</div>
              <div style={{ fontSize: '13px', color: '#D97706' }}>결제 수단과 무관하게 수수료 전액 면제!</div>
            </div>
            <div style={{ width: '24px', height: '24px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: useCoupon ? '#F59E0B' : '#E2E8F0' }}>
              <CheckCircle2 size={16} color="#fff" />
            </div>
          </div>
        </div>

        {/* 4. 최종 결제 금액 산출 */}
        <div style={{ background: '#fff', padding: '24px 20px', marginBottom: '12px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1E293B', marginBottom: '20px' }}>결제 상세 내역</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '15px', color: '#475569' }}>
              <span>상품 낙찰가</span>
              <span style={{ fontWeight: 'bold', color: '#1E293B' }}>{itemPriceNum.toLocaleString()}원</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '15px', color: '#475569' }}>
              <span>안전결제 수수료 
                <span style={{ marginLeft: '6px', fontSize: '11px', background: '#F1F5F9', padding: '2px 6px', borderRadius: '4px' }}>
                  {paymentMethod === 'kkaebi' ? '깨비머니 2.0%' : '일반결제 3.5%'}
                </span>
              </span>
              <span style={{ color: '#1E293B' }}>{originalFeeAmount.toLocaleString()}원</span>
            </div>
            
            {useCoupon && (
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '15px', color: '#EF4444', fontWeight: 'bold' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Sparkles size={14} /> 무료 쿠폰 적용 할인</span>
                <span>-{originalFeeAmount.toLocaleString()}원</span>
              </div>
            )}
          </div>
          
          <div style={{ borderTop: '2px dashed #E2E8F0', margin: '20px 0' }} />
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#1E293B' }}>총 결제 금액</span>
            <span style={{ fontSize: '26px', fontWeight: '900', color: '#10B981' }}>{totalPrice.toLocaleString()}원</span>
          </div>
        </div>

      </div>

      {/* 5. 고정 하단 결제 버튼 */}
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0,
        background: '#fff', padding: '16px 20px 32px 20px', 
        borderTop: '1px solid #E2E8F0', boxShadow: '0 -4px 12px rgba(0,0,0,0.05)',
        zIndex: 100
      }}>
        <button 
          onClick={handlePayment}
          style={{
            width: '100%', padding: '16px', borderRadius: '16px',
            background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
            color: '#fff', fontSize: '18px', fontWeight: 'bold', border: 'none',
            boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)', cursor: 'pointer',
            display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px'
          }}
        >
          {totalPrice.toLocaleString()}원 결제하기
        </button>
      </div>

    </>
  );
}
