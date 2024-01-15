import {useCommon} from "@src/providers/CommonProvider";
import {UWAxios} from "@src/common/axios/AxiosConfig";
import {NAVER} from "@src/variables/LoginConstants";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

const KakaoRedirect = () => {
  const code = new URL(window.location.href).searchParams.get("code") || ""; // 현재 URL에서 코드만 추출
  const state = new URL(window.location.href).searchParams.get("state") || ""; // 현재 URL에서 코드만 추출
  const navigate = useNavigate();
  const { onHandleUserInfo, onHandleLogin } = useCommon();

  console.log(window.location.href);

  // 컴포넌트가 마운트되면 로그인 로직 실행
  useEffect(() => {
    console.log("kakao login redirect");
    async function kakaoLogin() {
      const res = await UWAxios.login.getKakaoToken(code, process.env.KAKAO_CALLBACK_URL || ""); // 이 부분은 서버 API에 따라 바뀔 수 있으니 API 명세서를 잘 확인하세요.
      onHandleLogin(true);

      /*
      *         userId: res.id,
        useName: res?.family_name + res?.given_name,
        age: res?.age,
        gender: res?.gender,
        email: res?.email,
        site: GOOGLE,
        date: new Date(),
      };
      onHandleUserInfo(loginInfo);
      setCookie(UWHOO_LOGIN, JSON.stringify(loginInfo), { maxAge: 3600 * 24 * 30 });
      navigate("/", { replace: true }); // 로그인 완료시 메인으로 이동
      * */


    }
    kakaoLogin();
  }, []);

  return <></>;
}

export default KakaoRedirect;
