import { css } from "@emotion/react";
import Color from "@src/common/styles/Color";

export default {
  wrapper: (width: string, color: string) => css`
    width: ${width};
    height: 1px;

    background-color: ${color};
  `,
};
