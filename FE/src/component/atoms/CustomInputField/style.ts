import { css } from "@emotion/react";
import Color from "@src/common/styles/Color";

export default {
  container: css`
    position: relative;
    min-width: 150px;
    vertical-align: top;
    border-radius: 8px;
    color: #c7c8d3;
    :hover {
      .Custom-Field-Contents {
        color: #fff;
      }
    }

    &.HW-Focused,
    :focus-within {
      .Custom-Field-Contents {
        border-color: #6d6ada;
        box-shadow: 0 0 0 3px rgba(83, 84, 218, 0.7);
        color: #fff;
      }
      .Custom-Field-Icon-Wrapper{
        background-color: ${Color.dark.primary700};
        border: 1px solid transparent;
      }
    }
    &.HW-Error {
      .Custom-Field-Contents {
        border-color: #f93737;
      }
      color: #f93737;
    }
    &.HW-ReadOnly {
      pointer-events: none;
      .Custom-Field-Contents {
        border: none;
        border-radius: unset;
        border-bottom: 1px solid #cecece;
        box-shadow: unset;
        .Custom-Field-Icon {
          display: none;
        }
      }
    }
    &.HW-disabled {
      pointer-events: none;
      color: #d6d6d6;
      .Custom-Field-Contents {
        color: #d6d6d6;
      }
      .Custom-Field-Input::before {
        color: #d6d6d6;
      }
      .Custom-Field-Fieldset {
        border-color: #d6d6d6;
      }
    }
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
    // width: "max-content",

    backgroundColor: `${Color.dark.elevation02}`,
    boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.04);",
    maxHeight: `${36 * 6 + 16}px`,
    border: `1px solid ${Color.dark.grey300}`,
    padding: "10px 10px",
    marginTop: "10px",
    borderRadius: "6px",

    zIndex: 99,

  }),
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
    .Custom-Field-Icon-Wrapper{
      position: absolute;
      right: 0px;
      height: 100%;
      width: 52px;
      border: 1px solid ${Color.dark.grey300};
      border-radius: 0 8px 8px 0;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: ${Color.dark.grey200};
    }
    &[aria-expanded="true"] {
      .Custom-Field-Icon {
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
  menuRoot: css`
    font-family: Pretendard;
    font-size: 15px;
    font-style: normal;
    font-weight: 500;
    line-height: 22px;
    .menu-box {
      height: 100%;
      width: 100%;
      display: flex;
      align-items: center;
      border-radius: 4px;
      color: #fff;
      justify-content: space-between;
    }
    //&:hover {
    //  .menu-box {
    //    background-color: #b6b2ea26;
    //  }
    //}
  `,

};
