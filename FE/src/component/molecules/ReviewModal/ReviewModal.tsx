import styled from "./style";
import HWDialog from "@src/component/atoms/HWDialog";
import HWButton from "@src/component/atoms/HWButton/HWButton";
import HWChip from "@src/component/atoms/HWChip/HWChip";
import HWCheckBox from "@src/component/atoms/HWCheckBox/HWCheckBox";
import { useState } from "react";
import HWTypography from "@src/component/atoms/HWTypography/HWTypography";
import Color from "@src/common/styles/Color";

const ReviewModal = ({ onClose, ...props }: any) => {
  const [text, setText] = useState<string>("");
  return (
    <HWDialog {...props} customCss={styled.wrapper}>
      <HWDialog.Title onClose={onClose}>리뷰 쓰기</HWDialog.Title>
      <HWDialog.Content css={styled.contentWrapper}>
        <div>
          <HWChip label={"무빙"} color={"best"} />
          <HWChip label={"2023"} color={"best"} />
        </div>
        <textarea
          placeholder={
            "여기에 리뷰를 작성해 주세요.\n" + "익명 리뷰는 등록 후 수정/삭제가 어려워요!"
          }
          maxLength={1000}
          value={text}
          onChange={(e) => setText(e.target.value)}
          css={styled.textarea}
        />
        <HWCheckBox
          checked={false}
          label={<HWTypography variant={"bodyXS"} color={Color.dark.grey700}>이 리뷰는 스포일러를 포함합니다.</HWTypography>}
        />
      </HWDialog.Content>
      <HWDialog.Actions>
        <HWButton variant="lower" onClick={onClose}>취소</HWButton>
        <HWButton variant="primary">등록</HWButton>
      </HWDialog.Actions>
    </HWDialog>
  );
};

export default ReviewModal;
