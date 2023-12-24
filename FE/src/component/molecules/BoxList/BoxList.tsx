import { ReactNode, useEffect, useState } from "react";
import CarouselArrow from "@src/component/atoms/CarouselArrow/CarouselArrow";
import styled from "./style";
import CenterWrapper from "@src/component/atoms/CenterWrapper/CenterWrapper";
import { Dialog, Modal } from "@mui/material";
import WrapperTitle from "@src/component/atoms/WrapperTitle/WrapperTitle";
import HWButton from "@src/component/atoms/HWButton/HWButton";
import HWDialog from "@src/component/atoms/HWDialog/HWDialog";
import HWTypography from "@src/component/atoms/HWTypography/HWTypography";
import Color from "@src/common/styles/Color";
import { SerializedStyles } from "@emotion/react";

interface BoxListProps {
  title?: string;
  subtitle?: string;
  boxList?: any[];
  onClick?: () => void;
  customCss?: SerializedStyles;
  EmptyComponent?: ReactNode;
}

const BoxList = ({ title, subTitle, boxList, onClick, customCss, EmptyComponent }: any) => {
  const [selectedCard, setSelectedCard] = useState<any | null>(null);

  const TOTAL_LIST = boxList.length;
  const MOVE = 4;
  const TOTAL_PAGE = Math.ceil((TOTAL_LIST - 4) / MOVE) + 1;

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [firstIdx, setFirstIdx] = useState(1);
  const [lastIdx, setLastIdx] = useState(4);
  const [translateX, setTranslateX] = useState(0);

  useEffect(() => {
    const x = (firstIdx - 1) * (-334 - 20);
    setTranslateX(x);
  }, [firstIdx]);

  const onPrevHandler = () => {
    if (currentPage == 1) {
      setCurrentPage(1);
    } else {
      setCurrentPage(currentPage - 1);
      if (firstIdx - MOVE > 1) {
        setFirstIdx((prev) => prev - MOVE);
        setLastIdx((prev) => prev - MOVE);
      } else {
        setFirstIdx((prev) => 1);
        setLastIdx((prev) => prev - (firstIdx - 1));
      }
    }
  };

  const onNextHandler = () => {
    if (currentPage == TOTAL_PAGE) {
      setCurrentPage(TOTAL_PAGE);
    } else {
      setCurrentPage(currentPage + 1);
      if (lastIdx + MOVE < TOTAL_LIST) {
        setFirstIdx((prev) => prev + MOVE);
        setLastIdx((prev) => prev + MOVE);
      } else {
        setFirstIdx((prev) => prev + TOTAL_LIST - lastIdx);
        setLastIdx((prev) => TOTAL_LIST);
      }
    }
  };

  return (
    <>
      <div css={styled.wrapper}>
        {title && <WrapperTitle title={title} />}
        {boxList.length === 0 && EmptyComponent}
        {boxList.length !== 0 && (
          <div css={styled.cardSlider(currentPage, TOTAL_PAGE)}>
            <CarouselArrow
              className={"hover-arrow left"}
              direction={"left"}
              customCss={styled.leftPageBtn}
              onClick={onPrevHandler}
            />
            <div className={"box-card-list"} css={styled.cardWrapper(translateX)}>
              {boxList.map((v: any, i: number) => {
                return (
                  <div
                    className={"box-card"}
                    key={i}
                    onClick={() => {
                      onClick && onClick();
                    }}
                    css={styled.card}
                  >
                    {v}
                  </div>
                );
              })}
            </div>

            <CarouselArrow
              className={"hover-arrow right"}
              direction={"right"}
              customCss={styled.rightPageBtn}
              onClick={onNextHandler}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default BoxList;
