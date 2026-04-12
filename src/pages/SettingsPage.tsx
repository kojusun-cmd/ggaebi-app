import { ChevronLeft, Bell, Clock, Moon, CreditCard, Gavel, ChevronRight, UserCheck, MapPin, Smartphone, Key, ShieldAlert, HelpCircle } from "lucide-react";
import { useState } from "react";
import { usePopupHistory } from "../hooks/usePopupHistory";
import { CustomToggle } from "../components/CustomToggle";

export function SettingsPage({ onBack, onNavigate, onLogout }: { onBack: () => void, onNavigate: (page: string) => void, onLogout: () => void }) {
    const [toggles, setToggles] = useState({
            outbid: true,
            deadline: true,
            dnd: false,
            autoPay: false,
            blindMode: false,
            bioAuth: true,
            darkMode: false,
          });
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

    usePopupHistory(
      showLogoutConfirm,
      () => setShowLogoutConfirm(false),
      'Settings_LogoutConfirm'
    );

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
      <header className="top-header subpage" style={{ backgroundColor: '#fff', zIndex: 50, borderBottom: '1px solid #E2E8F0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div onClick={onBack} style={{ cursor: 'pointer', paddingRight: '8px' }}>
            <ChevronLeft size={28} color="#2E343E" />
          </div>
          <h1 className="header-title" style={{ fontSize: '18px' }}>설정</h1>
        </div>
      </header>

      <div className="content-area subpage" style={{ paddingTop: '56px', paddingBottom: '40px', background: '#F8FAFC', minHeight: '100vh' }}>
        
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
        
        <div style={{ textAlign: 'center', paddingBottom: '80px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px' }}>
          <button 
            onClick={() => {
              console.log('로그아웃 버튼 클릭됨');
              setShowLogoutConfirm(true);
            }}
            style={{ padding: '12px 16px', fontSize: '14px', color: '#64748B', fontWeight: 'bold', background: '#F1F5F9', border: 'none', borderRadius: '8px', cursor: 'pointer', position: 'relative', zIndex: 10, flex: 1, marginLeft: '20px' }}
          >
            로그아웃
          </button>
          <button 
            style={{ padding: '12px 16px', fontSize: '14px', color: '#94A3B8', fontWeight: '500', background: 'transparent', border: '1px solid #E2E8F0', borderRadius: '8px', cursor: 'pointer', position: 'relative', zIndex: 10, flex: 1, marginRight: '20px' }}
          >
            회원탈퇴
          </button>
        </div>

        {/* 로그아웃 방어 팝업 */}
        {showLogoutConfirm && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 99999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', backgroundColor: 'rgba(15, 23, 42, 0.7)', backdropFilter: 'blur(4px)' }}>
            <div style={{ background: '#fff', borderRadius: '24px', padding: '32px 24px', width: '100%', maxWidth: '320px', textAlign: 'center', boxShadow: '0 20px 40px rgba(0,0,0,0.2)', animation: 'slideUp 0.3s ease-out' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#FEF2F2', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                <ShieldAlert size={32} color="#EF4444" />
              </div>
              <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1E293B', marginBottom: '12px' }}>잠깐! 로그아웃 하시겠어요?</h2>
              <p style={{ fontSize: '14px', color: '#64748B', lineHeight: 1.5, marginBottom: '24px' }}>
                로그아웃 시 진행 중인 <strong>경매와 관련된 중요한 긴급 알림</strong>을 받을 수 없습니다. 정말 꿀매물을 놓쳐도 괜찮으신가요?
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <button 
                  onClick={() => setShowLogoutConfirm(false)}
                  style={{ width: '100%', padding: '16px', borderRadius: '14px', background: '#35D8E6', color: '#fff', border: 'none', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer' }}
                >
                  로그인 유지하고 꿀매물 지키기
                </button>
                <button 
                  onClick={() => {
                    localStorage.removeItem('ggaebi_isLoggedIn');
                    onLogout();
                    setShowLogoutConfirm(false);
                    alert('로그아웃이 되었습니다.');
                    window.location.reload();
                  }}
                  style={{ width: '100%', padding: '14px', borderRadius: '14px', background: '#F1F5F9', color: '#64748B', border: 'none', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer' }}
                >
                  그래도 로그아웃 할게요
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
    );
}
