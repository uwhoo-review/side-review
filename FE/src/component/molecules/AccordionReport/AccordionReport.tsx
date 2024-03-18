import styled from "./style";
import MenuAccordion from "@src/component/atoms/MenuAccordion/MenuAccordion";
import { useEffect, useState } from "react";
import HWTypography from "@src/component/atoms/HWTypography/HWTypography";
import Divider from "@src/component/atoms/Divider/Divider";
import ContentCard from "@src/component/atoms/ContentCard/ContentCard";
import { DUMMY_CONTENT } from "@src/variables/CommonConstants";
import BarChartApex from "@src/component/atoms/BarChartApex/BarChartApex";
import DonutChartApex from "@src/component/atoms/DonutChartApex/DonutChartApex";
import { IconArrowRight } from "@res/index";
import ContentCardSec from "@src/component/atoms/ContentCardSec/ContentCardSec";
import { useNavigate } from "react-router-dom";

const AccordionReport = ({ user, report }: any) => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  return (
    <MenuAccordion
      className={"accordion-report-wrapper"}
      title={
        <div css={styled.title}>
          <HWTypography variant={"headlineS"} family={"Pretendard-SemiBold"} color={"#ffffff"}>
            유후 리포트
          </HWTypography>
          <HWTypography variant={"headlineXXS"} family={"Pretendard"} color={"#D9DAE5"}>
            <span css={styled.typo1}>{user.nickname}</span>
            님이 평균 별점은 {report.avgRating} 이네요!
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
              {report.ratings.length === 0 ? (
                <div css={styled.emptyWrapper}>
                  <HWTypography variant={"bodyL"} family={"Pretendard-SemiBold"} color={"#C7C8D3"}>
                    남겨진 평가가 없습니다.
                  </HWTypography>
                  <HWTypography variant={"bodyS"} family={"Pretendard-Regular"} color={"#84838D"}>
                    작품에 별점을 남겨보세요!
                  </HWTypography>
                </div>
              ) : (
                <DonutChartApex ratings={report.ratings} />
              )}
            </div>
          </div>
          <div css={[styled.box, styled.box2]}>
            <HWTypography variant={"headlineXS"} family={"Pretendard-SemiBold"} color={"#F9F9FD"}>
              🌟 제일 많이 준 별점
            </HWTypography>
            <Divider direction={"h"} length={"100%"} />
            <div>
              <HWTypography variant={"headlineXL"} family={"Pretendard"} color={"#ffffff"}>
                {report.maxRating}점
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
                {report.ratingCount}개
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
                {report.director?.name || "-"}
              </HWTypography>
            </div>
            <div
              css={styled.moreBtn(report.director.name === "")}
              onClick={() => {
                report.director.name !== "" && navigate(`/person/${report.director?.id}`);
              }}
            >
              <HWTypography variant={"bodyL"} family={"Pretendard-SemiBold"} color={"#B6B2EA"}>
                이 감독의 작품 더보기
              </HWTypography>
              <IconArrowRight />
            </div>
          </div>
          <div css={[styled.box, styled.box5]}>
            <HWTypography variant={"headlineXS"} family={"Pretendard-SemiBold"} color={"#F9F9FD"}>
              😎 알게 모르게 끌리는 배우
            </HWTypography>
            <Divider direction={"h"} length={"100%"} />
            <div>
              <HWTypography variant={"headlineXL"} family={"Pretendard"} color={"#ffffff"}>
                {report?.actor?.name || "-"}
              </HWTypography>
            </div>
            <div
              css={styled.moreBtn(report.actor.name === "")}
              onClick={() => {
                report.actor.name !== "" && navigate(`/person/${report.actor?.id}`);
              }}
            >
              <HWTypography variant={"bodyL"} family={"Pretendard-SemiBold"} color={"#B6B2EA"}>
                이 배우의 작품 더보기
              </HWTypography>
              <IconArrowRight />
            </div>
          </div>
          <div css={[styled.box, styled.box6]}>
            <HWTypography variant={"headlineXS"} family={"Pretendard-SemiBold"} color={"#F9F9FD"}>
              📊 많이 본 장르
            </HWTypography>
            <Divider direction={"h"} length={"100%"} />
            <div>
              {report.genreFrequency.length === 0 ? (
                <div css={styled.emptyWrapper}>
                  <HWTypography variant={"bodyL"} family={"Pretendard-SemiBold"} color={"#C7C8D3"}>
                    남겨진 평가가 없습니다.
                  </HWTypography>
                  <HWTypography variant={"bodyS"} family={"Pretendard-Regular"} color={"#84838D"}>
                    별점으로 시청기록을 알려주세요!
                  </HWTypography>
                </div>
              ) : (
                <BarChartApex genreFrequency={report.genreFrequency} />
              )}
            </div>
          </div>
          <div css={[styled.box, styled.box7]}>
            <span>
              <HWTypography variant={"headlineXS"} family={"Pretendard-SemiBold"} color={"#6D6ADA"}>
                😎 웨이드
              </HWTypography>
              <HWTypography variant={"headlineXS"} family={"Pretendard-SemiBold"} color={"#F9F9FD"}>
                님이 독특한 평가를 남긴 작품
              </HWTypography>
            </span>
            <Divider direction={"h"} length={"100%"} />
            {report.unique.length === 0 ? (
              <div css={styled.emptyWrapper}>
                <HWTypography variant={"bodyL"} family={"Pretendard-SemiBold"} color={"#C7C8D3"}>
                  남겨진 평가가 없습니다.
                </HWTypography>
                <HWTypography variant={"bodyS"} family={"Pretendard-Regular"} color={"#84838D"}>
                  작품에 별점을 남겨보세요!
                </HWTypography>
              </div>
            ) : (
              <div css={styled.flex}>
                {report.unique.map((v: any) => (
                  <ContentCardSec
                    key={v.id}
                    id={v.id}
                    srcId={v.poster}
                    contentName={v.name}
                    platform={v.platform}
                    date={v.date}
                    rating={v.rating}
                    userRating={v.userRating}
                    active={false}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </MenuAccordion>
  );
};

export default AccordionReport;
