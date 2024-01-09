import { css } from "@emotion/react";
import Color from "@src/common/styles/Color";

export default {
  wrapper: css`
    margin-bottom: 80px;
  `,
  title: css`
    font-family: Pretendard, sans-serif;
    font-size: 32px;
    font-style: normal;
    font-weight: 600;
    line-height: 40px;
  `,
  subTitle: css`
    font-family: Pretendard, sans-serif;
    font-size: 22px;
    font-style: normal;
    font-weight: 500;
    line-height: 30px;
    margin-bottom: 40px;
    width: 100%;
    margin-top: 20px;
  `,
  sliderWrapper: (currentPage: number, lastPage: number) => css`
    height: 314px;
    position: relative;
    background-color: ${Color.dark.elevation01};
    border-radius: 10px;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 40px 118px;

    &:hover {
      .hover-arrow {
        z-index: 1;
        &.left {
          display: ${currentPage === 1 ? "none" : "flex"};
        }
        &.right {
          display: ${currentPage === lastPage ? "none" : "flex"};
        }
      }
    }
    &:not(:hover) {
      .hover-arrow {
        z-index: 0;
        display: none;
      }
    }
  `,
  emptyWrapper: css`
    height: 314px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #1e1e1e;
    border-radius: 10px;
  `,
  slider: css`
    position: relative;
    overflow: hidden;
    height: 100%;
  `,
  grid: (currentPage: number) => css`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(2, 1fr);
    grid-auto-flow: column;
    column-gap: 20px;
    row-gap: 20px;
    height: 100%;
    align-items: center;

    transition: 0.5s ease;
    transform: translate(calc(${(currentPage - 1) * -100}% - ${(currentPage - 1) * +20}px), 0px);
  `,

  card: css`
    cursor: pointer;
  `,
  leftPageBtn: css`
    position: absolute;
    top: calc(50% - 30px);
    left: 30px;

    //background-color: #3e3e3e80;
    //color: #ffffff;
    z-index: 1;
  `,
  rightPageBtn: css`
    position: absolute;
    top: calc(50% - 30px);
    right: 30px;

    background-color: #3e3e3e80;
    color: #ffffff;
    z-index: 1;
  `,
  previewBox: css`
    /* @keyframes heightSlide {
      from {
        height: 0px;
      }
      to {
        height: 670px;
      }
    }
    height: 670px;
    width: 100%;
    background-color: #121212;
    margin-top: 43px;
    animation: heightSlide 0.8s ease;
*/
  `,
  flexBetween: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
  dotPagination: css`
    //float: right;
  `,
};
