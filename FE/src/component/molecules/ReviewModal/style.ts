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

    margin-top: 18px;
    
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
  `,
  contentWrapper: css`
    //display: flex;
    //flex-direction: column;
  `
};
