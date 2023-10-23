import { css } from "@emotion/react";

export default {
  wrapper: (width: string, height: string, radius: string, backgroundColor: string) => css`
    width: ${width};
    height: ${height};
    border-radius: ${radius};

    background-color: ${backgroundColor};

    display: flex;
    justify-content: center;
    align-items: center;

    cursor: pointer;
  `,
};
