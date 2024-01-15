import { css } from "@emotion/react";

export default {
  wrapper: (width: string, height: string) => css`
    width: ${width};
    height: ${height};
    background-color: yellow;
    border-radius: 50%;
  `,
};
