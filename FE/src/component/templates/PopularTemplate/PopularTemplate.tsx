import styled from "./style";
import PopularContent from "@src/component/organisms/PopularGrid/Contents/PopularContent";

const PopularTemplate = () => {
  return (
    <>
      <div className="popular-template-wrapper" css={styled.wrapper}>
        <div className={"scroll-area none-draggable"} css={styled.subWrapper}>
          <PopularContent />
        </div>
      </div>
    </>
  );
};
export default PopularTemplate;
