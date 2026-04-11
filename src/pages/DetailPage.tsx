import { ChevronLeft, Heart, Bell, MapPin, ChevronRight } from "lucide-react";
import { Line } from "react-chartjs-2";
import { ASSETS } from "../data/constants";
import { HOT_DEALS } from "../data/mockData";
import { useState } from "react";
import { AuctionTimer } from "../components/AuctionTimer";
import { BiddingBottomSheet } from "../components/BiddingBottomSheet";
import { useNow } from "../hooks/useNow";

export function DetailPage({ onBack, item }: { onBack: () => void, item?: any }) {
    const [showBiddingSheet, setShowBiddingSheet] = useState(false);
    const [isSeller, setIsSeller] = useState(false);
    const [showAllBids, setShowAllBids] = useState(false);
    const [bids, setBids] = useState(() => {
      const count = item ? (item.bidders || item.bids || 4) : 4;
      let basePrice = 850000;
      if (item && item.price) {
        const num = parseInt(item.price.toString().replace(/[^0-9]/g, ''), 10);
        if (!isNaN(num)) basePrice = num;
      }
      const mockNames = ['당근매니아', '애플콜렉터', '중고왕은나', '초보거래꾼', '득템요정', '빠른판매', '매너온도99', '네고금지', '직거래조아', '흥정왕', '오픈런', '지름신'];
      const stats = ['입찰 성공 확률 98%', '방금 전 제안', '30분 전 제안', '1시간 전 제안'];
      
      const initialBids = [];
      for(let i=0; i<count; i++) {
         initialBids.push({
            id: i + 1,
            name: mockNames[i % mockNames.length],
            stat: stats[i] || `${Math.floor(i/2) + 2}시간 전 제안`,
            price: basePrice + ((count - i) * 5000), // Make highest bid slightly above or depending on logic
            avatar: i < 3 ? ASSETS.avatars[i] : `https://api.dicebear.com/7.x/avataaars/svg?seed=user${i + 1}&backgroundColor=e2e8f0`,
            bg: i===0 ? 'rgba(255, 184, 0, 0.1)' : i===1 ? 'rgba(15, 232, 245, 0.1)' : i===2 ? 'rgba(255, 78, 80, 0.1)' : 'rgba(128, 128, 128, 0.05)'
         });
      }
      return initialBids.sort((a,b) => b.price - a.price);
    });
    
    const handleNewBid = (amount: number) => {
      setBids(prev => {
        const newBid = {
          id: Date.now(),
          name: '나(Me)',
          stat: '방금 전 제안',
          price: amount,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${Date.now()}`,
          bg: 'rgba(16, 185, 129, 0.1)'
        };
        const newBids = [newBid, ...prev].sort((a, b) => b.price - a.price);
        
        if (item) {
          if ('bids' in item) item.bids = newBids.length;
          if ('bidders' in item) item.bidders = newBids.length;
          // 외부 썸네일 가격(item.price)은 판매자 원본 희망가로 유지되어야 하므로 수정하지 않음!
        }

        return newBids;
      });
    };

    const now = useNow();
    const isEnded = item ? item.endTime <= now : false;

    const avgMarketPrice = 850000;
    const basePrice = item && item.price ? parseInt(item.price.toString().replace(/[^0-9]/g, ''), 10) : 850000;
    const sellerPrice = isNaN(basePrice) ? 850000 : basePrice;
    const highestBid = bids.length > 0 ? bids[0].price : sellerPrice;

    // Y축 고정 마진 (상하 5% 여백)
    const minY = Math.min(avgMarketPrice, sellerPrice, highestBid) * 0.95;
    const maxY = Math.max(avgMarketPrice, sellerPrice, highestBid) * 1.05;

    const chartData = {
      labels: ['1달 전', '3주 전', '2주 전', '1주 전', '현재'],
      datasets: [
        {
          label: 'AI 전국 시세액',
          data: [avgMarketPrice, avgMarketPrice, avgMarketPrice, avgMarketPrice, avgMarketPrice],
          borderColor: '#3B82F6',
          borderDash: [5, 5],
          borderWidth: 2,
          pointRadius: 0,
          fill: false,
          tension: 0
        },
        {
          label: '판매자 희망가',
          data: [sellerPrice, sellerPrice, sellerPrice, sellerPrice, sellerPrice],
          borderColor: '#EF4444',
          borderWidth: 2,
          pointRadius: 0,
          fill: false,
          tension: 0
        },
        {
          label: '현재 깨비 1등 제안가',
          data: [
            avgMarketPrice * 0.88, 
            avgMarketPrice * 0.93, 
            avgMarketPrice * 0.98, 
            highestBid * 0.95, 
            highestBid
          ],
          borderColor: '#10B981',
          borderWidth: 3,
          pointBackgroundColor: (context: any) => context.dataIndex === 4 ? '#10B981' : 'transparent',
          pointBorderColor: (context: any) => context.dataIndex === 4 ? '#FFFFFF' : 'transparent',
          pointBorderWidth: (context: any) => context.dataIndex === 4 ? 3 : 0,
          pointRadius: (context: any) => context.dataIndex === 4 ? 8 : 0,
          pointHoverRadius: 8,
          fill: false,
          tension: 0.4
        }
      ],
    };

    const backgroundBandsPlugin = {
      id: 'backgroundBands',
      beforeDraw: (chart: any) => {
        const { ctx, chartArea, scales } = chart;
        if (!chartArea) return;

        // ±2% 영역을 노란색 적정 구간으로 설정
        const yFairTop = scales.y.getPixelForValue(avgMarketPrice * 1.02);
        const yFairBottom = scales.y.getPixelForValue(avgMarketPrice * 0.98);
        
        ctx.save();
        
        // 빨간 영역 (프리미엄 구간: 시세 대비 2% 초과)
        ctx.fillStyle = 'rgba(254, 226, 226, 0.5)'; // #fecaca
        if (chartArea.top < yFairTop) {
           ctx.fillRect(chartArea.left, chartArea.top, chartArea.width, yFairTop - chartArea.top);
        }
        
        // 노란 영역 (적정 시세: 시세 ±2%)
        ctx.fillStyle = 'rgba(254, 243, 199, 0.5)'; // #fef3c7
        ctx.fillRect(chartArea.left, yFairTop, chartArea.width, yFairBottom - yFairTop);

        // 녹색 영역 (득템 꿀통: 시세 대비 2% 미만)
        ctx.fillStyle = 'rgba(209, 250, 229, 0.5)'; // #d1fae5
        if (chartArea.bottom > yFairBottom) {
           ctx.fillRect(chartArea.left, yFairBottom, chartArea.width, chartArea.bottom - yFairBottom);
        }
        
        ctx.restore();
      }
    };

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { tooltip: { enabled: false } },
      scales: {
        x: { grid: { display: false }, border: { display: false }, ticks: { color: '#8A9CA8', font: { family: 'Pretendard', size: 12 } } },
        y: { display: false, min: minY, max: maxY }
      },
      layout: { padding: { top: 20 } }
    };
    return (
    <>
      <BiddingBottomSheet 
        isOpen={showBiddingSheet} 
        onClose={() => setShowBiddingSheet(false)} 
        item={item} 
        onBidSubmit={handleNewBid}
      />
      <header className="top-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div onClick={onBack} style={{ cursor: 'pointer', paddingRight: '8px' }}>
            <ChevronLeft size={28} color="#2E343E" />
          </div>
          <h1 className="header-title" style={{ fontSize: '20px' }}>상세 정보</h1>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <Heart size={24} color="#2E343E" />
          <Bell size={24} color="#2E343E" />
        </div>
      </header>

      <div className="content-area">
        <section className="card">
          <div className="product-img-box" style={{ overflow: 'hidden', padding: 0 }}>
            <img 
              src={item?.img || ASSETS.phone} 
              alt={item?.title || "Product"} 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              onError={(e) => { if (item?.id) e.currentTarget.src = `https://picsum.photos/seed/${item.id}/400/400`; }}
            />
          </div>
          
          <div className="product-label" style={{marginTop: '12px', display: 'flex', alignItems: 'center', gap: '4px'}}>
            <MapPin size={16} />
            {item ? `${(item.mainRegion || '🗼 서울특별시').split(' ')[1]} ${item.subRegion || '서초구'}` : '서울특별시 서초구'}
          </div>
          <h2 className="product-name">{item?.title || '아이폰 13 프로 256GB 중고'}</h2>
          
          <div className="product-stats">
            <div className="stat-col">
              <div className="stat-label">현재 최고 제안가</div>
              <div className="stat-value pulse-text" style={{ color: 'var(--goblin-fire)' }}>
                {bids.length > 0 ? `${bids[0].price.toLocaleString()}원` : (item?.price ? (item.price.includes('원') ? item.price : `${item.price}원`) : '0원')}
              </div>
            </div>
            <div className="stat-col text-center" style={{alignItems: 'center'}}>
              <div className="stat-label">남은 시간</div>
              <div className="stat-value">
                <AuctionTimer endTime={item ? item.endTime : HOT_DEALS[0].endTime} isDetail={true} />
              </div>
            </div>
            <div className="stat-col right">
              <div className="stat-label">입찰자 수</div>
              <div className="stat-value">{bids.length}명</div>
            </div>
          </div>

          <button 
            onClick={() => !isEnded && setShowBiddingSheet(true)}
            className="btn btn-primary" 
            style={{ 
              fontFamily: "'Pretendard', sans-serif",
              opacity: isEnded ? 0.5 : 1,
              cursor: isEnded ? 'not-allowed' : 'pointer',
              background: isEnded ? '#8A9CA8' : undefined
            }}
            disabled={isEnded}
          >
            {isEnded ? '경매가 종료된 상품입니다' : '지금 입찰하기'}
          </button>
        </section>

        <section className="card">
          <h2 className="card-title">🔥 실시간 달아오르는 경매</h2>

          <div className="activity-item">
            <div className="activity-icon icon-green"><img src={ASSETS.play} style={{ width: '20px', filter: 'drop-shadow(0 2px 4px rgba(17, 241, 126, 0.4))' }} /></div>
            <div className="activity-text"><div className="activity-title">최고가 갱신!</div><div className="activity-sub">아이폰 14 프로 맥스 - 3분 전</div></div>
            <ChevronRight size={20} color="#8A9CA8" />
          </div>

          <div className="activity-item">
            <div className="activity-icon icon-cyan"><img src={ASSETS.trophy} style={{ width: '20px', filter: 'drop-shadow(0 2px 4px rgba(15, 232, 245, 0.4))' }} /></div>
            <div className="activity-text"><div className="activity-title">경쟁자가 나타났어요!</div><div className="activity-sub">맥북 프로 16인치 M2 - 10분 전</div></div>
            <ChevronRight size={20} color="#8A9CA8" />
          </div>

          <div className="activity-item">
            <div className="activity-icon icon-green"><img src={ASSETS.rocket} style={{ width: '20px', filter: 'drop-shadow(0 2px 4px rgba(17, 241, 126, 0.4))' }} /></div>
            <div className="activity-text"><div className="activity-title">새로운 특급 경매 시작</div><div className="activity-sub">다이슨 에어랩 상태 A급 - 15분 전</div></div>
            <ChevronRight size={20} color="#8A9CA8" />
          </div>
        </section>

        <section className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h2 className="card-title" style={{ marginBottom: 0 }}>👑 실시간 제안 리스트</h2>
            {/* 임시 테스트용 판매자 모드 토글 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#64748B' }}>
              <span style={{ fontWeight: isSeller ? 'bold' : 'normal', color: isSeller ? '#3B82F6' : '#8A9CA8' }}>판매자 모드</span>
              <div 
                onClick={() => setIsSeller(!isSeller)}
                style={{ width: '40px', height: '22px', background: isSeller ? '#3B82F6' : '#E2E8F0', borderRadius: '12px', position: 'relative', cursor: 'pointer', transition: 'all 0.2s' }}
              >
                <div style={{ position: 'absolute', top: '2px', left: isSeller ? '20px' : '2px', width: '18px', height: '18px', background: '#fff', borderRadius: '50%', transition: 'all 0.2s', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }} />
              </div>
            </div>
          </div>

          {(showAllBids ? bids : bids.slice(0, 3)).map((bid, index) => (
            <div key={bid.id} className="ranking-item" style={{ alignItems: 'center' }}>
              <div className={index < 2 ? "rank-index top" : "rank-index"}>{index + 1}</div>
              <div className="rank-avatar" style={{ background: bid.bg }}><img src={bid.avatar} style={{ width: '28px', filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))' }} /></div>
              <div className="rank-name" style={{ flex: 1 }}>{bid.name} <br /><span style={{ fontSize: '10px', color: '#8A9CA8' }}>{bid.stat}</span></div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
                 <div className="rank-price" style={{ color: index === 0 ? '#11F17E' : undefined }}>{bid.price.toLocaleString()}원</div>
                 {isSeller && (
                   <button className="btn btn-primary" style={{ padding: '6px 12px', fontSize: '12px', borderRadius: '8px', height: 'auto', background: '#2E343E' }}>
                     채택하기
                   </button>
                 )}
              </div>
            </div>
          ))}
          
          {bids.length > 3 && (
            <button 
              className="btn btn-secondary" 
              style={{ marginTop: '12px', width: '100%', padding: '12px', borderRadius: '12px', background: '#F8FAFC', color: '#475569', border: '1px solid #E2E8F0', fontWeight: 600, fontSize: '14px', transition: 'all 0.2s', cursor: 'pointer' }}
              onClick={() => setShowAllBids(!showAllBids)}
            >
              {showAllBids ? '제안 리스트 접기' : `전체 제안 보기 (${bids.length}명)`}
            </button>
          )}
        </section>

        <section className="card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <h2 className="card-title" style={{ marginBottom: 0 }}>📊 AI 도깨비 시세 스캐너</h2>
            <div style={{ fontSize: '11px', color: '#8A9CA8', display: 'flex', alignItems: 'center', gap: '4px', background: '#F1F5F9', padding: '4px 8px', borderRadius: '12px' }}>
              <span style={{ fontSize: '10px' }}>🥕⚡🌱</span> 통합 분석 완료
            </div>
          </div>
          
          <div style={{ background: bids[0].price < 850000 ? '#ECFDF5' : bids[0].price === 850000 ? '#FEF3C7' : '#FEF2F2', borderRadius: '12px', padding: '12px', marginBottom: '16px', border: `1px solid ${bids[0].price < 850000 ? '#A7F3D0' : bids[0].price === 850000 ? '#FDE68A' : '#FECACA'}` }}>
            <div style={{ fontSize: '13px', color: bids[0].price < 850000 ? '#059669' : bids[0].price === 850000 ? '#D97706' : '#DC2626', fontWeight: 800, marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              {bids[0].price < 850000 ? '🟢 득템 구간 (안전)' : bids[0].price === 850000 ? '🟡 적정 시세 (눈치 게임중)' : '🔴 프리미엄 구간 (과열)'}
            </div>
            <div style={{ fontSize: '12px', color: '#475569', lineHeight: 1.4 }}>
              "전국 중고 평균가(85만 원) 대비 현재 1등 제안가(<b>{bids[0].price.toLocaleString()}원</b>)는 {bids[0].price < 850000 ? '저렴한 편입니다! 조금만 더 올려서 과감하게 찔러보세요 😈' : bids[0].price === 850000 ? '적정 수준입니다. 판매자의 선택을 기다려보세요! 👀' : '다소 높은 편입니다! 정말 절실한 아이템인가요? 🔥'}"
            </div>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '8px', fontSize: '11px', fontWeight: 500, color: '#64748B' }}>
             <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><div style={{ width: '12px', height: '0', borderBottom: '2px dashed #3B82F6' }}/>🟦 AI 전국 평균</div>
             <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><div style={{ width: '12px', height: '2px', background: '#EF4444' }}/>🟥 판매자 픽</div>
             <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><div style={{ width: '8px', height: '8px', background: '#10B981', borderRadius: '50%' }}/>🟩 최고가 (나)</div>
          </div>

          <div style={{ position: 'relative', height: '180px' }}>
            <div className="chart-tooltip-badge" style={{ background: '#2E343E', color: '#11F17E', position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)' }}>
              현재 코앞: {highestBid.toLocaleString()}원
            </div>
            <Line data={chartData} options={chartOptions} plugins={[backgroundBandsPlugin]} />
          </div>
        </section>

        <section className="card">
          <h2 className="card-title">거래 액션 버튼</h2>
          <button 
            onClick={() => !isEnded && setShowBiddingSheet(true)}
            className="btn btn-primary" 
            style={{ 
              fontFamily: "'Pretendard', sans-serif",
              opacity: isEnded ? 0.5 : 1,
              cursor: isEnded ? 'not-allowed' : 'pointer',
              background: isEnded ? '#8A9CA8' : undefined
            }}
            disabled={isEnded}
          >
            {isEnded ? '경매 종료 (추가 입찰 불가)' : '지금 입찰하기'}
          </button>
          {!isEnded && <button className="btn btn-cyan" style={{ fontFamily: "'Pretendard', sans-serif" }}>관심상품 추가 찜</button>}
          <button 
            className="btn btn-white" 
            style={{ 
              fontFamily: "'Pretendard', sans-serif",
              opacity: isEnded ? 0.5 : 1,
              cursor: isEnded ? 'not-allowed' : 'pointer',
            }}
            disabled={isEnded}
          >
            {isEnded ? '채팅 불가 (기간 만료)' : '판매자와 1:1 채팅하기'}
          </button>
          <button className="btn btn-white" style={{ fontFamily: "'Pretendard', sans-serif" }}>동급 다른 매물 보기</button>
        </section>

        <section className="card">
          <h2 className="card-title text-center" style={{ textAlign: 'center', marginBottom: '24px' }}>나의 도깨비 업적 배지</h2>
          <div className="badge-row">
            <div className="gamify-badge" style={{ background: '#E6FAFB' }}>
              <img src={ASSETS.medal} style={{ width: '42px', filter: 'drop-shadow(0 8px 12px rgba(15, 232, 245, 0.4))' }} alt="1st medal" />
            </div>
            <div className="gamify-badge" style={{ background: '#FFF5E5' }}>
              <img src={ASSETS.trophy} style={{ width: '42px', filter: 'drop-shadow(0 8px 12px rgba(255, 184, 0, 0.4))' }} alt="trophy" />
            </div>
            <div className="gamify-badge" style={{ background: '#FFEBEA' }}>
              <img src={ASSETS.rocket} style={{ width: '42px', filter: 'drop-shadow(0 8px 12px rgba(255, 78, 80, 0.4))' }} alt="rocket" />
            </div>
          </div>
        </section>

      </div>
    </>
    );
}
