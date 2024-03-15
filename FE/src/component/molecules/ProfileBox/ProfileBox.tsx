import styled from "./style";
import HWButton from "@src/component/atoms/HWButton/HWButton";
import ProfileImage from "@src/component/atoms/ProfileImage/ProfileImage";
import { useRef, useState } from "react";
import { ClickAwayListener, Popper } from "@mui/material";
import HWIconButton from "@src/component/atoms/HWIconButton/HWIconButton";
import { IconApple, IconLogout, IconMyPage } from "@res/index";
import { useCommon } from "@src/providers/CommonProvider";
import { setCookie } from "@src/tools/commonTools";
import { GOOGLE, UWHOO_LOGIN } from "@src/variables/LoginConstants";
import { useNavigate } from "react-router-dom";
import img1 from "@res/temp/img5.png";
import { UWAxios } from "@src/common/axios/AxiosConfig";

const ProfileBox = () => {
  const commonContext = useCommon();
  const [open, setOpen] = useState<boolean>(false);
  const anchorRef = useRef<HTMLButtonElement | null>(null);
  const navigate = useNavigate();
  const handleClose = (e: any) => {
    if (anchorRef.current && anchorRef.current.contains(e.target as HTMLElement)) {
      return;
    }
    setOpen(false);
  };

  return (
    <div css={styled.wrapper}>
      <HWIconButton onClick={() => setOpen(!open)} ref={anchorRef}>
        <ProfileImage size={"38px"} src={commonContext.userInfo.profile} />
      </HWIconButton>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        placement={"bottom-end"}
        disablePortal={true}
      >
        <ClickAwayListener onClickAway={handleClose}>
          <div css={styled.subWrapper}>
            <div css={styled.top}>
              <ProfileImage size={"60px"} src={commonContext.userInfo.profile} />
              <div css={styled.topRight}>
                <div css={styled.typo1}>{commonContext.userInfo.nickname}</div>
                <div css={styled.typo2}>{commonContext.userInfo.email}</div>
              </div>
            </div>
            <div css={styled.bottom}>
              <HWButton customCss={styled.btn1} onClick={() => navigate("mypage")}>
                <IconMyPage width={"18px"} height={"18px"} />
                마이페이지
              </HWButton>
              <HWButton
                variant={"secondary"}
                customCss={styled.btn2}
                onClick={async () => {
                  const userInfo = commonContext.userInfo;
                  const res = await UWAxios.login.logout(
                    userInfo.type,
                    userInfo.token,
                    "/login/logout"
                  );
                  localStorage.removeItem(UWHOO_LOGIN);
                  window.location.reload();
                  // if (res === "logout success") {
                  //   localStorage.removeItem(UWHOO_LOGIN);
                  //   window.location.reload();
                  // }
                }}
              >
                <IconLogout width={"18px"} height={"18px"} />
                로그아웃
              </HWButton>
            </div>
          </div>
        </ClickAwayListener>
      </Popper>
    </div>
  );
};

export default ProfileBox;
