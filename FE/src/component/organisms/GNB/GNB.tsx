import styled from "./style";
import { Link, NavLink, Outlet, useLocation, useParams } from "react-router-dom";
import HWButton from "@src/component/atoms/HWButton/HWButton";
import { IconSearch } from "@res/index";
import HWIconButton from "@src/component/atoms/HWIconButton/HWIconButton";
import { useEffect, useState } from "react";
import SearchBar from "@src/component/molecules/SearchBar/SearchBar";
import FilterGroups from "@src/component/molecules/FilterGroups/FilterGroups";
import ScrollTopButton from "@src/component/atoms/ScrollTopButton/ScrollTopButton";

const GNB = (props: { children?: React.ReactNode }) => {
  const [open, setOpen] = useState<boolean>(false);
  const { pathname } = useLocation();
  const [scrollTop, setScrollTop] = useState<boolean>(true);

  useEffect(() => {
    const scrollDiv = document.querySelector(".scroll-area");
    const handleShowButton = () => {
      (scrollDiv?.scrollTop || 0) === 0 && pathname === "/detail"
        ? setScrollTop(true)
        : setScrollTop(false);
    };
    scrollDiv?.addEventListener("scroll", handleShowButton);
    return () => {
      scrollDiv?.removeEventListener("scroll", handleShowButton);
    };
  }, [pathname]);

  return (
    <>
      <div css={styled.wrapper(scrollTop ? "transparent" : "#121212")}>
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
          <HWIconButton onClick={() => setOpen(!open)} css={styled.iconSearch(open)}>
            <IconSearch  />
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
      <ScrollTopButton />
      {/*<Outlet />*/}
    </>
  );
};
export default GNB;
