import styled from "./style";
import WrapperTitle from "@src/component/atoms/WrapperTitle/WrapperTitle";
import CenterWrapper from "@src/component/atoms/CenterWrapper/CenterWrapper";
import { useEffect, useState } from "react";
import ContentCard from "@src/component/atoms/ContentCard/ContentCard";
import HWTypography from "@src/component/atoms/HWTypography/HWTypography";
import Color from "@src/common/styles/Color";
import { card1, card3, IconChevronDoubleDown } from "@res/index";
import { useNavigate } from "react-router-dom";
const PersonContent = ({ data }: any) => {
  const navigate = useNavigate();

  const [cast, setCast] = useState<any>([]);
  const [crew, setCrew] = useState<any>([]);

  const [castCnt, setCastCnt] = useState(6);

  useEffect(() => {
    setCast(data.cast);
  }, []);

  return (
    <div className={"search-content-wrapper"} css={styled.wrapper}>
      <CenterWrapper>
        <WrapperTitle title={"출연"} subTitle={cast.length} customCss={styled.subTitle} />
        <div css={styled.subWrapper}>
          <>
            <div css={styled.sub1}>
              {cast.slice(0, castCnt).map((v: any) => (
                <ContentCard
                  id={v.contentId}
                  key={v.contentId}
                  className={`image-card`}
                  srcId={v.poster}
                  contentName={v.contentName}
                  platform={v.platform}
                  date={v.year}
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/detail/${v.id}`);
                  }}
                  active
                />
              ))}
            </div>
            <div
              css={styled.plusBtn}
              onClick={() => {
                setCastCnt((prev) => prev + 6);
              }}
            >
              <HWTypography
                variant={"headlineXXS"}
                family={"Pretendard-SemiBold"}
                color={Color.dark.primary800}
              >
                더보기
              </HWTypography>
              <IconChevronDoubleDown />
            </div>
          </>
        </div>
      </CenterWrapper>
      <CenterWrapper>
        <WrapperTitle title={"제작"} subTitle={crew.length} customCss={styled.subTitle} />
        <div css={styled.subWrapper}>
          <>
            <div css={styled.sub1}>
              {/*{crew.slice(0, 6).map((v: any) => (
                <ContentCard
                  id={v.id}
                  key={v.id}
                  className={`image-card`}
                  srcId={v.poster}
                  contentName={v.name}
                  platform={v.platform}
                  age={v.age}
                  year={v.year}
                  rating={v.rating}
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/detail/${v.id}`);
                  }}
                  active
                />
              ))}*/}
            </div>
            <div
              css={styled.plusBtn}
              onClick={() => {
                setCastCnt((prev) => prev + 6);
              }}
            >
              <HWTypography
                variant={"headlineXXS"}
                family={"Pretendard-SemiBold"}
                color={Color.dark.primary800}
              >
                더보기
              </HWTypography>
              <IconChevronDoubleDown />
            </div>
          </>
        </div>
      </CenterWrapper>
    </div>
  );
};

export default PersonContent;
