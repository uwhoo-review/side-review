import styled from "./style";
import HWTypography from "@src/component/atoms/HWTypography/HWTypography";
import Color from "@src/common/styles/Color";
import { IconChevronDoubleDown } from "@res/index";

const MoreViewButton = ({ onClick }: any) => {
  return (
    <div css={styled.plusBtn} onClick={onClick}>
      <HWTypography
        variant={"headlineXXS"}
        family={"Pretendard-SemiBold"}
        color={Color.dark.primary800}
      >
        더보기
      </HWTypography>
      <IconChevronDoubleDown />
    </div>
  );
};

export default MoreViewButton;
