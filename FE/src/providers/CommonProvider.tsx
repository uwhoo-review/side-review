import { createContext, createRef, useContext, useEffect, useRef, useState } from "react";
import styled from "./style";
import HWAlert from "@src/component/atoms/HWAlert";
import { FilterProps } from "@src/interfaces/common.interface";
import { UWHOO_LOGIN } from "@src/variables/LoginConstants";
import { getCookie } from "@src/tools/commonTools";

const CommonContext = createContext<any | null>(null);
export const useCommon = () => {
  const context = useContext(CommonContext);
  if (context === null) {
    throw Error("Context Provider 범위를 벗어났습니다.");
  }
  return context;
};

export const CommonProvider = ({ children }: { children: React.ReactElement }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [userInfo, setUserInfo] = useState({
    userId: "",
    userName: "",
    age: "",
    gender: "",
    email: "",
    site: "",
    date: null,
  });

  const [alert, setAlert] = useState({
    is: false,
    type: undefined,
    disableCloseIcon: false,
    title: undefined,
    timeInfo: undefined,
    children: <></>,
    width: undefined,
  });

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [filterState, setFilterState] = useState<FilterProps>({
    search: "",
    genre: [],
    platform: [],
    watch: [],
    rating: [0, 5],
    date: [null, null],
    sort: "popularity",
  });

  const searchRef = useRef(null);
  const genreRef = useRef(null);
  const platformRef = useRef(null);
  const watchRef = useRef(null);
  const ratingRef = useRef(null);
  const yearRef = useRef(null);
  const sortRef = useRef(null);

  const filterRef = {
    searchRef,
    genreRef,
    platformRef,
    watchRef,
    ratingRef,
    yearRef,
    sortRef,
  };

  const onHandleFilter = (v: FilterProps) => setFilterState((prev) => ({ ...prev, ...v }));
  const onHandleFilterOpen = (v: boolean) => setIsFilterOpen(v);
  const onAlert = (item: any) => setAlert((prev) => ({ ...prev, ...item }));
  const onHandleUserInfo = (v: any) => setUserInfo((prev: any) => ({ ...prev, ...v }));
  const onResetUserInfo = () =>
    setUserInfo({ userId: "", userName: "", age: "", gender: "", email: "", site: "", date: null });
  const onHandleLogin = (v: boolean) => setIsLogin(v);

  useEffect(() => {
    const loginInfoStr = getCookie(UWHOO_LOGIN);
    if (loginInfoStr) {
      const loginInfo = JSON.parse(loginInfoStr);
      if (loginInfo.isLogin && loginInfo.userInfo !== null) {
        setIsLogin(true);
        setUserInfo({ ...loginInfo.userInfo });
      }
    }
  }, []);

  return (
    <CommonContext.Provider
      value={{
        genreRef,
        platformRef,
        watchRef,
        ratingRef,
        yearRef,
        sortRef,
        searchRef,
        filterRef,
        onAlert,

        filterState,
        onHandleFilter,

        isFilterOpen,
        onHandleFilterOpen,

        userInfo,
        onHandleUserInfo,
        onResetUserInfo,

        isLogin,
        onHandleLogin,
      }}
    >
      <>
        {children}
        {alert.is && (
          <div css={styled.alertWrapper}>
            <HWAlert
              customCss={styled.alert(alert.width)}
              type={alert.type}
              title={alert.title}
              disableCloseIcon={alert.disableCloseIcon}
              timeInfo={alert.timeInfo}
              onClose={() => setAlert((prev: any) => ({ ...prev, is: false }))}
            >
              {alert.children}
            </HWAlert>
          </div>
        )}
      </>
    </CommonContext.Provider>
  );
};
