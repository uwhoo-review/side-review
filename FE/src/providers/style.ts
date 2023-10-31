import { css } from "@emotion/react";
export default {
  alertWrapper: css`
    position: absolute;
    top: 150px;
    left: 50%;
    transform: translate(-50%, 0);
    z-index: 99;
  `,
  alert: (width?: string) => css`
    width: ${width};
  `
};
