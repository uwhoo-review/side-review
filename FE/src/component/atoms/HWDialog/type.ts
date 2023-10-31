import React from "react";
import { SerializedStyles } from "@emotion/react";

export interface HWDialogProps {
  className?: string;
  customCss?: SerializedStyles;
  children: React.ReactNode;
  width?: string;
  height?: string;
  open: boolean;
  onClose: () => void;
}
