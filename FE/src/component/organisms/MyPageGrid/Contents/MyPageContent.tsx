import AccordionSubscribe from "@src/component/molecules/AccordionSubscribe/AccordionSubscribe";
import CenterWrapper from "@src/component/atoms/CenterWrapper/CenterWrapper";
import AccordionContents from "@src/component/molecules/AccordionContents/AccordionContents";
import AccordionPerson from "@src/component/molecules/AccordionPerson/AccordionPerson";
import AccordionGenre from "@src/component/molecules/AccordionGenre/AccordionGenre";
import AccordionReport from "@src/component/molecules/AccordionReport/AccordionReport";
import styled from "./style";

const MyPageContent = () => {
  return (
    <div className={"mypage-content-wrapper"} css={styled.wrapper}>
      <CenterWrapper>
        <AccordionSubscribe />
        <AccordionContents />
        <AccordionPerson />
        <AccordionGenre />
        <AccordionReport />

      </CenterWrapper>
    </div>
  );
};

export default MyPageContent;
