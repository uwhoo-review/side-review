import styled from "./style";
import ContentCard from "@src/component/atoms/ContentCard/ContentCard";
import { useState } from "react";
import CarouselArrow from "@src/component/atoms/CarouselArrow/CarouselArrow";
import CenterWrapper from "@src/component/atoms/CenterWrapper/CenterWrapper";
import PersonCard from "@src/component/atoms/PersonCard/PersonCard";
interface PersonCardListProps {
  cardList?: any;
}
const PersonCardList = ({ cardList }: PersonCardListProps) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  return (
    <div css={styled.wrapper}>
      <CenterWrapper>
        <div css={styled.title}>출연 ∙ 제작</div>
        <div css={styled.sliderWrapper}>
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
          <div className={"image-card-list"} css={styled.slider}>
            <div css={styled.grid(currentPage)}>
              {cardList.map((v: any, i: number) => {
                return (
                  <PersonCard
                    src={v}
                    className={"image-card"}
                    key={i}
                    customCss={styled.card}
                    onClick={() => {}}
                  />
                );
              })}
            </div>
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

export default PersonCardList;
