import styled from "./style";
import DetailGrid from "@src/component/organisms/DetailGrid/Contents/DetailGrid";
import BoxList from "@src/component/molecules/BoxList/BoxList";

const DetailTemplate = () => {
  return (
    <>
      <div className="detail-template-wrapper" css={styled.wrapper}>
        <div className={"scroll-area none-draggable"} css={styled.subWrapper}>
          <DetailGrid />
        </div>
      </div>
    </>
  );
};

export default DetailTemplate;
