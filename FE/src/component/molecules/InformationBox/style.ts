import { css } from "@emotion/react";

export default {
  wrapper: (url: string) => css`
    position: relative;
    width: 100%;
    height: 600px;
    background-image: url(${url});
    background-size: cover;

    //opacity: 0.5;
    ::before {
      position: absolute;
      content: "";

      background: linear-gradient(0deg, #121212 5%, rgba(0, 0, 0, 0.5) 100%);

      //background-blend-mode: multiply;
      //background: linear-gradient(0deg, #000 20%, rgba(0, 0, 0, 0) 100%);
      //linearGradient: 0deg, #000 20%, rgba(0, 0, 0, 0) 100%);
      //background: url(${url}), linear-gradient(0deg, #000 50%, #000 100%);
      //opacity: 0.5;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }
  `,
  centerWrapper: css`
    height: 100%;
  `,
  subWrapper: css`
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    gap: 78px;
    justify-content: space-between;
  `,
  leftBox: css`
    flex: 0 0 276px;
    position: relative;
  `,
  markImg: css`
    position: absolute;
    right: -50px;
    bottom: -44px;
  `,
  rightBox: css`
    flex: 1;
    .grid {
      row-gap: 8px;
    }
  `,
  avatarGroup: css`
    //display: flex;
    //flex-direction: unset;
    justify-content: start;
    div {
      border: none !important;
      width: 60px;
      height: 60px;
      font-size: 60px;
      background-color: transparent;
      border: none !important;
    }
  `,
  avatar: css``,
  avatarWrapper: css`
    position: absolute;
    bottom: 30px;
    right: 0;
  `,
  selectBox: css`
    //display: flex;
    .HW-Outlined-SelectBox-Contents {
      border: none;
      background-color: #00000080;
    }
  `,
  titleWrapper: css`
    display: flex;
    align-content: center;
    gap: 20px;
  `,
};
