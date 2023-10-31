import React from "react";
import { DialogTitle } from "@mui/material";

import { HWDialogTitleProps } from "./type";
import CloseIcon from "@mui/icons-material/Close";
import * as style from "./style";
import HWIconButton from "@src/component/atoms/HWIconButton/HWIconButton";

const HWDialogTitle = React.forwardRef(
  (
    { className, customCss, children, onClose, ...props }: HWDialogTitleProps,
    ref: React.Ref<HTMLSpanElement>
  ) => {
    return (
      <DialogTitle
        className={className}
        css={[style.root, customCss]}
        ref={ref}
        {...props}
      >
        {children}
        {onClose ? (
          <HWIconButton
            aria-label="close"
            onClick={onClose}
            css={[style.escapeButton]}
          >
            <CloseIcon />
          </HWIconButton>
        ) : null}
      </DialogTitle>
    );
  }
);

export default HWDialogTitle;
