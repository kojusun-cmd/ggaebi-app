import { useState } from 'react';
import { ChevronLeft, Users, Eye, Heart, Sparkles } from 'lucide-react';
import { FEED_ITEMS } from '../data/mockProducts';

export function SalesHistoryPage({ onBack, onNavigate }: { onBack: () => void, onNavigate: (page: string, item?: any) => void }) {
  const [activeTab, setActiveTab] = useState<'selling' | 'waiting' | 'done'>('selling');

  // Mock selling items
  const currentSelling = FEED_ITEMS.slice(6, 8);
  const waitingItems = [FEED_ITEMS[4]];
  const doneItems = [FEED_ITEMS[5]];

  return (
    <>
      <header className="top-header" style={{ backgroundColor: '#fff', zIndex: 50, borderBottom: 'none' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div onClick={onBack} style={{ cursor: 'pointer', paddingRight: '8px' }}>
            <ChevronLeft size={28} color="#2E343E" />
          </div>
          <h1 className="header-title" style={{ fontSize: '20px', margin: 0 }}>최고가 갱신중 (나의 판매)</h1>
        </div>
      </header>
      
      {/* 탭 헤더 */}
      <div style={{ display: 'flex', padding: '0 20px', background: '#fff', borderBottom: '1px solid #F1F5F9', position: 'sticky', top: '56px', zIndex: 40 }}>
        <div onClick={() => setActiveTab('selling')} style={{ flex: 1, textAlign: 'center', padding: '16px 0', fontSize: '15px', fontWeight: activeTab === 'selling' ? 'bold' : '500', color: activeTab === 'selling' ? '#F59E0B' : '#94A3B8', borderBottom: activeTab === 'selling' ? '3px solid #F59E0B' : '3px solid transparent', cursor: 'pointer' }}>
          경매 진행 중
        </div>
        <div onClick={() => setActiveTab('waiting')} style={{ flex: 1, textAlign: 'center', padding: '16px 0', fontSize: '15px', fontWeight: activeTab === 'waiting' ? 'bold' : '500', color: activeTab === 'waiting' ? '#F59E0B' : '#94A3B8', borderBottom: activeTab === 'waiting' ? '3px solid #F59E0B' : '3px solid transparent', cursor: 'pointer' }}>
          결제 대기
        </div>
        <div onClick={() => setActiveTab('done')} style={{ flex: 1, textAlign: 'center', padding: '16px 0', fontSize: '15px', fontWeight: activeTab === 'done' ? 'bold' : '500', color: activeTab === 'done' ? '#F59E0B' : '#94A3B8', borderBottom: activeTab === 'done' ? '3px solid #F59E0B' : '3px solid transparent', cursor: 'pointer' }}>
          정산 완료
        </div>
      </div>

      <div className="content-area" style={{ paddingBottom: '100px', background: '#F8FAFC', minHeight: '100vh', paddingTop: '24px' }}>
        
        {activeTab === 'selling' && (
          <div style={{ padding: '0 20px' }}>
            {currentSelling.map((item, index) => (
              <div key={item.id} className="fade-slide-up" style={{ background: '#fff', borderRadius: '24px', padding: '20px', marginBottom: '20px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', animationDelay: `${index * 100}ms` }}>
                {/* 실시간 헤더 */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <div className="pulse-glow" style={{ background: '#FFFBEB', color: '#D97706', padding: '6px 12px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold' }}>
                    🔥 실시간 입찰 갱신 중!
                  </div>
                  <div style={{ fontSize: '12px', color: '#64748B', fontWeight: '500' }}>남은 시간: 1시간 40분</div>
                </div>

                <div style={{ display: 'flex', gap: '16px', marginBottom: '16px', cursor: 'pointer' }} onClick={() => onNavigate('detail', item)}>
                  <div style={{ width: '80px', height: '80px', borderRadius: '12px', overflow: 'hidden', flexShrink: 0 }}>
                    <img src={item.img} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#1E293B', marginBottom: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.title}</div>
                    <div style={{ fontSize: '18px', fontWeight: '900', color: '#F59E0B', whiteSpace: 'nowrap', letterSpacing: '-0.5px' }}>현재 최고가: {item.price}</div>
                  </div>
                </div>

                {/* 실시간 현황 통계 */}
                <div style={{ display: 'flex', justifyContent: 'space-between', background: '#F8FAFC', padding: '16px', borderRadius: '16px', marginBottom: '16px' }}>
                  <div style={{ textAlign: 'center', flex: 1 }}>
                    <Users size={20} color="#94A3B8" style={{ margin: '0 auto 4px' }} />
                    <div style={{ fontSize: '15px', fontWeight: 'bold', color: '#1E293B' }}>{(item as any).bidders}명</div>
                    <div style={{ fontSize: '11px', color: '#64748B' }}>입찰 참여</div>
                  </div>
                  <div style={{ width: '1px', background: '#E2E8F0', margin: '0 8px' }}></div>
                  <div style={{ textAlign: 'center', flex: 1 }}>
                    <Heart size={20} color="#EF4444" style={{ margin: '0 auto 4px' }} />
                    <div style={{ fontSize: '15px', fontWeight: 'bold', color: '#1E293B' }}>42개</div>
                    <div style={{ fontSize: '11px', color: '#64748B' }}>하트(찜)</div>
                  </div>
                  <div style={{ width: '1px', background: '#E2E8F0', margin: '0 8px' }}></div>
                  <div style={{ textAlign: 'center', flex: 1 }}>
                    <Eye size={20} color="#94A3B8" style={{ margin: '0 auto 4px' }} />
                    <div style={{ fontSize: '15px', fontWeight: 'bold', color: '#1E293B' }}>845회</div>
                    <div style={{ fontSize: '11px', color: '#64748B' }}>조회수</div>
                  </div>
                </div>

                {/* AI 오리 비서 컨설팅 */}
                <div style={{ background: '#EEF2FF', borderRadius: '16px', padding: '16px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <div style={{ fontSize: '24px' }}>🦆</div>
                  <div>
                    <div style={{ fontSize: '13px', color: '#4338CA', fontWeight: 'bold', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Sparkles size={14} /> AI 오리 비서의 팁!
                    </div>
                    <div style={{ fontSize: '13px', color: '#312E81', marginBottom: '12px', lineHeight: 1.4 }}>
                      "사진 1장만 더 밝게 추가하고 제목에 [미개봉]을 쓰면 입찰 확률이 30% 올라가꽥!"
                    </div>
                    <button style={{ padding: '8px 16px', background: '#4F46E5', color: '#fff', borderRadius: '8px', fontSize: '12px', fontWeight: 'bold', border: 'none', cursor: 'pointer', boxShadow: '0 2px 8px rgba(79, 70, 229, 0.3)' }}>
                      ⚡ 1초만에 제안 적용하기
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'waiting' && (
          <div style={{ padding: '0 20px' }}>
            {waitingItems.map((item, index) => (
              <div key={item.id} className="fade-slide-up" style={{ background: '#fff', borderRadius: '24px', padding: '20px', marginBottom: '20px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', animationDelay: `${index * 100}ms` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <div className="pulse-glow" style={{ background: '#FEF2F2', color: '#EF4444', padding: '6px 12px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold' }}>
                    ⏳ 결제 대기 중
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px', marginBottom: '16px', cursor: 'pointer' }} onClick={() => onNavigate('detail', item)}>
                  <div style={{ width: '80px', height: '80px', borderRadius: '12px', overflow: 'hidden', flexShrink: 0 }}>
                    <img src={item.img} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#1E293B', marginBottom: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.title}</div>
                    <div style={{ fontSize: '18px', fontWeight: '900', color: '#F59E0B', whiteSpace: 'nowrap', letterSpacing: '-0.5px' }}>낙찰가: {item.price}</div>
                  </div>
                </div>

                <div style={{ background: '#F8FAFC', borderRadius: '16px', padding: '16px', textAlign: 'center' }}>
                  <div style={{ fontSize: '14px', color: '#475569', marginBottom: '12px' }}>구매자가 아직 결제하지 않았어요!</div>
                  <button style={{ width: '100%', padding: '12px', background: '#3B82F6', color: '#fff', borderRadius: '12px', fontSize: '14px', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}>
                    💬 구매자에게 찌르기 (독촉)
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'done' && (
          <div style={{ padding: '0 20px' }}>
            {doneItems.map((item, index) => (
              <div key={item.id} className="fade-slide-up" style={{ background: '#fff', borderRadius: '24px', padding: '20px', marginBottom: '20px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', animationDelay: `${index * 100}ms` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <div style={{ background: '#ECFDF5', color: '#10B981', padding: '6px 12px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold' }}>
                    💸 정산 완료
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px', marginBottom: '16px', cursor: 'pointer' }} onClick={() => onNavigate('detail', item)}>
                  <div style={{ width: '80px', height: '80px', borderRadius: '12px', overflow: 'hidden', flexShrink: 0 }}>
                    <img src={item.img} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#1E293B', marginBottom: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.title}</div>
                    <div style={{ fontSize: '18px', fontWeight: '900', color: '#10B981', whiteSpace: 'nowrap', letterSpacing: '-0.5px' }}>최종 정산: {item.price}</div>
                  </div>
                </div>

                <div style={{ background: '#F8FAFC', borderRadius: '16px', padding: '16px', textAlign: 'center' }}>
                  <div style={{ fontSize: '14px', color: '#475569', marginBottom: '12px', fontWeight: '500' }}>에스크로를 통해 안전하게 입금되었습니다.</div>
                  <button style={{ width: '100%', padding: '12px', background: '#F1F5F9', color: '#64748B', borderRadius: '12px', fontSize: '14px', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}>
                    영수증 보기
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </>
  );
}
