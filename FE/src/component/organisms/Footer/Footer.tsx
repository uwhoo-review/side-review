import styled from "./style";
import HWTypography from "@src/component/atoms/HWTypography/HWTypography";
import Color from "@src/common/styles/Color";
import CenterWrapper from "@src/component/atoms/CenterWrapper/CenterWrapper";
const Footer = () => {
  return (
    <footer css={styled.wrapper}>
      <CenterWrapper>
        <HWTypography variant={"bodyS"} family={"Pretendard"} color={Color.dark.grey500}>
          © 2023 UWHOO. All rights reserved.
        </HWTypography>
      </CenterWrapper>
    </footer>
  );
};

export default Footer;
