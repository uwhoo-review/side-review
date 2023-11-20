import styled from "./style";
import SearchResultHeader from "@src/component/organisms/SearchResultGrid/Header/SearchResultHeader";
import SearchResultContent from "@src/component/organisms/SearchResultGrid/Contents/SearchResultContent";

const SearchResultTemplate = () => {
  return (
    <>
      <div className="detail-template-wrapper" css={styled.wrapper}>
        <SearchResultHeader />
        <SearchResultContent />
      </div>
    </>
  );
};

export default SearchResultTemplate;
