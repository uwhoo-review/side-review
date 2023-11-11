import { css } from "@emotion/react";
import Color from "@src/common/styles/Color";

export default {
  wrapper: css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

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
    margin-bottom: 20px;
    iframe {
      border: none;
      border-radius: 6px;
    }
  `,
  synopsis: css`
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    word-break: break-all;
    overflow: hidden;
    text-overflow: ellipsis;
  `,
  middleContents: css`
    position: relative;
    margin-bottom: 20px;
  `,
  typoTitle: css`
    margin-right: 8px;
  `,
  typoYear: css`
    margin-right: 8px;
  `,
  chipAge: css`
    font-family: Poppins;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px;
    border-radius: 6px;
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
    .bottom-review{
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
  `,
  footerBtn: css`
    position: absolute;
    bottom: 20px;
    right: 20px;
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
    justify-content: flex-end;
    div {
      border: none !important;
      width: 24px;
      height: 24px;
      font-size: 14px;
      background-color: #121212;
    }
  `,
  avatar: css`
    background-color: transparent;
    border: none !important;
    width: 30px;
    height: 30px;
    font-size: 30px !important;
    //z-index: 1;
  `,
  launch: css`
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer;
    color: ${Color.dark.grey500};
    font-size: 24px;

  `,
  rating: css`
    font-size: 20px;
    column-gap: 5px;
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
