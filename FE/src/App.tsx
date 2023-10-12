import React from "react";
import MainPage from "@src/pages/MainPage/MainPage";
import GNB from "@src/component/organisms/GNB/GNB";
import { Route, Routes } from "react-router-dom";
import PopularPage from "@src/pages/PopularPage/PopularPage";
import RecentlyPage from "@src/pages/RecentlyPage/RecentlyPage";
import UpcomingPage from "@src/pages/UpcomingPage/UpcomingPage";

const App = () => (
  <>
    <Routes>
      <Route element={<GNB />}>
        <Route path={"/*"} element={<MainPage />} />
        <Route path={"/popular"} element={<PopularPage />} />
        <Route path={"/recently"} element={<RecentlyPage />} />
        <Route path={"/upcoming"} element={<UpcomingPage />} />
      </Route>
    </Routes>
  </>
);

export default App;
