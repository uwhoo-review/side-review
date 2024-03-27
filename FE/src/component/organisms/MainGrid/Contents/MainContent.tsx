import styled from "./style";
import CardList from "@src/component/molecules/CardList/CardList";
import { card1, card2, card3, card4, card5, IconBlub, IconPopcorn } from "@res/index";
import WrapperTitle from "@src/component/atoms/WrapperTitle/WrapperTitle";
import { ContentsResDO } from "@src/interfaces/api.interface";
import OttToggleButton from "@src/component/atoms/OttToggleButton/OttToggleButton";
import CenterWrapper from "@src/component/atoms/CenterWrapper/CenterWrapper";
const CARD_GROUP_1 = [card1, card2, card3, card4, card5, card1, card2, card3, card4, card5];

interface MainContentProps {
  data: ContentsResDO;
}

const MainContent = ({ data }: MainContentProps) => {
  return (
    <div className="contents-wrapper" css={styled.wrapper}>
      <CenterWrapper>
        <OttToggleButton />
      </CenterWrapper>
      <CardList
        title={"인기 작품"}
        subTitle={
          <>
            <IconBlub /> 지금 떠오르는 TOP20 이에요!
          </>
        }
        cardList={data.popular || []}
        favorite={data.favorite.popular || []}
      />
      <CardList
        title={"최신 개봉 작품"}
        subTitle={
          <>
            <IconPopcorn /> 최신 개봉 작품을 가장 먼저 확인해 보세요
          </>
        }
        cardList={data.latest || []}
        favorite={data.favorite.latest || []}
      />
    </div>
  );
};

export default MainContent;
