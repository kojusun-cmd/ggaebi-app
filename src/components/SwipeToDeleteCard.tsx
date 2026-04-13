import { Trash2 } from "lucide-react";
import { useState, useRef } from "react";

export function SwipeToDeleteCard({
    children,
    onDelete,
    onClick,
    className = '',
  }: {
    children: React.ReactNode,
    onDelete: () => void,
    onClick: () => void,
    className?: string,
  }) {
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
    <div className={className} style={{ position: 'relative', overflow: 'hidden', borderRadius: '20px' }}>
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
