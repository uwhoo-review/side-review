import styled from "./style";
import { ReactNode } from "react";

interface CenterWrapperProps {
  children?: ReactNode;
  className?: string;
}

const CenterWrapper = ({ className, children }: CenterWrapperProps) => {
  return (
    <div className={className} css={styled.wrapper}>
      <div css={styled.center}>{children}</div>
    </div>
  );
};

export default CenterWrapper;
