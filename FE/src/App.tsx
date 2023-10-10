import React from "react";
import MainPage from "@src/pages/MainPage/MainPage";
import GNB from "@src/component/organisms/GNB/GNB";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => (
  <>
    <Routes>
      <Route element={<GNB />}>
        <Route path={"/*"} element={<MainPage />} />
        <Route path={"/popular"} element={<div />} />
        <Route path={"/newer"} element={<div />} />
        <Route path={"/noopened"} element={<div />} />
      </Route>
    </Routes>
  </>
);

export default App;
