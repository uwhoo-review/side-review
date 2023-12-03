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
import { useState } from "react";
import { getCardURL } from "@src/tools/commonTools";
import { GENRE_ID_NAME } from "@src/variables/CommonConstants";
import PlatformAvatar from "@src/component/molecules/PlatformAvatar/PlatformAvatar";
const InformationBox = ({ item }: any) => {
  const posterURL = getCardURL({ type: "content", srcId: item.poster });

  return (
    <div className={"information-box-wrapper"} css={[styled.wrapper(posterURL)]}>
      <CenterWrapper customCss={styled.centerWrapper}>
        <div css={styled.subWrapper}>
          <div>
            <DefaultImage src={posterURL} width={"276px"} height={"414px"} />
          </div>
          <div className={"grid"} css={styled.rightBox}>
            <div className="col-full">
              <HWTypography variant={"headlineXL"} family={"Pretendard-Bold"}>
                {item.name}
              </HWTypography>
              <div className="grid margin-top-16">
                <div className="col-full">
                  <HWTypography variant={"bodyM"} family={"Poppins"} color={Color.dark.grey800}>
                    {item.name}
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
                    {item.genre.map((v: number) => GENRE_ID_NAME[v]).join(", ")}
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
                    ----
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
                    {item.firstAirDate}
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
                    {item.synopsis}

                  </HWTypography>
                </div>
              </div>
            </div>
          </div>
          <div css={styled.avatarWrapper}>
            <PlatformAvatar list={item.platform} max={3} direction={"right"} size={"60px"} />

            {/*<AvatarGroup css={styled.avatarGroup}>
              <Avatar css={styled.avatar}>
                <IconNetflix />
              </Avatar>
              <Avatar css={styled.avatar}>
                <IconWatcha />
              </Avatar>
              <Avatar css={styled.avatar}>
                <IconNetflix />
              </Avatar>
            </AvatarGroup>*/}
          </div>
        </div>
      </CenterWrapper>
    </div>
  );
};

export default InformationBox;
