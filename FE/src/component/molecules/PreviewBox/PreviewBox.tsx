import ReviewCard from "@src/component/atoms/ReviewCard/ReviewCard";
import CarouselArrow from "@src/component/atoms/CarouselArrow/CarouselArrow";
import Divider from "@src/component/atoms/Divider/Divider";
import HWTypography from "@src/component/atoms/HWTypography/HWTypography";
import {
  IconLaunch,
  IconNetflix,
  IconRating,
  IconRatingEmpty,
  IconStar,
  IconWatcha,
} from "@res/index";
import Color from "@src/common/styles/Color";
import { Avatar, AvatarGroup, Modal, Rating } from "@mui/material";
import styled from "./style";
import CenterWrapper from "@src/component/atoms/CenterWrapper/CenterWrapper";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { VIDEO_URL } from "@src/variables/tmdbConstants";
import { ContentProps } from "@src/interfaces/api.interface";
import { SerializedStyles } from "@emotion/react";
import HWChip from "@src/component/atoms/HWChip/HWChip";
import HWAvatarGroup from "@src/component/atoms/HWAvatarGroup/HWAvatarGroup";
import HWAvatar from "@src/component/atoms/HWAvatar/HWAvatar";
import { getCardURL } from "@src/tools/commonTools";
import PlatformAvatar from "@src/component/molecules/PlatformAvatar/PlatformAvatar";

interface PreviewBoxProps {
  item: ContentProps;
  onPrev: () => void;
  onNext: () => void;
  customCss?: SerializedStyles;
}

const PreviewBox = ({ item, customCss, onPrev, onNext }: PreviewBoxProps) => {
  const [rating, setRating] = useState<number | null>(1.5);
  const [detailOpen, setDetailOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  return (
    <div css={styled.centerWrapper}>
      <CenterWrapper>
        <div className="preview-box-wrapper" css={[styled.wrapper, customCss]}>
          {/*<div css={styled.leftWrapper}>
            <CarouselArrow direction={"left"} onClick={onPrev} />
          </div>*/}
          <div css={styled.contents}>
            <div css={styled.topContents}>
              <div css={styled.leftContents}>
                <iframe
                  width="100%"
                  height="100%"
                  src={getCardURL({ type: "trailer", srcId: item.trailer[0] })}
                  title="Video"
                  allowFullScreen
                />
              </div>
              <div css={styled.rightContents}>
                <IconLaunch
                  css={styled.launch}
                  onClick={() => {
                    setDetailOpen(!detailOpen);
                    navigate("/detail");
                  }}
                />
                <div className={"flex flex-align-center"}>
                  <HWTypography
                    variant={"headlineS"}
                    family={"Pretendard-SemiBold"}
                    color={Color.dark.grey900}
                    css={styled.typoTitle}
                  >
                    {item.name}
                  </HWTypography>
                  <HWTypography
                    variant={"bodyXL"}
                    family={"Poppins"}
                    color={Color.dark.grey500}
                    css={styled.typoYear}
                  >
                    {new Date(item.firstAirDate).getFullYear()}
                  </HWTypography>
                  <HWChip variant={"text"} color={"age"} label={item.age} css={styled.chipAge} />
                </div>
                <div className={"grid margin-top-16"}>
                  <div className={"col-4"}>
                    <div>
                      <HWTypography variant={"bodyL"} family={"Pretendard-SemiBold"}>
                        평균 별점
                      </HWTypography>
                    </div>
                    <div className={"margin-top-8 flex flex-align-center gap-10"}>
                      <IconStar css={styled.icons} />
                      <HWTypography
                        variant={"headlineXXS"}
                        family={"Pretendard-SemiBold"}
                        color={Color.dark.grey900}
                      >
                        {item.rating}
                      </HWTypography>
                      <Divider direction={"v"} length={"14px"} />{" "}
                      <HWTypography variant={"bodyS"} family={"Poppins"} color={Color.dark.grey500}>
                        @TODO 평점
                      </HWTypography>
                    </div>
                  </div>
                  <div className={"col-8"}>
                    <div>
                      <HWTypography variant={"bodyL"} family={"Pretendard-SemiBold"}>
                        내 별점
                      </HWTypography>
                    </div>
                    <div className={"margin-top-12 flex flex-align-center gap-10"}>
                      <Rating
                        name="rating-value"
                        value={rating}
                        max={5}
                        precision={0.5}
                        onChange={(e, val) => {
                          setRating(val);
                        }}
                        css={styled.rating}
                        emptyIcon={<IconRatingEmpty />}
                        icon={<IconRating />}
                      />
                      <Divider direction={"v"} length={"14px"} />{" "}
                      <HWTypography
                        variant={"bodyS"}
                        family={"Pretendard"}
                        color={Color.dark.grey500}
                      >
                        별점을 매겨주세요!
                      </HWTypography>
                    </div>
                  </div>
                </div>
                <Divider className={"margin-top-24"} />
                <div className={"grid margin-top-16"}>
                  <div className={"col-full"}>
                    <div>
                      <HWTypography variant={"bodyL"} family={"Pretendard-SemiBold"}>
                        장르
                      </HWTypography>
                    </div>
                    <div className={"margin-top-8"}>
                      <HWTypography
                        variant={"bodyS"}
                        family={"Pretendard"}
                        color={Color.dark.grey500}
                      >
                        {item.genre?.join(", ")}
                      </HWTypography>
                    </div>
                  </div>
                </div>
                <div className={"grid margin-top-20"}>
                  <div className={"col-8"}>
                    <div>
                      <HWTypography variant={"bodyL"} family={"Pretendard-SemiBold"}>
                        출연진
                      </HWTypography>
                    </div>

                    <div className={"margin-top-8"}>
                      <HWTypography
                        variant={"bodyS"}
                        family={"Pretendard"}
                        color={Color.dark.grey500}
                      >
                        {item.actors?.join(",")}
                      </HWTypography>
                    </div>
                  </div>
                  <div className={"col-4"}>
                    <div>
                      <HWTypography variant={"bodyL"} family={"Pretendard-SemiBold"}>
                        작품 제공 서비스
                      </HWTypography>
                    </div>
                    <div className={"margin-top-8"}>
                      <PlatformAvatar list={item.platform} max={3} />
                    </div>
                  </div>
                </div>
                <div className={"grid margin-top-20"}>
                  <div className={"col-full"}>
                    <HWTypography
                      variant={"bodyS"}
                      family={"Pretendard"}
                      color={Color.dark.grey500}
                      css={styled.synopsis}
                    >
                      {item.synopsis}
                    </HWTypography>
                  </div>
                </div>
              </div>
            </div>
            <div css={styled.bottomContents}>
              <ReviewCard best={true} date={"2023.02.29"} line={4} useModal={true}>
                초능력을 숨긴 채 현재를 살아가는 아이들과, 과거의 아픈 비밀을 숨긴 채 살아온
                부모들이 시대와 세대를 넘어 닥치는 거대한 위험에 함께 맞서는 초능력 액션 히어로물.
                초능력을 숨긴 채 현재를 살아가는 아이들과, 과거의 아픈 비밀을 숨긴 채 살아온
                부모들이 시대와 세대를 넘어 닥치는 거
                블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라
              </ReviewCard>
              <ReviewCard best={false} date={"2023.02.29"} line={4} useModal={true}>
                asd
              </ReviewCard>
              <ReviewCard best={false} date={"2023.02.29"} line={4} useModal={true}>
                asd
              </ReviewCard>
            </div>
          </div>
          {/*<div css={styled.rightWrapper}>
            <CarouselArrow direction={"right"} onClick={onNext} />
          </div>*/}
        </div>
      </CenterWrapper>
    </div>
  );
};

export default PreviewBox;
