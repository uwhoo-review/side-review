import HWToggle from "@src/component/atoms/HWToggle/HWToggle";
import { useState } from "react";
import styled from "./style";
import { useCommon } from "@src/providers/CommonProvider";
import HWTooltip from "@src/component/atoms/HWTooltip/HWTooltip";

const OttToggleButton = () => {
  const { isLogin } = useCommon();

  const [isView, setIsView] = useState(false);
  const [status, setStatus] = useState("default");
  return (
    <div css={styled.wrapper}>
      {isLogin && (
        <HWTooltip title={"먼저 마이페이지에서 내가 구독하는 OTT를 설정해 주세요! "} disableHoverListener={status !== "none"}>
          <HWToggle
            checked={isView}
            onChange={() => setIsView(!isView)}
            disabled={status === "none"}
            label={"내 구독 OTT만 보기"}
          />
        </HWTooltip>
      )}
    </div>
  );
};

export default OttToggleButton;
