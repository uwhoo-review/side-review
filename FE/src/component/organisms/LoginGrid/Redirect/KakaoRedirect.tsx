import { useCommon } from "@src/providers/CommonProvider";
import { UWAxios } from "@src/common/axios/AxiosConfig";
import { GOOGLE, KAKAO, NAVER, UWHOO_LOGIN } from "@src/variables/LoginConstants";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { setCookie } from "@src/tools/commonTools";

const KakaoRedirect = () => {
  const code = new URL(window.location.href).searchParams.get("code") || ""; // 현재 URL에서 코드만 추출
  const state = new URL(window.location.href).searchParams.get("state") || ""; // 현재 URL에서 코드만 추출
  const navigate = useNavigate();
  const { onHandleUserInfo, onHandleLogin, onHandleLoginSession } = useCommon();

  // 컴포넌트가 마운트되면 로그인 로직 실행
  useEffect(() => {
    async function kakaoLogin() {
      const res = await UWAxios.login.getKakaoToken(code, process.env.KAKAO_CALLBACK_URL || ""); // 이 부분은 서버 API에 따라 바뀔 수 있으니 API 명세서를 잘 확인하세요.
      const userInfo = {
        ...res.userInfoDto,
        type: KAKAO,
      };

      onHandleLogin(true);
      onHandleUserInfo(userInfo);

      setCookie(
        UWHOO_LOGIN,
        JSON.stringify({
          recentSite: KAKAO,
        }),
        { maxAge: 3600 * 24 * 30 }
      );
      navigate("/", { replace: true });
    }
    kakaoLogin();
  }, []);

  return <></>;
};

export default KakaoRedirect;
