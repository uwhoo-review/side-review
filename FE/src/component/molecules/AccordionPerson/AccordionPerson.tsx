import styled from "./style";
import MenuAccordion from "@src/component/atoms/MenuAccordion/MenuAccordion";
import { useState } from "react";
import HWTypography from "@src/component/atoms/HWTypography/HWTypography";

const AccordionPerson = () => {
  const [open, setOpen] = useState(false);
  return (
    <MenuAccordion
      title={
        <div css={styled.title}>
          <HWTypography variant={"headlineS"} family={"Pretendard-SemiBold"} color={"#ffffff"}>
            좋아하는 인물
          </HWTypography>
          <HWTypography variant={"headlineXXS"} family={"Pretendard"} color={"#D9DAE5"}>
            <span css={styled.typo1}>웨이드</span>
            님이 좋아하는 인물을 알려주세요! 좋아하는 사람의 작품 소식을 알려드릴게요.
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

export default AccordionPerson;
