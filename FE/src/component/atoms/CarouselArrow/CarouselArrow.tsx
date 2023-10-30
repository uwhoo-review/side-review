import styled from "./style";
import { IconChevronLeft, IconChevronRight } from "@res/index";
import { SerializedStyles } from "@emotion/react";

interface CarouselArrowProps {
  direction: string;
  className?: string;
  height?: string;
  width?: string;
  radius?: string;
  backgroundColor?: string;
  customCss?: SerializedStyles;
  onClick?: () => void;
}

const CarouselArrow = ({
  className,
  direction,
  height = "52px",
  width = "30px",
  radius = "20px",
  backgroundColor = "#00000099",
  customCss,
  onClick,
}: CarouselArrowProps) => {
  return (
    <div
      className={className}
      css={[styled.wrapper(width, height, radius, backgroundColor), customCss]}
      onClick={onClick}
    >
      {direction === "left" && <IconChevronLeft />}
      {direction === "right" && <IconChevronRight />}
    </div>
  );
};

export default CarouselArrow;
