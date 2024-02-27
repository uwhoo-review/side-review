import { css } from "@emotion/react";
export default {
  wrapper: css`
    display: flex;
    align-items: center;
    gap: 10px;
    height: 100%;
    position: relative;
  `,
  rating: (ratingSize: string) => css`
    font-size: ${ratingSize};
    svg {
      width: 1em;
      height: 1em;
      flex-shrink: 0;
    }
  `,
  ratingFlex: css`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 6px;
  `,
  alertBtnGroup: css`
    margin-top: 12px;
    display: flex;
    justify-content: space-between;
  `,
  alertBtn2: css`
    display: flex;
    align-items: center;
    cursor: pointer;
  `,
  typo: css`
    cursor: pointer;
  `,
  clear: css`
    position: absolute;
    left: -36px;
    opacity: 0;
  `,
};
