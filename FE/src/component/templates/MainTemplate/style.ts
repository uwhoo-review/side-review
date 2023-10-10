import { css } from "@emotion/react";

export default {
  wrapper: css`
    width: 100%;
    height: calc(100% - 60px);

    padding-top: 60px;
    background-color: #000;
    color: #fff;
    .select-main {
      height: 100%;
      width: 100%;

      min-width: 1440px;
      display: flex;
      justify-content: center;
    }
    .scroll-area {
      height: 100%;
      width: 100%;
      overflow: auto;
    }
  `,
};
