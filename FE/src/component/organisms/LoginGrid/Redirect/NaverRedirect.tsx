import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { axiosBaseInstance } from "@src/common/axios/AxiosInstance";
import { UWAxios } from "@src/common/axios/AxiosConfig";
import { useCommon } from "@src/providers/CommonProvider";
import { NAVER } from "@src/variables/LoginConstants";

const NaverRedirect = () => {
  const code = new URL(window.location.href).searchParams.get("code") || ""; // 현재 URL에서 코드만 추출
  const state = new URL(window.location.href).searchParams.get("state") || ""; // 현재 URL에서 코드만 추출
  const navigate = useNavigate();
  const { onHandleUserInfo } = useCommon();

  // 컴포넌트가 마운트되면 로그인 로직 실행
  useEffect(() => {
    console.log("naver login redirect");
    async function naverLogin() {
      const res = await UWAxios.login.getNaverToken(code, state); // 이 부분은 서버 API에 따라 바뀔 수 있으니 API 명세서를 잘 확인하세요.
      console.log(res);

      const loginInfo = {
        userId: res.id,
        useName: res.userName,
        age: res.age,
        gender: res.gender,
        email: res.email,
        site: NAVER,
      };
      onHandleUserInfo(loginInfo);
      localStorage.setItem("login_info", JSON.stringify(loginInfo));
      navigate("/", { replace: true }); // 로그인 완료시 메인으로 이동
    }
    naverLogin();
  }, []);

  return <></>;
};

export default NaverRedirect;
