import styled from "./style";
import MenuAccordion from "@src/component/atoms/MenuAccordion/MenuAccordion";
import { useEffect, useState } from "react";
import HWTypography from "@src/component/atoms/HWTypography/HWTypography";
import { IconCancel, IconChevronLeft, IconChevronRight, IconPlusBtn, IconSearch } from "@res/index";
import CardSlider from "@src/component/molecules/CardSlider/CardSlider";
import { DUMMY_CONTENT, DUMMY_PERSON } from "@src/variables/CommonConstants";
import CardSliderPerson from "@src/component/molecules/CardSliderPerson/CardSliderPerson";
import HWDialog from "@src/component/atoms/HWDialog";
import HWTextField from "@src/component/atoms/HWTextField/HWTextField";
import HWIconButton from "@src/component/atoms/HWIconButton/HWIconButton";
import { getCardURL, isNullOrEmpty } from "@src/tools/commonTools";
import ContentCard3rd from "@src/component/atoms/ContentCard3rd/ContentCard3rd";
import person1 from "@res/temp/person1.png";
import { UWAxios } from "@src/common/axios/AxiosConfig";
import { CONTENTS_TABS } from "@src/variables/APIConstants";
import { useMutation, useQuery } from "@tanstack/react-query";
import PersonCard from "@src/component/atoms/PersonCard/PersonCard";
import LoadingDot from "@src/component/atoms/LoadingDot/LoadingDot";
import { QUERY_KEYS } from "@src/variables/QueryKeys";

const AccordionPerson = ({ personList, user }: any) => {
  const PAGE_SIZE = 8;
  const [open, setOpen] = useState(true);
  const [person, setPerson] = useState(personList);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const [searchFetch, setSearchFetch] = useState("");

  const [page, setPage] = useState(1);
  const [isSearch, setIsSearch] = useState(false);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: QUERY_KEYS.userSearchPerson(page, PAGE_SIZE),
    queryFn: async ({ queryKey }: any) => {
      return await UWAxios.user.getMyPerson(searchVal, page, PAGE_SIZE);
    },
    refetchOnWindowFocus: false,
    enabled: isSearch,
  });

  useEffect(() => {
    if (isModalOpen) {
      setIsSearch(false);
      setSearchVal("");
    }
  }, [isModalOpen]);

  return (
    <>
      <MenuAccordion
        title={
          <div css={styled.title}>
            <HWTypography variant={"headlineS"} family={"Pretendard-SemiBold"} color={"#ffffff"}>
              좋아하는 인물
            </HWTypography>
            <HWTypography variant={"headlineXXS"} family={"Pretendard"} color={"#D9DAE5"}>
              <span css={styled.typo1}>{user.nickname}</span>
              님이 좋아하는 인물을 알려주세요! 좋아하는 사람의 작품 소식을 알려드릴게요.
            </HWTypography>
          </div>
        }
        isExpanded={open}
        switchExpanded={() => setOpen(!open)}
        customCss={styled.accordion}
      >
        <div css={styled.subWrapper}>
          <div css={styled.contentBox}>
            <div css={styled.leftBox} onClick={() => setIsModalOpen(true)}>
              <IconPlusBtn cursor={"pointer"} />
              <HWTypography variant={"bodyXL"} family={"Pretendard-SemiBold"} color={"#C7C8D3"}>
                <div>좋아하는</div>
                <div>인물 추가</div>
              </HWTypography>
            </div>
            <div css={styled.rightBox}>
              <CardSliderPerson
                cardList={person}
                onDelete={async (id: string) => {
                  await UWAxios.user.deleteMyPerson(id);
                  setPerson((prev: any) => [...prev.filter((v: any) => v.id !== id)]);
                }}
              />
            </div>
          </div>
        </div>
      </MenuAccordion>
      <HWDialog
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        width={"600px"}
        customCss={styled.modalWrapper}
      >
        <HWDialog.Title onClose={() => setIsModalOpen(false)}>인물 검색</HWDialog.Title>
        <HWDialog.Content>
          <div css={styled.modalContentBox}>
            <div css={styled.box1}>
              <HWTextField
                fullWidth={true}
                startAdorment={<IconSearch width={"20px"} height={"20px"} color={"#fff"} />}
                value={searchVal}
                placeholder={"인물을 검색해 주세요."}
                onChange={(e) => setSearchVal(e.target.value)}
                onKeyDown={(e) => {
                  if (!isNullOrEmpty(searchVal) && e.key === "Enter") {
                    setIsSearch(true);
                    setPage(1);
                    setSearchFetch(searchVal);
                    refetch();
                  }
                }}
                endAdorment={
                  !isNullOrEmpty(searchVal) && (
                    <HWIconButton onClick={() => setSearchVal("")}>
                      <IconCancel />
                    </HWIconButton>
                  )
                }
              />
            </div>
            {isSearch && (
              <>
                <div css={styled.box2}>
                  <HWTypography variant={"bodyXS"} color={"#9897A1"}>
                    인물
                  </HWTypography>
                </div>
                {isLoading && (
                  <div css={styled.loadingBox}>
                    <LoadingDot />
                  </div>
                )}
                {data &&
                  (data?.pageInfo?.totalElements === 0 ? (
                    <div css={styled.emptyBox}>
                      <HWTypography
                        variant={"bodyL"}
                        family={"Pretendard-SemiBold"}
                        color={"#C7C8D3"}
                      >
                        검색 결과가 없습니다.
                      </HWTypography>
                      <HWTypography variant={"bodyS"} family={"Pretendard"} color={"#84838D"}>
                        검색하신 `{searchFetch}`을(를) 찾을 수 없습니다.
                      </HWTypography>
                      <HWTypography variant={"bodyS"} family={"Pretendard"} color={"#84838D"}>
                        다른 검색어를 입력해보세요.
                      </HWTypography>
                    </div>
                  ) : (
                    <div css={styled.box3}>
                      {data?.person.map((v: any) => {
                        return (
                          <ContentCard3rd
                            key={v.id}
                            src={getCardURL({ type: "content", srcId: v.profilePath })}
                            id={v.id}
                            title={v.name}
                            disabled={v.selected}
                            onClick={async () => {
                              const res = await UWAxios.user.putMyPerson(v.id);
                              if (res) {
                                setPerson((prev: any) => [...prev, res]);
                                setIsModalOpen(false);
                              }
                            }}
                          />
                        );
                      })}
                    </div>
                  ))}
                <footer css={styled.footer}>
                  <HWIconButton
                    disabled={data?.pageInfo.page <= 1}
                    onClick={() => {
                      setPage(page - 1);
                    }}
                    css={styled.arrowBtn}
                  >
                    <IconChevronLeft />
                  </HWIconButton>
                  <div>
                    <HWTypography variant={"bodyXS"} color={"#84838D"}>
                      Page {data?.pageInfo.page} of {data?.pageInfo.totalPages || 1}
                    </HWTypography>
                  </div>
                  <HWIconButton
                    disabled={
                      data?.pageInfo.page === data?.pageInfo.totalPages ||
                      data?.pageInfo.totalPages === 0
                    }
                    onClick={() => {
                      setPage(page + 1);
                    }}
                    css={styled.arrowBtn}
                  >
                    <IconChevronRight />
                  </HWIconButton>
                </footer>
              </>
            )}
          </div>
        </HWDialog.Content>
      </HWDialog>
    </>
  );
};

export default AccordionPerson;
