import styled from "./style";
import { Link, NavLink, Outlet, useLocation, useParams } from "react-router-dom";
import HWButton from "@src/component/atoms/HWButton/HWButton";
import { IconSearch } from "@res/index";
import HWIconButton from "@src/component/atoms/HWIconButton/HWIconButton";
import { useEffect, useRef, useState } from "react";
import SearchBar from "@src/component/molecules/SearchBar/SearchBar";
import FilterGroups from "@src/component/molecules/FilterGroups/FilterGroups";
import ScrollTopButton from "@src/component/atoms/ScrollTopButton/ScrollTopButton";
import CenterWrapper from "@src/component/atoms/CenterWrapper/CenterWrapper";

const GNB = (props: { children?: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const searchEl = useRef<any>(null);
  const iconEl = useRef<any>(null);

  const { pathname } = useLocation();
  const [scrollTop, setScrollTop] = useState<boolean>(true);

  /*  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (e.target) {
        const target = e.target;
        if (isOpen && !searchEl.current?.contains(target) && !iconEl.current?.contains(target))
          setIsOpen(false);
      }
    };

    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);*/

  useEffect(() => {
    const scrollDiv = document.querySelector("#root");

    const handleShowButton = () => {
      (scrollDiv?.scrollTop || 0) === 0 ? setScrollTop(true) : setScrollTop(false);
    };

    scrollDiv?.addEventListener("scroll", handleShowButton);
    return () => {
      scrollDiv?.removeEventListener("scroll", handleShowButton);
    };
  }, []);

  return (
    <>
      <header
        css={styled.wrapper(
          scrollTop && !isOpen && pathname === "/detail" ? "transparent" : "#232323",
            scrollTop
        )}
      >
        <div css={styled.subWrapper}>
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
            <HWIconButton
              onClick={() => setIsOpen(!isOpen)}
              css={styled.iconSearch(isOpen)}
              ref={iconEl}
            >
              <IconSearch />
            </HWIconButton>
            {/*            <HWButton variant={"lower"} size={"small"}>
              로그인
            </HWButton>
            <HWButton variant={"primary"} size={"small"}>
              회원가입
            </HWButton>*/}
          </div>
        </div>
      </header>
      <div
        className={`search-wrapper ${isOpen && "open"}`}
        css={styled.searchWrapper}
        ref={searchEl}
      >
        <CenterWrapper customCss={styled.searchGrid}>
          <div>
            <SearchBar />
            <FilterGroups />
          </div>
        </CenterWrapper>
      </div>
      <ScrollTopButton />
      {/*<Outlet />*/}
    </>
  );
};
export default GNB;
