import { ChevronLeft, Camera, Wand2, ImagePlus, Sparkles, ChevronDown, MapPin, TrendingUp, Package, ShieldAlert, CheckCircle } from "lucide-react";
import { useState } from "react";
import { Line } from "react-chartjs-2";
import { CustomToggle } from "../components/CustomToggle";

export function ProductRegistrationPage({ onBack, onComplete }: { onBack: () => void, onComplete?: () => void }) {
    const [step, setStep] = useState(1);
    const [isAiProcessing, setIsAiProcessing] = useState(false);
    const [useAiScribe, setUseAiScribe] = useState(true);
    const [useAiEnhance, setUseAiEnhance] = useState(true);
    const [usePremiumModel, setUsePremiumModel] = useState(false);
    const [saleType, setSaleType] = useState('경매');
    const nextStep = () => {
            if (step === 1) {
              setIsAiProcessing(true);
              setTimeout(() => {
                setIsAiProcessing(false);
                setStep(2);
              }, 1500);
            } else if (step === 4) {
              if (onComplete) onComplete();
              else onBack();
            } else {
              setStep(s => s + 1);
            }
          };
    return (
    <>
      <header className="top-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div onClick={step === 1 ? onBack : () => setStep(s => s - 1)} style={{ cursor: 'pointer', paddingRight: '12px' }}>
            <ChevronLeft size={28} color="#2E343E" />
          </div>
          <h1 className="header-title" style={{ fontSize: '18px', margin: 0 }}>스마트 상품 등록 ({step}/4)</h1>
        </div>
      </header>

      <div className="content-area" style={{ paddingTop: '80px', paddingBottom: '100px', minHeight: '100vh', background: '#F8FAFC' }}>
        
        {/* Step 1: 스마트 사진 스튜디오 */}
        {step === 1 && (
          <div className="fade-slide-up">
            <div style={{ marginBottom: '24px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '8px' }}>📸 스마트 사진 스튜디오</h2>
              <p style={{ color: '#64748B', fontSize: '15px' }}>허공에 뜬 가이드라인을 따라 360도 입체 촬영을 진행해보세요!</p>
            </div>

            <div style={{ background: '#E2E8F0', height: '240px', borderRadius: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginBottom: '24px', position: 'relative', overflow: 'hidden', boxShadow: 'inset 0 4px 20px rgba(0,0,0,0.05)' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'url(https://picsum.photos/400/300) center/cover', opacity: 0.5, filter: 'blur(4px)' }} />
              <div style={{ zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Camera size={56} color="#fff" style={{ marginBottom: '16px', filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.2))' }} />
                <div style={{ color: '#fff', fontWeight: 'bold', fontSize: '16px', background: 'rgba(0,0,0,0.4)', padding: '8px 16px', borderRadius: '20px', backdropFilter: 'blur(4px)' }}>클릭하여 360도 촬영 시작</div>
              </div>
              <div style={{ position: 'absolute', bottom: '16px', background: 'linear-gradient(90deg, #3B82F6, #8B5CF6)', color: '#fff', fontSize: '13px', padding: '8px 16px', borderRadius: '16px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px' }}><Wand2 size={16} /> 허공 가이드라인 활성화 됨</div>
            </div>

            <div style={{ background: '#fff', padding: '24px', borderRadius: '24px', boxShadow: '0 12px 32px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ background: '#EEF2FF', padding: '12px', borderRadius: '16px' }}><Wand2 size={24} color="#4F46E5" /></div>
                  <div>
                    <div style={{ fontWeight: 'bold', fontSize: '16px', marginBottom: '4px' }}>AI 화질 개선 및 자동 누끼</div>
                    <div style={{ fontSize: '13px', color: '#64748B' }}>저해상도를 보정하고 배경을 지워줍니다</div>
                  </div>
                </div>
                <CustomToggle checked={useAiEnhance} onChange={() => setUseAiEnhance(!useAiEnhance)} />
              </div>
              
              <div style={{ height: '1px', background: '#F1F5F9' }} />

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ background: '#FFF7ED', padding: '12px', borderRadius: '16px' }}><ImagePlus size={24} color="#F97316" /></div>
                  <div>
                    <div style={{ fontWeight: 'bold', fontSize: '16px', marginBottom: '4px' }}>프리미엄 AI 가상 모델샷</div>
                    <div style={{ fontSize: '13px', color: '#64748B' }}>AI 모델 착용샷 (매력도 극대화 ✨)</div>
                  </div>
                </div>
                <CustomToggle checked={usePremiumModel} onChange={() => setUsePremiumModel(!usePremiumModel)} />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: AI 자동 서기 */}
        {step === 2 && (
          <div className="fade-slide-up">
            <div style={{ marginBottom: '24px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '8px' }}>📝 AI 자동 서기</h2>
              <p style={{ color: '#64748B', fontSize: '15px' }}>등록하신 360도 이미지를 기반으로 AI가 상품 정보를 자동 작성했습니다.</p>
            </div>

            <div style={{ background: 'linear-gradient(135deg, #EEF2FF 0%, #E0E7FF 100%)', padding: '20px', borderRadius: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', border: '1px solid #C7D2FE' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#4338CA', fontWeight: 'bold', fontSize: '16px' }}>
                <Sparkles size={24} /> AI 판독 기반 원클릭 완성
              </div>
              <CustomToggle checked={useAiScribe} onChange={() => setUseAiScribe(!useAiScribe)} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div>
                <label style={{ fontSize: '14px', fontWeight: 'bold', color: '#475569', marginBottom: '10px', display: 'block' }}>카테고리</label>
                <div style={{ position: 'relative' }}>
                  <select style={{ width: '100%', padding: '18px 20px', borderRadius: '16px', border: '1px solid #E2E8F0', fontSize: '16px', background: '#fff', boxSizing: 'border-box', appearance: 'none', fontWeight: '500' }}>
                    <option>📱 전자기기/IT</option>
                  </select>
                  <ChevronDown size={20} color="#94A3B8" style={{ position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)' }} />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '14px', fontWeight: 'bold', color: '#475569', marginBottom: '10px', display: 'block' }}>GPS 기반 동네 인증</label>
                <div style={{ width: '100%', padding: '18px 20px', borderRadius: '16px', border: '2px solid #10B981', background: '#F0FDF4', fontSize: '16px', display: 'flex', alignItems: 'center', gap: '10px', color: '#065F46', boxSizing: 'border-box', fontWeight: '600' }}>
                  <MapPin size={22} /> 해운대구 우동 (일치)
                </div>
              </div>

              <div>
                <label style={{ fontSize: '14px', fontWeight: 'bold', color: '#475569', marginBottom: '10px', display: 'block' }}>상품명</label>
                <input type="text" value={useAiScribe ? "[상태S] 애플 아이패드 프로 11인치 4세대" : ""} placeholder="상품명을 입력하세요" onChange={()=>{}} style={{ width: '100%', padding: '18px 20px', borderRadius: '16px', border: '1px solid #E2E8F0', fontSize: '16px', boxSizing: 'border-box', fontWeight: '500', color: '#1E293B' }} />
              </div>
              
              <div>
                <label style={{ fontSize: '14px', fontWeight: 'bold', color: '#475569', marginBottom: '10px', display: 'block' }}>권장 상세 설명</label>
                <textarea rows={6} value={useAiScribe ? "360도 스캔 분석 결과:\n- 외관 상태: 찍힘이나 기스 없음 (S급)\n- 화면: 정상 (잔상 없음)\n\n애플 아이패드 프로 11인치 4세대입니다! 사용감이 거의 없으며 보호필름 부착되어 있습니다." : ""} onChange={()=>{}} placeholder="직접 백지부터 내용을 작성해주세요." style={{ width: '100%', padding: '20px', borderRadius: '16px', border: '1px solid #E2E8F0', fontSize: '15px', resize: 'none', boxSizing: 'border-box', lineHeight: '1.6', background: '#F8FAFC' }} />
              </div>
            </div>
          </div>
        )}

        {/* Step 3: 시세 판독 및 판매/거래 방식 */}
        {step === 3 && (
          <div className="fade-slide-up">
            <div style={{ marginBottom: '24px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '8px' }}>💡 판매 예측 & 방식</h2>
              <p style={{ color: '#64748B', fontSize: '15px' }}>빅데이터 시세를 바탕으로 최적의 거래 방식을 선택하세요.</p>
            </div>

            <div style={{ background: '#fff', padding: '24px', borderRadius: '24px', boxShadow: '0 12px 32px rgba(0,0,0,0.04)', marginBottom: '32px' }}>
              <div style={{ fontWeight: '800', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '18px' }}>
                <TrendingUp size={22} color="#3B82F6" /> 최근 3개월 적정 시세 추이
              </div>
              <div style={{ height: '160px', width: '100%', marginBottom: '16px' }}>
                <Line 
                  data={{ labels: ['3달전', '2달전', '1달전', '오늘'], datasets: [{ label: '평균가 (원)', data: [1150000, 1080000, 1050000, 1000000], borderColor: '#10B981', backgroundColor: 'rgba(16, 185, 129, 0.1)', fill: true, tension: 0.4 }] }}
                  options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { display: false }, x: { grid: { display: false } } } }}
                />
              </div>
              <div style={{ textAlign: 'center', background: '#F8FAFC', padding: '16px', borderRadius: '16px' }}>
                <span style={{ fontSize: '15px', color: '#64748B' }}>현 시점 AI 추천 권장 가격 ✨</span><br/>
                <span style={{ fontSize: '24px', fontWeight: '900', color: '#10B981' }}>1,000,000원</span>
              </div>
            </div>

            <div style={{ marginBottom: '16px', fontWeight: 'bold', fontSize: '16px', color: '#475569' }}>판매 방식 선택 (택 1)</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '32px' }}>
              <div onClick={() => setSaleType('경매')} style={{ background: saleType === '경매' ? '#1E293B' : '#fff', color: saleType === '경매' ? '#fff' : '#64748B', border: saleType === '경매' ? '2px solid #1E293B' : '2px solid #E2E8F0', padding: '20px 8px', borderRadius: '20px', textAlign: 'center', cursor: 'pointer', transition: 'all 0.2s', boxShadow: saleType === '경매' ? '0 12px 24px rgba(30, 41, 59, 0.2)' : 'none' }}>
                 <div style={{ fontSize: '32px', marginBottom: '12px' }}>🔥</div>
                 <div style={{ fontSize: '15px', fontWeight: '800' }}>오픈 찔러보기</div>
              </div>
              <div onClick={() => setSaleType('고정가')} style={{ background: saleType === '고정가' ? '#1E293B' : '#fff', color: saleType === '고정가' ? '#fff' : '#64748B', border: saleType === '고정가' ? '2px solid #1E293B' : '2px solid #E2E8F0', padding: '20px 8px', borderRadius: '20px', textAlign: 'center', cursor: 'pointer', transition: 'all 0.2s', boxShadow: saleType === '고정가' ? '0 12px 24px rgba(30, 41, 59, 0.2)' : 'none' }}>
                 <div style={{ fontSize: '32px', marginBottom: '12px' }}>⚡</div>
                 <div style={{ fontSize: '15px', fontWeight: '800' }}>지정가 판매</div>
              </div>
              <div onClick={() => setSaleType('나눔')} style={{ background: saleType === '나눔' ? '#1E293B' : '#fff', color: saleType === '나눔' ? '#fff' : '#64748B', border: saleType === '나눔' ? '2px solid #1E293B' : '2px solid #E2E8F0', padding: '20px 8px', borderRadius: '20px', textAlign: 'center', cursor: 'pointer', transition: 'all 0.2s', boxShadow: saleType === '나눔' ? '0 12px 24px rgba(30, 41, 59, 0.2)' : 'none' }}>
                 <div style={{ fontSize: '32px', marginBottom: '12px' }}>😇</div>
                 <div style={{ fontSize: '15px', fontWeight: '800' }}>깨비 나눔</div>
              </div>
            </div>

            {saleType === '경매' && (
              <div className="fade-slide-up" style={{ background: '#fff', padding: '24px', borderRadius: '24px', marginBottom: '32px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', border: '1px solid #F1F5F9' }}>
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ fontSize: '14px', fontWeight: 'bold', color: '#475569', marginBottom: '10px', display: 'block' }}>시작 가격 (희망가)</label>
                  <input type="number" placeholder="이 금액 이상으로 제안될 확률이 놓습니다." style={{ width: '100%', padding: '18px 20px', borderRadius: '16px', border: '1px solid #E2E8F0', fontSize: '16px', boxSizing: 'border-box' }} />
                </div>
                <div>
                   <label style={{ fontSize: '14px', fontWeight: 'bold', color: '#475569', marginBottom: '10px', display: 'block' }}>경매 기간 (시간 지정)</label>
                   <div style={{ position: 'relative' }}>
                     <select style={{ width: '100%', padding: '18px 20px', borderRadius: '16px', border: '1px solid #E2E8F0', fontSize: '16px', background: '#fff', boxSizing: 'border-box', appearance: 'none', fontWeight: '500' }}>
                       <option>🕒 24시간 뒤 마감</option>
                       <option>🕒 48시간 뒤 마감</option>
                       <option>🕒 3일 뒤 마감</option>
                       <option>🕒 7일 뒤 마감</option>
                     </select>
                     <ChevronDown size={20} color="#94A3B8" style={{ position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)' }} />
                   </div>
                </div>
              </div>
            )}
            
            {saleType === '고정가' && (
              <div className="fade-slide-up" style={{ background: '#fff', padding: '24px', borderRadius: '24px', marginBottom: '32px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', border: '1px solid #F1F5F9' }}>
                <div>
                  <label style={{ fontSize: '14px', fontWeight: 'bold', color: '#475569', marginBottom: '10px', display: 'block' }}>흥정 없는 즉시 구매가</label>
                  <input type="number" placeholder="가격을 입력하세요" defaultValue={1000000} style={{ width: '100%', padding: '18px 20px', borderRadius: '16px', border: '1px solid #10B981', fontSize: '16px', boxSizing: 'border-box', fontWeight: 'bold', color: '#065F46', background: '#F0FDF4' }} />
                </div>
              </div>
            )}

            <div style={{ background: '#fff', padding: '24px', borderRadius: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', border: '1px solid #F1F5F9' }}>
              <div style={{ fontWeight: '800', marginBottom: '20px', color: '#1E293B', fontSize: '16px' }}>거래 선호 방식 (복수 선택 가능)</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#334155', fontWeight: '500' }}>
                  <MapPin size={22} color="#10B981" /> 이웃과 대면 직거래
                </div>
                <CustomToggle checked={true} onChange={() => {}} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#334155', fontWeight: '500' }}>
                  <Package size={22} color="#F59E0B" /> 안전 결제 택배 거래
                </div>
                <CustomToggle checked={true} onChange={() => {}} />
              </div>
            </div>
          </div>
        )}

        {/* Step 4: 최종 확인 */}
        {step === 4 && (
          <div className="fade-slide-up">
            <div style={{ marginBottom: '24px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: '900', marginBottom: '8px' }}>🤝 최종 확인 & 정책 동의</h2>
              <p style={{ color: '#64748B', fontSize: '15px' }}>건전하고 안전한 깨비 생태계를 위해 필수적으로 동의해주세요.</p>
            </div>

            <div style={{ background: '#FEF2F2', border: '1px solid #FCA5A5', padding: '24px', borderRadius: '24px', marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#DC2626', fontWeight: '800', fontSize: '18px', marginBottom: '16px' }}>
                <ShieldAlert size={24} /> 깨비마켓 철퇴 정책 안내
              </div>
              <ul style={{ color: '#991B1B', fontSize: '15px', paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '12px', margin: 0, lineHeight: '1.6' }}>
                <li>주류, 무기류, 마약류, 가품(짝퉁) 등 <strong>경매 금지 품목</strong> 등록 시 통보 없이 즉시 계정이 <strong style={{color: '#7F1D1D'}}>영구 정지</strong>됩니다.</li>
                <li>낙찰 후 구매자의 미결제 시는 물론, 판매자의 일방적인 <strong>노쇼 및 거래 파기</strong> 시에도 <strong>삼진아웃 시스템</strong>에 의해 영구 퇴출됩니다.</li>
              </ul>
            </div>

            <div style={{ background: '#fff', padding: '24px', borderRadius: '24px', display: 'flex', alignItems: 'flex-start', gap: '16px', border: '2px solid #10B981', cursor: 'pointer', boxShadow: '0 8px 20px rgba(16,185,129,0.1)' }}>
              <CheckCircle size={28} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div style={{ color: '#065F46', fontSize: '15px', lineHeight: '1.6', fontWeight: '600' }}>위 정책을 모두 숙지하였으며, 등록할 상품이 깨비마켓의 엄격한 상거래 규정에 위반되지 않고 신뢰할 수 있음을 서약합니다.</div>
            </div>
          </div>
        )}

      </div>

      <div style={{ position: 'fixed', bottom: 0, width: '100%', maxWidth: 'var(--app-width)', padding: '20px', background: 'linear-gradient(180deg, rgba(248,250,252,0) 0%, rgba(248,250,252,0.95) 20%, #F8FAFC 100%)', zIndex: 100, boxSizing: 'border-box' }}>
        <button 
          onClick={nextStep}
          className="btn btn-primary"
          style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', overflow: 'hidden', height: '60px', fontSize: '18px', borderRadius: '20px', fontWeight: '800', boxShadow: '0 12px 24px rgba(16,185,129,0.3)' }}
          disabled={isAiProcessing}
        >
          {isAiProcessing ? (
             <><Wand2 className="animate-spin-slow" /> AI가 사진을 분석하는 중...</>
          ) : (
             step === 4 ? <><CheckCircle /> 깨비마켓에 등록 완료하기</> : '다음 단계로'
          )}
        </button>
      </div>
    </>
    );
}
