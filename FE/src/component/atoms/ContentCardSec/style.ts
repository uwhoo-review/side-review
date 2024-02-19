import { css } from "@emotion/react";
import Color from "@src/common/styles/Color";

export default {
  wrapper: (active: boolean) => css`
    position: relative;
    color: #fff;
    width: 160px;
    height: 240px;
    &:hover {
      opacity: 1;
      .icon-launch {
        display: block;
      }
    }
  `,
  variant: (type: string) => {
    switch (type) {
      case "first": {
        return css`
          width: 160px;
          height: 240px;
        `;
      }
      case "second": {
        return css`
          width: 216px;
          height: 324px;
        `;
      }
      default: {
        return css`
          width: 160px;
          height: 240px;
        `;
      }
    }
  },
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
    height: 24px;
    width: 100%;
  `,
  flexBetween2: css`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 24px;
    width: 100%;
    gap: 4px;
  `,
  rating: css`
    display: flex;
    align-items: center;
    gap: 2px;
  `,
  iconStar: css`
    font-size: 14px;
  `,
  typo1: css`
    font-size: 10px;
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
    width: 100%;
    height: 100%;

    border-radius: 10px;
    overflow: hidden;
    transition: 0.1s ease height;

    margin-bottom: 10px;
    position: relative;
    //&:hover {
    //  img {
    //    transform: scale(1.1);
    //  }
    //}
  `,
  title: css`
    width: 100%;
    margin-bottom: 6px;
    overflow-x: hidden;
    display: flex;
    flex: 0 0 auto;
  `,
  marquee: css`
    :hover[data-overflow="true"] {
      animation: marquee 5s linear infinite;
      white-space: nowrap;
    }
    :not(:hover) {
      white-space: nowrap;
      overflow-x: hidden;
      text-overflow: ellipsis;
    }
  `,
  Launch: css`
    position: absolute;
    top: 0;
    right: 0;
    font-size: 16px;
    color: ${Color.dark.grey500};
    display: none;
    cursor: pointer;
  `,
  description: css`
    height: 48px;
    margin-top: 10px;
    position: relative;
  `,
  seasonLabel: css`
    position: absolute;
    right: 10px;
    bottom: 10px;

    display: flex;
    width: 46px;
    height: 22px;
    padding: 2px 6px;
    justify-content: center;
    align-items: center;
    gap: 6px;
    flex-shrink: 0;

    border-radius: 6px;
    background: rgba(0, 0, 0, 0.6);

    color: #d9dae5;
    text-align: center;
    font-size: 12px;
    font-style: normal;
    font-weight: 600;
    line-height: 20px;

    z-index: 1;
  `,
};
