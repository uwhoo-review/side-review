import styled from "./style";
import CardList from "@src/component/molecules/CardList/CardList";
import { card1, card2, card3, card4, card5 } from "@res/index";
const CARD_GROUP_1 = [
  card1,
  card2,
  card3,
  card4,
  card5,
  card1,
  card2,
  card3,
  card4,
  card5,
  card1,
  card2,
  card3,
  card4,
  card5,
  card1,
  card2,
  card3,
  card4,
  card5,
  card1,
  card2,
  card3,
  card4,
  card5,
  card1,
  card2,
  card3,
  card4,
  card5,
];

const Content = () => {
  return (
    <div className="contents-wrapper" css={styled.wrapper}>
      <CardList
        title={"리뷰 박스 인기 작품"}
        subTitle={"리뷰박스 유저들이 좋아하는 인기 작품을 확인해 보세요!"}
        cardList={CARD_GROUP_1}
      />
      <CardList
        title={"최신 개봉 작품"}
        subTitle={" 최신 개봉 작품을 가장 먼저 확인해 보세요"}
        cardList={CARD_GROUP_1}
      />
    </div>
  );
};

export default Content;
