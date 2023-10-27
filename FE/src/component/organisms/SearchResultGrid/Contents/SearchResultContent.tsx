import styled from "./style";
import WrapperTitle from "@src/component/atoms/WrapperTitle/WrapperTitle";
import CenterWrapper from "@src/component/atoms/CenterWrapper/CenterWrapper";
import { useState } from "react";
import HWToggleButton from "@src/component/atoms/HWToggleButton/HWToggleButton";
import HWToggleButtonGroup from "@src/component/atoms/HWToggleButtonGroup/HWToggleButtonGroup";
import CardList from "@src/component/molecules/CardList/CardList";
import ContentCard from "@src/component/atoms/ContentCard/ContentCard";
import PersonCardList from "@src/component/molecules/PersonCardList/PersonCardList";
import HWTypography from "@src/component/atoms/HWTypography/HWTypography";
import Color from "@src/common/styles/Color";
;

const SearchResultContent = () => {
  const [contentsList, setContentsList] = useState([
    <ContentCard src={""} />,
    <ContentCard src={""} />,
    <ContentCard src={""} />,
    <ContentCard src={""} />,
    <ContentCard src={""} />,
    <ContentCard src={""} />,
  ])
  const [toggle1, setToggle1] = useState<string>("a");
  const [toggle2, setToggle2] = useState<string>("a");

  const props1 = (value: string) => {
    return {
      disableOutlined: true,
      checked: toggle1 === value,
      onClick: () => {
        setToggle1(value);
      },
      width: "40px",
      height: "40px",
    };
  };
  const props2 = (value: string) => {
    return {
      disableOutlined: true,
      checked: toggle2 === value,
      onClick: () => {
        setToggle2(value);
      },
      width: "40px",
      height: "40px",
    };
  };

  return (
    <div className={"search-content-wrapper"} css={styled.wrapper}>
      <CenterWrapper>
        <WrapperTitle title={"일치하는 검색어"} subTitle={"14"} />
        <HWToggleButtonGroup>
          <HWToggleButton {...props1("a")}>a</HWToggleButton>
          <HWToggleButton {...props1("b")}>b</HWToggleButton>
        </HWToggleButtonGroup>
        <div css={styled.subWrapper}>
          <>
            {toggle1 === "a" && (
              <>
                <div css={styled.sub1}>{contentsList.map((v) => v)}</div>
                <div css={styled.plusBtn}>
                  <HWTypography
                    variant={"headlineXXS"}
                    family={"Pretendard-SemiBold"}
                    color={Color.dark.primary800}
                    onClick={() => {
                      setContentsList((prev) => [...prev,
                        <ContentCard src={""} />,
                        <ContentCard src={""} />,
                        <ContentCard src={""} />,
                      ]);
                    }}
                  >
                    더보기
                  </HWTypography>
                </div>
              </>
            )}
            {toggle1 === "b" && (
              <div css={styled.sub1}>
                <PersonCardList cardList={[]} />
              </div>
            )}
          </>
        </div>
      </CenterWrapper>
      <CenterWrapper>
        <WrapperTitle title={"연관 검색어"} subTitle={"24"} />
        <HWToggleButtonGroup>
          <HWToggleButton {...props2("a")}>a</HWToggleButton>
          <HWToggleButton {...props2("b")}>b</HWToggleButton>
        </HWToggleButtonGroup>
        <div css={styled.subWrapper}>
          <>
            {toggle2 === "a" && (
              <div css={styled.sub1}>
                <ContentCard src={""} />
                <ContentCard src={""} />
                <ContentCard src={""} />
                <ContentCard src={""} />
                <ContentCard src={""} />
                <ContentCard src={""} />
                <ContentCard src={""} />
              </div>
            )}
            {toggle2 === "b" && (
              <div css={styled.sub1}>
                <PersonCardList cardList={[]} />
              </div>
            )}
          </>
        </div>
      </CenterWrapper>
    </div>
  );
};

export default SearchResultContent;
