import styled from "./style";
import MenuAccordion from "@src/component/atoms/MenuAccordion/MenuAccordion";
import {useState} from "react";
import HWTypography from "@src/component/atoms/HWTypography/HWTypography";

const AccordionReport = () => {
  const [open, setOpen] = useState(false);
  return     <MenuAccordion
      title={
        <div css={styled.title}>
          <HWTypography variant={"headlineS"} family={"Pretendard-SemiBold"} color={"#ffffff"}>
            유후 리포트
          </HWTypography>
          <HWTypography variant={"headlineXXS"} family={"Pretendard"} color={"#D9DAE5"}>
            <span css={styled.typo1}>웨이드</span>
            님이 평균 별점은 4.3 이네요!
          </HWTypography>
        </div>
      }
      isExpanded={open}
      switchExpanded={() => setOpen(!open)}
  >
    <div css={styled.subWrapper}></div>

  </MenuAccordion>;
};

export default AccordionReport;
