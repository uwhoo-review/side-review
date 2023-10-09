import styled from "./style";
import Card from "@src/component/atoms/Card/Card";
interface CardListProps {
  title: string;
  subTitle: string;
  cardList?: any;
}
const CardList = ({ title, subTitle, cardList }: CardListProps) => {
  return (
    <div css={styled.wrapper}>
      <div css={styled.title}>{title}</div>
      <div css={styled.subTitle}>{subTitle}</div>
      <div css={styled.cardWrapper}>
        {[...new Array(5)].map((v, i) => {
          return <Card key={i} rank={i + 1} />;
        })}
      </div>
    </div>
  );
};

export default CardList;
