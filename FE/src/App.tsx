import React from "react";
import MainPage from "@src/pages/MainPage/MainPage";
import GNB from "@src/component/organisms/GNB/GNB";
import { Route, Routes } from "react-router-dom";
import PopularPage from "@src/pages/PopularPage/PopularPage";
import RecentlyPage from "@src/pages/RecentlyPage/RecentlyPage";
import UpcomingPage from "@src/pages/UpcomingPage/UpcomingPage";
import DetailPage from "@src/pages/DetailPage/DetailPage";
import ReviewPage from "@src/pages/ReviewPage/ReviewPage";
import SearchResultPage from "@src/pages/SearchResultPage/SearchResultPage";
import { AxiosInterceptor } from "@src/common/axios/AxiosInstance";
import { CommonProvider } from "@src/providers/CommonProvider";

const App = () => (
  <CommonProvider>
    <AxiosInterceptor>
      <div className={"scroll-area none-draggable"}>
        <GNB />
        <Routes>
          <Route path={"/*"} element={<MainPage />} />
          <Route path={"popular"} element={<PopularPage />} />
          <Route path={"recently"} element={<RecentlyPage />} />
          <Route path={"upcoming"} element={<UpcomingPage />} />
          <Route path={"detail"}>
            <Route path={"*"} index element={<DetailPage />} />
            <Route path={"reviewTotal"} element={<ReviewPage />} />
          </Route>
          <Route path={"search"}>
            <Route path={"*"} index element={<SearchResultPage />} />
          </Route>
        </Routes>
      </div>
    </AxiosInterceptor>
  </CommonProvider>
);

export default App;
