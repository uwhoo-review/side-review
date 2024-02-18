import styled from "./style";
import ProfileImage from "@src/component/atoms/ProfileImage/ProfileImage";
import HWTextField from "@src/component/atoms/HWTextField/HWTextField";
import { useEffect, useState } from "react";
import HWTooltip from "@src/component/atoms/HWTooltip/HWTooltip";
import { IconQuestion } from "@res/index";
import img1 from "@res/temp/img5.png";
import HWButton from "@src/component/atoms/HWButton/HWButton";
import { UWAxios } from "@src/common/axios/AxiosConfig";
import { useCommon } from "@src/providers/CommonProvider";

const MyPageProfile = ({ user }: any) => {
  const [nickName, setNickName] = useState<string>("");
  const commonContext = useCommon();
  useEffect(() => {
    setNickName(user.nickname);
  }, []);

  return (
    <div css={styled.wrapper}>
      <ProfileImage src={img1} size={"200px"} customCss={styled.profile} />
      <span css={styled.typo1}>flyingpasta@naver.com</span>
      <div css={styled.textFieldWrapper}>
        <HWTextField
          onChange={(e) => {
            setNickName(e.target.value);
          }}
          value={nickName}
          width={"270px"}
          endAdorment={
            <HWTooltip title={"닉네임 수정 시 작성한 리뷰에 달린 닉네임도 자동으로 변경됩니다."}>
              <span>
                <IconQuestion width={"20px"} height={"20px"} color={"#C7C8D3"} />
              </span>
            </HWTooltip>
          }
          customCss={styled.textField}
        />
        <HWButton
          variant={"primary"}
          onClick={async () => {
            const res = await UWAxios.user.putNickName(nickName);
            commonContext.onAlert({
              is: true,
              type: "success",
              children: "변경 완료!",
            });
          }}
        >
          저장
        </HWButton>
      </div>
    </div>
  );
};

export default MyPageProfile;
