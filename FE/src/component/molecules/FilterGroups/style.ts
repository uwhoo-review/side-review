import { css } from "@emotion/react";

export default {
  wrapper: css`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  `,
  flexBetween: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
  multiBox: css`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  `,
  chip: css`
    margin-right: 8px;
  `
};
