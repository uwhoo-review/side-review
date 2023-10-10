import styled from "./style";
import card1 from "@res/card/card1.png";
import {IconNetflix, IconStar, IconWatcha} from "@res/index";
import {Avatar, AvatarGroup} from "@mui/material";

interface ImageCardProps {
  className?: string;
  rank?: number;
}
const ImageCard = ({ className, rank }: ImageCardProps) => {
  return (
    <div className={className} css={styled.wrapper}>
      {rank && <div css={styled.rank}>{rank}</div>}
      <img css={styled.imgWrapper} alt="" src={card1} />
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

export default ImageCard;
