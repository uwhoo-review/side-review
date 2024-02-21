import styled from "./style";
import Color from "@src/common/styles/Color";
import { SerializedStyles } from "@emotion/react";
import { IconDelete, IconEdit, IconStar, IconThumbDown, IconThumbUp } from "@res/index";
import HWChip from "@src/component/atoms/HWChip/HWChip";
import Divider from "@src/component/atoms/Divider/Divider";
import { useState } from "react";
import HWDialog from "@src/component/atoms/HWDialog/HWDialog";
import { UWAxios } from "@src/common/axios/AxiosConfig";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCommon } from "@src/providers/CommonProvider";
import ProfileImage from "@src/component/atoms/ProfileImage/ProfileImage";
import HWTypography from "@src/component/atoms/HWTypography/HWTypography";
import ReviewModifyModal from "@src/component/molecules/ReviewModifyModal/ReviewModifyModal";
import ReviewCardModal from "@src/component/molecules/ReviewCardModal/ReviewCardModal";

interface ReviewCardProps {
  id?: string;
  itemName?: string;
  itemDate?: string;
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
  user?: any;
  content?: string;
  useModal?: boolean;
  onClick?: () => void;
}

const ReviewCard = ({
  id = "",
  itemName = "",
  itemDate = "",
  reviewId = "",
  dislike = 0,
  like = 0,
  width = "420px",
  height = "140px",
  radius = "10px",
  backgroundColor = Color.dark.elevation16,
  best = false,
  spoiler = false,
  footer = false,
  date,
  line,
  customCss,
  children,
  user,
  content,
  useModal = false,
  onClick,
}: ReviewCardProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const commonContext = useCommon();
  const queryClient = useQueryClient();
  const [modifyDialog, setModifyDialog] = useState(false);

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      return await UWAxios.review.updateEval(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["list", "review", id, "best", 0, 0, 6],
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (rId: string) => {
      return await UWAxios.review.deleteReview(rId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["list", "review", id, "best", 0, 0, 6],
      });
      queryClient.invalidateQueries({
        queryKey: ["list", "detail", id],
      });
      queryClient.invalidateQueries({
        queryKey: ["user", "review", "list"],
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
        {user.nickname !== "" && user.profile !== "" && (
          <div css={styled.topWrapper}>
            <div css={styled.chipWrapper}></div>
            <div css={styled.chipWrapper}>
              {
                <>
                  <ProfileImage src={user.profile} size={"26px"} />
                  <HWTypography variant={"bodyL"} color={"#9897A1"}>
                    {user.nickname}
                  </HWTypography>
                </>
              }
            </div>
          </div>
        )}
        <div css={[styled.contents]}>
          <div css={ line &&styled.lineClamp(line)}>
            {children}
          </div>
        </div>
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
                {user.id === commonContext.userInfo.id ? (
                  <>
                    <IconEdit
                      css={styled.thumb}
                      onClick={() => {
                        setModifyDialog(true);
                      }}
                    />
                    <IconDelete
                      css={styled.thumb}
                      onClick={() => {
                        deleteMutation.mutate(reviewId);
                      }}
                    />
                  </>
                ) : (
                  <>
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
                  </>
                )}
              </div>
            </div>
          </>
        )}
      </div>
      {useModal && (
        <ReviewCardModal
          open={isOpen}
          onClose={() => setIsOpen(false)}
          onModifyOpen={() => setModifyDialog(true)}
          review={{
            id: reviewId,
            best: best,
            spoiler: spoiler,
            content: content,
            like: like,
            dislike: dislike,
            date: date,
          }}
          user={user}
          itemId={id}
        />
      )}
      {modifyDialog && (
        <ReviewModifyModal
          width={"800px"}
          open={modifyDialog}
          onClose={() => setModifyDialog(false)}
          review={{
            id: reviewId,
            best: best,
            spoiler: spoiler,
            content: content,
            like: like,
            dislike: dislike,
            date: date,
          }}
          itemId={id}
          itemName={itemName}
          itemDate={itemDate}
        />
      )}
    </>
  );
};

export default ReviewCard;
