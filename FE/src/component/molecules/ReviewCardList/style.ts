import { css } from "@emotion/react";
import Color from "@src/common/styles/Color";

export default {
  wrapper: css`
    margin-bottom: 70px;
  `,
  title: css`
    font-family: Pretendard, sans-serif;
    font-size: 32px;
    font-style: normal;
    font-weight: 600;
    line-height: 40px;
  `,
  topWrapper: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
  filterWrapper: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  `,
  contentTotalWrapper: css`
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 30px;
  `,
  emptyWrapper: css`
    height: 314px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #1e1e1e;
    border-radius: 10px;
  `,
  grid: css``,
  contentWrapper: css`
    display: grid;
    grid-template-rows: repeat(2, 1fr);
    grid-template-columns: repeat(3, 1fr);
    align-items: center;
    justify-content: center;
    gap: 20px;
  `,
  typo1: css`
    cursor: pointer;
  `,
  typo2: css`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2px;
    cursor: pointer;
  `
}
