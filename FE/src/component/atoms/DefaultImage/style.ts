import { css } from "@emotion/react";

export default {
  wrapper: (width: string, height: string) => css`
    width: ${width};
    height: ${height};
    object-fit: cover;
    transition: all 0.15s linear;
  `,
};
