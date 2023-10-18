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
    z-index: 10;
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

  searchWrapper: css`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 52px;

    width: 100%;
    height: 238px;
    background-color: #121212;
    opacity: 0;
    visibility: hidden;

    border-top: 1px solid #ffffff12;
    box-sizing: border-box;
    z-index: 1;
    transition: opacity 1s ease;
    &.open {
      opacity: 1;
      visibility: visible;
    }
  `,
  searchGrid: css`
    //height: 100%;
    width: 1396px;
  `,
};
