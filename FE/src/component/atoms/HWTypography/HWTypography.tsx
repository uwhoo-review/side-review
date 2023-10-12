import React from "react";
import { HWTypographyProps } from "./type";
import style from "./style";

const HWTypography = React.forwardRef(
  (
    { className, variant, color = "inherit", customCss, ...props }: HWTypographyProps,
    ref: React.Ref<HTMLSpanElement> | React.RefCallback<HTMLSpanElement>
  ) => {
    return (
      <span
        className={className}
        css={[style.root, { color }, style.variant(variant), customCss]}
        ref={ref}
        {...props}
      />
    );
  }
);
HWTypography.displayName = "HWTypography";

export default HWTypography;
