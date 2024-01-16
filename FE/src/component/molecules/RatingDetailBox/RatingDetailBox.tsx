import styled from "./style";
import CenterWrapper from "@src/component/atoms/CenterWrapper/CenterWrapper";
import HWTypography from "@src/component/atoms/HWTypography/HWTypography";
import { IconLink, IconRating, IconRatingEmpty, IconStar, IconWrite } from "@res/index";
import Color from "@src/common/styles/Color";
import Divider from "@src/component/atoms/Divider/Divider";
import HWButton from "@src/component/atoms/HWButton/HWButton";
import { Rating } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import ReviewModal from "@src/component/molecules/ReviewModal/ReviewModal";
import { useLocation } from "react-router-dom";
import { useCommon } from "@src/providers/CommonProvider";
import { UWAxios } from "@src/common/axios/AxiosConfig";

const RatingDetailBox = ({ item }: any) => {
  const [rating, setRating] = useState<number | null>(0);
  const [dialog, setDialog] = useState(false);
  const location = useLocation();
  const commonContext = useCommon();

  const handleCopyClipBoard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      commonContext.onAlert({
        is: true,
        children: <>링크가 클립보드에 복사되었습니다.</>,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleChangeRating = async (e: SyntheticEvent, val: number | null) => {
    if (val) {
      const data = {
        contentId: item.id,
        rating: val,
      };
      if (rating === 0) {
        setRating(val);
        //rating 없을때
        console.log("추가");
        const res = await UWAxios.star.postStart(data.contentId, data);
      } else {
        console.log("변경");
        // const res = await UWAxios.star.putStart(data.contentId, data);
      }
    }
  };

  const handleClearRating = async (id: string) => {
    const res = await UWAxios.star.deleteStart(id);
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
              <IconStar css={styled.star} />
              <HWTypography
                variant={"headlineS"}
                family={"Pretendard-SemiBold"}
                color={Color.dark.grey900}
              >
                {item.rating}
              </HWTypography>
              <Divider direction={"v"} length={"14px"} />
              <HWTypography variant={"bodyS"} family={"Poppins"} color={Color.dark.grey500}>
                {item.totalRating > 200 ? "200+" : item.totalRating}
              </HWTypography>
            </div>
          </div>
          <div css={styled.ratingBox}>
            <HWTypography variant={"headlineXS"} family={"Pretendard-SemiBold"}>
              내 별점
            </HWTypography>
            <div className={"margin-top-12 flex flex-align-center gap-10"}>
              {/*<div css={styled.clear} onClick={}>*/}
              {/*  -*/}
              {/*</div>*/}
              <Rating
                name="rating-value"
                value={rating}
                max={5}
                precision={0.5}
                css={styled.rating}
                emptyIcon={<IconRatingEmpty style={{ marginLeft: "4px", marginRight: "4px" }} />}
                icon={<IconRating style={{ marginLeft: "4px", marginRight: "4px" }} />}
                onChange={handleChangeRating}
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
            onClick={() => handleCopyClipBoard(`${window.location.href}`)}
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
      <ReviewModal width={"800px"} open={dialog} onClose={() => setDialog(false)} item={item} />
    </div>
  );
};

export default RatingDetailBox;
