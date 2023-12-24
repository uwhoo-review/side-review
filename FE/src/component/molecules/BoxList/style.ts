import { css } from "@emotion/react";

export default {
  wrapper: css`
    margin-bottom: 70px;
  `,
  emptyWrapper: css`
    height: 314px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #1e1e1e;
    border-radius: 10px;
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
  cardSlider: (currentPage: number, lastPage: number) => css`
    width: 1396px;
    position: relative;
    overflow: hidden;

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
  cardWrapper: (translateX: any) => css`
    display: flex;
    align-items: center;
    gap: 20px;
    flex-wrap: nowrap;

    transition: 0.5s ease;
    transform: translateX(${translateX}px);
  `,
  card: css`
    width: 334px;
    height: 190px;
    cursor: pointer;
    flex-shrink: 0;

    border: none;
    border-radius: 10px;
    overflow: hidden;
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
