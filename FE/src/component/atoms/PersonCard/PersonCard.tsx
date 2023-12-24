import styled from "./style";
import DefaultImage from "@src/component/atoms/DefaultImage/DefaultImage";
import HWTypography from "@src/component/atoms/HWTypography/HWTypography";
import Color from "@src/common/styles/Color";
import { getCardURL } from "@src/tools/commonTools";

const PersonCard = ({
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
        <HWTypography variant={"bodyL"} family={"Pretendard-SemiBold"}>
          {name}
        </HWTypography>
        <HWTypography variant={"bodyS"} color={Color.dark.grey700}>
          {subName}
        </HWTypography>
      </div>
    </div>
  );
};

export default PersonCard;
