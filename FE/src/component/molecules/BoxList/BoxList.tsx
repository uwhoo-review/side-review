import { useState } from "react";
import CarouselArrow from "@src/component/atoms/CarouselArrow/CarouselArrow";
import styled from "./style";
import CenterWrapper from "@src/component/atoms/CenterWrapper/CenterWrapper";

const BoxList = ({ title, subTitle, boxList }: any) => {
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  return (
    <div css={styled.wrapper}>
      <CenterWrapper>
        <div css={styled.title}>{title}</div>
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
          <div className={"image-card-list"} css={styled.cardWrapper(currentPage)}>
            {boxList.map((v: any, i: number) => {
              return v;
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
      </CenterWrapper>
    </div>
  );
};

export default BoxList;
