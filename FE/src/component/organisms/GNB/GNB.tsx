import styled from "./style";
import { Outlet } from "react-router-dom";

const GNB = (props: { children?: React.ReactNode }) => {
  return (
    <>
      <div css={styled.wrapper}>
        <div css={styled.logo}>SIDE REVIEW</div>
      </div>
      <div>
        <Outlet />
      </div>
    </>
  );
};
export default GNB;
