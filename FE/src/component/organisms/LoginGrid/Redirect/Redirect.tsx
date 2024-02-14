import { useCommon } from "@src/providers/CommonProvider";
import { UWAxios } from "@src/common/axios/AxiosConfig";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GOOGLE, NAVER, UWHOO_LOGIN } from "@src/variables/LoginConstants";
import { setCookie } from "@src/tools/commonTools";

const Redirect = () => {
  const code = new URL(window.location.href).searchParams.get("code") || ""; // 현재 URL에서 코드만 추출
  const state = new URL(window.location.href).searchParams.get("state") || ""; // 현재 URL에서 코드만 추출
  const navigate = useNavigate();
  const { onHandleUserInfo, onHandleLogin } = useCommon();

  // 컴포넌트가 마운트되면 로그인 로직 실행
  useEffect(() => {
    async function loginCheck() {
      navigate(-1);
    }

    loginCheck();
  }, []);
  return <></>;
};

export default Redirect;
