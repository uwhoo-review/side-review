import styled from "./style";
import ReviewTotalContent from "@src/component/organisms/DetailGrid/Review/ReviewTotalContent";

const ReviewTemplate = () => {
  return (
    <>
      <div className="review-template-wrapper" css={styled.wrapper}>
        <div css={styled.contents}>
          <ReviewTotalContent />
        </div>
      </div>
    </>
  );
};

export default ReviewTemplate;
