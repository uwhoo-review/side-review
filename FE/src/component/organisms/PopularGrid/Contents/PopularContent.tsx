import { useState } from "react";
import styled from "./style";
import ContentCard from "@src/component/atoms/ContentCard/ContentCard";
import HWTypography from "@src/component/atoms/HWTypography/HWTypography";
import CenterWrapper from "@src/component/atoms/CenterWrapper/CenterWrapper";
import {card1, card2, card3, card4, card5} from "@res/index";
import PreviewBoxVertical from "@src/component/molecules/PreviewBoxVertical/PreviewBoxVertical";
const PopularContent = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="popular-content-wrapper" css={styled.wrapper}>
      <CenterWrapper>
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
              <div className={`floating-box ${open && "open"}`} css={styled.floatWrapper}>
                <PreviewBoxVertical />
              </div>
            </div>
          )}
          <div className={`popular-cards-wrapper`} css={styled.rightBox}>
            <div className={`image-card-list ${open && "open"}`} css={styled.cardWrapper}>
              {[...new Array(12)].map((v: any, i: number) => {
                return (
                  <ContentCard
                    src={card1}
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
      </CenterWrapper>
    </div>
  );
};

export default PopularContent;
