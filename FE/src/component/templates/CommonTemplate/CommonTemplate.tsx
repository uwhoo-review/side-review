import styled from "./style";
import GNB from "@src/component/organisms/GNB/GNB";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "@src/component/organisms/Footer/Footer";
import ScrollTopButton from "@src/component/atoms/ScrollTopButton/ScrollTopButton";
import MyPageGNB from "@src/component/organisms/GNB/MyPageGNB";
import {useEffect} from "react";

const CommonTemplate = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  })

  return (
    <div css={styled.wrapper}>
      {pathname === "/mypage" && <MyPageGNB />}
      {pathname !== "/mypage" && <GNB />}
      <Outlet />
      {pathname !== "/login" && <Footer />}
      {pathname !== "/login" && <ScrollTopButton target={window} />}
    </div>
  );
};

export default CommonTemplate;
