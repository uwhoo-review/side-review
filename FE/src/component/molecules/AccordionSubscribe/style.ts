import { css } from "@emotion/react";

export default {
  accordion: css`
    margin-bottom: 70px;
    &.Mui-expanded {
      margin-bottom: 70px;
    }
  `,
  wrapper: css`

  `,
  subWrapper: css`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 86px;
    height: 140px;
  `,
  title: css`
    display: flex;
    flex-direction: column;
  `,
  avatar: css`
    cursor: pointer;
  `
}
