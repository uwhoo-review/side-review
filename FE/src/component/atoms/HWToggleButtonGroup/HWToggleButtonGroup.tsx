import React, { useState } from "react";
import { HWToggleButtonGroupProps } from "./type";
import * as style from "./style";

const HWToggleButtonGroup = React.forwardRef(
  (
    { className, customCss, children, ...props }: HWToggleButtonGroupProps,
    ref: React.Ref<HTMLDivElement>
  ) => {
    let classNames = [];
    classNames.push("HW_ToggleButtonGroup", className ? `${className}` : null);
    classNames = classNames.filter(Boolean);

    return (
      <div
        className={classNames.join(" ")}
        css={[style.root, customCss]}
        ref={ref}
      >
        {children}
      </div>
    );
  }
);

export default HWToggleButtonGroup;
