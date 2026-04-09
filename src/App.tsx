import { useState, useEffect, useRef, type MouseEvent } from 'react';
import {
  ChevronRight, ChevronLeft, ChevronUp, ChevronDown, Search, Bell, Home, Gavel, Heart, MessageCircle, User, MapPin, Trash2, Settings, ShieldAlert, CreditCard, Wallet, Award, Clock, Moon, Smartphone, Key, HelpCircle, UserCheck, Plus, Camera, Wand2, ImagePlus, Map, Sparkles, CheckCircle, TrendingUp, Package
} from 'lucide-react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler
} from 'chart.js';
import { FEED_ITEMS as RAW_FEED_ITEMS } from './data/mockProducts';

const INIT_TIME = Date.now();
const parseTimeStr = (str: string) => {
  if (!str) return 0;
  if (str.includes(':')) {
    const parts = str.split(':');
    return parseInt(parts[0]) * 3600 + parseInt(parts[1]) * 60 + parseInt(parts[2]);
  }
  let seconds = 0;
  if (str.includes('일')) seconds += parseInt(str.match(/(\d+)일/)?.[1] || '0') * 86400;
  if (str.includes('시간')) seconds += parseInt(str.match(/(\d+)시간/)?.[1] || '0') * 3600;
  if (str.includes('분')) seconds += parseInt(str.match(/(\d+)분/)?.[1] || '0') * 60;
  return seconds;
};
const REGION_MAP_COPY = [
  { main: "🗼 서울특별시", subs: ["강남구", "서초구", "송파구", "마포구", "관악구", "영등포구", "강서구", "노원구", "용산구"] },
  { main: "🏡 경기도", subs: ["성남시", "수원시", "고양시", "용인시", "화성시", "부천시", "안산시", "남양주시", "안양시"] },
  { main: "🌆 인천광역시", subs: ["연수구", "남동구", "부평구", "서구", "미추홀구", "계양구", "중구"] },
  { main: "🌾 충청도", subs: ["천안시", "청주시", "아산시", "충주시", "제천시", "공주시", "서산시", "당진시", "보령시"] },
  { main: "⛰️ 강원특별자치도", subs: ["춘천시", "원주시", "강릉시", "속초시", "동해시", "평창군"] },
  { main: "🚄 대전광역시", subs: ["유성구", "서구", "중구", "동구", "대덕구"] },
  { main: "🍃 전라도", subs: ["전주시", "광주광역시", "익산시", "군산시", "순천시", "여수시", "목포시", "나주시"] },
  { main: "🌊 경상도", subs: ["창원시", "포항시", "구미시", "진주시", "김해시", "경주시", "안동시", "거제시", "대구광역시", "울산광역시"] },
  { main: "🚢 부산광역시", subs: ["해운대구", "수영구", "동래구", "부산진구", "남구", "사하구", "연제구", "북구", "기장군"] },
  { main: "🍊 제주특별자치도", subs: ["제주시", "서귀포시"] }
];
const ALL_SUB_REGIONS = REGION_MAP_COPY.flatMap(r => r.subs.map(sub => ({ main: r.main, sub })));

export const FEED_ITEMS = RAW_FEED_ITEMS.map((item, index) => {
  const reg = ALL_SUB_REGIONS[Math.floor((index * 13) % ALL_SUB_REGIONS.length)];
  return { 
    ...item, 
    endTime: INIT_TIME + parseTimeStr(item.time) * 1000,
    mainRegion: reg.main,
    subRegion: reg.sub
  };
});

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler);

// 3D 에셋 URL 모음 (Microsoft Fluent 3D Emoji)
const ASSETS = {
  phone: "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Mobile%20phone/3D/mobile_phone_3d.png",
  play: "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Play%20button/3D/play_button_3d.png",
  trophy: "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Trophy/3D/trophy_3d.png",
  medal: "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/1st%20place%20medal/3D/1st_place_medal_3d.png",
  rocket: "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Rocket/3D/rocket_3d.png",
  fire: "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Fire/3D/fire_3d.png",
  laptop: "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Laptop/3D/laptop_3d.png",
  wand: "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Magic%20wand/3D/magic_wand_3d.png",
  headphone: "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Headphone/3D/headphone_3d.png",
  camera: "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Camera%20with%20flash/3D/camera_with_flash_3d.png",
  joystick: "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Joystick/3D/joystick_3d.png",
  shoe: "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Running%20shoe/3D/running_shoe_3d.png",
  watch: "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Watch/3D/watch_3d.png",
  teddy: "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Teddy%20bear/3D/teddy_bear_3d.png",
  guitar: "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Guitar/3D/guitar_3d.png",
  avatars: [
    "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Fox/3D/fox_3d.png",
    "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Panda/3D/panda_3d.png",
    "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Cat/3D/cat_3d.png",
    "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Hatching%20chick/3D/hatching_chick_3d.png"
  ]
};

const RAW_HOT_DEALS = [
  { id: 1, title: "아이폰 13 프로 256GB", price: "850,000", bidders: 19, timeLeft: "00:03:15", img: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?fit=crop&w=400&h=400", color: "rgba(53,216,230,0.3)" },
  { id: 2, title: "에어팟 맥스 (스페이스 그레이)", price: "450,000", bidders: 34, timeLeft: "00:10:05", img: "https://images.unsplash.com/photo-1583394838336-acd977736f90?fit=crop&w=400&h=400", color: "rgba(100,100,100,0.3)" },
  { id: 3, title: "소니 A7M4 미러리스", price: "2,100,000", bidders: 55, timeLeft: "00:01:20", img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?fit=crop&w=400&h=400", color: "rgba(255,100,100,0.3)" },
  { id: 4, title: "닌텐도 스위치 OLED", price: "280,000", bidders: 22, timeLeft: "00:45:00", img: "https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?fit=crop&w=400&h=400", color: "rgba(230,53,53,0.3)" },
  { id: 5, title: "나이키 덩크 로우 범고래", price: "120,000", bidders: 41, timeLeft: "00:05:40", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?fit=crop&w=400&h=400", color: "rgba(0,0,0,0.2)" },
  { id: 6, title: "애플워치 울트라 1세대", price: "720,000", bidders: 18, timeLeft: "01:23:00", img: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?fit=crop&w=400&h=400", color: "rgba(255,150,0,0.3)" },
  { id: 7, title: "맥북 프로 14인치 M3", price: "2,500,000", bidders: 67, timeLeft: "00:00:45", img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?fit=crop&w=400&h=400", color: "rgba(150,150,150,0.3)" },
  { id: 8, title: "초대형 한정판 곰인형", price: "45,000", bidders: 8, timeLeft: "02:10:00", img: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?fit=crop&w=400&h=400", color: "rgba(139,69,19,0.3)" },
  { id: 9, title: "어쿠스틱 통기타 입문용", price: "90,000", bidders: 5, timeLeft: "10:00:00", img: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?fit=crop&w=400&h=400", color: "rgba(205,133,63,0.3)" },
  { id: 10, title: "레어 빈티지 롤렉스 시계", price: "1,250,000", bidders: 42, timeLeft: "00:01:42", img: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?fit=crop&w=400&h=400", color: "rgba(255,215,0,0.4)" }
];
const HOT_DEALS = RAW_HOT_DEALS.map(d => ({ ...d, endTime: INIT_TIME + parseTimeStr(d.timeLeft) * 1000 }));

const CATEGORY_MAP = [
  {
    main: "📱 전자기기",
    subs: ["스마트폰", "PC/노트북", "태블릿", "스마트워치", "음향기기", "청소기", "생활가전", "주방가전", "영상기기"]
  },
  {
    main: "🏠 홈·리빙",
    subs: ["가구", "인테리어", "조명", "생활용품", "주방/식기", "침구류", "욕실용품"]
  },
  {
    main: "✨ 패션·뷰티",
    subs: ["여성의류", "남성의류", "명품가방", "시계/쥬얼리", "신발/잡화", "기초/색조화장품", "향수/바디"]
  },
  {
    main: "👶 육아템",
    subs: ["아기옷", "장난감", "카시트", "유모차", "놀이매트", "그림책", "교육/교구"]
  },
  {
    main: "🏕 여가·취미",
    subs: ["골프", "자전거", "캠핑/낚시", "피트니스", "콘솔/PC게임", "피규어/프라모델", "음반/도서", "티켓/교환권"]
  },
  {
    main: "🐶 기타·특수",
    subs: ["반려동물 사료/간식", "펫용품", "식물/화분", "가공식품", "건강기능식품", "자동차/오토바이 용품", "기타중고물품"]
  }
];

const REGION_MAP = [
  {
    main: "🗼 서울특별시",
    subs: ["강남구", "서초구", "송파구", "마포구", "관악구", "영등포구", "강서구", "노원구", "용산구"]
  },
  {
    main: "🏡 경기도",
    subs: ["성남시", "수원시", "고양시", "용인시", "화성시", "부천시", "안산시", "남양주시", "안양시"]
  },
  {
    main: "🌆 인천광역시",
    subs: ["연수구", "남동구", "부평구", "서구", "미추홀구", "계양구", "중구"]
  },
  {
    main: "🌾 충청도",
    subs: ["천안시", "청주시", "아산시", "충주시", "제천시", "공주시", "서산시", "당진시", "보령시"]
  },
  {
    main: "⛰️ 강원특별자치도",
    subs: ["춘천시", "원주시", "강릉시", "속초시", "동해시", "평창군"]
  },
  {
    main: "🚄 대전광역시",
    subs: ["유성구", "서구", "중구", "동구", "대덕구"]
  },
  {
    main: "🍃 전라도",
    subs: ["전주시", "광주광역시", "익산시", "군산시", "순천시", "여수시", "목포시", "나주시"]
  },
  {
    main: "🌊 경상도",
    subs: ["창원시", "포항시", "구미시", "진주시", "김해시", "경주시", "안동시", "거제시", "대구광역시", "울산광역시"]
  },
  {
    main: "🚢 부산광역시",
    subs: ["해운대구", "수영구", "동래구", "부산진구", "남구", "사하구", "연제구", "북구", "기장군"]
  },
  {
    main: "🍊 제주특별자치도",
    subs: ["제주시", "서귀포시"]
  }
];

/* --- 카운트다운 관련 훅 및 유틸리티 --- */
export const useNow = () => {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);
  return now;
};

export const formatCountdown = (endTime: number, now: number) => {
  const diff = Math.max(0, Math.floor((endTime - now) / 1000));
  if (diff === 0) return '마감 완료';
  const days = Math.floor(diff / 86400);
  if (days >= 1) return `${days}일`; // 하루 이상 남았을 경우 일수로 표시
  const h = String(Math.floor(diff / 3600)).padStart(2, '0');
  const m = String(Math.floor((diff % 3600) / 60)).padStart(2, '0');
  const s = String(diff % 60).padStart(2, '0');
  return `${h}:${m}:${s}`;
};

/* --- 1. 메인 홈페이지 --- */
function MainPage({ onNavigate, appWrapperRef }: { onNavigate: (page: string, item?: any) => void, appWrapperRef: any }) {
  const now = useNow();
  const [activeCategory, setActiveCategory] = useState('전체');
  const [activeRegion, setActiveRegion] = useState('전체');
  const [roadmapTab, setRoadmapTab] = useState<'category' | 'region'>('category');
  const [showRoadmap, setShowRoadmap] = useState(false); // 로드맵 노출 상태 추가
  const [dealIdx, setDealIdx] = useState(0);

  // 가로 스크롤 드래그 기능 (데스크탑 마우스 환경용)
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
          <Search size={24} color="#2E343E" className="cursor-pointer" />
          <Bell size={24} color="#2E343E" className="cursor-pointer" onClick={() => onNavigate('notifications')} />
        </div>
      </header>

      <div className="content-area">
        {/* 히어로 배너 (자동 롤링 배너) */}
        <section className="hero-banner glassmorphism" onClick={() => onNavigate('detail', currentDeal)} style={{cursor: 'pointer'}}>
          <div className="hero-content">
            <div className="hero-tag pulse-glow">
              마감 임박 <span className="time-left" style={{ color: (currentDeal.endTime - now) < 3600000 && (currentDeal.endTime - now) > 0 ? '#FF4E50' : 'inherit' }}>{formatCountdown(currentDeal.endTime, now)}</span>
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
            }).map(item => (
              <div key={item.id} className="feed-card" onClick={() => onNavigate('detail', item)}>
                <div className="feed-img-box" style={{ overflow: 'hidden', padding: 0 }}>
                  <img
                    src={item.img}
                    alt={item.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => { e.currentTarget.src = `https://picsum.photos/seed/${item.id}/400/400`; }}
                  />
                </div>
                <div className="feed-info">
                  <div className="feed-title">{item.title}</div>
                  <div className="feed-price">{item.price}</div>
                  <div className="feed-meta">
                    <span style={{ color: (item.endTime - now) < 3600000 && (item.endTime - now) > 0 ? '#FF4E50' : 'inherit' }}>남은 시간: {formatCountdown(item.endTime, now)}</span>
                    <span>입찰: {item.bids}명</span>
                  </div>
                </div>
              </div>
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

/* --- 2. 상품 상세 페이지 --- */
function DetailPage({ onBack, item }: { onBack: () => void, item?: any }) {
  const now = useNow();
  const chartData = {
    labels: ['1일', '1주', '1달', '3달', '6달'],
    datasets: [{
      fill: true,
      data: [790000, 810000, 780000, 850000, 830000],
      borderColor: '#35D8E6',
      backgroundColor: (context: any) => {
        const ctx = context.chart.ctx;
        const gradient = ctx.createLinearGradient(0, 0, 0, 120);
        gradient.addColorStop(0, 'rgba(53, 216, 230, 0.3)');
        gradient.addColorStop(1, 'rgba(53, 216, 230, 0.0)');
        return gradient;
      },
      tension: 0.45,
      pointBackgroundColor: '#2E343E',
      pointBorderColor: '#FFFFFF',
      pointBorderWidth: 2,
      pointRadius: (ctx: any) => ctx.dataIndex === 3 ? 5 : 0,
    }],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { tooltip: { enabled: false } },
    scales: {
      x: { grid: { display: false }, border: { display: false }, ticks: { color: '#8A9CA8', font: { family: 'Pretendard', size: 12 } } },
      y: { display: false, min: 770000 }
    },
    layout: { padding: { top: 20 } }
  };

  return (
    <>
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
              <div className="stat-label">현재 입찰가</div>
              <div className="stat-value pulse-text" style={{ color: 'var(--goblin-fire)' }}>
                {item?.price ? (item.price.includes('원') ? item.price : `${item.price}원`) : '850,000원'}
              </div>
            </div>
            <div className="stat-col text-center" style={{alignItems: 'center'}}>
              <div className="stat-label">남은 시간</div>
              <div className="stat-value" style={{ color: ((item ? item.endTime : HOT_DEALS[0].endTime) - now) < 3600000 && ((item ? item.endTime : HOT_DEALS[0].endTime) - now) > 0 ? '#FF4E50' : 'inherit' }}>
                {item ? formatCountdown(item.endTime, now) : formatCountdown(HOT_DEALS[0].endTime, now)}
              </div>
            </div>
            <div className="stat-col right">
              <div className="stat-label">입찰자 수</div>
              <div className="stat-value">{item ? (item.bidders || item.bids || 0) : 19}명</div>
            </div>
          </div>

          <button className="btn btn-primary" style={{ fontFamily: "'Pretendard', sans-serif" }}>지금 입찰하기</button>
        </section>

        <section className="card">
          <h2 className="card-title">🔥 실시간 달아오르는 경매</h2>

          <div className="activity-item">
            <div className="activity-icon icon-green"><img src={ASSETS.play} style={{ width: '20px', filter: 'drop-shadow(0 2px 4px rgba(17, 241, 126, 0.4))' }} /></div>
            <div className="activity-text"><div className="activity-title">최고가 갱신!</div><div className="activity-sub">아이폰 14 프로 맥스 - 3분 전</div></div>
            <ChevronRight size={18} color="#8A9CA8" />
          </div>

          <div className="activity-item">
            <div className="activity-icon icon-cyan"><img src={ASSETS.trophy} style={{ width: '20px', filter: 'drop-shadow(0 2px 4px rgba(15, 232, 245, 0.4))' }} /></div>
            <div className="activity-text"><div className="activity-title">경쟁자가 나타났어요!</div><div className="activity-sub">맥북 프로 16인치 M2 - 10분 전</div></div>
            <ChevronRight size={18} color="#8A9CA8" />
          </div>

          <div className="activity-item">
            <div className="activity-icon icon-green"><img src={ASSETS.rocket} style={{ width: '20px', filter: 'drop-shadow(0 2px 4px rgba(17, 241, 126, 0.4))' }} /></div>
            <div className="activity-text"><div className="activity-title">새로운 특급 경매 시작</div><div className="activity-sub">다이슨 에어랩 상태 A급 - 15분 전</div></div>
            <ChevronRight size={18} color="#8A9CA8" />
          </div>
        </section>

        <section className="card">
          <h2 className="card-title">👑 해당 상품 입찰 랭킹</h2>

          <div className="ranking-item">
            <div className="rank-index top">1</div>
            <div className="rank-avatar" style={{ background: 'rgba(255, 184, 0, 0.1)' }}><img src={ASSETS.avatars[0]} style={{ width: '28px', filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))' }} /></div>
            <div className="rank-name">당근매니아 <br /><span style={{ fontSize: '10px', color: '#8A9CA8' }}>입찰 성공 확률 98%</span></div>
            <div className="rank-price" style={{ color: '#11F17E' }}>850,000원</div>
          </div>
          <div className="ranking-item">
            <div className="rank-index top">2</div>
            <div className="rank-avatar" style={{ background: 'rgba(15, 232, 245, 0.1)' }}><img src={ASSETS.avatars[1]} style={{ width: '28px', filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))' }} /></div>
            <div className="rank-name">애플콜렉터 <br /><span style={{ fontSize: '10px', color: '#8A9CA8' }}>방금 전 입찰</span></div>
            <div className="rank-price">845,000원</div>
          </div>
          <div className="ranking-item">
            <div className="rank-index">3</div>
            <div className="rank-avatar" style={{ background: 'rgba(255, 78, 80, 0.1)' }}><img src={ASSETS.avatars[2]} style={{ width: '28px', filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))' }} /></div>
            <div className="rank-name">중고왕은나 <br /><span style={{ fontSize: '10px', color: '#8A9CA8' }}>30분 전 입찰</span></div>
            <div className="rank-price">830,000원</div>
          </div>
        </section>

        <section className="card">
          <h2 className="card-title">시세 차트 <br /><span style={{ fontSize: '12px', color: '#8A9CA8', fontWeight: 500 }}>AI가 분석한 최근 6개월 실거래 추이</span></h2>
          <div style={{ position: 'relative', height: '140px' }}>
            <div className="chart-tooltip-badge">최고: 850,000원</div>
            <Line data={chartData} options={chartOptions} />
          </div>
        </section>

        <section className="card">
          <h2 className="card-title">거래 액션 버튼</h2>
          <button className="btn btn-primary" style={{ fontFamily: "'Pretendard', sans-serif" }}>입찰 완료하기</button>
          <button className="btn btn-cyan" style={{ fontFamily: "'Pretendard', sans-serif" }}>관심상품 추가 찜</button>
          <button className="btn btn-white" style={{ fontFamily: "'Pretendard', sans-serif" }}>판매자와 1:1 채팅하기</button>
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

/* --- 3. 찜목록 페이지 --- */
function WishlistPage({ onBack, onNavigate }: { onBack: () => void, onNavigate: (page: string, item?: any) => void }) {
  const now = useNow();
  // 디자인 시안을 위한 가상의 찜목록 
  const wishlistItems = FEED_ITEMS.filter(item => item.urgent).slice(0, 8);

  return (
    <>
      <header className="top-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div onClick={onBack} style={{ cursor: 'pointer', paddingRight: '8px' }}>
            <ChevronLeft size={28} color="#2E343E" />
          </div>
          <h1 className="header-title" style={{ fontSize: '20px' }}>나의 찜목록</h1>
        </div>
      </header>

      <div className="content-area" style={{ paddingTop: '80px', paddingBottom: '100px' }}>
        <div className="feed-grid fade-slide-up">
          {wishlistItems.length > 0 ? (
            wishlistItems.map(item => (
              <div key={item.id} className="feed-card" onClick={() => onNavigate('detail', item)}>
                <div className="feed-img-box" style={{ overflow: 'hidden', padding: 0 }}>
                  <img
                    src={item.img}
                    alt={item.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => { e.currentTarget.src = `https://picsum.photos/seed/${item.id}/400/400`; }}
                  />
                  {item.urgent && (
                    <div style={{ position: 'absolute', top: '8px', left: '8px', background: 'rgba(255, 78, 80, 0.9)', color: '#fff', fontSize: '12px', padding: '4px 8px', borderRadius: '12px', fontWeight: 'bold' }}>
                      🔥 마감임박
                    </div>
                  )}
                </div>
                <div className="feed-info">
                  <div className="feed-title">{item.title}</div>
                  <div className="feed-price">{item.price}</div>
                  <div className="feed-meta">
                    <span style={{ color: (item.endTime - now) < 3600000 && (item.endTime - now) > 0 ? '#FF4E50' : 'inherit' }}>남은 시간: {formatCountdown(item.endTime, now)}</span>
                    <span>입찰: {item.bids}명</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div style={{ textAlign: 'center', padding: '40px 20px', color: '#94A3B8', fontSize: '15px' }}>
              아직 찜한 상품이 없습니다. 💸
            </div>
          )}
        </div>
      </div>
    </>
  );
}

/* --- 스와이프 전용 래퍼 컴포넌트 --- */
function SwipeToDeleteCard({ children, onDelete, onClick }: { children: React.ReactNode, onDelete: () => void, onClick: () => void }) {
  const [offset, setOffset] = useState(0);
  const startX = useRef(0);
  const isDragging = useRef(false);
  const actionWidth = 80;

  const onTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX - offset;
    isDragging.current = true;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current) return;
    const x = e.touches[0].clientX - startX.current;
    if (x < 0) {
      setOffset(Math.max(x, -actionWidth - 20));
    } else {
      setOffset(0);
    }
  };

  const onTouchEnd = () => {
    isDragging.current = false;
    if (offset < -actionWidth / 2) {
      setOffset(-actionWidth);
    } else {
      setOffset(0);
    }
  };

  const handleClick = () => {
    if (offset < 0) {
      setOffset(0);
    } else {
      onClick();
    }
  };

  return (
    <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '20px' }}>
      <div 
        onClick={(e) => { e.stopPropagation(); onDelete(); }}
        style={{
          position: 'absolute', top: 0, right: 0, bottom: 0, width: `${actionWidth}px`,
          background: '#FF4E50', color: '#fff', display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 'bold',
          cursor: 'pointer'
        }}
      >
        <Trash2 size={24} style={{ marginBottom: '4px' }} />
        삭제
      </div>
      <div 
        onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd} onClick={handleClick}
        style={{
          transform: `translateX(${offset}px)`,
          transition: isDragging.current ? 'none' : 'transform 0.2s ease-out',
          position: 'relative', zIndex: 2
        }}
      >
        {children}
      </div>
    </div>
  );
}

/* --- 4. 입찰/진행 중(경매 참여) 페이지 --- */
function BiddingPage({ onBack, onNavigate }: { onBack: () => void, onNavigate: (page: string, item?: any) => void }) {
  const now = useNow();
  const [paymentExpiry] = useState(() => Date.now() + 15000); // 15초 결제 시한 (테스트용)
  const isExpired = paymentExpiry - now <= 0;
  
  // 가상의 입찰 참여 목록을 3개의 상태로 분리
  const [wonItems] = useState([
    { ...FEED_ITEMS[12], endTime: Date.now() - 3600000, tradeStatus: 'won' } // 낙찰 성공 샘플
  ]);

  const [completedItems, setCompletedItems] = useState([
    { ...FEED_ITEMS[15], endTime: Date.now() - 10000, tradeStatus: 'assessing' }, // 낙찰자 선택중
    { ...FEED_ITEMS[14], endTime: Date.now() - 80000, tradeStatus: 'sold' } // 판매완료
  ]);

  const [showChatModal, setShowChatModal] = useState(false);
  const [chatStep, setChatStep] = useState(0);

  const activeItems = FEED_ITEMS.slice(16, 20);

  return (
    <>
      <header className="top-header" style={{ backgroundColor: '#fff', zIndex: 50 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div onClick={onBack} style={{ cursor: 'pointer', paddingRight: '8px' }}>
            <ChevronLeft size={28} color="#2E343E" />
          </div>
          <h1 className="header-title" style={{ fontSize: '20px' }}>나의 입찰 내역</h1>
        </div>
      </header>

      <div className="content-area" style={{ paddingTop: '80px', paddingBottom: '100px' }}>
        
        {/* 낙찰 성공 (최상단 강조) */}
        {wonItems.length > 0 && (
          <section style={{ marginBottom: '36px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', padding: '0 20px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '6px', color: '#10B981' }}>
              🎉 낙찰 성공! 결제를 진행해주세요
            </h2>
            <div className="feed-grid fade-slide-up">
              {wonItems.map(item => (
                <div key={item.id} className="feed-card" style={{ cursor: 'pointer', border: '2px solid #10B981', boxShadow: '0 4px 12px rgba(16, 185, 129, 0.15)', background: '#F0FDF4' }} onClick={() => onNavigate('detail', item)}>
                  <div className="feed-img-box" style={{ overflow: 'hidden', padding: 0, position: 'relative' }}>
                    <img src={item.img} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.currentTarget.src = `https://picsum.photos/seed/${item.id}/400/400`; }} />
                    <div style={{ position: 'absolute', top: '8px', left: '50%', transform: 'translateX(-50%)', background: 'linear-gradient(135deg, #FDE68A 0%, #D97706 100%)', color: '#fff', fontSize: '13px', padding: '4px 10px', borderRadius: '12px', fontWeight: 'bold', whiteSpace: 'nowrap', boxShadow: '0 2px 4px rgba(0,0,0,0.2)', textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}>
                      🏆 내게 낙찰됨
                    </div>
                  </div>
                  <div className="feed-info" style={{ paddingBottom: '12px' }}>
                    <div className="feed-title" style={{ color: '#065F46' }}>{item.title}</div>
                    <div className="feed-price">{item.price} <span style={{fontSize:'12px', fontWeight:'normal', color:'#94A3B8'}}>(최종 낙찰가)</span></div>
                    <div className="feed-meta" style={{ marginBottom: '12px' }}>
                      {!isExpired ? (
                        <span style={{ color: '#EF4444', fontWeight: 'bold' }}>결제 기한: {formatCountdown(paymentExpiry, now)} 남음</span>
                      ) : (
                        <span style={{ color: '#DC2626', fontWeight: 'bold', fontSize: '13px' }}>결제 기한 경과 (낙찰 파기 패널티 1회 부여됨 🚨)</span>
                      )}
                    </div>
                    {!isExpired ? (
                      <div style={{ display: 'flex', gap: '8px', width: '100%' }}>
                        <button style={{ flex: 1, padding: '10px', background: '#fff', color: '#059669', border: '1px solid #059669', borderRadius: '8px', fontWeight: 'bold', fontSize: '13px', cursor: 'pointer' }} onClick={(e) => { e.stopPropagation(); setShowChatModal(true); }}>
                          판매자와 채팅 💬
                        </button>
                        <button style={{ flex: 1, padding: '10px', background: '#10B981', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', fontSize: '13px', cursor: 'pointer', boxShadow: '0 2px 4px rgba(16,185,129,0.3)' }} onClick={(e) => { e.stopPropagation(); alert('결제 페이지로 이동합니다.'); }}>
                          즉시 결제하기 💳
                        </button>
                      </div>
                    ) : (
                      <div style={{ width: '100%', padding: '10px', background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '8px', textAlign: 'center', fontSize: '13px', color: '#991B1B', fontWeight: 'bold', lineHeight: '1.4' }}>
                        결제 미이행으로 자동 낙찰 취소 및<br/>삼진아웃 패널티가 1회 적립되었습니다.
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 심사/결과 대기 중 영역 */}
        <section style={{ marginBottom: '36px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 'bold', padding: '0 20px', marginBottom: '16px' }}>⏳ 결과 대기 및 거래 종료</h2>
          <div className="feed-grid fade-slide-up">
            {completedItems.length > 0 ? (
              completedItems.map(item => (
                <SwipeToDeleteCard 
                  key={item.id} 
                  onDelete={() => setCompletedItems(prev => prev.filter(i => i.id !== item.id))}
                  onClick={() => onNavigate('detail', item)}
                >
                  <div className="feed-card" style={{ cursor: 'pointer' }}>
                    <div className="feed-img-box" style={{ overflow: 'hidden', padding: 0, position: 'relative' }}>
                      <img src={item.img} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: item.tradeStatus === 'sold' ? 0.6 : 1 }} onError={(e) => { e.currentTarget.src = `https://picsum.photos/seed/${item.id}/400/400`; }} />
                      {item.tradeStatus === 'assessing' && (
                        <div style={{ position: 'absolute', top: '8px', left: '50%', transform: 'translateX(-50%)', background: 'rgba(255, 78, 80, 0.95)', color: '#fff', fontSize: '12px', padding: '4px 8px', borderRadius: '12px', fontWeight: 'bold', whiteSpace: 'nowrap' }}>
                          결과 대기중
                        </div>
                      )}
                      {item.tradeStatus === 'sold' && (
                        <div style={{ position: 'absolute', top: '8px', left: '50%', transform: 'translateX(-50%)', background: 'rgba(46, 52, 62, 0.9)', color: '#fff', fontSize: '12px', padding: '4px 8px', borderRadius: '12px', fontWeight: 'bold', whiteSpace: 'nowrap' }}>
                          판매완료
                        </div>
                      )}
                    </div>
                    <div className="feed-info">
                      <div className="feed-title">{item.title}</div>
                      <div className="feed-price">{item.price} <span style={{fontSize:'12px', fontWeight:'normal', color:'#94A3B8'}}>(내 입찰가)</span></div>
                      <div className="feed-meta">
                        <span style={{ color: item.tradeStatus === 'sold' ? '#94A3B8' : '#FF4E50' }}>경매 종료됨</span>
                        <span style={{ color: item.tradeStatus === 'sold' ? '#94A3B8' : '#FF4E50', fontWeight: '600' }}>
                          {item.tradeStatus === 'sold' ? '판매완료' : '다른 낙찰자가 거래중'}
                        </span>
                      </div>
                      {item.tradeStatus === 'assessing' && (
                        <div style={{ fontSize: '11px', color: '#64748B', marginTop: '8px', background: '#F1F5F9', padding: '8px', borderRadius: '6px', lineHeight: 1.4 }}>
                          현재 최고가 낙찰자가 결제를 진행 중입니다.<br/>낙찰자가 포기할 경우, 대기자인 회원님께 안내됩니다.
                        </div>
                      )}
                    </div>
                  </div>
                </SwipeToDeleteCard>
              ))
            ) : (
                <div style={{ padding: '20px', color: '#94A3B8', fontSize: '14px', textAlign: 'center' }}>결과 대기 중인 항목이 없습니다.</div>
            )}
          </div>
        </section>

        {/* 입찰 진행 중 영역 */}
        <section>
          <h2 style={{ fontSize: '18px', fontWeight: 'bold', padding: '0 20px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ fontSize: '20px', filter: 'drop-shadow(1px 2px 2px rgba(0,0,0,0.2))' }}>🔨</span> 나의 입찰 진행중
          </h2>
          <div className="feed-grid fade-slide-up">
            {activeItems.length > 0 ? (
              activeItems.map(item => (
                <div key={item.id} className="feed-card" onClick={() => onNavigate('detail', item)}>
                  <div className="feed-img-box" style={{ overflow: 'hidden', padding: 0, position: 'relative' }}>
                    <img src={item.img} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.currentTarget.src = `https://picsum.photos/seed/${item.id}/400/400`; }} />
                    <div style={{ position: 'absolute', top: '8px', left: '50%', transform: 'translateX(-50%)', background: 'rgba(53, 216, 230, 0.95)', color: '#fff', fontSize: '12px', padding: '4px 8px', borderRadius: '12px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '2px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', whiteSpace: 'nowrap' }}>
                      최고가 입찰중
                    </div>
                  </div>
                  <div className="feed-info">
                    <div className="feed-title">{item.title}</div>
                    <div className="feed-price">{item.price} <span style={{fontSize:'12px', fontWeight:'normal', color:'#94A3B8'}}>(내 입찰가)</span></div>
                    <div className="feed-meta">
                      <span style={{ color: (item.endTime - now) < 3600000 && (item.endTime - now) > 0 ? '#FF4E50' : 'inherit' }}>남은 시간: {formatCountdown(item.endTime, now)}</span>
                      <span style={{ color: '#35D8E6', fontWeight: '600' }}>진행중</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
                <div style={{ padding: '20px', color: '#94A3B8', fontSize: '14px', textAlign: 'center' }}>진행 중인 항목이 없습니다.</div>
            )}
          </div>
        </section>

      </div>

      {showChatModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', zIndex: 999, display: 'flex', flexDirection: 'column' }}>
          <div style={{ background: '#fff', padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #E2E8F0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div onClick={() => { setShowChatModal(false); setChatStep(0); }} style={{ cursor: 'pointer' }}><ChevronLeft size={24} /></div>
              <span style={{ fontWeight: 'bold', fontSize: '18px' }}>판매자 ({wonItems[0]?.title || '상품'})</span>
            </div>
          </div>
          
          <div style={{ flex: 1, background: '#F8FAFC', padding: '20px', overflowY: 'auto' }}>
            <div style={{ textAlign: 'center', margin: '20px 0', color: '#94A3B8', fontSize: '13px' }}>오후 2:30</div>
            
            <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
              <div style={{ width: '40px', height: '40px', background: '#E2E8F0', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>🧑</div>
              <div style={{ background: '#fff', padding: '12px 16px', borderRadius: '0 16px 16px 16px', border: '1px solid #E2E8F0', maxWidth: '75%', fontSize: '14px' }}>
                낙찰을 축하드립니다! 직거래와 택배 중 어떤 걸로 진행하시겠어요?
              </div>
            </div>

            {/* Step 0: 초기 카테고리 선택 */}
            {chatStep === 0 && (
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '20px' }}>
                <button onClick={() => setChatStep(1)} style={{ background: '#fff', color: '#10B981', border: '1px solid #10B981', padding: '8px 12px', borderRadius: '16px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer' }}>
                  제품/배송 문의 📦
                </button>
                <button onClick={() => setChatStep(2)} style={{ background: '#fff', color: '#EF4444', border: '1px solid #FCA5A5', padding: '8px 12px', borderRadius: '16px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer' }}>
                  낙찰 포기 (취소요청) ⚠️
                </button>
              </div>
            )}

            {/* Step 1: 일반 문의 */}
            {chatStep === 1 && (
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                <div style={{ background: '#10B981', color: '#fff', padding: '12px 16px', borderRadius: '16px 0 16px 16px', maxWidth: '75%', fontSize: '14px' }}>
                  [제품/배송 문의] 상세한 배송 일정과 직거래 가능 위치 여쭤봅니다!
                </div>
              </div>
            )}

            {/* Step 2: 낙찰 취소 요청 */}
            {chatStep >= 2 && (
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                <div style={{ background: '#10B981', color: '#fff', padding: '12px 16px', borderRadius: '16px 0 16px 16px', maxWidth: '75%', fontSize: '14px' }}>
                  [낙찰포기] 부득이한 사정으로 낙찰 취소를 요청합니다. 정말 죄송합니다.
                </div>
              </div>
            )}

            {/* Step 2 Continued: 판매자 화면 시뮬레이션 */}
            {chatStep === 2 && (
              <div style={{ marginTop: '30px', padding: '16px', border: '1px dashed #94A3B8', borderRadius: '12px', background: '#F1F5F9' }}>
                <div style={{ textAlign: 'center', fontSize: '12px', color: '#64748B', marginBottom: '12px', fontWeight: 'bold' }}>👇 시뮬레이션: 이 요청을 받은 '판매자'의 화면 👇</div>
                <div style={{ background: '#fff', padding: '16px', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                  <p style={{ fontSize: '13px', marginBottom: '12px', fontWeight: 'bold' }}>낙찰자가 구매 포기를 요청했습니다. 어떻게 처리하시겠습니까?</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <button onClick={() => setChatStep(4)} style={{ padding: '10px', background: '#fff', border: '1px solid #CBD5E1', color: '#475569', borderRadius: '8px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer' }}>
                      사유 인정 (패널티 없이 취소 승인)
                    </button>
                    <button onClick={() => setChatStep(5)} style={{ padding: '10px', background: '#FEF2F2', border: '1px solid #FCA5A5', color: '#DC2626', borderRadius: '8px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer' }}>
                      악의적 노쇼 (■ 파기 패널티 부여 후 승인)
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: 패널티 없이 취소 성공 (낙찰자 수신) */}
            {chatStep === 4 && (
              <div style={{ display: 'flex', gap: '8px', marginTop: '20px' }}>
                <div style={{ width: '40px', height: '40px', background: '#E2E8F0', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>🤖</div>
                <div style={{ background: '#F0FDF4', border: '1px solid #A7F3D0', padding: '16px', borderRadius: '0 16px 16px 16px', maxWidth: '85%' }}>
                  <div style={{ fontWeight: 'bold', color: '#059669', marginBottom: '8px' }}>✅ 원만하게 합의 취소 완료됨</div>
                  <div style={{ fontSize: '13px', color: '#064E3B', lineHeight: 1.4 }}>
                    판매자가 귀하의 사유를 받아들여 <b>패널티 없이 취소</b>가 완료되었습니다.<br/><br/>판매자에게 정중한 인사를 남겨주세요.
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: 패널티 부여됨 (낙찰자 수신) */}
            {chatStep >= 5 && (
              <div style={{ display: 'flex', gap: '8px', marginTop: '20px' }}>
                <div style={{ width: '40px', height: '40px', background: '#E2E8F0', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>🤖</div>
                <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', padding: '16px', borderRadius: '0 16px 16px 16px', maxWidth: '85%' }}>
                  <div style={{ fontWeight: 'bold', color: '#DC2626', marginBottom: '8px' }}>🚨 낙찰 파기 패널티 조치됨 (알림)</div>
                  <div style={{ fontSize: '13px', color: '#7F1D1D', marginBottom: '16px', lineHeight: 1.4 }}>
                    판매자가 취소 요청을 승인하였으나, <b>파기 패널티 조치</b>를 등록했습니다.<br/><br/><b>현재 나의 누적 삼진아웃 경고: [1회/3회]</b>
                  </div>
                  <button onClick={() => setChatStep(6)} style={{ width: '100%', background: '#fff', color: '#DC2626', border: '1px solid #DC2626', padding: '8px', borderRadius: '8px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}>
                    억울한 패널티인가요? 상세 이의 제기하기
                  </button>
                </div>
              </div>
            )}
          </div>

          <div style={{ padding: '16px', background: '#fff', borderTop: '1px solid #E2E8F0', display: 'flex', gap: '8px' }}>
            <input type="text" placeholder="메시지를 입력하세요..." style={{ flex: 1, padding: '12px 16px', borderRadius: '24px', border: '1px solid #E2E8F0', outline: 'none', background: '#F8FAFC' }} />
            <button style={{ width: '46px', height: '46px', background: '#10B981', color: '#fff', borderRadius: '50%', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>전송</button>
          </div>

          {/* 이의 제기 접수 팝업 */}
          {chatStep === 6 && (
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', zIndex: 1000}}>
              <div style={{ background: '#fff', borderRadius: '20px', padding: '24px', width: '100%', maxWidth: '340px', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '12px', textAlign: 'center' }}>이의 제기 신청</h3>
                <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.5, marginBottom: '20px', textAlign: 'center' }}>
                  관리자가 진위를 파악할 수 있도록,<br/><b>현재 채팅방 내역 원본</b>이 함께 자동 제출됩니다. 진행하시겠습니까?
                </p>
                <div style={{ background: '#F1F5F9', padding: '12px', borderRadius: '8px', marginBottom: '24px', fontSize: '12px', color: '#64748B', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>📄</span> 자동 첨부: #CHAT-1240 내역 원본 
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button onClick={() => setChatStep(5)} style={{ flex: 1, padding: '12px', border: 'none', background: '#E2E8F0', color: '#475569', borderRadius: '12px', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer' }}>취소</button>
                  <button onClick={() => { alert('이의 제기를 성공적으로 접수했습니다. 처리 기간 동안 패널티 효력이 정지됩니다.'); setChatStep(0); setShowChatModal(false); }} style={{ flex: 1, padding: '12px', border: 'none', background: '#10B981', color: '#fff', borderRadius: '12px', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer' }}>제출하기</button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

/* --- 5. 채팅 목록 페이지 --- */
function ChatListPage({ onBack, onNavigate }: { onBack: () => void, onNavigate: (page: string, item?: any) => void }) {
  const [showChatModal, setShowChatModal] = useState(false);
  const [chatStep, setChatStep] = useState(0);
  const [activeChatRoom, setActiveChatRoom] = useState<any>(null);

  const chatRooms = [
    {
      id: 1,
      partner: '판매자 (LG 오브제컬렉션 냉장고)',
      status: 'penalty',
      lastMessage: '결제 기한이 만료되어 파기 패널티가 1회 부여되었습니다.',
      time: '방금 전',
      unread: 1,
      image: FEED_ITEMS[12].img
    },
    {
      id: 2,
      partner: '판매자 (아이폰 14 프로)',
      status: 'success',
      lastMessage: '✅ 판매자가 패널티 없이 취소를 승인했습니다.',
      time: '어제',
      unread: 0,
      image: FEED_ITEMS[10].img
    },
    {
      id: 3,
      partner: '판매자 (맥북 프로 16인치 M2)',
      status: 'ongoing',
      lastMessage: '직거래 장소는 어디가 편하신가요?',
      time: '3일 전',
      unread: 0,
      image: FEED_ITEMS[15].img
    }
  ];

  return (
    <>
      <header className="top-header" style={{ backgroundColor: '#fff', zIndex: 50, borderBottom: '1px solid #E2E8F0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div onClick={onBack} style={{ cursor: 'pointer', paddingRight: '8px' }}>
            <ChevronLeft size={28} color="#2E343E" />
          </div>
          <h1 className="header-title" style={{ fontSize: '20px' }}>나의 거래 채팅방</h1>
        </div>
      </header>

      <div className="content-area" style={{ paddingTop: '80px', paddingBottom: '30px', background: '#F8FAFC', minHeight: '100vh' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {chatRooms.map(room => (
            <div key={room.id} style={{ display: 'flex', gap: '16px', padding: '16px 20px', background: '#fff', borderBottom: '1px solid #F1F5F9', cursor: 'pointer' }} onClick={() => { setActiveChatRoom(room); setChatStep(room.status === 'penalty' ? 5 : room.status === 'success' ? 4 : 0); setShowChatModal(true); }}>
              <div style={{ position: 'relative' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '16px', overflow: 'hidden', background: '#E2E8F0', border: '1px solid #E2E8F0' }}>
                  <img src={room.image} alt="상품 이미지" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.currentTarget.src = `https://picsum.photos/seed/${room.id * 10}/200/200`; }} />
                </div>
                {room.unread > 0 && (
                  <div style={{ position: 'absolute', top: '-6px', right: '-6px', width: '22px', height: '22px', background: '#EF4444', color: '#fff', borderRadius: '50%', fontSize: '11px', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #fff', boxShadow: '0 2px 4px rgba(239,68,68,0.3)' }}>
                    {room.unread}
                  </div>
                )}
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <div style={{ fontWeight: 'bold', fontSize: '15px', color: '#1E293B', display: 'flex', alignItems: 'center', gap: '6px', maxWidth: '85%' }}>
                    <span style={{ display: 'inline-block', maxWidth: '130px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{room.partner}</span>
                    {room.status === 'penalty' && <span style={{ flexShrink: 0, padding: '2px 6px', background: '#FEF2F2', color: '#DC2626', fontSize: '10px', borderRadius: '4px', fontWeight: 'bold', border: '1px solid #FECACA', whiteSpace: 'nowrap' }}>패널티</span>}
                    {room.status === 'success' && <span style={{ flexShrink: 0, padding: '2px 6px', background: '#F0FDF4', color: '#059669', fontSize: '10px', borderRadius: '4px', fontWeight: 'bold', border: '1px solid #A7F3D0', whiteSpace: 'nowrap' }}>합의취소</span>}
                  </div>
                  <div style={{ fontSize: '12px', color: '#94A3B8', whiteSpace: 'nowrap' }}>{room.time}</div>
                </div>
                <div style={{ fontSize: '13px', color: room.unread > 0 ? '#1E293B' : '#64748B', fontWeight: room.unread > 0 ? 'bold' : 'normal', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {room.lastMessage}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 모달: 채팅방 상세 시뮬레이션 */}
      {showChatModal && activeChatRoom && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', zIndex: 999, display: 'flex', flexDirection: 'column' }}>
          <div style={{ background: '#fff', padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #E2E8F0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div onClick={() => { setShowChatModal(false); setActiveChatRoom(null); }} style={{ cursor: 'pointer' }}><ChevronLeft size={24} /></div>
              <span style={{ fontWeight: 'bold', fontSize: '18px' }}>{activeChatRoom.partner}</span>
            </div>
          </div>
          
          <div style={{ flex: 1, background: '#F8FAFC', padding: '20px', overflowY: 'auto' }}>
            {/* 기본 채팅 내역 */}
            <div style={{ textAlign: 'center', margin: '20px 0', color: '#94A3B8', fontSize: '13px' }}>오후 2:30</div>
            
            <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
              <div style={{ width: '40px', height: '40px', background: '#E2E8F0', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>🧑</div>
              <div style={{ background: '#fff', padding: '12px 16px', borderRadius: '0 16px 16px 16px', border: '1px solid #E2E8F0', maxWidth: '75%', fontSize: '14px' }}>
                낙찰을 축하드립니다! 직거래와 택배 중 어떤 걸로 진행하시겠어요?
              </div>
            </div>

            {/* Step 0: 초기 (일반 대화 중) */}
            {chatStep === 0 && (
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '20px' }}>
                <button onClick={() => setChatStep(1)} style={{ background: '#fff', color: '#10B981', border: '1px solid #10B981', padding: '8px 12px', borderRadius: '16px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer' }}>
                  제품/배송 문의 📦
                </button>
                <button onClick={() => setChatStep(2)} style={{ background: '#fff', color: '#EF4444', border: '1px solid #FCA5A5', padding: '8px 12px', borderRadius: '16px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer' }}>
                  낙찰 포기 (취소요청) ⚠️
                </button>
              </div>
            )}

            {/* Step 1: 일반 문의 */}
            {chatStep === 1 && (
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                <div style={{ background: '#10B981', color: '#fff', padding: '12px 16px', borderRadius: '16px 0 16px 16px', maxWidth: '75%', fontSize: '14px' }}>
                  [제품/배송 문의] 상세한 배송 일정과 직거래 가능 위치 여쭤봅니다!
                </div>
              </div>
            )}

            {/* Step 2 이상: 낙찰 취소 전송 흔적 */}
            {chatStep >= 2 && chatStep !== 4 && chatStep !== 5 && chatStep !== 6 && (
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                <div style={{ background: '#10B981', color: '#fff', padding: '12px 16px', borderRadius: '16px 0 16px 16px', maxWidth: '75%', fontSize: '14px' }}>
                  [낙찰포기] 부득이한 사정으로 낙찰 취소를 요청합니다. 정말 죄송합니다.
                </div>
              </div>
            )}

            {/* Step 2 시뮬레이션 */}
            {chatStep === 2 && (
              <div style={{ marginTop: '30px', padding: '16px', border: '1px dashed #94A3B8', borderRadius: '12px', background: '#F1F5F9' }}>
                <div style={{ textAlign: 'center', fontSize: '12px', color: '#64748B', marginBottom: '12px', fontWeight: 'bold' }}>👇 시뮬레이션: 이 요청을 받은 '판매자'의 화면 👇</div>
                <div style={{ background: '#fff', padding: '16px', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <button onClick={() => setChatStep(4)} style={{ padding: '10px', background: '#fff', border: '1px solid #CBD5E1', color: '#475569', borderRadius: '8px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer' }}>
                      사유 인정 (패널티 없이 취소 승인)
                    </button>
                    <button onClick={() => setChatStep(5)} style={{ padding: '10px', background: '#FEF2F2', border: '1px solid #FCA5A5', color: '#DC2626', borderRadius: '8px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer' }}>
                      악의적 노쇼 (■ 파기 패널티 부여 후 승인)
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: 원만한 합의 결과 */}
            {chatStep === 4 && (
              <div style={{ display: 'flex', gap: '8px', marginTop: '20px' }}>
                <div style={{ width: '40px', height: '40px', background: '#E2E8F0', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>🤖</div>
                <div style={{ background: '#F0FDF4', border: '1px solid #A7F3D0', padding: '16px', borderRadius: '0 16px 16px 16px', maxWidth: '85%' }}>
                  <div style={{ fontWeight: 'bold', color: '#059669', marginBottom: '8px' }}>✅ 원만하게 합의 취소 완료됨</div>
                  <div style={{ fontSize: '13px', color: '#064E3B', lineHeight: 1.4 }}>
                    판매자가 귀하의 사유를 받아들여 <b>패널티 없이 취소</b>가 완료되었습니다.<br/><br/>판매자에게 정중한 인사를 남겨주세요.
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: 패널티 결과 */}
            {chatStep >= 5 && (
              <div style={{ display: 'flex', gap: '8px', marginTop: '20px' }}>
                <div style={{ width: '40px', height: '40px', background: '#E2E8F0', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>🤖</div>
                <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', padding: '16px', borderRadius: '0 16px 16px 16px', maxWidth: '85%' }}>
                  <div style={{ fontWeight: 'bold', color: '#DC2626', marginBottom: '8px' }}>🚨 낙찰 파기 패널티 조치됨 (알림)</div>
                  <div style={{ fontSize: '13px', color: '#7F1D1D', marginBottom: '16px', lineHeight: 1.4 }}>
                    판매자가 취소 요청을 승인하였으나, <b>파기 패널티 조치</b>를 등록했습니다.<br/><br/><b>현재 나의 누적 삼진아웃 경고: [1회/3회]</b>
                  </div>
                  <button onClick={() => setChatStep(6)} style={{ width: '100%', background: '#fff', color: '#DC2626', border: '1px solid #DC2626', padding: '8px', borderRadius: '8px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}>
                    억울한 패널티인가요? 상세 이의 제기하기
                  </button>
                </div>
              </div>
            )}
          </div>

          <div style={{ padding: '16px', background: '#fff', borderTop: '1px solid #E2E8F0', display: 'flex', gap: '8px' }}>
            <input type="text" placeholder="메시지를 입력하세요..." style={{ flex: 1, padding: '12px 16px', borderRadius: '24px', border: '1px solid #E2E8F0', outline: 'none', background: '#F8FAFC' }} />
            <button style={{ width: '46px', height: '46px', background: '#10B981', color: '#fff', borderRadius: '50%', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>전송</button>
          </div>

          {/* 이의 제기 팝업 */}
          {chatStep === 6 && (
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', zIndex: 1000}}>
              <div style={{ background: '#fff', borderRadius: '20px', padding: '24px', width: '100%', maxWidth: '340px', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '12px', textAlign: 'center' }}>이의 제기 신청</h3>
                <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.5, marginBottom: '20px', textAlign: 'center' }}>
                  관리자가 진위를 파악할 수 있도록,<br/><b>현재 채팅방 내역 원본</b>이 함께 자동 제출됩니다. 진행하시겠습니까?
                </p>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button onClick={() => setChatStep(5)} style={{ flex: 1, padding: '12px', border: 'none', background: '#E2E8F0', color: '#475569', borderRadius: '12px', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer' }}>취소</button>
                  <button onClick={() => { alert('이의 제기가 접수되었습니다.'); setShowChatModal(false); }} style={{ flex: 1, padding: '12px', border: 'none', background: '#10B981', color: '#fff', borderRadius: '12px', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer' }}>제출하기</button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

/* --- 6. 내 정보 페이지 --- */
function UserPage({ onNavigate, onBack }: { onNavigate: (page: string, item?: any) => void, onBack: () => void }) {
  return (
    <>
      <header className="top-header" style={{ backgroundColor: '#fff', zIndex: 50, borderBottom: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div onClick={onBack} style={{ cursor: 'pointer', paddingRight: '8px' }}>
            <ChevronLeft size={28} color="#2E343E" />
          </div>
          <h1 className="header-title" style={{ fontSize: '20px', margin: 0 }}>내 정보</h1>
        </div>
        <div style={{ display: 'flex', gap: '16px', color: '#1E293B' }}>
          <Bell size={24} onClick={() => onNavigate('notifications')} style={{ cursor: 'pointer' }} />
          <Settings size={24} onClick={() => onNavigate('settings')} style={{ cursor: 'pointer' }} />
        </div>
      </header>
      
      {/* 바디 */}
      <div className="content-area" style={{ paddingTop: '64px', paddingBottom: '100px', background: '#F8FAFC', minHeight: '100vh' }}>
        
        {/* 1. 프로필 & 온도 & 삼진아웃 대시보드 */}
        <section style={{ background: '#fff', padding: '24px 20px', borderBottomLeftRadius: '24px', borderBottomRightRadius: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#F1F5F9', border: '2px solid #35D8E6', overflow: 'hidden' }}>
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1E293B', margin: 0 }}>도깨비검객</h2>
                <span style={{ fontSize: '11px', background: '#F1F5F9', color: '#64748B', padding: '2px 8px', borderRadius: '12px', fontWeight: 'bold' }}>상위 5%</span>
              </div>
              <div style={{ fontSize: '14px', color: '#64748B', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Award size={16} color="#35D8E6" />
                <span style={{ fontWeight: '500' }}>정확한 스나이퍼 (성공률 87%)</span>
              </div>
            </div>
            <div style={{ cursor: 'pointer' }}>
              <ChevronRight size={24} color="#CBD5E1" />
            </div>
          </div>

          <div style={{ padding: '16px', borderRadius: '16px', background: '#F8FAFC', border: '1px solid #F1F5F9' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#1E293B', display: 'flex', alignItems: 'center', gap: '6px' }}>
                🔥 깨비불 신뢰도
              </div>
              <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#FF4E50' }}>85°C</div>
            </div>
            {/* ProgressBar */}
            <div style={{ height: '8px', background: '#E2E8F0', borderRadius: '4px', overflow: 'hidden', marginBottom: '16px' }}>
              <div style={{ height: '100%', width: '85%', background: 'linear-gradient(90deg, #35D8E6 0%, #FF4E50 100%)', borderRadius: '4px' }} />
            </div>

            {/* 삼진아웃 구역 */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#FEF2F2', padding: '12px', borderRadius: '12px', border: '1px solid #FECACA', cursor: 'pointer' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShieldAlert size={18} color="#DC2626" />
                <span style={{ fontSize: '13px', color: '#991B1B', fontWeight: 'bold' }}>삼진아웃 낙찰 파기 경고</span>
              </div>
              <div style={{ display: 'flex', gap: '4px' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#DC2626' }} />
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#FCA5A5' }} />
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#FCA5A5' }} />
              </div>
            </div>
          </div>
        </section>

        {/* 2. 나의 경매 요약 */}
        <section style={{ margin: '24px 20px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '16px', color: '#1E293B' }}>나의 경매 활동</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div style={{ background: '#fff', borderRadius: '16px', padding: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.03)', cursor: 'pointer' }} onClick={() => onNavigate('bidding')}>
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>📡</div>
              <div style={{ fontSize: '12px', color: '#64748B', marginBottom: '4px', fontWeight: '500' }}>위태위태한</div>
              <div style={{ fontSize: '15px', fontWeight: 'bold', color: '#1E293B', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                입찰 진행 중 <span style={{ color: '#35D8E6', fontSize: '16px' }}>3건</span>
              </div>
            </div>
            <div style={{ background: '#fff', borderRadius: '16px', padding: '16px', boxShadow: '0 4px 12px rgba(239, 68, 68, 0.15)', border: '1px solid #FECACA', cursor: 'pointer' }} onClick={() => onNavigate('bidding')}>
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>⏰</div>
              <div style={{ fontSize: '12px', color: '#DC2626', marginBottom: '4px', fontWeight: 'bold' }}>스피드 결제 필요!</div>
              <div style={{ fontSize: '15px', fontWeight: 'bold', color: '#1E293B', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                결제 대기 중 <span style={{ color: '#EF4444', fontSize: '16px' }}>1건</span>
              </div>
            </div>
            <div style={{ background: '#fff', borderRadius: '16px', padding: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.03)', cursor: 'pointer' }}>
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>🛒</div>
              <div style={{ fontSize: '12px', color: '#64748B', marginBottom: '4px', fontWeight: '500' }}>내가 쟁취한</div>
              <div style={{ fontSize: '15px', fontWeight: 'bold', color: '#1E293B', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                낙찰 완료 <span style={{ color: '#10B981', fontSize: '16px' }}>12건</span>
              </div>
            </div>
            <div style={{ background: '#fff', borderRadius: '16px', padding: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.03)', cursor: 'pointer' }}>
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>📦</div>
              <div style={{ fontSize: '12px', color: '#64748B', marginBottom: '4px', fontWeight: '500' }}>최고가 갱신중</div>
              <div style={{ fontSize: '15px', fontWeight: 'bold', color: '#1E293B', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                나의 판매 <span style={{ color: '#F59E0B', fontSize: '16px' }}>2건</span>
              </div>
            </div>
          </div>
        </section>

        {/* 3. 깨비페이 (지갑) */}
        <section style={{ margin: '24px 20px', background: '#2E343E', borderRadius: '20px', padding: '24px', color: '#fff', boxShadow: '0 8px 16px rgba(46,52,62,0.15)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '16px', fontWeight: 'bold' }}>
              <Wallet size={20} color="#35D8E6" />
              깨비머니 <span style={{ fontSize: '11px', background: 'rgba(255,255,255,0.15)', padding: '4px 8px', borderRadius: '12px', fontWeight: 'bold', marginLeft: '4px' }}>빠른결제 전용</span>
            </div>
            <ChevronRight size={20} color="#94A3B8" style={{ cursor: 'pointer' }} />
          </div>
          <div style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '24px', letterSpacing: '-0.5px' }}>
            1,250,000 <span style={{ fontSize: '18px', fontWeight: 'normal', color: '#94A3B8' }}>원</span>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button style={{ flex: 1, padding: '14px', borderRadius: '14px', background: '#35D8E6', color: '#fff', border: 'none', fontWeight: 'bold', fontSize: '15px', cursor: 'pointer', boxShadow: '0 4px 10px rgba(53, 216, 230, 0.3)' }}>충전하기</button>
            <button style={{ flex: 1, padding: '14px', borderRadius: '14px', background: 'rgba(255,255,255,0.1)', color: '#fff', border: 'none', fontWeight: 'bold', fontSize: '15px', cursor: 'pointer' }}>카드 관리</button>
          </div>
        </section>

        {/* 4. 리스트 메뉴 */}
        <section style={{ margin: '0 20px', background: '#fff', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
          {[
            { icon: <Clock size={20} color="#64748B" />, title: '나의 거래 내역 전체보기' },
            { icon: <Heart size={20} color="#64748B" />, title: '찜한 상품 내역' },
            { icon: <ShieldAlert size={20} color="#64748B" />, title: '패널티 이의 제기 현황', badge: '1건 진행중' },
            { icon: <CreditCard size={20} color="#64748B" />, title: '자동 결제 수단 관리' },
            { icon: <Settings size={20} color="#64748B" />, title: '단골/키워드 알림 관리' },
          ].map((menu, idx) => (
            <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 20px', borderBottom: idx !== 4 ? '1px solid #F1F5F9' : 'none', cursor: 'pointer' }} onClick={() => menu.title.includes('찜한') && onNavigate('wishlist')}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: '15px', color: '#1E293B', fontWeight: '500' }}>
                {menu.icon}
                {menu.title}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {menu.badge && (
                  <span style={{ fontSize: '12px', background: '#F1F5F9', color: '#64748B', padding: '4px 10px', borderRadius: '12px', fontWeight: 'bold' }}>{menu.badge}</span>
                )}
                <ChevronRight size={18} color="#CBD5E1" />
              </div>
            </div>
          ))}
        </section>
      </div>

      <nav className="bottom-nav">
        <div className="nav-item" style={{cursor: 'pointer', color: '#94A3B8'}} onClick={() => onNavigate('home')}><Home size={22} strokeWidth={2.5} /><span>홈</span></div>
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
        <div className="nav-item active" style={{cursor: 'pointer'}} ><User size={22} /><span>내 정보</span></div>
      </nav>
    </>
  );
}

/* --- 7. 통합 설정 페이지 --- */
const CustomToggle = ({ checked, onChange }: { checked: boolean, onChange: () => void }) => (
  <div onClick={onChange} style={{ width: '48px', height: '26px', background: checked ? '#10B981' : '#E2E8F0', borderRadius: '13px', position: 'relative', cursor: 'pointer', transition: 'background 0.2s', flexShrink: 0 }}>
    <div style={{ position: 'absolute', top: '2px', left: checked ? '24px' : '2px', width: '22px', height: '22px', background: '#fff', borderRadius: '50%', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', transition: 'left 0.2s' }} />
  </div>
);

function SettingsPage({ onBack, onNavigate }: { onBack: () => void, onNavigate: (page: string) => void }) {
  const [toggles, setToggles] = useState({
    outbid: true,
    deadline: true,
    dnd: false,
    autoPay: false,
    blindMode: false,
    bioAuth: true,
    darkMode: false,
  });

  const handleToggle = (key: keyof typeof toggles) => {
    setToggles(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <h3 style={{ fontSize: '14px', fontWeight: 'bold', color: '#64748B', marginLeft: '20px', marginBottom: '8px', marginTop: '24px' }}>{children}</h3>
  );

  const SettingRow = ({ icon, title, desc, right, onClick }: { icon?: React.ReactNode, title: React.ReactNode, desc?: React.ReactNode, right?: React.ReactNode, onClick?: () => void }) => (
    <div onClick={onClick} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', background: '#fff', borderBottom: '1px solid #F1F5F9', cursor: onClick ? 'pointer' : 'default' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {icon}
        <div>
          <div style={{ fontSize: '15px', fontWeight: '500', color: '#1E293B' }}>{title}</div>
          {desc && <div style={{ fontSize: '12px', color: '#94A3B8', marginTop: '4px', lineHeight: 1.3 }}>{desc}</div>}
        </div>
      </div>
      <div>{right}</div>
    </div>
  );

  return (
    <>
      <header className="top-header" style={{ backgroundColor: '#fff', zIndex: 50, borderBottom: '1px solid #E2E8F0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div onClick={onBack} style={{ cursor: 'pointer', paddingRight: '8px' }}>
            <ChevronLeft size={28} color="#2E343E" />
          </div>
          <h1 className="header-title" style={{ fontSize: '18px' }}>설정</h1>
        </div>
      </header>

      <div className="content-area" style={{ paddingTop: '56px', paddingBottom: '40px', background: '#F8FAFC', minHeight: '100vh' }}>
        
        <SectionTitle>🔔 경매 특화 알림 설정</SectionTitle>
        <div style={{ borderTop: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0' }}>
          <SettingRow 
            icon={<Bell size={22} color="#64748B" />}
            title="입찰 추월(역전) 알림" 
            desc="내 최고 입찰가를 누군가 깼을 때 즉시 알림"
            right={<CustomToggle checked={toggles.outbid} onChange={() => handleToggle('outbid')} />}
          />
          <SettingRow 
            icon={<Clock size={22} color="#64748B" />}
            title="마감 임박 긴급 알림" 
            desc="관심 상품 종료 5분전 화면을 띄워 알림"
            right={<CustomToggle checked={toggles.deadline} onChange={() => handleToggle('deadline')} />}
          />
          <SettingRow 
            icon={<Moon size={22} color="#64748B" />}
            title="심야 방해금지 모드 (23시~07시)" 
            desc="*주의: 이 시간대 입찰을 뺏겨도 알림이 오지 않습니다."
            right={<CustomToggle checked={toggles.dnd} onChange={() => handleToggle('dnd')} />}
          />
        </div>

        <SectionTitle>⚡ 거래 및 입찰 자동화 설정</SectionTitle>
        <div style={{ borderTop: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0' }}>
          <SettingRow 
            icon={<CreditCard size={22} color="#64748B" />}
            title={<span style={{ color: '#059669', fontWeight: 'bold' }}>낙찰 즉시 자동 결제 (스피드 패스)</span>}
            desc="낙찰 성공 시, 깨비페이 잔액에서 즉시 결제하여 15초 미결제 패널티를 완벽 방지합니다."
            right={<CustomToggle checked={toggles.autoPay} onChange={() => handleToggle('autoPay')} />}
          />
          <SettingRow 
            icon={<Gavel size={22} color="#64748B" />}
            title="기본 입찰 단위 설정" 
            right={<div style={{ fontSize: '14px', color: '#35D8E6', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px' }}>+ 1,000 원 <ChevronRight size={16} /></div>}
          />
          <SettingRow 
            icon={<UserCheck size={22} color="#64748B" />}
            title="블라인드 입찰용 익명 닉네임 사용" 
            desc="입찰 시 '도깨비검객' 대신 '무명의 입찰자3'으로 표시"
            right={<CustomToggle checked={toggles.blindMode} onChange={() => handleToggle('blindMode')} />}
          />
        </div>

        <SectionTitle>🔐 계정 보안 및 인증</SectionTitle>
        <div style={{ borderTop: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0' }}>
          <SettingRow 
            icon={<MapPin size={22} color="#64748B" />}
            title="동네 위치 인증 관리"
            desc="마지막 인증: 한남동 (1일 전)"
            right={<button style={{ padding: '6px 12px', borderRadius: '8px', background: '#F1F5F9', border: '1px solid #CBD5E1', fontSize: '13px', fontWeight: 'bold', color: '#475569', cursor: 'pointer' }}>갱신</button>}
          />
          <SettingRow 
            icon={<Smartphone size={22} color="#64748B" />}
            title="생체 인증(Face ID) 빠른 결제" 
            right={<CustomToggle checked={toggles.bioAuth} onChange={() => handleToggle('bioAuth')} />}
          />
          <SettingRow 
            icon={<Key size={22} color="#64748B" />}
            title="깨비페이 결제 비밀번호 변경" 
            right={<ChevronRight size={20} color="#CBD5E1" />}
          />
        </div>

        <SectionTitle>📚 가이드 및 운영 정책</SectionTitle>
        <div style={{ borderTop: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0' }}>
          <SettingRow 
            icon={<ShieldAlert size={22} color="#DC2626" />}
            title={<span style={{ color: '#DC2626', fontWeight: 'bold' }}>🔥 깨비 패널티 및 삼진아웃 규정</span>}
            right={<ChevronRight size={20} color="#CBD5E1" />}
            onClick={() => onNavigate('guide_penalty')}
          />
          <SettingRow 
            icon={<HelpCircle size={22} color="#64748B" />}
            title="경매 금지/제한 품목 가이드" 
            right={<ChevronRight size={20} color="#CBD5E1" />}
            onClick={() => onNavigate('guide_restricted')}
          />
        </div>

        <SectionTitle>🌙 화면 테마 설정</SectionTitle>
        <div style={{ borderTop: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0', marginBottom: '40px' }}>
          <SettingRow 
            icon={<Moon size={22} color="#64748B" />}
            title="다크 모드 사용" 
            right={<CustomToggle checked={toggles.darkMode} onChange={() => handleToggle('darkMode')} />}
          />
        </div>
        
        <div style={{ textAlign: 'center', paddingBottom: '40px' }}>
          <span style={{ fontSize: '13px', color: '#94A3B8', textDecoration: 'underline', cursor: 'pointer' }}>로그아웃</span>
          <span style={{ margin: '0 12px', color: '#CBD5E1' }}>|</span>
          <span style={{ fontSize: '13px', color: '#94A3B8', textDecoration: 'underline', cursor: 'pointer' }}>회원탈퇴</span>
        </div>
      </div>
    </>
  );
}

/* --- 8. 운영 정책 가이드 페이지 --- */
function PenaltyGuidePage({ onBack }: { onBack: () => void }) {
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

function RestrictedItemGuidePage({ onBack }: { onBack: () => void }) {
  return (
    <>
      <header className="top-header" style={{ backgroundColor: '#fff', zIndex: 50, borderBottom: '1px solid #E2E8F0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div onClick={onBack} style={{ cursor: 'pointer', paddingRight: '8px' }}>
            <ChevronLeft size={28} color="#2E343E" />
          </div>
          <h1 className="header-title" style={{ fontSize: '18px' }}>경매 거래 금지 품목</h1>
        </div>
      </header>
      <div className="content-area" style={{ paddingTop: '56px', paddingBottom: '40px', background: '#F8FAFC', minHeight: '100vh', padding: '76px 20px 40px 20px' }}>
        
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

function NotificationPage({ onBack }: { onBack: () => void }) {
  const notis = [
    { type: 'auction_win', icon: '🎉', title: '경매 낙찰 성공!', desc: '축하합니다! [에어팟 프로 2세대]를 180,000원에 낙찰 받으셨습니다. 빠른결제 전용 깨비머니로 즉시 결제를 진행해주세요.', time: '방금 전', bg: '#EFF6FF', dot: true },
    { type: 'penalty', icon: '🚨', title: '낙찰 파기 경고 1회 누적', desc: '[로지텍 마우스] 낙찰 불이행(노쇼)으로 판매자로부터 패널티 경고 1회가 부여되었습니다. (현재 월 누적 1회)', time: '2시간 전', bg: '#FEF2F2', dot: true },
    { type: 'outbid', icon: '💸', title: '입찰가 추월 알림', desc: '아쉽네요! [나이키 조던 1] 입찰이 추월당했습니다. 현재 최고가: 83,000원', time: '1일 전', bg: '#fff', dot: false },
    { type: 'notice', icon: '🔔', title: '찜한 경매 마감 임박', desc: '관심 등록하신 [아이패드 프로 5세대] 경매가 5분 뒤 종료됩니다!', time: '2일 전', bg: '#fff', dot: false }
  ];

  return (
    <>
      <header className="top-header" style={{ backgroundColor: '#fff', zIndex: 50, borderBottom: '1px solid #E2E8F0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div onClick={onBack} style={{ cursor: 'pointer', paddingRight: '8px' }}>
            <ChevronLeft size={28} color="#2E343E" />
          </div>
          <h1 className="header-title" style={{ fontSize: '18px' }}>알림 메세지</h1>
        </div>
      </header>
      <div className="content-area" style={{ paddingTop: '56px', paddingBottom: '40px', background: '#F8FAFC', minHeight: '100vh' }}>
        {notis.map((noti, idx) => (
          <div key={idx} style={{ padding: '16px 20px', background: noti.bg, borderBottom: '1px solid #F1F5F9', position: 'relative', cursor: 'pointer' }}>
            {noti.dot && <div style={{ position: 'absolute', top: '24px', left: '10px', width: '6px', height: '6px', borderRadius: '50%', background: '#EF4444' }} />}
            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{ fontSize: '24px', flexShrink: 0, marginTop: '2px' }}>{noti.icon}</div>
              <div style={{ flex: 1 }}>
                <h4 style={{ fontSize: '15px', fontWeight: 'bold', color: '#1E293B', marginBottom: '4px' }}>{noti.title}</h4>
                <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.5, marginBottom: '8px' }}>{noti.desc}</p>
                <div style={{ fontSize: '12px', color: '#94A3B8' }}>{noti.time}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

/* --- 11. 스마트 상품 등록 마법사 페이지 --- */
function ProductRegistrationPage({ onBack, onComplete }: { onBack: () => void, onComplete?: () => void }) {
  const [step, setStep] = useState(1);
  const [isAiProcessing, setIsAiProcessing] = useState(false);
  const [useAiScribe, setUseAiScribe] = useState(true);
  const [useAiEnhance, setUseAiEnhance] = useState(true);
  const [usePremiumModel, setUsePremiumModel] = useState(false);
  const [saleType, setSaleType] = useState('경매');

  const nextStep = () => {
    if (step === 1) {
      setIsAiProcessing(true);
      setTimeout(() => {
        setIsAiProcessing(false);
        setStep(2);
      }, 1500);
    } else if (step === 4) {
      if (onComplete) onComplete();
      else onBack();
    } else {
      setStep(s => s + 1);
    }
  };

  return (
    <>
      <header className="top-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div onClick={step === 1 ? onBack : () => setStep(s => s - 1)} style={{ cursor: 'pointer', paddingRight: '12px' }}>
            <ChevronLeft size={28} color="#2E343E" />
          </div>
          <h1 className="header-title" style={{ fontSize: '18px', margin: 0 }}>스마트 상품 등록 ({step}/4)</h1>
        </div>
      </header>

      <div className="content-area" style={{ paddingTop: '80px', paddingBottom: '100px', minHeight: '100vh', background: '#F8FAFC' }}>
        
        {/* Step 1: 스마트 사진 스튜디오 */}
        {step === 1 && (
          <div className="fade-slide-up">
            <div style={{ marginBottom: '24px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '8px' }}>📸 스마트 사진 스튜디오</h2>
              <p style={{ color: '#64748B', fontSize: '15px' }}>허공에 뜬 가이드라인을 따라 360도 입체 촬영을 진행해보세요!</p>
            </div>

            <div style={{ background: '#E2E8F0', height: '240px', borderRadius: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginBottom: '24px', position: 'relative', overflow: 'hidden', boxShadow: 'inset 0 4px 20px rgba(0,0,0,0.05)' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'url(https://picsum.photos/400/300) center/cover', opacity: 0.5, filter: 'blur(4px)' }} />
              <div style={{ zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Camera size={56} color="#fff" style={{ marginBottom: '16px', filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.2))' }} />
                <div style={{ color: '#fff', fontWeight: 'bold', fontSize: '16px', background: 'rgba(0,0,0,0.4)', padding: '8px 16px', borderRadius: '20px', backdropFilter: 'blur(4px)' }}>클릭하여 360도 촬영 시작</div>
              </div>
              <div style={{ position: 'absolute', bottom: '16px', background: 'linear-gradient(90deg, #3B82F6, #8B5CF6)', color: '#fff', fontSize: '13px', padding: '8px 16px', borderRadius: '16px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px' }}><Wand2 size={16} /> 허공 가이드라인 활성화 됨</div>
            </div>

            <div style={{ background: '#fff', padding: '24px', borderRadius: '24px', boxShadow: '0 12px 32px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ background: '#EEF2FF', padding: '12px', borderRadius: '16px' }}><Wand2 size={24} color="#4F46E5" /></div>
                  <div>
                    <div style={{ fontWeight: 'bold', fontSize: '16px', marginBottom: '4px' }}>AI 화질 개선 및 자동 누끼</div>
                    <div style={{ fontSize: '13px', color: '#64748B' }}>저해상도를 보정하고 배경을 지워줍니다</div>
                  </div>
                </div>
                <CustomToggle checked={useAiEnhance} onChange={() => setUseAiEnhance(!useAiEnhance)} />
              </div>
              
              <div style={{ height: '1px', background: '#F1F5F9' }} />

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ background: '#FFF7ED', padding: '12px', borderRadius: '16px' }}><ImagePlus size={24} color="#F97316" /></div>
                  <div>
                    <div style={{ fontWeight: 'bold', fontSize: '16px', marginBottom: '4px' }}>프리미엄 AI 가상 모델샷</div>
                    <div style={{ fontSize: '13px', color: '#64748B' }}>AI 모델 착용샷 (매력도 극대화 ✨)</div>
                  </div>
                </div>
                <CustomToggle checked={usePremiumModel} onChange={() => setUsePremiumModel(!usePremiumModel)} />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: AI 자동 서기 */}
        {step === 2 && (
          <div className="fade-slide-up">
            <div style={{ marginBottom: '24px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '8px' }}>📝 AI 자동 서기</h2>
              <p style={{ color: '#64748B', fontSize: '15px' }}>등록하신 360도 이미지를 기반으로 AI가 상품 정보를 자동 작성했습니다.</p>
            </div>

            <div style={{ background: 'linear-gradient(135deg, #EEF2FF 0%, #E0E7FF 100%)', padding: '20px', borderRadius: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', border: '1px solid #C7D2FE' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#4338CA', fontWeight: 'bold', fontSize: '16px' }}>
                <Sparkles size={24} /> AI 판독 기반 원클릭 완성
              </div>
              <CustomToggle checked={useAiScribe} onChange={() => setUseAiScribe(!useAiScribe)} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div>
                <label style={{ fontSize: '14px', fontWeight: 'bold', color: '#475569', marginBottom: '10px', display: 'block' }}>카테고리</label>
                <div style={{ position: 'relative' }}>
                  <select style={{ width: '100%', padding: '18px 20px', borderRadius: '16px', border: '1px solid #E2E8F0', fontSize: '16px', background: '#fff', boxSizing: 'border-box', appearance: 'none', fontWeight: '500' }}>
                    <option>📱 전자기기/IT</option>
                  </select>
                  <ChevronDown size={20} color="#94A3B8" style={{ position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)' }} />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '14px', fontWeight: 'bold', color: '#475569', marginBottom: '10px', display: 'block' }}>GPS 기반 동네 인증</label>
                <div style={{ width: '100%', padding: '18px 20px', borderRadius: '16px', border: '2px solid #10B981', background: '#F0FDF4', fontSize: '16px', display: 'flex', alignItems: 'center', gap: '10px', color: '#065F46', boxSizing: 'border-box', fontWeight: '600' }}>
                  <MapPin size={22} /> 해운대구 우동 (일치)
                </div>
              </div>

              <div>
                <label style={{ fontSize: '14px', fontWeight: 'bold', color: '#475569', marginBottom: '10px', display: 'block' }}>상품명</label>
                <input type="text" value={useAiScribe ? "[상태S] 애플 아이패드 프로 11인치 4세대" : ""} placeholder="상품명을 입력하세요" onChange={()=>{}} style={{ width: '100%', padding: '18px 20px', borderRadius: '16px', border: '1px solid #E2E8F0', fontSize: '16px', boxSizing: 'border-box', fontWeight: '500', color: '#1E293B' }} />
              </div>
              
              <div>
                <label style={{ fontSize: '14px', fontWeight: 'bold', color: '#475569', marginBottom: '10px', display: 'block' }}>권장 상세 설명</label>
                <textarea rows={6} value={useAiScribe ? "360도 스캔 분석 결과:\n- 외관 상태: 찍힘이나 기스 없음 (S급)\n- 화면: 정상 (잔상 없음)\n\n애플 아이패드 프로 11인치 4세대입니다! 사용감이 거의 없으며 보호필름 부착되어 있습니다." : ""} onChange={()=>{}} placeholder="직접 백지부터 내용을 작성해주세요." style={{ width: '100%', padding: '20px', borderRadius: '16px', border: '1px solid #E2E8F0', fontSize: '15px', resize: 'none', boxSizing: 'border-box', lineHeight: '1.6', background: '#F8FAFC' }} />
              </div>
            </div>
          </div>
        )}

        {/* Step 3: 시세 판독 및 판매/거래 방식 */}
        {step === 3 && (
          <div className="fade-slide-up">
            <div style={{ marginBottom: '24px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '8px' }}>💡 판매 예측 & 방식</h2>
              <p style={{ color: '#64748B', fontSize: '15px' }}>빅데이터 시세를 바탕으로 최적의 거래 방식을 선택하세요.</p>
            </div>

            <div style={{ background: '#fff', padding: '24px', borderRadius: '24px', boxShadow: '0 12px 32px rgba(0,0,0,0.04)', marginBottom: '32px' }}>
              <div style={{ fontWeight: '800', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '18px' }}>
                <TrendingUp size={22} color="#3B82F6" /> 최근 3개월 적정 시세 추이
              </div>
              <div style={{ height: '160px', width: '100%', marginBottom: '16px' }}>
                <Line 
                  data={{ labels: ['3달전', '2달전', '1달전', '오늘'], datasets: [{ label: '평균가 (원)', data: [1150000, 1080000, 1050000, 1000000], borderColor: '#10B981', backgroundColor: 'rgba(16, 185, 129, 0.1)', fill: true, tension: 0.4 }] }}
                  options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { display: false }, x: { grid: { display: false } } } }}
                />
              </div>
              <div style={{ textAlign: 'center', background: '#F8FAFC', padding: '16px', borderRadius: '16px' }}>
                <span style={{ fontSize: '15px', color: '#64748B' }}>현 시점 AI 추천 권장 가격 ✨</span><br/>
                <span style={{ fontSize: '24px', fontWeight: '900', color: '#10B981' }}>1,000,000원</span>
              </div>
            </div>

            <div style={{ marginBottom: '16px', fontWeight: 'bold', fontSize: '16px', color: '#475569' }}>판매 방식 선택 (택 1)</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '32px' }}>
              <div onClick={() => setSaleType('경매')} style={{ background: saleType === '경매' ? '#1E293B' : '#fff', color: saleType === '경매' ? '#fff' : '#64748B', border: saleType === '경매' ? '2px solid #1E293B' : '2px solid #E2E8F0', padding: '20px 8px', borderRadius: '20px', textAlign: 'center', cursor: 'pointer', transition: 'all 0.2s', boxShadow: saleType === '경매' ? '0 12px 24px rgba(30, 41, 59, 0.2)' : 'none' }}>
                 <div style={{ fontSize: '32px', marginBottom: '12px' }}>🔥</div>
                 <div style={{ fontSize: '15px', fontWeight: '800' }}>경매 거래</div>
              </div>
              <div onClick={() => setSaleType('고정가')} style={{ background: saleType === '고정가' ? '#1E293B' : '#fff', color: saleType === '고정가' ? '#fff' : '#64748B', border: saleType === '고정가' ? '2px solid #1E293B' : '2px solid #E2E8F0', padding: '20px 8px', borderRadius: '20px', textAlign: 'center', cursor: 'pointer', transition: 'all 0.2s', boxShadow: saleType === '고정가' ? '0 12px 24px rgba(30, 41, 59, 0.2)' : 'none' }}>
                 <div style={{ fontSize: '32px', marginBottom: '12px' }}>⚡</div>
                 <div style={{ fontSize: '15px', fontWeight: '800' }}>빠른 고정가</div>
              </div>
              <div onClick={() => setSaleType('나눔')} style={{ background: saleType === '나눔' ? '#1E293B' : '#fff', color: saleType === '나눔' ? '#fff' : '#64748B', border: saleType === '나눔' ? '2px solid #1E293B' : '2px solid #E2E8F0', padding: '20px 8px', borderRadius: '20px', textAlign: 'center', cursor: 'pointer', transition: 'all 0.2s', boxShadow: saleType === '나눔' ? '0 12px 24px rgba(30, 41, 59, 0.2)' : 'none' }}>
                 <div style={{ fontSize: '32px', marginBottom: '12px' }}>😇</div>
                 <div style={{ fontSize: '15px', fontWeight: '800' }}>무료 나눔</div>
              </div>
            </div>

            {saleType === '경매' && (
              <div className="fade-slide-up" style={{ background: '#fff', padding: '24px', borderRadius: '24px', marginBottom: '32px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', border: '1px solid #F1F5F9' }}>
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ fontSize: '14px', fontWeight: 'bold', color: '#475569', marginBottom: '10px', display: 'block' }}>경매 시작가 (최저가)</label>
                  <input type="number" placeholder="권장 시세 이하로 설정 추천" style={{ width: '100%', padding: '18px 20px', borderRadius: '16px', border: '1px solid #E2E8F0', fontSize: '16px', boxSizing: 'border-box' }} />
                </div>
                <div>
                   <label style={{ fontSize: '14px', fontWeight: 'bold', color: '#475569', marginBottom: '10px', display: 'block' }}>경매 기간 (시간 지정)</label>
                   <div style={{ position: 'relative' }}>
                     <select style={{ width: '100%', padding: '18px 20px', borderRadius: '16px', border: '1px solid #E2E8F0', fontSize: '16px', background: '#fff', boxSizing: 'border-box', appearance: 'none', fontWeight: '500' }}>
                       <option>🕒 24시간 뒤 마감</option>
                       <option>🕒 48시간 뒤 마감</option>
                       <option>🕒 3일 뒤 마감</option>
                       <option>🕒 7일 뒤 마감</option>
                     </select>
                     <ChevronDown size={20} color="#94A3B8" style={{ position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)' }} />
                   </div>
                </div>
              </div>
            )}
            
            {saleType === '고정가' && (
              <div className="fade-slide-up" style={{ background: '#fff', padding: '24px', borderRadius: '24px', marginBottom: '32px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', border: '1px solid #F1F5F9' }}>
                <div>
                  <label style={{ fontSize: '14px', fontWeight: 'bold', color: '#475569', marginBottom: '10px', display: 'block' }}>흥정 없는 즉시 구매가</label>
                  <input type="number" placeholder="가격을 입력하세요" defaultValue={1000000} style={{ width: '100%', padding: '18px 20px', borderRadius: '16px', border: '1px solid #10B981', fontSize: '16px', boxSizing: 'border-box', fontWeight: 'bold', color: '#065F46', background: '#F0FDF4' }} />
                </div>
              </div>
            )}

            <div style={{ background: '#fff', padding: '24px', borderRadius: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', border: '1px solid #F1F5F9' }}>
              <div style={{ fontWeight: '800', marginBottom: '20px', color: '#1E293B', fontSize: '16px' }}>거래 선호 방식 (복수 선택 가능)</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#334155', fontWeight: '500' }}>
                  <MapPin size={22} color="#10B981" /> 이웃과 대면 직거래
                </div>
                <CustomToggle checked={true} onChange={() => {}} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#334155', fontWeight: '500' }}>
                  <Package size={22} color="#F59E0B" /> 안전 결제 택배 거래
                </div>
                <CustomToggle checked={true} onChange={() => {}} />
              </div>
            </div>
          </div>
        )}

        {/* Step 4: 최종 확인 */}
        {step === 4 && (
          <div className="fade-slide-up">
            <div style={{ marginBottom: '24px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: '900', marginBottom: '8px' }}>🤝 최종 확인 & 정책 동의</h2>
              <p style={{ color: '#64748B', fontSize: '15px' }}>건전하고 안전한 깨비 생태계를 위해 필수적으로 동의해주세요.</p>
            </div>

            <div style={{ background: '#FEF2F2', border: '1px solid #FCA5A5', padding: '24px', borderRadius: '24px', marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#DC2626', fontWeight: '800', fontSize: '18px', marginBottom: '16px' }}>
                <ShieldAlert size={24} /> 깨비마켓 철퇴 정책 안내
              </div>
              <ul style={{ color: '#991B1B', fontSize: '15px', paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '12px', margin: 0, lineHeight: '1.6' }}>
                <li>주류, 무기류, 마약류, 가품(짝퉁) 등 <strong>경매 금지 품목</strong> 등록 시 통보 없이 즉시 계정이 <strong style={{color: '#7F1D1D'}}>영구 정지</strong>됩니다.</li>
                <li>낙찰 후 구매자의 미결제 시는 물론, 판매자의 일방적인 <strong>노쇼 및 거래 파기</strong> 시에도 <strong>삼진아웃 시스템</strong>에 의해 영구 퇴출됩니다.</li>
              </ul>
            </div>

            <div style={{ background: '#fff', padding: '24px', borderRadius: '24px', display: 'flex', alignItems: 'flex-start', gap: '16px', border: '2px solid #10B981', cursor: 'pointer', boxShadow: '0 8px 20px rgba(16,185,129,0.1)' }}>
              <CheckCircle size={28} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div style={{ color: '#065F46', fontSize: '15px', lineHeight: '1.6', fontWeight: '600' }}>위 정책을 모두 숙지하였으며, 등록할 상품이 깨비마켓의 엄격한 상거래 규정에 위반되지 않고 신뢰할 수 있음을 서약합니다.</div>
            </div>
          </div>
        )}

      </div>

      <div style={{ position: 'fixed', bottom: 0, width: '100%', maxWidth: 'var(--app-width)', padding: '20px', background: 'linear-gradient(180deg, rgba(248,250,252,0) 0%, rgba(248,250,252,0.95) 20%, #F8FAFC 100%)', zIndex: 100, boxSizing: 'border-box' }}>
        <button 
          onClick={nextStep}
          className="btn btn-primary"
          style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', overflow: 'hidden', height: '60px', fontSize: '18px', borderRadius: '20px', fontWeight: '800', boxShadow: '0 12px 24px rgba(16,185,129,0.3)' }}
          disabled={isAiProcessing}
        >
          {isAiProcessing ? (
             <><Wand2 className="animate-spin-slow" /> AI가 사진을 분석하는 중...</>
          ) : (
             step === 4 ? <><CheckCircle /> 깨비마켓에 등록 완료하기</> : '다음 단계로'
          )}
        </button>
      </div>
    </>
  );
}

/* --- 앱 최상단 라우터 역할 --- */
function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [, setHistory] = useState<string[]>(['home']);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const appWrapperRef = useRef<HTMLDivElement>(null);
  const scrollPositions = useRef<Record<string, number>>({});

  const handleNavigate = (page: string, item?: any) => {
    if (appWrapperRef.current) {
      scrollPositions.current[currentPage] = appWrapperRef.current.scrollTop;
    }
    
    if (item) setSelectedItem(item);
    setHistory(prev => [...prev, page]);
    setCurrentPage(page);
    setTimeout(() => {
      if (appWrapperRef.current) appWrapperRef.current.scrollTop = 0;
    }, 0);
  };

  const handleBack = () => {
    setHistory(prev => {
      let nextTarget = 'home';
      const sourcePage = prev[prev.length - 1];
      if (prev.length > 1) {
        const newHistory = prev.slice(0, -1);
        nextTarget = newHistory[newHistory.length - 1];
        setCurrentPage(nextTarget as any);
        setTimeout(() => {
          if (appWrapperRef.current) {
            if (nextTarget === 'home' && ['wishlist', 'bidding', 'chat', 'user'].includes(sourcePage)) {
              appWrapperRef.current.scrollTop = 0;
            } else {
              appWrapperRef.current.scrollTop = scrollPositions.current[nextTarget] || 0;
            }
          }
        }, 0);
        return newHistory;
      }
      setCurrentPage('home');
      setTimeout(() => {
        if (appWrapperRef.current) {
          if (['wishlist', 'bidding', 'chat', 'user'].includes(sourcePage)) {
            appWrapperRef.current.scrollTop = 0;
          } else {
            appWrapperRef.current.scrollTop = scrollPositions.current['home'] || 0;
          }
        }
      }, 0);
      return ['home'];
    });
  };

  return (
    <div className="app-wrapper" ref={appWrapperRef}>
      {currentPage === 'home' && <MainPage onNavigate={handleNavigate} appWrapperRef={appWrapperRef} />}
      {currentPage === 'registration' && <ProductRegistrationPage onBack={handleBack} onComplete={() => handleNavigate('home')} />}
      {currentPage === 'detail' && <DetailPage item={selectedItem} onBack={handleBack} />}
      {currentPage === 'wishlist' && <WishlistPage onNavigate={handleNavigate} onBack={handleBack} />}
      {currentPage === 'bidding' && <BiddingPage onNavigate={handleNavigate} onBack={handleBack} />}
      {currentPage === 'chat' && <ChatListPage onNavigate={handleNavigate} onBack={handleBack} />}
      {currentPage === 'user' && <UserPage onNavigate={handleNavigate} onBack={handleBack} />}
      {currentPage === 'settings' && <SettingsPage onBack={handleBack} onNavigate={handleNavigate} />}
      {currentPage === 'guide_penalty' && <PenaltyGuidePage onBack={handleBack} />}
      {currentPage === 'guide_restricted' && <RestrictedItemGuidePage onBack={handleBack} />}
      {currentPage === 'notifications' && <NotificationPage onBack={handleBack} />}

    </div>
  );
}

export default App;
