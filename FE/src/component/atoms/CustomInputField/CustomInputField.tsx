import { cloneElement, forwardRef, useEffect, useState } from "react";
import { IconChevronDown, IconSettings } from "@res/index";
import {Box, ClickAwayListener, Menu, MenuItem, MenuList, Paper, Popper} from "@mui/material";
import style from "./style";

function hasValue(value: any) {
  return value != null && !(Array.isArray(value) && value.length === 0);
}

function isFilled(obj: any) {
  return obj && hasValue(obj.value) && obj.value !== "";
}

const CustomInputField = forwardRef(
  (
    {
      children,
      className,
      customCss,
      size = "medium",
      placeholder,
      label,
      fullWidth,
      disabled,
      readOnly,
      width = "200px",
      height = "46px",
      disablePortal = true,
      onKeyUp,
      value,
      renderValue,
      onChange,
      onClick,
      PaperProps = { sx: {} },
      inputRef,
      ...props
    }: any,
    ref: React.Ref<HTMLDivElement>
  ) => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const open = Boolean(anchorEl);
    const [display, setDisplay] = useState(value);

    let classNames = [];
    classNames.push(
      "Custom-Field-Container",
      open ? "HW-Focused" : null,
      disabled ? "HW-disabled" : null,
      readOnly ? "HW-ReadOnly" : null,
      className ? `${className}` : null
    );
    classNames = classNames.filter(Boolean);

    useEffect(() => {
      if (isFilled({ value })) {
        if (renderValue) {
          setDisplay(renderValue(value as any));
        } else {
          setDisplay(value);
        }
      }
    }, [value]);

    return (
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
          <div className="Custom-Field-Contents-Wrapper">
            {label !== undefined && (
              <label className="Custom-Field-Label" css={style.label}>
                {label}
              </label>
            )}
            <div
              className="Custom-Field-Contents"
              css={style.contents(height)}
              aria-expanded={open}
              role="button"
              tabIndex={0}
              onClick={(e) => {
                setAnchorEl(e.currentTarget);
              }}
              ref={inputRef}
            >
              <div className="Custom-Field-Input" css={style.input} placeholder={placeholder}>
                {display}
              </div>
              <div className="Custom-Field-Icon-Wrapper">
                <IconSettings className="Custom-Field-Icon" />
              </div>
            </div>
          </div>
        </div>
        <Popper
          open={open}
          anchorEl={anchorEl}
          disablePortal={disablePortal}
          placement={"bottom-start"}
          sx={{ zIndex: 99 }}
        >
          <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
            <Box
              sx={{
                ...style.popover(anchorEl?.clientWidth),
                ...PaperProps.sx,
              }}
              css={[style.menuRoot, customCss]}
            >
              <div className={"menu-box"}>{children}</div>
            </Box>
          </ClickAwayListener>
        </Popper>

        {/*        {open && (
          <Menu
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
            <div css={[style.menuRoot, customCss]}>
              <div className={"menu-box"}>{children}</div>
            </div>
          </Menu>
        )}*/}
      </>
    );
  }
);

export default CustomInputField;
