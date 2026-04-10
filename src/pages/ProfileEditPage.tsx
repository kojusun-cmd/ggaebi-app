import { useState } from "react";
import { ChevronLeft, Camera, ShieldAlert, CheckCircle, Smartphone, Mail, AlertTriangle } from "lucide-react";

export function ProfileEditPage({ onBack, onComplete }: { onBack: () => void, onComplete: () => void }) {
  const [nickname, setNickname] = useState("도깨비검객");
  const [bio, setBio] = useState("친절하게 쿨거래 원합니다!");

  const handleSave = () => {
    // 실제 환경에서는 백엔드/Firebase로 업데이트 로직 추가
    alert("프로필이 성공적으로 업데이트 되었습니다!");
    onComplete();
  };

  return (
    <div className="fade-slide-up" style={{ backgroundColor: '#F8FAFC', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header className="top-header" style={{ backgroundColor: '#fff', zIndex: 50, borderBottom: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', position: 'sticky', top: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div onClick={onBack} style={{ cursor: 'pointer', paddingRight: '8px' }}>
            <ChevronLeft size={28} color="#2E343E" />
          </div>
          <h1 className="header-title" style={{ fontSize: '20px', margin: 0, fontWeight: 'bold', color: '#1E293B' }}>프로필 수정</h1>
        </div>
        <div>
          <button 
            onClick={handleSave} 
            style={{ 
              background: 'linear-gradient(135deg, #35D8E6 0%, #10B981 100%)', 
              color: '#fff', 
              border: 'none', 
              borderRadius: '12px', 
              padding: '10px 20px', 
              fontWeight: 'bold', 
              fontSize: '15px', 
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(16,185,129,0.2)'
            }}
          >
            저장
          </button>
        </div>
      </header>

      <div style={{ padding: '32px 24px', flex: 1, position: 'relative' }}>
        
        {/* Profile Image Section */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '32px' }}>
          <div style={{ position: 'relative', width: '100px', height: '100px', cursor: 'pointer' }}>
            <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: '#F1F5F9', border: '3px solid #35D8E6', overflow: 'hidden', boxShadow: '0 8px 16px rgba(53, 216, 230, 0.2)' }}>
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ 
              position: 'absolute', bottom: 0, right: 0, width: '36px', height: '36px', borderRadius: '50%', background: '#1E293B', border: '3px solid #F8FAFC', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' 
            }}>
              <Camera size={18} color="#fff" />
            </div>
          </div>
          <div style={{ color: '#64748B', fontSize: '13px', marginTop: '12px', fontWeight: '500' }}>사진 변경은 여기를 눌러주세요</div>
        </div>

        {/* Edit Form */}
        <div style={{ background: '#fff', padding: '24px', borderRadius: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.02)', marginBottom: '24px' }}>
          {/* Nickname */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', fontWeight: 'bold', color: '#334155', marginBottom: '8px' }}>
              <span>닉네임</span>
              <span style={{ color: nickname.length > 20 ? '#EF4444' : '#94A3B8', fontWeight: 'normal' }}>{nickname.length}/20</span>
            </label>
            <div style={{ position: 'relative' }}>
               <input 
                 value={nickname} 
                 onChange={(e) => setNickname(e.target.value.substring(0, 20))}
                 placeholder="닉네임을 입력해주세요 (최대 20자)" 
                 style={{ width: '100%', padding: '16px', borderRadius: '16px', border: '1px solid #E2E8F0', fontSize: '16px', boxSizing: 'border-box', background: '#F8FAFC', color: '#1E293B', fontWeight: '600', transition: 'border-color 0.2s', outline: 'none' }} 
                 onFocus={(e) => e.target.style.borderColor = '#35D8E6'}
                 onBlur={(e) => e.target.style.borderColor = '#E2E8F0'}
               />
               <div style={{ padding: '8px 12px', background: '#F0FDF4', color: '#15803D', fontSize: '12px', fontWeight: 'bold', borderRadius: '8px', border: '1px solid #BBF7D0', marginTop: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CheckCircle size={14} color="#15803D" /> 사용 가능한 멋진 닉네임이에요!
               </div>
               <div style={{ color: '#94A3B8', fontSize: '12px', marginTop: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <AlertTriangle size={12} /> 닉네임은 30일에 한 번만 변경할 수 있습니다.
               </div>
            </div>
          </div>

          {/* Bio */}
          <div>
            <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', fontWeight: 'bold', color: '#334155', marginBottom: '8px' }}>
              <span>내 소개 (선택)</span>
              <span style={{ color: bio.length > 40 ? '#EF4444' : '#94A3B8', fontWeight: 'normal' }}>{bio.length}/40</span>
            </label>
            <input 
              value={bio} 
              onChange={(e) => setBio(e.target.value.substring(0, 40))}
              placeholder="나를 잘 나타내는 한 줄 소개를 적어주세요!" 
              style={{ width: '100%', padding: '16px', borderRadius: '16px', border: '1px solid #E2E8F0', fontSize: '15px', boxSizing: 'border-box', background: '#F8FAFC', color: '#334155', outline: 'none', transition: 'border-color 0.2s' }} 
              onFocus={(e) => e.target.style.borderColor = '#35D8E6'}
              onBlur={(e) => e.target.style.borderColor = '#E2E8F0'}
            />
          </div>
        </div>

        {/* Fixed Non-Editable Section */}
        <div style={{ background: '#fff', padding: '24px', borderRadius: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#1E293B', marginBottom: '20px' }}>내 프로필 배지 & 인증</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
             <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '16px', borderBottom: '1px solid #F1F5F9' }}>
               <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                 <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#F0F9FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                   <Smartphone size={22} color="#0EA5E9" />
                 </div>
                 <div>
                   <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#334155' }}>휴대폰 본인인증</div>
                   <div style={{ fontSize: '12px', color: '#10B981', fontWeight: 'bold', marginTop: '2px' }}>인증 완료 (010-****-1234)</div>
                 </div>
               </div>
               <CheckCircle size={24} color="#10B981" />
             </div>

             <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
               <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                 <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#F0FDF4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                   <Mail size={22} color="#10B981" />
                 </div>
                 <div>
                   <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#334155' }}>이메일 계정 연동</div>
                   <div style={{ fontSize: '12px', color: '#10B981', fontWeight: 'bold', marginTop: '2px' }}>연동 완료 (example@gmail.com)</div>
                 </div>
               </div>
               <CheckCircle size={24} color="#10B981" />
             </div>
          </div>
          
          <div style={{ background: '#FEF2F2', padding: '16px', borderRadius: '16px', marginTop: '24px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
            <ShieldAlert size={20} color="#DC2626" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <div style={{ fontSize: '13px', color: '#991B1B', fontWeight: 'bold', marginBottom: '6px' }}>프로필 정책 안내</div>
              <div style={{ fontSize: '12px', color: '#B91C1C', lineHeight: '1.6' }}>
                욕설, 타인 비방, 부적절한 단어나 사진을 프로필에 등록할 경우 사전 통보 없이 <strong>삼진아웃 시스템</strong>에 의해 영구 퇴출될 수 있습니다.
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
