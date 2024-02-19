import styled from "./style";
import HWDialog from "@src/component/atoms/HWDialog";
import HWButton from "@src/component/atoms/HWButton/HWButton";
import HWChip from "@src/component/atoms/HWChip/HWChip";
import HWCheckBox from "@src/component/atoms/HWCheckBox/HWCheckBox";
import { useEffect, useState } from "react";
import HWTypography from "@src/component/atoms/HWTypography/HWTypography";
import Color from "@src/common/styles/Color";
import { getByteLength, getMaxByteText } from "@src/tools/commonTools";
import { UWAxios } from "@src/common/axios/AxiosConfig";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { useCommon } from "@src/providers/CommonProvider";

const ReviewModifyModal = ({ item, onClose, review, ...props }: any) => {
  const LIMIT_BYTE = 2000;

  const commonContext = useCommon();
  const [text, setText] = useState<string>("");
  const [tmpText, setTmpText] = useState<string>("");
  const [byteText, setByteText] = useState(0);
  const [isSpoiler, setIsSpoiler] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (data: any) => {
      return await UWAxios.review.createReview(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["list", "review", item.id, "best", 0, 0, 6],
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (reviewId: string) => {
      return await UWAxios.review.deleteReview(reviewId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["list", "review", item.id, "best", 0, 0, 6],
      });
    },
  });

  useEffect(() => {
    const res = getMaxByteText(tmpText, LIMIT_BYTE);
    setText(res.s);
    setByteText(res.byte);
  }, [tmpText]);

  useEffect(() => {
    setTmpText(review.content);
    setIsSpoiler(review.spoiler);
  }, []);

  return (
    <HWDialog {...props} customCss={styled.wrapper}>
      <HWDialog.Title onClose={onClose}>리뷰 수정</HWDialog.Title>
      <HWDialog.Content css={styled.contentWrapper}>
        <div>
          <HWChip label={item.name} color={"best"} customCss={styled.chip} />
          <HWChip
            label={new Date(item.date).getFullYear()}
            color={"best"}
            customCss={styled.chip}
          />
        </div>
        <textarea
          placeholder={
            "여기에 리뷰를 작성해 주세요.\n" + "익명 리뷰는 등록 후 수정/삭제가 어려워요!"
          }
          value={text}
          onChange={(e) => {
            setTmpText(e.target.value);
          }}
          css={styled.textarea}
        />
        <div css={styled.flex}>
          <HWCheckBox
            checked={isSpoiler}
            label={
              <HWTypography variant={"bodyXS"} color={Color.dark.grey700}>
                이 리뷰는 스포일러를 포함합니다.
              </HWTypography>
            }
            onChange={(checked) => setIsSpoiler(checked)}
          />
          <div css={styled.byteChk}>
            {byteText}/{LIMIT_BYTE} byte
          </div>
        </div>
      </HWDialog.Content>
      <HWDialog.Actions customCss={styled.dialogAction}>
        <div>
          <HWButton
            variant="secondary"
            onClick={() => {
              onClose();
              deleteMutation.mutate(review.id);
            }}
          >
            리뷰 삭제
          </HWButton>
        </div>
        <div css={styled.actionRight}>
          <HWButton variant="lower" onClick={onClose}>
            취소
          </HWButton>
          <HWButton
            variant="primary"
            onClick={() => {
              const data = {
                reviewId: review.id,
                dramaId: item.id,
                content: text,
                spoiler: isSpoiler,
              };
              onClose();
              mutation.mutate(data);
            }}
          >
            수정
          </HWButton>
        </div>
      </HWDialog.Actions>
    </HWDialog>
  );
};

export default ReviewModifyModal;
