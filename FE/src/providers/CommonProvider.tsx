import {
  createContext,
  createRef,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import styled from "./style";
import HWAlert from "@src/component/atoms/HWAlert";
import { FilterProps } from "@src/interfaces/common.interface";
import { DEFAULT_USER_INFO, UWHOO_LOGIN } from "@src/variables/LoginConstants";
import { getCookie } from "@src/tools/commonTools";
import { UWAxios } from "@src/common/axios/AxiosConfig";

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
  const [loginSession, setLogoinSession] = useState("");
  const [userInfo, setUserInfo] = useState(DEFAULT_USER_INFO);
  const [theme, setTheme] = useState("light");

  const [alert, setAlert] = useState({
    is: false,
    type: undefined,
    disableCloseIcon: false,
    title: undefined,
    timeInfo: undefined,
    children: <></>,
    width: undefined,
    autoCloseTime: 4000,
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
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  const onHandleFilter = (v: FilterProps) => setFilterState((prev) => ({ ...prev, ...v }));
  const onHandleFilterOpen = (v: boolean) => setIsFilterOpen(v);
  const onAlert = (item: any) => setAlert((prev) => ({ ...prev, ...item }));
  const onResetAlert = () =>
    setAlert({
      is: false,
      type: undefined,
      disableCloseIcon: false,
      title: undefined,
      timeInfo: undefined,
      children: <></>,
      width: undefined,
      autoCloseTime: 4000,
    });
  const onHandleUserInfo = (v: any) => setUserInfo((prev: any) => ({ ...prev, ...v }));
  const onResetUserInfo = () => setUserInfo(DEFAULT_USER_INFO);
  const onHandleLogin = (v: boolean) => setIsLogin(v);
  const onHandleLoginSession = (v: string) => setLogoinSession(v);

  useEffect(() => {
    if (isLogin) {
      localStorage.setItem(
        UWHOO_LOGIN,
        JSON.stringify({
          isLogin: isLogin,
          userInfo: userInfo,
          date: new Date().getTime(),
        })
      );
    }
  }, [userInfo, isLogin]);

  useLayoutEffect(() => {
    const loginInfoStr = localStorage.getItem(UWHOO_LOGIN);
    if (loginInfoStr) {
      const loginInfo = JSON.parse(loginInfoStr);
      const currentTime = new Date().getTime();
      const timeElapsed = currentTime - parseInt(loginInfo.date, 10);
      if (timeElapsed > 24 * 60 * 60 * 1000) {
        localStorage.removeItem(UWHOO_LOGIN);
      } else {
        if (loginInfo.isLogin && loginInfo.userInfo !== null) {
          setIsLogin(true);
          setLogoinSession(loginInfo.sessionId);
          setUserInfo({ ...loginInfo.userInfo });
        }
      }
    } else {
      // (async () => await UWAxios.login.logout(userInfo.type, userInfo.token, "/login/logout"))();
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
        onResetAlert,

        onHandleLoginSession,
        loginSession,

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
              autoCloseTime={alert.autoCloseTime}
            >
              {alert.children}
            </HWAlert>
          </div>
        )}
      </>
    </CommonContext.Provider>
  );
};
