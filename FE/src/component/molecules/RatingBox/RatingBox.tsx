import HWTypography from "@src/component/atoms/HWTypography/HWTypography";
import { IconArrowRight, IconCircleCheck, IconInit, IconRating, IconRatingEmpty } from "@res/index";
import Divider from "@src/component/atoms/Divider/Divider";
import Color from "@src/common/styles/Color";
import { SyntheticEvent, useEffect, useState } from "react";
import styled from "./style";
import { Rating } from "@mui/material";
import { useCommon } from "@src/providers/CommonProvider";
import { UWAxios } from "@src/common/axios/AxiosConfig";
import HWIconButton from "@src/component/atoms/HWIconButton/HWIconButton";
import HWTooltip from "@src/component/atoms/HWTooltip/HWTooltip";
import { useNavigate } from "react-router-dom";

const RatingBox = ({ contentId, userRating, ratingSize = "30px" }: any) => {
  const [rating, setRating] = useState<number>(0);
  const [clearHover, setClearHover] = useState<boolean>(false);
  const commonContext = useCommon();
  const navigate = useNavigate();

  const handleChangeRating = async (e: SyntheticEvent, val: number | null) => {
    if (val) {
      const data = {
        contentId: contentId,
        rating: val,
      };
      if (rating === 0) {
        //rating 없을때
        const res = await UWAxios.star.postStart(data.contentId, data);
        setRating(val);
        commonContext.onAlert({
          is: true,
          type: "success",
          disableCloseIcon: false,
          title: "평가 완료!",
          children: (
            <>
              <div>작품에 내 별점이 반영되었습니다.</div>
            </>
          ),
          width: "400px",
        });
      } else {
        const res = await UWAxios.star.putStart(data.contentId, data);
        setRating(val);
        commonContext.onAlert({
          is: true,
          type: "success",
          disableCloseIcon: false,
          title: "평가 완료!",
          children: (
            <>
              <div>작품에 내 별점이 반영되었습니다.</div>
            </>
          ),
          width: "400px",
        });
      }
    }
  };

  const handleClearRating = async () => {
    const res = await UWAxios.star.deleteStart(contentId);
    setRating(0);
    commonContext.onAlert({
      is: true,
      type: "success",
      disableCloseIcon: false,
      title: "평가 취소",
      children: (
        <>
          <div>작품에 내 별점이 취소되었습니다.</div>
        </>
      ),
      width: "400px",
    });
  };

  useEffect(() => {
    setRating(userRating);
  }, [userRating]);

  return (
    <div css={styled.wrapper}>
      {/*<HWTooltip title={"Clear"}>*/}
      <HWIconButton
        onClick={handleClearRating}
        onMouseOver={() => setClearHover(true)}
        onMouseOut={() => setClearHover(false)}
        customCss={styled.clear}
        disabled={userRating === 0}
      >
        <IconInit />
      </HWIconButton>
      {/*</HWTooltip>*/}
      <Rating
        name="rating-value"
        value={clearHover ? 0 : rating}
        max={5}
        precision={0.5}
        css={styled.rating(ratingSize)}
        emptyIcon={<IconRatingEmpty style={{ marginLeft: "3px", marginRight: "3px" }} />}
        icon={<IconRating style={{ marginLeft: "3px", marginRight: "3px" }} />}
        onChange={handleChangeRating}
        disabled={!commonContext.isLogin && rating !== 0}
      />
      <Divider direction={"v"} length={"14px"} />
      <HWTypography variant={"bodyS"} family={"Pretendard"} color={Color.dark.grey500}>
        {rating === 0 ? (
          "별점을 매겨주세요!"
        ) : (
          <div css={styled.ratingFlex}>
            <IconCircleCheck />
            평가를 완료했어요!
          </div>
        )}
      </HWTypography>
    </div>
  );
};

export default RatingBox;

{
  /*            <div css={styled.alertBtnGroup}>
              <HWTypography variant={"bodyXS"} color={"#9897A1"} customCss={styled.typo} onClick={() => handleClearRating()}>반영취소</HWTypography>
              <span css={styled.alertBtn2} onClick={() => {
                navigate(`/detail/${contentId}`);
                commonContext.onResetAlert();
              }}>
            <HWTypography variant={"bodyXS"} family={"Pretendard-SemiBold"} color={"#000"}>상세 페이지 바로가기</HWTypography>
            <IconArrowRight />
          </span>
            </div>*/
}
