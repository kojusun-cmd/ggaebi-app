import { useState, useEffect } from "react";
import { AuctionTimer } from "./AuctionTimer";
import type { FeedItem } from "../types";

interface FeedItemCardProps {
  item: FeedItem;
  onNavigate: (page: string, item: any) => void;
  badge?: React.ReactNode;
  priceSuffix?: React.ReactNode;
  customMeta?: React.ReactNode;
}

export function FeedItemCard({ item, onNavigate, badge, priceSuffix, customMeta }: FeedItemCardProps) {
  const [isEnded, setIsEnded] = useState(item.endTime <= Date.now());
  
  useEffect(() => {
    if (!isEnded) {
      const waitTime = item.endTime - Date.now();
      if (waitTime > 0 && waitTime < 2147483647) {
        const t = setTimeout(() => setIsEnded(true), waitTime);
        return () => clearTimeout(t);
      } else if (waitTime <= 0) {
        setIsEnded(true);
      }
    }
  }, [item.endTime, isEnded]);

  return (
    <div className={`feed-card ${isEnded ? 'ended-card' : ''}`} onClick={() => onNavigate('detail', item)}>
      <div className="feed-img-box" style={{ overflow: 'hidden', padding: 0, position: 'relative' }}>
        <img
          src={item.img}
          alt={item.title}
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover'
          }}
          onError={(e) => { e.currentTarget.src = `https://picsum.photos/seed/${item.id}/400/400`; }}
        />
        {!isEnded && badge}
        {isEnded && !badge && (
          <div className="fade-slide-up" style={{ 
            position: 'absolute', top: 0, left: 0, width: '100%',
            background: 'rgba(0, 0, 0, 0.65)', color: 'white', 
            padding: '6px 0', textAlign: 'center',
            fontWeight: 'bold', fontSize: '13px', zIndex: 2,
            whiteSpace: 'nowrap',
            backdropFilter: 'blur(2px)'
          }}>
            낙찰 완료
          </div>
        )}
      </div>
      <div className="feed-info" style={{ opacity: 1, transition: 'opacity 0.3s ease' }}>
        <div className="feed-title">{item.title}</div>
        <div className="feed-price">
          {item.price}
          {priceSuffix}
        </div>
        <div className="feed-meta">
          <span>남은 시간: {isEnded ? <span style={{ color: '#EF4444', fontWeight: 'bold' }}>마감 완료</span> : <AuctionTimer endTime={item.endTime} isDetail={false} />}</span>
          {customMeta || <span>입찰: {item.bids}명</span>}
        </div>
      </div>
    </div>
  );
}
