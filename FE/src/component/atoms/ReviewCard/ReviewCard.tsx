import styled from "./style";
import Color from "@src/common/styles/Color";
import { SerializedStyles } from "@emotion/react";
import { IconThumbDown, IconThumbUp } from "@res/index";
import HWChip from "@src/component/atoms/HWChip/HWChip";
import Divider from "@src/component/atoms/Divider/Divider";
import { useState } from "react";
import HWDialog from "@src/component/atoms/HWDialog/HWDialog";
import { UWAxios } from "@src/common/axios/AxiosConfig";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface ReviewCardProps {
  id?: string;
  reviewId?: string;
  dislike?: number;
  like?: number;
  width?: string;
  height?: string;
  radius?: string;
  backgroundColor?: string;
  customCss?: SerializedStyles;
  children?: React.ReactNode;
  best?: boolean;
  spoiler?: boolean;
  footer?: boolean;
  date?: string;
  line?: number;
  useModal?: boolean;
  onClick?: () => void;
}

const ReviewCard = ({
  id = "",
  reviewId = "",
  dislike = 0,
  like = 0,
  width = "420px",
  height = "140px",
  radius = "10px",
  backgroundColor = Color.dark.elevation16,
  best = true,
  spoiler = false,
  footer = false,
  date,
  line,
  customCss,
  children,
  useModal = false,
  onClick,
}: ReviewCardProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (data: any) => {
      return await UWAxios.review.updownReview(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["list", "review", id, "best", false, 0, 6],
      });
    },
  });

  return (
    <>
      <div
        css={[styled.wrapper(width, height, radius, backgroundColor), customCss]}
        onClick={() => {
          if (useModal) setIsOpen(!isOpen);
          onClick && onClick();
        }}
      >
        <div css={styled.topWrapper}>
          <div css={styled.chipWrapper}>
            {best && (
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
            {spoiler && <HWChip color={"spoiler"} label={"스포일러"} css={styled.spoiler} />}
          </div>
          <div css={styled.dateDiv}>{date}</div>
        </div>
        <div css={[styled.contents, line && styled.lineClamp(line)]}>{children}</div>
        {footer && (
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
                  {like}
                </div>
                <div css={styled.flex2}>
                  <IconThumbDown />
                  {dislike}
                </div>
              </div>
              <div css={styled.flex1}>
                <IconThumbUp
                  onClick={() => {
                    mutation.mutate({ reviewId: reviewId, eval: 1 });
                  }}
                  css={styled.thumb}
                />
                <IconThumbDown
                  css={styled.thumb}
                  onClick={() => {
                    mutation.mutate({ reviewId: reviewId, eval: 0 });
                  }}
                />
              </div>
            </div>
          </>
        )}
      </div>
      {useModal && isOpen && (
        <>
          <HWDialog open={Boolean(isOpen)} onClose={() => setIsOpen(false)}>
            <ReviewCard
              id={id}
              reviewId={reviewId}
              dislike={dislike}
              like={like}
              date={date}
              best={best}
              spoiler={spoiler}
              footer={true}
              width={"800px"}
              height={"570px"}
            >
              {children}
            </ReviewCard>
          </HWDialog>
        </>
      )}
    </>
  );
};

export default ReviewCard;
