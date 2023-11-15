import styled from "./style";
import CenterWrapper from "@src/component/atoms/CenterWrapper/CenterWrapper";
import HWTypography from "@src/component/atoms/HWTypography/HWTypography";
import { IconLink, IconRating, IconRatingEmpty, IconStar, IconWrite } from "@res/index";
import Color from "@src/common/styles/Color";
import Divider from "@src/component/atoms/Divider/Divider";
import HWButton from "@src/component/atoms/HWButton/HWButton";
import { Rating } from "@mui/material";
import { useState } from "react";
import ReviewModal from "@src/component/molecules/ReviewModal/ReviewModal";
import { useLocation } from "react-router-dom";

const RatingDetailBox = () => {
  const [rating, setRating] = useState<number | null>(1.5);
  const [dialog, setDialog] = useState(false);
  const location = useLocation();

  const handleCopyClipBoard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("클립보드에 링크가 복사되었어요.");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div css={styled.wrapper}>
      <div css={styled.inputGroups}>
        <div css={styled.ratingGroups}>
          <div css={styled.ratingBox}>
            <HWTypography variant={"headlineXS"} family={"Pretendard-SemiBold"}>
              평균 별점
            </HWTypography>
            <div className={"margin-top-12 flex flex-align-center gap-10"}>
              <Rating
                name="rating-value"
                value={3.5}
                max={5}
                precision={0.5}
                css={styled.rating}
                emptyIcon={<IconRatingEmpty />}
                icon={<IconStar />}
                readOnly={true}
                // getLabelText={(value) => value.toString()}
              />
              <HWTypography
                variant={"headlineXXS"}
                family={"Pretendard-SemiBold"}
                color={Color.dark.grey900}
              >
                3.5
              </HWTypography>
              <Divider direction={"v"} length={"14px"} />
              <HWTypography variant={"bodyS"} family={"Poppins"} color={Color.dark.grey500}>
                200+
              </HWTypography>
            </div>
          </div>
          <div css={styled.ratingBox}>
            <HWTypography variant={"headlineXS"} family={"Pretendard-SemiBold"}>
              내 별점
            </HWTypography>
            <div className={"margin-top-12 flex flex-align-center gap-10"}>
              <Rating
                name="rating-value"
                value={rating}
                max={5}
                precision={0.5}
                css={styled.rating}
                emptyIcon={<IconRatingEmpty />}
                icon={<IconRating />}
                onChange={(e, val) => {
                  setRating(val);
                }}
              />
              <Divider direction={"v"} length={"14px"} />
              <HWTypography variant={"bodyS"} family={"Poppins"} color={Color.dark.grey500}>
                별점을 매겨주세요!
              </HWTypography>
            </div>
          </div>
        </div>
        <div css={styled.btnGroups}>
          <HWButton
            variant={"lower"}
            onClick={() => handleCopyClipBoard(`${location.pathname}`)}
            // customCss={styled.btn1}
          >
            <IconLink /> 링크 공유
          </HWButton>
          <HWButton
            variant={"primary"}
            onClick={() => setDialog(true)}
            // customCss={styled.btn2}
          >
            <IconWrite />
            리뷰 쓰기
          </HWButton>
        </div>
      </div>
      <ReviewModal width={"800px"} open={dialog} onClose={() => setDialog(false)} />
    </div>
  );
};

export default RatingDetailBox;
