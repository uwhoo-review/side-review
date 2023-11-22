import { createContext, useContext, useState } from "react";
import styled from "./style";
import HWAlert from "@src/component/atoms/HWAlert";
import { ThemeProvider } from "@emotion/react";
import { darkTheme } from "@src/common/styles/Theme";

const CommonContext = createContext<any | null>(null);
export const useCommon = () => {
  const context = useContext(CommonContext);
  if (context === null) {
    throw Error("Visualization Context Provider 범위를 벗어났습니다.");
  }
  return context;
};

export const CommonProvider = ({ children }: { children: React.ReactElement }) => {
  const [alert, setAlert] = useState({
    is: false,
    type: undefined,
    disableCloseIcon: false,
    title: undefined,
    timeInfo: undefined,
    children: <></>,
    width: undefined,
  });

  return (
    <CommonContext.Provider value={{ alert, setAlert }}>
      <>
        <ThemeProvider theme={darkTheme}>
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
        </ThemeProvider>
      </>
    </CommonContext.Provider>
  );
};
