import styled from "./style";
import CenterWrapper from "@src/component/atoms/CenterWrapper/CenterWrapper";
import { Modal, Slide } from "@mui/material";
import { useState } from "react";
import MyFootPrints from "@src/component/molecules/MyFootPrints/MyFootPrints";

const MyPageInfo = ({ topText, middleText, bottomText, modalChildren, onClick }: any) => {
  const [isModal, setIsModal] = useState(false);

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
      {modalChildren && (
        <Modal
          open={isModal}
          onClose={() => setIsModal(false)}
          css={styled.modal}
          closeAfterTransition
        >
          <Slide in={isModal} direction={"up"}>
            <div css={[styled.modalWrapper]}>
              <CenterWrapper>{modalChildren}</CenterWrapper>
            </div>
          </Slide>
        </Modal>
      )}
    </div>
  );
};

export default MyPageInfo;
