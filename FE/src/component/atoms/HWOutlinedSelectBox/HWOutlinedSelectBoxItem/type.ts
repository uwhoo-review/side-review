import { SerializedStyles } from "@emotion/react";
import React, { HTMLAttributes } from "react";

export interface HWOutlinedSelectBoxItemProps extends HTMLAttributes<HTMLLIElement> {
  className?: string;
  customCss?: SerializedStyles;
  value?: string | number | readonly string[] | any;
  divider?: boolean;
  disabled?: boolean;
  selected?: boolean;
  children: React.ReactNode;
}
