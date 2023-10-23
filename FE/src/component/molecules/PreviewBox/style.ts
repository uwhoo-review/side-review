import { css } from "@emotion/react";
import Color from "@src/common/styles/Color";

export default {
  wrapper: css`
    display: flex;
    justify-content: space-between;
    align-items: center;

    gap: 18px;

    padding: 40px 0;
    box-sizing: border-box;
    @keyframes heightSlide {
      from {
        height: 0px;
      }
      to {
        height: 670px;
      }
    }
    height: 670px;
    width: 100%;
    background-color: #121212;
    margin-top: 43px;
    animation: heightSlide 0.8s ease;
  `,
  leftWrapper: css``,
  rightWrapper: css``,
  contents: css`
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    justify-content: space-between;
  `,
  topContents: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
  leftContents: css`
    width: 50%;
    iframe {
      width: 640px;
      height: 360px;
    }
  `,
  rightContents: css`
    width: 50%;
  `,
  bottomContents: css`
    gap: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
};
