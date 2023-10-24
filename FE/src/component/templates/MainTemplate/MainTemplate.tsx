import MainContent from "@src/component/organisms/MainGrid/Contents/MainContent";
import styled from "./style";

const MainTemplate = () => {
  return (
    <>
      <div css={styled.wrapper}>
        <div className={"scroll-area none-draggable"} css={styled.subWrapper}>
          <MainContent />
        </div>
      </div>
    </>
  );
};
export default MainTemplate;
