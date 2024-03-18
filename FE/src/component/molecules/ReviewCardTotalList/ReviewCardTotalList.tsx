import styled from "./style";
import ReviewCard from "@src/component/atoms/ReviewCard/ReviewCard";
import HWTypography from "@src/component/atoms/HWTypography/HWTypography";
import HWToggle from "@src/component/atoms/HWToggle/HWToggle";
import Color from "@src/common/styles/Color";
import { IconChevronDoubleDown, IconChevronLeft, IconUpDown } from "@res/index";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import WrapperTitle from "@src/component/atoms/WrapperTitle/WrapperTitle";
import { UWAxios } from "@src/common/axios/AxiosConfig";
import { useMutation, useQuery } from "@tanstack/react-query";
import HWIconButton from "@src/component/atoms/HWIconButton/HWIconButton";
import HWToggleButtonGroup from "@src/component/atoms/HWToggleButtonGroup/HWToggleButtonGroup";
import HWToggleButton from "@src/component/atoms/HWToggleButton/HWToggleButton";
import { QUERY_KEYS } from "@src/variables/QueryKeys";
import LoadingGrid from "@src/component/organisms/LoadingGrid/LoadingGrid";

const ReviewCardTotalList = ({ id, size = 6 }: { id: string; size: number }) => {
  const navigate = useNavigate();

  const [reviewList, setReviewList] = useState<any>([]);
  const [totalCnt, setTotalCnt] = useState(0);
  const [pageInfo, setPageInfo] = useState({
    page: 0,
    totalElements: 0,
    totalPages: 0,
  });
  const [page, setPage] = useState(0);
  const [isSpoiler, setIsSpoiler] = useState(0);
  const [sort, setSort] = useState("best");

  const [toggle1, setToggle1] = useState<string>("0");

  const props1 = (value: string) => {
    return {
      checked: toggle1 === value,
      onClick: () => {
        setToggle1(value);
      },
    };
  };

  const { status, data, error, isLoading } = useQuery({
    queryKey: QUERY_KEYS.review({ id, sort, isSpoiler, page, size, type: toggle1 }),
    queryFn: async ({ queryKey }) => {
      return await UWAxios.review.getReview(
        queryKey[2],
        queryKey[3],
        queryKey[4],
        queryKey[5],
        queryKey[6],
        queryKey[7]
      );
    },
    refetchOnWindowFocus: false,
  });

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      return await UWAxios.review.getReview(
        data.id,
        data.sort,
        data.isSpoiler,
        data.page,
        data.size
      );
    },
    onSuccess: (res: any) => {
      if(res.review.length > 0) setReviewList((prev: any) => [...prev, ...res.review]);
    },
  });

  useEffect(() => {
    if (data) {
      setReviewList(data.reviews.review);
      setTotalCnt(data.reviews.total);
      setPageInfo(data.pageInfo);
    }
  }, [data]);

  return (
    <>
      <div className={"review-list-wrapper"} css={styled.wrapper}>
        <>
          <WrapperTitle
            title={
              <>
                {
                  <HWIconButton onClick={() => navigate("..")}>
                    <IconChevronLeft />
                  </HWIconButton>
                }
                {"유저 리뷰"}
              </>
            }
            subTitle={totalCnt + " reviews"}
            rightWrapper={<></>}
          />
          <div css={styled.filterWrapper}>
            <div>
              <HWToggle
                label={"스포일러 포함"}
                checked={!!isSpoiler}
                onChange={() => {
                  setIsSpoiler(Number(!isSpoiler));
                }}
              />
            </div>
            <div>
              <HWTypography
                variant={"bodyS"}
                family={"Pretendard-SemiBold"}
                color={Color.dark.grey700}
                customCss={styled.typo2}
                onClick={() => {
                  if (sort === "best") setSort("latest");
                  else if (sort === "latest") setSort("best");
                }}
              >
                <IconUpDown />
                {sort === "best" && "최신 리뷰순"}
                {sort === "latest" && "베스트 리뷰순"}
              </HWTypography>
            </div>
          </div>
          <div css={styled.toggleGroup}>
            <HWToggleButtonGroup>
              <HWToggleButton {...props1("0")}>전체</HWToggleButton>
              <HWToggleButton {...props1("1")}>UWHOO 유저리뷰</HWToggleButton>
              <HWToggleButton {...props1("2")}>익명리뷰</HWToggleButton>
            </HWToggleButtonGroup>
          </div>
          {isLoading && <LoadingGrid />}
          {status === "success" && reviewList.length === 0 && (
            <div css={styled.emptyWrapper}>
              <HWTypography
                variant={"bodyL"}
                family={"Pretendard-SemiBold"}
                color={Color.dark.grey400}
              >
                이 작품에 작성된 리뷰가 없습니다.
              </HWTypography>
            </div>
          )}
          {status === "success" && reviewList.length !== 0 && (
            <>
              <div css={styled.contentTotalWrapper}>
                {reviewList.map((v: any, i: number) => {
                  return (
                    <ReviewCard
                      key={v.id}
                      id={id}
                      reviewId={v.id}
                      dislike={v.dislike}
                      like={v.like}
                      date={v.date}
                      best={v.best}
                      spoiler={v.spoiler}
                      footer={true}
                      width={"100%"}
                      height={"100%"}
                      content={v.content}
                      user={v.user}
                      useModal={false}
                      itemTarget={v.target}
                      isProfile={true}
                      titleChip={false}
                      dateChip={false}
                      seasonChip={false}
                    >
                      {v.content}
                    </ReviewCard>
                  );
                })}
              </div>
              {pageInfo.page < pageInfo.totalPages - 1 && (
                <div
                  css={styled.plusBtn}
                  onClick={() => {
                    const v = {
                      id,
                      sort,
                      isSpoiler,
                      page: page + 1,
                      size,
                    };
                    mutation.mutate(v);
                  }}
                >
                  <HWTypography
                    variant={"headlineXXS"}
                    family={"Pretendard-SemiBold"}
                    color={Color.dark.primary800}
                  >
                    더보기
                  </HWTypography>
                  <IconChevronDoubleDown color={"#fff"} />
                </div>
              )}
            </>
          )}
        </>
      </div>
    </>
  );
};

export default ReviewCardTotalList;
