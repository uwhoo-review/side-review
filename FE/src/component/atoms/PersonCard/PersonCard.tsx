import styled from "./style";
import DefaultImage from "@src/component/atoms/DefaultImage/DefaultImage";
import HWTypography from "@src/component/atoms/HWTypography/HWTypography";

const PersonCard = ({ width = "82px", height = "82px", className, customCss, ...props }: any) => {
  return (
    <div className={"person-card-wrapper"} css={[styled.wrapper, customCss]} {...props}>
      <DefaultImage src={""} width={width} height={height} />
      <div css={styled.textGroup}>
        <HWTypography variant={"bodyL"} family={"Pretendard-SemiBold"}>
          가나다
        </HWTypography>
        <HWTypography variant={"bodyS"}>가나다</HWTypography>
      </div>
    </div>
  );
};

export default PersonCard;
