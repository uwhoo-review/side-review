import React from "react";
import { SerializedStyles } from "@emotion/react";

export interface HWDialogTitleProps {
  className?: string;
  customCss?: SerializedStyles;
  children?: React.ReactNode;
  onClose?: () => void;
}
