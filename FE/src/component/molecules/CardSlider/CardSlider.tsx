import CarouselArrow from "@src/component/atoms/CarouselArrow/CarouselArrow";
import ContentCard from "@src/component/atoms/ContentCard/ContentCard";
import { useCallback, useEffect, useState } from "react";
import styled from "./style";
import { useDrop } from "react-dnd";
import HWIconButton from "@src/component/atoms/HWIconButton/HWIconButton";
import CloseIcon from "@mui/icons-material/Close";

function switchValues(arr: any, index1: any, index2: any) {
  [arr[index1], arr[index2]] = [arr[index2], arr[index1]];
}

const CardSlider = ({ cardList, onDelete }: any) => {
  const TOTAL_LIST = cardList.length;
  const MOVE = 1;
  const TOTAL_PAGE = TOTAL_LIST <= 5 ? 1 : Math.ceil((TOTAL_LIST - 5) / MOVE) + 1;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [firstIdx, setFirstIdx] = useState(1);
  const [lastIdx, setLastIdx] = useState(5);
  const [translateX, setTranslateX] = useState(0);
  const [cards, setCards] = useState<any>([]);

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

  const findCard = useCallback(
    (id: string) => {
      const card = cards.find((v: any) => `${v.id}` === id.toString()) as any;
      return {
        ...card,
        index: cards.indexOf(card),
      };
    },
    [cards]
  );

  const moveCard = useCallback(
    (fromId: string, toId: string) => {
      console.log(fromId, toId);
      console.log(findCard(fromId), findCard(toId));
      const fromCard = findCard(fromId);
      const toCard = findCard(toId);
      switchValues(cards, fromCard.index, toCard.index);
      setCards([...cards]);

      /*    setCards((prevCards: any[]) =>
        update(prevCards, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, prevCards[dragIndex] as any],
          ],
        }),
    )*/
    },
    [findCard, cards]
  );

  const [, drop] = useDrop(() => ({ accept: "CARD" }));

  useEffect(() => {
    const x = (firstIdx - 1) * (-196 - 20);
    setTranslateX(x);
  }, [firstIdx]);

  useEffect(() => {
    setCards(cardList);
    // console.log(cardList)
  }, [cardList]);

  return (
    <div css={styled.cardSlider(currentPage, TOTAL_PAGE)}>
      <CarouselArrow
        className={"hover-arrow left"}
        direction={"left"}
        customCss={styled.leftPageBtn}
        onClick={onPrevHandler}
      />
      <div className={"image-card-list"} css={styled.cardWrapper(translateX, false)}>
        {cards.map((v: any, i: number) => {
          return (
            <div className={"content-slide"} key={v.id} ref={drop}>
              {
                <HWIconButton
                  className={"content-close-button"}
                  aria-label="close"
                  onClick={() => onDelete(v.id)}
                  css={[styled.closeButton]}
                >
                  <CloseIcon />
                </HWIconButton>
              }
              <ContentCard
                id={v.id}
                className={`image-card`}
                srcId={v.poster || ""}
                contentName={v.name}
                platform={v.platform}
                age={v.age}
                date={v.year}
                rating={v.rating}
                active={false}
                season={v.season}
                customCss={styled.card}
                moveCard={moveCard}
                findCard={findCard}
                isHoverScale={false}
                rank={i + 1 < 4 ? i + 1 : undefined}
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
