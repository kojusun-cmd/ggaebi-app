import { ChevronLeft } from "lucide-react";
import { FEED_ITEMS } from "../data/mockData";
import { FeedItemCard } from "../components/FeedItemCard";

export function WishlistPage({ onBack, onNavigate }: { onBack: () => void, onNavigate: (page: string, item?: any) => void }) {
    const wishlistItems = FEED_ITEMS.filter(item => item.urgent).slice(0, 8);
    return (
    <>
      <header className="top-header subpage">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div onClick={onBack} style={{ cursor: 'pointer', paddingRight: '8px' }}>
            <ChevronLeft size={28} color="#2E343E" />
          </div>
          <h1 className="header-title" style={{ fontSize: '20px' }}>나의 찜목록</h1>
        </div>
      </header>

      <div className="content-area subpage" style={{ paddingTop: '80px', paddingBottom: '100px' }}>
        <div className="feed-grid fade-slide-up">
          {wishlistItems.length > 0 ? (
            wishlistItems.map(item => (
              <FeedItemCard
                key={item.id}
                item={item}
                onNavigate={onNavigate}
                badge={
                  item.urgent ? (
                    <div style={{ position: 'absolute', top: '8px', left: '8px', background: 'rgba(255, 78, 80, 0.9)', color: '#fff', fontSize: '12px', padding: '4px 8px', borderRadius: '12px', fontWeight: 'bold' }}>
                      🔥 마감임박
                    </div>
                  ) : null
                }
              />
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
