import styled from "./style";
import { IconNetflix, IconStar, IconTving, IconWatcha } from "@res/index";
import { Avatar, AvatarGroup } from "@mui/material";
import { SerializedStyles } from "@emotion/react";
import DefaultImage from "@src/component/atoms/DefaultImage/DefaultImage";
import HWTypography from "@src/component/atoms/HWTypography/HWTypography";
import Color from "@src/common/styles/Color";

interface ContentCardProps {
  src: string;
  className?: string;
  rank?: number;
  onClick?: (e: React.MouseEvent) => void;
  inActive?: boolean;
  customCss?: SerializedStyles;
}
const ContentCard = ({
  src,
  className,
  rank,
  onClick,
  customCss,
  inActive = false,
}: ContentCardProps) => {
  return (
    <div className={className} css={[styled.wrapper(inActive), customCss]} onClick={onClick}>
      {rank && <div css={styled.rank}>{rank}</div>}
      <DefaultImage customCss={styled.imgWrapper(inActive)} alt="" src={src} />
      <div css={styled.description}>
        <div className={"title"}>{"더 랍스터"}</div>
        <div css={styled.flexBetween}>
          <div className={"title-star"} css={styled.flexBetween}>
            <IconStar css={styled.iconStar} />
            <HWTypography variant={"bodyXS"}>{"4.5"}</HWTypography>
            <HWTypography variant={"bodyXS"} color={Color.dark.grey400} css={styled.typo1}>
              2023
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
