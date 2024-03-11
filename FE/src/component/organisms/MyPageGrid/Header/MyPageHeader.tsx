import styled from "./style";
import MyPageProfile from "@src/component/molecules/MyPageProfile/MyPageProfile";
import MyPageInfo from "@src/component/molecules/MyPageInfo/MyPageInfo";
import {
  IconArrowRight,
  IconCircleCamera,
  IconCircleReview,
  IconCircleStar,
  IconSearch2,
} from "@res/index";
import HWTypography from "@src/component/atoms/HWTypography/HWTypography";
import MyPageGNB from "@src/component/organisms/GNB/MyPageGNB";
import CenterWrapper from "@src/component/atoms/CenterWrapper/CenterWrapper";
import MyFootPrints from "@src/component/molecules/MyFootPrints/MyFootPrints";
import { useRef, useState } from "react";

const MyPageHeader = ({ data }: any) => {
  const [isModal, setIsModal] = useState(false);
  const [animation, setAnimation] = useState("");
  const [modalHeight, setModalHeight] = useState(750); // 초기 모달 높이
  const [toggle, setToggle] = useState("star");

  const modalRef = useRef<HTMLDivElement | null>(null);

  const startResize = (downEvent: React.MouseEvent<HTMLDivElement>) => {
    const mouseMoveHandler = (moveEvent: MouseEvent) => {
      const deltaY = moveEvent.clientY - downEvent.clientY;
      const height = modalHeight - deltaY;
      if (height < 200) {
        setAnimation("closeAnimation");
        setTimeout(() => setIsModal(false), 500);
      } else if (height > 900) {
        return;
      } else {
        setModalHeight(height);
      }
    };
    const mouseUpHandler = () => {
      document.removeEventListener("mousemove", mouseMoveHandler);
    };

    document.addEventListener("mousemove", mouseMoveHandler);
    document.addEventListener("mouseup", mouseUpHandler, { once: true });
  };

  return (
    <div className={"mypage-header-wrapper"} css={styled.wrapper}>
      <CenterWrapper>
        <div css={styled.subWrapper}>
          <MyPageProfile user={data.user} />
          <MyPageInfo
            topText={
              <>
                <HWTypography variant={"displayL"} family={"Pretendard-SemiBold"}>
                  {data.report.ratingCount}
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
            setIsModal={setIsModal}
            onClick={() => {
              setAnimation("openAnimation");
              setModalHeight(750);
              setToggle("star");
              setIsModal(true);
            }}
          />
          <MyPageInfo
            topText={
              <>
                <HWTypography variant={"displayL"} family={"Pretendard-SemiBold"}>
                  {data.report.reviewCount}
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
            setIsModal={setIsModal}
            onClick={() => {
              setAnimation("openAnimation");
              setModalHeight(750);
              setToggle("review");
              setIsModal(true);
            }}
          />
          <MyPageInfo
            topText={
              <>
                <HWTypography variant={"displayL"} family={"Pretendard-SemiBold"}>
                  {data.report.avgRating}
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
                <IconSearch2 />
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
      {isModal && (
        <div css={styled.modal(modalHeight, isModal)} className={animation}>
          <div css={[styled.modalWrapper]} ref={modalRef}>
            <div css={styled.heightHandler} onMouseDown={startResize} />
            <CenterWrapper>
              <MyFootPrints toggle={toggle} />
            </CenterWrapper>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPageHeader;
