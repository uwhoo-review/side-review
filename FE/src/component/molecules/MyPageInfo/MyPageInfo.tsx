import styled from "./style";
import CenterWrapper from "@src/component/atoms/CenterWrapper/CenterWrapper";
import { Modal, Slide } from "@mui/material";
import { MouseEventHandler, useEffect, useRef, useState } from "react";
import MyFootPrints from "@src/component/molecules/MyFootPrints/MyFootPrints";

const MyPageInfo = ({
  topText,
  middleText,
  bottomText,
  isModal,
  setIsModal,
  modalChildren,
  onClick,
}: any) => {
  // const [isModal, setIsModal] = useState(false);

  return (
    <div css={styled.wrapper}>
      <div css={styled.typo1}>{topText}</div>
      <div css={styled.typo2}>{middleText}</div>
      <div
        css={styled.typo3}
        onClick={() => {
          onClick && onClick();
        }}
      >
        {bottomText}
      </div>
    </div>
  );
};

export default MyPageInfo;
