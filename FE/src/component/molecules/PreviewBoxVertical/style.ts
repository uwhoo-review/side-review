import { css } from "@emotion/react";
import Color from "@src/common/styles/Color";

export default {
  wrapper: css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    padding: 20px;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
  `,
  contents: css`
    width: 100%;
    height: 100%;
  `,
  topContents: css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    gap: 14px;
    iframe {
      border: none;
    }
  `,
  middleContents: css`
    position: relative;
  `,
  bottomContents: css`
    /*.bottom-info {
      @keyframes translateX-1 {
        from {
          transform: scaleX(0);
        }
        to {
          transform: scaleX(100%);
        }
      }
      animation: translateX-1 1s ease;
    }
    .bottom-review {
      @keyframes translateX-2 {
        from {
          transform: scaleX(0);
        }
        to {
          transform: scaleX(100%);
        }
      }
      animation: translateX-2 1s ease;
    }*/
  `,
  footerBtn: css`
    position: absolute;
    bottom: 20px;
    right: 20px;
  `,
  yearSpan: css`
    color: ${Color.dark.grey500};
    font-family: Poppins;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px;
  `,

  flexBetween: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    div {
      flex-grow: 1;
    }
  `,
  avatarGroup: css`
    //display: flex;
    //flex-direction: unset;
    justify-content: start;
    div {
      border: none !important;
      width: 28px;
      height: 28px;
      font-size: 12px;
      background-color: transparent;
      border: none !important;
      width: 28px;
      height: 28px;
    }
  `,
  avatar: css`
    //background-color: transparent;
    //border: none !important;
    //width: 28px;
    //height: 28px;
  `,
  launch: css`
    position: absolute;
    top: 0;
    right: 0;
  `,
  rating: css`
    font-size: 20px;
    svg {
      width: 1em;
      height: 1em;
      flex-shrink: 0;
    }
  `,
  icons: css`
    font-size: 20px;
  `,
  typography1: css`
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  `,
};
