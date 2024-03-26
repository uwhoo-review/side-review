import { css } from "@emotion/react";
import Color from "@src/common/styles/Color";

export default {
  wrapper: css`
    .MuiDialog-paper {
      background-color: ${Color.dark.elevation03};
    }
  `,
  textarea: css`
    background-color: ${Color.dark.elevation00};
    width: 100%;
    height: 330px;
    border-radius: 8px;
    resize: none;
    color: #fff;
    padding: 14px 16px;
    box-sizing: border-box;
    border: 1px solid #2c2c34;
    margin-top: 18px;

    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
    &:focus-visible {
      outline: none;
      border: 1px solid #6d6ada;
      box-shadow: 0px 0px 0px 3px rgba(83, 84, 218, 0.7);
    }
  `,
  contentWrapper: css`
    //display: flex;
    //flex-direction: column;
  `,
  topWrapper: css`
    margin-top: 20px;
  `,
  chip: css`
    margin-right: 8px;
  `,
  byteChk: css`
    font-family: Poppins;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    color: ${Color.dark.grey500};
  `,
  flex: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  `,
};
