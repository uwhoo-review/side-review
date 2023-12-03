import styled from "./style";
import { IconLaunch, IconNetflix, IconStar, IconTving, IconWatcha } from "@res/index";
import { Avatar, AvatarGroup } from "@mui/material";
import { SerializedStyles } from "@emotion/react";
import DefaultImage from "@src/component/atoms/DefaultImage/DefaultImage";
import HWTypography from "@src/component/atoms/HWTypography/HWTypography";
import Color from "@src/common/styles/Color";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import HWAvatar from "@src/component/atoms/HWAvatar/HWAvatar";
import HWAvatarGroup from "@src/component/atoms/HWAvatarGroup/HWAvatarGroup";
import { useNavigate } from "react-router-dom";
import { getCardURL } from "@src/tools/commonTools";
import PlatformAvatar from "@src/component/molecules/PlatformAvatar/PlatformAvatar";

interface ContentCardProps {
  id: string;
  srcId: string;
  contentName: string;
  rating: number;
  platform: string[];
  age: number;
  year: string;
  active: boolean;
  launch?: boolean;
  rank?: number;
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
  customCss?: SerializedStyles;
}
const ContentCard = ({
  id,
  srcId,
  contentName,
  rating,
  platform,
  age,
  year,
  launch = true,
  className,
  rank,
  onClick,
  customCss,
  active,
  ...props
}: ContentCardProps) => {
  const navigate = useNavigate();
  const divRef = useRef<any>(null);
  const [isOverflow, setIsOverflow] = useState<boolean>(false);
  let classNames = [];
  classNames.push(
    "content-card-wrapper",
    active ? `active` : "in-active",
    className ? `${className}` : null
  );
  classNames = classNames.filter(Boolean);

  useEffect(() => {
    if (divRef.current) {
      if (divRef.current?.clientWidth < divRef.current?.scrollWidth) setIsOverflow(true);
    }
  }, []);

  return (
    <div
      className={classNames.join(" ")}
      css={[styled.wrapper(active), customCss]}
      onClick={onClick}
      {...props}
    >
      <div className={`card-box`} css={styled.imgWrapper(active)}>
        {rank && <div css={styled.rank}>{rank}</div>}
        <DefaultImage
          width="100%"
          height="100%"
          alt=""
          src={getCardURL({ type: "content", srcId: srcId })}
        />
      </div>
      <div css={styled.description}>
        <div
          className={"title"}
          css={styled.title}
          /*          onMouseEnter={(e: any) => {
            console.log(e.target?.clientWidth, e.target?.scrollWidth);
            console.log(divRef.current);
            if (divRef.current) {
              divRef.current.style = "animation: marquee 5s linear infinite;";
              divRef.current.style += "white-space: nowrap;";
              divRef.current.style += "text-overflow: unset;";
            }
          }}*/
        >
          <div className={"title-text"} css={styled.marquee} ref={divRef} data-overflow={isOverflow}>
            {contentName}
          </div>
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
          <PlatformAvatar list={platform} max={3} direction={"right"} />
        </div>
        {launch && (
          <IconLaunch
            className={"icon-launch"}
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/detail?id=${id}`);
            }}
            css={styled.Launch}
          />
        )}
      </div>
    </div>
  );
};

export default ContentCard;
