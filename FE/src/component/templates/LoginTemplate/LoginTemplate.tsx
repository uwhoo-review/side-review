import styled from "./style";
import {
  bg01,
  bg02,
  bg03,
  bg04,
  bg05,
  bg06,
  bg07,
  bg08,
  bg09,
  bg10,
  IconGoogle,
  IconKakao,
  IconNaver,
  IconUwhoo,
} from "@res/index";
import HWTypography from "@src/component/atoms/HWTypography/HWTypography";
import { useCommon } from "@src/providers/CommonProvider";
import { useEffect, useState } from "react";
import Login from "@src/component/organisms/LoginGrid/Login/Login";
import useInterval from "@src/tools/useInterval";
const LoginTemplate = () => {
  const common = useCommon();
  const bgArr = [bg01, bg02, bg03, bg04, bg05, bg06, bg07, bg08, bg09, bg10];
  const [bgIdx, setBgIdx] = useState(0);
  useInterval(() => {
    if (bgIdx >= bgArr.length - 1) setBgIdx(0);
    else setBgIdx(bgIdx + 1);
  }, 1000 * 5);

  return (
    <section
      className="login-template-wrapper"
      // style={{ backgroundImage: `url(${bgArr[bgIdx]})` }}
      css={styled.wrapper}
    >
      {/*<div css={styled.bgWrapper(bgArr[bgidx])} />;*/}
      <div css={styled.sliderWrapper(bgIdx)}>
        {bgArr.map((v) => {
          return <div key={v} css={styled.bgWrapper(v)} />;
        })}
      </div>

      <div css={styled.loginWrapper}>
        <IconUwhoo width={"300px"} height={"48px"} />
        <div css={styled.typo1}>로그인</div>
        <div css={styled.typo2}>
          간편 로그인으로&nbsp;
          <HWTypography variant={"bodyXL"} color={"#6D6ADA"}>
            유후
          </HWTypography>
          의 다양한&nbsp;
          <HWTypography variant={"bodyXL"} color={"#C7C8D3"}>
            맞춤 추천 서비스
          </HWTypography>
          를 이용해보세요!
        </div>
        <Login />
      </div>
    </section>
  );
};

export default LoginTemplate;
