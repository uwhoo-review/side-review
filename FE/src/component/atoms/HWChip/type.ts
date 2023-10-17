import { SerializedStyles } from "@emotion/react";
import { ChangeEvent, ReactElement, ReactNode } from "react";

export interface HWChipProps {
  className?: string;
  customCss?: SerializedStyles;
  variant?: "number" | "text" | "tag";
  label?: number | string;
  color?: "1" | "2" | "3" | "4" | "5" | "6" | "7";
  max?: number;
  onDelete?: () => void;
}
