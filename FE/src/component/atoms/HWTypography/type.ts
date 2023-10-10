import React from "react";
import { SerializedStyles } from "@emotion/react";

export interface HWTypographyProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  className?: string;
  customCss?: SerializedStyles;
  variant:
    | "h4"
    | "h4_2"
    | "h4_4"
    | "h5"
    | "h5_2"
    | "h5_3"
    | "h6"
    | "h6_2"
    | "h7_3"
    | "Subtitle1"
    | "Subtitle2"
    | "Subtitle3"
    | "body1"
    | "body2"
    | "body3"
    | "body4"
    | "body5"
    | "BUTTON LARGE"
    | "BUTTON MEDIUM"
    | "BUTTON SMALL"
    | "Caption"
    | "inputLabel1"
    | "inputLabel2"
    | "inputText"
    | "tooltip"
    | "Table Header"
    | "Helper Text"
    | "Alert Title"
    | "Chip"
    | "helper Text2"
    | "dialog1"
    | "table title1"
    | "cell1";
  color?: string;
  children: React.ReactNode;
}
