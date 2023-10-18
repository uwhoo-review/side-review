import styled from "./style";
import { Link, NavLink, Outlet } from "react-router-dom";
import HWButton from "@src/component/atoms/HWButton/HWButton";
import { IconSearch } from "@res/index";
import HWIconButton from "@src/component/atoms/HWIconButton/HWIconButton";
import { useState } from "react";
import SearchBar from "@src/component/molecules/SearchBar/SearchBar";
import FilterGroups from "@src/component/molecules/FilterGroups/FilterGroups";

const GNB = (props: { children?: React.ReactNode }) => {
  const [open, setOpen] = useState<boolean>(false);
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
          <NavLink to={"/recently"}>
            <button>최신</button>
          </NavLink>
          <NavLink to={"/upcoming"}>
            <button>공개</button>
          </NavLink>
        </div>
        <div css={styled.rightGroups}>
          <HWIconButton onClick={() => setOpen(!open)}>
            <IconSearch />
          </HWIconButton>
          <HWButton variant={"lower"} size={"small"}>
            로그인
          </HWButton>
          <HWButton variant={"primary"} size={"small"}>
            회원가입
          </HWButton>
        </div>
      </div>
      <div className={`search-wrapper ${open && "open"}`} css={styled.searchWrapper}>
        <div css={styled.searchGrid}>
          <SearchBar />
          <FilterGroups />
        </div>
      </div>
      <Outlet />
    </>
  );
};
export default GNB;
