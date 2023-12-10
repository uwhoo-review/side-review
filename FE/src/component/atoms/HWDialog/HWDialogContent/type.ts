import React from "react";
import { SerializedStyles } from "@emotion/react";

export interface HWDialogContentDO {
  className?: string;
  customCss?: SerializedStyles;
  children: React.ReactNode;
  dividers?: boolean;
}
