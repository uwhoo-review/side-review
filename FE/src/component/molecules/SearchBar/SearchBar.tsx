import HWTextField from "@src/component/atoms/HWTextField/HWTextField";
import { IconSearch } from "@res/index";
import styled from "./style";
import HWTypography from "@src/component/atoms/HWTypography/HWTypography";
import HWButton from "@src/component/atoms/HWButton/HWButton";
const SearchBar = () => {
  return (
    <div css={styled.wrapper}>
      <HWTypography variant={"bodyS"} css={styled.typography}>
        어떤 작품을 찾으세요?
      </HWTypography>
      <div css={styled.searchGroups}>
        <HWTextField
          startAdorment={<IconSearch />}
          endAdorment={<IconSearch />}
          placeholder={"제목, 이물 검색"}
          fullWidth={true}
        />
        <div css={styled.searchBtnGroups}>
          <HWButton variant={"lowest"}>
            <IconSearch />
            <div>초기화</div>
          </HWButton>
          <HWButton variant={"primary"}>적용</HWButton>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
