import styled from "./style";
import Color from "@src/common/styles/Color";
import { SerializedStyles } from "@emotion/react";
import { IconThumbUp } from "@res/index";

interface ReviewCardProps {
  width?: string;
  height?: string;
  radius?: string;
  backgroundColor?: string;
  customCss?: SerializedStyles;
  children?: React.ReactNode;
  best?: boolean;
  footer?: boolean;
  date?: string;
  line?: number;
}

const ReviewCard = ({
  width = "420px",
  height = "140px",
  radius = "10px",
  backgroundColor = Color.dark.elevation16,
  best = false,
  footer = false,
  date,
  line = 4,
  customCss,
  children,
}: ReviewCardProps) => {
  return (
    <div css={[styled.wrapper(width, height, radius, backgroundColor), customCss]}>
      <div css={styled.topWrapper}>
        <div>
          {best && (
            <div css={styled.bestDiv}>
              <IconThumbUp />
              Best Review
            </div>
          )}
        </div>
        <div css={styled.dateDiv}>{date}</div>
      </div>
      <div css={styled.contents(line)}>{children}</div>
      {footer && (
        <div css={styled.footer}>
          <IconThumbUp />
        </div>
      )}
    </div>
  );
};

export default ReviewCard;
