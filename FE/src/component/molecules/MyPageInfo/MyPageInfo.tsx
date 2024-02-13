import styled from "./style";
import CenterWrapper from "@src/component/atoms/CenterWrapper/CenterWrapper";
import { Modal, Slide } from "@mui/material";
import { MouseEventHandler, useEffect, useRef, useState } from "react";
import MyFootPrints from "@src/component/molecules/MyFootPrints/MyFootPrints";

const MyPageInfo = ({ topText, middleText, bottomText, modalChildren, onClick }: any) => {
  const [isModal, setIsModal] = useState(false);
  const [animation, setAnimation] = useState("");
  const [modalHeight, setModalHeight] = useState(750); // 초기 모달 높이

  const modalRef = useRef<HTMLDivElement | null>(null);

  const startResize = (downEvent: React.MouseEvent<HTMLDivElement>) => {
    const mouseMoveHandler = (moveEvent: MouseEvent) => {
      const deltaY = moveEvent.clientY - downEvent.clientY;
      const height = modalHeight - deltaY;
      if (height < 200) {
        setAnimation("closeAnimation");
        setTimeout(() => setIsModal(false), 500);
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

  return (
    <div css={styled.wrapper}>
      <div css={styled.typo1}>{topText}</div>
      <div css={styled.typo2}>{middleText}</div>
      <div
        css={styled.typo3}
        onClick={() => {
          onClick && onClick();
          if (modalChildren) {
            setAnimation("openAnimation");
            setModalHeight(750);
            setIsModal(true);
          }
        }}
      >
        {bottomText}
      </div>
      {modalChildren && isModal && (
        <div
          css={styled.modal(modalHeight, isModal)}

          className={animation}
        >
          {/*<Slide in={isModal} direction={"up"}>*/}
          <div css={[styled.modalWrapper]} ref={modalRef}>
            <div css={styled.heightHandler} onMouseDown={startResize} />
            <CenterWrapper>{modalChildren}</CenterWrapper>
          </div>
          {/*</Slide>*/}
        </div>
      )}
    </div>
  );
};

export default MyPageInfo;
