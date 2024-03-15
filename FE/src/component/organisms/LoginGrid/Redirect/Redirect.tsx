import { useCommon } from "@src/providers/CommonProvider";
import { UWAxios } from "@src/common/axios/AxiosConfig";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GOOGLE, NAVER, UWHOO_LOGIN } from "@src/variables/LoginConstants";
import { setCookie } from "@src/tools/commonTools";

const Redirect = () => {
  const navigate = useNavigate();
  const { onHandleUserInfo, onHandleLogin } = useCommon();

  // 컴포넌트가 마운트되면 로그인 로직 실행
  useEffect(() => {
    async function loginCheck() {
      localStorage.removeItem(UWHOO_LOGIN);
      navigate(-1);
    }

    loginCheck();
  }, []);
  return <></>;
};

export default Redirect;
