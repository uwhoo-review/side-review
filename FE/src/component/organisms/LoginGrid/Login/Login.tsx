import styled from "./style";
import { IconGoogle, IconKakao, IconNaver } from "@res/index";
import HWTypography from "@src/component/atoms/HWTypography/HWTypography";
import HWButton from "@src/component/atoms/HWButton/HWButton";
import { useEffect, useState } from "react";
import { useCommon } from "@src/providers/CommonProvider";
import { getCookie } from "@src/tools/commonTools";
import { GOOGLE, KAKAO, NAVER, UWHOO_LOGIN } from "@src/variables/LoginConstants";
import SpeechBubble from "@src/component/atoms/SpeechBubble/SpeechBubble";
import { UWAxios } from "@src/common/axios/AxiosConfig";

const Login = () => {
  const NAVER_URI = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${process.env.NAVER_CLIENT_ID}&response_type=code&redirect_uri=${process.env.NAVER_CALLBACK_URL}&state=${process.env.NAVER_STATE}`;
  const KAKAO_URI = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.KAKAO_CLIENT_ID}&redirect_uri=${process.env.KAKAO_CALLBACK_URL}`;
  const GOOGLE_URI = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&scope=email profile &client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${process.env.GOOGLE_CALLBACK_URL}`;
  const commonContext = useCommon();
  const [loginHistory, setLoginHistory] = useState<any>(null);
  useEffect(() => {
    const loginInfoStr = getCookie(UWHOO_LOGIN);
    if (loginInfoStr) {
      setLoginHistory(JSON.parse(loginInfoStr)?.recentSite || null);
    }
  }, []);

  return (
    <div css={styled.wrapper}>
      <div css={styled.btnWrapper}>
        <HWButton
          className={"login-btn"}
          variant={"lower"}
          customCss={styled.googleBtn}
          onClick={() => (window.location.href = GOOGLE_URI)}
        >
          <IconGoogle width={"30px"} height={"30px"} />
          <HWTypography variant={"bodyXL"}>구글로 계속하기</HWTypography>
        </HWButton>
        {loginHistory === null && (
          <SpeechBubble customCss={styled.bubble}>3초만에 시작하기</SpeechBubble>
        )}
        {loginHistory === GOOGLE && (
          <SpeechBubble customCss={styled.bubble}>최근 로그인</SpeechBubble>
        )}
      </div>
      <div css={styled.btnWrapper}>
        <HWButton
          className={"login-btn"}
          variant={"lower"}
          css={styled.naverBtn}
          onClick={() => (window.location.href = NAVER_URI)}
        >
          <IconNaver width={"23px"} height={"23px"} />
          <HWTypography variant={"bodyXL"}>네이버로 계속하기</HWTypography>
        </HWButton>
        {loginHistory === NAVER && (
          <SpeechBubble customCss={styled.bubble}>최근 로그인</SpeechBubble>
        )}{" "}
      </div>
      <div css={styled.btnWrapper}>
        <HWButton
          className={"login-btn"}
          variant={"lower"}
          css={styled.kakaoBtn}
          onClick={() => (window.location.href = KAKAO_URI)}
        >
          <IconKakao width={"23px"} height={"23px"} />
          <HWTypography variant={"bodyXL"}>카카오로 계속하기</HWTypography>
        </HWButton>
        {loginHistory === KAKAO && (
          <SpeechBubble customCss={styled.bubble}>최근 로그인</SpeechBubble>
        )}
      </div>
    </div>
  );
};

export default Login;
