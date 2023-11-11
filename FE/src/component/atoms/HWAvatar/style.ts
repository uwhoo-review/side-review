import { css } from "@emotion/react";

export default {
  wrapper: (size: string) => css`
    font-size: ${size};
    display: flex;
    justify-content: center;
    align-items: center;
  `,
};
