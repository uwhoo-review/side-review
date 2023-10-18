import React from "react";
import { HWButtonProps } from "./type";
import * as style from "./style";
import { ButtonBase } from "@mui/material";

const HWButton = React.forwardRef<HTMLButtonElement, HWButtonProps>(
  (
    {
      className,
      customCss,
      variant = "primary",
      size = "large",
      children,
      disabled,
      ...props
    }: HWButtonProps,
    ref
  ) => {
    return (
      <ButtonBase
        className={className}
        css={[style.root(size), style.variant(variant), style.typography(size), customCss]}
        focusRipple
        disabled={disabled}
        {...props}
        ref={ref}
      >
        {children}
      </ButtonBase>
    );
  }
);

HWButton.displayName = "HWButton";

export default HWButton;
