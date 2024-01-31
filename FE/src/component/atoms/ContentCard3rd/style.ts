import { css } from "@emotion/react";

export default {
  wrapper: css`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 12px 16px;
    width: 100%;
    height: 70px;
    gap: 16px;
  `,
  box1: css`
    flex: 0 0 46px;
    width: 46px;
    height: 46px;
  `,
  box2: css`
    flex: 1 0;
  `,
  box3: css`
    flex: 0 0;
    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 16px;
    gap: 4px;
  `,
  img: css`
    width: 100%;
    height: 100%;
    border-radius: 46px;
  `,
  typo1: css`
    color: #f9f9fd;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 20px;
  `,
  typo2: css`
    color: #9897a1;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 18px; /* 150% */
  `,
  typo3: css`
    color: #f9f9fd;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px; /* 150% */
  `,
};
