import { css } from "@emotion/react";

export default {
  container: css`
    position: relative;
    min-width: 150px;
    vertical-align: top;
    border-radius: 4px;
    color: #acb0bc;
    :hover {
      .HW-Outlined-SelectBox-Fieldset {
        border-color: #3e3e3e;
      }
      color: #3e3e3e;
    }

    &.HW-Focused,
    :focus-within {
      .HW-Outlined-SelectBox-Fieldset {
        border-color: #2e7af2;
      }
      color: #2e7af2;
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
    border-radius: 4px;
    position: relative;
    border: 1px solid #cecece;
    cursor: pointer;
    color: #3e3e3e;
    height: ${height ? height : "36px"};
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
    padding: 0px 41px 0px 10px;
    box-sizing: border-box;
    font-size: 14px;
    line-height: 24px;
    font-weight: 500;
    font-family: Noto Sans KR;
    letter-spacing: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: inherit;
    :empty:before {
      color: #a7a7a7;
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
    font-family: Noto Sans KR;
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    color: #656565;
    overflow: hidden;
    max-width: calc(100% - 24px);
    width: 100%;
    box-sizing: border-box;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: block;
    margin-bottom: 10px;
    margin-left: 6px;
  `,
  popover: (width?: number) => ({
    width: width,
    boxShadow: "0px 2px 8px 0px #9090904D",
    maxHeight: `${36 * 6 + 16}px`,
    border: "1px solid #257CFF",
    ".MuiMenu-list": {
      padding: 0,
    },
    "&::-webkit-scrollbar": {
      width: "14px",
      borderRadius: "0px 4px 3px 0px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#7d7e85",
      borderRadius: "10px",
      minHeight: "30px",
      backgroundClip: "padding-box",
      border: "4px solid transparent",
    },
  }),
};
