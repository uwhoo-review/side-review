import styled from "./style";
import CenterWrapper from "@src/component/atoms/CenterWrapper/CenterWrapper";
import { Modal, Slide } from "@mui/material";
import { MouseEventHandler, useEffect, useRef, useState } from "react";
import MyFootPrints from "@src/component/molecules/MyFootPrints/MyFootPrints";

const MyPageInfo = ({ topText, middleText, bottomText, modalChildren, onClick }: any) => {
  const [isModal, setIsModal] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [modalHeight, setModalHeight] = useState(750); // 초기 모달 높이
  const [startY, setStartY] = useState(0); // 드래그 시작 Y 위치

  const modalRef = useRef<HTMLDivElement | null>(null);

  const startResize = (downEvent: React.MouseEvent<HTMLDivElement>) => {
    const mouseMoveHandler = (moveEvent: MouseEvent) => {
      const deltaY = moveEvent.clientY - downEvent.clientY;
      const height = modalHeight - deltaY;
      if (height < 200) {
        setIsModal(false);
      } else if (height > 900) {
        return;
      } else {
        setModalHeight(height);
      }
    };
    const mouseUpHandler = () => {
      document.removeEventListener("mousemove", mouseMoveHandler);
    };

    document.addEventListener("mousemove", mouseMoveHandler);
    document.addEventListener("mouseup", mouseUpHandler, { once: true });
  };

  useEffect(() => {
    if (isModal) setModalHeight(750);
  }, [isModal]);

  return (
    <div css={styled.wrapper}>
      <div css={styled.typo1}>{topText}</div>
      <div css={styled.typo2}>{middleText}</div>
      <div
        css={styled.typo3}
        onClick={() => {
          onClick && onClick();
          modalChildren && setIsModal(true);
        }}
      >
        {bottomText}
      </div>
      {modalChildren && isModal && (
        <Slide in={isModal} direction={"up"}>
          <div
            // open={isModal}
            // onClose={() => setIsModal(false)}
            css={styled.modal(modalHeight)}
            // disableScrollLock={true}
            // closeAfterTransition
          >
            <div css={[styled.modalWrapper]} ref={modalRef}>
              <div css={styled.heightHandler} onMouseDown={startResize} />
              <CenterWrapper>{modalChildren}</CenterWrapper>
            </div>
          </div>
        </Slide>
      )}
    </div>
  );
};

export default MyPageInfo;
