import HWDialog from "@src/component/atoms/HWDialog/HWDialog";
import { UWAxios } from "@src/common/axios/AxiosConfig";
import { useState } from "react";
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
import {QUERY_KEYS} from "@src/variables/QueryKeys";

const ReviewCardModal = ({
  itemId,
  onModifyOpen,
  review,
  onClose,
  customCss,
  onClick,
  itemTarget,
  user,
  ...props
}: any) => {
  const commonContext = useCommon();

  const queryClient = useQueryClient();

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

  return (
    <>
      <HWDialog onClose={onClose} {...props}>
        <div
          css={[styled.wrapper("820px", "570px", "10px", Color.dark.elevation16), customCss]}
          onClick={onClick}
        >
          <div css={styled.topWrapper}>
            <div css={styled.chipWrapper}>
              {user.id === commonContext.userInfo.id && (
                <HWChip label={"내 리뷰"} css={styled.spoiler} />
              )}
              {review.best && (
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
              {review.spoiler && (
                <HWChip color={"spoiler"} label={"스포일러"} css={styled.spoiler} />
              )}
            </div>
            <div css={styled.dateDiv}>{review.date}</div>
          </div>
          {user && (
            <div css={styled.topWrapper}>
              <div css={styled.chipWrapper} />
              <div css={styled.chipWrapper}>
                {user.nickname === "" && user.profile === "" ? (
                  <>
                    <HWTypography variant={"bodyL"} color={"#9897A1"}>
                      익명
                    </HWTypography>
                  </>
                ) : (
                  <>
                    <ProfileImage src={user.profile} size={"26px"} />
                    <HWTypography variant={"bodyL"} color={"#9897A1"}>
                      {user.nickname}
                    </HWTypography>
                  </>
                )}
              </div>
            </div>
          )}
          <div css={[styled.contents]}>{review.content}</div>
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
                  {review.like}
                </div>
                <div css={styled.flex2}>
                  <IconThumbDown />
                  {review.dislike}
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
                        deleteMutation.mutate(review.id);
                      }}
                    />
                  </>
                ) : (
                  <>
                    <IconThumbUp
                      onClick={() => {
                        mutation.mutate({ reviewId: review.id, eval: 1 });
                      }}
                      css={styled.thumb}
                    />
                    <IconThumbDown
                      css={styled.thumb}
                      onClick={() => {
                        mutation.mutate({ reviewId: review.id, eval: 0 });
                      }}
                    />
                  </>
                )}
              </div>
            </div>
          </>
        </div>
      </HWDialog>
    </>
  );
};
export default ReviewCardModal;
