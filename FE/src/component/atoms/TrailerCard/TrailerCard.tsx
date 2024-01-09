import styled from "./style";
import HWDialog from "@src/component/atoms/HWDialog/HWDialog";
import { useEffect, useState } from "react";
import { THUMBNAIL_URL, VIDEO_URL } from "@src/variables/tmdbConstants";
import { IconPlay } from "@res/index";
import { getCardURL, isNullOrEmpty } from "@src/tools/commonTools";
import CenterWrapper from "@src/component/atoms/CenterWrapper/CenterWrapper";
import CarouselArrow from "@src/component/atoms/CarouselArrow/CarouselArrow";

interface TrailerCardProps {
  srcId: string;
  idx?: number;
  width?: string;
  height?: string;
  useModal?: boolean;
  onClick?: () => void;
  size?: string;
  trailerList?: string[];
}

const TrailerCard = ({
  idx = 0,
  srcId,
  width = "100%",
  height = "100%",
  useModal = true,
  onClick,
  size = "mqdefault",
  trailerList = [],
}: TrailerCardProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [trailerSrc, setTrailerSrc] = useState(srcId);
  const [trailerIdx, setTrailerIdx] = useState(idx);

  const handlePrevTrailer = () => {
    trailerIdx > 0 && setTrailerIdx((prev: any) => prev - 1);
  };

  const handleNextTrailer = () => {
    trailerIdx < trailerList.length - 1 && setTrailerIdx((prev: any) => prev + 1);
  };

  useEffect(() => {
    if (trailerList.length !== 0) setTrailerSrc(trailerList[trailerIdx]);
  }, [trailerIdx]);

  useEffect(() => {
    const handleKeydown = (e: any) => {
      e.preventDefault();

      if (e.key === "ArrowRight") {
        handleNextTrailer();
      } else if (e.key === "ArrowLeft") {
        handlePrevTrailer();
      }
    };
    if (isOpen) {
      addEventListener("keydown", handleKeydown);
    }

    return () => {
      if (isOpen) removeEventListener("keydown", handleKeydown);
    };
  }, [isOpen, trailerIdx]);

  return (
    <>
      {!isNullOrEmpty(srcId) ? (
        <div
          css={styled.wrapper(
            `${getCardURL({ type: "thumbnail", srcId: srcId, size: size })}`,
            width,
            height
          )}
          onClick={() => {
            if (useModal) setIsOpen(!isOpen);
            onClick && onClick();
          }}
        >
          <IconPlay css={styled.playIcon} />
        </div>
      ) : (
        <div css={styled.emptyWrapper}>트레일러 영상을 준비중입니다.</div>
      )}
      {useModal && (
        <>
          <HWDialog open={Boolean(isOpen)} onClose={() => setIsOpen(false)}>
            <CenterWrapper>
              <div css={styled.modalWrapper}>
                {trailerIdx > 0 && (
                  <CarouselArrow
                    className={"hover-arrow left"}
                    direction={"left"}
                    customCss={styled.leftPageBtn}
                    theme={"dark"}
                    onClick={() => {
                      trailerIdx > 0 && setTrailerIdx((prev: any) => prev - 1);
                    }}
                  />
                )}
                <iframe
                  data-idx={trailerIdx}
                  src={`${getCardURL({ type: "trailer", srcId: trailerSrc, autoplay: true })}`}
                  title="Trailer"
                  css={styled.iframe}
                  allowFullScreen
                />
                {trailerList && trailerIdx < trailerList.length - 1 && (
                  <CarouselArrow
                    className={"hover-arrow right"}
                    direction={"right"}
                    customCss={styled.rightPageBtn}
                    theme={"dark"}
                    onClick={() => {
                      trailerIdx < trailerList.length - 1 && setTrailerIdx((prev: any) => prev + 1);
                    }}
                  />
                )}
              </div>
            </CenterWrapper>
          </HWDialog>
        </>
      )}
    </>
  );
};

export default TrailerCard;
