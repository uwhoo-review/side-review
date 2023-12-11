import styled from "./style";
import CenterWrapper from "@src/component/atoms/CenterWrapper/CenterWrapper";
import ReviewCard from "@src/component/atoms/ReviewCard/ReviewCard";
import HWTypography from "@src/component/atoms/HWTypography/HWTypography";
import HWButton from "@src/component/atoms/HWButton/HWButton";
import HWToggle from "@src/component/atoms/HWToggle/HWToggle";
import Color from "@src/common/styles/Color";
import { IconUpDown } from "@res/index";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import HWDialog from "@src/component/atoms/HWDialog/HWDialog";
import WrapperTitle from "@src/component/atoms/WrapperTitle/WrapperTitle";
import { UWAxios } from "@src/common/axios/AxiosConfig";
import { useQuery } from "@tanstack/react-query";

const ReviewCardList = ({ total = false, size = 6 }: any) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [reviewList, setReviewList] = useState([]);
  const [totalCnt, setTotalCnt] = useState(0);
  const [page, setPage] = useState(0);
  const [isSpoiler, setIsSpoiler] = useState(false);
  const [sort, setSort] = useState("best");

  const { status, data, error } = useQuery({
    queryKey: ["list", "review", id, sort, isSpoiler, page, size],
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

  useEffect(() => {
    if (data) {
      setReviewList(data.review);
      setTotalCnt(data.total);
    }
  }, [data]);

  return (
    <div className={"review-list-wrapper"} css={styled.wrapper}>
      <>
        <WrapperTitle
          title={"유저 리뷰"}
          subTitle={totalCnt}
          rightWrapper={
            <div>
              {!total && (
                <HWTypography
                  variant={"bodyXL"}
                  family={"Pretendard-SemiBold"}
                  color={Color.dark.primary800}
                  customCss={styled.typo1}
                  onClick={() => navigate("reviewTotal")}
                >
                  리뷰 전체보기
                </HWTypography>
              )}
            </div>
          }
        />
        <div css={styled.filterWrapper}>
          <div>
            <HWToggle
              label={"스포일러 포함"}
              checked={isSpoiler}
              onChange={() => {
                setIsSpoiler(!isSpoiler);
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
              베스트 리뷰
            </HWTypography>
          </div>
        </div>
        {status === "success" && reviewList.length === 0 && (
          <div css={styled.emptyWrapper}>
            <HWTypography
              variant={"bodyL"}
              family={"Pretendard-SemiBold"}
              color={Color.dark.grey500}
            >
              이 작품에 작성된 리뷰가 없습니다.
            </HWTypography>
          </div>
        )}
        {status === "success" && reviewList.length !== 0 && total ? (
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
                  best={true}
                  spoiler={true}
                  footer={true}
                  width={"452px"}
                  height={"280px"}
                >
                  {v.contents}
                </ReviewCard>
              );
            })}
          </div>
        ) : (
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
                  best={true}
                  spoiler={v.spoiler}
                  footer={true}
                  width={"452px"}
                  height={"280px"}
                  useModal={true}
                >
                  {v.content}
                </ReviewCard>
              );
            })}
          </div>
        )}
      </>
    </div>
  );
};

export default ReviewCardList;
