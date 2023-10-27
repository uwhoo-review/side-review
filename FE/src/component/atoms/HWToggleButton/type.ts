import React from "react";
import { SerializedStyles } from "@emotion/react";

export interface HWToggleButtonProps {
  className?: string;
  customCss?: SerializedStyles;
  checked?: boolean;
  disabled?: boolean;
  disableOutlined?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  variant?: "medium" | "large";
  width?: string;
  height?: string;
  children?: React.ReactNode;
}
