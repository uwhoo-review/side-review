import { css } from "@emotion/react";
import Color from "@src/common/styles/Color";

export default {
  wrapper: css``,
  subWrapper: css`
    //height: 190px;
    width: 300px;
    border-radius: 10px;
    border: 1px solid ${Color.dark.grey300};
    background-color: ${Color.dark.elevation08};
    box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.25);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    padding: 26px 8px 8px 8px;
  `,
  top: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 14px;
  `,
  topLeft: css`
    flex: 0 0;
  `,
  topRight: css`
    flex: 0 0;
  `,
  bottom: css`
    width: 100%;
  `,
  typo1: css`
    color: ${Color.dark.grey900};
    font-family: Pretendard;
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: 28px;
  `,
  typo2: css`
    color: ${Color.dark.grey500};
    text-align: center;
    font-family: Poppins;
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px; /* 169.231% */`,
  btn1: css`
    width: 100%;
  `,
  btn2: css`
    width: 100%;
    margin-top: 8px;
  `
};
