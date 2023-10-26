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

const PreviewBox = ({ customCss }: any) => {
  const [rating, setRating] = useState<number | null>(1.5);
  const [detailOpen, setDetailOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  return (
    <CenterWrapper css={styled.centerWrapper}>
      <div className="preview-box-wrapper" css={[styled.wrapper, customCss]}>
        <div css={styled.leftWrapper}>
          <CarouselArrow direction={"left"} />
        </div>
        <div css={styled.contents}>
          <div css={styled.topContents}>
            <div css={styled.leftContents}>
              <iframe
                width="640"
                height="360"
                src="https://www.youtube.com/embed/Sf5xHaa_vxc?si=Yy4QSfD6mpokGb6l"
                title="Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
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
              <div>
                <HWTypography
                  variant={"headlineS"}
                  family={"Pretendard-SemiBold"}
                  color={Color.dark.grey900}
                >
                  제목 <span css={styled.yearSpan}> 2023 </span>
                </HWTypography>
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
                      color={Color.dark.grey500}
                    >
                      3.5
                    </HWTypography>
                    <Divider direction={"v"} />{" "}
                    <HWTypography variant={"bodyS"} family={"Poppins"} color={Color.dark.grey500}>
                      200+
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
                    <Divider direction={"v"} />{" "}
                    <HWTypography variant={"bodyS"} family={"Poppins"} color={Color.dark.grey500}>
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
                    <HWTypography variant={"bodyS"} family={"Poppins"} color={Color.dark.grey500}>
                      슈퍼히어로, 액션, SF스릴러, 느와르, 판타지, 첩보, 로맨스, 어드벤쳐, 휴먼,
                      드라마, 학원
                    </HWTypography>
                  </div>
                </div>
              </div>
              {/*<div className={"grid margin-top-20"}>
                <div className={"col-4"}>
                  <div>
                    <HWTypography variant={"bodyL"} family={"Pretendard-SemiBold"}>
                      시청등급
                    </HWTypography>
                  </div>
                  <div className={"margin-top-8"}>
                    <HWTypography variant={"bodyS"} family={"Poppins"} color={Color.dark.grey500}>
                      청소년 관람 불가
                    </HWTypography>
                  </div>
                </div>
                <div className={"col-4"}>
                  <div>
                    <HWTypography variant={"bodyL"} family={"Pretendard-SemiBold"}>
                      공개 회차
                    </HWTypography>
                  </div>
                  <div className={"margin-top-8"}>
                    <HWTypography variant={"bodyS"} family={"Poppins"} color={Color.dark.grey500}>
                      20부작
                    </HWTypography>
                  </div>
                </div>
                <div className={"col-4"}>
                  <div>
                    <HWTypography variant={"bodyL"} family={"Pretendard-SemiBold"}>
                      공개일
                    </HWTypography>
                  </div>
                  <div className={"margin-top-8"}>
                    <HWTypography variant={"bodyS"} family={"Poppins"} color={Color.dark.grey500}>
                      2023.02.29
                    </HWTypography>
                  </div>
                </div>
              </div>*/}
              <div className={"grid margin-top-20"}>
                <div className={"col-8"}>
                  <div>
                    <HWTypography variant={"bodyL"} family={"Pretendard-SemiBold"}>
                      출연진
                    </HWTypography>
                  </div>

                  <div className={"margin-top-8"}>
                    <HWTypography variant={"bodyS"} family={"Poppins"} color={Color.dark.grey500}>
                      김혜진, 김영은, 김지훈, 노소은, 류고은,류고은,류고은
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
                    <AvatarGroup max={5} css={styled.avatarGroup}>
                      <Avatar css={styled.avatar}>
                        <IconNetflix />
                      </Avatar>
                      <Avatar css={styled.avatar}>
                        <IconWatcha />
                      </Avatar>
                      <Avatar css={styled.avatar}>
                        <IconNetflix />
                      </Avatar>
                    </AvatarGroup>
                  </div>
                </div>
              </div>
              <div className={"grid margin-top-20"}>
                <div className={"col-full"}>
                  <HWTypography variant={"bodyS"} family={"Pretendard"} color={Color.dark.grey500}>
                    초능력을 숨긴 채 현재를 살아가는 아이들과, 과거의 아픈 비밀을 숨긴 채 살아온
                    부모들이 시대와 세대를 넘어 닥치는 거대한 위험에 함께 맞서는 초능력 액션
                    히어로물
                  </HWTypography>
                </div>
              </div>
            </div>
          </div>
          <div css={styled.bottomContents}>
            <ReviewCard best={true} date={"2023.02.29"} line={4}>
              초능력을 숨긴 채 현재를 살아가는 아이들과, 과거의 아픈 비밀을 숨긴 채 살아온 부모들이
              시대와 세대를 넘어 닥치는 거대한 위험에 함께 맞서는 초능력 액션 히어로물. 초능력을
              숨긴 채 현재를 살아가는 아이들과, 과거의 아픈 비밀을 숨긴 채 살아온 부모들이 시대와
              세대를 넘어 닥치는 거
              블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라블라
            </ReviewCard>
            <ReviewCard best={false} date={"2023.02.29"} line={4}>
              asd
            </ReviewCard>
            <ReviewCard best={false} date={"2023.02.29"} line={4}>
              asd
            </ReviewCard>
          </div>
        </div>
        <div css={styled.rightWrapper}>
          <CarouselArrow direction={"right"} />
        </div>
      </div>
    </CenterWrapper>
  );
};

export default PreviewBox;
