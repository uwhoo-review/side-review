import styled from "./style";
import { IconLaunch, IconNetflix, IconStar, IconTving, IconWatcha } from "@res/index";
import { Avatar, AvatarGroup } from "@mui/material";
import { SerializedStyles } from "@emotion/react";
import DefaultImage from "@src/component/atoms/DefaultImage/DefaultImage";
import HWTypography from "@src/component/atoms/HWTypography/HWTypography";
import Color from "@src/common/styles/Color";
import { useEffect, useState } from "react";
import HWAvatar from "@src/component/atoms/HWAvatar/HWAvatar";
import HWAvatarGroup from "@src/component/atoms/HWAvatarGroup/HWAvatarGroup";
import { useNavigate } from "react-router-dom";

interface ContentCardProps {
  active?: boolean;
  className?: string;
  customCss?: SerializedStyles;
}
const ContentEmptyCard = ({ className, customCss, active = false, ...props }: ContentCardProps) => {
  let classNames = [];
  classNames.push(
    "content-card-wrapper",
    active ? `active` : "in-active",
    className ? `${className}` : null
  );
  classNames = classNames.filter(Boolean);

  return (
    <div className={classNames.join(" ")} css={[styled.wrapper(active), customCss]} {...props}>
      <div className={`card-box`} css={styled.imgWrapper(active)}></div>
      <div css={styled.description}>
        <div className={"title"} css={styled.title}></div>
        <div css={styled.flexBetween}></div>
      </div>
    </div>
  );
};

export default ContentEmptyCard;
