import styled from "./style";
import CenterWrapper from "@src/component/atoms/CenterWrapper/CenterWrapper";
import bg1 from "@res/background/bg_moving.png";
import { card1, IconNetflix, IconRating, IconRatingEmpty, IconStar, IconWatcha } from "@res/index";
import DefaultImage from "@src/component/atoms/DefaultImage/DefaultImage";
import HWTypography from "@src/component/atoms/HWTypography/HWTypography";
import { Avatar, AvatarGroup, Rating } from "@mui/material";
import Color from "@src/common/styles/Color";
import HWButton from "@src/component/atoms/HWButton/HWButton";
import Divider from "@src/component/atoms/Divider/Divider";
import {useState} from "react";
const InformationBox = ({ url = bg1 }: any) => {

  return (
    <div className={"information-box-wrapper"} css={[styled.wrapper(url)]}>
      <CenterWrapper customCss={styled.centerWrapper}>
        <div css={styled.subWrapper}>
          <div>
            <DefaultImage src={card1} width={"276px"} height={"414px"} />
          </div>
          <div className={"grid"} css={styled.rightBox}>
            <div className="col-full">
              <HWTypography variant={"headlineXL"} family={"Pretendard-Bold"}>
                무빙
              </HWTypography>
              <div className="grid margin-top-16">
                <div className="col-full">
                  <HWTypography variant={"bodyM"} family={"Poppins"} color={Color.dark.grey800}>
                    무빙
                  </HWTypography>
                </div>
                <div className="col-full">
                  <HWTypography variant={"bodyM"} family={"Poppins"} color={Color.dark.grey800}>
                    2023 ∙ Disney+ ∙ 한국
                  </HWTypography>
                </div>
              </div>
              <div className="grid margin-top-40">
                <div className="col-full">
                  <HWTypography variant={"bodyXL"} family={"Pretendard-SemiBold"}>
                    장르
                  </HWTypography>
                </div>
                <div className="col-full">
                  <HWTypography variant={"bodyM"} family={"Pretendard"} color={Color.dark.grey700}>
                    슈퍼히어로, 액션, SF스릴러, 느와르, 판타지, 첩보, 로맨스, 어드벤쳐, 휴먼,
                    드라마, 학원, 초능력
                  </HWTypography>
                </div>
              </div>
              <div className="grid margin-top-20">
                <div className="col-3">
                  <HWTypography
                    className={"block"}
                    variant={"bodyXL"}
                    family={"Pretendard-SemiBold"}
                  >
                    시청등급
                  </HWTypography>
                  <HWTypography
                    className={"block"}
                    variant={"bodyM"}
                    family={"Pretendard"}
                    color={Color.dark.grey700}
                  >
                    청소년 관람 불가
                  </HWTypography>
                </div>
                <div className="col-3">
                  <HWTypography
                    className={"block"}
                    variant={"bodyXL"}
                    family={"Pretendard-SemiBold"}
                  >
                    공개 회차
                  </HWTypography>
                  <HWTypography
                    className={"block"}
                    variant={"bodyM"}
                    family={"Pretendard"}
                    color={Color.dark.grey700}
                  >
                    20부작
                  </HWTypography>
                </div>
                <div className="col-3">
                  <HWTypography
                    className={"block"}
                    variant={"bodyXL"}
                    family={"Pretendard-SemiBold"}
                  >
                    공개일
                  </HWTypography>
                  <HWTypography
                    className={"block"}
                    variant={"bodyM"}
                    family={"Pretendard"}
                    color={Color.dark.grey700}
                  >
                    2023.02.29
                  </HWTypography>
                </div>
                <div className="col-3">
                  <HWTypography
                    className={"block"}
                    variant={"bodyXL"}
                    family={"Pretendard-SemiBold"}
                  >
                    감독
                  </HWTypography>
                  <HWTypography
                    className={"block"}
                    variant={"bodyM"}
                    family={"Pretendard"}
                    color={Color.dark.grey700}
                  >
                    누구게
                  </HWTypography>
                </div>
              </div>
              <div className="grid margin-top-20">
                <div className="col-full">
                  <HWTypography
                    className={"block"}
                    variant={"bodyXL"}
                    family={"Pretendard-SemiBold"}
                  >
                    시놉시스
                  </HWTypography>
                </div>
                <div className="col-full">
                  <HWTypography
                    className={"block"}
                    variant={"bodyM"}
                    family={"Pretendard"}
                    color={Color.dark.grey700}
                  >
                    사랑이 싹트는 계절, 새로 문을 여는 쇼핑몰. 생기 넘치는 1985년 호킨스. 하지만
                    광란의 쥐 떼가 질주하면서 어둠이 입을 벌린다. 이번 여름, 모든 것이 기묘해진다.
                  </HWTypography>
                </div>
              </div>
            </div>
          </div>
          <div css={styled.avatarWrapper}>
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
      </CenterWrapper>
    </div>
  );
};

export default InformationBox;
