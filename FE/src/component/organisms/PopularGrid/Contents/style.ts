import { css } from "@emotion/react";

export default {
  wrapper: css``,
  header: css``,
  contentWrapper: css`
    display: flex;
    justify-content: flex-end;
    //align-items: stretch;
  `,
  floatBox: css`
    flex-bottom: 452px;
    width: 452px;
    background-color: #121212;
  `,
  cardBox: css`
    width: 100%;
  `,
  cardWrapper: css`
    margin-left: 20px;
    display: flex;
    flex-wrap: wrap;
    //justify-content: center;
    align-items: center;
    gap: 20px;
    //transition: 0.5s ease;

    &.open {
      gap: 40px;
    }
  `,
};
