import AccordionSubscribe from "@src/component/molecules/AccordionSubscribe/AccordionSubscribe";
import CenterWrapper from "@src/component/atoms/CenterWrapper/CenterWrapper";
import AccordionContents from "@src/component/molecules/AccordionContents/AccordionContents";
import AccordionPerson from "@src/component/molecules/AccordionPerson/AccordionPerson";
import AccordionGenre from "@src/component/molecules/AccordionGenre/AccordionGenre";
import AccordionReport from "@src/component/molecules/AccordionReport/AccordionReport";
import styled from "./style";
import { useRef, useState } from "react";

const MyPageContent = ({ data }: any) => {
  const [favorite, setFavorit] = useState(data.favorite);
  const [report, setReport] = useState(data.report);
  const [ott, setOtt] = useState(data.ott);
  return (
    <div className={"mypage-content-wrapper"} css={styled.wrapper}>
      <CenterWrapper>
        <AccordionSubscribe ott={ott} />
        <AccordionContents contentsList={favorite.contents} />
        <AccordionPerson personList={favorite.person} />
        <AccordionGenre genreList={favorite.genre} />
        <AccordionReport report={report} />
      </CenterWrapper>
    </div>
  );
};

export default MyPageContent;
