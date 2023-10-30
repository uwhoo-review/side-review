import styled from "./style";
import ContentCard from "@src/component/atoms/ContentCard/ContentCard";
import { useRef, useState } from "react";
import HWCarouselFixedPagination from "@src/component/molecules/HWCarouselFixedPagination/HWCarouselFixedPagination";
import CarouselArrow from "@src/component/atoms/CarouselArrow/CarouselArrow";
import PreviewBox from "@src/component/molecules/PreviewBox/PreviewBox";
import CenterWrapper from "@src/component/atoms/CenterWrapper/CenterWrapper";
interface CardListProps {
  title: string;
  subTitle: string;
  cardList?: any;
}
const CardList = ({ title, subTitle, cardList }: CardListProps) => {
  const boxRef = useRef<HTMLDivElement>(null);
  const [preview, setPreview] = useState<boolean>(false);
  const [selectedCard, setSelectedCard] = useState<string | number | null>(null);
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
            {cardList.map((v: any, i: number) => {
              return (
                <ContentCard
                  className={`image-card`}
                  src={v}
                  key={i}
                  rank={i + 1}
                  customCss={styled.card}
                  inActive={preview && selectedCard !== i}
                  onClick={() => {
                    if (selectedCard === null) {
                      setPreview(true);
                      setSelectedCard(i);
                    } else {
                      if (selectedCard === i) {
                        setPreview(false);
                        setSelectedCard(null);
                      } else {
                        setSelectedCard(i);
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
      {preview && (
        <PreviewBox customCss={styled.previewBox} onPrev={onPrevHandler} onNext={onNextHandler} />
      )}
    </div>
  );
};

export default CardList;
