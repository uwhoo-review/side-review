import styled from "./style";
import DetailGrid from "@src/component/organisms/DetailGrid/Contents/DetailGrid";
import BoxList from "@src/component/molecules/BoxList/BoxList";

const DetailTemplate = () => {
  return (
    <>
      <section className="detail-template-wrapper" css={styled.wrapper}>
        <DetailGrid />
      </section>
    </>
  );
};

export default DetailTemplate;
