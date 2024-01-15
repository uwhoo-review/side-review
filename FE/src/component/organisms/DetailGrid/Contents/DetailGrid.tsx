import InformationBox from "@src/component/molecules/InformationBox/InformationBox";
import BoxList from "@src/component/molecules/BoxList/BoxList";
import img1 from "@res/temp/img1.png";
import img2 from "@res/temp/img2.png";
import img3 from "@res/temp/img3.png";
import img4 from "@res/temp/img4.png";
import DefaultImage from "@src/component/atoms/DefaultImage/DefaultImage";
import PersonCardList from "@src/component/molecules/PersonCardList/PersonCardList";
import RatingDetailBox from "@src/component/molecules/RatingDetailBox/RatingDetailBox";
import ReviewCardList from "@src/component/molecules/ReviewCardList/ReviewCardList";
import WrapperTitle from "@src/component/atoms/WrapperTitle/WrapperTitle";
import CenterWrapper from "@src/component/atoms/CenterWrapper/CenterWrapper";
import { useEffect, useState } from "react";
import styled from "./style";
import TrailerCard from "@src/component/atoms/TrailerCard/TrailerCard";
import PhotoCard from "@src/component/atoms/PhotoCard/PhotoCard";
import HWTypography from "@src/component/atoms/HWTypography/HWTypography";
import Color from "@src/common/styles/Color";

interface DetailGridProps {}

const DetailGrid = ({ data }: any) => {
  const [dialog, setDialog] = useState<any>(null);
  const [trailerList, setTrailerList] = useState<any>([]);
  const [photoList, setphotoList] = useState<any>([]);
  const [personList, setPersonList] = useState<any>([]);

  useEffect(() => {
    setTrailerList(
      data.trailer.map((v: any, i: number) => (
        <TrailerCard key={v} srcId={v} size={"maxresdefault"} idx={i} trailerList={data.trailer} />
      ))
    );
    setphotoList(
      data.photo.map((v: any, i: number) => (
        <PhotoCard key={v} srcId={v} idx={i} photoList={data.photo} />
      ))
    );

    const production = data.crew.find((v: any) => v.job === "Production");
    const crewFilter = data.crew.filter((v: any) => v.job !== "Production");

    setPersonList([production, ...data.acting, ...crewFilter]);
  }, [data]);

  return (
    <>
      <InformationBox item={data} />
      <CenterWrapper>
        <RatingDetailBox item={data} />
        <ReviewCardList total={false} size={6} item={data} />
        <PersonCardList title={"출연 ∙ 제작"} cardList={[...personList]} />
        <BoxList
          title={"트레일러"}
          boxList={trailerList}
          EmptyComponent={
            <div css={styled.emptyWrapper}>
              <HWTypography
                variant={"bodyL"}
                family={"Pretendard-SemiBold"}
                color={Color.dark.grey500}
              >
                트레일러 영상을 준비중입니다.
              </HWTypography>
            </div>
          }
        />
        <BoxList
          title={"포토"}
          boxList={photoList}
          EmptyComponent={
            <div css={styled.emptyWrapper}>
              <HWTypography
                variant={"bodyL"}
                family={"Pretendard-SemiBold"}
                color={Color.dark.grey500}
              >
                이미지를 준비중입니다.
              </HWTypography>
            </div>
          }
        />
      </CenterWrapper>
    </>
  );
};

export default DetailGrid;
