import Content from "@src/component/organisms/Content/Content";
import styled from "./style";

const RecentlyTemplate = () => {
  return (
    <>
      <div css={styled.wrapper}>
        <div className={"scroll-area none-draggable"}>
          <div className={"select-main custom-scroll-area"}>
            {/*<Content />*/}
          </div>
        </div>
      </div>
    </>
  );
};
export default RecentlyTemplate;
