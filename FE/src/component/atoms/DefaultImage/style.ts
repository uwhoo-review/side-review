import { css } from "@emotion/react";

export default {
  wrapper: (width: string, height: string) => css`
    width: ${width};
    height: ${height};
    object-fit: cover;
    transition: all 0.15s linear;

    /*이미지 드래그 방지*/
    -webkit-user-drag: none;
    -khtml-user-drag: none;
    -moz-user-drag: none;
    -o-user-drag: none;
    user-drag: none;
  `,
};
