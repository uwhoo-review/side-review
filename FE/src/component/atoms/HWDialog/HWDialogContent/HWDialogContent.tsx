import React from "react";
import * as style from "./style";
import { DialogContent } from "@mui/material";
import { HWDialogContentProps } from "./type";

const HWDialogContent = React.forwardRef(
  (
    { className, customCss, children, dividers, ...props }: HWDialogContentProps,
    ref: React.Ref<HTMLDivElement>
  ) => {
    return (
      <DialogContent ref={ref} css={[style.root, customCss]} dividers={dividers} {...props}>
        {children}
      </DialogContent>
    );
  }
);

export default HWDialogContent;
