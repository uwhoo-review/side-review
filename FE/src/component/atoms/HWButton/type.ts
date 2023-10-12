import React, { DOMAttributes, ReactNode } from "react";
import { SerializedStyles } from "@emotion/react";

export interface HWButtonProps extends DOMAttributes<HTMLButtonElement> {
  className?: string;
  customCss?: SerializedStyles;
  variant?: "primary" | "secondary" | "lower" | "lowest" | "box";
  size?: "xlarge" | "large" | "medium" | "small";
  children?: ReactNode;
  disabled?: boolean;
}
