import styled from "./style";
import { ReactNode } from "react";
import { SerializedStyles } from "@emotion/react";

interface CenterWrapperProps {
  children?: ReactNode;
  className?: string;
  customCss?: SerializedStyles;
}

const CenterWrapper = ({ className, children, customCss }: CenterWrapperProps) => {
  return (
    <div className={className} css={[styled.wrapper, customCss]}>
      <div className="center-sub-wrapper" css={styled.center}>{children}</div>
    </div>
  );
};

export default CenterWrapper;
