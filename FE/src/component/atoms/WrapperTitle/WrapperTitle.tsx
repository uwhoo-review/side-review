import styled from "./style";
import HWTypography from "@src/component/atoms/HWTypography/HWTypography";
import HWButton from "@src/component/atoms/HWButton/HWButton";

const WrapperTitle = ({ title, subTitle, rightWrapper }: any) => {
  return (
    <div css={styled.topWrapper}>
      <div>
        <HWTypography variant={"headlineM"} family={"Pretendard-SemiBold"}>
          {title}
        </HWTypography>
        <span css={styled.typo1}>{subTitle}</span>
      </div>
      <div>{rightWrapper && rightWrapper}</div>
    </div>
  );
};

export default WrapperTitle;
