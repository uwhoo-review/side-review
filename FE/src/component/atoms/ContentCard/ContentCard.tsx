import styled from "./style";
import {IconNetflix, IconStar, IconWatcha} from "@res/index";
import {Avatar, AvatarGroup} from "@mui/material";
import {SerializedStyles} from "@emotion/react";

interface ContentCardProps {
  src: string;
  className?: string;
  rank?: number;
  onClick?: (e: React.MouseEvent) => void;
  customCss?: SerializedStyles;
}
const ContentCard = ({ src, className, rank, onClick, customCss }: ContentCardProps) => {
  return (
    <div className={className} css={[styled.wrapper, customCss]} onClick={onClick}>
      {rank && <div css={styled.rank}>{rank}</div>}
      <img css={styled.imgWrapper} alt="" src={src} />
      <div>
        <div className={"title"}>{"더 랍스터"}</div>
        <div css={styled.flexBetween}>
          <div className={"title-star"}>
            <IconStar />
            {"4.5"}
          </div>
          <AvatarGroup max={3} css={styled.avatarGroup}>
            <Avatar css={styled.avatar}>
              <IconNetflix />
            </Avatar>
            <Avatar css={styled.avatar}>
              <IconWatcha />
            </Avatar>
            <Avatar css={styled.avatar}>
              <IconWatcha />
            </Avatar>
            <Avatar css={styled.avatar}>
              <IconNetflix />
            </Avatar>
          </AvatarGroup>
        </div>
      </div>
    </div>
  );
};

export default ContentCard;
