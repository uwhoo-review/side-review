import { css } from "@emotion/react";
import Color from "@src/common/styles/Color";

export default {
  wrapper: css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    padding: 60px 0;
  `,
  profile: css`
    margin-bottom: 10px;
  `,
  typo1: css`
    color: var(--Color-Dark-Grey-500, #9897a1);
    font-family: Poppins;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 24px; /* 171.429% */
    letter-spacing: 0.15px;

    margin-bottom: 30px;
  `,
  textField: css`
    .HW-Outlined-TextFiled-Wrapper {
      background-color: #333333;
      border: 1px solid #42424a;
    }
    input {
      color: #f9f9fd;
    }
  `,
  textFieldWrapper: css`
    display: flex;
    //justify-content: center;
    align-items: center;
    gap: 14px;
  `
};
