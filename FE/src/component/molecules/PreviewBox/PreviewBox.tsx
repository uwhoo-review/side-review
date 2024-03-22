import ReviewCard from "@src/component/atoms/ReviewCard/ReviewCard";
import CarouselArrow from "@src/component/atoms/CarouselArrow/CarouselArrow";
import Divider from "@src/component/atoms/Divider/Divider";
import HWTypography from "@src/component/atoms/HWTypography/HWTypography";
import {
  IconCircleCheck,
  IconLaunch,
  IconNetflix,
  IconRating,
  IconRatingEmpty,
  IconStar,
  IconWatcha,
} from "@res/index";
import Color from "@src/common/styles/Color";
import { Avatar, AvatarGroup, Modal, Rating } from "@mui/material";
import styled from "./style";
import CenterWrapper from "@src/component/atoms/CenterWrapper/CenterWrapper";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { VIDEO_URL } from "@src/variables/tmdbConstants";
import { ContentDO } from "@src/interfaces/api.interface";
import { SerializedStyles } from "@emotion/react";
import HWChip from "@src/component/atoms/HWChip/HWChip";
import HWAvatarGroup from "@src/component/atoms/HWAvatarGroup/HWAvatarGroup";
import HWAvatar from "@src/component/atoms/HWAvatar/HWAvatar";
import {getCardURL, getYYYYMMDDFormat} from "@src/tools/commonTools";
import PlatformAvatar from "@src/component/molecules/PlatformAvatar/PlatformAvatar";
import {
  GENRE_ID_NAME,
  WATCH_RATING_ID_NAME,
  WATCH_RATING_NAME,
} from "@src/variables/CommonConstants";
import TrailerCard from "@src/component/atoms/TrailerCard/TrailerCard";
import RatingBox from "@src/component/molecules/RatingBox/RatingBox";

interface PreviewBoxProps {
  item: ContentDO;
  onPrev?: () => void;
  onNext?: () => void;
  customCss?: SerializedStyles;
}

const PreviewBox = ({ item, customCss, onPrev, onNext }: PreviewBoxProps) => {
  const [rating, setRating] = useState<number | null>(item?.rating?.user || 0);
  const [detailOpen, setDetailOpen] = useState<boolean>(false);
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
    <div css={styled.centerWrapper}>
      <CenterWrapper>
        <div className="preview-box-wrapper" css={[styled.wrapper, customCss]}>
          <div css={styled.contents}>
            <div css={styled.topContents}>
              <div css={styled.leftContents}>
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
              <div css={styled.rightContents}>
                <IconLaunch
                  css={styled.launch}
                  onClick={() => {
                    setDetailOpen(!detailOpen);
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
                      ref={divRef}
                      data-overflow={isOverflow}
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
                <div className={"grid margin-top-16"}>
                  <div className={"col-4"}>
                    <div>
                      <HWTypography variant={"bodyL"} family={"Pretendard-SemiBold"}>
                        평균 별점
                      </HWTypography>
                    </div>
                    <div
                      className={"margin-top-12 flex flex-align-center gap-10"}
                      css={styled.height28}
                    >
                      <IconStar css={styled.icons} />
                      <HWTypography
                        variant={"headlineXXS"}
                        family={"Pretendard-SemiBold"}
                        color={Color.dark.grey900}
                      >
                        {item.rating?.rating || 0}
                      </HWTypography>
                      {item.rating && item.rating.total > 10 && (
                        <>
                          <Divider direction={"v"} length={"14px"} />{" "}
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
                  <div className={"col-8"}>
                    <div>
                      <HWTypography variant={"bodyL"} family={"Pretendard-SemiBold"}>
                        내 별점
                      </HWTypography>
                    </div>
                    <div
                      className={"margin-top-12 flex flex-align-center gap-10"}
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
                      <PlatformAvatar list={item.platform} size={"30px"} max={3} />
                    </div>
                  </div>
                </div>
                <div className={"grid margin-top-20"}>
                  <div className={"col-full"}>
                    <HWTypography
                      variant={"bodyS"}
                      family={"Pretendard"}
                      color={Color.dark.grey500}
                      css={styled.synopsis}
                    >
                      {item.synopsis}
                    </HWTypography>
                  </div>
                </div>
              </div>
            </div>
            <div css={styled.bottomContents}>
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
              {item?.review?.review.map((v: any) => {
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
                    width={"452px"}
                  >
                    {v.content}
                  </ReviewCard>
                );
              })}
            </div>
          </div>
          {/*<div css={styled.rightWrapper}>
            <CarouselArrow direction={"right"} onClick={onNext} />
          </div>*/}
        </div>
      </CenterWrapper>
    </div>
  );
};

export default PreviewBox;
