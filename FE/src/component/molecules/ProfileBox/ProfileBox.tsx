import styled from "./style";
import HWButton from "@src/component/atoms/HWButton/HWButton";
import ProfileImage from "@src/component/atoms/ProfileImage/ProfileImage";
import { useRef, useState } from "react";
import { ClickAwayListener, Popper } from "@mui/material";
import HWIconButton from "@src/component/atoms/HWIconButton/HWIconButton";
import { IconApple, IconLogout, IconMyPage } from "@res/index";
import { useCommon } from "@src/providers/CommonProvider";

const ProfileBox = () => {
  const commonContext = useCommon();
  const [open, setOpen] = useState<boolean>(false);
  const anchorRef = useRef<HTMLButtonElement | null>(null);

  const handleClose = (e: any) => {
    if (anchorRef.current && anchorRef.current.contains(e.target as HTMLElement)) {
      return;
    }
    setOpen(false);
  };

  return (
    <div css={styled.wrapper}>
      <HWIconButton onClick={() => setOpen(!open)} ref={anchorRef}>
        <ProfileImage size={"38px"} src={""} />
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
              <ProfileImage />
              <div css={styled.topRight}>
                <div css={styled.typo1}>날으는스파게티</div>
                <div css={styled.typo2}>flyingpasta@naver.com</div>
              </div>
            </div>
            <div css={styled.bottom}>
              <HWButton customCss={styled.btn1}>
                <IconMyPage width={"18px"} height={"18px"} />
                마이페이지
              </HWButton>
              <HWButton
                variant={"lowest"}
                customCss={styled.btn2}
                onClick={() => {
                  commonContext.onHandleLogin(false);
                  commonContext.onResetUserInfo();
                  window.location.reload();
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
