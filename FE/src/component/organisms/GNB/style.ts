import { css } from "@emotion/react";
import Color from "@src/common/styles/Color";

export default {
  wrapper: (bgColor: string, scrollTop: boolean) => css`
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

    box-shadow: ${scrollTop ? "none" : "0px 6px 10px 0px rgba(0, 0, 0, 0.30)"};
  `,
  subWrapper: css`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
  logo: css`
    width: 120px;
    height: 19px;
    cursor: pointer;
  `,
  leftGroups: css``,
  tabs: css`
    .MuiTabs-flexContainer {
      gap: 80px;
    }
    .MuiTab-root {
      color: #fff;
      font-family: Pretendard;
      font-size: 16px;
      font-style: normal;
      font-weight: 500;
      line-height: 24px;
      opacity: 0.6;
      &.Mui-selected {
        opacity: 1;
        font-weight: 600;
        color: #fff;
      }
    }
    .MuiTabs-indicator {
      height: 4px;
      border-radius: 4px;
      background-color: #6d6ada;
    }
  `,
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
          //border-radius: 4px;
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
  iconSearch: (open: boolean) => css`
    color: #ffffff;
    background-color: ${open ? "#FFFFFF1A" : "transparent"};
    border-radius: 6px;
  `,
  iconAlarm: css`
    color: #ffffff;
    border-radius: 6px;
  `,
  popover: css`
    top: 52px;

    .MuiBackdrop-root {
      top: 52px;
    }

    .MuiPopover-paper {
      width: 100%;
      top: 0 !important;
      left: 0 !important;
      max-width: unset;
      background-color: transparent;
    }
  `,
  searchWrapper: css`
    position: fixed;
    top: 52px;
    left: 0;
    width: 100%;
    //height: 238px;
    background-color: ${Color.dark.elevation02};
    opacity: 0;
    visibility: hidden;
    z-index: 0;

    border-top: 1px solid #42424a;
    //box-sizing: border-box;
    transition: opacity 0.5s ease;

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
    padding: 30px 0;
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
