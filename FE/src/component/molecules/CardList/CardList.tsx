import styled from "./style";
import ContentCard from "@src/component/atoms/ContentCard/ContentCard";
import { useRef, useState } from "react";
import HWCarouselFixedPagination from "@src/component/molecules/HWCarouselFixedPagination/HWCarouselFixedPagination";
import CarouselArrow from "@src/component/atoms/CarouselArrow/CarouselArrow";
import PreviewBox from "@src/component/molecules/PreviewBox/PreviewBox";
import CenterWrapper from "@src/component/atoms/CenterWrapper/CenterWrapper";
import { IMAGE_URL } from "@src/variables/tmdbConstants";
import { ContentProps } from "@src/interfaces/api.interface";
interface CardListProps {
  title: string;
  subTitle: string;
  cardList: ContentProps[];
}
const CardList = ({ title, subTitle, cardList }: CardListProps) => {
  const boxRef = useRef<HTMLDivElement>(null);
  const [preview, setPreview] = useState<boolean>(false);
  const [selectedCard, setSelectedCard] = useState<ContentProps | null>(null);
  const [selectedCardIdx, setSelectedCardIdx] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const onPrevHandler = () => {
    if (currentPage == 1) {
      setCurrentPage(1);
    } else {
      setCurrentPage(currentPage - 1);
    }
  };

  const onNextHandler = () => {
    if (currentPage == 5) {
      setCurrentPage(5);
    } else {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div css={styled.wrapper}>
      <CenterWrapper>
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
        <div css={styled.cardSlider}>
          <CarouselArrow
            className={"hover-arrow left"}
            direction={"left"}
            customCss={styled.leftPageBtn}
            onClick={onPrevHandler}
          />
          <div className={"image-card-list"} css={styled.cardWrapper(currentPage, preview)}>
            {cardList.map((v, i: number) => {
              return (
                <ContentCard
                  key={v.id}
                  className={`image-card`}
                  src={IMAGE_URL + v.poster}
                  rank={i + 1}
                  contentName={v.name}
                  platform={v.platform}
                  age={v.age}
                  year={v.year}
                  rating={v.rating}
                  inActive={preview && selectedCard?.id !== v.id}
                  customCss={styled.card}
                  onClick={() => {
                    if (selectedCard === null) {
                      setPreview(true);
                      setSelectedCard(v);
                      setSelectedCardIdx(i);
                    } else {
                      if (selectedCard.id === v.id) {
                        setPreview(false);
                        setSelectedCard(null);
                        setSelectedCardIdx(null);
                      } else {
                        setSelectedCard(v);
                        setSelectedCardIdx(i);
                      }
                    }
                  }}
                />
              );
            })}
          </div>
          <CarouselArrow
            className={"hover-arrow left"}
            direction={"right"}
            customCss={styled.rightPageBtn}
            onClick={onNextHandler}
          />
        </div>
      </CenterWrapper>
      {selectedCard && (
        <PreviewBox
          item={selectedCard}
          customCss={styled.previewBox}
          onPrev={() => {
            if (selectedCardIdx !== null && selectedCardIdx > 0) {
              setSelectedCard(cardList[selectedCardIdx - 1]);
              setSelectedCardIdx(selectedCardIdx - 1);
            }
          }}
          onNext={() => {
            if (selectedCardIdx !== null && selectedCardIdx < cardList.length) {
              setSelectedCard(cardList[selectedCardIdx + 1]);
              setSelectedCardIdx(selectedCardIdx + 1);
            }
          }}
        />
      )}
    </div>
  );
};

export default CardList;
