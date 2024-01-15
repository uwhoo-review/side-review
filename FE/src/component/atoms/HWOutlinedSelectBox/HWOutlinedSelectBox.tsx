import { css } from "@emotion/react";

import { ClickAwayListener, Menu, MenuItem, MenuList, Paper, Popper } from "@mui/material";
import React, { useState } from "react";
import { HWOutlinedSelectBoxProps } from "./type";
import style from "./style";
import { EmotionJSX } from "@emotion/react/types/jsx-namespace";
import HWTypography from "../HWTypography/HWTypography";
import { ArrowDropDown } from "@mui/icons-material";
import { IconChevronDown } from "@res/index";

function areEqualValues(a: any, b: any) {
  if (typeof b === "object" && b !== null) {
    return a === b;
  }

  return String(a) === String(b);
}

function hasValue(value: any) {
  return value != null && !(Array.isArray(value) && value.length === 0);
}

function isFilled(obj: any) {
  return obj && hasValue(obj.value) && obj.value !== "";
}

const HWOutlinedSelectBox = React.forwardRef(
  <T extends number | string | readonly string[]>(
    {
      children,
      className,
      customCss,
      variant = "primary",
      size = "medium",
      value: valueProps,
      placeholder,
      label,
      fullWidth,
      renderValue,
      disabled,
      error,
      helperText,
      readOnly,
      width = "200px",
      height = "46px",
      onChange,
      disablePortal = true,
      multiple,
      displayEmpty,
      PaperProps = { sx: {} },
      onKeyUp,
      required = false,
      inputRef,
      ...props
    }: HWOutlinedSelectBoxProps<T>,
    ref: React.Ref<HTMLDivElement>
  ) => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    const [innerValue, setInnerValue] = useState<T | undefined>(valueProps);

    const value = valueProps !== undefined ? valueProps : innerValue;

    const open = Boolean(anchorEl);

    const childrenArray = React.Children.toArray(children);

    const handleItemClick = (child: React.ReactNode) => (event: any) => {
      let newValue;
      if (!multiple) {
        setAnchorEl(null);
      }
      // We use the tabindex attribute to signal the available options.
      if (!event.currentTarget.hasAttribute("tabindex")) {
        return;
      }
      if (React.isValidElement(child)) {
        if (multiple && Array.isArray(value)) {
          newValue = Array.isArray(value) ? value.slice() : [];
          const itemIndex = value.indexOf(child.props.value);
          if (itemIndex === -1) {
            newValue.push(child.props.value);
          } else {
            newValue.splice(itemIndex, 1);
          }
        } else {
          newValue = child.props.value;
        }

        if (child.props.onClick) {
          child.props.onClick(event);
        }

        if (value !== newValue) {
          setInnerValue(newValue);

          if (onChange) {
            const nativeEvent = event.nativeEvent || event;
            const clonedEvent = new nativeEvent.constructor(nativeEvent.type, nativeEvent);

            Object.defineProperty(clonedEvent, "target", {
              writable: true,
              value: { value: newValue, name },
            });
            onChange(clonedEvent, child);
          }
        }
      }
    };

    let classNames = [];
    classNames.push(
      "HW-Outlined-SelectBox-Container",
      open ? "HW-Focused" : null,
      disabled ? "HW-disabled" : null,
      readOnly ? "HW-ReadOnly" : null,
      error ? "HW-Error" : null,
      className ? `${className}` : null
    );
    classNames = classNames.filter(Boolean);

    let display;
    let displaySingle;
    const displayMultiple: any[] = [];
    let computeDisplay = false;

    if (isFilled({ value }) || displayEmpty) {
      if (renderValue) {
        display = renderValue(value as any);
      } else {
        computeDisplay = true;
      }
    }

    childrenArray.forEach((child) => {
      if (!React.isValidElement(child)) {
        return null;
      }

      let selected = false;

      if (multiple) {
        if (!Array.isArray(value)) {
          throw new Error(
            "The `value` prop must be an array " +
              "when using the `Select` component with `multiple`."
          );
        }

        selected = value.some((v) => areEqualValues(v, child.props.value));
        if (selected && computeDisplay) {
          displayMultiple.push(child.props.children);
        }
      } else {
        selected = areEqualValues(value, child.props.value);
        if (selected && computeDisplay) {
          displaySingle = child.props.children;
        }
      }
    });

    if (computeDisplay) {
      if (multiple) {
        if (displayMultiple.length === 0) {
          display = null;
        } else {
          display = displayMultiple.reduce((output, child, index) => {
            output.push(child);
            if (index < displayMultiple.length - 1) {
              output.push(" ");
            }
            return output;
          }, []);
        }
      } else {
        display = displaySingle;
      }
    }

    return (
      <React.Fragment>
        <>
          <div
            ref={ref}
            className={classNames.join(" ")}
            css={[style.container, fullWidth ? { width: "100%" } : { width }, customCss]}
            aria-disabled={disabled}
            onKeyUp={(e) => {
              if (e.key === " " || e.key === "Enter") {
                setAnchorEl(e.currentTarget);
              }
              if (onKeyUp) {
                onKeyUp(e);
              }
            }}
            {...props}
          >
            <div className="HW-Outlined-SelectBox-Contents-Wrapper">
              {label !== undefined && (
                <label className="HW-Outlined-SelectBox-Label" css={style.label}>
                  {label}
                  {required && <span style={{ color: "red" }}>*</span>}
                </label>
              )}
              <div
                className="HW-Outlined-SelectBox-Contents"
                css={style.contents(height)}
                aria-expanded={open}
                role="button"
                tabIndex={0}
                onClick={(e) => {
                  setAnchorEl(e.currentTarget);
                }}
                ref={inputRef}
              >
                <div
                  className="HW-Outlined-SelectBox-Input"
                  css={style.input}
                  placeholder={placeholder}
                >
                  {display}
                </div>
                <IconChevronDown className="HW-Outlined-SelectBox-Icon" />
              </div>
            </div>
            {helperText && (
              <HWTypography
                className="HW-Outlined-SelectBox-HelperText"
                customCss={css`
                  margin-left: 14px;
                  margin-top: 3px;
                  width: calc(100% - 14px);
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  display: block;
                `}
                variant="Helper Text"
              >
                {helperText}
              </HWTypography>
            )}
          </div>
          <Popper
            open={open}
            anchorEl={anchorEl}
            disablePortal={disablePortal}
            placement={"bottom-start"}
            sx={{ zIndex: 99 }}
          >
            <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
              <MenuList
                sx={{
                  ...style.popover(anchorEl?.clientWidth),
                  ...PaperProps.sx,
                }}
              >
                {childrenArray.map((child) => {
                  if (!React.isValidElement(child)) {
                    return null;
                  }

                  let selected = false;

                  if (multiple) {
                    if (!Array.isArray(value)) {
                      throw new Error(
                        "The `value` prop must be an array " +
                          "when using the `Select` component with `multiple`."
                      );
                    }

                    selected = value.some((v) => areEqualValues(v, child.props.value));
                  } else {
                    selected = areEqualValues(value, child.props.value);
                  }

                  return React.cloneElement(child as React.ReactElement, {
                    "aria-selected": selected ? "true" : "false",
                    onClick: handleItemClick(child),
                    role: "option",
                    selected,
                    value: undefined,
                    "data-value": child.props.value,
                  });
                })}
              </MenuList>
              {/*<MenuList
                autoFocusItem={open}
                                disablePortal={disablePortal}
                                        PaperProps={{
                                          ...PaperProps,
                                          sx: {
                                            ...style.popover(anchorEl?.clientWidth),
                                            boxSizing: "border-box",
                                            ...PaperProps.sx,
                                          },
                                        }}
                                        anchorOrigin={{
                                          horizontal: "left",
                                          vertical: "bottom",
                                        }}
                                        anchorEl={anchorEl}
                                        open={open}
                                        onClose={() => {
                                          setAnchorEl(null);
                                        }}
              >
                {childrenArray.map((child) => {
                  if (!React.isValidElement(child)) {
                    return null;
                  }

                  let selected = false;

                  if (multiple) {
                    if (!Array.isArray(value)) {
                      throw new Error(
                        "The `value` prop must be an array " +
                          "when using the `Select` component with `multiple`."
                      );
                    }

                    selected = value.some((v) => areEqualValues(v, child.props.value));
                  } else {
                    selected = areEqualValues(value, child.props.value);
                  }

                  return React.cloneElement(child as React.ReactElement, {
                    "aria-selected": selected ? "true" : "false",
                    onClick: handleItemClick(child),
                    role: "option",
                    selected,
                    value: undefined,
                    "data-value": child.props.value,
                  });
                })}
              </MenuList>*/}
            </ClickAwayListener>
          </Popper>
        </>
      </React.Fragment>
    );
  }
);

export default HWOutlinedSelectBox as <T extends string | number | string[]>(
  props: HWOutlinedSelectBoxProps<T> & {
    ref?: React.ForwardedRef<HTMLDivElement>;
  }
) => EmotionJSX.Element;
