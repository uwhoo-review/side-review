import styled from "./style";

const SearchResultTemplate = () => {
  return (
    <>
      <div className="detail-template-wrapper" css={styled.wrapper}>
        <div className={"scroll-area none-draggable"} css={styled.subWrapper}>
        </div>
      </div>
    </>
  );
};

export default SearchResultTemplate;
