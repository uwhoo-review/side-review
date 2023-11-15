import styled from "./style";
import ReviewTotalGrid from "@src/component/organisms/DetailGrid/Contents/ReviewTotalGrid";

const ReviewTemplate = () => {
  return (
    <>
      <div className="review-template-wrapper" css={styled.wrapper}>
        <div css={styled.contents}>
          <ReviewTotalGrid />
        </div>
      </div>
    </>
  );
};

export default ReviewTemplate;
