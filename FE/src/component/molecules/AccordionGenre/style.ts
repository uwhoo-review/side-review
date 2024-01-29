import { css } from "@emotion/react";

export default {
  accordion: css`
    margin-bottom: 70px;
    &.Mui-expanded {
      margin-bottom: 70px;
    }
  `,
  wrapper: css``,
  title: css`
    display: flex;
    flex-direction: column;
  `,
  subWrapper: css`
    margin-top: 30px;
  `,
  typo1: css`
    color: #6d6ada;
  `,
  contentBox: css`
    width: 100%;
    min-height: 164px;
    background-color: #1e1e1e;
    border-radius: 10px;

    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    flex-direction: column;
    gap: 24px;
  `,
  toggleBox: css`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 40px;
  `,
  toggle: css`
    gap: 4px;
    border-radius: 8px;
    /* Body L/Medium */
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 24px; /* 150% */
    &.HW_Checked {
      background-color: #4b4b4b;
    }
  `,
};
