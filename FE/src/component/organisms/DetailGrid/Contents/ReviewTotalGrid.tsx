import ReviewCardList from "@src/component/molecules/ReviewCardList/ReviewCardList";
import CenterWrapper from "@src/component/atoms/CenterWrapper/CenterWrapper";
import styled from "./style";

const ReviewTotalGrid = () => {
  return (
    <div className="contents-review-wrapper" css={styled.reviewWrapper}>
      <CenterWrapper>
        <ReviewCardList total={true} />
      </CenterWrapper>
    </div>
  );
};

export default ReviewTotalGrid;
