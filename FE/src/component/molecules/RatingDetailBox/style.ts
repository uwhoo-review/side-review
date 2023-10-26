import { css } from "@emotion/react";

export default {
  wrapper: css``,
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
  ratingBox: css`
    display: flex;
    flex-direction: column;
  `,
  rating: css`
    font-size: 30px;
    svg {
      width: 1em;
      height: 1em;
      flex-shrink: 0;
    }
  `,
};
