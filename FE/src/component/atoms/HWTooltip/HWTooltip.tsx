import React, { useEffect, useRef, useState } from "react";
import { ClassNames } from "@emotion/react";
import { Tooltip } from "@mui/material";
import { HWTooltipProps } from "./type";
import * as style from "./style";
import { useLayoutEffect } from "react";

const HWTooltip = React.forwardRef(
  (
    {
      title = "",
      children,
      variant = "primary",
      placement = "bottom-start",
      disableHoverListener = false,
      disableInteractive = false,
      disableFocusListener = false,
      PopperProps,
      open,
      ...props
    }: HWTooltipProps,
    ref: React.Ref<HTMLDivElement>
  ) => {
    const basicButton = <div css={[style.basicButton]}>My Tooltip</div>;
    const textElementRef = useRef<HTMLDivElement | null>(null);
    const [isOverflowed, setIsOverFlowed] = useState<boolean>(false);
    const computeIsOverFlowed = () => {
      if (!textElementRef.current) return;
      setIsOverFlowed(
        textElementRef.current.scrollWidth - 1 >=
          textElementRef.current.clientWidth
      );
    };

    useEffect(() => {
      window.addEventListener("resize", computeIsOverFlowed);
      computeIsOverFlowed(); // 초기값 설정을 위해 한번 호출
      return () => window.removeEventListener("resize", computeIsOverFlowed);
    }, []);

    useLayoutEffect(() => {
      computeIsOverFlowed();
    }, [textElementRef, textElementRef.current?.clientWidth, children]);

    if (variant !== "ellipsis") {
      return (
        <ClassNames>
          {({ css }) => (
            <Tooltip
              ref={ref}
              classes={{
                tooltip: style.tooltip(css, variant),
              }}
              title={title}
              followCursor
              placement={placement}
              disableHoverListener={disableHoverListener}
              disableInteractive={disableInteractive}
              disableFocusListener={disableFocusListener}
              PopperProps={PopperProps}
              open={open}
              {...props}
            >
              {children ? children : basicButton}
            </Tooltip>
          )}
        </ClassNames>
      );
    } else {
      return (
        <ClassNames>
          {({ css }) => (
            <Tooltip
              ref={ref}
              classes={{
                tooltip: style.tooltip(css, variant),
              }}
              title={title}
              followCursor
              placement={placement}
              disableHoverListener={!isOverflowed}
              disableInteractive={disableInteractive}
              PopperProps={PopperProps}
              open={open}
              {...props}
            >
              <div ref={textElementRef} css={style.textRef}>
                {children}
              </div>
            </Tooltip>
          )}
        </ClassNames>
      );
    }
  }
);
HWTooltip.displayName = "HWTooltip";

export default HWTooltip;
