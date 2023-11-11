import { css } from "@emotion/react";
import Color from "@src/common/styles/Color";

export default {
  wrapper: (active: boolean) => css`
    position: relative;
    border-radius: 10px;
    opacity: ${active ? 1 : 0.5};
    &:hover {
      opacity: 1;
      .icon-launch{
        display: block;
      }
    }
  `,
  rank: css`
    position: absolute;
    top: 0;
    right: 0;
    width: 45px;
    height: 45px;
    background-color: #5354da;
    color: #fff;

    display: flex;
    justify-content: center;
    align-items: center;
    font-family: Poppins, sans-serif;
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px; /* 100% */
    letter-spacing: 0.15px;

    border-radius: 0 10px 0 10px;
    z-index: 1;
  `,
  flexBetween: css`
    display: flex;
    justify-content: space-between;
    align-items: center;

  `,
  rating: css`
    display: flex;
    align-items: center;
    gap: 4px;
  `,
  iconStar: css`
    font-size: 14px;
  `,
  typo1: css`
    margin-left: 8px;
  `,
  avatarGroup: css`
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
    font-size: 24px !important;
    //z-index: 1;
  `,
  imgWrapper: (active: boolean) => css`
    width: ${active ? "216px" : "196px"};
    height: ${active ? "324px" : "294px"};

    border-radius: 10px;
    overflow: hidden;
    transition: 0.1s ease height;

    margin-bottom: 10px;
    &:hover {
      img {
        transform: scale(1.1);
      }
    }
  `,
  title: css`
    margin-bottom: 2px;
    position: relative;
  `,
  Launch: css`
    position: absolute;
    top: 0;
    right: 0;
    font-size: 16px;
    color: ${Color.dark.grey500};
    display: none;
  `,
  description: css`
    margin-top: 10px;
  `,
};
