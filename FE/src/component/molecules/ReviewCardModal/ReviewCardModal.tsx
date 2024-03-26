import HWDialog from "@src/component/atoms/HWDialog/HWDialog";
import { UWAxios } from "@src/common/axios/AxiosConfig";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ReviewModifyModal from "@src/component/molecules/ReviewModifyModal/ReviewModifyModal";
import HWChip from "@src/component/atoms/HWChip/HWChip";
import { IconDelete, IconEdit, IconThumbDown, IconThumbUp } from "@res/index";
import ProfileImage from "@src/component/atoms/ProfileImage/ProfileImage";
import HWTypography from "@src/component/atoms/HWTypography/HWTypography";
import Divider from "@src/component/atoms/Divider/Divider";
import Color from "@src/common/styles/Color";
import { useCommon } from "@src/providers/CommonProvider";
import styled from "./style";
import { QUERY_KEYS } from "@src/variables/QueryKeys";
import CenterWrapper from "@src/component/atoms/CenterWrapper/CenterWrapper";
import CarouselArrow from "@src/component/atoms/CarouselArrow/CarouselArrow";

const ReviewCardModal = ({
  itemId,
  onModifyOpen,
  review,
  onClose,
  customCss,
  onClick,
  itemTarget,
  user,
  reviewList,
  ...props
}: any) => {
  const commonContext = useCommon();

  const queryClient = useQueryClient();
  const [reviewObj, setReviewObj] = useState(review);
  const [reviewIdx, setReviewIdx] = useState(reviewList.findIndex((v: any) => v.id === review.id));

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      return await UWAxios.review.updateEval(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.reviewAll,
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (reviewId: string) => {
      return await UWAxios.review.deleteReview(reviewId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.review({ id: itemId, sort: "best", isSpoiler: 0, page: 0, size: 6 }),
      });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.detail(itemId),
      });
    },
  });

  useEffect(() => {
    if (reviewList.length !== 0) setReviewObj(reviewList[reviewIdx]);
  }, [reviewIdx]);

  return (
    <>
      <HWDialog onClose={onClose} {...props}>
        <CenterWrapper>
          {reviewList.length !== 0 && reviewIdx > 0 && (
            <CarouselArrow
              className={"hover-arrow left"}
              direction={"left"}
              customCss={styled.leftPageBtn}
              theme={"dark"}
              onClick={() => {
                reviewIdx > 0 && setReviewIdx((prev: any) => prev - 1);
              }}
            />
          )}
          {reviewList.length !== 0 && reviewIdx < reviewList.length - 1 && (
            <CarouselArrow
              className={"hover-arrow right"}
              direction={"right"}
              customCss={styled.rightPageBtn}
              theme={"dark"}
              onClick={() => {
                reviewIdx < reviewList.length - 1 && setReviewIdx((prev: any) => prev + 1);
              }}
            />
          )}
          <div css={styled.modalWrapper}>
            <div
              css={[styled.wrapper("820px", "570px", "10px", Color.dark.elevation16), customCss]}
              onClick={onClick}
            >
              <div css={styled.topWrapper}>
                <div css={styled.chipWrapper}>
                  {user.id === commonContext.userInfo.id && (
                    <HWChip label={"내 리뷰"} css={styled.spoiler} />
                  )}
                  {reviewObj.best && (
                    <HWChip
                      color={"best"}
                      label={
                        <div css={styled.bestDiv}>
                          <IconThumbUp />
                          Best Review
                        </div>
                      }
                    />
                  )}
                  {reviewObj.spoiler && (
                    <HWChip color={"spoiler"} label={"스포일러"} css={styled.spoiler} />
                  )}
                </div>
                <div css={styled.dateDiv}>{reviewObj.date}</div>
              </div>
              {user && user.type === "1" && (
                <div css={styled.topWrapper}>
                  <div css={styled.chipWrapper} />
                  <div css={styled.chipWrapper}>
                    <ProfileImage src={user.profile} size={"26px"} />
                    <HWTypography variant={"bodyL"} color={"#9897A1"}>
                      {user.nickname}
                    </HWTypography>
                  </div>
                </div>
              )}
              <div css={[styled.contents]}>{reviewObj.content}</div>
              <>
                <Divider />
                <div
                  css={styled.bottomWrapper}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <div css={styled.flex1}>
                    <div css={styled.flex2}>
                      <IconThumbUp />
                      {reviewObj.like}
                    </div>
                    <div css={styled.flex2}>
                      <IconThumbDown />
                      {reviewObj.dislike}
                    </div>
                  </div>
                  <div css={styled.flex1}>
                    {user.id === commonContext.userInfo.id ? (
                      <>
                        <IconEdit
                          css={styled.thumb}
                          onClick={() => {
                            onClose();
                            onModifyOpen();
                          }}
                        />
                        <IconDelete
                          css={styled.thumb}
                          onClick={() => {
                            onClose();
                            deleteMutation.mutate(reviewObj.id);
                          }}
                        />
                      </>
                    ) : (
                      <>
                        <IconThumbUp
                          onClick={() => {
                            mutation.mutate({ reviewId: reviewObj.id, eval: 1 });
                          }}
                          css={styled.thumb}
                        />
                        <IconThumbDown
                          css={styled.thumb}
                          onClick={() => {
                            mutation.mutate({ reviewId: reviewObj.id, eval: 0 });
                          }}
                        />
                      </>
                    )}
                  </div>
                </div>
              </>
            </div>
          </div>
        </CenterWrapper>
      </HWDialog>
    </>
  );
};
export default ReviewCardModal;
