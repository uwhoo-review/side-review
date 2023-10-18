import { MenuItem } from "@mui/material";
import React from "react";
import { HWOutlinedSelectBoxItemProps } from "./type";
import * as style from "./style";
import { IconCheck } from "@res/index";

const HWOutlinedSelectBoxItem = ({
  className,
  customCss,
  children,
  value,
  divider,
  disabled = false,
  selected,
  ...props
}: HWOutlinedSelectBoxItemProps) => {
  return (
    <MenuItem
      className={className}
      css={[style.root, customCss]}
      value={value}
      divider={divider}
      disabled={disabled}
      selected={selected}
      {...props}
    >
      <div className={"menu-box"}>
        {children}
        {selected && <IconCheck className={"icon-check"} />}
      </div>
    </MenuItem>
  );
};

export default HWOutlinedSelectBoxItem;
