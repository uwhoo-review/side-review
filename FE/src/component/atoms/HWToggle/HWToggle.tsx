import React, { useState } from "react";
import { FormControlLabel,  Switch } from "@mui/material";
import { HWToggleProps } from "./type";
import * as style from "./style";
import HWTypography from "@src/component/atoms/HWTypography/HWTypography";
import Color from "@src/common/styles/Color";

const HWToggle = React.forwardRef(
  (
    {
      className,
      customCss,
      checked,
      disabled = false,
      label,
      labelPlacement = "end",
      size = "medium",
      onChange,
      ...props
    }: HWToggleProps,
    ref: React.Ref<HTMLButtonElement>
  ) => {
    if (label) {
      let tempLabel: React.ReactNode = label;
      if (typeof label === "string") {
        tempLabel =
          size === "medium" ? (
            <HWTypography variant="body2" color={Color.dark.grey700}>{label}</HWTypography>
          ) : (
            <HWTypography variant="body2" color={Color.dark.grey700}>{label}</HWTypography>
          );
      }

      return (
        <FormControlLabel
          className={className}
          css={[style.form, customCss]}
          control={
            <Switch
              css={[style.root]}
              checked={checked}
              disabled={disabled}
              onChange={onChange}
              size={size}
            />
          }
          ref={ref}
          label={tempLabel}
          checked={checked}
          labelPlacement={labelPlacement}
          {...props}
        />
      );
    } else {
      return (
        <Switch
          className={className}
          css={[style.root, customCss]}
          checked={checked}
          disabled={disabled}
          onChange={onChange}
          size={size}
          ref={ref}
          {...props}
        />
      );
    }
  }
);

export default HWToggle;
