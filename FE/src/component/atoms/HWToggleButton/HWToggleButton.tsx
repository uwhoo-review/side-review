import React, { useState } from "react";
import { ButtonBase } from "@mui/material";
import { HWToggleButtonProps } from "./type";
import * as style from "./style";

const HWToggleButton = React.forwardRef(
  (
    {
      className,
      customCss,
      checked,
      disabled = false,
      disableOutlined = false,
      onClick,
      children,
      width = "fit-content",
      height = "36px",
      variant = "large",
      ...props
    }: HWToggleButtonProps,
    ref: React.Ref<HTMLButtonElement>
  ) => {
    const [checked_, setChecked] = useState<boolean | undefined>(undefined);
    if (checked_ === undefined) {
      setChecked(false);
    }
    const handleCheck = () => {
      setChecked(!checked_);
    };

    let classNames = [];
    classNames.push(
      "HW_ToggleButton",
      disabled ? "HW_Disabled" : null,
      checked ? "HW_Checked" : null,
      disableOutlined ? "HW_DisableOutlined" : null,
      className ? `${className}` : null
    );
    classNames = classNames.filter(Boolean);

    return (
      <ButtonBase
        className={classNames.join(" ")}
        css={[style.root(width, height), customCss]}
        onClick={onClick || handleCheck}
        {...props}
        ref={ref}
      >
        {children}
      </ButtonBase>
    );
  }
);

export default HWToggleButton;
