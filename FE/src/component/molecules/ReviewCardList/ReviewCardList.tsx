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
import HWDialog from "@src/component/atoms/HWDialog/HWDialog";
import WrapperTitle from "@src/component/atoms/WrapperTitle/WrapperTitle";
import { UWAxios } from "@src/common/axios/AxiosConfig";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Backdrop, Fade, Grow, Modal, Slide, Slider } from "@mui/material";
import { CONTENTS_TABS } from "@src/variables/APIConstants";
import HWIconButton from "@src/component/atoms/HWIconButton/HWIconButton";

const ReviewCardList = ({ total = false, size = 6 }: any) => {
  const navigate = useNavigate();
  const { id } = useParams();

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
  const [isReviewModal, setIsReviewModal] = useState(false);

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
      setReviewList(data.reviewDTO.review);
      setTotalCnt(data.reviewDTO.total);
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
                {total && (
                  <HWIconButton onClick={() => navigate("..")}>
                    <IconChevronLeft />
                  </HWIconButton>
                )}
                {"유저 리뷰"}
              </>
            }
            subTitle={totalCnt}
            rightWrapper={
              <div>
                {!total && (
                  <HWButton variant={"lowest"} onClick={() => navigate("review-total")}>
                    <HWTypography
                      variant={"bodyXL"}
                      family={"Pretendard-SemiBold"}
                      color={Color.dark.primary800}
                    >
                      리뷰 전체보기
                    </HWTypography>
                  </HWButton>
                )}
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
                color={Color.dark.grey500}
              >
                이 작품에 작성된 리뷰가 없습니다.
              </HWTypography>
            </div>
          )}
          {status === "success" && reviewList.length !== 0 && total ? (
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
                      best={true}
                      spoiler={v.spoiler}
                      footer={true}
                      width={"100%"}
                      height={"280px"}
                    >
                      {v.contents}
                    </ReviewCard>
                  );
                })}
              </div>
              {pageInfo.totalElements > reviewList.length && (
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
      {
        <Modal
          open={isReviewModal}
          onClose={() => setIsReviewModal(false)}
          css={styled.modal}
          closeAfterTransition
        >
          <Slide in={isReviewModal} direction={"up"} style={{ borderTop: "1ps solid transparent" }}>
            <div css={[styled.modalWrapper]}>
              <CenterWrapper>
                <ReviewCardList total={true} size={10} />
              </CenterWrapper>
            </div>
          </Slide>
        </Modal>
      }

      {/*)}*/}
    </>
  );
};

export default ReviewCardList;
