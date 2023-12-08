import LoadingDot from "@src/component/atoms/LoadingDot/LoadingDot";
import styled from "./style";

const LoadingGrid = () => {
  return (
    <div css={styled.wrapper}>
      <LoadingDot />
    </div>
  );
};

export default LoadingGrid;
