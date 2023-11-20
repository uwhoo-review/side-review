import styled from "./style";
import HWDialog from "@src/component/atoms/HWDialog/HWDialog";
import { useState } from "react";
import { IMAGE_URL, THUMBNAIL_URL, VIDEO_URL } from "@src/variables/tmdbConstants";
import { IconPlay } from "@res/index";
import { getCardURL } from "@src/tools/commonTools";

interface TrailerCardProps {
  srcId: string;
  width?: string;
  height?: string;
  useModal?: boolean;
  onClick?: () => void;
  size?: string;
}

const PhotoCard = ({
  srcId,
  width = "100%",
  height = "100%",
  useModal = true,
  onClick,
  size = "original",
}: TrailerCardProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <img
        src={`${getCardURL({ type: "photo", srcId: srcId, size: size })}`}
        css={styled.wrapper(width, height)}
        onClick={() => {
          if (useModal) setIsOpen(!isOpen);
          onClick && onClick();
        }}
      />
      {useModal && (
        <>
          <HWDialog open={Boolean(isOpen)} onClose={() => setIsOpen(false)}>
            <img
              src={`${getCardURL({ type: "photo", srcId: srcId, size: size })}`}
              // src={"https://image.tmdb.org/t/p/w200/1AZcHRuWvmuUNhLj3XWcd54V80B.jpg"}
              alt={srcId}
              css={styled.modalImg}
            />
          </HWDialog>
        </>
      )}
    </>
  );
};

export default PhotoCard;
