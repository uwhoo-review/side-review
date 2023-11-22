import { SerializedStyles } from "@emotion/react";
import { PaperProps, SelectChangeEvent } from "@mui/material";
import React, { HTMLAttributes } from "react";

export interface HWOutlinedSelectBoxProps<T extends string | number | readonly string[]>
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  className?: string;
  customCss?: SerializedStyles;
  value?: T;
  variant?: "primary" | "table";
  size?: "medium" | "small";
  label?: string;
  placeholder?: string;
  fullWidth?: boolean;
  children?: React.ReactNode;
  width?: string;
  height?: string;
  helperText?: string;
  readOnly?: boolean;
  error?: boolean;
  disabled?: boolean;
  multiple?: boolean;
  disablePortal?: boolean;
  renderValue?: (value: T) => React.ReactNode;
  onChange?: (e: SelectChangeEvent<T>, child: React.ReactNode) => void;
  displayEmpty?: boolean;
  PaperProps?: Partial<PaperProps>;
  required?: boolean;
  inputRef?: React.LegacyRef<HTMLDivElement>;
}
