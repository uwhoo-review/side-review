import { css } from "@emotion/react";
import Color from "@src/common/styles/Color";

export default {
  wrapper: css`
    margin-bottom: 70px;
  `,
  inputGroups: css`
    display: flex;
    justify-content: space-between;
  `,
  ratingGroups: css`
    display: flex;
    gap: 70px;
  `,
  btnGroups: css`
    display: flex;
    gap: 16px;
  `,
  btn1: css`
    gap: 10px;
  `,
  btn2: css`
    gap: 10px;
  `,
  ratingBox: css`
    display: flex;
    flex-direction: column;
  `,
  rating: css`
    font-size: 30px;
    gap: 8px;
    svg {
      width: 1em;
      height: 1em;
      flex-shrink: 0;
    }
  `,
};
