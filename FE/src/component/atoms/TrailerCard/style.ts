import { css } from "@emotion/react";

export default {
  wrapper: (src: string, width: string, height: string) => css`
    background-image: url(${src});
    width: ${width};
    height: ${height};
    position: relative;
    background-size: contain;
    background-repeat: no-repeat;
  `,
  playIcon: css`
    position: absolute;
    right: 20px;
    bottom: 16px;
  `,
  iframe: css`
    width: 800px;
    height: 450px;
    border: none;
  `,
  emptyWrapper: css`
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #1e1e1e;
    border-radius: 10px;
    color: #9897a1;
  `,
  leftPageBtn: css`
    position: absolute;
    top: calc(50% - 30px);
    left: 10px;

  `,
  rightPageBtn: css`
    position: absolute;
    top: calc(50% - 30px);
    right: 10px;
  `,
  modalWrapper: css`
    display: flex;
    justify-content: center;
    align-items: center;
  `,
};
