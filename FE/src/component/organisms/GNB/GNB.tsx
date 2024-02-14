import styled from "./style";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import HWButton from "@src/component/atoms/HWButton/HWButton";
import { IconAlarm, IconSearch, IconUwhoo } from "@res/index";
import HWIconButton from "@src/component/atoms/HWIconButton/HWIconButton";
import { useEffect, useRef, useState } from "react";
import SearchBar from "@src/component/molecules/SearchBar/SearchBar";
import CenterWrapper from "@src/component/atoms/CenterWrapper/CenterWrapper";
import { useCommon } from "@src/providers/CommonProvider";
import { Box, ClickAwayListener, Tab, Tabs } from "@mui/material";
import ProfileBox from "@src/component/molecules/ProfileBox/ProfileBox";

const GNB = (props: { children?: React.ReactNode }) => {
  const commonContext = useCommon();
  const navigate = useNavigate();
  const iconEl = useRef<any>(null);

  const { pathname } = useLocation();
  const path = pathname.split("/")[1];
  const [scrollTop, setScrollTop] = useState<boolean>(true);
  const [open, setOpen] = useState(commonContext.isFilterOpen);
  const [pathVal, setPathVal] = useState("");

  useEffect(() => {
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
            <Box sx={{ width: "100%" }}>
              <Tabs value={path} css={styled.tabs}>
                <Tab
                  label={"Home"}
                  value={""}
                  onClick={() => {
                    navigate("/");
                  }}
                />
                <Tab
                  label={"인기"}
                  value={"popular"}
                  onClick={() => {
                    navigate("/popular");
                  }}
                />
                <Tab
                  label={"최신"}
                  value={"recently"}
                  onClick={() => {
                    navigate("/recently");
                  }}
                />
                <Tab
                  label={"공개 예정"}
                  value={"upcoming"}
                  onClick={() => {
                    navigate("/upcoming");
                  }}
                />
              </Tabs>
            </Box>
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
    </>
  );
};
export default GNB;
