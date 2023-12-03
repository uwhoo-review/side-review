import { forwardRef, useRef, useState } from "react";
import CenterWrapper from "@src/component/atoms/CenterWrapper/CenterWrapper";
import ContentCard from "@src/component/atoms/ContentCard/ContentCard";
import { VirtuosoGrid } from "react-virtuoso";
import styled from "./style";
import { useNavigate } from "react-router-dom";

const FilterResultContents = ({ data }: any) => {
  const navigate = useNavigate();

  const virtuosoRef = useRef<any>();
  const [isScrolling, setIsScrolling] = useState(false);

  console.log(data);

  return (
    <div className={"search-content-wrapper"} css={styled.wrapper}>
      <CenterWrapper>
        <VirtuosoGrid
          ref={virtuosoRef}
          data={data}
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
                  srcId={v.poster}
                  contentName={v.name}
                  platform={v.platform}
                  age={v.age}
                  year={v.year}
                  rating={v.rating}
                  active={true}
                  launch={false}
                  customCss={styled.card}
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/detail?id=${v.id}`);
                  }}
                />
              </div>
            );
          }}
        />
      </CenterWrapper>
    </div>
  );
};

export default FilterResultContents;
