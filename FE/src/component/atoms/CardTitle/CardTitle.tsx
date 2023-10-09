import styled from "./style";
import { Avatar, AvatarGroup } from "@mui/material";
import {IconNetflix, IconStar, IconWatcha} from "@res/index";

interface CardTitleProps {
  title: string;
  grade: string;
  ott?: string[];
}
const CardTitle = ({ title, grade, ott }: CardTitleProps) => {
  return (
    <div css={styled.wrapper}>
      <div className={"title"}>{title}</div>
      <div css={styled.flexBetween}>
        <div className={"title-star"}>
          <IconStar />
          {grade}
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
  );
};

export default CardTitle;
