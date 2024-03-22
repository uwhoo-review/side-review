import styled from "./style";
import ContentCard from "@src/component/atoms/ContentCard/ContentCard";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import HWCarouselFixedPagination from "@src/component/molecules/HWCarouselFixedPagination/HWCarouselFixedPagination";
import CarouselArrow from "@src/component/atoms/CarouselArrow/CarouselArrow";
import PreviewBox from "@src/component/molecules/PreviewBox/PreviewBox";
import CenterWrapper from "@src/component/atoms/CenterWrapper/CenterWrapper";
import { ContentDO } from "@src/interfaces/api.interface";
import { IconMark150 } from "@res/index";
interface CardListProps {
  title: string;
  subTitle: string | ReactNode;
  cardList: ContentDO[];
  favorite: string[];
}
const CardList = ({ title, subTitle, cardList, favorite }: CardListProps) => {
  const [selectedCard, setSelectedCard] = useState<ContentDO | null>(null);
  const [selectedCardIdx, setSelectedCardIdx] = useState<number | null>(null);

  const TOTAL_LIST = cardList.length;
  const MOVE = 4;
  const TOTAL_PAGE = Math.ceil((TOTAL_LIST - 6) / MOVE) + 1;

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [firstIdx, setFirstIdx] = useState(1);
  const [lastIdx, setLastIdx] = useState(6);
  const [translateX, setTranslateX] = useState(0);

  const onPrevHandler = () => {
    if (currentPage === 1) {
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
    if (currentPage === TOTAL_PAGE) {
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

  useEffect(() => {
    const x = (firstIdx - 1) * (-216 - 20);
    setTranslateX(x);
  }, [firstIdx]);

  useEffect(() => {
    selectedCardIdx !== null && setSelectedCard(cardList[selectedCardIdx]);
  }, [cardList]);

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
              const movePage = Math.abs(e - currentPage);
              if (e - currentPage > 0) {
                if (lastIdx + MOVE * movePage < TOTAL_LIST) {
                  setFirstIdx((prev) => prev + MOVE * movePage);
                  setLastIdx((prev) => prev + MOVE * movePage);
                } else {
                  setFirstIdx((prev) => prev + TOTAL_LIST - lastIdx);
                  setLastIdx((prev) => TOTAL_LIST);
                }
              } else if (e - currentPage < 0) {
                if (firstIdx - MOVE * movePage > 1) {
                  setFirstIdx((prev) => prev - MOVE * movePage);
                  setLastIdx((prev) => prev - MOVE * movePage);
                } else {
                  setFirstIdx((prev) => 1);
                  setLastIdx((prev) => prev - (firstIdx - 1));
                }
              }
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
          <div className={"image-card-list"} css={styled.cardWrapper(translateX, !!selectedCard)}>
            {cardList.map((v, i: number) => {
              return (
                <div
                  className={"content-slide"}
                  key={v.id}
                  onClick={() => {
                    if (selectedCard === null) {
                      setSelectedCard(v);
                      setSelectedCardIdx(i);
                    } else {
                      if (selectedCard.id === v.id) {
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
                    id={v.id}
                    className={`image-card`}
                    srcId={v.poster || ""}
                    rank={i + 1}
                    contentName={v.name}
                    platform={v.platform}
                    age={v.age}
                    date={v.date}
                    rating={v.rating}
                    active={selectedCard ? selectedCard.id === v.id : true}
                    season={v.season}
                    customCss={styled.card}
                    favorite={favorite.includes(v.id)}
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
      {selectedCard && <PreviewBox item={selectedCard} customCss={styled.previewBox} />}
    </div>
  );
};

export default CardList;
