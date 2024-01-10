import styled from "./style";
import { IconGoogle, IconKakao, IconNaver } from "@res/index";
import HWTypography from "@src/component/atoms/HWTypography/HWTypography";
import HWButton from "@src/component/atoms/HWButton/HWButton";

const Login = () => {
  const NAVER_URI = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${process.env.NAVER_CLIENT_ID}&response_type=code&redirect_uri=${process.env.NAVER_CALLBACK_URL}&state=${process.env.NAVER_STATE}`;
  const KAKAO_URI = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.KAKAO_CLIENT_ID}&redirect_uri=${process.env.KAKAO_CALLBACK_URL}`;
  const GOOGLE_URI = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&scope=email profile&client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${process.env.GOOGLE_CALLBACK_URL}`;
  return (
    <div css={styled.wrapper}>
      <HWButton
        variant={"lower"}
        customCss={styled.googleBtn}
        onClick={() => (window.location.href = GOOGLE_URI)}
      >
        <IconGoogle width={"30px"} height={"30px"} />
        <HWTypography variant={"bodyXL"}>구글로 계속하기</HWTypography>
      </HWButton>
      <HWButton
        variant={"lower"}
        css={styled.naverBtn}
        onClick={() => (window.location.href = NAVER_URI)}
      >
        <IconNaver width={"23px"} height={"23px"} />
        <HWTypography variant={"bodyXL"}>네이버로 계속하기</HWTypography>
      </HWButton>
      <HWButton
        variant={"lower"}
        css={styled.kakaoBtn}
        onClick={() => (window.location.href = KAKAO_URI)}
      >
        <IconKakao width={"23px"} height={"23px"} />
        <HWTypography variant={"bodyXL"}>카카오로 계속하기</HWTypography>
      </HWButton>
    </div>
  );
};

export default Login;
