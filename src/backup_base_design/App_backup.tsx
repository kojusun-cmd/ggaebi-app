import { useState } from 'react';
import { 
  ChevronRight, Search, Bell, Home, Gavel, Heart, User 
} from 'lucide-react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler);

// 3D 에셋 URL 모음 (Microsoft Fluent 3D Emoji)
const ASSETS = {
  phone: "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Mobile%20phone/3D/mobile_phone_3d.png",
  play: "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Play%20button/3D/play_button_3d.png",
  trophy: "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Trophy/3D/trophy_3d.png",
  medal: "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/1st%20place%20medal/3D/1st_place_medal_3d.png",
  rocket: "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Rocket/3D/rocket_3d.png",
  star: "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Star/3D/star_3d.png",
  avatars: [
    "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Fox/3D/fox_3d.png",
    "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Panda/3D/panda_3d.png",
    "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Cat/3D/cat_3d.png",
    "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Hatching%20chick/3D/hatching_chick_3d.png"
  ]
};

function App() {
  const [activeTab, setActiveTab] = useState('Home');

  const chartData = {
    labels: ['1d', '1W', '1m', '5m', '3h'],
    datasets: [{
      fill: true,
      data: [590, 610, 600, 640, 620],
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
      x: { grid: { display: false }, border: { display: false }, ticks: { color: '#8A9CA8', font: {family: 'Inter', size: 11} } },
      y: { display: false, min: 580 }
    },
    layout: { padding: { top: 20 } }
  };

  return (
    <div className="app-wrapper">
      
      {/* 1. Header (Clean & Modern) */}
      <header className="top-header">
        <div>
          <h1 className="header-title">Auction Hub</h1>
        </div>
        <div style={{display: 'flex', gap: '12px'}}>
          <Search size={24} color="#2E343E" />
          <Bell size={24} color="#2E343E" />
        </div>
      </header>

      <div className="content-area">
        
        {/* 2. Product Card */}
        <section className="card">
          <div className="product-img-box">
            {/* 입체 3D 호스팅 이미지 (그림자 포함) */}
            <img 
              src={ASSETS.phone} 
              alt="Phone 3D" 
              style={{ width: '120px', height: '120px', filter: 'drop-shadow(0 20px 20px rgba(53,216,230,0.4))' }} 
            />
          </div>
          
          <div className="product-label" style={{marginTop: '12px'}}>Title</div>
          <h2 className="product-name">Used iPhone 13 Pro</h2>
          
          <div className="product-stats">
            <div className="stat-col">
              <div className="stat-label">Price</div>
              <div className="stat-value">$640</div>
            </div>
            <div className="stat-col text-center" style={{alignItems: 'center'}}>
              <div className="stat-label">Time</div>
              <div className="stat-value">2h 15m</div>
            </div>
            <div className="stat-col right">
              <div className="stat-label">Bid</div>
              <div className="stat-value">19</div>
            </div>
          </div>

          <button className="btn btn-primary">BID NOW</button>
        </section>

        {/* 3. Live Auction Activity */}
        <section className="card">
          <h2 className="card-title">Live Auction Activity</h2>
          
          <div className="activity-item">
            <div className="activity-icon icon-green">
              <img src={ASSETS.play} style={{width: '20px', filter: 'drop-shadow(0 2px 4px rgba(17, 241, 126, 0.4))'}} />
            </div>
            <div className="activity-text">
              <div className="activity-title">Live Auction</div>
              <div className="activity-sub">Used iPhone 13 7h ago</div>
            </div>
            <ChevronRight size={18} color="#8A9CA8" />
          </div>
          
          <div className="activity-item">
            <div className="activity-icon icon-cyan">
              <img src={ASSETS.trophy} style={{width: '20px', filter: 'drop-shadow(0 2px 4px rgba(15, 232, 245, 0.4))'}} />
            </div>
            <div className="activity-text">
              <div className="activity-title">Place Your Bid!</div>
              <div className="activity-sub">Used iPhone 13h 2h ago</div>
            </div>
            <ChevronRight size={18} color="#8A9CA8" />
          </div>
          
          <div className="activity-item">
            <div className="activity-icon icon-green">
              <img src={ASSETS.play} style={{width: '20px', filter: 'drop-shadow(0 2px 4px rgba(17, 241, 126, 0.4))'}} />
            </div>
            <div className="activity-text">
              <div className="activity-title">Dad Auction</div>
              <div className="activity-sub">Used iPhone 13h 2h ago</div>
            </div>
            <ChevronRight size={18} color="#8A9CA8" />
          </div>
        </section>

        {/* 4. Bid Ranking */}
        <section className="card">
          <h2 className="card-title">Bid Ranking</h2>
          
          <div className="ranking-item">
            <div className="rank-index top">1</div>
            <div className="rank-avatar" style={{background: 'rgba(255, 184, 0, 0.1)'}}>
              <img src={ASSETS.avatars[0]} style={{width: '28px', filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))'}} />
            </div>
            <div className="rank-name">Azlin <br/><span style={{fontSize: '10px', color: '#8A9CA8', fontWeight: 400}}>Morstrncut</span></div>
            <div className="rank-price" style={{color: '#11F17E'}}>$640</div>
          </div>
          
          <div className="ranking-item">
            <div className="rank-index top">2</div>
            <div className="rank-avatar" style={{background: 'rgba(15, 232, 245, 0.1)'}}>
              <img src={ASSETS.avatars[1]} style={{width: '28px', filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))'}} />
            </div>
            <div className="rank-name">Janir <br/><span style={{fontSize: '10px', color: '#8A9CA8', fontWeight: 400}}>Latrdinran</span></div>
            <div className="rank-price">$640</div>
          </div>
          
          <div className="ranking-item">
            <div className="rank-index">3</div>
            <div className="rank-avatar" style={{background: 'rgba(255, 78, 80, 0.1)'}}>
              <img src={ASSETS.avatars[2]} style={{width: '28px', filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))'}} />
            </div>
            <div className="rank-name">Anthen <br/><span style={{fontSize: '10px', color: '#8A9CA8', fontWeight: 400}}>Clars</span></div>
            <div className="rank-price">$640</div>
          </div>
          
          <div className="ranking-item">
            <div className="rank-index">4</div>
            <div className="rank-avatar" style={{background: 'rgba(138, 156, 168, 0.1)'}}>
              <img src={ASSETS.avatars[3]} style={{width: '28px', filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))'}} />
            </div>
            <div className="rank-name">Rann <br/><span style={{fontSize: '10px', color: '#8A9CA8', fontWeight: 400}}>Disnay</span></div>
            <div className="rank-price">$640</div>
          </div>
        </section>

        {/* 5. Price Chart */}
        <section className="card">
          <h2 className="card-title">Price Chart <br/><span style={{fontSize: '12px', color: '#8A9CA8', fontWeight: 500}}>Bid History</span></h2>
          
          <div style={{position: 'relative', height: '140px'}}>
            <div className="chart-tooltip-badge">$640</div>
            <Line data={chartData} options={chartOptions} />
          </div>
        </section>

        {/* 6. Playful UI Buttons */}
        <section className="card">
          <h2 className="card-title">Playful UI Buttons</h2>
          <button className="btn btn-primary">PLACE BID</button>
          <button className="btn btn-cyan">WATCH</button>
          <button className="btn btn-white">CONFIRM BID</button>
          <button className="btn btn-white">MESSAGES</button>
        </section>

        {/* 7. Gamified Elements (Real 3D Replacement!) */}
        <section className="card">
          <h2 className="card-title text-center" style={{textAlign: 'center', marginBottom: '24px'}}>GAMIFIED ACHIEVEMENTS</h2>
          <div className="badge-row">
            <div className="gamify-badge" style={{background: '#E6FAFB'}}>
              <img src={ASSETS.medal} style={{width: '42px', filter: 'drop-shadow(0 8px 12px rgba(15, 232, 245, 0.4))'}} alt="1st medal" />
            </div>
            <div className="gamify-badge" style={{background: '#FFF5E5'}}>
              <img src={ASSETS.trophy} style={{width: '42px', filter: 'drop-shadow(0 8px 12px rgba(255, 184, 0, 0.4))'}} alt="trophy" />
            </div>
            <div className="gamify-badge" style={{background: '#FFEBEA'}}>
              <img src={ASSETS.rocket} style={{width: '42px', filter: 'drop-shadow(0 8px 12px rgba(255, 78, 80, 0.4))'}} alt="rocket" />
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

export default App;
