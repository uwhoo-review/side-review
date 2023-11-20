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
  modal: css`
    border: none;
  `,
  modalWrapper: css`
    //max-width: 1600px;
    //max-height: 900px;
  `,
  modalImg: css`
    width: 1600px;
    height: 900px;
    object-fit: scale-down;
    //width: 90%;
    //height: 450px;
  `
};
