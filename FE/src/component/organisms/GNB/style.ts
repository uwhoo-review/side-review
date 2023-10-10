import { css } from "@emotion/react";

export default {
  wrapper: css`
    height: 52px;
    width: 100%;
    position: absolute;
    top: 0;
    background-color: #121212;
    color: #ffffff;
    display: flex;
    align-items: center;
    padding: 0 30px;
    box-sizing: border-box;

    display: flex;
    justify-content: space-between;
  `,
  logo: css`
    font-family: Poppins, sans-serif;
    font-size: 22px;
    font-style: normal;
    font-weight: 600;
    line-height: 17.041px; /* 77.461% */
    letter-spacing: 0.88px;
  `,
  leftGroups: css``,
  centerGroups: css`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    gap: 80px;
    a {
      height: 100%;
      font-weight: 500;
      font-family: Pretendard;
      button {
        cursor: pointer;

        height: 100%;
        font-size: 16px;
        font-weight: 500;
        background-color: transparent;
        color: #fff;
        opacity: 0.6;
        border: none;

        border-bottom: 4px solid transparent;
      }

      &.active {
        button {
          font-weight: 600;
          opacity: 1;
          border-bottom: 4px solid #6d6ada;
        }
      }
    }
  `,
  rightGroups: css`
    display: flex;
    //justify-content: center;
    align-items: center;
    gap: 10px;
  `,
  loginBtn: css`
    color: #fff;
  `
};
