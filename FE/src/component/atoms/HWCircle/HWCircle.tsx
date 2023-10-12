import * as style from "./style";
import { HWCircleProps } from "./type";

const HWCircle = ({
  className,
  width = 5,
  height = 5,
  color = "#ffffff",
  border = "none",
  onClick,
  customCss,
  active,
  ...props
}: HWCircleProps) => {
  return (
    <div
      className={className}
      css={[style.root.circle(width, height, color, border), customCss]}
      onClick={onClick}
      {...props}
    />
  );
};

export default HWCircle;
