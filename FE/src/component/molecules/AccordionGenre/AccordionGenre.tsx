import styled from "./style";
import MenuAccordion from "@src/component/atoms/MenuAccordion/MenuAccordion";
import { useState } from "react";
import HWTypography from "@src/component/atoms/HWTypography/HWTypography";

const AccordionGenre = () => {
  const [open, setOpen] = useState(false);
  return (
    <MenuAccordion
      title={
        <div css={styled.title}>
          <HWTypography variant={"headlineS"} family={"Pretendard-SemiBold"} color={"#ffffff"}>
            좋아하는 장르
          </HWTypography>
          <HWTypography variant={"headlineXXS"} family={"Pretendard"} color={"#D9DAE5"}>
            <>
              <span css={styled.typo1}>웨이드</span>
              님이 좋아하는 장르는 어떤 것인가요? 맞춤 추천을 더 잘 제공할 수 있어요!{" "}
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

export default AccordionGenre;
