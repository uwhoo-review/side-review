import styled from "./style";
import { Link, NavLink, Outlet } from "react-router-dom";
import HWButton from "@src/component/atoms/HWButton/HWButton";
import {IconSearch} from "@res/index";

const GNB = (props: { children?: React.ReactNode }) => {
  return (
    <>
      <div css={styled.wrapper}>
        <div css={styled.leftGroups}>
          <div css={styled.logo}>SIDE REVIEW</div>
        </div>
        <div css={styled.centerGroups}>
          <NavLink to={"/"} className={({ isActive }) => (isActive ? "active" : "")}>
            <button>Home</button>
          </NavLink>
          <NavLink to={"/popular"}>
            <button>인기</button>
          </NavLink>
          <NavLink to={"/newer"}>
            <button>최신</button>
          </NavLink>
          <NavLink to={"/noopened"}>
            <button>공개</button>
          </NavLink>
        </div>
        <div css={styled.rightGroups}>
          <IconSearch />
          <HWButton variant={"lowest"} customCss={styled.loginBtn}>로그인</HWButton>
          <HWButton>회원가입</HWButton>
        </div>
      </div>
      <Outlet />

    </>
  );
};
export default GNB;
