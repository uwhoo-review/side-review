import styled from "./style";
import CardList from "@src/component/molecules/CardList/CardList";

const Content = () => {
  return (
    <div css={styled.wrapper}>
      <CardList
        title={"리뷰 박스 인기 작품"}
        subTitle={"리뷰박스 유저들이 좋아하는 인기 작품을 확인해 보세요!"}
      />
      <CardList title={"최신 개봉 작품"} subTitle={" 최신 개봉 작품을 가장 먼저 확인해 보세요"} />
    </div>
  );
};

export default Content;
