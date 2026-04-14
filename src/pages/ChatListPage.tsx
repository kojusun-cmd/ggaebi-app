import { ChevronLeft } from "lucide-react";
import { useState } from "react";
import { usePopupHistory } from "../hooks/usePopupHistory";
import { FEED_ITEMS } from "../data/mockData";

export function ChatListPage({ onBack }: { onBack: () => void, onNavigate?: (page: string, item?: any) => void }) {
    const [showChatModal, setShowChatModal] = useState(false);
    const [chatStep, setChatStep] = useState(0);
    const [activeChatRoom, setActiveChatRoom] = useState<any>(null);

    usePopupHistory(
      showChatModal,
      () => {
        setShowChatModal(false);
        setActiveChatRoom(null);
      },
      'ChatList_ChatModal',
      { fallbackPage: 'chat' }
    );

    usePopupHistory(
      chatStep === 6,
      () => {
        setChatStep(5);
      },
      'ChatList_ObjectionModal'
    );

    const chatRooms = [
            {
              id: 1,
              partner: '판매자 (LG 오브제컬렉션 냉장고)',
              status: 'penalty',
              lastMessage: '결제 기한이 만료되어 파기 패널티가 1회 부여되었습니다.',
              time: '방금 전',
              unread: 1,
              image: FEED_ITEMS[12].img
            },
            {
              id: 2,
              partner: '판매자 (아이폰 14 프로)',
              status: 'success',
              lastMessage: '✅ 판매자가 패널티 없이 취소를 승인했습니다.',
              time: '어제',
              unread: 0,
              image: FEED_ITEMS[10].img
            },
            {
              id: 3,
              partner: '판매자 (맥북 프로 16인치 M2)',
              status: 'ongoing',
              lastMessage: '직거래 장소는 어디가 편하신가요?',
              time: '3일 전',
              unread: 0,
              image: FEED_ITEMS[15].img
            }
          ];
    return (
    <>
      <header className="top-header subpage" style={{ backgroundColor: '#fff', zIndex: 50, borderBottom: '1px solid #E2E8F0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div onClick={onBack} style={{ cursor: 'pointer', paddingRight: '8px' }}>
            <ChevronLeft size={28} color="#2E343E" />
          </div>
          <h1 className="header-title" style={{ fontSize: '20px' }}>나의 거래 채팅방</h1>
        </div>
      </header>

      <div className="content-area subpage" style={{ paddingTop: '0px', paddingBottom: '30px', background: '#F8FAFC', minHeight: '100vh' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {chatRooms.map(room => (
            <div key={room.id} style={{ display: 'flex', gap: '16px', padding: '16px 20px', background: '#fff', borderBottom: '1px solid #F1F5F9', cursor: 'pointer' }} onClick={() => { setActiveChatRoom(room); setChatStep(room.status === 'penalty' ? 5 : room.status === 'success' ? 4 : 0); setShowChatModal(true); }}>
              <div style={{ position: 'relative' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '16px', overflow: 'hidden', background: '#E2E8F0', border: '1px solid #E2E8F0' }}>
                  <img src={room.image} alt="상품 이미지" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.currentTarget.src = `https://picsum.photos/seed/${room.id * 10}/200/200`; }} />
                </div>
                {room.unread > 0 && (
                  <div style={{ position: 'absolute', top: '-6px', right: '-6px', width: '22px', height: '22px', background: '#EF4444', color: '#fff', borderRadius: '50%', fontSize: '11px', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #fff', boxShadow: '0 2px 4px rgba(239,68,68,0.3)' }}>
                    {room.unread}
                  </div>
                )}
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <div style={{ fontWeight: 'bold', fontSize: '15px', color: '#1E293B', display: 'flex', alignItems: 'center', gap: '6px', maxWidth: '85%' }}>
                    <span style={{ display: 'inline-block', maxWidth: '130px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{room.partner}</span>
                    {room.status === 'penalty' && <span style={{ flexShrink: 0, padding: '2px 6px', background: '#FEF2F2', color: '#DC2626', fontSize: '10px', borderRadius: '4px', fontWeight: 'bold', border: '1px solid #FECACA', whiteSpace: 'nowrap' }}>패널티</span>}
                    {room.status === 'success' && <span style={{ flexShrink: 0, padding: '2px 6px', background: '#F0FDF4', color: '#059669', fontSize: '10px', borderRadius: '4px', fontWeight: 'bold', border: '1px solid #A7F3D0', whiteSpace: 'nowrap' }}>합의취소</span>}
                  </div>
                  <div style={{ fontSize: '12px', color: '#94A3B8', whiteSpace: 'nowrap' }}>{room.time}</div>
                </div>
                <div style={{ fontSize: '13px', color: room.unread > 0 ? '#1E293B' : '#64748B', fontWeight: room.unread > 0 ? 'bold' : 'normal', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {room.lastMessage}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 모달: 채팅방 상세 시뮬레이션 */}
      {showChatModal && activeChatRoom && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', zIndex: 999, display: 'flex', flexDirection: 'column' }}>
          <div style={{ background: '#fff', padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #E2E8F0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div onClick={() => { setShowChatModal(false); setActiveChatRoom(null); }} style={{ cursor: 'pointer' }}><ChevronLeft size={28} /></div>
              <span style={{ fontWeight: 'bold', fontSize: '18px' }}>{activeChatRoom.partner}</span>
            </div>
          </div>
          
          <div style={{ flex: 1, background: '#F8FAFC', padding: '20px', overflowY: 'auto' }}>
            {/* 기본 채팅 내역 */}
            <div style={{ textAlign: 'center', margin: '20px 0', color: '#94A3B8', fontSize: '13px' }}>오후 2:30</div>
            
            <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
              <div style={{ width: '40px', height: '40px', background: '#E2E8F0', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>🧑</div>
              <div style={{ background: '#fff', padding: '12px 16px', borderRadius: '0 16px 16px 16px', border: '1px solid #E2E8F0', maxWidth: '75%', fontSize: '14px' }}>
                낙찰을 축하드립니다! 직거래와 택배 중 어떤 걸로 진행하시겠어요?
              </div>
            </div>

            {/* Step 0: 초기 (일반 대화 중) */}
            {chatStep === 0 && (
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '20px' }}>
                <button onClick={() => setChatStep(1)} style={{ background: '#fff', color: '#10B981', border: '1px solid #10B981', padding: '8px 12px', borderRadius: '16px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer' }}>
                  제품/배송 문의 📦
                </button>
                <button onClick={() => setChatStep(2)} style={{ background: '#fff', color: '#EF4444', border: '1px solid #FCA5A5', padding: '8px 12px', borderRadius: '16px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer' }}>
                  낙찰 포기 (취소요청) ⚠️
                </button>
              </div>
            )}

            {/* Step 1: 일반 문의 */}
            {chatStep === 1 && (
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                <div style={{ background: '#10B981', color: '#fff', padding: '12px 16px', borderRadius: '16px 0 16px 16px', maxWidth: '75%', fontSize: '14px' }}>
                  [제품/배송 문의] 상세한 배송 일정과 직거래 가능 위치 여쭤봅니다!
                </div>
              </div>
            )}

            {/* Step 2 이상: 낙찰 취소 전송 흔적 */}
            {chatStep >= 2 && chatStep !== 4 && chatStep !== 5 && chatStep !== 6 && (
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                <div style={{ background: '#10B981', color: '#fff', padding: '12px 16px', borderRadius: '16px 0 16px 16px', maxWidth: '75%', fontSize: '14px' }}>
                  [낙찰포기] 부득이한 사정으로 낙찰 취소를 요청합니다. 정말 죄송합니다.
                </div>
              </div>
            )}

            {/* Step 2 시뮬레이션 */}
            {chatStep === 2 && (
              <div style={{ marginTop: '30px', padding: '16px', border: '1px dashed #94A3B8', borderRadius: '12px', background: '#F1F5F9' }}>
                <div style={{ textAlign: 'center', fontSize: '12px', color: '#64748B', marginBottom: '12px', fontWeight: 'bold' }}>👇 시뮬레이션: 이 요청을 받은 '판매자'의 화면 👇</div>
                <div style={{ background: '#fff', padding: '16px', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <button onClick={() => setChatStep(4)} style={{ padding: '10px', background: '#fff', border: '1px solid #CBD5E1', color: '#475569', borderRadius: '8px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer' }}>
                      사유 인정 (패널티 없이 취소 승인)
                    </button>
                    <button onClick={() => setChatStep(5)} style={{ padding: '10px', background: '#FEF2F2', border: '1px solid #FCA5A5', color: '#DC2626', borderRadius: '8px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer' }}>
                      악의적 노쇼 (■ 파기 패널티 부여 후 승인)
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: 원만한 합의 결과 */}
            {chatStep === 4 && (
              <div style={{ display: 'flex', gap: '8px', marginTop: '20px' }}>
                <div style={{ width: '40px', height: '40px', background: '#E2E8F0', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>🤖</div>
                <div style={{ background: '#F0FDF4', border: '1px solid #A7F3D0', padding: '16px', borderRadius: '0 16px 16px 16px', maxWidth: '85%' }}>
                  <div style={{ fontWeight: 'bold', color: '#059669', marginBottom: '8px' }}>✅ 원만하게 합의 취소 완료됨</div>
                  <div style={{ fontSize: '13px', color: '#064E3B', lineHeight: 1.4 }}>
                    판매자가 귀하의 사유를 받아들여 <b>패널티 없이 취소</b>가 완료되었습니다.<br/><br/>판매자에게 정중한 인사를 남겨주세요.
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: 패널티 결과 */}
            {chatStep >= 5 && (
              <div style={{ display: 'flex', gap: '8px', marginTop: '20px' }}>
                <div style={{ width: '40px', height: '40px', background: '#E2E8F0', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>🤖</div>
                <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', padding: '16px', borderRadius: '0 16px 16px 16px', maxWidth: '85%' }}>
                  <div style={{ fontWeight: 'bold', color: '#DC2626', marginBottom: '8px' }}>🚨 낙찰 파기 패널티 조치됨 (알림)</div>
                  <div style={{ fontSize: '13px', color: '#7F1D1D', marginBottom: '16px', lineHeight: 1.4 }}>
                    판매자가 취소 요청을 승인하였으나, <b>파기 패널티 조치</b>를 등록했습니다.<br/><br/><b>현재 나의 누적 삼진아웃 경고: [1회/3회]</b>
                  </div>
                  <button onClick={() => setChatStep(6)} style={{ width: '100%', background: '#fff', color: '#DC2626', border: '1px solid #DC2626', padding: '8px', borderRadius: '8px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}>
                    억울한 패널티인가요? 상세 이의 제기하기
                  </button>
                </div>
              </div>
            )}
          </div>

          <div style={{ padding: '16px', background: '#fff', borderTop: '1px solid #E2E8F0', display: 'flex', gap: '8px' }}>
            <input type="text" placeholder="메시지를 입력하세요..." style={{ flex: 1, padding: '12px 16px', borderRadius: '24px', border: '1px solid #E2E8F0', outline: 'none', background: '#F8FAFC' }} />
            <button style={{ width: '46px', height: '46px', background: '#10B981', color: '#fff', borderRadius: '50%', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>전송</button>
          </div>

          {/* 이의 제기 팝업 */}
          {chatStep === 6 && (
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', zIndex: 1000}}>
              <div style={{ background: '#fff', borderRadius: '20px', padding: '24px', width: '100%', maxWidth: '340px', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '12px', textAlign: 'center' }}>이의 제기 신청</h3>
                <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.5, marginBottom: '20px', textAlign: 'center' }}>
                  관리자가 진위를 파악할 수 있도록,<br/><b>현재 채팅방 내역 원본</b>이 함께 자동 제출됩니다. 진행하시겠습니까?
                </p>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button onClick={() => setChatStep(5)} style={{ flex: 1, padding: '12px', border: 'none', background: '#E2E8F0', color: '#475569', borderRadius: '12px', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer' }}>취소</button>
                  <button onClick={() => { alert('이의 제기가 접수되었습니다.'); setShowChatModal(false); }} style={{ flex: 1, padding: '12px', border: 'none', background: '#10B981', color: '#fff', borderRadius: '12px', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer' }}>제출하기</button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
    );
}
