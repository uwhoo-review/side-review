import styled from "./style";
import ContentCard from "@src/component/atoms/ContentCard/ContentCard";
import React, {ReactNode, useEffect, useRef, useState} from "react";
import HWCarouselFixedPagination from "@src/component/molecules/HWCarouselFixedPagination/HWCarouselFixedPagination";
import CarouselArrow from "@src/component/atoms/CarouselArrow/CarouselArrow";
import PreviewBox from "@src/component/molecules/PreviewBox/PreviewBox";
import CenterWrapper from "@src/component/atoms/CenterWrapper/CenterWrapper";
import { IMAGE_URL } from "@src/variables/tmdbConstants";
import { ContentProps } from "@src/interfaces/api.interface";
import { getCardURL } from "@src/tools/commonTools";
interface CardListProps {
  title: string;
  subTitle: string | ReactNode;
  cardList: ContentProps[];
}
const CardList = ({ title, subTitle, cardList }: CardListProps) => {
  const boxRef = useRef<HTMLDivElement>(null);
  const [preview, setPreview] = useState<boolean>(false);
  const [selectedCard, setSelectedCard] = useState<ContentProps | null>(null);
  const [selectedCardIdx, setSelectedCardIdx] = useState<number | null>(null);

  const TOTAL_LIST = cardList.length;
  const MOVE = 4;
  const TOTAL_PAGE = Math.ceil((TOTAL_LIST - 6) / MOVE) + 1;

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [firstIdx, setFirstIdx] = useState(1);
  const [lastIdx, setLastIdx] = useState(6);
  const [translateX, setTranslateX] = useState(0);

  useEffect(() => {
    const x = (firstIdx - 1) * (-216 - 20);
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
    <div css={styled.wrapper}>
      <CenterWrapper>
        <div css={styled.title}>{title}</div>
        <div css={styled.flexBetween}>
          <div css={styled.subTitle}>{subTitle}</div>
          <HWCarouselFixedPagination
            maxPage={TOTAL_PAGE}
            curPage={currentPage - 1}
            customCss={styled.dotPagination}
            onClickCircle={(e) => {
              setCurrentPage(e);
            }}
          />
        </div>
        <div css={styled.cardSlider(currentPage, TOTAL_PAGE)}>
          <CarouselArrow
            className={"hover-arrow left"}
            direction={"left"}
            customCss={styled.leftPageBtn}
            onClick={onPrevHandler}
          />
          <div
            className={"image-card-list"}
            css={styled.cardWrapper(translateX, !!selectedCard)}
          >
            {cardList.map((v, i: number) => {
              return (
                <div
                  className={"content-slide"}
                  key={v.id}
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
                >
                  <ContentCard
                    className={`image-card`}
                    srcId={v.poster || ""}
                    rank={i + 1}
                    contentName={v.name}
                    platform={v.platform}
                    age={v.age}
                    year={v.year}
                    rating={v.rating}
                    active={selectedCard ? selectedCard.id === v.id : true}
                    customCss={styled.card}
                  />
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
