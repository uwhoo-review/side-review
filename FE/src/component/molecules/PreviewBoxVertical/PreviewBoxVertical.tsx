import ReviewCard from "@src/component/atoms/ReviewCard/ReviewCard";
import CarouselArrow from "@src/component/atoms/CarouselArrow/CarouselArrow";
import Divider from "@src/component/atoms/Divider/Divider";
import HWTypography from "@src/component/atoms/HWTypography/HWTypography";
import {
  IconChevronLeft,
  IconChevronRight,
  IconCircleCheck,
  IconLaunch,
  IconNetflix,
  IconRating,
  IconRatingEmpty,
  IconStar,
  IconWatcha,
} from "@res/index";
import Color from "@src/common/styles/Color";
import { Avatar, AvatarGroup, Rating } from "@mui/material";
import styled from "./style";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ContentDO } from "@src/interfaces/api.interface";
import { SerializedStyles } from "@emotion/react";
import { VIDEO_URL } from "@src/variables/tmdbConstants";
import HWChip from "@src/component/atoms/HWChip/HWChip";
import HWAvatarGroup from "@src/component/atoms/HWAvatarGroup/HWAvatarGroup";
import HWAvatar from "@src/component/atoms/HWAvatar/HWAvatar";
import {getCardURL, getYYYYMMDDFormat} from "@src/tools/commonTools";
import PlatformAvatar from "@src/component/molecules/PlatformAvatar/PlatformAvatar";
import { GENRE_ID_NAME, WATCH_RATING_ID_NAME } from "@src/variables/CommonConstants";
import TrailerCard from "@src/component/atoms/TrailerCard/TrailerCard";
import RatingBox from "@src/component/molecules/RatingBox/RatingBox";

interface PreviewBoxVerticalProps {
  item: ContentDO;
  customCss?: SerializedStyles;
}

const PreviewBoxVertical = ({ item, customCss }: PreviewBoxVerticalProps) => {
  const [rating, setRating] = useState<number | null>(item?.rating?.user || 0);
  const [viewState, setViewState] = useState<"info" | "review">("info");
  const navigate = useNavigate();
  const divRef = useRef<any>(null);
  const [isOverflow, setIsOverflow] = useState<boolean>(false);

  useEffect(() => {
    if (divRef.current) {
      if (divRef.current?.clientWidth < divRef.current?.scrollWidth) setIsOverflow(true);
      else setIsOverflow(false);
    }
  }, [item]);

  return (
    <>
      <div className="preview-box-wrapper" css={[styled.wrapper, customCss]}>
        <div css={styled.contents}>
          <div css={styled.topContents}>
            {item.trailer ? (
              <iframe
                width="100%"
                height="100%"
                src={getCardURL({ type: "trailer", srcId: item.trailer })}
                title="Video"
                allowFullScreen
              />
            ) : (
              <TrailerCard srcId={""} />
            )}
          </div>
          <div css={styled.middleContents}>
            <IconLaunch
              css={styled.launch}
              onClick={() => {
                navigate(`/detail/${item.id}`);
              }}
            />
            <div css={styled.title}>
              <div
                className={"title-text"}
                css={styled.marquee}
                ref={divRef}
                data-overflow={isOverflow}
              >
                <HWTypography
                  variant={"headlineS"}
                  family={"Pretendard-SemiBold"}
                  color={Color.dark.grey900}
                  css={styled.typoTitle}
                >
                  {item.name}
                </HWTypography>
                <HWTypography
                  variant={"bodyXL"}
                  family={"Poppins"}
                  color={Color.dark.grey500}
                  css={styled.typoYear}
                >
                  {item.date}
                </HWTypography>
                {item.season && item.season?.now > 1 && (
                  <HWChip
                    variant={"text"}
                    color={"season"}
                    label={"시즌 " + item.season?.now}
                    css={styled.chipAge}
                  />
                )}
                {item.age && (
                  <HWChip
                    variant={"text"}
                    color={item.age}
                    label={WATCH_RATING_ID_NAME[item.age]}
                    css={styled.chipAge}
                  />
                )}
              </div>
            </div>
          </div>
          <div css={styled.bottomContents}>
            {viewState === "info" && (
              <div className={"bottom-info"}>
                <div className={"row"} css={styled.ratingFlex}>
                  <div className={"col-4"} css={styled.ratingSubBox1}>
                    <div>
                      <HWTypography variant={"bodyL"} family={"Pretendard-SemiBold"}>
                        평균 별점
                      </HWTypography>
                    </div>
                    <div
                      className={"margin-top-12 flex flex-align-center gap-10"}
                      css={styled.height28}
                    >
                      <div className={"flex flex-align-center gap-5"}>
                        <IconStar css={styled.icons} />
                        <HWTypography
                          variant={"headlineXXS"}
                          family={"Pretendard-SemiBold"}
                          color={Color.dark.grey900}
                        >
                          {item.rating?.rating}
                        </HWTypography>
                      </div>
                      {item.rating && item.rating.total > 10 && (
                        <>
                          <Divider direction={"v"} length={"14px"} />
                          <HWTypography
                            variant={"bodyS"}
                            family={"Poppins"}
                            color={Color.dark.grey500}
                          >
                            {item.rating?.total}
                          </HWTypography>
                        </>
                      )}
                    </div>
                  </div>
                  <div className={"col-8"} css={styled.ratingSubBox2}>
                    <div>
                      <HWTypography variant={"bodyL"} family={"Pretendard-SemiBold"}>
                        내 별점
                      </HWTypography>
                    </div>
                    <div
                      className={"margin-top-12 flex flex-align-center gap-5"}
                      css={styled.height28}
                    >
                      <RatingBox
                        contentId={item.id}
                        userRating={item.rating.user}
                        ratingSize={"20px"}
                      />
                    </div>
                  </div>
                </div>
                <Divider className={"margin-top-24"} />
                <div className={"grid margin-top-16"}>
                  <div className={"col-full"}>
                    <div>
                      <HWTypography variant={"bodyL"} family={"Pretendard-SemiBold"}>
                        장르
                      </HWTypography>
                    </div>
                    <div className={"margin-top-8"}>
                      <HWTypography
                        variant={"bodyS"}
                        family={"Pretendard"}
                        color={Color.dark.grey500}
                      >
                        {item.genre.map((v) => GENRE_ID_NAME[v]).join(", ")}
                      </HWTypography>
                    </div>
                  </div>
                </div>
                {/*<div className={"grid margin-top-20"}>
                  <div className={"col-4"}>
                    <div>
                      <HWTypography variant={"bodyL"} family={"Pretendard-SemiBold"}>
                        시청등급
                      </HWTypography>
                    </div>
                    <div className={"margin-top-8"}>
                      <HWTypography variant={"bodyS"} family={"Pretendard"} color={Color.dark.grey500}>
                        {item.age}
                      </HWTypography>
                    </div>
                  </div>
                  <div className={"col-4"}>
                    <div>
                      <HWTypography variant={"bodyL"} family={"Pretendard-SemiBold"}>
                        공개 회차
                      </HWTypography>
                    </div>
                    <div className={"margin-top-8"}>
                      <HWTypography variant={"bodyS"} family={"Pretendard"} color={Color.dark.grey500}>
                        20부작
                      </HWTypography>
                    </div>
                  </div>
                  <div className={"col-4"}>
                    <div>
                      <HWTypography variant={"bodyL"} family={"Pretendard-SemiBold"}>
                        공개일
                      </HWTypography>
                    </div>
                    <div className={"margin-top-8"}>
                      <HWTypography variant={"bodyS"} family={"Poppins"} color={Color.dark.grey500}>
                        2023.02.29
                      </HWTypography>
                    </div>
                  </div>
                </div>*/}
                <div className={"grid margin-top-20"}>
                  <div className={"col-8"}>
                    <div>
                      <HWTypography variant={"bodyL"} family={"Pretendard-SemiBold"}>
                        출연진
                      </HWTypography>
                    </div>

                    <div className={"margin-top-8"}>
                      <HWTypography
                        variant={"bodyS"}
                        family={"Pretendard"}
                        color={Color.dark.grey500}
                      >
                        {item.actors?.join(", ") || "-"}
                      </HWTypography>
                    </div>
                  </div>
                  <div className={"col-4"}>
                    <div>
                      <HWTypography variant={"bodyL"} family={"Pretendard-SemiBold"}>
                        작품 제공 서비스
                      </HWTypography>
                    </div>
                    <div className={"margin-top-8"}>
                      <PlatformAvatar list={item.platform} size={"30px"}  max={3} />
                    </div>
                  </div>
                </div>
                <div className={"margin-top-30"}>
                  <HWTypography
                    variant={"bodyS"}
                    family={"Pretendard"}
                    color={Color.dark.grey500}
                    customCss={styled.synopsis}
                  >
                    {item.synopsis}
                  </HWTypography>
                </div>
              </div>
            )}
            {viewState === "review" && (
              <div className={"bottom-review"}>
                {item?.review?.total === 0 && (
                  <div css={styled.emptyReview}>
                    <HWTypography
                      variant={"bodyL"}
                      family={"Pretendard-SemiBold"}
                      color={Color.dark.grey400}
                    >
                      이 작품에 작성된 리뷰가 없습니다.
                    </HWTypography>
                  </div>
                )}
                {item?.review?.review.slice(0, 2).map((v: any) => {
                  return (
                    <ReviewCard
                      id={item.id}
                      reviewId={v.id}
                      key={v.id}
                      best={v.best}
                      spoiler={v.spoiler}
                      date={getYYYYMMDDFormat(new Date(v.date),"comma")}
                      dislike={v.dislike}
                      like={v.like}
                      line={4}
                      useModal={true}
                      itemTarget={v.target}
                      content={v.content}
                      user={v.user}
                      width={"404px"}
                    >
                      {v.content}
                    </ReviewCard>
                  );
                })}
              </div>
            )}
          </div>
          <div css={styled.footerBtn}>
            {viewState === "info" && (
              <HWTypography
                variant={"bodyL"}
                color={Color.dark.primary800}
                family={"Pretendard-SemiBold"}
                onClick={() => setViewState("review")}
                customCss={styled.typography1}
              >
                리뷰 보기 <IconChevronRight />
              </HWTypography>
            )}
            {viewState === "review" && (
              <HWTypography
                variant={"bodyL"}
                color={Color.dark.primary800}
                family={"Pretendard-SemiBold"}
                onClick={() => setViewState("info")}
                customCss={styled.typography1}
              >
                <IconChevronLeft /> 정보 보기
              </HWTypography>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PreviewBoxVertical;
