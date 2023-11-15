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
import { getCardURL } from "@src/tools/commonTools";

interface ContentCardProps {
  srcId: string;
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
  srcId,
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
  const navigate = useNavigate();

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
        <DefaultImage
          width="100%"
          height="100%"
          alt=""
          src={getCardURL({ type: "content", srcId: srcId })}
        />
      </div>
      <div css={styled.description}>
        <div className={"title"} css={styled.title}>
          {contentName}
          <IconLaunch
            className={"icon-launch"}
            onClick={(e) => {
              e.stopPropagation();
              navigate("/detail");
            }}
            css={styled.Launch}
          />
        </div>
        <div css={styled.flexBetween}>
          <div className={"title-star"} css={styled.flexBetween}>
            <div css={styled.rating}>
              <IconStar css={styled.iconStar} />
              <HWTypography variant={"bodyXS"}>{rating || 0}</HWTypography>
            </div>
            <HWTypography variant={"bodyXS"} color={Color.dark.grey400} css={styled.typo1}>
              {year}
            </HWTypography>
          </div>
          <HWAvatarGroup max={3} direction={"right"}>
            <HWAvatar>
              <IconWatcha />
            </HWAvatar>
            <HWAvatar>
              <IconNetflix />
            </HWAvatar>
          </HWAvatarGroup>
        </div>
      </div>
    </div>
  );
};

export default ContentCard;
