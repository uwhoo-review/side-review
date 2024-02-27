import React from "react";
import MainPage from "@src/pages/MainPage/MainPage";
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
import NaverRedirect from "@src/component/organisms/LoginGrid/Redirect/NaverRedirect";
import KakaoRedirect from "@src/component/organisms/LoginGrid/Redirect/KakaoRedirect";
import GoogleRedirect from "@src/component/organisms/LoginGrid/Redirect/GoogleRedirect";
import MyPage from "@src/pages/MyPage/MyPage";
import Redirect from "@src/component/organisms/LoginGrid/Redirect/Redirect";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

const App = () => (
  <CommonProvider>
    <AxiosInterceptor>
      {/*<div className={"scroll-area none-draggable"}>*/}
      <DndProvider backend={HTML5Backend}>

        <Routes>
          <Route path={"/"} element={<CommonTemplate />}>
            <Route index element={<MainPage />} />
            <Route path={"login"}>
              <Route index element={<LoginPage />} />
              <Route path={"naver"} element={<NaverRedirect />} />
              <Route path={"kakao"} element={<KakaoRedirect />} />
              <Route path={"google"} element={<GoogleRedirect />} />
              <Route path={"logout"} element={<Redirect />} />
            </Route>

            <Route path={"redirect"} element={<Redirect />} />
            <Route path={"popular"} element={<PopularPage />} />
            <Route path={"recently"} element={<RecentlyPage />} />
            <Route path={"upcoming"} element={<UpcomingPage />} />
            <Route path={"person/:id"} element={<PersonPage />} />
            <Route path={"detail/:id"}>
              <Route index element={<DetailPage />} />
              <Route path={"review-total"} element={<ReviewPage />} />
            </Route>
            <Route path={"search"}>
              <Route path={"*"} index element={<SearchResultPage />} />
            </Route>
            <Route path={"mypage"} element={<MyPage />} />
          </Route>
        </Routes>
      </DndProvider>
    </AxiosInterceptor>
  </CommonProvider>
);

export default App;
