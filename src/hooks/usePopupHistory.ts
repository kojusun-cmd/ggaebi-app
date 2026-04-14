import { useEffect, useRef } from 'react';

type PopupHistoryOptions = {
  fallbackPage?: string;
};

export function usePopupHistory(
  isOpen: boolean,
  onClose: () => void,
  popupId: string,
  options?: PopupHistoryOptions
) {
  const isPoppedByBackButton = useRef(false);

  useEffect(() => {
    if (isOpen) {
      isPoppedByBackButton.current = false;
      const rawState = window.history.state || {};
      const fallbackPage = options?.fallbackPage;
      const baseState =
        !rawState.page && fallbackPage
          ? {
              ...rawState,
              page: fallbackPage,
              history: rawState.history ?? [fallbackPage],
            }
          : rawState;

      // 뒤로가기 시 팝업 바로 아래 엔트리가 항상 페이지 상태를 가지도록 보정
      if (baseState !== rawState) {
        window.history.replaceState(baseState, '');
      }

      // 이미 이 팝업의 상태가 최상단에 있다면 pushState 생략 (React StrictMode 등 중복 실행 방지)
      if (window.history.state?.popup !== popupId) {
        const popupState = {
          ...baseState,
          page: baseState.page ?? fallbackPage,
          history: baseState.history ?? (fallbackPage ? [fallbackPage] : undefined),
          popup: popupId,
        };
        window.history.pushState(popupState, '');
      }
    } else {
      // 외부에서 팝업이 닫혔고, 현재 브라우저 상태가 방금 띄웠던 해당 팝업 히스토리라면
      if (!isPoppedByBackButton.current && window.history.state?.popup === popupId) {
        isPoppedByBackButton.current = true; // 방어 코드: StrictMode 등에서 2번 연달아 back()이 호출되는 것을 방지
        window.history.back();
      }
    }
  }, [isOpen, popupId, options?.fallbackPage]);

  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      // 팝업이 열려있는데 뒤로가기가 발생할 경우:
      // 브라우저의 현재 상태(e.state)에 내 팝업 ID가 없어야만 닫힘으로 처리함.
      // (다른 팝업이 닫혀서 내 팝업 상태로 돌아온 경우는 닫지 않음)
      if (isOpen) {
        // e.state가 아예 없거나, e.state.popup이 내 popupId와 다르면(즉 내가 최상단이 아니면) 닫기
        if (!e.state || e.state.popup !== popupId) {
          isPoppedByBackButton.current = true;
          onClose();
        }
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [isOpen, onClose, popupId]);
}
