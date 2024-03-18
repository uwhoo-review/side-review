import AccordionSubscribe from "@src/component/molecules/AccordionSubscribe/AccordionSubscribe";
import CenterWrapper from "@src/component/atoms/CenterWrapper/CenterWrapper";
import AccordionContents from "@src/component/molecules/AccordionContents/AccordionContents";
import AccordionPerson from "@src/component/molecules/AccordionPerson/AccordionPerson";
import AccordionGenre from "@src/component/molecules/AccordionGenre/AccordionGenre";
import AccordionReport from "@src/component/molecules/AccordionReport/AccordionReport";
import styled from "./style";
import { useEffect, useRef, useState } from "react";

const MyPageContent = ({ data }: any) => {
  const [favorite, setFavorite] = useState(data.favorite);
  const [report, setReport] = useState(data.report);
  const [ott, setOtt] = useState([]);
  const [user, setUser] = useState(data.user);

  useEffect(() => {
    setFavorite(data.favorite);
    setReport(data.report);
    setOtt(data.ott);
    setUser(data.user);
  }, [data]);

  return (
    <div className={"mypage-content-wrapper"} css={styled.wrapper}>
      <CenterWrapper>
        <AccordionSubscribe ott={ott} />
        <AccordionContents contentsList={favorite.contents} user={user} />
        <AccordionPerson personList={favorite.person} user={user} />
        <AccordionGenre genreList={favorite.genre} user={user} />
        <AccordionReport report={report} user={user} />
      </CenterWrapper>
    </div>
  );
};

export default MyPageContent;
