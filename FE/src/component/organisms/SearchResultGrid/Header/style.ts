import { css } from "@emotion/react";
import Color from "@src/common/styles/Color";

export default {
  wrapper: css`
    position: relative;
      ::before {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        content: "";
        width: 100%;
        height: 100%;
        background-color: ${Color.dark.elevation01};
        opacity: 0.5;
      }
    }
  `,
  subWrapper: css`
    position: relative;
    z-index: 1;
    height: 166px;

    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
  left: css`
    display: flex;
    align-items: center;
  `,
  right: css`
    display: flex;
    align-items: center;
    gap: 8px;
  `,
  chip: css`
    cursor: pointer;
  `,
  typo1: css`
    margin-left: 10px;
  `
};
