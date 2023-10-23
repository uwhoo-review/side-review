import styled from "./style";
import ImageCard from "@src/component/atoms/ImageCard/ImageCard";
import { useRef, useState } from "react";
import HWCarouselFixedPagination from "@src/component/molecules/HWCarouselFixedPagination/HWCarouselFixedPagination";
import CarouselArrow from "@src/component/atoms/CarouselArrow/CarouselArrow";
import ReviewCard from "@src/component/atoms/ReviewCard/ReviewCard";
import PreviewBox from "@src/component/molecules/PreviewBox/PreviewBox";
interface CardListProps {
  title: string;
  subTitle: string;
  cardList?: any;
}
const CardList = ({ title, subTitle, cardList }: CardListProps) => {
  const boxRef = useRef<HTMLDivElement>(null);
  const [preview, setPreview] = useState<boolean>(false);
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  return (
    <div css={styled.wrapper}>
      <div css={styled.title}>{title}</div>
      <div css={styled.flexBetween}>
        <div css={styled.subTitle}>{subTitle}</div>
        <HWCarouselFixedPagination
          maxPage={5}
          curPage={currentPage - 1}
          customCss={styled.dotPagination}
          onClickCircle={(e) => {
            setCurrentPage(e);
          }}
        />
      </div>

      {/*<div>*/}
      {/*  {currentPage}*/}
      {/*  {selectedCard}*/}
      {/*</div>*/}
      <div css={styled.cardSlider}>
        <div className={"image-card-list"} css={styled.cardWrapper(currentPage)}>
          {cardList.map((v: any, i: number) => {
            return (
              <ImageCard
                src={v}
                className={"image-card"}
                key={i}
                rank={i + 1}
                customCss={styled.card}
                onClick={() => {
                  if (selectedCard === null) {
                    setPreview(true);
                    setSelectedCard(i + 1);
                  } else {
                    if (selectedCard === i + 1) {
                      setPreview(false);
                      setSelectedCard(null);
                    } else {
                      setSelectedCard(i + 1);
                    }
                  }
                }}
              />
            );
          })}
        </div>
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
      {preview && <PreviewBox customCss={styled.previewBox} />}
    </div>
  );
};

{/*(
        <div
          className={`preview-wrapper ${preview && "open"}`}
          ref={boxRef}
          css={styled.previewBox}
        >
          <ReviewCard best={true} date={"2023.02.29"}>
            초능력을 숨긴 채 현재를 살아가는 아이들과, 과거의 아픈 비밀을 숨긴 채 살아온 부모들이
            시대와 세대를 넘어 닥치는 거대한 위험에 함께 맞서는 초능력 액션 히어로물. 초능력을 숨긴
            채 현재를 살아가는 아이들과, 과거의 아픈 비밀을 숨긴 채 살아온 부모들이 시대와 세대를
            넘어 닥치는 거 블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라
          </ReviewCard>
          <ReviewCard best={false} date={"2023.02.29"}>
            asd
          </ReviewCard>
        </div>
      )*/}

export default CardList;
