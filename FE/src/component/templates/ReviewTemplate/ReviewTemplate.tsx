import styled from "./style";
import ReviewTotalContent from "@src/component/organisms/DetailGrid/Review/ReviewTotalContent";
import { useParams } from "react-router-dom";

const ReviewTemplate = () => {
  const { id } = useParams();

  return (
    <>
      <div className="review-template-wrapper" css={styled.wrapper}>
        <div css={styled.contents}>{id && <ReviewTotalContent id={id} />}</div>
      </div>
    </>
  );
};

export default ReviewTemplate;
