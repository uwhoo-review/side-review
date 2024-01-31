import styled from "./style";
import {IconRating, IconStar} from "@res/index";
import HWTypography from "@src/component/atoms/HWTypography/HWTypography";

const ContentCard3rd = ({ src }: any) => {
  return (
    <div css={styled.wrapper}>
      <div css={styled.box1}>
        <img src={src} css={styled.img} />
      </div>
      <div css={styled.box2}>
        <div css={styled.typo1}>방덕이의 봄1( Spring of Bl )</div>
        <div css={styled.typo2}>2023 ∙ 노고은 ∙ 미국 ∙ 액션 ∙ 코미디</div>
      </div>
      <div css={styled.box3}>
        <IconRating />
        <div css={styled.typo3}>5.0</div>
      </div>
    </div>
  );
};

export default ContentCard3rd;
