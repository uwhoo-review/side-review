import styled from "./style";
import ProfileImage from "@src/component/atoms/ProfileImage/ProfileImage";
import HWTextField from "@src/component/atoms/HWTextField/HWTextField";
import { useState } from "react";
import HWTooltip from "@src/component/atoms/HWTooltip/HWTooltip";
import { IconQuestion } from "@res/index";
import img1 from "@res/temp/img5.png";

const MyPageProfile = () => {
  const [nickName, setNickName] = useState<string>("");

  return (
    <div css={styled.wrapper}>
      <ProfileImage src={img1} size={"200px"} customCss={styled.profile} />
      <span css={styled.typo1}>flyingpasta@naver.com</span>
      <HWTextField
        onChange={(e) => {
          setNickName(e.target.value);
        }}
        value={nickName}
        endAdorment={
          <HWTooltip
            title={"닉네임 수정 시 작성한 리뷰에 달린\n" + "닉네임도 자동으로 변경됩니다."}
          >
            <span>
              <IconQuestion width={"20px"} height={"20px"} color={"#C7C8D3"} />
            </span>
          </HWTooltip>
        }
        customCss={styled.textField}
      />
    </div>
  );
};

export default MyPageProfile;
