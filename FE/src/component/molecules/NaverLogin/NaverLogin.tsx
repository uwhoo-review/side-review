import { useEffect } from "react";
import { useCommon } from "@src/providers/CommonProvider";
import HWButton from "@src/component/atoms/HWButton/HWButton";
import { IconNaver } from "@res/index";
import HWTypography from "@src/component/atoms/HWTypography/HWTypography";
import styled from "./style";
const NaverLogin = ({ setGetToken, setUserInfo }: any) => {
  const common = useCommon();

  const { naver }: any = window;

  const initializeNaverLogin = async () => {
    const naverLogin = new naver.LoginWithNaverId({
      clientId: process.env.NAVER_CLIENT_ID,
      callbackUrl: process.env.NAVER_CALLBACK_URL,
      loginButton: { color: "green", type: 1, height: 60 },
      isPopup: true,
    });
    naverLogin.init();
    // naverLogin.logout();
    //
    // const btn = document.getElementById("naverIdLogin")?.firstChild as any;
    // btn.click();

    await naverLogin.getLoginStatus(async function (status: any) {
      console.log(status)
      if (status) {
        const userid = naverLogin.user.getEmail();
        const username = naverLogin.user.getName();
        console.log(naverLogin.user);
        common.onHandleUserInfo({
          token: window.location.href.includes("access_token"),
        });
        console.log(window.location.href.includes("access_token"));
        window.opener && (window.opener.location.href = "http://localhost:3000/login");
        window.close();
      }
    });
  };

  const getUser = async () => {
    /*    await naverLogin.getLoginStatus(async function (status: any) {
      if (status) {
        // 아래처럼 선택하여 추출이 가능하고,
        const userid = naverLogin.user.getEmail();
        const username = naverLogin.user.getName();
        console.log(naverLogin.user);
        common.onHandleUserInfo({
          token: window.location.href.includes("access_token"),
        });
        console.log(window.location.href.includes("access_token"));
        window.opener && (window.opener.location.href = "http://localhost:3000/login");
        window.close();
        // 정보 전체를 아래처럼 state 에 저장하여 추출하여 사용가능하다.
        // setUserInfo(naverLogin.user)
      }
    });*/
    // 요기!
  };

  // 네이버 소셜 로그인 (네아로) 는 URL 에 엑세스 어스코드가 붙어서 전달된다.
  // 우선 아래와 같이 어스코드를 추출 할 수 있으며,
  // 3부에 작성 될 Redirect 페이지를 통해 빠르고, 깨끗하게 처리가 가능하다.

  const userAccessToken = () => {
    window.location.href.includes("access_token") && getToken();
  };

  const getToken = () => {
    const token = window.location.href.split("=")[1].split("&")[0];
    // console.log, alert 창을 통해 어스코드가 잘 추출 되는지 확인하자!

    // 이후 로컬 스토리지 또는 state에 저장하여 사용하자!
    // localStorage.setItem("access_token", token)
    // setGetToken(token)
  };

  // 화면 첫 렌더링이후 바로 실행하기 위해 useEffect 를 사용하였다.
  useEffect(() => {
    initializeNaverLogin();
    // userAccessToken();
  }, []);

  return (
    <>
      <HWButton
        variant={"lower"}
        css={styled.wrapper}
        onClick={() => {
          // initializeNaverLogin();
        }}
      >
        <IconNaver width={"23px"} height={"21px"} />
        <HWTypography variant={"bodyXL"}>네이버로 계속하기</HWTypography>
      </HWButton>
      {/*<div id="naverIdLogin" style={{display:"none"}} />*/}
      <div id="naverIdLogin" />
    </>
  );
};
export default NaverLogin;
