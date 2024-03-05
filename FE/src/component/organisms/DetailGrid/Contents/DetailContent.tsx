import InformationBox from "@src/component/molecules/InformationBox/InformationBox";
import BoxList from "@src/component/molecules/BoxList/BoxList";
import PersonCardList from "@src/component/molecules/PersonCardList/PersonCardList";
import RatingDetailBox from "@src/component/molecules/RatingDetailBox/RatingDetailBox";
import ReviewCardList from "@src/component/molecules/ReviewCardList/ReviewCardList";
import CenterWrapper from "@src/component/atoms/CenterWrapper/CenterWrapper";
import { useEffect, useState } from "react";
import styled from "./style";
import TrailerCard from "@src/component/atoms/TrailerCard/TrailerCard";
import PhotoCard from "@src/component/atoms/PhotoCard/PhotoCard";
import HWTypography from "@src/component/atoms/HWTypography/HWTypography";
import Color from "@src/common/styles/Color";
import ReviewModifyModal from "@src/component/molecules/ReviewModifyModal/ReviewModifyModal";

const DetailContent = ({ data }: any) => {
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

    const production = data.crew.filter((v: any) => v.job === "Production");
    const crewFilter = data.crew.filter((v: any) => v.job !== "Production");

    setPersonList([...production, ...data.actors, ...crewFilter]);
  }, [data]);

  return (
    <>
      <InformationBox item={data} />
      <CenterWrapper>
        <RatingDetailBox item={data} />
        <ReviewCardList id={data.id} size={6} />
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

export default DetailContent;
