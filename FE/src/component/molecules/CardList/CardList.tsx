import styled from "./style";
import ImageCard from "@src/component/atoms/ImageCard/ImageCard";
import { useState } from "react";
interface CardListProps {
  title: string;
  subTitle: string;
  cardList?: any;
}
const CardList = ({ title, subTitle, cardList }: CardListProps) => {
  const [currentPage, setCurrentPage] = useState(0);

  return (
    <div css={styled.wrapper}>
      <div css={styled.title}>{title}</div>
      <div css={styled.subTitle}>{subTitle}</div>
      <div>{currentPage}</div>
      <div css={styled.cardSlider}>
        <div className={"image-card-list"} css={styled.cardWrapper(currentPage)}>
          {[...new Array(10)].map((v, i) => {
            return <ImageCard className={"image-card"} key={i} rank={i + 1} />;
          })}
        </div>
        <button
          css={styled.leftPageBtn}
          onClick={() => {
            if (currentPage == 0) {
              setCurrentPage(0);
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
            if (currentPage == 9) {
              setCurrentPage(9);
            } else {
              setCurrentPage(currentPage + 1);
            }
          }}
        >
          +++
        </button>
      </div>
      <div css={styled.previewBox}>

      </div>
    </div>
  );
};

export default CardList;
