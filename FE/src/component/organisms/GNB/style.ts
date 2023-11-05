import { css } from "@emotion/react";
import Color from "@src/common/styles/Color";

export default {
  wrapper: (bgColor: string) => css`
    height: 52px;
    width: 100%;
    position: fixed;
    top: 0;
    background-color: ${bgColor ? bgColor : "#121212"};
    color: #ffffff;
    display: flex;
    align-items: center;
    padding: 0 30px;
    box-sizing: border-box;

    min-width: 800px;
    z-index: 10;
  `,
  subWrapper: css`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
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
  iconSearch: (open:boolean)=>css`
    color: #ffffff;
    background-color: ${open ? "#FFFFFF1A" : "transparent"};
    border-radius: 6px;
  `
  ,
  searchWrapper: css`
    position: fixed;
    top: 0px;
    margin-top: 52px;
    width: 100%;
    height: 290px;
    background-color: ${Color.dark.elevation02};
    opacity: 0;
    visibility: hidden;
    z-index: 0;
    
    border-top: 1px solid #42424A;
    box-sizing: border-box;
    transition: opacity 1s ease;
    
    //overflow-x: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    &.open {
      opacity: 1;
      visibility: visible;
      z-index: 2;
    }
  `,
  searchGrid: css`
    //min-width: 1440px;
    //align-items: center;
    //height: 100%;
  `,
  detailSlide: css`
    overflow: hidden;

    position: absolute;
    bottom: 0;
    height: 1000px;
    width: 100%;
    div {
      height: 100%;
      width: 100%;
    }
    & > div.open,
    & > div.close {
      transform: translateY(100%);
      transition: 0.4s ease-in-out;
    }
    & > div.close {
      transform: translateY(0);
    }
    .contents {
      z-index: 10;

      height: 100%;
      width: 100%;
      background: lightblue;
      color: rgba(0, 0, 0, 0.8);
      padding: 20px;
      margin: 0;
    }
  `,
};
