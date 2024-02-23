import styled from "./style";
import HWDialog from "@src/component/atoms/HWDialog/HWDialog";
import { useEffect, useRef, useState } from "react";
import { IMAGE_URL, THUMBNAIL_URL, VIDEO_URL } from "@src/variables/tmdbConstants";
import { IconPlay } from "@res/index";
import { getCardURL } from "@src/tools/commonTools";
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
  photoList?: string[];
}

const PhotoCard = ({
  idx = 0,
  srcId,
  width = "100%",
  height = "100%",
  useModal = true,
  onClick,
  size = "original",
  photoList = [],
}: TrailerCardProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [photoSrc, setPhotoSrc] = useState(srcId);
  const [photoIdx, setPhotoIdx] = useState(idx);

  const handlePrevPhoto = () => {
    photoIdx > 0 && setPhotoIdx((prev: any) => prev - 1);
  };

  const handleNextPhoto = () => {
    photoIdx < photoList.length - 1 && setPhotoIdx((prev: any) => prev + 1);
  };

  useEffect(() => {
    if (photoList.length !== 0) setPhotoSrc(photoList[photoIdx]);
  }, [photoIdx]);

  useEffect(() => {
    const handleKeydown = (e: any) => {
      e.preventDefault();

      if (e.key === "ArrowRight") {
        handleNextPhoto();
      } else if (e.key === "ArrowLeft") {
        handlePrevPhoto();
      }
    };
    if (isOpen) {
      addEventListener("keydown", handleKeydown);
    }

    return () => {
      if (isOpen) removeEventListener("keydown", handleKeydown);
    };
  }, [isOpen, photoIdx]);

  /*      onKeyDown={(e) => {
        e.preventDefault();
        if (e.key === "ArrowRight") {
          onClickNext(e);
        } else if (e.key === "ArrowLeft") {
          onClickPrev(e);
        }
      }}*/

  return (
    <>
      <img
        src={`${getCardURL({ type: "photo", srcId: srcId, size: "w500" })}`}
        css={styled.wrapper(width, height)}
        onClick={() => {
          if (useModal) setIsOpen(!isOpen);
          onClick && onClick();
        }}
      />
      {useModal && (
        <>
          <HWDialog open={Boolean(isOpen)} onClose={() => setIsOpen(false)}>
            <CenterWrapper>
              <div
                css={styled.modalWrapper}
                onKeyDown={(e) => {
                  if (e.key === "ArrowRight") {
                  } else if (e.key === "ArrowLeft") {
                    // onClickPrev(e);
                  }
                }}
              >
                {photoIdx > 0 && (
                  <CarouselArrow
                    className={"hover-arrow left"}
                    direction={"left"}
                    customCss={styled.leftPageBtn}
                    theme={"dark"}
                    onClick={handlePrevPhoto}
                  />
                )}
                <img
                  data-idx={photoIdx}
                  src={`${getCardURL({ type: "photo", srcId: photoSrc, size: size })}`}
                  alt={photoSrc}
                  css={styled.modalImg}
                />
                {photoList && photoIdx < photoList.length - 1 && (
                  <CarouselArrow
                    className={"hover-arrow right"}
                    direction={"right"}
                    customCss={styled.rightPageBtn}
                    theme={"dark"}
                    onClick={handleNextPhoto}
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

export default PhotoCard;
