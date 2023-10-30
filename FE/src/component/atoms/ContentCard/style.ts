import { css } from "@emotion/react";

export default {
  wrapper: (inActive: boolean) => css`
    position: relative;
    border-radius: 10px;
    opacity: ${inActive ? "0.5" : "1"};
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
  `,
  flexBetween: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
  iconStar: css`
    font-size: 18px;
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
  imgWrapper: (inActive: boolean) => css`
    width: ${inActive ? "196px" : "216px"};
    height: ${inActive ? "294px" : "324px"};
    border-right: 10px;
  `,
  description: css`
    margin-top: 10px;
  `,
};
