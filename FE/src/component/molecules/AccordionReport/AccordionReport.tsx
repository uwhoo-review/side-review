import styled from "./style";
import MenuAccordion from "@src/component/atoms/MenuAccordion/MenuAccordion";
import { useState } from "react";
import HWTypography from "@src/component/atoms/HWTypography/HWTypography";
import Divider from "@src/component/atoms/Divider/Divider";
import ContentCard from "@src/component/atoms/ContentCard/ContentCard";
import { DUMMY_CONTENT } from "@src/variables/CommonConstants";
import BarChartApex from "@src/component/atoms/BarChartApex/BarChartApex";
import DonutChartApex from "@src/component/atoms/DonutChartApex/DonutChartApex";

const AccordionReport = () => {
  const [open, setOpen] = useState(true);
  return (
    <MenuAccordion
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
      customCss={styled.accordion}
    >
      <div css={styled.subWrapper}>
        <div css={styled.contentBox}>
          <div css={[styled.box, styled.box1]}>
            <HWTypography variant={"headlineXS"} family={"Pretendard-SemiBold"} color={"#F9F9FD"}>
              ⭐ 별점 비율
            </HWTypography>
            <Divider direction={"h"} length={"100%"} />
            <div>
              <DonutChartApex />
            </div>
          </div>
          <div css={[styled.box, styled.box2]}>
            <HWTypography variant={"headlineXS"} family={"Pretendard-SemiBold"} color={"#F9F9FD"}>
              🌟 제일 많이 준 별점
            </HWTypography>
            <Divider direction={"h"} length={"100%"} />
            <div>
              <HWTypography variant={"headlineXL"} family={"Pretendard"} color={"#ffffff"}>
                4점
              </HWTypography>
            </div>
          </div>
          <div css={[styled.box, styled.box3]}>
            <HWTypography variant={"headlineXS"} family={"Pretendard-SemiBold"} color={"#F9F9FD"}>
              🎞️ 이만큼 평가했어요!
            </HWTypography>
            <Divider direction={"h"} length={"100%"} />
            <div>
              <HWTypography variant={"headlineXL"} family={"Pretendard"} color={"#ffffff"}>
                21개
              </HWTypography>
            </div>
          </div>
          <div css={[styled.box, styled.box4]}>
            <HWTypography variant={"headlineXS"} family={"Pretendard-SemiBold"} color={"#F9F9FD"}>
              🤠 내 무의식 Pick! 감독
            </HWTypography>
            <Divider direction={"h"} length={"100%"} />
            <div>
              <HWTypography variant={"headlineXL"} family={"Pretendard"} color={"#ffffff"}>
                감독핑
              </HWTypography>
            </div>
          </div>
          <div css={[styled.box, styled.box5]}>
            <HWTypography variant={"headlineXS"} family={"Pretendard-SemiBold"} color={"#F9F9FD"}>
              😎 알게 모르게 끌리는 배우
            </HWTypography>
            <Divider direction={"h"} length={"100%"} />
            <div>
              <HWTypography variant={"headlineXL"} family={"Pretendard"} color={"#ffffff"}>
                배우핑
              </HWTypography>
            </div>
          </div>
          <div css={[styled.box, styled.box6]}>
            <HWTypography variant={"headlineXS"} family={"Pretendard-SemiBold"} color={"#F9F9FD"}>
              📊 많이 본 장르
            </HWTypography>
            <Divider direction={"h"} length={"100%"} />
            <div>
              <BarChartApex />
            </div>
          </div>
          <div css={[styled.box, styled.box7]}>
            <HWTypography variant={"headlineXS"} family={"Pretendard-SemiBold"} color={"#F9F9FD"}>
              🫢 웨이드님이 독특한 평가를 남긴 작품
            </HWTypography>
            <Divider direction={"h"} length={"100%"} />
            <div css={styled.flex}>
              <ContentCard
                id={DUMMY_CONTENT.id}
                srcId={DUMMY_CONTENT.poster}
                contentName={DUMMY_CONTENT.name}
                platform={DUMMY_CONTENT.platform}
                date={DUMMY_CONTENT.date}
                active={true}
              />
              <ContentCard
                id={DUMMY_CONTENT.id}
                srcId={DUMMY_CONTENT.poster}
                contentName={DUMMY_CONTENT.name}
                platform={DUMMY_CONTENT.platform}
                date={DUMMY_CONTENT.date}
                active={true}
              />
              <ContentCard
                id={DUMMY_CONTENT.id}
                srcId={DUMMY_CONTENT.poster}
                contentName={DUMMY_CONTENT.name}
                platform={DUMMY_CONTENT.platform}
                date={DUMMY_CONTENT.date}
                active={true}
              />
            </div>
          </div>
        </div>
      </div>
    </MenuAccordion>
  );
};

export default AccordionReport;
