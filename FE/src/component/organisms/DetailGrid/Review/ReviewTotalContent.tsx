import CenterWrapper from "@src/component/atoms/CenterWrapper/CenterWrapper";
import styled from "./style";
import ReviewCardTotalList from "@src/component/molecules/ReviewCardTotalList/ReviewCardTotalList";

const ReviewTotalContent = ({ id }: { id: string }) => {
  return (
    <div className="contents-review-wrapper" css={styled.reviewWrapper}>
      <CenterWrapper>
        <ReviewCardTotalList id={id} size={10} />
      </CenterWrapper>
    </div>
  );
};

export default ReviewTotalContent;
