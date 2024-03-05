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
    background-color: #1e1e1e;
    border-radius: 8px;
    border: 1px solid transparent;

    &:hover {
      background-color: #121212;
      border: 1px solid #6d6ada;
      box-shadow: 0px 0px 0px 3px #5354dab2;
    }
  `,
  disabled: css`
    pointer-events: none;
    background-color: #42424a;
  `,

  box1: css`
    flex: 0 0 46px;
    width: 46px;
    height: 46px;
  `,
  box2: css`
    flex: 1 0;
  `,
  subBox2: css`
    display: flex;
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
  chip: css`
    height: 20px;
    margin-left: 10px;
    font-size: 12px;
  `,
};
