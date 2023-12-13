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

const ReviewModal = ({ item, onClose, ...props }: any) => {
  const LIMIT_BYTE = 2000;

  const [text, setText] = useState<string>("");
  const [byteText, setByteText] = useState(0);
  const [isSpoiler, setIsSpoiler] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (data: any) => {
      return await UWAxios.review.createReview(data);
    },
    onSuccess: () => {
      onClose();
      queryClient.invalidateQueries({
        queryKey: ["list", "review", item.id, "best", 0, 0, 6],
      });
    },
  });

  return (
    <HWDialog {...props} customCss={styled.wrapper}>
      <HWDialog.Title onClose={onClose}>리뷰 쓰기</HWDialog.Title>
      <HWDialog.Content css={styled.contentWrapper}>
        <div>
          <HWChip label={item.name} color={"best"} customCss={styled.chip} />
          <HWChip
            label={new Date(item.firstAirDate).getFullYear()}
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
            const res = getMaxByteText(e.target.value, LIMIT_BYTE);
            setText(res.s);
            setByteText(res.byte);
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
      <HWDialog.Actions>
        <HWButton variant="lower" onClick={onClose}>
          취소
        </HWButton>
        <HWButton
          variant="primary"
          onClick={() => {
            const data = {
              dramaId: item.id,
              content: text,
              spoiler: isSpoiler,
            };
            mutation.mutate(data);
          }}
        >
          등록
        </HWButton>
      </HWDialog.Actions>
    </HWDialog>
  );
};

export default ReviewModal;
