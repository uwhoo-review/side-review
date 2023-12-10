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
  PersonTitle: css`
    display: flex;
    flex-direction: column;
    margin-left: 50px;
    gap: 14px;
  `,
  personImage: css`
    border-radius: 100px;
  `,
  subWrapper: css`
    position: relative;
    z-index: 1;
    height: 280px;

    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
  left: css`
    display: flex;
    align-items: center;
  `,
  right: css`

  `,
  typo1: css`
    font-size: 40px;
    font-style: normal;
    font-weight: 700;
    line-height: 48px;
  `
};
