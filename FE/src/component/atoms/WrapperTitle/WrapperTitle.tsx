import styled from "./style";
import HWTypography from "@src/component/atoms/HWTypography/HWTypography";
import HWButton from "@src/component/atoms/HWButton/HWButton";

const WrapperTitle = ({ title, subTitle, rightWrapper, customCss }: any) => {
  return (
    <div css={[styled.topWrapper, customCss]}>
      <div>
        <HWTypography variant={"headlineM"} family={"Pretendard-SemiBold"} color={"#fff"}>
          {title}
        </HWTypography>
        <span css={styled.typo1}>{subTitle}</span>
      </div>
      <div>{rightWrapper && rightWrapper}</div>
    </div>
  );
};

export default WrapperTitle;
