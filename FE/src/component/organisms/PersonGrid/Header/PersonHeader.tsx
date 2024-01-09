import styled from "./style";
import HWTypography from "@src/component/atoms/HWTypography/HWTypography";
import Color from "@src/common/styles/Color";
import HWButton from "@src/component/atoms/HWButton/HWButton";
import { IconInit, IconLink } from "@res/index";
import CenterWrapper from "@src/component/atoms/CenterWrapper/CenterWrapper";
import { useCommon } from "@src/providers/CommonProvider";
import PersonCard from "@src/component/atoms/PersonCard/PersonCard";
import DefaultImage from "@src/component/atoms/DefaultImage/DefaultImage";
import {getCardURL} from "@src/tools/commonTools";

const PersonHeader = ({ data }: any) => {
  const commonContext = useCommon();

  const handleCopyClipBoard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      commonContext.onAlert({
        is: true,
        children: <>링크가 클립보드에 복사되었습니다.</>,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={"search-header-wrapper"} css={styled.wrapper}>
      <CenterWrapper>
        <div css={styled.subWrapper}>
          <div css={styled.left}>
            <>
              <DefaultImage src={getCardURL({ type: "content", srcId: data.profilePath })} width={"140px"} height={"140px"} customCss={styled.personImage}/>
              <div css={styled.PersonTitle}>
                <HWTypography variant={"headlineS"} family={"Pretendard-Bold"} customCss={styled.typo1}>
                  {data.name}
                </HWTypography>
                <HWTypography variant={"bodyL"} family={"Pretendard"} color={Color.dark.grey500}>
                  {data.job.join(" ∙ ")}
                </HWTypography>
              </div>

            </>
          </div>
          <div css={styled.right}>
            <HWButton
              variant={"lower"}
              onClick={() => handleCopyClipBoard(`${window.location.href}`)}
            >
              <IconLink /> 링크 공유
            </HWButton>
          </div>
        </div>
      </CenterWrapper>
    </div>
  );
};

export default PersonHeader;
