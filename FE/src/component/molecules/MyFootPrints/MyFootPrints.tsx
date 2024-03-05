import HWToggleButtonGroup from "@src/component/atoms/HWToggleButtonGroup/HWToggleButtonGroup";
import HWToggleButton from "@src/component/atoms/HWToggleButton/HWToggleButton";
import { forwardRef, useEffect, useRef, useState } from "react";
import HWTypography from "@src/component/atoms/HWTypography/HWTypography";
import ContentCard from "@src/component/atoms/ContentCard/ContentCard";
import Color from "@src/common/styles/Color";
import { IconChevronDoubleDown } from "@res/index";
import CenterWrapper from "@src/component/atoms/CenterWrapper/CenterWrapper";
import { VirtuosoGrid } from "react-virtuoso";
import { useNavigate } from "react-router-dom";
import styled from "./style";
import { UWAxios } from "@src/common/axios/AxiosConfig";
import { CONTENTS_TABS } from "@src/variables/APIConstants";
import { useMutation, useQuery } from "@tanstack/react-query";
import LoadingGrid from "@src/component/organisms/LoadingGrid/LoadingGrid";
import MoreViewButton from "@src/component/atoms/MoreViewButton/MoreViewButton";
import ReviewCard from "@src/component/atoms/ReviewCard/ReviewCard";
import ContentCardSec from "@src/component/atoms/ContentCardSec/ContentCardSec";
import { QUERY_KEYS } from "@src/variables/QueryKeys";

const MyFootPrints = ({ toggle = "star" }: any) => {
  const PAGE_SIZE = 6;

  const [toggle1, setToggle1] = useState<string>(toggle);
  const [resultContent, setResultContent] = useState<any>([]);
  const [resultReview, setResultReview] = useState<any>([]);
  const [contentPageInfo, setContentPageInfo] = useState({
    page: 0,
    totalElements: 0,
    totalPages: 0,
  });
  const [reviewPageInfo, setReviewPageInfo] = useState({
    page: 0,
    totalElements: 0,
    totalPages: 0,
  });

  const navigate = useNavigate();
  const virtuosoRef = useRef<any>();

  const useStarMatch = useQuery({
    queryKey: QUERY_KEYS.footPrintsStar(0, PAGE_SIZE),
    queryFn: async ({ queryKey }: any) => {
      return await UWAxios.user.getMyStarCollect(queryKey[3], queryKey[4]);
    },
    refetchOnWindowFocus: false,
    // enabled: toggle1 === "star",
  });

  const useReviewMatch = useQuery({
    queryKey: QUERY_KEYS.footPrintsReview(0, PAGE_SIZE),
    queryFn: async ({ queryKey }: any) => {
      return await UWAxios.user.getMyReviewCollect(queryKey[3], queryKey[4]);
    },
    refetchOnWindowFocus: false,
    // enabled: toggle1 === "review",
  });

  const starMutation = useMutation({
    mutationFn: async (p: any) => {
      return await UWAxios.user.getMyStarCollect(p, PAGE_SIZE);
    },
    onSuccess: (data: any) => {
      setResultContent((prev: any) => [...prev, ...data.contents]);
      setContentPageInfo(data.pageInfo);
    },
  });

  const reviewMutation = useMutation({
    mutationFn: async (p: any) => {
      return await UWAxios.user.getMyReviewCollect(p, PAGE_SIZE);
    },
    onSuccess: (data: any) => {
      setResultReview((prev: any) => [...prev, ...data.reviews.review]);
      setReviewPageInfo(data.pageInfo);
    },
  });

  const props1 = (value: string) => {
    return {
      checked: toggle1 === value,
      onClick: () => {
        setToggle1(value);
      },
    };
  };

  useEffect(() => {
    if (useStarMatch.data) {
      setResultContent(useStarMatch.data.contents);
      setContentPageInfo(useStarMatch.data.pageInfo);
    }
  }, [useStarMatch.data]);

  useEffect(() => {
    if (useReviewMatch.data) {
      setResultReview(useReviewMatch.data.reviews.review);
      setReviewPageInfo(useReviewMatch.data.pageInfo);
    }
  }, [useReviewMatch.data]);

  useEffect(() => {
    setToggle1(toggle);
  }, [toggle]);

  return (
    <div css={styled.wrapper}>
      <HWTypography variant={"headlineM"} family={"Pretendard-SemiBold"}>
        UWHOO 발자취
      </HWTypography>
      <HWToggleButtonGroup customCss={styled.toggle}>
        <HWToggleButton customCss={styled.toggleBtn} {...props1("star")}>
          내 별점 작품 <span css={styled.typo}>{contentPageInfo.totalElements}</span>
        </HWToggleButton>
        <HWToggleButton customCss={styled.toggleBtn} {...props1("review")}>
          내 리뷰 <span css={styled.typo}>{reviewPageInfo.totalElements}</span>
        </HWToggleButton>
      </HWToggleButtonGroup>
      <CenterWrapper>
        {toggle1 === "star" && (
          <>
            {useStarMatch.isLoading && <LoadingGrid />}
            {resultContent.length !== 0 && (
              <>
                <div css={styled.virtuosoWrapper}>
                  <VirtuosoGrid
                    ref={virtuosoRef}
                    data={resultContent}
                    useWindowScroll={true}
                    components={{
                      List: forwardRef((props, ref) => (
                        <div {...props} css={styled.listContainer} ref={ref} />
                      )),
                      Item: (props) => (
                        <div {...props} className={"item-container"} css={styled.itemContainer} />
                      ),
                    }}
                    itemContent={(i, v) => {
                      return (
                        <div className={"content-slide"} key={v.id} css={styled.item}>
                          <ContentCardSec
                            id={v.id}
                            key={v.id}
                            className={`image-card`}
                            srcId={v.poster}
                            contentName={v.name}
                            season={v.season}
                            active={true}
                            launch={false}
                            customCss={styled.card}
                            userRating={v.userRating}
                            type={"second"}
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/detail/${v.id}`);
                            }}
                          />
                        </div>
                      );
                    }}
                  />
                </div>
                {contentPageInfo.page < contentPageInfo.totalPages - 1 && (
                  <MoreViewButton
                    onClick={() => {
                      starMutation.mutate(contentPageInfo.page + 1);
                    }}
                  />
                )}
              </>
            )}
          </>
        )}
        {toggle1 === "review" && (
          <>
            {useReviewMatch.isLoading && <LoadingGrid />}
            {resultReview.length !== 0 && (
              <>
                <div css={styled.contentTotalWrapper}>
                  {resultReview.map((v: any, i: number) => {
                    return (
                      <ReviewCard
                        id={v.target.id}
                        key={v.id}
                        reviewId={v.id}
                        dislike={v.dislike}
                        like={v.like}
                        date={v.date}
                        footer={true}
                        width={"100%"}
                        height={"100%"}
                        content={v.content}
                        user={v.user}
                        itemTarget={v.target}
                        spoiler={v.spoiler}
                        best={v.best}
                        isProfile={false}
                        titleChip={true}
                        dateChip={true}
                        seasonChip={true}
                        useModal={false}
                      >
                        {v.content}
                      </ReviewCard>
                    );
                  })}
                </div>
                {reviewPageInfo.page < reviewPageInfo.totalPages - 1 && (
                  <MoreViewButton
                    onClick={() => {
                      reviewMutation.mutate(reviewPageInfo.page + 1);
                    }}
                  />
                )}
              </>
            )}
          </>
        )}
      </CenterWrapper>
    </div>
  );
};

export default MyFootPrints;
