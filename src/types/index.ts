export interface FeedItem {
  id: number;
  title: string;
  price: string;
  time: string;
  bids: number;
  img: string;
  cat: string;
  sub: string;
  shadow: string;
  urgent: boolean;
  endTime: number;
  mainRegion: string;
  subRegion: string;
  tradeStatus?: string;
}
