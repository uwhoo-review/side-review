import { createTheme, Theme } from "@mui/material/styles";

export const darkTheme: Theme = createTheme({
  color: {
    /*primary*/
    primary900: "#E3E2F5",
    primary800: "#B6B2EA",
    primary700: "#6D6ADA",
    primary500: "#5354DA",
    primary300: "#3940C6",
    primary100: "#2C34AE",
    primary50: "#14228F",

    /*grey*/
    grey900: "#F9F9FD",
    grey800: "#D9DAE5",
    grey700: "#C7C8D3",
    grey600: "#B5B5BD",
    grey500: "#9897A1",
    grey400: "#84838D",
    grey300: "#42424A",
    grey200: "#2C2C34",
    grey100: "#202027",
    grey50: "#121214",

    /*state*/
    error: "#cf6679",
    success: "#73c873",

    /*etc*/
    outline: "#FFFFFF1F",

    /*base*/
    white: "#ffffff",
    black: "#000000",
  },
  elevation: {
    "00dp": {
      backgroundColor: "#121212",
    },
    "01dp": {
      backgroundColor: "#1e1e1e",
      boxShadow: "0px 1px 3px 0px rgba(0, 0, 0, 0.20), 0px 2px 1px 0px rgba(0, 0, 0, 0.12), 0px 1px 1px 0px rgba(0, 0, 0, 0.14)",
    },
    "02dp": {
      backgroundColor: "#232323",
      boxShadow: "0px 1px 5px 0px rgba(0, 0, 0, 0.20), 0px 3px 1px 0px rgba(0, 0, 0, 0.12), 0px 2px 2px 0px rgba(0, 0, 0, 0.14)",
    },
    "03dp": {
      backgroundColor: "#252525",
      boxShadow: "0px 1px 8px 0px rgba(0, 0, 0, 0.20), 0px 3px 3px 0px rgba(0, 0, 0, 0.12), 0px 3px 4px 0px rgba(0, 0, 0, 0.14)",
    },
    "04dp": {
      backgroundColor: "#272727",
      boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.20), 0px 1px 10px 0px rgba(0, 0, 0, 0.12), 0px 4px 5px 0px rgba(0, 0, 0, 0.14)",
    },
    "06dp": {
      backgroundColor: "#2C2C2C",
      boxShadow: "0px 3px 5px 0px rgba(0, 0, 0, 0.20), 0px 1px 18px 0px rgba(0, 0, 0, 0.12), 0px 6px 10px 0px rgba(0, 0, 0, 0.14)",
    },
    "08dp": {
      backgroundColor: "#2E2E2E",
      boxShadow: "0px 5px 5px 0px rgba(0, 0, 0, 0.20), 0px 3px 14px 0px rgba(0, 0, 0, 0.12), 0px 8px 10px 0px rgba(0, 0, 0, 0.14)",
    },
    "12dp": {
      backgroundColor: "#333333",
      boxShadow: "0px 7px 8px 0px rgba(0, 0, 0, 0.20), 0px 5px 22px 0px rgba(0, 0, 0, 0.12), 0px 12px 17px 0px rgba(0, 0, 0, 0.14)",
    },
    "16dp": {
      backgroundColor: "#363636",
      boxShadow: "0px 8px 10px 0px rgba(0, 0, 0, 0.20), 0px 6px 30px 0px rgba(0, 0, 0, 0.12), 0px 16px 24px 0px rgba(0, 0, 0, 0.14)",
    },
    "24dp": {
      backgroundColor: "#383838",
      boxShadow: "0px 11px 15px 0px rgba(0, 0, 0, 0.20), 0px 9px 46px 0px rgba(0, 0, 0, 0.12), 0px 24px 38px 0px rgba(0, 0, 0, 0.14)",
    },
  },
});

export const whiteTheme: Theme = createTheme({
  color: {
    /*primary*/
    primary900: "#1728A9",
    primary800: "#333DCC",
    primary700: "#434CE9",
    primary500: "#6163FF",
    primary300: "#7F7DFF",
    primary100: "#BFBCFF",
    primary50: "#E9E8FF",

    /*grey*/
    grey900: "#121214",
    grey800: "#3F3E49",
    grey700: "#5D5D69",
    grey600: "#71717D",
    grey500: "#A4A3AE",
    grey400: "#B9B9C6",
    grey300: "#D5D5DE",
    grey200: "#E4E4EB",
    grey100: "#EBEBF1",
    grey50: "#FAFAFD",

    /*state*/
    error: "#EAB2BB",
    success: "#B4E3BA",

    /*etc*/
    outline: "#D4D4D4",

    /*base*/
    white: "#ffffff",
    black: "#000000",
  },
  elevation: {
    "00dp": {
      backgroundColor: "#121212",
    },
    "01dp": {
      backgroundColor: "#1e1e1e",
      boxShadow: "0px 1px 3px 0px rgba(0, 0, 0, 0.20), 0px 2px 1px 0px rgba(0, 0, 0, 0.12), 0px 1px 1px 0px rgba(0, 0, 0, 0.14)",
    },
    "02dp": {
      backgroundColor: "#232323",
      boxShadow: "0px 1px 5px 0px rgba(0, 0, 0, 0.20), 0px 3px 1px 0px rgba(0, 0, 0, 0.12), 0px 2px 2px 0px rgba(0, 0, 0, 0.14)",
    },
    "03dp": {
      backgroundColor: "#252525",
      boxShadow: "0px 1px 8px 0px rgba(0, 0, 0, 0.20), 0px 3px 3px 0px rgba(0, 0, 0, 0.12), 0px 3px 4px 0px rgba(0, 0, 0, 0.14)",
    },
    "04dp": {
      backgroundColor: "#272727",
      boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.20), 0px 1px 10px 0px rgba(0, 0, 0, 0.12), 0px 4px 5px 0px rgba(0, 0, 0, 0.14)",
    },
    "06dp": {
      backgroundColor: "#2C2C2C",
      boxShadow: "0px 3px 5px 0px rgba(0, 0, 0, 0.20), 0px 1px 18px 0px rgba(0, 0, 0, 0.12), 0px 6px 10px 0px rgba(0, 0, 0, 0.14)",
    },
    "08dp": {
      backgroundColor: "#2E2E2E",
      boxShadow: "0px 5px 5px 0px rgba(0, 0, 0, 0.20), 0px 3px 14px 0px rgba(0, 0, 0, 0.12), 0px 8px 10px 0px rgba(0, 0, 0, 0.14)",
    },
    "12dp": {
      backgroundColor: "#333333",
      boxShadow: "0px 7px 8px 0px rgba(0, 0, 0, 0.20), 0px 5px 22px 0px rgba(0, 0, 0, 0.12), 0px 12px 17px 0px rgba(0, 0, 0, 0.14)",
    },
    "16dp": {
      backgroundColor: "#363636",
      boxShadow: "0px 8px 10px 0px rgba(0, 0, 0, 0.20), 0px 6px 30px 0px rgba(0, 0, 0, 0.12), 0px 16px 24px 0px rgba(0, 0, 0, 0.14)",
    },
    "24dp": {
      backgroundColor: "#383838",
      boxShadow: "0px 11px 15px 0px rgba(0, 0, 0, 0.20), 0px 9px 46px 0px rgba(0, 0, 0, 0.12), 0px 24px 38px 0px rgba(0, 0, 0, 0.14)",
    },
  },
});
