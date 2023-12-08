import styled from "./style";
import GNB from "@src/component/organisms/GNB/GNB";
import { Outlet } from "react-router-dom";
import Footer from "@src/component/organisms/Footer/Footer";

const CommonTemplate = () => {
  return (
    <div css={styled.wrapper}>
      <GNB />
      <Outlet />
      <Footer />
    </div>
  );
};

export default CommonTemplate;
