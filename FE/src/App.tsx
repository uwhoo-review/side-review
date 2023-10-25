import React from "react";
import MainPage from "@src/pages/MainPage/MainPage";
import GNB from "@src/component/organisms/GNB/GNB";
import { Route, Routes } from "react-router-dom";
import PopularPage from "@src/pages/PopularPage/PopularPage";
import RecentlyPage from "@src/pages/RecentlyPage/RecentlyPage";
import UpcomingPage from "@src/pages/UpcomingPage/UpcomingPage";
import DetailPage from "@src/pages/DetailPage/DetailPage";

const App = () => (
  <>
    <GNB />
    <Routes>
      <Route path={"/*"} element={<MainPage />} />
      <Route path={"/popular"} element={<PopularPage />} />
      <Route path={"/recently"} element={<RecentlyPage />} />
      <Route path={"/upcoming"} element={<UpcomingPage />} />
      <Route path={"/detail"} element={<DetailPage />} />
      {/*<Route*/}
      {/*  element={*/}
      {/*    <>*/}
      {/*      <GNB />*/}
      {/*    </>*/}
      {/*  }*/}
      {/*>*/}
      {/*  */}
      {/*</Route>*/}
    </Routes>
  </>
);

export default App;
