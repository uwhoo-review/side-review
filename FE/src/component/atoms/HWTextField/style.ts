import { css } from "@emotion/react";

export default {
  container: (width: string, fullWidth: boolean) => css`
    position: relative;
    //color: #acb0bc;
    border-radius: 4px;
    width: ${fullWidth ? "100%" : width};

    :hover {
      .HW-Outlined-TextFiled-Wrapper {
        background-color: white !important;
        box-shadow: ${"0 0 5px #257cff"};
      }
      //color: #3e3e3e;
    }

    &.HW-Focused,
    :focus-within {
      .HW-Outlined-TextFiled-Wrapper {
        border: 1px solid #257cff;
        background-color: white !important;
        box-shadow: ${"0 0 5px #257cff"};
      }
      //color: #2e7af2;
    }
    &.HW-Error {
      .HW-Outlined-TextFiled-Wrapper {
        border-color: #ef5350;
      }
      .HW-Outlined-TextFiled-Wrapper {
        color: #ef5350;
      }
      color: #ef5350;
    }

    &.HW-disabled {
      pointer-events: none;
      color: #d6d6d6;
      .HW-Outlined-TextFiled-Wrapper {
        border-color: #d6d6d6;
      }
    }

    &.HW-ReadOnly {
      .HW-Outlined-TextFiled-Wrapper {
        border: none;
        border-radius: unset;
        border-bottom: 1px solid #cecece;
        box-shadow: unset;
      }
    }
  `,
  label: () => css`
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
  labelOverflowInherit: () => css`
    font-family: Noto Sans KR;
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    color: #656565;
    overflow: inherit;
    max-width: calc(100% - 24px);
    width: 100%;
    box-sizing: border-box;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: block;
    margin-bottom: 10px;
    margin-left: 6px;
  `,
  wrapper: (size: "medium" | "small") => css`
    position: relative;
    box-sizing: border-box;
    height: ${size === "medium" ? "36px" : "30px"};
    width: 100%;
    //padding: 0px 12px;
    background-color: white;
    border: 1px solid #cecece;
    border-radius: 3px;
  `,
  fieldset: css`
    position: absolute;
    text-align: left;
    min-width: 0%;
    margin: 0;
    top: 0;
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
  legend: css`
    font-family: Pretendard;
    font-size: 12px;
    letter-spacing: 0.15px;
    font-weight: 400;
    line-height: 12px;
    padding: 0;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    width: auto;
    max-width: 100%;
    box-sizing: border-box;
    visibility: hidden;
  `,
  contents: (size: "medium" | "small") => css`
    display: inline-flex;
    border-radius: inherit;
    position: relative;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    align-items: center;
  `,
  startAdorment: css`
    display: flex;
    align-items: center;
    height: 100%;
    white-space: nowrap;
    color: rgba(0, 0, 0, 0.54);
    margin-right: 8px;
  `,
  input: (size: "medium" | "small") => css`
    min-width: 0;
    width: auto;
    flex: 1 1 0;
    height: 100%;
    outline: none;
    border: 0;
    padding: 0 12px;
    background-color: transparent;
    box-sizing: border-box;

    font-family: Noto Sans KR;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    color: #000000;

    ::-webkit-outer-spin-button,
    ::-webkit-inner-spin-button {
      -webkit-appearance: none;
      background: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjYiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgZmlsbD0ibm9uZSI+CgogPGc+CiAgPHRpdGxlPkxheWVyIDE8L3RpdGxlPgogIDxnIGlkPSJzdmdfMyI+CiAgIDxwYXRoIGlkPSJzdmdfMSIgZmlsbD0iIzNFM0UzRSIgZD0ibTcsMTcuODEyNTRsNSw1bDUsLTVsLTEwLDB6Ii8+CiAgIDxwYXRoIHN0cm9rZT0ibnVsbCIgaWQ9InN2Z18yIiBmaWxsPSIjM0UzRTNFIiBkPSJtNyw4LjU3NTcxbDUsLTUuMjYzMTdsNSw1LjI2MzE3bC0xMCwweiIvPgogIDwvZz4KIDwvZz4KPC9zdmc+")
        no-repeat center center;
      position: absolute;
      top: 0;
      right: 12px;
      bottom: 0;
      width: 1em;
      opacity: 1;
    }
    margin: 0;
    ::placeholder {
      color: #a7a7a7;
    }

    :disabled {
      color: #d6d6d6;
      ::placeholder {
        color: #d6d6d6;
      }
    }
    &[data-placeholder="false"] {
      ::placeholder {
        visibility: hidden;
      }
    }

    [type="number"] {
      -moz-appearance: textfield;
    }
  `,
  endAdorment: css`
    display: flex;
    align-items: center;
    height: 100%;
    white-space: nowrap;
    color: rgba(0, 0, 0, 0.54);
  `,
  helperText: css`
    color: #3e3e3e;
    margin: 3px 14px 0 14px;
    font-family: pretendard;
    font-weight: 400;
    font-size: 12px;
    line-height: 20px;
    letter-spacing: 0.4px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  `,
};
