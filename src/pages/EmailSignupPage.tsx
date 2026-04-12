import { useState } from "react";
import { ChevronLeft, ShieldAlert, CheckCircle, Smartphone, MapPin, Wand2, Key, Loader2 } from "lucide-react";

export function EmailSignupPage({ onBack, onComplete }: { onBack: () => void, onComplete: () => void }) {
  const [step, setStep] = useState(1);
  
  // Step 1: Phone Validation
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  // Step 2: Account
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');

  // Step 3: Location
  const [isLocating, setIsLocating] = useState(false);
  const [region, setRegion] = useState('');

  // Step 5: Persona
  const [nickname, setNickname] = useState('');

  const generateNickname = (localRegion: string) => {
    const adjectives = ['날렵한', '매서운', '친절한', '정직한', '불꽃같은', '여유로운'];
    const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
    const rgn = localRegion.split(' ').pop() || '동네';
    return `${adj}_${rgn}_도깨비`;
  };

  const handleNext = () => {
    if (step === 1 && isVerified) setStep(2);
    else if (step === 2 && email && pw) setStep(3);
    else if (step === 3 && region) setStep(4);
    else if (step === 4) {
      setNickname(generateNickname(region));
      setStep(5);
    }
  };

  const handleSendCode = () => {
    if (phone.length > 9) setIsCodeSent(true);
  };

  const handleVerifyCode = () => {
    if (code.length >= 4) setIsVerified(true);
  };

  const handleFindLocation = () => {
    setIsLocating(true);
    setTimeout(() => {
      setRegion('서울특별시 강남구 역삼동');
      setIsLocating(false);
    }, 1500);
  };

  return (
    <>
      <header className="top-header" style={{ backgroundColor: '#fff', zIndex: 50, borderBottom: 'none', display: 'flex', alignItems: 'center' }}>
        <div onClick={step === 1 ? onBack : () => setStep(step === 5 ? 5 : step - 1)} style={{ cursor: 'pointer', paddingRight: '8px' }}>
          {step !== 5 && <ChevronLeft size={28} color="#2E343E" />}
        </div>
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          {step < 5 && (
            <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
              {[1, 2, 3, 4].map(s => (
                <div key={s} style={{ width: '24px', height: '4px', borderRadius: '2px', background: s <= step ? '#10B981' : '#E2E8F0', transition: 'all 0.3s' }} />
              ))}
            </div>
          )}
        </div>
        <div style={{ width: '28px' }} /> {/* Right placeholder */}
      </header>
      
      <div style={{ padding: '80px 24px 100px', background: '#fff', minHeight: '100vh', boxSizing: 'border-box' }}>
        
        {/* STEP 1: Phone Verification */}
        {step === 1 && (
          <div className="fade-slide-up">
            <div style={{ width: '48px', height: '48px', background: '#F0FDF4', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
              <Smartphone size={24} color="#10B981" />
            </div>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1E293B', marginBottom: '8px' }}>
              클린한 깨비마켓을 위해<br/>본인인증이 필요해요.
            </h2>
            <p style={{ color: '#64748B', fontSize: '14px', marginBottom: '32px', lineHeight: 1.5 }}>노쇼 및 사기 방지를 위한 필수 단계입니다.<br/>에스크로 및 신뢰도 시스템에만 활용됩니다.</p>
            
            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '13px', fontWeight: 'bold', color: '#475569', marginBottom: '8px', display: 'block' }}>휴대폰 번호</label>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input 
                  type="tel" 
                  placeholder="- 없이 번호만 입력" 
                  value={phone}
                  onChange={e => setPhone(e.target.value.replace(/[^0-9]/g, ''))}
                  disabled={isCodeSent}
                  style={{ flex: 1, padding: '16px', borderRadius: '12px', border: '1px solid #E2E8F0', fontSize: '16px', background: isCodeSent ? '#F8FAFC' : '#fff', outline: 'none' }} 
                />
                <button 
                  onClick={handleSendCode}
                  disabled={phone.length < 10 || isCodeSent}
                  style={{ padding: '0 20px', borderRadius: '12px', background: isCodeSent ? '#E2E8F0' : '#1E293B', color: isCodeSent ? '#94A3B8' : '#fff', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}
                >
                  {isCodeSent ? '전송됨' : '인증요청'}
                </button>
              </div>
            </div>

            {isCodeSent && (
              <div className="fade-slide-up" style={{ marginBottom: '24px' }}>
                <label style={{ fontSize: '13px', fontWeight: 'bold', color: '#475569', marginBottom: '8px', display: 'block' }}>인증 번호</label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input 
                    type="number" 
                    placeholder="인증번호 4자리" 
                    value={code}
                    onChange={e => setCode(e.target.value)}
                    disabled={isVerified}
                    style={{ flex: 1, padding: '16px', borderRadius: '12px', border: isVerified ? '1px solid #10B981' : '1px solid #35D8E6', fontSize: '16px', outline: 'none' }} 
                  />
                  <button 
                    onClick={handleVerifyCode}
                    disabled={code.length < 4 || isVerified}
                    style={{ padding: '0 20px', borderRadius: '12px', background: isVerified ? '#10B981' : '#35D8E6', color: '#fff', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}
                  >
                    {isVerified ? '인증완료' : '확인'}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* STEP 2: Email & Password */}
        {step === 2 && (
           <div className="fade-slide-up">
             <div style={{ width: '48px', height: '48px', background: '#F8FAFC', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
               <Key size={24} color="#3B82F6" />
             </div>
             <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1E293B', marginBottom: '8px' }}>
               로그인에 사용할<br/>이메일과 비밀번호를 설정해주세요.
             </h2>
             <p style={{ color: '#64748B', fontSize: '14px', marginBottom: '32px' }}>아이디 용도로만 사용되며 스팸은 발송되지 않아요.</p>
             
             <div style={{ marginBottom: '16px' }}>
               <label style={{ fontSize: '13px', fontWeight: 'bold', color: '#475569', marginBottom: '8px', display: 'block' }}>이메일</label>
               <input 
                 type="email" 
                 placeholder="ggaebi@example.com" 
                 value={email}
                 onChange={e => setEmail(e.target.value)}
                 style={{ width: '100%', padding: '16px', borderRadius: '12px', border: '1px solid #E2E8F0', fontSize: '16px', outline: 'none', boxSizing: 'border-box' }} 
               />
             </div>
             <div style={{ marginBottom: '16px' }}>
               <label style={{ fontSize: '13px', fontWeight: 'bold', color: '#475569', marginBottom: '8px', display: 'block' }}>비밀번호</label>
               <input 
                 type="password" 
                 placeholder="6자리 이상 입력" 
                 value={pw}
                 onChange={e => setPw(e.target.value)}
                 style={{ width: '100%', padding: '16px', borderRadius: '12px', border: '1px solid #E2E8F0', fontSize: '16px', outline: 'none', boxSizing: 'border-box' }} 
               />
             </div>
           </div>
        )}

        {/* STEP 3: GPS Region */}
        {step === 3 && (
           <div className="fade-slide-up">
             <div style={{ width: '48px', height: '48px', background: '#F0FDF4', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
               <MapPin size={24} color="#10B981" />
             </div>
             <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1E293B', marginBottom: '8px' }}>
               어느 동네에서<br/>물건을 둘러보실 건가요?
             </h2>
             <p style={{ color: '#64748B', fontSize: '14px', marginBottom: '32px', lineHeight: 1.5 }}>근처 이웃들의 꿀매물을 즉시 보여드리기 위해,<br/>현재 위치를 기반으로 동네를 설정합니다.</p>
             
             {!region ? (
               <button 
                 onClick={handleFindLocation}
                 disabled={isLocating}
                 style={{ width: '100%', padding: '24px', borderRadius: '16px', background: '#F8FAFC', border: '2px dashed #CBD5E1', color: '#475569', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', transition: 'all 0.2s' }}
               >
                 {isLocating ? (
                   <>
                     <Loader2 className="animate-spin" size={32} color="#10B981" />
                     GPS 신호를 잡는 중...
                   </>
                 ) : (
                   <>
                     <MapPin size={32} color="#94A3B8" />
                     현재 위치로 내 동네 찾기
                   </>
                 )}
               </button>
             ) : (
               <div className="fade-slide-up" style={{ width: '100%', padding: '24px', borderRadius: '16px', background: '#F0FDF4', border: '2px solid #10B981', color: '#065F46', fontSize: '18px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '12px' }}>
                 <CheckCircle size={24} color="#10B981" />
                 {region} <span>(일치)</span>
               </div>
             )}
           </div>
        )}

        {/* STEP 4: Strict Policy */}
        {step === 4 && (
           <div className="fade-slide-up">
             <div style={{ width: '48px', height: '48px', background: '#FEF2F2', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
               <ShieldAlert size={24} color="#DC2626" />
             </div>
             <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1E293B', marginBottom: '8px' }}>
               마지막으로 무관용 원칙에<br/>동의해주세요.
             </h2>
             <p style={{ color: '#64748B', fontSize: '14px', marginBottom: '32px', lineHeight: 1.5 }}>안전결제 에스크로가 도입된 <strong>청정 프리미엄 마켓</strong> 유지를 위해 꼭 서약해주세요.</p>
             
             <div style={{ background: '#FEF2F2', border: '1px solid #FCA5A5', padding: '20px', borderRadius: '20px', marginBottom: '24px' }}>
               <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#DC2626', fontWeight: '800', fontSize: '16px', marginBottom: '12px' }}>
                 <ShieldAlert size={20} /> 깨비마켓 철퇴 정책 (삼진아웃)
               </div>
               <ul style={{ color: '#991B1B', fontSize: '14px', paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '10px', margin: 0, lineHeight: '1.5' }}>
                 <li>가품(짝퉁), 무기류, 불법물품 등록 시 <strong>즉시 영구 정지</strong>됩니다.</li>
                 <li>입찰 후 단순 변심 파기, 일방적 노쇼 시 <strong>삼진아웃 및 30일 거래 제한</strong>이 적용됩니다.</li>
                 <li>허위 사실 및 사기 시도 적발 시 <strong>사전 통보 없이 계정이 영구 삭제되며, 본인인증 정보를 바탕으로 즉각적인 법적 고발</strong> 조치됩니다.</li>
               </ul>
             </div>
           </div>
        )}

        {/* STEP 5: Persona Generation */}
        {step === 5 && (
           <div className="fade-slide-up" style={{ textAlign: 'center', paddingTop: '40px' }}>
             <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'center' }}>
               <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: '#F1F5F9', border: '4px solid #35D8E6', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                 <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${nickname}`} alt="avatar" style={{ width: '100%', height: '100%' }} />
               </div>
             </div>
             <h2 style={{ fontSize: '26px', fontWeight: '900', color: '#1E293B', marginBottom: '12px' }}>
               환영합니다!
             </h2>
             <p style={{ color: '#64748B', fontSize: '15px', marginBottom: '24px' }}>당신만의 깨비 페르소나가 부여되었어요.</p>
             
             <div style={{ background: 'linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%)', padding: '24px', borderRadius: '20px', display: 'inline-block', marginBottom: '32px', border: '1px solid #E2E8F0', boxShadow: '0 8px 16px rgba(0,0,0,0.03)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center', color: '#065F46', marginBottom: '8px' }}>
                  <Wand2 size={18} /> 부여된 닉네임
                </div>
                <p style={{ fontSize: '24px', fontWeight: '900', color: '#10B981', margin: 0 }}>{nickname}</p>
             </div>
             
             <p style={{ color: '#94A3B8', fontSize: '13px' }}>나머지 정보는 내 정보 탭에서 마저 설정하실 수 있습니다.</p>
           </div>
        )}

        {/* BOTTOM FIXED BUTTON */}
        <div style={{ 
          position: 'sticky', 
          bottom: 0, 
          marginLeft: '-24px', 
          marginRight: '-24px', 
          marginBottom: '-100px', 
          padding: '20px 24px 30px', 
          boxSizing: 'border-box', 
          background: 'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.95) 20%, #fff 100%)', 
          zIndex: 60 
        }}>
          <button 
            onClick={step === 5 ? onComplete : handleNext}
            disabled={
              (step === 1 && !isVerified) || 
              (step === 2 && (!email || pw.length < 6)) ||
              (step === 3 && !region)
            }
            className="btn-primary"
            style={{ 
              width: '100%', boxSizing: 'border-box', display: 'block', padding: '18px', borderRadius: '16px', border: 'none',
              background: 
                ((step === 1 && !isVerified) || (step === 2 && (!email || pw.length < 6)) || (step === 3 && !region)) ? '#E2E8F0' : 
                (step === 4 ? '#DC2626' : 'linear-gradient(135deg, #35D8E6 0%, #10B981 100%)'), 
              color: ((step === 1 && !isVerified) || (step === 2 && (!email || pw.length < 6)) || (step === 3 && !region)) ? '#94A3B8' : '#fff', 
              fontWeight: 'bold', fontSize: '16px', cursor: 'pointer',
              transition: 'all 0.2s', boxShadow: ((step === 1 && !isVerified) || (step === 2 && (!email || pw.length < 6)) || (step === 3 && !region)) ? 'none' : '0 12px 24px rgba(16,185,129,0.2)'
            }}
          >
            {step === 1 ? '본인인증 완료하고 다음으로' : 
             step === 2 ? '계정 생성하기' : 
             step === 3 ? '내 동네 확정하기' :
             step === 4 ? '위 무관용 원칙에 서약하고 완료' :
             '깨비마켓 바로 입장하기'}
          </button>
        </div>

      </div>
    </>
  );
}
