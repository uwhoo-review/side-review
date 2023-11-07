import { useState } from "react";
import styled from "./style";
import ContentCard from "@src/component/atoms/ContentCard/ContentCard";
import HWTypography from "@src/component/atoms/HWTypography/HWTypography";
import CenterWrapper from "@src/component/atoms/CenterWrapper/CenterWrapper";
import { card1, card2, card3, card4, card5 } from "@res/index";
import PreviewBoxVertical from "@src/component/molecules/PreviewBoxVertical/PreviewBoxVertical";
import { IMAGE_URL } from "@src/variables/tmdbConstants";
const PopularContent = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedCard, setSelectedCard] = useState<number | null>(null);

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
              {[...new Array(30)].map((v: any, i: number) => {
                return (
                  <ContentCard
                    key={v.id}
                    className={`image-card`}
                    src={IMAGE_URL + v.poster}
                    rank={i + 1}
                    contentName={v.name}
                    platform={v.platform}
                    age={v.age}
                    year={v.year}
                    rating={v.rating}
                    inActive={open && selectedCard !== i}
                    customCss={styled.card}
                    onClick={() => {
                      if (selectedCard === null) {
                        setOpen(true);
                        setSelectedCard(i);
                      } else {
                        if (selectedCard === i) {
                          setOpen(false);
                          setSelectedCard(null);
                        } else {
                          setSelectedCard(i);
                        }
                      }
                    }}
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
