import React from "react";
import MainPage from "@src/pages/MainPage/MainPage";
import GNB from "@src/component/organisms/GNB/GNB";
import { Navigate, Route, Routes } from "react-router-dom";
import PopularPage from "@src/pages/PopularPage/PopularPage";
import RecentlyPage from "@src/pages/RecentlyPage/RecentlyPage";
import UpcomingPage from "@src/pages/UpcomingPage/UpcomingPage";
import DetailPage from "@src/pages/DetailPage/DetailPage";
import ReviewPage from "@src/pages/ReviewPage/ReviewPage";
import SearchResultPage from "@src/pages/SearchResultPage/SearchResultPage";
import { AxiosInterceptor } from "@src/common/axios/AxiosInstance";
import { CommonProvider } from "@src/providers/CommonProvider";
import CommonTemplate from "@src/component/templates/CommonTemplate/CommonTemplate";
import PersonPage from "@src/pages/PersonPage/PersonPage";
import LoginPage from "@src/pages/LoginPage/LoginPage";

const App = () => (
  <CommonProvider>
    <AxiosInterceptor>
      {/*<div className={"scroll-area none-draggable"}>*/}
      <Routes>
        <Route path={"/"} element={<CommonTemplate />}>
          <Route index element={<MainPage />} />
          <Route path={"login"} element={<LoginPage />} />
          <Route path={"popular"} element={<PopularPage />} />
          <Route path={"recently"} element={<RecentlyPage />} />
          <Route path={"upcoming"} element={<UpcomingPage />} />
          <Route path={"person/:id"} element={<PersonPage />} />
          <Route path={"detail/:id"} element={<DetailPage />}>
            {/*<Route path={""} index element={<DetailPage />} />*/}
            <Route path={"reviewTotal"} element={<ReviewPage />} />
          </Route>
          <Route path={"search"}>
            <Route path={"*"} index element={<SearchResultPage />} />
          </Route>
        </Route>
      </Routes>
    </AxiosInterceptor>
  </CommonProvider>
);

export default App;
