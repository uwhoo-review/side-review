import { css } from "@emotion/react";
import Color from "@src/common/styles/Color";

export default {
  wrapper: css`
    display: flex;
    justify-content: space-between;
    align-items: center;

    gap: 18px;

    padding: 30px 0;
    box-sizing: border-box;
    height: 590px;
  `,
  centerWrapper: css`
    width: 100%;
    background-color: ${Color.dark.elevation02};
    @keyframes heightSlide {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
    margin-top: 43px;
    animation: heightSlide 1s ease;
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
    //align-items: center;

    gap: 20px;
  `,
  leftContents: css`
    flex-grow: 1;
    iframe {
      width: 640px;
      height: 360px;

      border: none;
      border-radius: 6px;
    }
  `,
  rightContents: css`
    flex-grow: 1;
    position: relative;
  `,
  bottomContents: css`
    gap: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    //margin-top: 30px;
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
    border-radius: 6px;
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
    width: 24px;
    height: 24px;
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
  modal: css`
    //height: 100px;
  `,
  synopsis: css`
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    word-break: break-all;
    overflow: hidden;
    text-overflow: ellipsis;
  `,
};
