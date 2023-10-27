import styled from "./style";
import HWTypography from "@src/component/atoms/HWTypography/HWTypography";
import Color from "@src/common/styles/Color";
import HWChip from "@src/component/atoms/HWChip/HWChip";
import HWButton from "@src/component/atoms/HWButton/HWButton";
import { IconInit } from "@res/index";
import CenterWrapper from "@src/component/atoms/CenterWrapper/CenterWrapper";

const SearchResultHeader = () => {
  return (
    <div className={"search-header-wrapper"} css={styled.wrapper}>
      <CenterWrapper>
        <div css={styled.subWrapper}>
          <div css={styled.left}>
            <HWTypography variant={"headlineS"} family={"Pretendard-Bold"}>
              '무빙'
            </HWTypography>
            <HWTypography variant={"headlineS"} family={"Pretendard"} color={Color.dark.grey500}>
              의 검색결과
            </HWTypography>
          </div>
          <div css={styled.right}>
            <HWChip label={"액션"} />
            <HWChip label={"액션"} />
            <HWChip label={"액션"} />
            <HWChip label={"액션"} />
            <HWButton variant={"lowest"}>
              <IconInit />
              <div>초기화</div>
            </HWButton>
          </div>
        </div>
      </CenterWrapper>
    </div>
  );
};

export default SearchResultHeader;
