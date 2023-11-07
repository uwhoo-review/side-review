import { useState } from "react";
import styled from "./style";
import ContentCard from "@src/component/atoms/ContentCard/ContentCard";
import HWTypography from "@src/component/atoms/HWTypography/HWTypography";
import CenterWrapper from "@src/component/atoms/CenterWrapper/CenterWrapper";
import { card1, card2, card3, card4, card5 } from "@res/index";
import PreviewBoxVertical from "@src/component/molecules/PreviewBoxVertical/PreviewBoxVertical";
import { IMAGE_URL } from "@src/variables/tmdbConstants";
import { ContentProps, ContentsDO } from "@src/interfaces/api.interface";
const PopularContent = ({ data }: any) => {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedCard, setSelectedCard] = useState<ContentProps | null>(null);
  const [selectedCardIdx, setSelectedCardIdx] = useState<number | null>(null);

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
          {selectedCard && (
            <div className={`side-preview-wrapper ${selectedCard && "open"}`} css={styled.leftBox}>
              <div className={`floating-box ${selectedCard && "open"}`} css={styled.floatWrapper}>
                <PreviewBoxVertical item={selectedCard} />
              </div>
            </div>
          )}
          <div className={`popular-cards-wrapper`} css={styled.rightBox}>
            <div className={`image-card-list ${selectedCard && "open"}`} css={styled.cardWrapper}>
              {data?.popular.map((v: ContentProps, i: number) => {
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
                    inActive={open && selectedCard?.id !== v.id}
                    customCss={styled.card}
                    onClick={() => {
                      if (selectedCard === null) {
                        setOpen(true);
                        setSelectedCard(v);
                        setSelectedCardIdx(i);
                      } else {
                        if (selectedCard.id === v.id) {
                          setOpen(false);
                          setSelectedCard(null);
                          setSelectedCardIdx(null);
                        } else {
                          setSelectedCard(v);
                          setSelectedCardIdx(i);
                        }
                      }
                    }}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </CenterWrapper>
    </div>
  );
};

export default PopularContent;
