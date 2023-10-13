import { useState } from "react";
import styled from "./style";
import ImageCard from "@src/component/atoms/ImageCard/ImageCard";
import HWTypography from "@src/component/atoms/HWTypography/HWTypography";

const PopularContent = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="popular-content-wrapper" css={styled.wrapper}>
      <div css={styled.header}>
        <div>
          <HWTypography variant={"headlineM"} css={styled.headline}>
            UWHOO 인기 작품
          </HWTypography>
        </div>
        <div>
          <HWTypography variant={"headlineXS"} css={styled.subHeadline}>
            💡 유후 유저들이 좋아하는 인기 작품을 확인해 보세요!
          </HWTypography>
        </div>
      </div>
      <div css={styled.contentWrapper}>
        {open && (
          <div className={`side-preview-wrapper ${open && "open"}`} css={styled.leftBox}>
            <div className={`floating-box ${open && "open"}`} css={styled.floatWrapper}>preview</div>
          </div>
        )}
        <div className={`popular-cards-wrapper`} css={styled.rightBox}>
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
