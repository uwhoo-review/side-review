import styled from "./style";
import HWDialog from "@src/component/atoms/HWDialog/HWDialog";
import { useState } from "react";
import { THUMBNAIL_URL, VIDEO_URL } from "@src/variables/tmdbConstants";
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

const TrailerCard = ({
  srcId,
  width = "100%",
  height = "100%",
  useModal = true,
  onClick,
  size = "mqdefault",
}: TrailerCardProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
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
      {useModal && (
        <>
          <HWDialog open={Boolean(isOpen)} onClose={() => setIsOpen(false)}>
            <iframe
              src={`${getCardURL({ type: "trailer", srcId: srcId, autoplay: true })}`}
              title="Trailer"
              css={styled.iframe}
              allowFullScreen
            />
          </HWDialog>
        </>
      )}
    </>
  );
};

export default TrailerCard;
