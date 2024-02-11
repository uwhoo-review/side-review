import styled from "./style";
import { IconRating, IconStar } from "@res/index";
import HWTypography from "@src/component/atoms/HWTypography/HWTypography";

const ContentCard3rd = ({ type, src, title, subTitle, rating }: any) => {
  return (
    <div css={styled.wrapper}>
      <div css={styled.box1}>
        <img src={src} css={styled.img} />
      </div>
      <div css={styled.box2}>
        <div css={styled.typo1}>{title}</div>
        <div css={styled.typo2}>{subTitle}</div>
      </div>
      {rating && (
        <div css={styled.box3}>
          <IconRating />
          <div css={styled.typo3}>{rating || "-"}</div>
        </div>
      )}
    </div>
  );
};

export default ContentCard3rd;
