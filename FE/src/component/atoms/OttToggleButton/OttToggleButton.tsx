import HWToggle from "@src/component/atoms/HWToggle/HWToggle";
import { useEffect, useState } from "react";
import styled from "./style";
import { useCommon } from "@src/providers/CommonProvider";
import HWTooltip from "@src/component/atoms/HWTooltip/HWTooltip";
import { UWAxios } from "@src/common/axios/AxiosConfig";
import { GOOGLE, UWHOO_LOGIN } from "@src/variables/LoginConstants";
import { useQueryClient } from "@tanstack/react-query";
import { CONTENTS_TABS } from "@src/variables/APIConstants";
import { QUERY_KEYS } from "@src/variables/QueryKeys";

const OttToggleButton = () => {
  const { isLogin, onHandleUserInfo, userInfo } = useCommon();

  const [isView, setIsView] = useState(false);
  const [status, setStatus] = useState("default");
  const queryClient = useQueryClient();

  useEffect(() => {
    setIsView(userInfo.toggle);
  }, []);

  return (
    <div css={styled.wrapper}>
      {isLogin && (
        <HWTooltip
          title={"먼저 마이페이지에서 내가 구독하는 OTT를 설정해 주세요! "}
          disableHoverListener={status !== "none"}
        >
          <HWToggle
            checked={isView}
            onChange={async (e) => {
              setIsView(!isView);
              await UWAxios.user.subscribeOtt(!isView);
              onHandleUserInfo({ ...userInfo, toggle: !isView });
              queryClient.resetQueries({
                queryKey: QUERY_KEYS.tabs,
              });
            }}
            disabled={status === "none"}
            label={"내 구독 OTT만 보기"}
          />
        </HWTooltip>
      )}
    </div>
  );
};

export default OttToggleButton;
