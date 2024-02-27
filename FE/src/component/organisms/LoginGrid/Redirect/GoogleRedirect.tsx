import { useCommon } from "@src/providers/CommonProvider";
import { UWAxios } from "@src/common/axios/AxiosConfig";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GOOGLE, NAVER, UWHOO_LOGIN } from "@src/variables/LoginConstants";
import { setCookie } from "@src/tools/commonTools";

const GoogleRedirect = () => {
  const code = new URL(window.location.href).searchParams.get("code") || ""; // 현재 URL에서 코드만 추출
  const state = new URL(window.location.href).searchParams.get("state") || ""; // 현재 URL에서 코드만 추출
  const navigate = useNavigate();
  const { onHandleUserInfo, onHandleLogin, onHandleLoginSession } = useCommon();

  // 컴포넌트가 마운트되면 로그인 로직 실행
  useEffect(() => {
    async function googleLogin() {
      const res = await UWAxios.login.getGoogleToken(code, process.env.GOOGLE_CALLBACK_URL || ""); // 이 부분은 서버 API에 따라 바뀔 수 있으니 API 명세서를 잘 확인하세요.

      const userInfo = {
        ...res.userInfoDto,
        type: GOOGLE,
      };

      onHandleLogin(true);
      onHandleUserInfo(userInfo);

      setCookie(
        UWHOO_LOGIN,
        JSON.stringify({
          recentSite: GOOGLE,
        }),
        { maxAge: 3600 * 24 * 30 }
      );
      navigate("/", { replace: true });

      // 로그인 완료시 메인으로 이동
    }

    googleLogin();
  }, []);
  return <></>;
};

export default GoogleRedirect;
