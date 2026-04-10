import { useState, useEffect } from 'react';
import { formatCountdown } from '../utils/time';

export function AuctionTimer({ endTime, isDetail = false }: { endTime: number, isDetail?: boolean }) {
  const [now, setNow] = useState(Date.now());
  const diffMs = endTime - now;
  const isUrgent = diffMs > 0 && diffMs < 3600000; // less than 1 hour
  const isSuperUrgent = diffMs > 0 && diffMs < 60000; // less than 1 minute

  useEffect(() => {
    if (diffMs <= 0) return;

    let intervalId: ReturnType<typeof setInterval>;
    if (isSuperUrgent && isDetail) {
      // 1분 미만이고 상세 페이지일 때: 밀리초 렌더링을 위해 50ms마다 업데이트
      intervalId = setInterval(() => setNow(Date.now()), 50);
    } else {
      // 그 외에는 1초마다 업데이트
      intervalId = setInterval(() => setNow(Date.now()), 1000);
    }
    
    return () => clearInterval(intervalId);
  }, [diffMs, isSuperUrgent, isDetail]);

  const isEnded = diffMs <= 0;
  const timeText = formatCountdown(endTime, now, isDetail);

  return (
    <span 
      style={{ 
        color: isEnded ? '#EF4444' : (isUrgent ? '#FF4E50' : 'inherit'),
        fontWeight: isEnded ? 'bold' : 'inherit'
      }} 
      className={`time-left ${isSuperUrgent && isDetail ? 'pulse-text' : ''}`}
    >
      {timeText}
    </span>
  );
}
