import { Search, Bell, ChevronUp, Home, Gavel, Plus, MessageCircle, User } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { CATEGORY_MAP, REGION_MAP } from "../data/constants";
import { HOT_DEALS, FEED_ITEMS } from "../data/mockData";
import { AuctionTimer } from "../components/AuctionTimer";
import { FeedItemCard } from "../components/FeedItemCard";

export function MainPage({ onNavigate, appWrapperRef }: { onNavigate: (page: string, item?: any) => void, appWrapperRef: any }) {
    const [activeCategory, setActiveCategory] = useState('전체');
    const [activeRegion, setActiveRegion] = useState('전체');
    const [roadmapTab, setRoadmapTab] = useState<'category' | 'region'>('category');
    const [showRoadmap, setShowRoadmap] = useState(false);
    const [dealIdx, setDealIdx] = useState(0);
    const scrollRef = useRef<HTMLDivElement>(null);
    const curtainInnerRef = useRef<HTMLDivElement>(null);
    const [isDrag, setIsDrag] = useState(false);
    const [startX, setStartX] = useState(0);
    const onDragStart = (e: MouseEvent<HTMLDivElement>) => {
            e.preventDefault();
            setIsDrag(true);
            if (scrollRef.current) setStartX(e.pageX + scrollRef.current.scrollLeft);
          };
    const onDragEnd = () => setIsDrag(false);
    const onDragMove = (e: MouseEvent<HTMLDivElement>) => {
            if (!isDrag || !scrollRef.current) return;
            const { scrollWidth, clientWidth, scrollLeft } = scrollRef.current;
            scrollRef.current.scrollLeft = startX - e.pageX;
            if (scrollLeft === 0) setStartX(e.pageX);
            else if (scrollWidth <= clientWidth + scrollLeft) setStartX(e.pageX + scrollLeft);
          };
    const timerRef = useRef<any>(null);
    const startBannerTimer = () => {
            if (timerRef.current) clearInterval(timerRef.current);
            timerRef.current = setInterval(() => {
              setDealIdx((prev) => (prev + 1) % HOT_DEALS.length);
            }, 4000);
          };
    useEffect(() => {
    startBannerTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
    }, []);
    const currentDeal = HOT_DEALS[dealIdx];
    const resetToHome = () => {
            setActiveCategory('전체');
            setActiveRegion('전체');
            setShowRoadmap(false);
            setDealIdx(0);
            startBannerTimer();
            appWrapperRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
          };
    return (
    <>
      <header className="top-header">
        <div 
          className="logo-container" 
          style={{ position: 'relative', cursor: 'pointer' }}
          onClick={resetToHome}
        >
          <img
            src="/goblin_club_transparent.png"
            alt="오피셜 깨비 로고"
            className="logo-img-zoom club-strike"
          />
          <span className="logo-text text-jelly">GGAEBI <span className="logo-badge">경매소</span></span>
          <span className="magic-sparkle">⭐️</span>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <Search size={24} color="#2E343E" className="cursor-pointer" onClick={() => onNavigate('search')} />
          <Bell size={24} color="#2E343E" className="cursor-pointer" onClick={() => onNavigate('notifications')} />
        </div>
      </header>

      <div className="content-area">
        {/* 히어로 배너 (자동 롤링 배너) */}
        <section className="hero-banner glassmorphism" onClick={() => onNavigate('detail', currentDeal)} style={{cursor: 'pointer'}}>
          <div className="hero-content">
            <div className="hero-tag pulse-glow">
              마감 임박 <AuctionTimer endTime={currentDeal.endTime} />
            </div>

            <div key={currentDeal.id} className="hero-dynamic-area fade-slide-up">
              <h2 className="hero-title">{currentDeal.title}</h2>
              <div className="hero-price-row">
                <span className="price-label">현재 1등 입찰가</span>
                <span className="price-value pulse-text">{currentDeal.price}원</span>
              </div>
              <div className="hero-bidders">
                🔥 {currentDeal.bidders}명 폭풍 입찰 중
              </div>
            </div>

            <div className="hero-indicators">
              {HOT_DEALS.map((_, i) => (
                <div key={i} className={`indicator ${i === dealIdx ? 'active' : ''}`} />
              ))}
            </div>
          </div>

          <div key={`img-${currentDeal.id}`} className="hero-img-wrapper bounce-float-scale fade-slide-up">
            <img
              src={currentDeal.img}
              alt={currentDeal.title}
              className="floating-product-photo"
              style={{
                boxShadow: `0 16px 32px ${currentDeal.color}, 0 4px 8px rgba(0,0,0,0.1)`
              }}
            />
          </div>
        </section>

        {/* === 스크롤 고정 영역 (카테고리 + 커튼 맵) === */}
        <div className="sticky-header-container">
          {/* 카테고리 필 */}
          <div
            className="category-scroll"
            ref={scrollRef}
            onMouseDown={onDragStart}
            onMouseMove={onDragMove}
            onMouseUp={onDragEnd}
            onMouseLeave={onDragEnd}
          >
            <div
              className={`cat-pill ${activeCategory === '전체' && activeRegion === '전체' && !showRoadmap ? 'active' : ''} cat-all`}
              onClick={() => {
                if (showRoadmap) {
                  setShowRoadmap(false);
                } else {
                  setShowRoadmap(true);
                  curtainInnerRef.current?.scrollTo({ top: 0, behavior: 'auto' });
                }
              }}
            >
              전체
            </div>
            {activeCategory !== '전체' && (
              <div className="cat-pill active">
                {activeCategory.includes(' ') ? activeCategory : `🗂️ ${activeCategory}`}
                <span 
                  className="filter-chip-remove" 
                  onClick={(e) => { e.stopPropagation(); setActiveCategory('전체'); }}
                >✕</span>
              </div>
            )}
            {activeRegion !== '전체' && (
              <div className="cat-pill active">
                📍 {activeRegion}
                <span 
                  className="filter-chip-remove" 
                  onClick={(e) => { e.stopPropagation(); setActiveRegion('전체'); }}
                >✕</span>
              </div>
            )}
            {['📱 전자기기', '🏠 홈·리빙', '✨ 패션·뷰티', '👶 육아템', '🏕 여가·취미', '🐶 기타·특수'].map(cat => (
              activeCategory !== cat && activeCategory !== cat.split(' ')[1] && (
                <div
                  key={cat}
                  className="cat-pill"
                  onClick={() => {
                    setActiveCategory(cat);
                    setShowRoadmap(false);
                    appWrapperRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  {cat}
                </div>
              )
            ))}
          </div>

          {/* 상품 피드 맵 분기 */}
          <div className={`curtain-wrapper ${showRoadmap ? 'open' : ''}`}>
            <div className="curtain-inner" ref={curtainInnerRef}>
              <div className="category-roadmap">
                <div className="roadmap-tabs">
                  <div 
                    className={`roadmap-tab ${roadmapTab === 'category' ? 'active' : ''}`}
                    onClick={() => setRoadmapTab('category')}
                  >
                    🗂️ 카테고리별
                  </div>
                  <div 
                    className={`roadmap-tab ${roadmapTab === 'region' ? 'active' : ''}`}
                    onClick={() => setRoadmapTab('region')}
                  >
                    📍 지역별
                  </div>
                </div>

                <div className="roadmap-grid">
                  {(roadmapTab === 'category' ? CATEGORY_MAP : REGION_MAP).map((group) => (
                    <div key={group.main} className="roadmap-row">
                      <div className="roadmap-main">
                        <span className="roadmap-icon">{roadmapTab === 'category' ? group.main.split(' ')[0] : group.main.substring(0, 2)}</span>
                        <span>{roadmapTab === 'category' ? group.main.split(' ')[1] : group.main.substring(3)}</span>
                      </div>
                      <div className="roadmap-subs">
                        <span
                          className="roadmap-sub-item roadmap-sub-all"
                          onClick={() => {
                            if (roadmapTab === 'category') setActiveCategory(group.main);
                            else setActiveRegion(group.main.substring(3));
                            setShowRoadmap(false);
                          }}
                        >전체</span>
                        {group.subs.map(sub => (
                          <span
                            key={sub}
                            className="roadmap-sub-item"
                            onClick={() => {
                              if (roadmapTab === 'category') setActiveCategory(sub);
                              else setActiveRegion(sub);
                              setShowRoadmap(false);
                            }}
                          >{sub}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  className="roadmap-close-btn pulse-glow"
                  onClick={() => setShowRoadmap(false)}
                >
                  닫기 <ChevronUp size={18} strokeWidth={3} />
                </button>
              </div>
            </div>
          </div>
        </div>

          <div className="feed-grid fade-slide-up">
            {FEED_ITEMS.filter(item => {
              const catMatch = activeCategory === '전체' || item.cat === activeCategory || item.sub === activeCategory;
              const regionMatch = activeRegion === '전체' || item.mainRegion?.includes(activeRegion) || item.subRegion === activeRegion;
              return catMatch && regionMatch;
            })
            .sort((a, b) => {
              const now = Date.now();
              const aEnded = a.endTime <= now;
              const bEnded = b.endTime <= now;
              if (aEnded && !bEnded) return 1;
              if (!aEnded && bEnded) return -1;
              return a.endTime - b.endTime;
            })
            .map(item => (
              <FeedItemCard key={item.id} item={item} onNavigate={onNavigate} />
            ))}

            {FEED_ITEMS.filter(item => {
              const catMatch = activeCategory === '전체' || item.cat === activeCategory || item.sub === activeCategory;
              const regionMatch = activeRegion === '전체' || item.mainRegion?.includes(activeRegion) || item.subRegion === activeRegion;
              return catMatch && regionMatch;
            }).length === 0 && (
                <div style={{ textAlign: 'center', padding: '40px 20px', color: '#94A3B8', fontSize: '15px' }}>
                  해당 카테고리의 상품이 아직 없습니다. 😢
                </div>
              )}
          </div>
      </div>

      {/* 하단 네비게이션 */}
      <nav className="bottom-nav">
        <div className="nav-item active" style={{cursor: 'pointer'}} onClick={resetToHome}><Home size={22} strokeWidth={2.5} /><span>홈</span></div>
        <div className="nav-item" style={{cursor: 'pointer', color: '#94A3B8'}} onClick={() => onNavigate('bidding')}><Gavel size={22} /><span>입찰내역</span></div>
        <div className="nav-fab" style={{ cursor: 'pointer', background: 'linear-gradient(135deg, #10B981 0%, #11F17E 100%)' }} onClick={() => onNavigate('registration')}>
          <Plus size={28} color="#fff" strokeWidth={3} />
        </div>
        <div className="nav-item" style={{cursor: 'pointer', color: '#94A3B8'}} onClick={() => onNavigate('chat')}>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <MessageCircle size={22} />
            <div style={{ position: 'absolute', top: '-6px', right: '-8px', background: '#EF4444', color: '#fff', fontSize: '10px', fontWeight: 'bold', width: '16px', height: '16px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #fff', boxShadow: '0 1px 3px rgba(239,68,68,0.3)' }}>1</div>
          </div>
          <span>채팅</span>
        </div>
        <div className="nav-item" style={{cursor: 'pointer', color: '#94A3B8'}} onClick={() => onNavigate('user')}><User size={22} /><span>내 정보</span></div>
      </nav>
    </>
    );
}
