import styled from "./style";
import MyPageProfile from "@src/component/molecules/MyPageProfile/MyPageProfile";
import MyPageInfo from "@src/component/molecules/MyPageInfo/MyPageInfo";
import { IconArrowRight, IconCircleCamera, IconCircleReview, IconCircleStar } from "@res/index";
import HWTypography from "@src/component/atoms/HWTypography/HWTypography";
import MyPageGNB from "@src/component/organisms/GNB/MyPageGNB";
import CenterWrapper from "@src/component/atoms/CenterWrapper/CenterWrapper";
import MyFootPrints from "@src/component/molecules/MyFootPrints/MyFootPrints";

const MyPageHeader = () => {
  return (
    <div className={"mypage-header-wrapper"} css={styled.wrapper}>
      <CenterWrapper>
        <div css={styled.subWrapper}>
          <MyPageProfile />
          <MyPageInfo
            topText={
              <>
                <HWTypography variant={"displayL"} family={"Pretendard-SemiBold"}>
                  21
                </HWTypography>
                <HWTypography variant={"headlineL"} family={"Pretendard-SemiBold"}>
                  개
                </HWTypography>
              </>
            }
            middleText={
              <>
                <IconCircleCamera />
                <HWTypography variant={"headlineXS"} family={"Pretendard-SemiBold"}>
                  별점을 남긴 작품
                </HWTypography>
              </>
            }
            bottomText={
              <>
                <HWTypography variant={"bodyL"} family={"Pretendard-SemiBold"}>
                  별점을 남긴 작품 모아보기
                </HWTypography>
                <IconArrowRight />
              </>
            }
            modalChildren={<MyFootPrints toggle={"content"} />}
          />
          <MyPageInfo
            topText={
              <>
                <HWTypography variant={"displayL"} family={"Pretendard-SemiBold"}>
                  8
                </HWTypography>
                <HWTypography variant={"headlineL"} family={"Pretendard-SemiBold"}>
                  개
                </HWTypography>
              </>
            }
            middleText={
              <>
                <IconCircleReview />
                <HWTypography variant={"headlineXS"} family={"Pretendard-SemiBold"}>
                  리뷰를 작성한 작품
                </HWTypography>
              </>
            }
            bottomText={
              <>
                <HWTypography variant={"bodyL"} family={"Pretendard-SemiBold"}>
                  내 리뷰 모아보기
                </HWTypography>
                <IconArrowRight />
              </>
            }
            modalChildren={<MyFootPrints toggle={"review"} />}
          />
          <MyPageInfo
            topText={
              <>
                <HWTypography variant={"displayL"} family={"Pretendard-SemiBold"}>
                  4.5
                </HWTypography>
                <HWTypography variant={"headlineL"} family={"Pretendard-SemiBold"}>
                  점
                </HWTypography>
              </>
            }
            middleText={
              <>
                <IconCircleStar />
                <HWTypography variant={"headlineXS"} family={"Pretendard-SemiBold"}>
                  내 별점 평균
                </HWTypography>
              </>
            }
            bottomText={
              <>
                <HWTypography variant={"bodyL"} family={"Pretendard-SemiBold"}>
                  유후 리포트 바로가기
                </HWTypography>
                <IconArrowRight />
              </>
            }
            onClick={() => {
              const target = document.querySelector(".accordion-report-wrapper");
              if (target) {
                target.scrollIntoView({ behavior: "smooth" });
              }
            }}
          />
        </div>
      </CenterWrapper>
    </div>
  );
};

export default MyPageHeader;
