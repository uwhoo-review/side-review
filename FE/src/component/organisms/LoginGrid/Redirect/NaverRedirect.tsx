import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { axiosBaseInstance } from "@src/common/axios/AxiosInstance";
import { UWAxios } from "@src/common/axios/AxiosConfig";
import { useCommon } from "@src/providers/CommonProvider";
import { GOOGLE, NAVER, UWHOO_LOGIN } from "@src/variables/LoginConstants";
import { setCookie } from "@src/tools/commonTools";

const NaverRedirect = () => {
  const code = new URL(window.location.href).searchParams.get("code") || ""; // 현재 URL에서 코드만 추출
  const state = new URL(window.location.href).searchParams.get("state") || ""; // 현재 URL에서 코드만 추출
  const navigate = useNavigate();
  const { onHandleUserInfo, onHandleLogin, onHandleLoginSession } = useCommon();

  // 컴포넌트가 마운트되면 로그인 로직 실행
  useEffect(() => {
    async function naverLogin() {
      const res = await UWAxios.login.getNaverToken(code, state); // 이 부분은 서버 API에 따라 바뀔 수 있으니 API 명세서를 잘 확인하세요.
      const userInfo = {
        ...res.userInfoDto,
        type: NAVER,
      };

      onHandleLogin(true);
      onHandleUserInfo(userInfo);

      setCookie(
        UWHOO_LOGIN,
        JSON.stringify({
          recentSite: NAVER,
        }),
        { maxAge: 3600 * 24 * 30 }
      );
      navigate("/", { replace: true });
      // 로그인 완료시 메인으로 이동
    }
    naverLogin();
  }, []);

  return <></>;
};

export default NaverRedirect;
