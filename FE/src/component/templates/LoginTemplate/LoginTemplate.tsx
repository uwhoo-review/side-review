import styled from "./style";
import {
  bg01,
  bg02,
  bg03,
  bg04,
  bg05,
  bg06,
  bg07,
  bg08,
  bg09,
  bg10,
  IconGoogle,
  IconKakao,
  IconNaver,
  IconUwhoo
} from "@res/index";
import HWTypography from "@src/component/atoms/HWTypography/HWTypography";
import HWButton from "@src/component/atoms/HWButton/HWButton";
const LoginTemplate = () => {
  // const bgList = [bg01, bg02, bg03, bg04, bg05, bg06, bg07, bg08, bg09, bg10];

  return (
    <section
      className="login-template-wrapper"
      css={styled.wrapper([bg01, bg02, bg03, bg04, bg05, bg06, bg07, bg08, bg09, bg10])}
    >
      <div css={styled.loginWrapper}>
        <IconUwhoo width={"300px"} height={"48px"} />
        <div css={styled.typo1}>로그인</div>
        <div css={styled.typo2}>
          간편 로그인으로&nbsp;
          <HWTypography variant={"bodyXL"} color={"#6D6ADA"}>
            유후
          </HWTypography>
          의 다양한&nbsp;
          <HWTypography variant={"bodyXL"} color={"#C7C8D3"}>
            맞춤 추천 서비스
          </HWTypography>
          를 이용해보세요!
        </div>
        <div css={styled.buttonWrapper}>
          <HWButton variant={"lower"} customCss={styled.googleBtn}>
            <IconGoogle width={"30px"} height={"30px"} />
            <HWTypography variant={"bodyXL"}>구글로 계속하기</HWTypography>
          </HWButton>
          <HWButton variant={"lower"} css={styled.naverBtn}>
            <IconNaver width={"23px"} height={"21px"} />
            <HWTypography variant={"bodyXL"}>네이버로 계속하기</HWTypography>
          </HWButton>
          <HWButton variant={"lower"} css={styled.kakaoBtn}>
            <IconKakao width={"23px"} height={"23px"} />
            <HWTypography variant={"bodyXL"}>카카오로 계속하기</HWTypography>
          </HWButton>
        </div>
      </div>
    </section>
  );
};

export default LoginTemplate;
