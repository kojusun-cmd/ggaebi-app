import { useState } from "react";
import { ChevronLeft } from "lucide-react";

export function EmailLoginPage({ onBack, onComplete }: { onBack: () => void, onComplete: () => void }) {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');

  return (
    <>
      <header className="top-header" style={{ backgroundColor: '#fff', zIndex: 50, borderBottom: 'none', display: 'flex', alignItems: 'center' }}>
        <div onClick={onBack} style={{ cursor: 'pointer', paddingRight: '8px' }}>
          <ChevronLeft size={28} color="#2E343E" />
        </div>
        <h1 className="header-title" style={{ fontSize: '18px', margin: 0, fontWeight: 'bold' }}>이메일 로그인</h1>
      </header>
      
      <div style={{ padding: '80px 24px 24px', background: '#fff', minHeight: '100vh' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1E293B', marginBottom: '32px' }}>
          환영합니다!<br/>다시 꿀매물을 낚아채볼까요?
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <input 
            type="email" 
            placeholder="이메일을 입력해주세요" 
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={{ width: '100%', padding: '16px', borderRadius: '12px', border: '1px solid #E2E8F0', fontSize: '16px', outline: 'none' }} 
          />
          <input 
            type="password" 
            placeholder="비밀번호를 입력해주세요" 
            value={pw}
            onChange={e => setPw(e.target.value)}
            style={{ width: '100%', padding: '16px', borderRadius: '12px', border: '1px solid #E2E8F0', fontSize: '16px', outline: 'none' }} 
          />
        </div>

        <div style={{ textAlign: 'center', marginTop: '24px' }}>
          <span style={{ color: '#64748B', fontSize: '14px', textDecoration: 'underline', cursor: 'pointer' }}>비밀번호를 잊으셨나요?</span>
        </div>

        <div style={{ position: 'fixed', bottom: 'max(24px, env(safe-area-inset-bottom))', left: '24px', right: '24px' }}>
          <button 
            onClick={onComplete}
            disabled={!email || !pw}
            style={{ 
              width: '100%', padding: '16px', borderRadius: '14px', 
              background: (!email || !pw) ? '#E2E8F0' : 'linear-gradient(135deg, #35D8E6 0%, #10B981 100%)', 
              color: (!email || !pw) ? '#94A3B8' : '#fff', 
              border: 'none', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer' 
            }}
          >
            로그인하기
          </button>
        </div>
      </div>
    </>
  );
}
