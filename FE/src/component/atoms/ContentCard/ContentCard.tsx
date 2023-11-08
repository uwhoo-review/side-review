import styled from "./style";
import { IconNetflix, IconStar, IconTving, IconWatcha } from "@res/index";
import { Avatar, AvatarGroup } from "@mui/material";
import { SerializedStyles } from "@emotion/react";
import DefaultImage from "@src/component/atoms/DefaultImage/DefaultImage";
import HWTypography from "@src/component/atoms/HWTypography/HWTypography";
import Color from "@src/common/styles/Color";
import { useEffect, useState } from "react";

interface ContentCardProps {
  src: string;
  contentName: string;
  rating: number;
  platform: string[];
  age: number;
  year: string;
  rank?: number;
  onClick?: (e: React.MouseEvent) => void;
  active: boolean;
  className?: string;
  customCss?: SerializedStyles;
}
const ContentCard = ({
  src,
  contentName,
  rating,
  platform,
  age,
  year,
  className,
  rank,
  onClick,
  customCss,
  active,
  ...props
}: ContentCardProps) => {
  let classNames = [];
  classNames.push(
    "content-card-wrapper",
    active ? `active` : "in-active",
    className ? `${className}` : null
  );
  classNames = classNames.filter(Boolean);

  return (
    <div
      className={classNames.join(" ")}
      css={[styled.wrapper(active), customCss]}
      onClick={(e) => {
        onClick && onClick(e);
      }}
      {...props}
    >
      {rank && <div css={styled.rank}>{rank}</div>}
      <div className={`card-box`} css={styled.imgWrapper(active)}>
        <DefaultImage width="100%" height="100%" alt="" src={src} />
      </div>
      <div css={styled.description}>
        <div className={"title"}>{contentName}</div>
        <div css={styled.flexBetween}>
          <div className={"title-star"} css={styled.flexBetween}>
            <IconStar css={styled.iconStar} />
            <HWTypography variant={"bodyXS"}>{rating || 0}</HWTypography>
            <HWTypography variant={"bodyXS"} color={Color.dark.grey400} css={styled.typo1}>
              {year}
            </HWTypography>
          </div>
          <AvatarGroup max={4} css={styled.avatarGroup}>
            <Avatar css={styled.avatar}>
              <IconWatcha />
            </Avatar>
            <Avatar css={styled.avatar}>
              <IconNetflix />
            </Avatar>
            <Avatar css={styled.avatar}>
              <IconTving />
            </Avatar>
            <Avatar css={styled.avatar}>
              <IconTving />
            </Avatar>
            <Avatar css={styled.avatar}>
              <IconTving />
            </Avatar>
            <Avatar css={styled.avatar}>
              <IconTving />
            </Avatar>
          </AvatarGroup>
        </div>
      </div>
    </div>
  );
};

export default ContentCard;
