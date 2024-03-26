import styled from "./style";
import DefaultImage from "@src/component/atoms/DefaultImage/DefaultImage";
import HWTypography from "@src/component/atoms/HWTypography/HWTypography";
import Color from "@src/common/styles/Color";
import { getCardURL } from "@src/tools/commonTools";
import HWTooltip from "@src/component/atoms/HWTooltip/HWTooltip";

const PersonCardVertical = ({
  id,
  name,
  subName,
  srcId,
  width = "82px",
  height = "82px",
  customCss,
  ...props
}: any) => {
  return (
    <div className={"person-card-wrapper"} css={[styled.wrapper, customCss]} {...props}>
      <div css={styled.imageWrapper}>
        <DefaultImage
          width="100%"
          height="100%"
          alt=""
          src={getCardURL({ type: "content", srcId: srcId })}
        />
      </div>
      <div css={styled.textGroup}>
        <HWTooltip title={name}>
          <HWTypography variant={"bodyL"} family={"Pretendard-SemiBold"} customCss={styled.typo1}>
            {name}
          </HWTypography>
        </HWTooltip>
        <HWTypography variant={"bodyS"} color={Color.dark.grey700} customCss={styled.typo1}>
          {subName}
        </HWTypography>
      </div>
    </div>
  );
};

export default PersonCardVertical;
