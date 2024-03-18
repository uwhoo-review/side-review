import styled from "./style";
import HWTypography from "@src/component/atoms/HWTypography/HWTypography";
import Color from "@src/common/styles/Color";
import HWChip from "@src/component/atoms/HWChip/HWChip";
import HWButton from "@src/component/atoms/HWButton/HWButton";
import { IconInit } from "@res/index";
import CenterWrapper from "@src/component/atoms/CenterWrapper/CenterWrapper";
import { useCommon } from "@src/providers/CommonProvider";
import { useSearchParams } from "react-router-dom";
import {
  FILTER_SORT_ID,
  FILTER_SORT_ID_NAME,
  GENRE_ID_NAME,
  GENRE_NAME,
  PLATFORM_ID_NAME,
  WATCH_RATING_ID_NAME,
} from "@src/variables/CommonConstants";
import HWTooltip from "@src/component/atoms/HWTooltip/HWTooltip";

const ResultHeader = ({ content }: any) => {
  const commonContext = useCommon();
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");
  const paramList = [...searchParams];

  return (
    <div className={"search-header-wrapper"} css={styled.wrapper}>
      <CenterWrapper>
        <div css={styled.subWrapper}>
          <div css={styled.left}>
            {search ? (
              <>
                <HWTypography variant={"headlineS"} family={"Pretendard-Bold"}>
                  `{search}`
                </HWTypography>
                <HWTypography
                  variant={"headlineS"}
                  family={"Pretendard"}
                  color={Color.dark.grey500}
                >
                  의 검색결과
                </HWTypography>
              </>
            ) : (
              <>
                <HWTypography
                  variant={"headlineS"}
                  family={"Pretendard"}
                  color={Color.dark.grey500}
                >
                  필터 검색결과
                </HWTypography>
                <HWTypography
                  variant={"headlineS"}
                  family={"Poppins"}
                  color={Color.dark.primary700}
                  css={styled.typo1}
                >
                  {content.total}
                </HWTypography>
              </>
            )}
          </div>
          <div css={styled.right}>
            {paramList.map(([key, value]: any) => {
              if (key === "genre") {
                const label = value
                  .split(",")
                  .map((v: any) => GENRE_ID_NAME[v])
                  .join(", ");
                return (
                  <HWTooltip key={value} title={label}>
                    <HWChip
                      label={label}
                      customCss={styled.chip}
                      onClick={() => {
                        commonContext.onHandleFilterOpen(true);

                        if (commonContext.filterRef.genreRef?.current) {
                          commonContext.filterRef.genreRef.current.click();
                        }
                      }}
                    />
                  </HWTooltip>
                );
              }
              if (key === "platform") {
                const label = value
                  .split(",")
                  .map((v: any) => PLATFORM_ID_NAME[v])
                  .join(", ");
                return (
                  <HWTooltip key={value} title={label}>
                    <HWChip
                      key={value}
                      label={label}
                      customCss={styled.chip}
                      onClick={() => {
                        commonContext.onHandleFilterOpen(true);

                        if (commonContext.filterRef.platformRef?.current) {
                          commonContext.filterRef.platformRef.current.click();
                        }
                      }}
                    />
                  </HWTooltip>
                );
              }

              if (key === "watch") {
                const label = value
                  .split(",")
                  .map((v: any) => WATCH_RATING_ID_NAME[v])
                  .join(", ");
                return (
                  <HWTooltip key={value} title={label}>
                    <HWChip
                      key={value}
                      label={label}
                      customCss={styled.chip}
                      onClick={() => {
                        commonContext.onHandleFilterOpen(true);

                        if (commonContext.filterRef.watchRef?.current) {
                          commonContext.filterRef.watchRef.current.click();
                        }
                      }}
                    />
                  </HWTooltip>
                );
              }
              if (key === "rating")
                return (
                  <HWChip
                    key={value}
                    label={value
                      .split(",")
                      .map((v: any) => v + (v ? "점" : ""))
                      .join(" - ")}
                    customCss={styled.chip}
                    onClick={() => {
                      commonContext.onHandleFilterOpen(true);

                      if (commonContext.filterRef.ratingRef?.current) {
                        commonContext.filterRef.ratingRef.current.click();
                      }
                    }}
                  />
                );
              if (key === "date")
                return (
                  <HWChip
                    key={value}
                    label={value
                      .split(",")
                      .map((v: any) => v + (v ? "년" : ""))
                      .join(" - ")}
                    customCss={styled.chip}
                    onClick={() => {
                      commonContext.onHandleFilterOpen(true);

                      if (commonContext.filterRef.yearRef?.current) {
                        commonContext.filterRef.yearRef.current.click();
                      }
                    }}
                  />
                );
              if (key === "sort")
                return (
                  <HWChip
                    key={value}
                    label={FILTER_SORT_ID_NAME[value]}
                    customCss={styled.chip}
                    onClick={() => {
                      commonContext.onHandleFilterOpen(true);
                      if (commonContext.filterRef.sortRef?.current) {
                        commonContext.filterRef.sortRef.current.click();
                      }
                    }}
                  />
                );
            })}
          </div>
        </div>
      </CenterWrapper>
    </div>
  );
};

export default ResultHeader;
