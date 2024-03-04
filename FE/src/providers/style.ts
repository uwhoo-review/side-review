import { css } from "@emotion/react";
export default {
  alertWrapper: css`
    position: fixed;
    top: 150px;
    left: 50%;
    transform: translate(-50%, 0);
    z-index: 1500;
  `,
  alert: (width?: string) => css`
    width: ${width};
  `
};
