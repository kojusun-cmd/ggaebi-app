import { ChevronLeft, Search, Flame, Clock, Sparkles } from "lucide-react";
import { useState } from "react";
import { FEED_ITEMS } from "../data/mockData";
import { FeedItemCard } from "../components/FeedItemCard";

export function SearchPage({ onNavigate, onBack }: { onNavigate: (page: string, item?: any) => void; onBack: () => void }) {
  const [keyword, setKeyword] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  // Mock trending and quick tags
  const trendingSearches = [
    { rank: 1, text: "아이폰 14 프로", status: "up" },
    { rank: 2, text: "다이슨 에어랩", status: "new" },
    { rank: 3, text: "루이비통 지갑", status: "steady" },
    { rank: 4, text: "맥북 프로 M2", status: "up" },
    { rank: 5, text: "스타벅스 기프티콘", status: "down" },
  ];

  const quickTags = [
    { text: "#마감 1시간 이내", highlight: true },
    { text: "#경쟁자 0명 꿀매물", highlight: false },
    { text: "#미개봉 S급 특가", highlight: true },
    { text: "#동네 직거래", highlight: false },
  ];

  const handleSearch = (text: string) => {
    setKeyword(text);
    if (text.trim() !== '') {
      setIsSearching(true);
    } else {
      setIsSearching(false);
    }
  };

  return (
    <div className="page-container" style={{ background: '#F8FAFC' }}>
      {/* Header */}
      <header className="detail-header" style={{ position: 'sticky', top: 0, zIndex: 10, background: 'white' }}>
        <button className="back-btn" onClick={() => {
          if (isSearching) {
            setKeyword('');
            setIsSearching(false);
          } else {
            onBack();
          }
        }}>
          <ChevronLeft size={28} />
        </button>
        <div style={{ flex: 1, position: 'relative' }}>
          <div style={{
            position: 'relative',
            borderRadius: '24px',
            background: '#FFFFFF',
            border: keyword ? '2px solid #EF4444' : '2px solid #F1F5F9',
            boxShadow: keyword ? '0 4px 16px rgba(239, 68, 68, 0.15)' : '0 2px 8px rgba(0,0,0,0.02)',
            display: 'flex',
            alignItems: 'center',
            transition: 'all 0.2s ease-in-out'
          }}>
            <Search size={24} color={keyword ? "#EF4444" : "#94A3B8"} style={{ position: 'absolute', left: '16px', transition: 'color 0.2s' }} />
            <input 
              type="text" 
              placeholder="어떤 꿀매물을 낚아챌까요? 🎣"
              value={keyword}
              onChange={(e) => handleSearch(e.target.value)}
              style={{
                width: '100%',
                padding: '16px 16px 16px 48px',
                borderRadius: '24px',
                border: 'none',
                background: 'transparent',
                fontSize: '17px',
                outline: 'none',
                fontWeight: 600,
                color: '#0F172A'
              }}
              autoFocus
            />
          </div>
        </div>
      </header>

      <div className="content-scroll" style={{ padding: '0' }}>
        
        {!isSearching ? (
          /* --- 검색 전: FOMO 자극 및 빠른 탐색 --- */
          <div style={{ padding: '24px 20px' }} className="fade-slide-up">
            {/* Quick Tags */}
            <div style={{ marginBottom: '40px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '8px', color: '#0F172A' }}>
                  <Clock size={20} color="#3B82F6" strokeWidth={2.5} /> 골든타임 퀵태그
                </h3>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {quickTags.map((tag, idx) => (
                  <div key={idx} style={{
                    padding: '10px 16px',
                    borderRadius: '12px',
                    fontSize: '14px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    background: tag.highlight ? 'linear-gradient(135deg, #FEF2F2, #FEE2E2)' : '#FFFFFF',
                    color: tag.highlight ? '#EF4444' : '#475569',
                    border: tag.highlight ? '1px solid #FCA5A5' : '1px solid #E2E8F0',
                    boxShadow: tag.highlight ? '0 4px 10px rgba(239, 68, 68, 0.1)' : '0 2px 6px rgba(0,0,0,0.02)',
                    transition: 'transform 0.1s ease',
                    // Using inline styles to simulate scale effect since no styled components
                  }} onClick={() => handleSearch(tag.text)}>
                    {tag.highlight && <span style={{ marginRight: '4px' }}>🔥</span>}
                    {tag.text.replace('#', '')}
                  </div>
                ))}
              </div>
            </div>

            {/* Trending Searches */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '8px', color: '#0F172A' }}>
                  <Flame size={24} color="#EF4444" strokeWidth={2.5} fill="#EF4444" /> 실시간 핫 경매어
                </h3>
                <span style={{ fontSize: '12px', color: '#94A3B8', fontWeight: 600 }}>방금 전 기준</span>
              </div>
              <div style={{ background: 'white', border: '1px solid #E2E8F0', borderRadius: '20px', padding: '8px', boxShadow: '0 8px 24px rgba(0,0,0,0.03)' }}>
                {trendingSearches.map((item, idx) => {
                  const isTop3 = idx < 3;
                  return (
                    <div key={idx} style={{ 
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between', 
                      padding: '16px 14px', 
                      borderRadius: '14px',
                      background: idx % 2 === 0 ? 'transparent' : '#F8FAFC',
                      cursor: 'pointer'
                    }} onClick={() => handleSearch(item.text)}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                        <span style={{ 
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          width: '24px', height: '24px',
                          borderRadius: '8px',
                          background: isTop3 ? '#EF4444' : '#E2E8F0',
                          color: isTop3 ? 'white' : '#64748B',
                          fontSize: '13px', fontWeight: '900'
                        }}>
                          {item.rank}
                        </span>
                        <span style={{ fontSize: '16px', fontWeight: isTop3 ? 700 : 500, color: '#1E293B' }}>{item.text}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        {item.status === 'up' && <span style={{ color: '#EF4444', fontSize: '12px', fontWeight: '900', display: 'flex', alignItems: 'center', gap: '2px' }}>▲ <span style={{fontSize: '10px'}}>{Math.floor(idx * 2) + 1}</span></span>}
                        {item.status === 'down' && <span style={{ color: '#3B82F6', fontSize: '12px', fontWeight: '900', display: 'flex', alignItems: 'center', gap: '2px' }}>▼ <span style={{fontSize: '10px'}}>{Math.floor((idx+1) * 1.5)}</span></span>}
                        {item.status === 'new' && <span style={{ background: '#FEF3C7', color: '#D97706', fontSize: '10px', fontWeight: '900', padding: '4px 6px', borderRadius: '6px' }}>NEW</span>}
                        {item.status === 'steady' && <span style={{ color: '#94A3B8', fontSize: '12px', fontWeight: '900' }}>-</span>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          /* --- 검색 결과 화면: 정렬, AI 브리핑, 피드 리스트 --- */
          <div className="fade-slide-up" style={{ padding: '0 16px 20px 16px' }}>
            
            {/* AI 시세 브리핑 박스 */}
            {keyword.includes("아이폰") || keyword.includes("맥북") || keyword.includes("다이슨") ? (
              <div style={{ 
                marginTop: '16px', marginBottom: '16px', 
                background: 'linear-gradient(135deg, #F8FAFC, #EFF6FF)', 
                border: '1px solid #DBEAFE', 
                borderRadius: '16px', 
                padding: '16px',
                boxShadow: '0 4px 12px rgba(59, 130, 246, 0.05)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                  <Sparkles size={16} fill="#3B82F6" color="#3B82F6" />
                  <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#1E3A8A' }}>AI 시세 마스터 브리핑</span>
                </div>
                <p style={{ fontSize: '14px', lineHeight: '1.5', color: '#334155', margin: 0 }}>
                  최근 한 달간 <strong>{keyword}</strong>의 평균 낙찰가는 <strong>65~72만 원</strong> 선입니다. <br/>
                  <span style={{ color: '#EF4444', fontWeight: 'bold' }}>현재 마감 임박한 꿀매물</span>이 2건 있어요! 서두르세요!
                </p>
              </div>
            ) : <div style={{ height: '16px' }} />}

            {/* 필터 및 정렬 다이얼 */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                <span style={{ padding: '6px 12px', background: '#333', color: 'white', borderRadius: '20px', fontSize: '13px', fontWeight: 'bold' }}>마감 임박순</span>
                <span style={{ padding: '6px 12px', background: 'white', border: '1px solid #E2E8F0', color: '#475569', borderRadius: '20px', fontSize: '13px', fontWeight: 600 }}>입찰자 적은순</span>
              </div>
              <span style={{ fontSize: '13px', color: '#64748B' }}>결과 3건</span>
            </div>

            {/* 결과 리스트 (FEED_ITEMS 재활용 - 마감임박 정렬이라고 가정) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {FEED_ITEMS.slice(0, 3).map((item) => (
                <FeedItemCard 
                  key={item.id} 
                  item={item} 
                  onNavigate={onNavigate} 
                />
              ))}
            </div>
            
          </div>
        )}
      </div>
    </div>
  );
}
