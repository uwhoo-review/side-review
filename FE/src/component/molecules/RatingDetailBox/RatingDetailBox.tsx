import styled from "./style";
import CenterWrapper from "@src/component/atoms/CenterWrapper/CenterWrapper";
import HWTypography from "@src/component/atoms/HWTypography/HWTypography";
import { IconRating, IconRatingEmpty, IconStar } from "@res/index";
import Color from "@src/common/styles/Color";
import Divider from "@src/component/atoms/Divider/Divider";
import HWButton from "@src/component/atoms/HWButton/HWButton";
import { Rating } from "@mui/material";
import {useState} from "react";

const RatingDetailBox = () => {
  const [rating, setRating] = useState<number | null>(1.5);

  return (
    <div>
      <CenterWrapper>
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
                <Divider direction={"v"} />{" "}
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
                <Divider direction={"v"} />{" "}
                <HWTypography variant={"bodyS"} family={"Poppins"} color={Color.dark.grey500}>
                  별점을 매겨주세요!
                </HWTypography>
              </div>
            </div>
          </div>
          <div css={styled.btnGroups}>
            <HWButton variant={"lower"}>링크 공유</HWButton>
            <HWButton>리뷰 쓰기</HWButton>
          </div>
        </div>
      </CenterWrapper>
    </div>
  );
};

export default RatingDetailBox;
