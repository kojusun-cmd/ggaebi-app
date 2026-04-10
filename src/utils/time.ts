export const parseTimeStr = (str: string) => {
      if (!str) return 0;
      if (str.includes(':')) {
        const parts = str.split(':');
        return parseInt(parts[0]) * 3600 + parseInt(parts[1]) * 60 + parseInt(parts[2]);
      }
      let seconds = 0;
      if (str.includes('일')) seconds += parseInt(str.match(/(\d+)일/)?.[1] || '0') * 86400;
      if (str.includes('시간')) seconds += parseInt(str.match(/(\d+)시간/)?.[1] || '0') * 3600;
      if (str.includes('분')) seconds += parseInt(str.match(/(\d+)분/)?.[1] || '0') * 60;
      if (str.includes('초')) seconds += parseInt(str.match(/(\d+)초/)?.[1] || '0');
      return seconds;
    };
export const formatCountdown = (endTime: number, now: number, highPrecision: boolean = false) => {
  const diffMs = endTime - now;
  if (diffMs <= 0) return '마감 완료';

  if (highPrecision && diffMs < 600000) {
    // 10분 미만일 때 밀리초 단위 렌더링
    const totalSec = Math.floor(diffMs / 1000);
    const m = String(Math.floor(totalSec / 60)).padStart(2, '0');
    const s = String(totalSec % 60).padStart(2, '0');
    const ms = String(diffMs % 1000).padStart(3, '0').substring(0, 2); // 앞 2자리만
    return `${m}:${s}.${ms}`;
  }

  const diffSec = Math.floor(diffMs / 1000);
  const days = Math.floor(diffSec / 86400);
  if (days >= 1) return `${days}일`; // 하루 이상 남았을 경우 일수로 표시
  
  const h = String(Math.floor(diffSec / 3600)).padStart(2, '0');
  const m = String(Math.floor((diffSec % 3600) / 60)).padStart(2, '0');
  const s = String(diffSec % 60).padStart(2, '0');
  return `${h}:${m}:${s}`;
};
