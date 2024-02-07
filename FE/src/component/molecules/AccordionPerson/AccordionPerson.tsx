import styled from "./style";
import MenuAccordion from "@src/component/atoms/MenuAccordion/MenuAccordion";
import { useState } from "react";
import HWTypography from "@src/component/atoms/HWTypography/HWTypography";
import { IconCancel, IconChevronLeft, IconChevronRight, IconPlusBtn, IconSearch } from "@res/index";
import CardSlider from "@src/component/molecules/CardSlider/CardSlider";
import { DUMMY_CONTENT, DUMMY_PERSON } from "@src/variables/CommonConstants";
import CardSliderPerson from "@src/component/molecules/CardSliderPerson/CardSliderPerson";
import HWDialog from "@src/component/atoms/HWDialog";
import HWTextField from "@src/component/atoms/HWTextField/HWTextField";
import HWIconButton from "@src/component/atoms/HWIconButton/HWIconButton";
import { isNullOrEmpty } from "@src/tools/commonTools";
import ContentCard3rd from "@src/component/atoms/ContentCard3rd/ContentCard3rd";
import person1 from "@res/temp/person1.png";

const AccordionPerson = () => {
  const [open, setOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const [isSearch, setIsSearch] = useState(false);
  const [searchList, setSearchList] = useState([]);

  return (
    <>
      <MenuAccordion
        title={
          <div css={styled.title}>
            <HWTypography variant={"headlineS"} family={"Pretendard-SemiBold"} color={"#ffffff"}>
              좋아하는 인물
            </HWTypography>
            <HWTypography variant={"headlineXXS"} family={"Pretendard"} color={"#D9DAE5"}>
              <span css={styled.typo1}>웨이드</span>
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
                cardList={[
                  DUMMY_PERSON,
                  DUMMY_PERSON,
                  DUMMY_PERSON,
                  DUMMY_PERSON,
                  DUMMY_PERSON,
                  DUMMY_PERSON,
                  DUMMY_PERSON,
                  DUMMY_PERSON,
                  DUMMY_PERSON,
                  DUMMY_PERSON,
                  DUMMY_PERSON,
                  DUMMY_PERSON,
                  DUMMY_PERSON,
                ]}
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
                endAdorment={
                  !isNullOrEmpty(searchVal) && (
                    <HWIconButton>
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
                    제목
                  </HWTypography>
                  <HWTypography variant={"bodyXS"} color={"#9897A1"}>
                    내 별점
                  </HWTypography>
                </div>
                {searchList.length === 0 ? (
                  <div css={styled.emptyBox}>
                    <HWTypography
                      variant={"bodyL"}
                      family={"Pretendard-SemiBold"}
                      color={"#C7C8D3"}
                    >
                      검색 결과가 없습니다.
                    </HWTypography>
                    <HWTypography variant={"bodyS"} family={"Pretendard"} color={"#84838D"}>
                      검색하신 `{searchVal}` 작품을 찾을 수 없습니다.
                    </HWTypography>
                    <HWTypography variant={"bodyS"} family={"Pretendard"} color={"#84838D"}>
                      다른 검색어를 입력해보세요.
                    </HWTypography>
                  </div>
                ) : (
                  <div css={styled.box3}>
                    <ContentCard3rd src={person1} />
                    <ContentCard3rd src={person1} />
                    <ContentCard3rd src={person1} />
                    <ContentCard3rd src={person1} />
                  </div>
                )}
                <footer css={styled.footer}>
                  <HWIconButton>
                    <IconChevronLeft />
                  </HWIconButton>
                  <div>
                    <HWTypography variant={"bodyXS"} color={"#84838D"}>
                      Page {1} of 10
                    </HWTypography>
                  </div>
                  <HWIconButton>
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
