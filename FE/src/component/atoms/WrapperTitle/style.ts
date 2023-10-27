import { css } from "@emotion/react";
import Color from "@src/common/styles/Color";

export default {
  wrapper: css`

  `,
  topWrapper: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
  typo1: css`
    font-family: Poppins;
    font-size: 28px;
    font-style: normal;
    font-weight: 500;
    color: ${Color.dark.primary700}
  `,

}
