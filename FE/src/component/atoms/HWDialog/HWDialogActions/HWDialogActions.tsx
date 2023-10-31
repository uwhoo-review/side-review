import React from "react";
import { DialogActions } from "@mui/material";
import { HWDialogActionsProps } from "./type";
import * as style from "./style";

const HWDialogActions = React.forwardRef(
  (
    { className, customCss, children, ...props }: HWDialogActionsProps,
    ref: React.Ref<HTMLDivElement>
  ) => {
    return (
      <DialogActions className={className} css={[style.root, customCss]} ref={ref} {...props}>
        {children}
      </DialogActions>
    );
  }
);

export default HWDialogActions;
