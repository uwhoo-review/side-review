import React from "react";
import { SerializedStyles } from "@emotion/react";

export interface HWDialogActionsProps {
  className?: string;
  customCss?: SerializedStyles;
  children: React.ReactNode;
}
