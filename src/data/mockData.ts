import { parseTimeStr } from "../utils/time";
import { ALL_SUB_REGIONS, INIT_TIME } from "./constants";
import { FEED_ITEMS as RAW_FEED_ITEMS } from "./mockProducts";

export const FEED_ITEMS = RAW_FEED_ITEMS.map((item, index) => {
      const reg = ALL_SUB_REGIONS[Math.floor((index * 13) % ALL_SUB_REGIONS.length)];
      return { 
        ...item, 
        endTime: INIT_TIME + parseTimeStr(item.time) * 1000,
        mainRegion: reg.main,
        subRegion: reg.sub
      };
    });
export const RAW_HOT_DEALS = [
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
export const HOT_DEALS = RAW_HOT_DEALS.map(d => ({ ...d, endTime: INIT_TIME + parseTimeStr(d.timeLeft) * 1000 }));
