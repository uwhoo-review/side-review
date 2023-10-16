import { SerializedStyles } from "@emotion/react";
import React, { HTMLAttributes } from "react";

export interface HWOutlinedSelectBoxItemProps
  extends HTMLAttributes<HTMLLIElement> {
  className?: string;
  customCss?: SerializedStyles;
  value?: string | number | readonly string[];
  divider?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
}
