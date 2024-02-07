import styled from "./style";
import MenuAccordion from "@src/component/atoms/MenuAccordion/MenuAccordion";
import { useState } from "react";
import HWTypography from "@src/component/atoms/HWTypography/HWTypography";
import HWButton from "@src/component/atoms/HWButton/HWButton";
import CardList from "@src/component/molecules/CardList/CardList";
import { DUMMY_CONTENT } from "@src/variables/CommonConstants";
import CardSlider from "@src/component/molecules/CardSlider/CardSlider";
import ProfileImage from "@src/component/atoms/ProfileImage/ProfileImage";
import {
  IconApple,
  IconCancel,
  IconChevronLeft,
  IconChevronRight,
  IconPlusBtn,
  IconSearch,
} from "@res/index";
import HWDialog from "@src/component/atoms/HWDialog";
import HWTextField from "@src/component/atoms/HWTextField/HWTextField";
import ContentCard3rd from "@src/component/atoms/ContentCard3rd/ContentCard3rd";
import HWIconButton from "@src/component/atoms/HWIconButton/HWIconButton";
import person1 from "@res/temp/person1.png";
import { isNullOrEmpty } from "@src/tools/commonTools";

const AccordionContents = () => {
  const [open, setOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const [isSearch, setIsSearch] = useState(true);
  const [searchList, setSearchList] = useState([]);

  return (
    <>
      <MenuAccordion
        title={
          <div css={styled.title}>
            <HWTypography variant={"headlineS"} family={"Pretendard-SemiBold"} color={"#ffffff"}>
              내 인생작
            </HWTypography>
            <HWTypography variant={"headlineXXS"} family={"Pretendard"} color={"#D9DAE5"}>
              <>
                <span css={styled.typo1}>웨이드</span>
                님의 인생작을 알려주세요! 또 다른 인생작을 추천하는 데 참고할게요.
              </>
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
                인생작 추가
              </HWTypography>
            </div>
            <div css={styled.rightBox}>
              <CardSlider
                cardList={[
                  DUMMY_CONTENT,
                  DUMMY_CONTENT,
                  DUMMY_CONTENT,
                  DUMMY_CONTENT,
                  DUMMY_CONTENT,
                  DUMMY_CONTENT,
                  DUMMY_CONTENT,
                  DUMMY_CONTENT,
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
        <HWDialog.Title onClose={() => setIsModalOpen(false)}>인생작 검색</HWDialog.Title>
        <HWDialog.Content>
          <div css={styled.modalContentBox}>
            <div css={styled.box1}>
              <HWTextField
                fullWidth={true}
                startAdorment={<IconSearch width={"20px"} height={"20px"} color={"#fff"} />}
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                placeholder={"작품의 제목을 검색해 주세요."}
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
                  <div css={styled.arrowBtn}>
                    <IconChevronLeft />
                  </div>
                  <div>
                    <HWTypography variant={"bodyXS"} color={"#84838D"}>
                      Page {1} of 10
                    </HWTypography>
                  </div>
                  <div css={styled.arrowBtn}>
                    <IconChevronRight />
                  </div>
                </footer>
              </>
            )}
          </div>

        </HWDialog.Content>
      </HWDialog>
    </>
  );
};

export default AccordionContents;
