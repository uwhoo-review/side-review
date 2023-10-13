import { useState } from "react";
import styled from "./style";
import ImageCard from "@src/component/atoms/ImageCard/ImageCard";

const PopularContent = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="popular-content-wrapper" css={styled.wrapper}>
      <div css={styled.header}>Header</div>
      <div css={styled.contentWrapper}>
        {open && (
          <div className={"side-preview-wrapper"} css={styled.floatBox}>
            <div> box</div>
          </div>
        )}
        <div className={`popular-cards-wrapper`} css={styled.cardBox}>
          <div className={`image-card-list ${open && "open"}`} css={styled.cardWrapper}>
            {[...new Array(50)].map((v: any, i: number) => {
              return (
                <ImageCard
                  src={""}
                  className={"image-card"}
                  key={i}
                  rank={i + 1}
                  // customCss={styled.card}
                  onClick={() => setOpen(!open)}
                />
              );
            })}
          </div>

          {/*<button onClick={() => setOpen(!open)}>IMAGE</button>*/}
        </div>
      </div>
    </div>
  );
};

export default PopularContent;
