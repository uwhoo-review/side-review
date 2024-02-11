import HWToggleButtonGroup from "@src/component/atoms/HWToggleButtonGroup/HWToggleButtonGroup";
import HWToggleButton from "@src/component/atoms/HWToggleButton/HWToggleButton";
import { forwardRef, useRef, useState } from "react";
import HWTypography from "@src/component/atoms/HWTypography/HWTypography";
import ContentCard from "@src/component/atoms/ContentCard/ContentCard";
import Color from "@src/common/styles/Color";
import { IconChevronDoubleDown } from "@res/index";
import CenterWrapper from "@src/component/atoms/CenterWrapper/CenterWrapper";
import { VirtuosoGrid } from "react-virtuoso";
import { useNavigate } from "react-router-dom";
import styled from "./style";

const MyFootPrints = ({ toggle = "content", data }: any) => {
  const [toggle1, setToggle1] = useState<string>(toggle);
  const [resultContent, setResultContent] = useState<any>(data);
  const navigate = useNavigate();

  const virtuosoRef = useRef<any>();
  const props1 = (value: string) => {
    return {
      checked: toggle1 === value,
      onClick: () => {
        setToggle1(value);
      },
    };
  };

  return (
    <div>
      <HWTypography variant={"headlineM"} family={"Pretendard-SemiBold"}>
        UWHOO 발자취
      </HWTypography>
      <HWToggleButtonGroup>
        <HWToggleButton {...props1("content")}>내 별점 작품</HWToggleButton>
        <HWToggleButton {...props1("review")}>내 리뷰</HWToggleButton>
      </HWToggleButtonGroup>
      <CenterWrapper>
        {toggle1 === "content" && (
          <>
            <div css={styled.virtuosoWrapper}>
              <VirtuosoGrid
                ref={virtuosoRef}
                data={resultContent}
                useWindowScroll={true}
                components={{
                  List: forwardRef((props, ref) => (
                    <div {...props} css={styled.listContainer} ref={ref} />
                  )),
                  Item: (props) => (
                    <div {...props} className={"item-container"} css={styled.itemContainer} />
                  ),
                }}
                itemContent={(i, v) => {
                  return (
                    <div className={"content-slide"} key={v.id} css={styled.item}>
                      <ContentCard
                        id={v.id}
                        key={v.id}
                        className={`image-card`}
                        srcId={v.poster}
                        contentName={v.name}
                        platform={v.platform}
                        age={v.age}
                        date={v.year}
                        rating={v.rating}
                        season={v.season}
                        active={true}
                        launch={false}
                        customCss={styled.card}
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/detail/${v.id}`);
                        }}
                      />
                    </div>
                  );
                }}
              />
            </div>

            {/*{total > resultContent.length && (
                <div
                  css={styled.plusBtn}
                  onClick={() => {
                    mutation.mutate({ s: resultContent.length });
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
              )}*/}
          </>
        )}
        {toggle1 === "review" && <></>}
      </CenterWrapper>
    </div>
  );
};

export default MyFootPrints;
