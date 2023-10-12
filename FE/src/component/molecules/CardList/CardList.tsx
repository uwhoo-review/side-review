import styled from "./style";
import ImageCard from "@src/component/atoms/ImageCard/ImageCard";
import { useRef, useState } from "react";
import HWCarouselFixedPagination from "@src/component/molecules/HWCarouselFixedPagination/HWCarouselFixedPagination";
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
        <button
          css={styled.leftPageBtn}
          onClick={() => {
            if (currentPage == 1) {
              setCurrentPage(1);
            } else {
              setCurrentPage(currentPage - 1);
            }
          }}
        >
          ---
        </button>
        <button
          css={styled.rightPageBtn}
          onClick={() => {
            if (currentPage == 5) {
              setCurrentPage(5);
            } else {
              setCurrentPage(currentPage + 1);
            }
          }}
        >
          +++
        </button>
      </div>
      {preview && (
        <div
          className={`preview-wrapper ${preview && "open"}`}
          ref={boxRef}
          css={styled.previewBox}
        />
      )}
    </div>
  );
};

export default CardList;
