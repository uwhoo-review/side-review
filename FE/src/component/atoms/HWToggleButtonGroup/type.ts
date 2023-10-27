import React from "react";
import { SerializedStyles } from "@emotion/react";

export interface HWToggleButtonGroupProps {
  className?: string;
  customCss?: SerializedStyles;
  checked?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
}
