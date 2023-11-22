import "@emotion/react";

type themeId = "dark";

export interface UWHooColor {
  /*primary*/
  primary900: string;
  primary800: string;
  primary700: string;
  primary500: string;
  primary300: string;
  primary100: string;
  primary50: string;

  /*grey*/
  grey900: string;
  grey800: string;
  grey700: string;
  grey600: string;
  grey500: string;
  grey400: string;
  grey300: string;
  grey200: string;
  grey100: string;
  grey50: string;

  /*state*/
  error: string;
  success: string;

  /*etc*/
  outline: string;

  /*base*/
  white: string;
  black: string;
}

interface Elevation {
  backgroundColor: string;
  boxShadow?: string;
}
export interface UWHooElevation {
  "00dp": Elevation;
  "01dp": Elevation;
  "02dp": Elevation;
  "03dp": Elevation;
  "04dp": Elevation;
  "06dp": Elevation;
  "08dp": Elevation;
  "12dp": Elevation;
  "16dp": Elevation;
  "24dp": Elevation;
}

declare module "@emotion/react" {
  interface Theme {
    color: UWHooColor;
    elevation: UWHooElevation;
  }

  // allow configuration using `createTheme`
  interface ThemeOptions {
    color?: UWHooColor;
    elevation?: UWHooElevation;
  }
}

declare module "@mui/material/styles" {
  interface Theme {
    color: UWHooColor;
    elevation: UWHooElevation;
  }

  // allow configuration using `createTheme`
  interface ThemeOptions {
    color?: UWHooColor;
    elevation?: UWHooElevation;
  }
}
