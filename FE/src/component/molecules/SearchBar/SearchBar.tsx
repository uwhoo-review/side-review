import HWTextField from "@src/component/atoms/HWTextField/HWTextField";
import { IconSearch } from "@res/index";
import styled from "./style";
const SearchBar = () => {
  return (
    <div css={styled.wrapper}>
      <HWTextField
        startAdorment={<IconSearch />}
        endAdorment={<IconSearch />}
        placeholder={"제목, 이물 검색"}
      />
    </div>
  );
};

export default SearchBar;
