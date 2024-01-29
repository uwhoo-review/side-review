import styled from "./style";
import MenuAccordion from "@src/component/atoms/MenuAccordion/MenuAccordion";
import { useState } from "react";
import HWTypography from "@src/component/atoms/HWTypography/HWTypography";
import HWButton from "@src/component/atoms/HWButton/HWButton";
import CardList from "@src/component/molecules/CardList/CardList";
import { DUMMY_CONTENT } from "@src/variables/CommonConstants";
import CardSlider from "@src/component/molecules/CardSlider/CardSlider";
import ProfileImage from "@src/component/atoms/ProfileImage/ProfileImage";
import {IconApple, IconPlusBtn} from "@res/index";

const AccordionContents = () => {
  const [open, setOpen] = useState(false);
  return (
    <MenuAccordion
      title={
        <div css={styled.title}>
          <HWTypography variant={"headlineS"} family={"Pretendard-SemiBold"} color={"#ffffff"}>
            내 인생작
          </HWTypography>
          <HWTypography variant={"headlineXXS"} family={"Pretendard"} color={"#D9DAE5"}>
            <>
              <span css={styled.typo1}>웨이드</span>
              님의 인생작을 알려주세요! 또 다른 인생작을 추천하는 데 참고할게요.
            </>
          </HWTypography>
        </div>
      }
      isExpanded={open}
      switchExpanded={() => setOpen(!open)}
      customCss={styled.accordion}

    >
      <div css={styled.subWrapper}>
        <div css={styled.contentBox}>
          <div css={styled.leftBox}>
            <IconPlusBtn cursor={"pointer"} />
            <HWTypography variant={"bodyXL"} family={"Pretendard-SemiBold"} color={"#C7C8D3"}>
              인생작 추가
            </HWTypography>
          </div>
          <div css={styled.rightBox}>
            <CardSlider
              cardList={[
                DUMMY_CONTENT,
                DUMMY_CONTENT,
                DUMMY_CONTENT,
                DUMMY_CONTENT,
                DUMMY_CONTENT,
                DUMMY_CONTENT,
                DUMMY_CONTENT,
                DUMMY_CONTENT,
              ]}
            />
          </div>
        </div>
      </div>
    </MenuAccordion>
  );
};

export default AccordionContents;
