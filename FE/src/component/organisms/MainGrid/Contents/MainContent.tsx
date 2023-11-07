import styled from "./style";
import CardList from "@src/component/molecules/CardList/CardList";
import { card1, card2, card3, card4, card5 } from "@res/index";
import WrapperTitle from "@src/component/atoms/WrapperTitle/WrapperTitle";
import {ContentsDO} from "@src/interfaces/api.interface";
const CARD_GROUP_1 = [card1, card2, card3, card4, card5, card1, card2, card3, card4, card5];

interface MainContentProps {
  data: ContentsDO;
}

const MainContent = ({ data }: MainContentProps) => {

  return (
    <div className="contents-wrapper" css={styled.wrapper}>
      <CardList
        title={"리뷰 박스 인기 작품"}
        subTitle={"리뷰박스 유저들이 좋아하는 인기 작품을 확인해 보세요!"}
        cardList={data.popular}
      />
      <CardList
        title={"최신 개봉 작품"}
        subTitle={" 최신 개봉 작품을 가장 먼저 확인해 보세요"}
        cardList={data.latest}
      />
    </div>
  );
};

export default MainContent;
