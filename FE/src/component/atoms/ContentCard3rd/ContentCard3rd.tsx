import styled from "./style";
import { IconRating, IconStar } from "@res/index";
import HWTypography from "@src/component/atoms/HWTypography/HWTypography";
import { isNullOrEmpty } from "@src/tools/commonTools";
import HWChip from "@src/component/atoms/HWChip/HWChip";

const ContentCard3rd = ({ type, src, title, subTitle, rating, season, onClick, rank, disabled=false }: any) => {
  return (
    <div css={[styled.wrapper, disabled && styled.disabled]} onClick={!disabled && onClick}>
      <div css={styled.box1}>
        <img src={src} css={styled.img} />
      </div>
      <div css={styled.box2}>
        <div css={styled.subBox2}>
          <div css={styled.typo1}>{title}</div>
          {season && season > 1 && (
            <HWChip label={`시즌 ${season}`} color={"season"} customCss={styled.chip} />
          )}
        </div>
        <div css={styled.typo2}>{subTitle}</div>
      </div>
      {!isNullOrEmpty(rating) && (
        <div css={styled.box3}>
          <IconRating />
          <div css={styled.typo3}>{rating}</div>
        </div>
      )}
    </div>
  );
};

export default ContentCard3rd;
