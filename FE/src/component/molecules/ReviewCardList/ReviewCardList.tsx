import styled from "./style";
import CenterWrapper from "@src/component/atoms/CenterWrapper/CenterWrapper";
import ReviewCard from "@src/component/atoms/ReviewCard/ReviewCard";
import HWTypography from "@src/component/atoms/HWTypography/HWTypography";
import HWButton from "@src/component/atoms/HWButton/HWButton";
import HWToggle from "@src/component/atoms/HWToggle/HWToggle";
import Color from "@src/common/styles/Color";
import { IconChevronDoubleDown, IconChevronLeft, IconUpDown } from "@res/index";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import WrapperTitle from "@src/component/atoms/WrapperTitle/WrapperTitle";
import { UWAxios } from "@src/common/axios/AxiosConfig";
import { useMutation, useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@src/variables/QueryKeys";

const ReviewCardList = ({ id, size = 6 }: { id: string; size: number }) => {
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

  const { status, data, error } = useQuery({
    queryKey: QUERY_KEYS.review({ id, sort, isSpoiler, page, size }),
    queryFn: async ({ queryKey }) => {
      return await UWAxios.review.getReview(
        queryKey[2],
        queryKey[3],
        queryKey[4],
        queryKey[5],
        queryKey[6]
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
      setReviewList((prev: any) => [...prev, ...res.review]);
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
            title={<>{"유저 리뷰"}</>}
            subTitle={totalCnt + " reviews"}
            rightWrapper={
              <div>
                {
                  <HWButton variant={"lowest"} onClick={() => navigate("review-total")}>
                    <HWTypography
                      variant={"bodyXL"}
                      family={"Pretendard-SemiBold"}
                      color={Color.dark.primary800}
                    >
                      리뷰 전체보기
                    </HWTypography>
                  </HWButton>
                }
              </div>
            }
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
            <div css={styled.contentWrapper}>
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
                    width={"452px"}
                    height={"280px"}
                    useModal={true}
                    user={v.user}
                    content={v.content}
                    itemTarget={v.target}
                    isProfile={false}
                    titleChip={false}
                    dateChip={false}
                    seasonChip={false}
                    line={7}
                    reviewList={reviewList}
                  >
                    {v.content}
                  </ReviewCard>
                );
              })}
            </div>
          )}
        </>
      </div>
    </>
  );
};

export default ReviewCardList;
