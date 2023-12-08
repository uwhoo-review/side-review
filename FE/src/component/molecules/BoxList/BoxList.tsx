import {ReactNode, useState} from "react";
import CarouselArrow from "@src/component/atoms/CarouselArrow/CarouselArrow";
import styled from "./style";
import CenterWrapper from "@src/component/atoms/CenterWrapper/CenterWrapper";
import { Dialog, Modal } from "@mui/material";
import WrapperTitle from "@src/component/atoms/WrapperTitle/WrapperTitle";
import HWButton from "@src/component/atoms/HWButton/HWButton";
import HWDialog from "@src/component/atoms/HWDialog/HWDialog";
import HWTypography from "@src/component/atoms/HWTypography/HWTypography";
import Color from "@src/common/styles/Color";
import {SerializedStyles} from "@emotion/react";

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
  const [currentPage, setCurrentPage] = useState<number>(1);
  return (
    <>
      <div css={styled.wrapper}>
        {title && <WrapperTitle title={title} />}
        {boxList.length === 0 && EmptyComponent}
        {boxList.length !== 0 && (
          <div css={styled.cardSlider}>
            <CarouselArrow
              direction={"left"}
              customCss={styled.leftPageBtn}
              onClick={() => {
                if (currentPage == 1) {
                  setCurrentPage(1);
                } else {
                  setCurrentPage(currentPage - 1);
                }
              }}
            />
            <div className={"box-card-list"} css={styled.cardWrapper(currentPage)}>
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
              direction={"right"}
              customCss={styled.rightPageBtn}
              onClick={() => {
                if (currentPage == 5) {
                  setCurrentPage(5);
                } else {
                  setCurrentPage(currentPage + 1);
                }
              }}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default BoxList;
