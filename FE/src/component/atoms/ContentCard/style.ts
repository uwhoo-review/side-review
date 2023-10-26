import { css } from "@emotion/react";

export default {
  wrapper: css`
    position: relative;
    border-radius: 10px;
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
  avatarGroup: css`
    div {
      border: none !important;
      width: 28px;
      height: 28px;
      font-size: 12px;
    }
  `,
  avatar: css`
    background-color: transparent;
    border: none !important;
    width: 28px;
    height: 28px;
  `,
  imgWrapper: css`
    height: 324px;
    width: 216px;
    border-right: 10px;
  `,
};
