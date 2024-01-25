import styled from "./style";
import MenuAccordion from "@src/component/atoms/MenuAccordion/MenuAccordion";
import { useState } from "react";
import HWTypography from "@src/component/atoms/HWTypography/HWTypography";

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
    >
      <div css={styled.subWrapper}></div>
    </MenuAccordion>
  );
};

export default AccordionContents;
