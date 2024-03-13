import { forwardRef, useEffect, useRef, useState } from "react";
import CenterWrapper from "@src/component/atoms/CenterWrapper/CenterWrapper";
import ContentCard from "@src/component/atoms/ContentCard/ContentCard";
import { VirtuosoGrid } from "react-virtuoso";
import styled from "./style";
import { useNavigate } from "react-router-dom";
import HWTypography from "@src/component/atoms/HWTypography/HWTypography";
import Color from "@src/common/styles/Color";
import { IconChevronDoubleDown } from "@res/index";
import { UWAxios } from "@src/common/axios/AxiosConfig";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CONTENTS_TABS } from "@src/variables/APIConstants";

const FilterResultContents = ({ content, total, filter, search, sort, pagination }: any) => {
  const navigate = useNavigate();
  const virtuosoRef = useRef<any>();
  const [isScrolling, setIsScrolling] = useState(false);

  const [resultContent, setResultContent] = useState<any>(content.content);
  const mutation = useMutation({
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
      setResultContent((prev: any) => [...prev, ...data.content]);
    },
  });


  return (
    <div className={"search-content-wrapper"} css={styled.wrapper}>
      <CenterWrapper>
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
            isScrolling={setIsScrolling}
            itemContent={(i, v) => {
              return (
                <div className={"content-slide"} key={v.id} css={styled.item}>
                  <ContentCard
                    id={v.id}
                    key={v.id}
                    className={`image-card`}
                    srcId={v.poster || ""}
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

        {total > resultContent.length && (
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
        )}
      </CenterWrapper>
    </div>
  );
};

export default FilterResultContents;
