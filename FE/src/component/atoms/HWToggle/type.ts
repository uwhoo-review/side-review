import React from "react";
import { SerializedStyles } from "@emotion/react";

export interface HWToggleProps {
  className?: string;
  customCss?: SerializedStyles;
  checked?: boolean;
  disabled?: boolean;
  label?: string | React.ReactNode;
  labelPlacement?: "top" | "start" | "bottom" | "end";
  size?: "medium" | "small";
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
