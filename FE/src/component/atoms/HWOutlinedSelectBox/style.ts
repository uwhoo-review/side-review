import { css } from "@emotion/react";
import Color from "@src/common/styles/Color";

export default {
  container: css`
    position: relative;
    min-width: 70px;
    vertical-align: top;
    border-radius: 8px;
    color: #c7c8d3;
    .HW-Outlined-SelectBox-Contents-Wrapper{
      width: 100%;
    }
    :hover {
      .HW-Outlined-SelectBox-Contents {
        color: #fff;
      }
    }

    &.HW-Focused,
    :focus-within {
      .HW-Outlined-SelectBox-Contents {
        border-color: #6D6ADA;
        box-shadow: 0 0 0 3px rgba(83, 84, 218, 0.7);
        color: #fff;
      }
    }
    &.HW-Error {
      .HW-Outlined-SelectBox-Contents {
        border-color: #f93737;
      }
      color: #f93737;
    }
    &.HW-ReadOnly {
      pointer-events: none;
      .HW-Outlined-SelectBox-Contents {
        border: none;
        border-radius: unset;
        border-bottom: 1px solid #cecece;
        box-shadow: unset;
        .HW-Outlined-SelectBox-Icon {
          display: none;
        }
      }
    }
    &.HW-disabled {
      pointer-events: none;
      color: #d6d6d6;
      .HW-Outlined-SelectBox-Contents {
        color: #d6d6d6;
      }
      .HW-Outlined-SelectBox-Input::before {
        color: #d6d6d6;
      }
      .HW-Outlined-SelectBox-Fieldset {
        border-color: #d6d6d6;
      }
    }
  `,
  contents: (height?: string) => css`
    width: 100%;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    border-radius: 8px;
    position: relative;
    border: 1px solid #2c2c34;
    cursor: pointer;
    color: #c7c8d3;
    height: ${height ? height : "46px"};
    background-color: #121212;
    .HW-Outlined-SelectBox-Icon {
      position: absolute;
      right: 6px;
      /* transition: all 109ms ease-out; */
    }
    &[aria-expanded="true"] {
      .HW-Outlined-SelectBox-Icon {
        transform: rotate(180deg);
      }
    }
  `,
  input: css`
    width: 100%;
    //height: 100%;
    padding: 0px 36px 0px 16px;
    box-sizing: border-box;
    font-family: Pretendard;
    font-size: 15px;
    font-style: normal;
    font-weight: 500;
    line-height: 22px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: inherit;
    :empty:before {
      content: attr(placeholder);
    }
  `,
  fieldset: (label?: string) => css`
    position: absolute;
    text-align: left;
    min-width: 0%;
    margin: 0;
    top: ${label ? "-6px" : "0"};
    left: 0;
    right: 0;
    bottom: 0;
    border: 0;
    border: 1px solid #acb0bc;
    border-radius: inherit;
    margin: 0px;
    padding: 0 12px;
    pointer-events: none;
  `,
  legend: (label?: string) => css`
    font-family: Pretendard;
    font-size: 12px;
    letter-spacing: 0.15px;
    font-weight: 400;
    line-height: 12px;
    padding: ${label ? "0 4px" : "0"};
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    width: auto;
    max-width: 100%;
    box-sizing: border-box;
    color: #acb0bc;
    visibility: hidden;
  `,
  label: css`
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px; /* 142.857% */

    color: ${Color.dark.grey800};
    overflow: hidden;
    max-width: calc(100% - 24px);
    box-sizing: border-box;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: block;
    margin-bottom: 10px;
    margin-left: 6px;
    width: 100%;
    height: 20px;
  `,


  popover: (width?: number) => ({
    width: width,

    backgroundColor: `${Color.dark.elevation02}`,
    boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.04);",
    maxHeight: `${36 * 6 + 16}px`,
    border: `1px solid ${Color.dark.grey300}`,
    padding: "4px 6px",
    marginTop: "10px",
    overflow: "auto",
    borderRadius: "6px",

    ".MuiMenu-list": {
      padding: 0,
    },
  }),
};
