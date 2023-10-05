import React from "react";
import MainPage from "@src/pages/MainPage/MainPage";
import GNB from "@src/component/organisms/GNB/GNB";
import LNB from "@src/component/organisms/LNB/LNB";
import Content from "@src/component/organisms/Content/Content";
import {BrowserRouter, Route, Routes} from "react-router-dom";

const App = () => (
    <>
        <Routes>
          <Route element={<>         <GNB />
            <LNB /></>}>
          </Route>
            <Route path={"/"} element={<MainPage />}/>
        </Routes>
    </>
);

export default App;
