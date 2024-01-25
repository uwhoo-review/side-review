import CarouselArrow from "@src/component/atoms/CarouselArrow/CarouselArrow";
import ContentCard from "@src/component/atoms/ContentCard/ContentCard";
import { useEffect, useState } from "react";
import styled from "./style";

const CardSlider = ({ cardList }: any) => {
  const TOTAL_LIST = cardList.length;
  const MOVE = 1;
  const TOTAL_PAGE = Math.ceil((TOTAL_LIST - 5) / MOVE) + 1;

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [firstIdx, setFirstIdx] = useState(1);
  const [lastIdx, setLastIdx] = useState(5);
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
    const x = (firstIdx - 1) * (-196 - 20);
    setTranslateX(x);
  }, [firstIdx]);

  return (
    <div css={styled.cardSlider(currentPage, TOTAL_PAGE)}>
      <CarouselArrow
        className={"hover-arrow left"}
        direction={"left"}
        customCss={styled.leftPageBtn}
        onClick={onPrevHandler}
      />
      <div className={"image-card-list"} css={styled.cardWrapper(translateX, false)}>
        {cardList.map((v: any, i: number) => {
          return (
            <div className={"content-slide"} key={v.id}>
              <ContentCard
                id={v.id}
                className={`image-card`}
                srcId={v.poster || ""}
                contentName={v.name}
                platform={v.platform}
                age={v.age}
                date={v.date}
                rating={v.rating}
                active={false}
                season={v.season}
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
  );
};

export default CardSlider;
