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
import { UWAxios } from "@src/common/axios/AxiosConfig";
import { CONTENTS_TABS } from "@src/variables/APIConstants";
import { useMutation } from "@tanstack/react-query";
const SearchResultContent = ({ content, person, similar, filter, search, sort }: any) => {
  const navigate = useNavigate();

  const [contentList, setContentList] = useState<any>(content.content);
  const [personList, setPersonList] = useState<any>(person.content);
  const [similarList, setSimilarList] = useState<any>(similar.content);
  const [contentCnt, setContentCnt] = useState(12);
  const [personCnt, setPersonCnt] = useState(12);
  const [similarCnt, setSimilarCnt] = useState(12);

  const [toggle1, setToggle1] = useState<string>("drama");


  const mutationContent = useMutation({
    mutationFn: async ({ s }: any) => {
      return await UWAxios.contents.getSearchMatch("content", {
        tab: CONTENTS_TABS.SEARCH,
        filter: [...filter],
        query: search,
        sort: sort,
        pagination: s,
      });
    },
    onSuccess: (data: any) => {
      setContentList((prev: any) => [...prev, ...data.content]);
    },
  });
  const mutationPerson = useMutation({
    mutationFn: async ({ s }: any) => {
      return await UWAxios.contents.getSearchMatch("person", {
        tab: CONTENTS_TABS.SEARCH,
        filter: [...filter],
        query: search,
        sort: sort,
        pagination: s,
      });
    },
    onSuccess: (data: any) => {
      setPersonList((prev: any) => [...prev, ...data.content]);
    },
  });

  const mutationSimilar = useMutation({
    mutationFn: async ({ s }: any) => {
      return await UWAxios.contents.getSearchSimilar({
        tab: CONTENTS_TABS.SEARCH,
        filter: [...filter],
        query: search,
        sort: sort,
        pagination: s,
      });
    },
    onSuccess: (data: any) => {
      setSimilarList((prev: any) => [...prev, ...data.content]);
    },
  });

  const props1 = (value: string) => {
    return {
      checked: toggle1 === value,
      onClick: () => {
        setToggle1(value);
      },
    };
  };

  return (
    <div className={"search-content-wrapper"} css={styled.wrapper}>
      <CenterWrapper>
        <WrapperTitle
          title={"일치하는 검색어"}
          subTitle={content.total + person.total}
          customCss={styled.subTitle}
        />
        <HWToggleButtonGroup customCss={styled.toggle}>
          <HWToggleButton customCss={styled.toggleBtn} {...props1("drama")}>
            드라마<span css={styled.typo}>{content.total}</span>
          </HWToggleButton>
          <HWToggleButton customCss={styled.toggleBtn} {...props1("person")}>
            인물<span css={styled.typo}>{person.total}</span>
          </HWToggleButton>
        </HWToggleButtonGroup>
        <div css={styled.subWrapper}>
          <>
            {toggle1 === "drama" && (
              <>
                {contentList.length !== 0 ? (
                  <>
                    <div css={styled.sub1}>
                      {contentList.map((v: any) => (
                        <ContentCard
                          id={v.id}
                          key={v.id}
                          className={`image-card`}
                          srcId={v.poster || ""}
                          contentName={v.name}
                          platform={v.platform}
                          age={v.age}
                          date={v.date}
                          rating={v.rating}
                          launch={false}
                          season={v.season}
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/detail/${v.id}`);
                          }}
                          active
                        />
                      ))}
                    </div>
                    {contentList.length < content.total && (
                      <div
                        css={styled.plusBtn}
                        onClick={() => {
                          // setContentCnt((prev) => prev + 6);
                          mutationContent.mutate({ s: contentList.length });
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
                    )}
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
                    <HWTypography
                      variant={"bodyS"}
                      family={"Pretendard-Regular"}
                      color={"#84838D"}
                      css={styled.typoCenter}
                    >
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
                {personList.length !== 0 ? (
                  <>
                    <div css={styled.sub2}>
                      {personList.map((v: any) => (
                        <PersonCard
                          id={v.id}
                          name={v.name}
                          subName={v?.role || v?.job}
                          width={"82px"}
                          height={"82px"}
                          srcId={v.profilePath}
                          className={"image-card"}
                          onClick={() => {
                            navigate(`/person/${v.id}`);
                          }}
                        />
                      ))}
                    </div>
                    {personList.length < person.total && (
                      <div css={styled.plusBtn}>
                        <HWTypography
                          variant={"headlineXXS"}
                          family={"Pretendard-SemiBold"}
                          color={Color.dark.primary800}
                          onClick={() => {
                            // setPersonCnt((prev) => prev + 6);
                            mutationPerson.mutate({ s: personList.length });
                          }}
                        >
                          더보기
                        </HWTypography>
                        <IconChevronDoubleDown />
                      </div>
                    )}
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
                    <HWTypography
                      variant={"bodyS"}
                      family={"Pretendard-Regular"}
                      color={"#84838D"}
                      css={styled.typoCenter}
                    >
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
        <WrapperTitle title={"연관 검색어"} subTitle={similar.total} customCss={styled.subTitle} />
        <div css={styled.subWrapper}>
          <>
            {similarList.length !== 0 ? (
              <>
                <div css={styled.sub1}>
                  {similarList.map((v: any) => (
                    <ContentCard
                      id={v.id}
                      key={v.id}
                      className={`image-card`}
                      srcId={v.poster}
                      contentName={v.name}
                      platform={v.platform}
                      age={v.age}
                      date={v.date}
                      rating={v.rating}
                      launch={false}
                      season={v.season}
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/detail/${v.id}`);
                      }}
                      active
                    />
                  ))}
                </div>
                {similarList.length < similar.total && (
                  <div
                    css={styled.plusBtn}
                    onClick={() => {
                      // setSimilarCnt((prev) => prev + 6);
                      mutationSimilar.mutate({ s: similarList.length });
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
                )}
              </>
            ) : (
              <div css={styled.emptyWrapper}>
                <HWTypography variant={"bodyL"} family={"Pretendard-SemiBold"} color={"#C7C8D3"}>
                  연관된 검색 결과가 없습니다.
                </HWTypography>
                <HWTypography
                  variant={"bodyS"}
                  family={"Pretendard-Regular"}
                  color={"#84838D"}
                  css={styled.typoCenter}
                >
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
