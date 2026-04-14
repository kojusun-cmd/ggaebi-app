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
      const currentState = window.history.state || {};
      const fallbackPage = options?.fallbackPage;
      const popupState = {
        ...currentState,
        page: currentState.page ?? fallbackPage,
        history: currentState.history ?? (fallbackPage ? [fallbackPage] : undefined),
        popup: popupId,
      };
      window.history.pushState(popupState, '');
    } else {
      // 만약 외부(뒤로가기가 아닌 버튼 클릭 등)에서 팝업이 닫혔다면,
      // 우리가 방금 쌓았던 히스토리를 깔끔하게 지워줌.
      // (현재 브라우저 상태가 방금 띄웠던 팝업 히스토리일 경우에만)
      if (!isPoppedByBackButton.current && window.history.state?.popup === popupId) {
        window.history.back();
      }
    }
  }, [isOpen, popupId, options?.fallbackPage]);

  useEffect(() => {
    const handlePopState = () => {
      if (isOpen) {
        isPoppedByBackButton.current = true;
        onClose();
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [isOpen, onClose]);
}
