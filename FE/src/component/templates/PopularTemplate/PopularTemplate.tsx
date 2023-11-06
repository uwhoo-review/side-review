import styled from "./style";
import PopularContent from "@src/component/organisms/PopularGrid/Contents/PopularContent";

const PopularTemplate = () => {
  return (
    <>
      <div className="popular-template-wrapper" css={styled.wrapper}>
          <PopularContent />
      </div>
    </>
  );
};
export default PopularTemplate;
