import styled from "./style";
import CenterWrapper from "@src/component/atoms/CenterWrapper/CenterWrapper";
import bg1 from "@res/background/bg_moving.png";
import {
  card1,
  IconMark150,
  IconNetflix,
  IconRating,
  IconRatingEmpty,
  IconStar,
  IconWatcha,
} from "@res/index";
import DefaultImage from "@src/component/atoms/DefaultImage/DefaultImage";
import HWTypography from "@src/component/atoms/HWTypography/HWTypography";
import { Avatar, AvatarGroup, Rating } from "@mui/material";
import Color from "@src/common/styles/Color";
import HWButton from "@src/component/atoms/HWButton/HWButton";
import Divider from "@src/component/atoms/Divider/Divider";
import { useState } from "react";
import { getCardURL, getYYYYMMDDFormat } from "@src/tools/commonTools";
import { GENRE_ID_NAME } from "@src/variables/CommonConstants";
import PlatformAvatar from "@src/component/molecules/PlatformAvatar/PlatformAvatar";
import HWOutlinedSelectBox from "@src/component/atoms/HWOutlinedSelectBox";
import { useNavigate } from "react-router-dom";
const InformationBox = ({ item }: any) => {
  const navigate = useNavigate();
  const posterURL = getCardURL({ type: "content", srcId: item.poster });
  const photoURL = getCardURL({ type: "photo", srcId: item.photo[0] });

  return (
    <div className={"information-box-wrapper"} css={[styled.wrapper(photoURL)]}>
      <CenterWrapper customCss={styled.centerWrapper}>
        <div css={styled.subWrapper}>
          <div css={styled.leftBox}>
            <DefaultImage src={posterURL} width={"276px"} height={"414px"} />
            {item.favorite && <img src={IconMark150} css={styled.markImg} />}
          </div>
          <div className={"grid"} css={styled.rightBox}>
            <div className="col-full">
              <div css={styled.titleWrapper}>
                <HWTypography variant={"headlineXL"} family={"Pretendard-Bold"}>
                  {item.name}
                  {item.season.list.length > 1 &&
                    (" : " + item.season.list.find((v: any) => v.id === item.id).name || "")}
                </HWTypography>
                {item.season.list.length > 1 && (
                  <HWOutlinedSelectBox
                    width={"100px"}
                    value={item.id}
                    onChange={(e) => {
                      const value = e.target.value;
                      navigate("/detail/" + value);
                    }}
                    disablePortal={true}
                    customCss={styled.selectBox}
                  >
                    {item.season.list.map((v: any, i: number) => {
                      return (
                        <HWOutlinedSelectBox.Item key={v.id} value={v.id}>
                          {`시즌 ${i + 1}`}
                        </HWOutlinedSelectBox.Item>
                      );
                    })}
                  </HWOutlinedSelectBox>
                )}
              </div>
              <div className="grid margin-top-16">
                <div className="col-full">
                  <HWTypography variant={"bodyM"} family={"Poppins"} color={Color.dark.grey800}>
                    {item.originalName}
                  </HWTypography>
                </div>
                <div className="col-full">
                  <HWTypography variant={"bodyM"} family={"Poppins"} color={Color.dark.grey800}>
                    {`${new Date(item.date).getFullYear()} ∙ ${item?.originCountry[0]}`}
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
                    {item.age}
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
                    {item.episodeCnt}부작
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
                    {getYYYYMMDDFormat(new Date(item.date), "comma") || "-"}
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
                    {item.directors.length > 1
                      ? `${item.directors[0]} 외 ${item.directors.length - 1}명`
                      : item.directors.toString() || "-"}
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
                    {item?.synopsis || "-"}
                  </HWTypography>
                </div>
              </div>
            </div>
          </div>
          <div css={styled.avatarWrapper}>
            <PlatformAvatar list={item.platform} max={3} direction={"right"} size={"60px"} />
          </div>
        </div>
      </CenterWrapper>
    </div>
  );
};

export default InformationBox;
