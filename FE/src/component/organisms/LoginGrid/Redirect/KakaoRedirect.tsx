import {useCommon} from "@src/providers/CommonProvider";
import {UWAxios} from "@src/common/axios/AxiosConfig";
import {NAVER} from "@src/variables/LoginConstants";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

const KakaoRedirect = () => {
  const code = new URL(window.location.href).searchParams.get("code") || ""; // 현재 URL에서 코드만 추출
  const state = new URL(window.location.href).searchParams.get("state") || ""; // 현재 URL에서 코드만 추출
  const navigate = useNavigate();
  const { onHandleUserInfo } = useCommon();

  console.log(window.location.href);

  // 컴포넌트가 마운트되면 로그인 로직 실행
  useEffect(() => {
    console.log("kakao login redirect");
    async function kakaoLogin() {
      const res = await UWAxios.login.getKakaoToken(code, process.env.KAKAO_CALLBACK_URL || ""); // 이 부분은 서버 API에 따라 바뀔 수 있으니 API 명세서를 잘 확인하세요.
      // console.log(res);

/*      const loginInfo = {
        userId: res.id,
        useName: res.userName,
        age: res.age,
        gender: res.gender,
        email: res.email,
        site: NAVER,
      };
      onHandleUserInfo(loginInfo);
      localStorage.setItem("login_info", JSON.stringify(loginInfo));
      navigate("/", { replace: true }); // 로그인 완료시 메인으로 이동*/
    }
    kakaoLogin();
  }, []);

  return <></>;
}

export default KakaoRedirect;
