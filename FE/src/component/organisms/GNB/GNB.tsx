import styled from "./style";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import HWButton from "@src/component/atoms/HWButton/HWButton";
import { IconAlarm, IconSearch, IconUwhoo } from "@res/index";
import HWIconButton from "@src/component/atoms/HWIconButton/HWIconButton";
import { useEffect, useRef, useState } from "react";
import SearchBar from "@src/component/molecules/SearchBar/SearchBar";
import CenterWrapper from "@src/component/atoms/CenterWrapper/CenterWrapper";
import { useCommon } from "@src/providers/CommonProvider";
import { Box, ClickAwayListener } from "@mui/material";
import ProfileBox from "@src/component/molecules/ProfileBox/ProfileBox";

const GNB = (props: { children?: React.ReactNode }) => {
  const commonContext = useCommon();
  const navigate = useNavigate();
  const iconEl = useRef<any>(null);

  const { pathname } = useLocation();
  const path = pathname.split("/")[1];
  const [scrollTop, setScrollTop] = useState<boolean>(true);
  const [open, setOpen] = useState(commonContext.isFilterOpen);
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
          scrollTop && !commonContext.isFilterOpen && (path === "detail" || path === "login")
            ? "transparent"
            : "#232323",
          scrollTop
        )}
      >
        <div css={styled.subWrapper}>
          <div css={styled.leftGroups}>
            <div>
              <IconUwhoo css={styled.logo} onClick={() => navigate("/")} />
            </div>
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
            <ClickAwayListener
              onClickAway={(e: any) => {
                if (e?.target.classList.contains("chip-label")) return;
                commonContext.onHandleFilterOpen(false);
              }}
            >
              <Box>
                <HWIconButton
                  onClick={() => {
                    commonContext.onHandleFilterOpen(!commonContext.isFilterOpen);
                  }}
                  customCss={styled.iconSearch(commonContext.isFilterOpen)}
                  ref={iconEl}
                >
                  <IconSearch width={"20px"} height={"20px"} />
                </HWIconButton>
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
              </Box>
            </ClickAwayListener>
            {commonContext.isLogin ? (
              <>
                <HWIconButton customCss={styled.iconAlarm}>
                  <IconAlarm width={"20px"} height={"20px"} />
                </HWIconButton>
                <ProfileBox />
              </>
            ) : (
              <HWButton
                variant={"primary"}
                size={"small"}
                onClick={() => {
                  navigate("login");
                }}
              >
                로그인
              </HWButton>
            )}
          </div>
        </div>
      </header>

      {/*      <Popover
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
      </Popover>*/}
      {/*<Outlet />*/}
    </>
  );
};
export default GNB;
