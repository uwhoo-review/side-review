import styled from "./style";
import ContentCard from "@src/component/atoms/ContentCard/ContentCard";
import { useState } from "react";
import CarouselArrow from "@src/component/atoms/CarouselArrow/CarouselArrow";
import CenterWrapper from "@src/component/atoms/CenterWrapper/CenterWrapper";
import PersonCard from "@src/component/atoms/PersonCard/PersonCard";
import WrapperTitle from "@src/component/atoms/WrapperTitle/WrapperTitle";
import HWTypography from "@src/component/atoms/HWTypography/HWTypography";
import Color from "@src/common/styles/Color";
import {useNavigate} from "react-router-dom";
interface PersonCardListProps {
  title?: string;
  cardList?: any;
}
const PersonCardList = ({ title, cardList }: PersonCardListProps) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const TOTAL_LIST = cardList.length;
  const MOVE = 10;
  const TOTAL_PAGE = Math.ceil((TOTAL_LIST - 10) / MOVE) + 1;

  const onPrevHandler = () => {
    if (currentPage == 1) {
      setCurrentPage(1);
    } else {
      setCurrentPage(currentPage - 1);
    }
  };

  const onNextHandler = () => {
    if (currentPage == TOTAL_PAGE) {
      setCurrentPage(TOTAL_PAGE);
    } else {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div css={styled.wrapper}>
      {title && <WrapperTitle title={title} />}
      {cardList.length === 0 && (
        <div css={styled.emptyWrapper}>
          <HWTypography variant={"bodyL"} family={"Pretendard-SemiBold"} color={Color.dark.grey500}>
            출연 ∙ 제작 정보를 준비 중입니다.
          </HWTypography>
        </div>
      )}
      {cardList.length !== 0 && (
        <div css={styled.sliderWrapper(currentPage, TOTAL_PAGE)}>
          <CarouselArrow
            className={"hover-arrow left"}
            direction={"left"}
            customCss={styled.leftPageBtn}
            onClick={onPrevHandler}
          />
          <div className={"image-card-list"} css={styled.slider}>
            <div css={styled.grid(currentPage)}>
              {cardList.map((v: any, i: number) => {
                return (
                  <PersonCard
                    id={v.id}
                    name={v.name}
                    subName={v?.role || v?.job}
                    srcId={v.profilePath}
                    className={"image-card"}
                    key={i}
                    customCss={styled.card}
                    onClick={() => {
                      navigate(`/person/${v.id}`);
                    }}
                  />
                );
              })}
            </div>
          </div>
          <CarouselArrow
            className={"hover-arrow right"}
            direction={"right"}
            customCss={styled.rightPageBtn}
            onClick={onNextHandler}
          />
        </div>
      )}
    </div>
  );
};

export default PersonCardList;
