import styled from "./style";
import { Link, NavLink, Outlet, useLocation, useParams } from "react-router-dom";
import HWButton from "@src/component/atoms/HWButton/HWButton";
import { IconSearch, IconUwhoo } from "@res/index";
import HWIconButton from "@src/component/atoms/HWIconButton/HWIconButton";
import { useEffect, useRef, useState } from "react";
import SearchBar from "@src/component/molecules/SearchBar/SearchBar";
import ScrollTopButton from "@src/component/atoms/ScrollTopButton/ScrollTopButton";
import CenterWrapper from "@src/component/atoms/CenterWrapper/CenterWrapper";
import { useCommon } from "@src/providers/CommonProvider";
import { Popover } from "@mui/material";

const GNB = (props: { children?: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const commonContext = useCommon();

  const searchEl = useRef<any>(null);
  const iconEl = useRef<any>(null);

  const { pathname } = useLocation();
  const [scrollTop, setScrollTop] = useState<boolean>(true);

  /*  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (e.target) {
        const target = e.target;
        console.log(target, searchEl.current);
        if (
          commonContext.isFilterOpen &&
          !searchEl.current?.contains(target) &&
          !iconEl.current?.contains(target)
        )
          commonContext.onHandleFilterOpen(false);
      }
    };

    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [commonContext.isFilterOpen]);*/

  useEffect(() => {
    // const scrollDiv = document.querySelector("#root");
    const handleShowButton = () => {
      (window.scrollY || 0) === 0 ? setScrollTop(true) : setScrollTop(false);
    };

    window.addEventListener("scroll", handleShowButton);
    return () => {
      window.removeEventListener("scroll", handleShowButton);
    };
  }, []);


  return (
    <>
      <header
        css={styled.wrapper(
          scrollTop && !commonContext.isFilterOpen && pathname === "/detail"
            ? "transparent"
            : "#232323",
          scrollTop
        )}
      >
        <div css={styled.subWrapper}>
          <div css={styled.leftGroups}>
            <div>
              <IconUwhoo css={styled.logo} />
            </div>
          </div>
          <div css={styled.centerGroups}>
            <NavLink to={"/home"} className={({ isActive }) => (isActive ? "active" : "")}>
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
              onClick={() => {
                commonContext.onHandleFilterOpen(!commonContext.isFilterOpen);
              }}
              css={styled.iconSearch(commonContext.isFilterOpen)}
              ref={iconEl}
            >
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
      </header>
      <Popover
        open={commonContext.isFilterOpen}
        onClose={() => commonContext.onHandleFilterOpen(false)}
        css={styled.popover}
      >
        <div
          className={`search-wrapper ${commonContext.isFilterOpen && "open"}`}
          css={styled.searchWrapper}
        >
          <CenterWrapper>
            <div css={styled.searchGrid}>
              <SearchBar />
            </div>
          </CenterWrapper>
        </div>
      </Popover>

      <ScrollTopButton target={window} />
      {/*<Outlet />*/}
    </>
  );
};
export default GNB;
