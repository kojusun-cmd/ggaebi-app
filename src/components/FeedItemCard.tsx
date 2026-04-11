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
      <div className="feed-info" style={{ opacity: 1, transition: 'opacity 0.3s ease', display: 'flex', flexDirection: 'column', paddingBottom: '4px', overflow: 'hidden', justifyContent: 'center' }}>
        <div>
          <div className="feed-title" style={{ 
            paddingRight: '4px', 
            marginBottom: '4px', 
            wordBreak: 'keep-all'
          }}>
            {item.title}
          </div>
          <div className="feed-price" style={{ margin: 0, whiteSpace: 'nowrap' }}>
            {item.price}
            {priceSuffix && <span style={{ marginLeft: '4px', fontSize: '14px', color: 'var(--text-muted)' }}>{priceSuffix}</span>}
          </div>
        </div>
        
        <div className="feed-meta" style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'flex-end', 
          marginTop: '16px',
          gap: '4px', 
          paddingBottom: '2px',
          whiteSpace: 'nowrap'
        }}>
          {isEnded ? (
            <span style={{ color: '#EF4444', fontWeight: 'bold' }}>마감 완료</span>
          ) : (
            <span style={{ color: '#F97316', fontWeight: 'bold', display: 'flex', gap: '4px', alignItems: 'center' }}>
              남은시간 <AuctionTimer endTime={item.endTime} isDetail={false} />
            </span>
          )}
          {customMeta ? customMeta : <span style={{ color: '#64748B', fontWeight: 'bold' }}>입찰 {item.bids}명</span>}
        </div>
      </div>
    </div>
  );
}
