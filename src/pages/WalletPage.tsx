import { useState } from 'react';
import { ChevronLeft, ShieldAlert, ArrowDownCircle, ArrowUpCircle } from 'lucide-react';

export function WalletPage({ onBack }: { onBack: () => void }) {
  const [activeTab, setActiveTab] = useState<'all' | 'in' | 'out'>('all');

  const transactions = [
    { id: 1, type: '정산완료', title: '다이슨 에어랩 판매금', amount: 350000, date: '오늘 14:20', isPlus: true },
    { id: 2, type: '결제사용', title: '아이패드 프로 11인치 낙찰', amount: -150000, date: '오늘 10:15', isPlus: false },
    { id: 3, type: '보증금홀딩', title: '닌텐도 스위치 OLED 입찰', amount: -20000, date: '어제 19:30', isPlus: false, hold: true },
    { id: 4, type: '계좌충전', title: '신한은행 계좌 (자동충전)', amount: 100000, date: '10.24 12:00', isPlus: true },
  ];

  const filteredTxs = transactions.filter(t => {
    if (activeTab === 'in') return t.isPlus;
    if (activeTab === 'out') return !t.isPlus;
    return true;
  });

  return (
    <>
      <header className="top-header subpage" style={{ backgroundColor: '#fff', zIndex: 50, borderBottom: 'none' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div onClick={onBack} style={{ cursor: 'pointer', paddingRight: '8px' }}>
            <ChevronLeft size={28} color="#2E343E" />
          </div>
          <h1 className="header-title" style={{ fontSize: '20px', margin: 0 }}>깨비머니 상세 내역</h1>
        </div>
      </header>

      <div className="content-area subpage" style={{ paddingTop: '64px', paddingBottom: '100px', background: '#F8FAFC', minHeight: '100vh' }}>
        
        {/* 잔액 종합 상태 카드 */}
        <div style={{ background: '#2E343E', padding: '24px', color: '#fff' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: '#CBD5E1' }}>
            <span>총 깨비머니</span>
          </div>
          <div style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '24px', letterSpacing: '-0.5px' }}>
            1,250,000 <span style={{ fontSize: '18px', fontWeight: 'normal', color: '#94A3B8' }}>원</span>
          </div>

          <div style={{ display: 'flex', gap: '16px', background: 'rgba(255,255,255,0.05)', padding: '16px', borderRadius: '16px' }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '13px', color: '#94A3B8', marginBottom: '4px' }}>가용 금액 (결제/출금 가능)</div>
              <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#35D8E6' }}>1,230,000원</div>
            </div>
            <div style={{ width: '1px', background: 'rgba(255,255,255,0.1)' }}></div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '13px', color: '#94A3B8', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                보증금으로 홀딩 중 <ShieldAlert size={14} color="#F59E0B" />
              </div>
              <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#F59E0B' }}>20,000원</div>
            </div>
          </div>
        </div>

        {/* 바디 내역 */}
        <div style={{ background: '#fff', minHeight: '500px', borderTopLeftRadius: '24px', borderTopRightRadius: '24px', marginTop: '-16px', paddingTop: '24px', paddingBottom: '24px' }}>
            
            {/* 탭 헤더 */}
            <div style={{ display: 'flex', padding: '0 20px', borderBottom: '1px solid #F1F5F9', marginBottom: '16px' }}>
              <div onClick={() => setActiveTab('all')} style={{ flex: 1, textAlign: 'center', padding: '16px 0', fontSize: '15px', fontWeight: activeTab === 'all' ? 'bold' : '500', color: activeTab === 'all' ? '#1E293B' : '#94A3B8', borderBottom: activeTab === 'all' ? '2px solid #1E293B' : '2px solid transparent', cursor: 'pointer' }}>
                전체
              </div>
              <div onClick={() => setActiveTab('in')} style={{ flex: 1, textAlign: 'center', padding: '16px 0', fontSize: '15px', fontWeight: activeTab === 'in' ? 'bold' : '500', color: activeTab === 'in' ? '#1E293B' : '#94A3B8', borderBottom: activeTab === 'in' ? '2px solid #1E293B' : '2px solid transparent', cursor: 'pointer' }}>
                충전/정산
              </div>
              <div onClick={() => setActiveTab('out')} style={{ flex: 1, textAlign: 'center', padding: '16px 0', fontSize: '15px', fontWeight: activeTab === 'out' ? 'bold' : '500', color: activeTab === 'out' ? '#1E293B' : '#94A3B8', borderBottom: activeTab === 'out' ? '2px solid #1E293B' : '2px solid transparent', cursor: 'pointer' }}>
                결제/출금
              </div>
            </div>

            <div style={{ padding: '0 20px' }}>
              {filteredTxs.map((tx) => (
                <div key={tx.id} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px 0', borderBottom: '1px solid #F8FAFC' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: tx.hold ? '#FFFBEB' : tx.isPlus ? '#F0FDF4' : '#FEF2F2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                     {tx.hold ? <ShieldAlert size={20} color="#F59E0B" /> : tx.isPlus ? <ArrowDownCircle size={20} color="#10B981" /> : <ArrowUpCircle size={20} color="#EF4444" />}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '13px', color: '#64748B', marginBottom: '4px' }}>{tx.date}</div>
                    <div style={{ fontSize: '15px', fontWeight: 'bold', color: '#1E293B' }}>{tx.title}</div>
                    <div style={{ fontSize: '13px', color: '#475569', marginTop: '4px' }}>{tx.type}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '16px', fontWeight: 'bold', color: tx.hold ? '#F59E0B' : tx.isPlus ? '#10B981' : '#1E293B' }}>
                      {tx.isPlus ? '+' : '-'}{Math.abs(tx.amount).toLocaleString()}원
                    </div>
                  </div>
                </div>
              ))}
            </div>

        </div>
      </div>
    </>
  );
}
