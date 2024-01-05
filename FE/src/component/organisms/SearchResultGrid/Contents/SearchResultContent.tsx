import styled from "./style";
import WrapperTitle from "@src/component/atoms/WrapperTitle/WrapperTitle";
import CenterWrapper from "@src/component/atoms/CenterWrapper/CenterWrapper";
import { useEffect, useState } from "react";
import HWToggleButton from "@src/component/atoms/HWToggleButton/HWToggleButton";
import HWToggleButtonGroup from "@src/component/atoms/HWToggleButtonGroup/HWToggleButtonGroup";
import CardList from "@src/component/molecules/CardList/CardList";
import ContentCard from "@src/component/atoms/ContentCard/ContentCard";
import PersonCardList from "@src/component/molecules/PersonCardList/PersonCardList";
import HWTypography from "@src/component/atoms/HWTypography/HWTypography";
import Color from "@src/common/styles/Color";
import PersonCard from "@src/component/atoms/PersonCard/PersonCard";
import person1 from "@res/temp/person1.png";
import { card1, card3, IconChevronDoubleDown } from "@res/index";
import { DUMMY_CONTENT } from "@src/variables/CommonConstants";
import { useNavigate } from "react-router-dom";
const SearchResultContent = ({ data, filter, search, sort }: any) => {
  const navigate = useNavigate();

  const [resultMatch, setResultMatch] = useState<any>({ content: [], person: [] });
  const [similarList, setSimilarList] = useState<any>([]);

  const [contentCnt, setContentCnt] = useState(6);
  const [personCnt, setPersonCnt] = useState(6);
  const [similarCnt, setSimilarCnt] = useState(6);

  const [toggle1, setToggle1] = useState<string>("drama");
  const [toggle2, setToggle2] = useState<string>("drama");

  useEffect(() => {
    setResultMatch(data.match);
    setSimilarList(data.similar);
  }, [data]);

  const props1 = (value: string) => {
    return {
      checked: toggle1 === value,
      onClick: () => {
        setToggle1(value);
      },
    };
  };
  const props2 = (value: string) => {
    return {
      checked: toggle2 === value,
      onClick: () => {
        setToggle2(value);
      },
    };
  };

  return (
    <div className={"search-content-wrapper"} css={styled.wrapper}>
      <CenterWrapper>
        <WrapperTitle
          title={"일치하는 검색어"}
          subTitle={resultMatch.content.length + resultMatch.person.length}
          customCss={styled.subTitle}
        />
        <HWToggleButtonGroup customCss={styled.toggle}>
          <HWToggleButton {...props1("drama")}>드라마</HWToggleButton>
          <HWToggleButton {...props1("person")}>인물</HWToggleButton>
        </HWToggleButtonGroup>
        <div css={styled.subWrapper}>
          <>
            {toggle1 === "drama" && (
              <>
                {resultMatch.content.length !== 0 ? (
                  <>
                    <div css={styled.sub1}>
                      {resultMatch.content.slice(0, contentCnt).map((v: any) => (
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
                          launch={false}
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
                        setContentCnt((prev) => prev + 6);
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
                ) : (
                  <div css={styled.emptyWrapper}>
                    <HWTypography
                      variant={"bodyL"}
                      family={"Pretendard-SemiBold"}
                      color={"#C7C8D3"}
                    >
                      일치하는 검색 결과가 없습니다.
                    </HWTypography>
                    <HWTypography variant={"bodyS"} family={"Pretendard-Regular"} color={"#84838D"}>
                      `{search}`에 대해 일치하는 검색 결과를 찾을 수 없습니다.
                      <br />
                      필터 설정을 바꾸거나 다른 검색어를 입력해보세요.
                    </HWTypography>
                  </div>
                )}
              </>
            )}
            {toggle1 === "person" && (
              <>
                {resultMatch.person.length !== 0 ? (
                  <>
                    <div css={styled.sub2}>
                      {resultMatch.person.slice(0, personCnt).map((v: any) => (
                        <PersonCard
                          id={v.id}
                          name={v.name}
                          subName={v?.role || v?.job}
                          width={"82px"}
                          height={"82px"}
                          srcId={person1}
                          className={"image-card"}
                          onClick={() => {
                            navigate(`/person/${v.id}`);
                          }}
                        />
                      ))}
                    </div>
                    <div css={styled.plusBtn}>
                      <HWTypography
                        variant={"headlineXXS"}
                        family={"Pretendard-SemiBold"}
                        color={Color.dark.primary800}
                        onClick={() => {
                          setPersonCnt((prev) => prev + 6);
                        }}
                      >
                        더보기
                      </HWTypography>
                      <IconChevronDoubleDown />
                    </div>
                  </>
                ) : (
                  <div css={styled.emptyWrapper}>
                    <HWTypography
                      variant={"bodyL"}
                      family={"Pretendard-SemiBold"}
                      color={"#C7C8D3"}
                    >
                      일치하는 검색 결과가 없습니다.
                    </HWTypography>
                    <HWTypography variant={"bodyS"} family={"Pretendard-Regular"} color={"#84838D"}>
                      `{search}`에 대해 일치하는 검색 결과를 찾을 수 없습니다.
                      <br />
                      필터 설정을 바꾸거나 다른 검색어를 입력해보세요.
                    </HWTypography>
                  </div>
                )}
              </>
            )}
          </>
        </div>
      </CenterWrapper>
      <CenterWrapper>
        <WrapperTitle title={"연관 검색어"} subTitle={"24"} customCss={styled.subTitle} />
        <div css={styled.subWrapper}>
          <>
            {similarList.length !== 0 ? (
              <>
                <div css={styled.sub1}>
                  {similarList.slice(0, similarCnt).map((v: any) => (
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
                      launch={false}
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
                    setSimilarCnt((prev) => prev + 6);
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
            ) : (
              <div css={styled.emptyWrapper}>
                <HWTypography variant={"bodyL"} family={"Pretendard-SemiBold"} color={"#C7C8D3"}>
                  일치하는 검색 결과가 없습니다.
                </HWTypography>
                <HWTypography variant={"bodyS"} family={"Pretendard-Regular"} color={"#84838D"}>
                  `{search}`에 대해 연관된 검색 결과를 찾을 수 없습니다.
                  <br />
                  필터 설정을 바꾸거나 다른 검색어를 입력해보세요.
                </HWTypography>
              </div>
            )}
          </>
        </div>
      </CenterWrapper>
    </div>
  );
};

export default SearchResultContent;
