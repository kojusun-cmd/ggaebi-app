import React from 'react';
import { X } from 'lucide-react';

interface AuthBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
  onEmailLogin: () => void;
  onEmailSignup: () => void;
}

export function AuthBottomSheet({ isOpen, onClose, onLogin, onEmailLogin, onEmailSignup }: AuthBottomSheetProps) {
  if (!isOpen) return null;

  return (
    <>
      <div 
        style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 9998, backdropFilter: 'blur(2px)' }} 
        onClick={onClose}
      />
      <div 
        style={{
          position: 'fixed', bottom: 0, left: '50%', transform: 'translate(-50%, 0)', width: '100%', maxWidth: 'var(--app-width, 480px)', 
          backgroundColor: '#fff', borderTopLeftRadius: '24px', borderTopRightRadius: '24px',
          padding: '32px 24px', paddingBottom: 'calc(32px + env(safe-area-inset-bottom))', zIndex: 9999,
          animation: 'slideUpCenter 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          boxShadow: '0 -10px 40px rgba(0,0,0,0.1)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1E293B', marginBottom: '8px', lineHeight: 1.4, letterSpacing: '-0.5px' }}>
              3초 만에 시작하고<br/>
              <span style={{ color: '#FF4E50' }}>꿀매물</span>을 낚아채세요!
            </h2>
            <p style={{ fontSize: '13px', color: '#64748B', marginTop: '12px', background: '#F8FAFC', padding: '12px', borderRadius: '12px', border: '1px solid #F1F5F9' }}>
              🎁 지금 가입하면 <b>AI 시세분석 / 초정밀 핫템 알림 프리미엄권(30일)</b>이 즉시 발동됩니다!
            </p>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', padding: '4px', cursor: 'pointer', marginTop: '4px' }}>
            <X size={24} color="#94A3B8" />
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <button onClick={onLogin} style={{ width: '100%', padding: '16px', borderRadius: '14px', background: '#FEE500', color: '#191919', border: 'none', fontWeight: 'bold', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', cursor: 'pointer' }}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/e/e3/KakaoTalk_logo.svg" alt="kakao" style={{ width: '20px', height: '20px' }} />
            카카오로 3초 만에 시작
          </button>
          <button onClick={onLogin} style={{ width: '100%', padding: '16px', borderRadius: '14px', background: '#03C75A', color: '#fff', border: 'none', fontWeight: 'bold', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', cursor: 'pointer' }}>
            <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.986 4.904v6.082l-4.577-6.082H4.407v10.188h4.015V8.995l4.582 6.097h4.002V4.904h-4.02z" fill="#fff"/>
            </svg>
            네이버로 시작
          </button>
          <button onClick={onLogin} style={{ width: '100%', padding: '16px', borderRadius: '14px', background: '#fff', color: '#1E293B', border: '1px solid #E2E8F0', fontWeight: 'bold', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', cursor: 'pointer' }}>
            <svg width="20" height="20" viewBox="0 0 48 48">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.7 17.66 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
              <path fill="none" d="M0 0h48v48H0z"/>
            </svg>
            구글로 시작
          </button>
          <button onClick={onLogin} style={{ width: '100%', padding: '16px', borderRadius: '14px', background: '#000', color: '#fff', border: 'none', fontWeight: 'bold', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', cursor: 'pointer' }}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="apple" style={{ width: '20px', height: '20px', filter: 'invert(1)' }} />
            Apple로 시작
          </button>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '16px', gap: '16px' }}>
          <span onClick={onEmailLogin} style={{ fontSize: '13px', color: '#64748B', cursor: 'pointer', textDecoration: 'underline' }}>이메일로 로그인</span>
          <div style={{ width: '1px', height: '12px', background: '#CBD5E1' }} />
          <span onClick={onEmailSignup} style={{ fontSize: '13px', color: '#64748B', cursor: 'pointer', textDecoration: 'underline' }}>이메일로 가입하기</span>
        </div>

        <style>
          {`
            @keyframes slideUpCenter {
              from { transform: translate(-50%, 100%); }
              to { transform: translate(-50%, 0); }
            }
          `}
        </style>
      </div>
    </>
  );
}
