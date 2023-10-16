import { MenuItem } from "@mui/material";
import React from "react";
import { HWOutlinedSelectBoxItemProps } from "./type";
import * as style from "./style";

const HWOutlinedSelectBoxItem = ({
  className,
  customCss,
  children,
  value,
  divider,
  disabled = false,
  ...props
}: HWOutlinedSelectBoxItemProps) => {
  return (
    <MenuItem
      className={className}
      css={[style.root, customCss]}
      value={value}
      divider={divider}
      disabled={disabled}
      {...props}
    >
      <div className={"menu-box"}>{children}</div>
    </MenuItem>
  );
};

export default HWOutlinedSelectBoxItem;
